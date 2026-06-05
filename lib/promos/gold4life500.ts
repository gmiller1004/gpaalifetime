import { GOLD4LIFE500_PROMO_ENABLED } from "@/lib/features";

const PACIFIC = "America/Los_Angeles";

export const GOLD4LIFE500_PROMO = {
  code: "Gold4Life500",
  discountLabel: "$500 off",
  /** Shown in the site banner (matches Klaviyo email). */
  headline:
    "Weekend only: extra $500 off GPAA Lifetime & Gold Life bundles",
  subline: "Use code Gold4Life500 at checkout · Ends Monday 6am PT",
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

function addPacificCalendarDays(
  year: number,
  month: number,
  day: number,
  days: number
): Pick<PacificParts, "year" | "month" | "day"> {
  const anchor = dateInPacific(year, month, day, 12, 0);
  const shifted = new Date(anchor.getTime() + days * 86_400_000);
  const p = getPacificParts(shifted);
  return { year: p.year, month: p.month, day: p.day };
}

/** Monday 6:00 AM Pacific that ends the current weekend window. */
export function getGold4Life500PromoEndAt(from: Date = new Date()): Date | null {
  if (!isGold4Life500PromoActive(from)) return null;

  const p = getPacificParts(from);

  if (p.weekday === 1) {
    return dateInPacific(p.year, p.month, p.day, 6, 0);
  }

  const daysUntilMonday =
    p.weekday === 0 ? 1 : p.weekday === 5 ? 3 : p.weekday === 6 ? 2 : 0;

  const monday = addPacificCalendarDays(p.year, p.month, p.day, daysUntilMonday);
  return dateInPacific(monday.year, monday.month, monday.day, 6, 0);
}

/**
 * Active Fri–Sun and until Mon 6:00 AM Pacific (GPAA HQ).
 */
export function isGold4Life500PromoActive(at: Date = new Date()): boolean {
  if (!GOLD4LIFE500_PROMO_ENABLED) return false;

  const { weekday, hour } = getPacificParts(at);
  if (weekday === 1) return hour < 6;
  return weekday === 5 || weekday === 6 || weekday === 0;
}

export function msUntilGold4Life500PromoEnd(from: Date = new Date()): number | null {
  const end = getGold4Life500PromoEndAt(from);
  if (!end) return null;
  return Math.max(0, end.getTime() - from.getTime());
}
