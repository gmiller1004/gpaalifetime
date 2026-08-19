"use client";

import {
  GPAA_MREF_COOKIE,
  GPAA_MREF_MAX_AGE_SEC,
  MREF_QUERY_PARAM,
  mrefCookieScope,
  normalizeMref,
} from "@/lib/mref";

export function readMrefCookie(): string | null {
  if (typeof document === "undefined") return null;
  const m = document.cookie.match(
    new RegExp(`(?:^|; )${GPAA_MREF_COOKIE}=([^;]*)`)
  );
  if (!m?.[1]) return null;
  return normalizeMref(decodeURIComponent(m[1]));
}

export function writeMrefCookie(code: string) {
  if (typeof document === "undefined") return;
  const hostname =
    typeof window !== "undefined" ? window.location.hostname : "";
  const isHttps =
    typeof window !== "undefined" && window.location.protocol === "https:";
  const { domain, secure } = mrefCookieScope(hostname, isHttps);
  let cookie = `${GPAA_MREF_COOKIE}=${encodeURIComponent(code)}; Path=/; Max-Age=${GPAA_MREF_MAX_AGE_SEC}; SameSite=Lax`;
  if (secure) cookie += "; Secure";
  if (domain) cookie += `; Domain=${domain}`;
  document.cookie = cookie;
}

/** Last-click: valid ?mref= overwrites the cookie. Invalid values are ignored. */
export function captureMrefFromLocation(): string | null {
  if (typeof window === "undefined") return readMrefCookie();
  const raw = new URLSearchParams(window.location.search).get(MREF_QUERY_PARAM);
  const fromQuery = normalizeMref(raw);
  if (fromQuery) {
    writeMrefCookie(fromQuery);
    return fromQuery;
  }
  return readMrefCookie();
}
