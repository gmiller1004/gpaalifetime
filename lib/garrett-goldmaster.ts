import type { ShopifyProductVariant } from "@/types";

import { getVariantDisplayTitle } from "@/lib/variant-display";

export type GarrettGoldmasterCoil = "610" | "6";

/**
 * Maps a bundle variant to the Goldmaster 24k 6×10″ DD vs 6″ coil option from title / options text.
 */
export function garrettGoldmasterCoil(
  v: ShopifyProductVariant
): GarrettGoldmasterCoil | null {
  const label = getVariantDisplayTitle(v).toLowerCase();
  if (
    /\b6\s*["″]?\s*[x×]\s*10\b|6x10|6\s*x\s*10|6\s*×\s*10|6\s*inch\s*[x×]\s*10|610\b|10\s*["″]?\s*(dd|elliptical)|elliptical.*\b6\b.*\b10\b/i.test(
      label
    )
  ) {
    return "610";
  }
  if (
    /\b6\s*["″′]\s*(search)?coil\b|\b6\s*(inch|in\.?)\s*(search)?coil\b/i.test(
      label
    ) &&
    !/\b6\s*["″]?\s*[x×]\s*10\b|6x10|6\s*x\s*10|6\s*×\s*10/i.test(label)
  ) {
    return "6";
  }
  return null;
}
