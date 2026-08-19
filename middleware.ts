import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import { isBrandId, subdomainToBrandId, type BrandId } from "@/lib/brands";
import {
  GPAA_MREF_COOKIE,
  GPAA_MREF_MAX_AGE_SEC,
  MREF_QUERY_PARAM,
  mrefCookieScope,
  normalizeMref,
} from "@/lib/mref";

/**
 * Resolves co-branded experience from subdomain:
 * - minelab.gpaalifetime.com → /minelab
 * - garrett.gpaalifetime.com → /garrett
 * - goldcube.gpaalifetime.com → /goldcube
 * - www / apex → /default
 * - localhost → NEXT_PUBLIC_DEV_BRAND (default: minelab) for local preview
 */
const ROOT_DOMAIN =
  process.env.NEXT_PUBLIC_ROOT_DOMAIN ?? "gpaalifetime.com";

function getSubdomain(host: string): string | null {
  const hostLower = host.split(":")[0]?.toLowerCase() ?? "";
  if (hostLower === "localhost" || hostLower === "127.0.0.1") {
    return null;
  }
  const root = ROOT_DOMAIN.toLowerCase();
  if (hostLower === root || hostLower === `www.${root}`) {
    return null;
  }
  if (hostLower.endsWith(`.${root}`)) {
    const sub = hostLower.slice(0, -(root.length + 1));
    return sub || null;
  }
  return null;
}

function resolveBrandFromHost(host: string): BrandId {
  const sub = getSubdomain(host);
  if (sub) return subdomainToBrandId(sub);
  const h = host.split(":")[0]?.toLowerCase() ?? "";
  if (h === "localhost" || h === "127.0.0.1") {
    const dev = process.env.NEXT_PUBLIC_DEV_BRAND;
    if (dev && isBrandId(dev)) return dev;
    return "minelab";
  }
  return "default";
}

function withMrefCookie(request: NextRequest, response: NextResponse) {
  const code = normalizeMref(request.nextUrl.searchParams.get(MREF_QUERY_PARAM));
  if (!code) return response;
  const host = request.headers.get("host") ?? "";
  const { domain, secure } = mrefCookieScope(
    host,
    request.nextUrl.protocol === "https:"
  );
  response.cookies.set({
    name: GPAA_MREF_COOKIE,
    value: code,
    maxAge: GPAA_MREF_MAX_AGE_SEC,
    path: "/",
    sameSite: "lax",
    secure,
    ...(domain ? { domain } : {}),
  });
  return response;
}

export function middleware(request: NextRequest) {
  const host = request.headers.get("host") ?? "";
  const brand = resolveBrandFromHost(host);
  const url = request.nextUrl.clone();
  const path = url.pathname;

  if (
    path.startsWith("/_next") ||
    path.startsWith("/api") ||
    path.match(/\.(ico|png|jpg|jpeg|svg|webp|gif|woff2|txt|xml)$/i)
  ) {
    return withMrefCookie(request, NextResponse.next());
  }

  const legalPaths = ["/privacy", "/terms"];
  if (legalPaths.includes(path)) {
    url.pathname = `/${brand}${path}`;
    const res = NextResponse.rewrite(url);
    res.headers.set("x-gpaa-brand", brand);
    return withMrefCookie(request, res);
  }

  const segments = path.split("/").filter(Boolean);
  const first = segments[0];

  if (first && isBrandId(first)) {
    const res = NextResponse.next();
    res.headers.set("x-gpaa-brand", first);
    return withMrefCookie(request, res);
  }

  if (path === "/" || path === "") {
    url.pathname = `/${brand}`;
    const res = NextResponse.rewrite(url);
    res.headers.set("x-gpaa-brand", brand);
    return withMrefCookie(request, res);
  }

  return withMrefCookie(request, NextResponse.next());
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
