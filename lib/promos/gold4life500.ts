import { GOLD4LIFE500_PROMO_ENABLED } from "@/lib/features";

const PACIFIC = "America/Los_Angeles";

export const GOLD4LIFE500_PROMO = {
  code: "Gold4Life500",
  discountLabel: "$500 off",
  /** Shown in the site banner (matches Klaviyo email). */
  headline:
    "Weekend only: extra $500 off GPAA Lifetime & Gold Life bundles",
  subline: "Use code Gold4Life500 at checkout · Ends Sunday at midnight",
  endsLabel: "Ends Sunday at midnight",
} as const;

/** Monday 00:00 Pacific after promo Sunday (= “Sunday at midnight”). Update per campaign. */
const DEFAULT_PROMO_END_PACIFIC = {
  year: 2026,
  month: 6,
  day: 29,
  hour: 0,
  minute: 0,
} as const;

type PacificParts = {
  year: number;
  month: number;
  day: number;
  weekday: number;
  hour: number;
  minute: number;
};

function getPacificParts(date: Date): PacificParts {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: PACIFIC,
    year: "numeric",
    month: "numeric",
    day: "numeric",
    weekday: "short",
    hour: "numeric",
    minute: "numeric",
    hour12: false,
  }).formatToParts(date);

  const pick = (type: Intl.DateTimeFormatPartTypes) =>
    parts.find((p) => p.type === type)?.value ?? "";

  const weekdayMap: Record<string, number> = {
    Sun: 0,
    Mon: 1,
    Tue: 2,
    Wed: 3,
    Thu: 4,
    Fri: 5,
    Sat: 6,
  };

  return {
    year: Number(pick("year")),
    month: Number(pick("month")),
    day: Number(pick("day")),
    weekday: weekdayMap[pick("weekday")] ?? 0,
    hour: Number(pick("hour")),
    minute: Number(pick("minute")),
  };
}

/** Wall-clock instant in Pacific, returned as UTC Date. */
function dateInPacific(
  year: number,
  month: number,
  day: number,
  hour: number,
  minute: number
): Date {
  const guess = new Date(Date.UTC(year, month - 1, day, hour + 8, minute));
  for (let delta = -14; delta <= 14; delta++) {
    const candidate = new Date(guess.getTime() + delta * 3_600_000);
    const p = getPacificParts(candidate);
    if (
      p.year === year &&
      p.month === month &&
      p.day === day &&
      p.hour === hour &&
      p.minute === minute
    ) {
      return candidate;
    }
  }
  return guess;
}

/** Parse NEXT_PUBLIC_GOLD4LIFE500_PROMO_END as YYYY-MM-DD (Monday 00:00 PT). */
function promoEndFromEnv(): Date | null {
  const raw = process.env.NEXT_PUBLIC_GOLD4LIFE500_PROMO_END?.trim();
  if (!raw) return null;
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(raw);
  if (!match) return null;
  return dateInPacific(
    Number(match[1]),
    Number(match[2]),
    Number(match[3]),
    0,
    0
  );
}

/** Hard stop for the active campaign (Sunday at midnight Pacific). */
export function getGold4Life500PromoEndAt(): Date {
  return (
    promoEndFromEnv() ??
    dateInPacific(
      DEFAULT_PROMO_END_PACIFIC.year,
      DEFAULT_PROMO_END_PACIFIC.month,
      DEFAULT_PROMO_END_PACIFIC.day,
      DEFAULT_PROMO_END_PACIFIC.hour,
      DEFAULT_PROMO_END_PACIFIC.minute
    )
  );
}

/** Active until Sunday at midnight Pacific (configurable end date). */
export function isGold4Life500PromoActive(at: Date = new Date()): boolean {
  if (!GOLD4LIFE500_PROMO_ENABLED) return false;
  return at.getTime() < getGold4Life500PromoEndAt().getTime();
}

export function msUntilGold4Life500PromoEnd(from: Date = new Date()): number | null {
  if (!isGold4Life500PromoActive(from)) return null;
  const end = getGold4Life500PromoEndAt();
  return Math.max(0, end.getTime() - from.getTime());
}
