import {
  SEPTMEMBER_FIVE_BAG_VARIANT_ID,
  SEPTMEMBER_FOUNDER_BAG_VARIANT_ID,
} from "@/lib/shopify-ids";

export const SEPTMEMBER_YOUTUBE_ID = "jjQSzA6O6Uo";
export const SEPTMEMBER_YOUTUBE_EMBED = `https://www.youtube-nocookie.com/embed/${SEPTMEMBER_YOUTUBE_ID}`;

/** LDMA Lifetime includes GPAA Lifetime benefits and also ships The Founder Bag. */
export const LDMA_LIFETIME_MEMBERSHIPS_URL = "https://myldma.com/memberships";

export const septMemberImages = {
  kit: "/septmember/founder-kit.png",
  kitWide: "/septmember/founder-kit-wide.png",
  bagField: "/septmember/founder-bag-field.png",
} as const;

export const septMemberOffers = [
  {
    key: "founder",
    variantId: SEPTMEMBER_FOUNDER_BAG_VARIANT_ID,
    name: "Lifetime + Founder Bag",
    eyebrow: "One bag this month",
    priceFallback: { amount: "900.00", currencyCode: "USD" },
    compareAtFallback: { amount: "2639.00", currencyCode: "USD" },
    cadence: "Pay once · ships free",
    headline: "Join for life. Pan gold this month.",
    summary:
      "Lifetime membership plus one Founder Bag — at least $140 in gold you pan yourself, and one shot at that day’s mystery nugget.",
    savingsStyle: "percent",
    includes: [
      "GPAA Lifetime Membership — claims, magazine, chapters, for life",
      "One Founder Bag with at least $140 in gold, shipping now",
      "Your bag is in that day’s mystery-nugget hunt",
      "Lifetime member hat, pan, pin, and card",
    ],
    cta: "Get Lifetime + Founder Bag",
  },
  {
    key: "five",
    variantId: SEPTMEMBER_FIVE_BAG_VARIANT_ID,
    name: "Lifetime + 5 Years of Bags",
    eyebrow: "Five shots at a mystery nugget",
    priceFallback: { amount: "1500.00", currencyCode: "USD" },
    compareAtFallback: { amount: "3199.00", currencyCode: "USD" },
    cadence: "Pay once · five bags over five years · ships free",
    headline: "Same membership. Five bags. Five chances at extra gold.",
    summary:
      "Your kit and Founder Bag ship now. Then every year on this date for the next four years, another bag arrives. That’s five days in the mystery-nugget hunt — and a nugget alone can be worth hundreds.",
    example:
      "Join September 15, 2026 → bags on September 15 in 2026, 2027, 2028, 2029, and 2030.",
    savingsStyle: "upgrade",
    dealLine: "5 chances at a mystery nugget",
    upgradeNote:
      "The extra $600 is four more bags — about $150 each. Every bag has at least $140 in gold, plus another shot at a nugget.",
    includes: [
      "Everything in the $900 offer, including lifetime membership",
      "Five Founder Bags — at least $140 in gold in each",
      "Five days in the mystery-nugget hunt, not one",
      "Four extra bags for $600 — you can’t buy them later",
      "Lifetime member hat, pan, pin, and card",
    ],
    cta: "Lock in 5 years of Founder Bags",
  },
] as const;

export const septMemberBenefitsIntro =
  "Lifetime membership is the same on both offers: claims to prospect, chapters to learn with, and the magazine between trips. The difference is whether you take one Founder Bag this month, or lock in a bag on this date for five years.";

export const septMemberMeta = {
  title: "SeptMember Special — Lifetime + The Founder Bag",
  description:
    "Join GPAA for life and get The Founder Bag — exclusive paydirt with at least $140 in gold, plus a daily mystery nugget. Limited SeptMember Gold Giveaway.",
};
