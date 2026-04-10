"use client";

import * as React from "react";
import Image from "next/image";
import { CheckCircle2Icon, Loader2Icon } from "lucide-react";

import type { BrandConfig } from "@/lib/brands";
import {
  getVariantDisplayTitle,
  variantKey,
} from "@/lib/variant-display";
import { useCart } from "@/components/cart/cart-provider";
import { useVariantPreference } from "@/components/brand/variant-preference";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import type {
  Money,
  ShopifyImage,
  ShopifyProduct,
  ShopifyProductVariant,
} from "@/types";
import { imageSrcUnoptimized } from "@/lib/placeholders";
import { trackAddToCart } from "@/lib/analytics";
import { cn } from "@/lib/utils";

function formatMoneyFromMoney(m: Money) {
  const n = Number(m.amount);
  const code = m.currencyCode;
  const formatted = n.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  return `${code} $${formatted}`;
}

function formatMoney(v: ShopifyProductVariant) {
  return formatMoneyFromMoney(v.price);
}

/** Compare-at + savings % when Shopify compare-at is above current price. */
function variantCompareSavings(
  v: ShopifyProductVariant
): { compareLabel: string; savingsPct: number } | null {
  const cap = v.compareAtPrice;
  if (!cap) return null;
  const compare = Number(cap.amount);
  const price = Number(v.price.amount);
  if (
    !Number.isFinite(compare) ||
    !Number.isFinite(price) ||
    compare <= price
  ) {
    return null;
  }
  const pct = Math.round(((compare - price) / compare) * 100);
  if (pct <= 0) return null;
  return { compareLabel: formatMoneyFromMoney(cap), savingsPct: pct };
}

function buildGalleryImages(
  product: ShopifyProduct,
  variants: ShopifyProductVariant[]
): ShopifyImage[] {
  const seen = new Set<string>();
  const out: ShopifyImage[] = [];
  const push = (img: ShopifyImage | null | undefined) => {
    if (!img?.url || seen.has(img.url)) return;
    seen.add(img.url);
    out.push({ url: img.url, altText: img.altText });
  };
  for (const img of product.images) {
    push(img);
  }
  push(product.featuredImage);
  for (const v of variants) {
    push(v.image);
  }
  return out;
}

