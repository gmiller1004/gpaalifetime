import { NextResponse } from "next/server";

import { subscribeWithTag } from "@/lib/mailchimp.server";

const EMAIL_RE =
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON." }, { status: 400 });
  }

  if (!body || typeof body !== "object") {
    return NextResponse.json({ error: "Invalid body." }, { status: 400 });
  }

  const { email, firstName } = body as Record<string, unknown>;
  if (typeof email !== "string" || typeof firstName !== "string") {
    return NextResponse.json(
      { error: "First name and email are required." },
      { status: 400 }
    );
  }

  const trimmedEmail = email.trim();
  const trimmedFirst = firstName.trim();
  if (!trimmedFirst || trimmedFirst.length > 100) {
    return NextResponse.json(
      { error: "Please enter a valid first name." },
      { status: 400 }
    );
  }
  if (!EMAIL_RE.test(trimmedEmail) || trimmedEmail.length > 254) {
    return NextResponse.json(
      { error: "Please enter a valid email address." },
      { status: 400 }
    );
  }

  const result = await subscribeWithTag({
    email: trimmedEmail,
    firstName: trimmedFirst,
  });

  if (!result.ok) {
    return NextResponse.json(
      { error: result.error },
      { status: result.status }
    );
  }

  return NextResponse.json({ ok: true });
}
