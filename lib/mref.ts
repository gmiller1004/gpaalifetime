/** Query param from goldprospectors.org /ref/{CODE} landings. */
export const MREF_QUERY_PARAM = "mref";

export const GPAA_MREF_COOKIE = "gpaa_mref";
export const GPAA_MREF_MAX_AGE_SEC = 2592000;

const ROOT_DOMAIN = (
  process.env.NEXT_PUBLIC_ROOT_DOMAIN ?? "gpaalifetime.com"
)
  .replace(/^https?:\/\//, "")
  .replace(/^www\./, "")
  .replace(/\/$/, "")
  .toLowerCase();

/** Trim, uppercase; valid codes are [A-Z0-9]{3,32}. Invalid values are ignored. */
export function normalizeMref(raw: string | null | undefined): string | null {
  if (raw == null) return null;
  const code = raw.trim().toUpperCase();
  if (!/^[A-Z0-9]{3,32}$/.test(code)) return null;
  return code;
}

export function mrefCookieScope(
  hostHeader: string,
  isHttps: boolean
): { domain?: string; secure: boolean } {
  const host = hostHeader.split(":")[0]?.toLowerCase() ?? "";
  const onRoot =
    host === ROOT_DOMAIN || host.endsWith(`.${ROOT_DOMAIN}`);
  return {
    domain: onRoot ? `.${ROOT_DOMAIN}` : undefined,
    secure: isHttps || onRoot,
  };
}

export const AFFILIATE_CART_ATTRIBUTE_KEYS = [
  "affiliate_code",
  "affiliate_id",
] as const;

export const REFERRAL_CODE_ATTRIBUTE_KEY = "referral_code";