export function Hero({
  brand,
  product,
}: {
  brand: BrandConfig;
  product: ShopifyProduct | null;
}) {
  const { addBundle, isLoading, error } = useCart();
  const { setPreferredVariantId } = useVariantPreference();

  const variants = React.useMemo(
    () => product?.variants.filter((v) => v.availableForSale) ?? [],
    [product]
  );
  const [selectedId, setSelectedId] = React.useState<string>(
    () => variants[0]?.id ?? ""
  );

  React.useEffect(() => {
    if (variants[0]?.id) setSelectedId(variants[0].id);
  }, [variants]);

  const selected = variants.find((v) => v.id === selectedId) ?? variants[0];

  React.useEffect(() => {
    setPreferredVariantId(selected?.id ?? null);
  }, [selected?.id, setPreferredVariantId]);

  const galleryImages = React.useMemo(
    () => (product ? buildGalleryImages(product, variants) : []),
    [product, variants]
  );

  const [imageOverrideUrl, setImageOverrideUrl] = React.useState<string | null>(
    null
  );

  React.useEffect(() => {
    setImageOverrideUrl(null);
  }, [selected?.id]);

  const heroImage =
    imageOverrideUrl ??
    selected?.image?.url ??
    product?.featuredImage?.url ??
    brand.heroImageSrc;
  const heroAlt =
    (imageOverrideUrl
      ? galleryImages.find((i) => i.url === imageOverrideUrl)?.altText
      : null) ??
    selected?.image?.altText ??
    product?.featuredImage?.altText ??
    brand.heroImageAlt;

  const title = product?.title ?? `${brand.displayName} — Gold Life`;
  const [pending, setPending] = React.useState(false);

  async function handleAdd() {
    if (!selected?.id) return;
    setPending(true);
    try {
      await addBundle(selected.id, 1);
      trackAddToCart({
        currency: selected.price.currencyCode,
        value: Number(selected.price.amount),
        itemId: selected.id,
        itemName: title,
        quantity: 1,
      });
    } finally {
      setPending(false);
    }
  }

  const variantLabel = selected
    ? getVariantDisplayTitle(selected)
    : "";

  const compareSavings = selected ? variantCompareSavings(selected) : null;

  return (
    <section className="relative overflow-hidden border-b border-[var(--brand-border)]">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 sm:gap-10 sm:px-6 lg:grid-cols-2 lg:items-center lg:py-16">
        <div className="order-2 flex min-w-0 flex-col gap-4 sm:gap-5 lg:order-1">
          <Badge className="w-fit border-[var(--brand-border)] bg-white text-[var(--brand-primary)] shadow-sm">
            Official Gold Life bundle · One secure checkout
          </Badge>
          <h1 className="font-heading text-balance text-3xl font-semibold leading-tight tracking-tight text-[var(--brand-primary)] sm:text-4xl lg:text-5xl">
            {brand.heroHeadline}
          </h1>
          <p className="text-base leading-relaxed text-[var(--brand-body)] sm:text-lg lg:text-xl">
            {brand.heroSubheadline}
          </p>
          <ul className="flex flex-col gap-2.5 text-sm text-[var(--brand-body)] sm:text-base">
            <li className="flex gap-2.5">
              <CheckCircle2Icon
                className="mt-0.5 size-5 shrink-0 text-[var(--brand-primary)]"
                aria-hidden
              />
              <span>
                <span className="font-medium text-[#1c1d1d]">
                  Lifetime access
                </span>{" "}
                to GPAA claims, leases, and member programs—always follow posted
                rules on site.
              </span>
            </li>
            <li className="flex gap-2.5">
              <CheckCircle2Icon
                className="mt-0.5 size-5 shrink-0 text-[var(--brand-primary)]"
                aria-hidden
              />
              <span>
                <span className="font-medium text-[#1c1d1d]">
                  Education &amp; community
                </span>{" "}
                — Gold Prospectors Magazine, chapters, and member field reports
                so you’re not guessing alone.
              </span>
            </li>
            <li className="flex gap-2.5">
              <CheckCircle2Icon
                className="mt-0.5 size-5 shrink-0 text-[var(--brand-primary)]"
                aria-hidden
              />
              <span>
                <span className="font-medium text-[#1c1d1d]">
                  Partner gear in this path
                </span>{" "}
                — choose your equipment, then finish checkout in minutes.
              </span>
            </li>
          </ul>
          <div className="rounded-2xl border border-[var(--brand-border)] bg-white p-4 shadow-sm sm:p-5">
            <p className="text-sm font-medium text-[var(--brand-primary)]">
              {title}
            </p>
            {variants.length > 1 ? (
              <div className="mt-3 space-y-2">
                <Label htmlFor="variant" className="text-[var(--brand-body)]">
                  Choose your configuration
                </Label>
                <Select
                  value={selected ? variantKey(selected.id) : ""}
                  onValueChange={(key) => {
                    const v = variants.find((x) => variantKey(x.id) === key);
                    if (v) setSelectedId(v.id);
                  }}
                >
                  <SelectTrigger
                    id="variant"
                    className="h-auto min-h-11 w-full max-w-md border-[var(--brand-border)] bg-white py-2.5 text-[var(--brand-body)]"
                  >
                    {/* Base UI SelectValue shows the raw `value` string; render the label explicitly. */}
                    <span
                      data-slot="select-value"
                      className="line-clamp-2 w-full min-w-0 flex-1 text-left text-sm"
                    >
                      {selected
                        ? `${getVariantDisplayTitle(selected)} — ${formatMoney(selected)}`
                        : "Select a model"}
                    </span>
                  </SelectTrigger>
                  <SelectContent className="border-[var(--brand-border)] bg-white text-[var(--brand-body)] shadow-lg">
                    {variants.map((v) => (
                      <SelectItem key={v.id} value={variantKey(v.id)}>
                        {getVariantDisplayTitle(v)} — {formatMoney(v)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            ) : selected ? (
              <p className="mt-2 text-sm text-[var(--brand-body)]">
                {variantLabel} · {formatMoney(selected)}
              </p>
            ) : (
              <p className="mt-2 text-sm text-amber-800">
                Pricing and options will appear here when this product is
                available.
              </p>
            )}
            {error ? (
              <p className="mt-2 text-sm text-red-600" role="alert">
                {error}
              </p>
            ) : null}
            {compareSavings ? (
              <p
                className="mt-4 text-sm text-[var(--brand-body)]"
                aria-live="polite"
              >
                <span className="text-[var(--brand-muted)] line-through">
                  {compareSavings.compareLabel}
                </span>
                <span className="ml-2 font-semibold text-[var(--brand-primary)]">
                  Save {compareSavings.savingsPct}%
                </span>
              </p>
            ) : null}
            <Button
              type="button"
              size="lg"
              className={cn(
                "inline-flex h-12 w-full max-w-md items-center justify-center gap-2 rounded-xl border-0 bg-[var(--brand-accent)] text-[var(--brand-accent-foreground)] shadow-md hover:bg-[var(--brand-accent)]/92 sm:w-auto",
                compareSavings ? "mt-3" : "mt-4"
              )}
              disabled={!selected?.id || pending || isLoading}
              onClick={handleAdd}
            >
              {pending || isLoading ? (
                <>
                  <Loader2Icon className="size-4 animate-spin" />
                  Adding…
                </>
              ) : (
                "Get lifetime access + gear"
              )}
            </Button>
            <p className="mt-3 text-xs leading-relaxed text-[var(--brand-muted)]">
              Encrypted checkout · Major cards and mobile wallets where
              available · Complete your order in a few taps before you leave for
              the claim
            </p>
          </div>
        </div>

        <div className="order-1 flex min-w-0 flex-col gap-3 lg:order-2">
          <div className="relative aspect-[4/3] w-full min-h-0 overflow-hidden rounded-3xl border border-[var(--brand-border)] bg-[var(--brand-image-chrome)] shadow-lg ring-1 ring-black/5">
            <Image
              src={heroImage}
              alt={heroAlt}
              fill
              unoptimized={imageSrcUnoptimized(heroImage)}
              className="object-cover object-center brightness-[1.1] contrast-[1.05] saturate-[1.06]"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-white/10" />
            <div className="absolute bottom-3 left-3 right-3 rounded-xl border border-[var(--brand-border)] bg-white/95 p-3 text-sm shadow-md backdrop-blur-sm sm:bottom-4 sm:left-4 sm:right-4 sm:p-4">
              <p className="font-medium text-[var(--brand-primary)]">
                {brand.bundleName}
              </p>
              <p className="text-xs text-[var(--brand-body)]">
                {selected
                  ? `${variantLabel} — ${formatMoney(selected)}`
                  : "Configure your bundle above."}
              </p>
            </div>
          </div>

          {galleryImages.length > 1 ? (
            <div className="flex flex-wrap gap-2 sm:gap-2.5">
              {galleryImages.map((img) => {
                const active = heroImage === img.url;
                return (
                  <button
                    key={img.url}
                    type="button"
                    onClick={() => setImageOverrideUrl(img.url)}
                    className={cn(
                      "relative size-16 shrink-0 overflow-hidden rounded-lg border-2 transition-colors sm:size-20",
                      active
                        ? "border-[var(--brand-accent)] ring-1 ring-[var(--brand-accent)]/30"
                        : "border-[var(--brand-border)] hover:border-[var(--brand-muted)]"
                    )}
                    aria-label="Show product image"
                    aria-pressed={active}
                  >
                    <Image
                      src={img.url}
                      alt={img.altText ?? product?.title ?? "Product"}
                      fill
                      unoptimized={imageSrcUnoptimized(img.url)}
                      className="object-cover object-center"
                      sizes="80px"
                    />
                  </button>
                );
              })}
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
