import type { BrandId } from "@/types";

/** Production site origin (no trailing slash). */
export function getSiteUrl(): string {
  return (
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://gpaalifetime.com"
  ).replace(/\/$/, "");
}

/** Canonical pathname for a brand landing page (`/` for default). */
export function brandCanonicalPath(brand: BrandId): string {
  return brand === "default" ? "/" : `/${brand}`;
}
