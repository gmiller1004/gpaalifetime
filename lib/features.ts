/** Training Paydirt auto-note + sticky promo bar (disabled until re-enabled). */
export const PAYDIRT_PROMO_ENABLED = false;

/** Gold4Life500 checkout banner until Sunday midnight PT. Set NEXT_PUBLIC_GOLD4LIFE500_PROMO=false to disable. */
export const GOLD4LIFE500_PROMO_ENABLED =
  process.env.NEXT_PUBLIC_GOLD4LIFE500_PROMO !== "false";

/** Minelab-only GM1000 discount strip. */
export const MINELAB_GM1000_PROMO_ENABLED =
  process.env.NEXT_PUBLIC_MINELAB_GM1000_PROMO !== "false";
