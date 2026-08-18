/** Normalize numeric or full GID to Storefront API ProductVariant id. */
export function shopifyVariantGid(id: string): string {
  const trimmed = id.trim();
  if (trimmed.startsWith("gid://")) return trimmed;
  return `gid://shopify/ProductVariant/${trimmed}`;
}

/** Normalize numeric or full GID to Storefront API Product id. */
export function shopifyProductGid(id: string): string {
  const trimmed = id.trim();
  if (trimmed.startsWith("gid://")) return trimmed;
  return `gid://shopify/Product/${trimmed}`;
}

/** GPAA Lifetime Membership — membership-only SKU (not a partner bundle). */
export const LIFETIME_MEMBERSHIP_VARIANT_ID = "54097004921142";

/** SeptMember Gold Giveaway — Gold Life Lifetime + Founder Bag. */
export const SEPTMEMBER_PRODUCT_ID = "10816780173622";
export const SEPTMEMBER_FOUNDER_BAG_VARIANT_ID = "54424381391158";
export const SEPTMEMBER_FIVE_BAG_VARIANT_ID = "54424398954806";

export function variantIdsMatch(a: string, b: string): boolean {
  return shopifyVariantGid(a) === shopifyVariantGid(b);
}
