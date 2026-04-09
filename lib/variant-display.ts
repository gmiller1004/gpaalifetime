import type { ShopifyProductVariant } from "@/types";

/**
 * Human-readable variant label from Shopify (prefers option values, then title).
 */
export function getVariantDisplayTitle(v: ShopifyProductVariant): string {
  if (v.selectedOptions?.length) {
    return v.selectedOptions.map((o) => o.value).join(" · ");
  }
  const t = v.title?.trim() ?? "";
  if (t && t !== "Default Title") return t;
  return t || "Standard";
}

/** Short stable key for select values so the UI never shows a gid:// string. */
export function variantKey(id: string): string {
  return id.split("/").pop() ?? id;
}
