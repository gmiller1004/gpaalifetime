import "server-only";

import type { JudgeMeDisplayReview } from "@/types/judgeme";

export type { JudgeMeDisplayReview };

/**
 * Official REST base per Judge.me API docs (private token + X-Api-Token header).
 * @see https://judge.me/api/docs — GET /reviews requires PrivateAPIKeyShopDomain.
 */
const JUDGE_ME_REVIEWS_URL = "https://api.judge.me/api/v1/reviews";
const CACHE_SECONDS = 3600;
const PER_PAGE = 100;
/** Paginate until we have enough title matches or hit this cap. */
const MAX_PAGES = 25;
const TARGET_REVIEWS = 36;

type JudgeMeApiReviewer = {
  name?: string | null;
};

type JudgeMeApiReview = {
  id: number;
  title?: string | null;
  body?: string | null;
  rating?: number;
  product_title?: string | null;
  product_handle?: string | null;
  hidden?: boolean;
  verified?: string | null;
  reviewer?: JudgeMeApiReviewer | null;
};

type JudgeMeReviewsPayload = {
  reviews?: JudgeMeApiReview[];
};

function stripHtml(input: string): string {
  return input
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/gi, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function truncate(input: string, max: number): string {
  if (input.length <= max) return input;
  return `${input.slice(0, max - 1).trim()}…`;
}

/** Case-insensitive substring match on the Shopify product title from Judge.me. */
function membershipTitleKeyword(): string {
  return (
    process.env.JUDGEME_MEMBERSHIP_TITLE_KEYWORD?.trim() || "membership"
  ).toLowerCase();
}

function productTitleMatchesMembership(r: JudgeMeApiReview): boolean {
  const keyword = membershipTitleKeyword();
  if (!keyword) return true;
  const title = stripHtml(r.product_title ?? "").toLowerCase();
  return title.length > 0 && title.includes(keyword);
}

function isVerifiedBuyer(verified: string | null | undefined): boolean {
  if (!verified) return false;
  const v = verified.toLowerCase();
  if (v === "nothing" || v === "none") return false;
  return v === "buyer" || v === "verified" || v.includes("verified");
}

function mapReview(r: JudgeMeApiReview): JudgeMeDisplayReview | null {
  if (r.hidden) return null;
  if (r.rating !== 5) return null;
  if (!productTitleMatchesMembership(r)) return null;
  const title = stripHtml(r.title ?? "");
  const bodyRaw = stripHtml(r.body ?? "");
  const body = truncate(bodyRaw, 420);
  const name =
    stripHtml(r.reviewer?.name ?? "").trim() || "GPAA member";
  return {
    id: String(r.id),
    title: title || "Five-star review",
    body: body || "Great experience with GPAA.",
    reviewerName: name,
    verified: isVerifiedBuyer(r.verified ?? undefined),
    productHandle: r.product_handle ?? null,
  };
}

async function fetchReviewsPage(
  shopDomain: string,
  token: string,
  page: number
): Promise<JudgeMeApiReview[]> {
  const url = new URL(JUDGE_ME_REVIEWS_URL);
  url.searchParams.set("shop_domain", shopDomain);
  url.searchParams.set("rating", "5");
  url.searchParams.set("per_page", String(PER_PAGE));
  url.searchParams.set("page", String(page));

  const res = await fetch(url.toString(), {
    headers: {
      Accept: "application/json",
      "X-Api-Token": token,
    },
    next: { revalidate: CACHE_SECONDS },
  });

  if (!res.ok) {
    return [];
  }

  const data = (await res.json()) as JudgeMeReviewsPayload;
  return data.reviews ?? [];
}

/**
 * Fetches published 5-star Judge.me reviews whose **product title** contains the
 * keyword (default `membership`, overridable via `JUDGEME_MEMBERSHIP_TITLE_KEYWORD`).
 *
 * Use the **private** API token — the reviews index endpoint is documented as
 * requiring private/OAuth auth; the public token is intended for widgets.
 *
 * Returns [] if credentials are missing or the API errors.
 */
export async function getMembershipFiveStarReviews(): Promise<
  JudgeMeDisplayReview[]
> {
  const token = process.env.JUDGEME_API_KEY?.trim();
  const shopDomain =
    process.env.JUDGEME_SHOP_DOMAIN?.trim() ??
    process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN?.trim();

  if (!token || !shopDomain) {
    return [];
  }

  const seen = new Set<string>();
  const unique: JudgeMeDisplayReview[] = [];

  for (let page = 1; page <= MAX_PAGES; page++) {
    const batch = await fetchReviewsPage(shopDomain, token, page);
    if (batch.length === 0) break;

    for (const r of batch) {
      const m = mapReview(r);
      if (!m || seen.has(m.id)) continue;
      seen.add(m.id);
      unique.push(m);
      if (unique.length >= TARGET_REVIEWS) break;
    }

    if (unique.length >= TARGET_REVIEWS) break;
    if (batch.length < PER_PAGE) break;
  }

  return unique;
}
