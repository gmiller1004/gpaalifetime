import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import { isBrandId, subdomainToBrandId, type BrandId } from "@/lib/brands";

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
    return NextResponse.next();
  }

  const legalPaths = ["/privacy", "/terms"];
  if (legalPaths.includes(path)) {
    url.pathname = `/${brand}${path}`;
    const res = NextResponse.rewrite(url);
    res.headers.set("x-gpaa-brand", brand);
    return res;
  }

  const segments = path.split("/").filter(Boolean);
  const first = segments[0];

  if (first && isBrandId(first)) {
    const res = NextResponse.next();
    res.headers.set("x-gpaa-brand", first);
    return res;
  }

  if (path === "/" || path === "") {
    url.pathname = `/${brand}`;
    const res = NextResponse.rewrite(url);
    res.headers.set("x-gpaa-brand", brand);
    return res;
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
