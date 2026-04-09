import type { BrandConfig } from "@/lib/brands";

/**
 * Persuasive, membership-first strip: GPAA Lifetime is the “why”; the partner bundle is the add-on perk.
 */
export function GpaLifetimeValueStrip({ brand }: { brand: BrandConfig }) {
  return (
    <section
      className="border-b border-[var(--brand-border)] bg-[var(--brand-body-dim)]"
      aria-labelledby="gpa-lifetime-value-heading"
    >
      <div className="mx-auto max-w-6xl px-4 py-7 sm:px-6 sm:py-8">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--brand-muted)]">
          GPAA Lifetime Membership
        </p>
        <h2
          id="gpa-lifetime-value-heading"
          className="font-heading mt-2 max-w-3xl text-balance text-2xl font-semibold leading-tight tracking-tight text-[var(--brand-primary)] sm:text-3xl"
        >
          Lifetime access to real places to find gold.
        </h2>
        <p className="mt-3 max-w-3xl text-pretty text-sm leading-relaxed text-[var(--brand-body)] sm:text-base">
          Claims, leases, and the Mining Guide &amp; Online Property Guide—so you know
          where you&apos;re welcome to prospect, for life. Your{" "}
          <span className="font-medium text-[#1c1d1d]">{brand.bundleName}</span> is
          the add-on: partner gear and member-friendly pricing in{" "}
          <span className="font-medium text-[#1c1d1d]">one secure checkout</span>.
        </p>
      </div>
    </section>
  );
}
