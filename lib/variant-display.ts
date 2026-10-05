import type { ShopifyProductVariant } from "@/types";

/** Shopify's placeholder name for the only variant of a product with no options. */
const SHOPIFY_DEFAULT_TITLE = "Default Title";

/** Variant title with Shopify's "Default Title" placeholder stripped (empty when single-variant). */
export function cleanVariantTitle(title: string | null | undefined): string {
  const t = title?.trim() ?? "";
  return t === SHOPIFY_DEFAULT_TITLE ? "" : t;
}

/**
 * Human-readable variant label from Shopify (prefers option values, then title).
 * Returns "" for single-variant products so callers can omit the label.
 */
export function getVariantDisplayTitle(v: ShopifyProductVariant): string {
  const fromOptions = (v.selectedOptions ?? [])
    .map((o) => cleanVariantTitle(o.value))
    .filter(Boolean)
    .join(" · ");
  return fromOptions || cleanVariantTitle(v.title);
}

/** Short stable key for select values so the UI never shows a gid:// string. */
export function variantKey(id: string): string {
  return id.split("/").pop() ?? id;
}
