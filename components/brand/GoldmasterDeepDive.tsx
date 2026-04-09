import Image from "next/image";
import { ChevronDownIcon } from "lucide-react";

import type { BrandId, ShopifyProduct } from "@/types";
import {
  type GarrettGoldmasterCoil,
  garrettGoldmasterCoil,
} from "@/lib/garrett-goldmaster";
import { imageSrcUnoptimized, placeholderDeepDive } from "@/lib/placeholders";

const GARRETT_GM24K = "https://garrett.com/garrett-goldmaster-24k/";

const COPY: Record<
  GarrettGoldmasterCoil,
  {
    name: string;
    lede: string;
    highlights: string[];
    specs: { label: string; value: string }[];
    bestFor: string;
  }
> = {
  "610": {
    name: "6×10″ DD searchcoil (standard)",
    lede:
      "Garrett’s elliptical waterproof 6×10″ DD coil—wider sweep and DD format to help you work noisy, mineralized soils while hunting fine gold with the 48 kHz Goldmaster 24k platform.",
    highlights: [
      "DD-format elliptical coil sized for general gold prospecting—Garrett highlights DD performance in mineralized ground",
      "Waterproof searchcoil paired with a rainproof detector body for streams, washes, and wet weather",
      "Same 48 kHz VLF engine as the full GM24k system—tuned for small nugget sensitivity in the Goldmaster line",
      "Ideal when you want maximum ground coverage per sweep; bundle includes the 6″ coil too for tight spots",
    ],
    specs: [
      { label: "Operating frequency", value: "48 kHz VLF" },
      { label: "Coil", value: "6×10″ DD waterproof searchcoil" },
      { label: "Ground balance", value: "XGB (Xtreme Ground Balance) with Ground-Sync and TracLock" },
      { label: "Audio", value: "2-tone “Beep” mode and standard VCO “Zip” mode; vSAT threshold control" },
      { label: "Environmental", value: "Rainproof electronics; waterproof searchcoil" },
      { label: "Included audio", value: "Garrett Clearsound Easy Stow headphones with volume control" },
    ],
    bestFor:
      "Open ground, mineralized patches, and situations where a larger DD coil helps stabilize ground response while you cover area.",
  },
  "6": {
    name: "6″ searchcoil",
    lede:
      "The compact 6″ waterproof coil option—Garrett markets it to concentrate the Goldmaster 24k’s field for tight brush, obstacles, and pinpointing along bedrock where a smaller footprint matters.",
    highlights: [
      "Narrower coil for working around brush, rocks, and confined spaces with the same 48 kHz GM24k detector",
      "Waterproof searchcoil; use when you want less sweep width and more precise coil placement",
      "Same core feature set as the full system: XGB, two audio modes, iron/hot-rock tools, backlight, frequency shift",
      "With this bundle you already own both coils—swap to the 6″ for sniping and the DD for grid-searching open ground",
    ],
    specs: [
      { label: "Operating frequency", value: "48 kHz VLF" },
      { label: "Coil", value: "6″ waterproof searchcoil" },
      { label: "Ground balance", value: "XGB with Ground-Sync, TracLock, and Ground Scan mode" },
      { label: "Discrimination / stability", value: "Adjustable iron cancel; iron and hot-rock elimination in audio modes" },
      { label: "Controls", value: "Sensitivity 0–10, threshold, frequency shift for EMI" },
      { label: "Included audio", value: "Clearsound Easy Stow headphones with volume control" },
    ],
    bestFor:
      "Tight draws, tree cover, bedrock seams, and pinpoint passes—when a smaller coil makes it easier to keep the coil flat and on target.",
  },
};

function shouldShowGoldmasterDeepDive(
  brandId: BrandId,
  product: ShopifyProduct | null
): boolean {
  if (brandId !== "garrett" || !product?.variants?.length) return false;
  if (/goldmaster|gold\s*master|gm\s*24k|\b24k\b/i.test(product.title)) {
    return true;
  }
  return product.variants.some((v) => garrettGoldmasterCoil(v) !== null);
}

