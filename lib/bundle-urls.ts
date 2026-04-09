import type { BrandId } from "@/types";

import { brands } from "@/lib/brands";

const ROOT = process.env.NEXT_PUBLIC_ROOT_DOMAIN ?? "gpaalifetime.com";

/** Manufacturer bundle destinations for nav (excludes generic `default` from cross-links). */
const BUNDLE_NAV_IDS = ["minelab", "garrett", "goldcube"] as const satisfies readonly BrandId[];

export type BundleNavItem = {
  id: BrandId;
  label: string;
  href: string;
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

/** Other lifetime bundle sites (not the current co-brand). */
export function getOtherBundleNavItems(
  currentBrandId: BrandId,
  siteHost: string
): BundleNavItem[] {
  const ids = BUNDLE_NAV_IDS.filter((id) => id !== currentBrandId);
  return ids.map((id) => ({
    id,
    label: brands[id].displayName,
    href: bundleHomeHref(id, siteHost),
  }));
}
