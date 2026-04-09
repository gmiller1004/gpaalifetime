/**
 * Paths under /public/placeholders.
 *
 * Next.js serves files by exact URL — the string here must match the filename on disk
 * (including .jpg vs .webp vs .gif). If you only **replace** a file and keep the same
 * name (e.g. still `deep-dive-gold-cube-3stack.jpg`), you do **not** need to touch code.
 * If you rename or change extension, update the matching line in this file once.
 *
 * Supported formats: SVG, PNG, JPEG, WebP, GIF (see imageSrcUnoptimized for GIF).
 */

export const placeholderHero = {
  default: "/placeholders/hero-default.svg",
  minelab: "/placeholders/hero-minelab.webp",
  garrett: "/placeholders/hero-garrett.jpg",
  goldcube: "/placeholders/hero-goldcube.png",
} as const;

/** Story strip panels 2–3 only. Panel 1 uses `placeholderHero` for the active brand. */
export const placeholderStoryStrip = [
  "/placeholders/story-strip-02.jpg",
  "/placeholders/story-strip-03.jpg",
] as const;

/**
 * Deep-dive panels always load these paths (not Shopify variant images), so
 * the art matches what you ship in /public/placeholders. Hero and product
 * galleries still use the store.
 */
/** Gold Prospectors Magazine — cover mockup in the magazine section. */
export const placeholderMagazineMockup =
  "/placeholders/magazine-mockup.jpg" as const;

export const placeholderDeepDive = {
  minelab: {
    gm1000: "/placeholders/deep-dive-minelab-gm1000.webp",
    gm2000: "/placeholders/deep-dive-minelab-gm2000.webp",
  },
  garrett: {
    coil610: "/placeholders/deep-dive-garrett-coil-610.jpg",
    coil6: "/placeholders/deep-dive-garrett-coil-6.png",
  },
  goldcube: {
    stack3: "/placeholders/deep-dive-gold-cube-3stack.jpg",
  },
} as const;

/**
 * Use with next/image for GIFs — the optimizer can strip animation for local/remote GIFs.
 */
export function imageSrcUnoptimized(src: string): boolean {
  const path = src.split("?")[0]?.toLowerCase() ?? "";
  return path.endsWith(".gif");
}
