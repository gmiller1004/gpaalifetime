import "server-only";

const KLAVIYO_API_URL =
  "https://a.klaviyo.com/api/profile-subscription-bulk-create-jobs/";
const KLAVIYO_REVISION = "2026-04-15";

export type KlaviyoSubscribeResult =
  | { ok: true }
  | { ok: false; error: string; status: number };

function errorDetail(payload: unknown): string | null {
  if (!payload || typeof payload !== "object") return null;
  const errors = (payload as { errors?: unknown }).errors;
  if (!Array.isArray(errors)) return null;
  const first = errors[0];
  if (!first || typeof first !== "object") return null;
  const detail = (first as { detail?: unknown }).detail;
  return typeof detail === "string" && detail.trim() ? detail : null;
}

/** Subscribe a website lead to the configured Klaviyo list. */
export async function subscribeToKlaviyo(params: {
  email: string;
  firstName: string;
}): Promise<KlaviyoSubscribeResult> {
  const apiKey = process.env.KLAVIYO_API_KEY?.trim();
  const listId = process.env.KLAVIYO_LIST_ID?.trim();

  if (!apiKey || !listId) {
    return {
      ok: false,
      error: "Email signup is not configured.",
      status: 503,
    };
  }

  let response: Response;
  try {
    response = await fetch(KLAVIYO_API_URL, {
      method: "POST",
      headers: {
        Accept: "application/vnd.api+json",
        Authorization: `Klaviyo-API-Key ${apiKey}`,
        "Content-Type": "application/vnd.api+json",
        revision: KLAVIYO_REVISION,
      },
      body: JSON.stringify({
        data: {
          type: "profile-subscription-bulk-create-job",
          attributes: {
            custom_source: "GPAA Lifetime Website",
            profiles: {
              data: [
                {
                  type: "profile",
                  attributes: {
                    email: params.email.trim().toLowerCase(),
                    first_name: params.firstName.trim().slice(0, 100),
                    subscriptions: {
                      email: {
                        marketing: {
                          consent: "SUBSCRIBED",
                        },
                      },
                    },
                  },
                },
              ],
            },
          },
          relationships: {
            list: {
              data: {
                type: "list",
                id: listId,
              },
            },
          },
        },
      }),
      cache: "no-store",
    });
  } catch {
    return {
      ok: false,
      error: "Could not reach the email service. Please try again.",
      status: 502,
    };
  }

  if (!response.ok) {
    const payload = await response.json().catch(() => null);
    return {
      ok: false,
      error: errorDetail(payload) ?? "Could not subscribe right now.",
      status: response.status >= 500 ? 502 : 400,
    };
  }

  return { ok: true };
}
