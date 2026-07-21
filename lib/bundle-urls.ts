import type { BrandId } from "@/types";

import { brands } from "@/lib/brands";

const ROOT = process.env.NEXT_PUBLIC_ROOT_DOMAIN ?? "gpaalifetime.com";

/** Manufacturer bundle destinations for nav (excludes generic `default` from cross-links). */
const BUNDLE_NAV_IDS = [
  "minelab",
  "garrett",
  "goldcube",
] as const satisfies readonly BrandId[];

const BUNDLE_NAV_META: Record<
  (typeof BUNDLE_NAV_IDS)[number],
  { tagline: string; accentColor: string }
> = {
  minelab: {
    tagline: "Gold Monster 1000 + lifetime GPAA · GM2000 sold out",
    accentColor: "#E7262A",
  },
  garrett: {
    tagline: "Goldmaster 24k + two coils + lifetime GPAA",
    accentColor: "#FFCC00",
  },
  goldcube: {
    tagline: "3-Stack Deluxe + lifetime GPAA",
    accentColor: "#D4AF37",
  },
};

export type BundleNavItem = {
  id: BrandId;
  label: string;
  href: string;
  tagline: string;
  accentColor: string;
};

/**
 * Builds home URL for a bundle brand. On localhost, uses path `/[brand]`; otherwise subdomain.
 */
export function bundleHomeHref(brandId: BrandId, siteHost: string): string {
  const local =
    siteHost.startsWith("localhost") ||
    siteHost.startsWith("127.0.0.1") ||
    siteHost.includes("localhost:");
  if (local) {
    return `/${brandId}`;
  }
  if (brandId === "default") {
    return `https://${ROOT}/`;
  }
  return `https://${brandId}.${ROOT}/`;
}

/** Partner lifetime bundle sites (excludes current co-brand). */
export function getOtherBundleNavItems(
  currentBrandId: BrandId,
  siteHost: string
): BundleNavItem[] {
  const ids = BUNDLE_NAV_IDS.filter((id) => id !== currentBrandId);
  return ids.map((id) => ({
    id,
    label: brands[id].displayName,
    href: bundleHomeHref(id, siteHost),
    ...BUNDLE_NAV_META[id],
  }));
}

/** All partner bundle offers (for membership landing promos). */
export function getPartnerBundleNavItems(siteHost: string): BundleNavItem[] {
  return BUNDLE_NAV_IDS.map((id) => ({
    id,
    label: brands[id].displayName,
    href: bundleHomeHref(id, siteHost),
    ...BUNDLE_NAV_META[id],
  }));
}
