"use client";

import * as React from "react";

import {
  GOLD4LIFE500_PROMO,
  isGold4Life500PromoActive,
  msUntilGold4Life500PromoEnd,
} from "@/lib/promos/gold4life500";

/**
 * Sticky $500-off offer strip — hides at Sunday midnight Pacific (see lib/promos/gold4life500.ts).
 */
export function WeekendPromoBar() {
  const [visible, setVisible] = React.useState(() =>
    isGold4Life500PromoActive()
  );

  React.useEffect(() => {
    const sync = () => setVisible(isGold4Life500PromoActive());
    sync();

    const ms = msUntilGold4Life500PromoEnd();
    const timeout =
      ms != null && ms > 0
        ? window.setTimeout(() => setVisible(false), ms + 500)
        : undefined;

    const interval = window.setInterval(sync, 60_000);
    return () => {
      window.clearInterval(interval);
      if (timeout != null) window.clearTimeout(timeout);
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      role="note"
      className="border-b border-black/10 bg-[#F6921E] px-4 py-2.5 text-center text-xs font-semibold leading-snug text-white sm:text-sm"
    >
      <p className="mx-auto max-w-4xl text-balance">
        {GOLD4LIFE500_PROMO.headline}
        <span className="hidden sm:inline"> — </span>
        <span className="mt-1 block sm:mt-0 sm:inline">
          Code{" "}
          <span className="rounded bg-white/20 px-1.5 py-0.5 font-mono text-[11px] tracking-wide sm:text-xs">
            {GOLD4LIFE500_PROMO.code}
          </span>{" "}
          at checkout · {GOLD4LIFE500_PROMO.endsLabel}
        </span>
      </p>
    </div>
  );
}
