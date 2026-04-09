import Image from "next/image";

import type { BrandId, ShopifyProduct } from "@/types";
import { goldCubeStack } from "@/lib/gold-cube";
import { imageSrcUnoptimized, placeholderDeepDive } from "@/lib/placeholders";

const GOLD_CUBE_HOW = "https://goldcube.net/how-it-works-2/";
const GOLD_CUBE_UNI = "https://goldcube.net/gold-cube-university/";
const GOLD_CUBE_3 = "https://goldcube.net/product/gold-cube-3-stack-deluxe/";

const COPY = {
  name: "Gold Cube 3-Stack Deluxe",
  lede:
    "The concentrator included with your Gold Life Lifetime bundle—classify and concentrate with Gold Cube’s G-Force separation in a modular 3-stack setup you can expand later with trays, a trommel, or a Gold Banker.",
  highlights: [
    "Deluxe kit includes 1 water tray and 2 vortex trays",
    "Custom adjustable zinc-plated stand plus 1100 GPH 12 V pump, hose, and fitting",
    "G-Force Separator design forces material under water to break surface tension so flat gold is less likely to sail off the mats",
    "LDPE construction, made in America—modular for placer, beach, crushed ore, or recirculation at camp or on the creek",
  ],
  specs: [
    { label: "Configuration", value: "3-Stack Deluxe (water tray + vortex trays)" },
    { label: "Pump", value: "1100 GPH 12 V with hose and fitting" },
    { label: "Stand", value: "Custom adjustable stand (zinc plated)" },
    { label: "Construction", value: "LDPE (low-density poly), made in America" },
    { label: "Typical use", value: "Placer, beach, crushed ore, mine dump testing; in-water or off-site recirculation" },
  ],
  bestFor:
    "Moving classified material efficiently when you want a compact footprint and room to grow the system as you chase finer or flatter gold.",
};

function shouldShowGoldCubeDeepDive(
  brandId: BrandId,
  product: ShopifyProduct | null
): boolean {
  if (brandId !== "goldcube" || !product?.variants?.length) return false;
  if (/gold\s*cube|3\s*stack/i.test(product.title)) {
    return true;
  }
  return product.variants.some((v) => goldCubeStack(v) !== null);
}

export function GoldCubeDeepDive({
  brandId,
  product,
}: {
  brandId: BrandId;
  product: ShopifyProduct | null;
}) {
  if (!shouldShowGoldCubeDeepDive(brandId, product) || !product) {
    return null;
  }

  const heroSrc = placeholderDeepDive.goldcube.stack3;

  return (
    <section className="border-b border-[var(--brand-border)] bg-white py-14 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--brand-muted)]">
            Concentrator deep dive
          </p>
          <h2 className="font-heading mt-2 text-3xl font-semibold tracking-tight text-[var(--brand-primary)] sm:text-4xl">
            Gold Cube 3-Stack Deluxe
          </h2>
          <p className="mt-3 text-[var(--brand-body)]">
            This is the system bundled with GPAA Gold Life—full specs and how-to on{" "}
            <a
              href={GOLD_CUBE_HOW}
              className="font-medium text-[var(--brand-primary)] underline underline-offset-2 hover:opacity-90"
              target="_blank"
              rel="noopener noreferrer"
            >
              goldcube.net
            </a>{" "}
            and{" "}
            <a
              href={GOLD_CUBE_UNI}
              className="font-medium text-[var(--brand-primary)] underline underline-offset-2 hover:opacity-90"
              target="_blank"
              rel="noopener noreferrer"
            >
              Gold Cube University
            </a>
            .
          </p>
        </div>

        <div className="mt-10 flex flex-col gap-8 lg:flex-row lg:items-start lg:gap-10">
          <div className="relative mx-auto aspect-[4/3] w-full max-w-md shrink-0 overflow-hidden rounded-2xl border border-[var(--brand-border)] bg-[var(--brand-image-chrome)] lg:mx-0 lg:w-80">
            <Image
              src={heroSrc}
              alt={COPY.name}
              fill
              unoptimized={imageSrcUnoptimized(heroSrc)}
              className="object-contain object-center p-3"
              sizes="(max-width: 1024px) 100vw, 320px"
            />
          </div>

          <div className="min-w-0 flex-1">
            <h3 className="font-heading text-xl font-semibold text-[var(--brand-primary)] sm:text-2xl">
              {COPY.name}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-[var(--brand-body)] sm:text-base">
              {COPY.lede}
            </p>
            <p className="mt-2 text-xs text-[var(--brand-muted)]">
              <a
                href={GOLD_CUBE_3}
                className="font-medium text-[var(--brand-primary)] underline underline-offset-2 hover:opacity-90"
                target="_blank"
                rel="noopener noreferrer"
              >
                View product on Gold Cube
              </a>
            </p>

            <div className="mt-8 grid gap-8 lg:grid-cols-2">
              <div>
                <h4 className="text-sm font-semibold uppercase tracking-wide text-[var(--brand-primary)]">
                  Highlights
                </h4>
                <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed text-[#1c1d1d]">
                  {COPY.highlights.map((line) => (
                    <li key={line}>{line}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="text-sm font-semibold uppercase tracking-wide text-[var(--brand-primary)]">
                  Specifications (summary)
                </h4>
                <dl className="mt-3 space-y-2.5 text-sm">
                  {COPY.specs.map((row) => (
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
              <span className="font-semibold text-[#1c1d1d]">Best when: </span>
              {COPY.bestFor}
            </p>
            <p className="mt-4 text-xs leading-relaxed text-[var(--brand-muted)]">
              Pricing and kit contents can change. See goldcube.net for the latest.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