export function GoldmasterDeepDive({
  brandId,
  product,
}: {
  brandId: BrandId;
  product: ShopifyProduct | null;
}) {
  if (!shouldShowGoldmasterDeepDive(brandId, product) || !product) {
    return null;
  }

  return (
    <section className="border-b border-[var(--brand-border)] bg-white py-14 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--brand-muted)]">
            Detector deep dive
          </p>
          <h2 className="font-heading mt-2 text-3xl font-semibold tracking-tight text-[var(--brand-primary)] sm:text-4xl">
            Goldmaster 24k — two coils included
          </h2>
          <p className="mt-3 rounded-xl border border-[var(--brand-border)] bg-[var(--brand-body-dim)] px-4 py-3 text-sm leading-relaxed text-[var(--brand-body)] sm:px-5">
            <span className="font-semibold text-[#1c1d1d]">
              Both searchcoils ship with this Gold Life bundle
            </span>
            —the 6×10″ DD and the 6″ coil—so you can match brush, bedrock, and sweep
            width in the field without buying a second coil later. Same 48 kHz
            Goldmaster 24k detector; the sections below explain when to reach for each
            coil. Full specifications are on{" "}
            <a
              href={GARRETT_GM24K}
              className="font-medium text-[var(--brand-primary)] underline underline-offset-2 hover:opacity-90"
              target="_blank"
              rel="noopener noreferrer"
            >
              garrett.com
            </a>
            .
          </p>
        </div>

        <div className="mt-10 space-y-4">
          {(["610", "6"] as const).map((coil) => {
            const copy = COPY[coil];
            const panelSrc =
              coil === "610"
                ? placeholderDeepDive.garrett.coil610
                : placeholderDeepDive.garrett.coil6;

            return (
              <details
                key={coil}
                className="group overflow-hidden rounded-2xl border border-[var(--brand-border)] bg-[var(--brand-body-dim)] shadow-sm open:bg-white"
                open={coil === "610"}
              >
                <summary className="flex cursor-pointer list-none flex-col gap-4 p-4 sm:flex-row sm:items-stretch sm:gap-6 sm:p-6 [&::-webkit-details-marker]:hidden">
                  <div className="relative aspect-[4/3] w-full shrink-0 overflow-hidden rounded-xl border border-[var(--brand-border)] bg-[var(--brand-image-chrome)] sm:aspect-square sm:w-48 md:w-56">
                    <Image
                      src={panelSrc}
                      alt={copy.name}
                      fill
                      unoptimized={imageSrcUnoptimized(panelSrc)}
                      className="object-contain object-center p-2"
                      sizes="(max-width: 640px) 100vw, 280px"
                    />
                  </div>
                  <div className="flex min-w-0 flex-1 flex-col justify-center text-left">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h3 className="font-heading text-xl font-semibold text-[var(--brand-primary)] sm:text-2xl">
                          {copy.name}
                        </h3>
                        <p className="mt-2 text-sm leading-relaxed text-[var(--brand-body)] sm:text-base">
                          {copy.lede}
                        </p>
                      </div>
                      <ChevronDownIcon
                        className="mt-1 size-6 shrink-0 text-[var(--brand-muted)] transition-transform group-open:rotate-180"
                        aria-hidden
                      />
                    </div>
                    <p className="mt-3 text-xs text-[var(--brand-muted)]">
                      <a
                        href={GARRETT_GM24K}
                        className="font-medium text-[var(--brand-primary)] underline underline-offset-2 hover:opacity-90"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        View on Garrett.com
                      </a>
                    </p>
                  </div>
                </summary>
                <div className="border-t border-[var(--brand-border)] px-4 pb-6 pt-2 sm:px-6">
                  <div className="grid gap-8 lg:grid-cols-2">
                    <div>
                      <h4 className="text-sm font-semibold uppercase tracking-wide text-[var(--brand-primary)]">
                        Highlights
                      </h4>
                      <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed text-[#1c1d1d]">
                        {copy.highlights.map((line) => (
                          <li key={line}>{line}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold uppercase tracking-wide text-[var(--brand-primary)]">
                        Specifications (summary)
                      </h4>
                      <dl className="mt-3 space-y-2.5 text-sm">
                        {copy.specs.map((row) => (
                          <div
                            key={row.label}
                            className="flex flex-col gap-0.5 border-b border-[var(--brand-border)] pb-2 last:border-0 sm:flex-row sm:justify-between sm:gap-4"
                          >
                            <dt className="font-medium text-[var(--brand-muted)]">
                              {row.label}
                            </dt>
                            <dd className="text-[#1c1d1d]">{row.value}</dd>
                          </div>
                        ))}
                      </dl>
                    </div>
                  </div>
                  <p className="mt-6 rounded-xl border border-[var(--brand-border)] bg-[var(--brand-body-dim)] p-4 text-sm leading-relaxed text-[var(--brand-body)]">
                    <span className="font-semibold text-[#1c1d1d]">
                      Best when:{" "}
                    </span>
                    {copy.bestFor}
                  </p>
                  <p className="mt-4 text-xs leading-relaxed text-[var(--brand-muted)]">
                    Accessories, warranty terms, and regional offers can vary. See
                    garrett.com for the latest.
                  </p>
                </div>
              </details>
            );
          })}
        </div>
      </div>
    </section>
  );
}
