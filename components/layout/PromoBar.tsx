import type { BrandId } from "@/types";

const PAYDIRT_PROMO_VARIANT =
  "Limited Time: Get up to $600 in free gold in paydirt with your new GPAA Lifetime bundle";

const PAYDIRT_PROMO_FIXED =
  "Limited Time: Get $500 in free gold in paydirt with your new GPAA Lifetime bundle";

function paydirtCopy(brandId: BrandId): string {
  if (brandId === "garrett" || brandId === "goldcube") {
    return PAYDIRT_PROMO_FIXED;
  }
  return PAYDIRT_PROMO_VARIANT;
}

/**
 * Sticky strip below the main header — ships inside the same sticky wrapper as Header.
 */
export function PromoBar({ brandId }: { brandId: BrandId }) {
  return (
    <div
      role="note"
      className="border-b border-black/10 bg-[var(--brand-accent)] px-4 py-2.5 text-center text-xs font-semibold leading-snug text-[var(--brand-accent-foreground)] sm:text-sm"
    >
      <p className="mx-auto max-w-4xl text-balance">{paydirtCopy(brandId)}</p>
    </div>
  );
}
