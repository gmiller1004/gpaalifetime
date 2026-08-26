"use client";

import * as React from "react";
import { CheckIcon, Loader2Icon } from "lucide-react";

import { useCart } from "@/components/cart/cart-provider";
import { Button } from "@/components/ui/button";
import { trackAddToCart } from "@/lib/analytics";
import {
  LDMA_LIFETIME_MEMBERSHIPS_URL,
  septMemberOffers,
} from "@/lib/septmember";
import { shopifyVariantGid, variantIdsMatch } from "@/lib/shopify-ids";
import { cn } from "@/lib/utils";
import type { Money, ShopifyProduct, ShopifyProductVariant } from "@/types";

function formatMoney(m: Money) {
  const n = Number(m.amount);
  return n.toLocaleString("en-US", {
    style: "currency",
    currency: m.currencyCode || "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
}

function savingsFromPrices(price: Money, compareAt: Money | null | undefined) {
  if (!compareAt) return null;
  const compare = Number(compareAt.amount);
  const current = Number(price.amount);
  if (
    !Number.isFinite(compare) ||
    !Number.isFinite(current) ||
    compare <= current
  ) {
    return null;
  }
  const dollars = Math.round(compare - current);
  const pct = Math.round(((compare - current) / compare) * 100);
  if (dollars <= 0 || pct <= 0) return null;
  return {
    compareLabel: formatMoney(compareAt),
    saveLabel: formatMoney({
      amount: String(dollars),
      currencyCode: price.currencyCode || "USD",
    }),
    pct,
  };
}

function variantForOffer(
  product: ShopifyProduct | null,
  variantId: string
): ShopifyProductVariant | undefined {
  return product?.variants.find((v) => variantIdsMatch(v.id, variantId));
}

export function SeptMemberOfferCards({
  product,
}: {
  product: ShopifyProduct | null;
}) {
  const { addBundle, isLoading, error } = useCart();
  const [pendingId, setPendingId] = React.useState<string | null>(null);

  async function handleAdd(variantId: string, itemName: string, price: Money) {
    const gid = shopifyVariantGid(variantId);
    setPendingId(gid);
    try {
      await addBundle(gid, 1);
      trackAddToCart({
        currency: price.currencyCode,
        value: Number(price.amount),
        itemId: gid,
        itemName,
        quantity: 1,
      });
    } catch {
      // Cart provider surfaces the error message.
    } finally {
      setPendingId(null);
    }
  }

  return (
    <section
      id="choose-your-offer"
      className="border-b border-[var(--brand-border)] bg-white py-14 sm:py-20"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--brand-muted)]">
            Two ways in
          </p>
          <h2 className="font-heading mt-2 text-3xl font-semibold tracking-tight text-[var(--brand-primary)] sm:text-4xl">
            One shot at a nugget — or five
          </h2>
          <p className="mt-3 text-[var(--brand-body)]">
            $900 is lifetime membership plus this month&apos;s Founder Bag.
            $1,500 is that, plus a bag on this date for four more years. The
            extra $600 buys four more days in the mystery-nugget hunt. A nugget
            alone can be worth hundreds.
          </p>
        </div>

        <div className="mt-10 grid gap-5 lg:grid-cols-2">
          {septMemberOffers.map((offer) => {
            const shopify = variantForOffer(product, offer.variantId);
            const price = shopify?.price ?? offer.priceFallback;
            const compareAt = shopify?.compareAtPrice ?? offer.compareAtFallback;
            const savings = savingsFromPrices(price, compareAt);
            const available = shopify?.availableForSale ?? true;
            const gid = shopifyVariantGid(offer.variantId);
            const pending = pendingId === gid;
            const featured = offer.key === "five";

            return (
              <article
                key={offer.key}
                className={cn(
                  "flex flex-col rounded-3xl border bg-[var(--brand-body-dim)] p-6 shadow-sm sm:p-8",
                  featured
                    ? "border-[#C45C26] ring-1 ring-[#C45C26]/25"
                    : "border-[var(--brand-border)]"
                )}
              >
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#C45C26]">
                  {offer.eyebrow}
                </p>
                <h3 className="font-heading mt-2 text-2xl font-semibold text-[var(--brand-primary)]">
                  {offer.name}
                </h3>
                <p className="mt-1 text-sm font-medium text-[#C45C26]">
                  {offer.headline}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-[var(--brand-body)]">
                  {offer.summary}
                </p>
                <div className="mt-5">
                  <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                    <p className="font-heading text-4xl font-semibold tabular-nums text-[var(--brand-primary)]">
                      {formatMoney(price)}
                    </p>
                    {savings ? (
                      <p className="text-lg tabular-nums text-[var(--brand-muted)] line-through">
                        {savings.compareLabel}
                      </p>
                    ) : null}
                  </div>
                  {offer.savingsStyle === "percent" && savings ? (
                    <p className="mt-1 text-sm font-semibold text-[#C45C26]">
                      Save {savings.saveLabel}{" "}
                      <span className="font-medium text-[var(--brand-body)]">
                        ({savings.pct}% off)
                      </span>
                    </p>
                  ) : null}
                  {offer.savingsStyle === "upgrade" && "dealLine" in offer ? (
                    <p className="mt-1 text-sm font-semibold text-[#C45C26]">
                      {offer.dealLine}
                      {savings ? (
                        <span className="font-medium text-[var(--brand-body)]">
                          {" "}
                          · {savings.saveLabel} under regular price
                        </span>
                      ) : null}
                    </p>
                  ) : null}
                </div>
                <p className="mt-1 text-xs text-[var(--brand-muted)]">
                  {offer.cadence}
                </p>
                {"upgradeNote" in offer && offer.upgradeNote ? (
                  <p className="mt-3 rounded-xl border border-[#C45C26]/25 bg-white px-3 py-2 text-sm leading-relaxed text-[#1c1d1d]">
                    {offer.upgradeNote}
                  </p>
                ) : null}
                {"example" in offer && offer.example ? (
                  <p className="mt-3 rounded-xl bg-white px-3 py-2 text-xs leading-relaxed text-[var(--brand-body)]">
                    {offer.example}
                  </p>
                ) : null}
                <ul className="mt-5 flex flex-col gap-2.5 text-sm text-[#1c1d1d]">
                  {offer.includes.map((line) => (
                    <li key={line} className="flex gap-2.5">
                      <CheckIcon
                        className="mt-0.5 size-4 shrink-0 text-[#C45C26]"
                        aria-hidden
                      />
                      <span>{line}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  type="button"
                  size="lg"
                  className="mt-6 h-12 w-full rounded-xl border-0 bg-[var(--brand-accent)] text-[var(--brand-accent-foreground)] shadow-md hover:bg-[var(--brand-accent)]/92"
                  disabled={!available || pending || isLoading}
                  onClick={() =>
                    void handleAdd(offer.variantId, offer.name, price)
                  }
                >
                  {pending || isLoading ? (
                    <>
                      <Loader2Icon className="size-4 animate-spin" />
                      Adding…
                    </>
                  ) : available ? (
                    offer.cta
                  ) : (
                    "Sold out"
                  )}
                </Button>
              </article>
            );
          })}
        </div>
        {error ? (
          <p className="mt-4 text-center text-sm text-red-600" role="alert">
            {error}
          </p>
        ) : null}
        <p className="mx-auto mt-6 max-w-2xl text-center text-xs leading-relaxed text-[var(--brand-muted)]">
          The Founder Bag isn&apos;t sold separately. It ships with a new GPAA
          Lifetime membership here, or with LDMA Lifetime (which includes GPAA
          Lifetime benefits) at{" "}
          <a
            href={LDMA_LIFETIME_MEMBERSHIPS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-[var(--brand-primary)] underline-offset-4 hover:underline"
          >
            myldma.com/memberships
          </a>
          . From August 26 through September 30, one Founder Bag each day
          includes a bonus mystery gold nugget. The $1,500 offer sends your next
          four bags on this same date each year. Ships free.
        </p>
      </div>
    </section>
  );
}
