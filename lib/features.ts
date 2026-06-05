/** Training Paydirt auto-note + sticky promo bar (disabled until re-enabled). */
export const PAYDIRT_PROMO_ENABLED = false;

/** Weekend Gold4Life500 checkout banner (Fri–Sun + Mon before 6am PT). Set NEXT_PUBLIC_GOLD4LIFE500_PROMO=false to disable. */
export const GOLD4LIFE500_PROMO_ENABLED =
  process.env.NEXT_PUBLIC_GOLD4LIFE500_PROMO !== "false";
