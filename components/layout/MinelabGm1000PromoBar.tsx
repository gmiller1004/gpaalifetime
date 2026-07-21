import type { BrandId } from "@/types";
import { MINELAB_GM1000_PROMO_ENABLED } from "@/lib/features";

export function MinelabGm1000PromoBar({
  brandId,
}: {
  brandId: BrandId;
}) {
  if (brandId !== "minelab" || !MINELAB_GM1000_PROMO_ENABLED) {
    return null;
  }

  return (
    <div
      role="note"
      className="border-b border-black/10 bg-[#E7262A] px-4 py-2.5 text-center text-xs font-semibold leading-snug text-white sm:text-sm"
    >
      <p className="mx-auto max-w-4xl text-balance">
        Limited time: save an extra $800 on the Gold Life GM1000 bundle
        <span className="hidden sm:inline"> — </span>
        <span className="mt-1 block sm:mt-0 sm:inline">
          Code{" "}
          <span className="rounded bg-white/20 px-1.5 py-0.5 font-mono text-[11px] tracking-wide sm:text-xs">
            Lifetime1000
          </span>{" "}
          at checkout · Quantity is limited
        </span>
      </p>
    </div>
  );
}
