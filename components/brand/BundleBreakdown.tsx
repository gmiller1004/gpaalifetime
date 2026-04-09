import type { BrandConfig } from "@/lib/brands";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function BundleBreakdown({ brand }: { brand: BrandConfig }) {
  return (
    <section className="border-b border-[var(--brand-border)] bg-white py-12 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--brand-muted)]">
            Inside this bundle
          </p>
          <h2 className="font-heading mt-2 text-3xl font-semibold tracking-tight text-[var(--brand-primary)] sm:text-4xl">
            {brand.bundleName}
          </h2>
          <p className="mt-3 text-[var(--brand-body)]">{brand.bundleDescription}</p>
          <p className="mt-3 text-sm text-[var(--brand-muted)]">
            One order: lifetime GPAA membership plus the equipment stack below.
            Shipping, taxes, and any options are shown before you pay.
          </p>
        </div>
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {brand.bundleItems.map((item) => (
            <Card
              key={item.title}
              className="border-[var(--brand-border)] bg-[var(--brand-body-dim)] shadow-sm"
            >
              <CardHeader>
                <CardTitle className="text-lg text-[var(--brand-primary)]">
                  {item.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm leading-relaxed text-[#1c1d1d]">
                {item.description}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
