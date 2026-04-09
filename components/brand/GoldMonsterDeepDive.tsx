import Image from "next/image";
import { ChevronDownIcon } from "lucide-react";

import type { BrandId, ShopifyProduct } from "@/types";
import { goldMonsterSeries } from "@/lib/gold-monster";
import { imageSrcUnoptimized, placeholderDeepDive } from "@/lib/placeholders";

const MINELAB_GM1000 = "https://www.minelab.com/gold-monster-1000";
const MINELAB_GM2000 = "https://www.minelab.com/gold-monster-2000";

const COPY = {
  "1000": {
    name: "Gold Monster 1000",
    lede:
      "A straight-ahead 45 kHz VLF gold detector—easy to swing, quick to learn, and built to sniff out small gold in typical field conditions.",
    highlights: [
      "45 kHz VLF operation—strong sensitivity to small gold in shallow to mid-depth targets",
      "Gold Chance™ style feedback with continuous target audio so you stay on the tone",
      "Auto and manual sensitivity (1–10) plus automatic noise cancel for busy ground",
      "Lightweight build (~1.33 kg) with a shaft that collapses for travel and hiking",
      "Splash- and rain-resistant electronics; waterproof search coil to 1 m (3.3 ft)",
    ],
    specs: [
      { label: "Technology", value: "VLF at 45 kHz" },
      { label: "Search modes", value: "Gold, Deep All Metal" },
      { label: "Weight", value: "1.33 kg (2.94 lb)" },
      { label: "Water resistance", value: "Coil waterproof to 1 m; control box splash / rain proof" },
      { label: "Display", value: "Monochrome LCD" },
      { label: "Audio", value: "Built-in speaker, wired 3.5 mm headphone jack; wired headphones included" },
      { label: "Typical kit", value: "GM05 5\" Double‑D coil, Li‑ion batteries & charger, AA adapter, and more" },
    ],
    bestFor:
      "Newer prospectors, weekend trips, and ground where you want proven VLF performance without multi-frequency complexity.",
  },
  "2000": {
    name: "Gold Monster 2000",
    lede:
      "Minelab’s Multi-Au™ simultaneous multi-frequency engine—wider frequency spread for difficult soil, plus richer target feedback when you need more than a single tone.",
    highlights: [
      "Simultaneous multi-frequency (Multi-Au™) spanning roughly 12–76 kHz—designed to balance sensitivity and stability in mineralized ground",
      "Numeric Target ID (0–99) and Echo Wave™ audio for clearer separation between targets",
      "Enhanced ground handling for hot, noisy, or variable iron-rich soils vs a single-frequency machine",
      "IP55-rated control pod (rainproof), telescopic carbon-fiber style shaft, ~1.25 kg total weight",
      "Waterproof search coil to 1 m (3.3 ft) with modern control layout for longer sessions",
    ],
    specs: [
      { label: "Technology", value: "Multi-Au™ simultaneous multi-frequency (~12–76 kHz)" },
      { label: "Target ID", value: "0–99 with Echo Wave™ audio" },
      { label: "Weight", value: "~1.25 kg (lighter than the GM1000)" },
      { label: "Environmental", value: "IP55 control pod; coil waterproof to 1 m" },
      { label: "Shaft", value: "Telescopic carbon-fiber style (GM2000)" },
      { label: "Audio", value: "Echo Wave™ tone profiles for clearer target contrast" },
    ],
    bestFor:
      "Prospectors who push into hotter ground, want more target information, or plan longer seasons on varied terrain.",
  },
} as const;

export function GoldMonsterDeepDive({
  brandId,
  product,
}: {
  brandId: BrandId;
  product: ShopifyProduct | null;
}) {
  if (brandId !== "minelab" && brandId !== "default") {
    return null;
  }
  if (!product?.variants?.length) {
    return null;
  }

  const hasGoldMonster = product.variants.some(
    (v) => goldMonsterSeries(v) !== null
  );
  if (!hasGoldMonster) {
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
            Gold Monster 1000 vs 2000
          </h2>
          <p className="mt-3 text-[var(--brand-body)]">
            Both are serious gold machines—choose the one that matches your ground,
            experience, and how much target information you want at the coil. Full
            specifications are on{" "}
            <a
              href={MINELAB_GM1000}
              className="font-medium text-[var(--brand-primary)] underline underline-offset-2 hover:opacity-90"
              target="_blank"
              rel="noopener noreferrer"
            >
              minelab.com
            </a>
            .
          </p>
        </div>

        <div className="mt-10 space-y-4">
          {(["1000", "2000"] as const).map((series) => {
            const copy = COPY[series];
            const docUrl = series === "1000" ? MINELAB_GM1000 : MINELAB_GM2000;
            const panelSrc =
              series === "1000"
                ? placeholderDeepDive.minelab.gm1000
                : placeholderDeepDive.minelab.gm2000;

            return (
              <details
                key={series}
                className="group overflow-hidden rounded-2xl border border-[var(--brand-border)] bg-[var(--brand-body-dim)] shadow-sm open:bg-white"
                open={series === "1000"}
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
                        href={docUrl}
                        className="font-medium text-[var(--brand-primary)] underline underline-offset-2 hover:opacity-90"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        View on Minelab.com
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
                    Features and accessories can vary by region and model year. See
                    minelab.com for the latest.
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
