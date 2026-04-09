"use client";

import * as React from "react";
import { Loader2Icon } from "lucide-react";

import type { BrandConfig } from "@/lib/brands";
import { useCart } from "@/components/cart/cart-provider";
import { useVariantPreference } from "@/components/brand/variant-preference";
import { Button } from "@/components/ui/button";
import type { ShopifyProduct } from "@/types";

export function CTA({
  brand,
  product,
}: {
  brand: BrandConfig;
  product: ShopifyProduct | null;
}) {
  const { addBundle, isLoading, error } = useCart();
  const { preferredVariantId } = useVariantPreference();

  const variants = React.useMemo(
    () => product?.variants.filter((v) => v.availableForSale) ?? [],
    [product]
  );

  const variantToAdd = React.useMemo(() => {
    if (!variants.length) return undefined;
    if (preferredVariantId) {
      const match = variants.find((v) => v.id === preferredVariantId);
      if (match) return match;
    }
    return variants[0];
  }, [variants, preferredVariantId]);

  const [pending, setPending] = React.useState(false);

  async function handleClick() {
    if (!variantToAdd?.id) return;
    setPending(true);
    try {
      await addBundle(variantToAdd.id, 1);
    } finally {
      setPending(false);
    }
  }

  return (
    <section className="py-12 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="relative overflow-hidden rounded-3xl border border-[var(--brand-border)] bg-[var(--brand-body-dim)] p-6 shadow-sm sm:p-12">
          <div className="relative z-10 mx-auto max-w-2xl text-center">
            <h2 className="font-heading text-3xl font-semibold tracking-tight text-[var(--brand-primary)] sm:text-4xl">
              Ready for lifetime claims access and your gear?
            </h2>
            <p className="mt-3 text-[var(--brand-body)]">
              Add the {brand.bundleName} to your cart and complete secure
              checkout in minutes—most members finish on a phone before they
              head to the hills.
            </p>
            {error ? (
              <p className="mt-3 text-sm text-red-600" role="alert">
                {error}
              </p>
            ) : null}
            <Button
              type="button"
              size="lg"
              className="mt-6 inline-flex h-12 items-center justify-center gap-2 rounded-xl border-0 bg-[var(--brand-accent)] px-8 text-[var(--brand-accent-foreground)] shadow-md hover:bg-[var(--brand-accent)]/92"
              disabled={!variantToAdd?.id || pending || isLoading}
              onClick={handleClick}
            >
              {pending || isLoading ? (
                <>
                  <Loader2Icon className="size-4 animate-spin" />
                  Adding…
                </>
              ) : (
                "Secure my bundle — checkout"
              )}
            </Button>
            <p className="mt-4 text-xs leading-relaxed text-[var(--brand-muted)]">
              Taxes and shipping are shown before you pay. After you order, your
              confirmation email and GPAA member materials explain how to get
              help with fulfillment, equipment, or membership questions.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
