import type { ShopifyProductVariant } from "@/types";

import { getVariantDisplayTitle } from "@/lib/variant-display";

export type GoldMonsterSeries = "1000" | "2000";

/**
 * Maps a bundle variant to Gold Monster 1000 vs 2000 from title / options text.
 */
export function goldMonsterSeries(
  v: ShopifyProductVariant
): GoldMonsterSeries | null {
  const label = getVariantDisplayTitle(v).toLowerCase();
  if (/\b2000\b|gm\s*2000|monster\s*2000|gold\s*monster\s*2000/i.test(label)) {
    return "2000";
  }
  if (/\b1000\b|gm\s*1000|monster\s*1000|gold\s*monster\s*1000/i.test(label)) {
    return "1000";
  }
  return null;
}
