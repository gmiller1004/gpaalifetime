import type { CartLine } from "@/types";

import { GOLD_LIFE_BUNDLE_PRODUCT_HANDLES } from "@/lib/brands";

/** Qualifying merchandise subtotal per free paydirt bag (before tax & shipping). */
export const SPEND_PER_FREE_PAYDIRT_BAG = 250;

/** Stated retail value per Training Paydirt bag for the order note. */
export const PAYDIRT_BAG_VALUE = 50;

function formatMoney(amount: number, currencyCode: string): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currencyCode,
  }).format(amount);
}

export function isGoldLifeBundleLine(line: CartLine): boolean {
  return GOLD_LIFE_BUNDLE_PRODUCT_HANDLES.has(line.merchandise.product.handle);
}

/** Subtotal from Gold Life bundle lines only (unit price × qty). */
export function qualifyingGoldLifeSubtotal(lines: CartLine[]): {
  subtotal: number;
  currencyCode: string;
  bundleLines: CartLine[];
} {
  const bundleLines = lines.filter(isGoldLifeBundleLine);
  if (bundleLines.length === 0) {
    return { subtotal: 0, currencyCode: "USD", bundleLines: [] };
  }
  let subtotal = 0;
  const currencyCode = bundleLines[0].merchandise.price.currencyCode;
  for (const line of bundleLines) {
    subtotal +=
      Number(line.merchandise.price.amount) * Math.max(1, line.quantity);
  }
  return { subtotal, currencyCode, bundleLines };
}

/**
 * Full cart note: bundle line summary + paydirt bags earned (1 per $250 on qualifying bundles).
 * Returns null when no Gold Life bundle is in the cart.
 */
export function computeAutoCartNote(lines: CartLine[]): string | null {
  const { subtotal, currencyCode, bundleLines } =
    qualifyingGoldLifeSubtotal(lines);
  if (bundleLines.length === 0) return null;

  const summaryLines = bundleLines.map(
    (l) =>
      `• ${l.merchandise.product.title} — ${l.merchandise.title} ×${l.quantity}`
  );

  const bagCount = Math.floor(subtotal / SPEND_PER_FREE_PAYDIRT_BAG);
  const parts: string[] = [...summaryLines, ""];

  if (bagCount >= 1) {
    const totalValue = bagCount * PAYDIRT_BAG_VALUE;
    parts.push(
      `Add ${bagCount} Training Paydirt Bag${bagCount === 1 ? "" : "s"} to order - ${formatMoney(totalValue, currencyCode)} Value`
    );
  } else {
    const need = SPEND_PER_FREE_PAYDIRT_BAG - subtotal;
    parts.push(
      `Qualifying Gold Life bundle subtotal: ${formatMoney(subtotal, currencyCode)} — add ${formatMoney(need, currencyCode)} more on bundles for 1 free Training Paydirt bag (${formatMoney(PAYDIRT_BAG_VALUE, currencyCode)} value).`
    );
  }

  return parts.join("\n");
}
