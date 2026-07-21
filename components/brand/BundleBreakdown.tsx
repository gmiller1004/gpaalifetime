import type { BrandConfig } from "@/lib/brands";
import { isGoldMonsterSeriesSoldOut } from "@/lib/gold-monster";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SoldOutBadge } from "@/components/brand/SoldOutBadge";
import type { ShopifyProduct } from "@/types";

export function BundleBreakdown({
  brand,
  product,
}: {
  brand: BrandConfig;
  product: ShopifyProduct | null;
}) {
  const membershipOnly = brand.membershipOnly;
  const gm2000SoldOut =
    brand.id === "minelab" &&
    isGoldMonsterSeriesSoldOut(product?.variants ?? [], "2000");

  return (
    <section className="border-b border-[var(--brand-border)] bg-white py-12 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--brand-muted)]">
            {membershipOnly ? "What's included" : "Inside this bundle"}
          </p>
          <h2 className="font-heading mt-2 text-3xl font-semibold tracking-tight text-[var(--brand-primary)] sm:text-4xl">
            {brand.bundleName}
          </h2>
          <p className="mt-3 text-[var(--brand-body)]">{brand.bundleDescription}</p>
          <p className="mt-3 text-sm text-[var(--brand-muted)]">
            {membershipOnly
              ? "One order: lifetime GPAA membership and member programs. Shipping, taxes, and fulfillment details are shown before you pay."
              : "One order: lifetime GPAA membership plus the equipment stack below. Shipping, taxes, and any options are shown before you pay."}
          </p>
        </div>
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {brand.bundleItems.map((item) => {
            const mentionsGm2000 =
              brand.id === "minelab" && item.title.includes("2000");

            return (
              <Card
                key={item.title}
                className="border-[var(--brand-border)] bg-[var(--brand-body-dim)] shadow-sm"
              >
                <CardHeader>
                  <CardTitle className="flex flex-wrap items-center gap-2 text-lg text-[var(--brand-primary)]">
                    <span>{item.title}</span>
                    {mentionsGm2000 && gm2000SoldOut ? (
                      <SoldOutBadge />
                    ) : null}
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-sm leading-relaxed text-[#1c1d1d]">
                  {mentionsGm2000 && gm2000SoldOut
                    ? "Gold Monster 1000 is available now. Gold Monster 2000 is sold out."
                    : item.description}
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
