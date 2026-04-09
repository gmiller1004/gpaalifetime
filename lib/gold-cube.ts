import type { ShopifyProductVariant } from "@/types";

import { getVariantDisplayTitle } from "@/lib/variant-display";

export type GoldCubeStack = "3" | "4";

/**
 * Maps a bundle variant to Gold Cube 3-Stack vs 4-Stack from title / options text.
 */
export function goldCubeStack(v: ShopifyProductVariant): GoldCubeStack | null {
  const label = getVariantDisplayTitle(v).toLowerCase();
  if (/\b4\s*[- ]?stack\b|four\s*stack|4\s*stacks?\b/i.test(label)) {
    return "4";
  }
  if (/\b3\s*[- ]?stack\b|three\s*stack|3\s*stacks?\b/i.test(label)) {
    return "3";
  }
  return null;
}
