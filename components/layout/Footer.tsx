import Link from "next/link";

import type { BrandConfig } from "@/lib/brands";
import { getOtherBundleNavItems } from "@/lib/bundle-urls";

export function Footer({
  brand,
  siteHost,
}: {
  brand: BrandConfig;
  siteHost: string;
}) {
  const otherBundles = getOtherBundleNavItems(brand.id, siteHost);
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-[var(--brand-border)] bg-white py-10 text-sm">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <p className="max-w-3xl text-balance leading-relaxed text-[#1c1d1d]">
          This site is an extension of the{" "}
          <span className="font-medium">Gold Prospectors Association of America</span>{" "}
          and the{" "}
          <span className="font-medium">Lost Dutchman&apos;s Mining Association</span>.
        </p>

        <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-10">
          <div>
            <p className="font-heading text-base font-semibold text-[var(--brand-primary)]">
              {brand.displayName}
            </p>
            <p className="mt-2 max-w-md text-balance leading-relaxed text-[#1c1d1d]">
              Gold Life bundles combine GPAA Lifetime Membership with trusted partner
              gear. Secure checkout—fast and mobile-ready.
            </p>
          </div>

          <div className="flex flex-col gap-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-[var(--brand-muted)]">
              Organizations
            </span>
            <a
              href="https://goldprospectors.org"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--brand-primary)] underline-offset-4 transition-colors hover:underline"
            >
              goldprospectors.org
            </a>
            <a
              href="https://gpaastore.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--brand-primary)] underline-offset-4 transition-colors hover:underline"
            >
              gpaastore.com
            </a>
            <a
              href="https://myldma.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--brand-primary)] underline-offset-4 transition-colors hover:underline"
            >
              myldma.com
            </a>
            <a
              href="https://gpaalifetime.com"
              className="text-[var(--brand-primary)] underline-offset-4 transition-colors hover:underline"
            >
              gpaalifetime.com
            </a>
          </div>

          {otherBundles.length > 0 ? (
            <div className="flex flex-col gap-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-[var(--brand-muted)]">
                Other lifetime bundles
              </span>
              {otherBundles.map((item) => (
                <a
                  key={item.id}
                  href={item.href}
                  className="text-[var(--brand-primary)] underline-offset-4 transition-colors hover:underline"
                >
                  {item.label}
                </a>
              ))}
            </div>
          ) : null}

          <div className="flex flex-col gap-2 sm:col-span-2 lg:col-span-1">
            <span className="text-xs font-semibold uppercase tracking-wider text-[var(--brand-muted)]">
              Contact
            </span>
            <p className="leading-relaxed text-[#1c1d1d]">
              PO Box 891509
              <br />
              Temecula, CA 92589
            </p>
            <a
              href="tel:+18005519707"
              className="text-[var(--brand-primary)] underline-offset-4 transition-colors hover:underline"
            >
              800-551-9707
            </a>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-[var(--brand-border)] pt-6 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
          <div className="flex flex-wrap gap-x-4 gap-y-2 text-xs text-[var(--brand-muted)]">
            <Link
              href="/privacy"
              className="text-[var(--brand-primary)] underline-offset-4 hover:underline"
            >
              Privacy policy
            </Link>
            <Link
              href="/terms"
              className="text-[var(--brand-primary)] underline-offset-4 hover:underline"
            >
              Terms &amp; conditions
            </Link>
          </div>
          <p className="text-xs text-[var(--brand-muted)]">
            © {year} GPAA Gold Life. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
