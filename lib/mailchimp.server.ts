import "server-only";

import { createHash } from "node:crypto";

const TAG_NAME = "New Lifetime Interest";

function mailchimpDatacenter(apiKey: string): string | null {
  const i = apiKey.lastIndexOf("-");
  if (i === -1 || i === apiKey.length - 1) return null;
  return apiKey.slice(i + 1).trim().toLowerCase() || null;
}

export function subscriberHash(email: string): string {
  return createHash("md5").update(email.trim().toLowerCase()).digest("hex");
}

async function mailchimpFetch(
  dc: string,
  apiKey: string,
  path: string,
  init: RequestInit
): Promise<Response> {
  const token = Buffer.from(`anystring:${apiKey}`, "utf8").toString("base64");
  return fetch(`https://${dc}.api.mailchimp.com/3.0${path}`, {
    ...init,
    headers: {
      Authorization: `Basic ${token}`,
      "Content-Type": "application/json",
      ...init.headers,
    },
  });
}

export type MailchimpSubscribeResult =
  | { ok: true }
  | { ok: false; error: string; status: number };

/**
 * Upserts list member and applies tag {@link TAG_NAME}.
 */
export async function subscribeWithTag(params: {
  email: string;
  firstName: string;
}): Promise<MailchimpSubscribeResult> {
  const apiKey = process.env.MAILCHIMP_API_KEY?.trim();
  const audienceId = process.env.MAILCHIMP_AUDIENCE_ID?.trim();
  if (!apiKey || !audienceId) {
    return {
      ok: false,
      error: "Mailchimp is not configured.",
      status: 503,
    };
  }

  const dc = mailchimpDatacenter(apiKey);
  if (!dc) {
    return {
      ok: false,
      error: "Invalid Mailchimp API key format.",
      status: 503,
    };
  }

  const hash = subscriberHash(params.email);
  const memberPath = `/lists/${audienceId}/members/${hash}`;

  const putRes = await mailchimpFetch(dc, apiKey, memberPath, {
    method: "PUT",
    body: JSON.stringify({
      email_address: params.email.trim(),
      status_if_new: "subscribed",
      merge_fields: {
        FNAME: params.firstName.trim().slice(0, 100),
      },
    }),
  });

  if (!putRes.ok) {
    const errBody = await putRes.text();
    let detail = "Could not subscribe right now.";
    try {
      const j = JSON.parse(errBody) as { detail?: string; title?: string };
      if (j.detail) detail = j.detail;
      else if (j.title) detail = j.title;
    } catch {
      /* ignore */
    }
    return { ok: false, error: detail, status: putRes.status >= 500 ? 502 : 400 };
  }

  const tagRes = await mailchimpFetch(dc, apiKey, `${memberPath}/tags`, {
    method: "POST",
    body: JSON.stringify({
      tags: [{ name: TAG_NAME, status: "active" }],
    }),
  });

  if (!tagRes.ok) {
    const errBody = await tagRes.text();
    let detail = "Subscribed, but tagging failed.";
    try {
      const j = JSON.parse(errBody) as { detail?: string };
      if (j.detail) detail = j.detail;
    } catch {
      /* ignore */
    }
    return { ok: false, error: detail, status: tagRes.status >= 500 ? 502 : 400 };
  }

  return { ok: true };
}
