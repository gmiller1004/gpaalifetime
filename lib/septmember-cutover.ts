/**
 * At 12:00 AM Pacific on 26 Aug 2026, this host serves only the SeptMember
 * Lifetime offer. Override with SEPTMEMBER_ONLY=1 (or NEXT_PUBLIC_SEPTMEMBER_ONLY=1)
 * to preview before then.
 */
export const SEPTMEMBER_ONLY_AT_MS = Date.parse("2026-08-26T00:00:00-07:00");

export const GPAA_SEPTMEMBER_GIVEAWAY_URL =
  "https://www.goldprospectors.org/septmember";

function envEnabled(name: string): boolean {
  const v = process.env[name]?.trim().toLowerCase();
  return v === "1" || v === "true" || v === "yes";
}

export function isSeptMemberOnly(now: number = Date.now()): boolean {
  if (
    envEnabled("SEPTMEMBER_ONLY") ||
    envEnabled("NEXT_PUBLIC_SEPTMEMBER_ONLY")
  ) {
    return true;
  }
  return now >= SEPTMEMBER_ONLY_AT_MS;
}
