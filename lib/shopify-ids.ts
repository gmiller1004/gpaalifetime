/** Normalize numeric or full GID to Storefront API ProductVariant id. */
export function shopifyVariantGid(id: string): string {
  const trimmed = id.trim();
  if (trimmed.startsWith("gid://")) return trimmed;
  return `gid://shopify/ProductVariant/${trimmed}`;
}

/** GPAA Lifetime Membership — membership-only SKU (not a partner bundle). */
export const LIFETIME_MEMBERSHIP_VARIANT_ID = "54097004921142";

export function variantIdsMatch(a: string, b: string): boolean {
  return shopifyVariantGid(a) === shopifyVariantGid(b);
}
