import Image from "next/image";

import type { BrandConfig } from "@/lib/brands";
import {
  imageSrcUnoptimized,
  placeholderHero,
  placeholderStoryStrip,
} from "@/lib/placeholders";

function buildFrames(brand: BrandConfig) {
  return [
    {
      src: placeholderHero[brand.id],
      alt: brand.heroImageAlt,
      caption:
        "Your gear path — choose the setup that matches how you hunt gold.",
    },
    {
      src: placeholderStoryStrip[0],
      alt: "Forest creek at sunrise in gold country",
      caption:
        "Real ground — GPAA claims and leases are where you put boots and pans to work.",
    },
    {
      src: placeholderStoryStrip[1],
      alt: "Mountain landscape at dawn",
      caption:
        "Mining Guide & Online Property Guide — turn-by-turn access, maps, and member field notes.",
    },
  ] as const;
}

export function VisualStoryStrip({ brand }: { brand: BrandConfig }) {
  const frames = buildFrames(brand);

  return (
    <section className="border-b border-[var(--brand-border)] bg-white py-14 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--brand-muted)]">
            Three things to picture
          </p>
          <h2 className="font-heading mt-2 text-3xl font-semibold tracking-tight text-[var(--brand-primary)] sm:text-4xl">
            The gear, the ground, and the guidance
          </h2>
          <p className="mt-3 text-[var(--brand-body)]">
            A Gold Life bundle isn’t only detectors or recovery gear—it’s
            lifetime GPAA access to claims and leases, plus{" "}
            <span className="font-medium text-[#1c1d1d]">
              Gold Prospectors Magazine
            </span>
            , local chapters, and the Mining Guide and Online Property Guide so
            you know where to go and what other members found before you.
          </p>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {frames.map((frame, index) => (
            <figure
              key={`${brand.id}-story-${index}`}
              className="overflow-hidden rounded-2xl border border-[var(--brand-border)] bg-[var(--brand-body-dim)] shadow-sm"
            >
              <div className="relative aspect-[4/3] w-full">
                <Image
                  src={frame.src}
                  alt={frame.alt}
                  fill
                  unoptimized={imageSrcUnoptimized(frame.src)}
                  className="object-cover object-center"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/55 to-transparent px-3 pb-3 pt-12">
                  <figcaption className="text-left text-xs font-medium leading-snug text-white">
                    {frame.caption}
                  </figcaption>
                </div>
              </div>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
