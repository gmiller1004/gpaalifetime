import type { BrandId } from "@/types";

/**
 * Maps Shopify variant titles to clean labels ("Gold Monster 1000" / "Gold Monster 2000").
 * Checks 2000 before 1000 so titles like "GM2000" resolve correctly.
 */
export function getFriendlyVariantLabel(
  variantTitle: string,
  brandId: BrandId
): string {
  const t = variantTitle.trim();
  if (brandId === "minelab" || brandId === "default") {
    if (/\b2000\b|GM\s*2000|Monster\s*2000|Gold\s*Monster\s*2000/i.test(t)) {
      return "Gold Monster 2000";
    }
    if (/\b1000\b|GM\s*1000|Monster\s*1000|Gold\s*Monster\s*1000/i.test(t)) {
      return "Gold Monster 1000";
    }
  }
  if (brandId === "garrett") {
    return "Goldmaster 24k (two coils)";
  }
  if (brandId === "goldcube") {
    return "Gold Cube 3-Stack Deluxe";
  }
  return t;
}
