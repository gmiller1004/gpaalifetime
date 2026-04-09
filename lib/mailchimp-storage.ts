/** localStorage keys — keep in sync with mailchimp components */

export const MAILCHIMP_STORAGE = {
  subscribed: "gpaa-mailchimp-subscribed",
  exitAt: "gpaa-mailchimp-exit-at",
} as const;

export const EXIT_MODAL_COOLDOWN_MS = 5 * 24 * 60 * 60 * 1000;

export function readSubscribed(): boolean {
  if (typeof window === "undefined") return false;
  return localStorage.getItem(MAILCHIMP_STORAGE.subscribed) === "1";
}

export function writeSubscribed(): void {
  localStorage.setItem(MAILCHIMP_STORAGE.subscribed, "1");
}

export function readExitCooldownActive(): boolean {
  if (typeof window === "undefined") return true;
  const raw = localStorage.getItem(MAILCHIMP_STORAGE.exitAt);
  if (!raw) return false;
  const t = Date.parse(raw);
  if (Number.isNaN(t)) return false;
  return Date.now() - t < EXIT_MODAL_COOLDOWN_MS;
}

export function writeExitShownNow(): void {
  localStorage.setItem(MAILCHIMP_STORAGE.exitAt, new Date().toISOString());
}
