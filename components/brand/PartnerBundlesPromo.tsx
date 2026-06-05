import Link from "next/link";
import { ArrowRightIcon } from "lucide-react";

import { getPartnerBundleNavItems } from "@/lib/bundle-urls";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function PartnerBundlesPromo({ siteHost }: { siteHost: string }) {
  const items = getPartnerBundleNavItems(siteHost);

  return (
    <section
      className="border-b border-[var(--brand-border)] bg-white py-12 sm:py-20"
      aria-labelledby="partner-bundles-heading"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--brand-muted)]">
            Partner bundles
          </p>
          <h2
            id="partner-bundles-heading"
            className="font-heading mt-2 text-3xl font-semibold tracking-tight text-[var(--brand-primary)] sm:text-4xl"
          >
            Add partner gear when you&apos;re ready
          </h2>
          <p className="mt-3 text-[var(--brand-body)]">
            Prefer lifetime GPAA plus field-tested equipment in one checkout?
            Each official Gold Life partner bundle includes the same membership
            core — only the gear path changes.
          </p>
        </div>
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {items.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              className="group block h-full rounded-2xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--brand-primary)]"
            >
              <Card
                className="h-full border-[var(--brand-border)] bg-[var(--brand-body-dim)] shadow-sm transition-[border-color,box-shadow,transform] group-hover:-translate-y-0.5 group-hover:border-[color-mix(in_srgb,var(--brand-primary)_25%,var(--brand-border))] group-hover:shadow-md"
                style={{
                  borderLeftWidth: "3px",
                  borderLeftColor: item.accentColor,
                }}
              >
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-start justify-between gap-2 text-lg text-[var(--brand-primary)]">
                    <span>{item.label}</span>
                    <ArrowRightIcon
                      className="mt-0.5 size-4 shrink-0 text-[var(--brand-muted)] transition-transform group-hover:translate-x-0.5 group-hover:text-[var(--brand-primary)]"
                      aria-hidden
                    />
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-sm leading-relaxed text-[#1c1d1d]">
                  {item.tagline}
                  <span className="mt-3 block text-xs font-medium text-[var(--brand-muted)] group-hover:text-[var(--brand-primary)]">
                    View bundle →
                  </span>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
