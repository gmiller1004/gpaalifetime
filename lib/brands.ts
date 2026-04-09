/**
 * Central brand configuration for subdomain co-branding (gpaalifetime.com + partner subdomains).
 * Base page matches GPAA Shopify (gpaastore.com): white field, dark body text.
 * Partnership primaryColor for headings, CTAs, badges, links.
 */

import type { BrandId } from "@/types";
import { placeholderHero } from "@/lib/placeholders";

export type { BrandId };

export interface BrandBundleItem {
  title: string;
  description: string;
}

export interface BrandConfig {
  id: BrandId;
  slug: BrandId;
  productHandle: string;
  displayName: string;
  tagline: string;
  /** Headings, links, icons (partnership “ink” color; on white backgrounds) */
  primaryColor: string;
  /** Text on solid primary buttons when accent is not set (typically white) */
  secondaryColor: string;
  /** CTA / highlight fill (e.g. Garrett yellow). Defaults to primaryColor when omitted. */
  accentColor?: string;
  /** Text on accent buttons (e.g. dark on yellow). Defaults to secondaryColor when omitted. */
  accentForegroundColor?: string;
  /** Page background — matches GPAA store body (#fff) */
  backgroundColor: string;
  heroHeadline: string;
  heroSubheadline: string;
  bundleName: string;
  bundleDescription: string;
  bundleItems: BrandBundleItem[];
  /** Partner or primary mark (e.g. Minelab, Garrett). */
  logoSrc: string;
  /** GPAA Gold Life mark beside the partner logo on co-branded pages. */
  coBrandLogoSrc?: string;
  heroImageSrc: string;
  heroImageAlt: string;
  metaDescription: string;
}

/** Aligns with GPAA store theme body (--colorBody) */
const GPAA_STORE_PAGE_BG = "#FFFFFF";

const kitMetaDescription =
  "GPAA Gold Life bundles pair a lifetime GPAA membership with premium prospecting gear—secure checkout, trusted by prospectors nationwide.";

export const brands: Record<BrandId, BrandConfig> = {
  default: {
    id: "default",
    slug: "default",
    productHandle: "gold-life-minelab",
    displayName: "GPAA Gold Life",
    tagline: "Lifetime membership. Legendary gear. One bundle.",
    primaryColor: "#D4AF37",
    secondaryColor: "#FFFFFF",
    backgroundColor: GPAA_STORE_PAGE_BG,
    heroHeadline: "Gold Life – GPAA Lifetime Membership",
    heroSubheadline:
      "Stop piecing together tips online—get lifetime GPAA access and your Gold Monster path in one checkout.",
    bundleName: "Minelab Gold Monster Bundle",
    bundleDescription:
      "Everything in the Minelab Gold Life stack: full GPAA Lifetime status plus your choice of Gold Monster detector.",
    bundleItems: [
      {
        title: "GPAA Lifetime Membership",
        description:
          "Full member benefits: claims access, publications, events, and community nationwide.",
      },
      {
        title: "Gold Monster 1000 or 2000",
        description:
          "Ultra-sensitive VLF performance—pick the model that matches your ground and targets.",
      },
      {
        title: "Secure fulfillment",
        description:
          "Bundled kit components and fulfillment details confirmed at checkout.",
      },
    ],
    logoSrc: "/brands/gpaa-gold-life.png",
    heroImageSrc: placeholderHero.default,
    heroImageAlt: "Prospector panning for gold in a mountain stream",
    metaDescription: kitMetaDescription,
  },
  minelab: {
    id: "minelab",
    slug: "minelab",
    productHandle: "gold-life-minelab",
    displayName: "Minelab × Gold Life",
    tagline: "Official Minelab partnership — find more gold.",
    primaryColor: "#E7262A",
    secondaryColor: "#FFFFFF",
    backgroundColor: GPAA_STORE_PAGE_BG,
    heroHeadline: "Gold Life – GPAA Lifetime Membership with Minelab",
    heroSubheadline:
      "Lifetime claims, chapters, and publications—plus the Minelab Gold Monster setup serious prospectors trust for small gold.",
    bundleName: "Minelab Gold Monster Bundle",
    bundleDescription:
      "Your Minelab Gold Life stack: lifetime GPAA access plus the Gold Monster configuration you choose.",
    bundleItems: [
      {
        title: "GPAA Lifetime Membership",
        description:
          "Full member benefits: claims access, publications, events, and community nationwide.",
      },
      {
        title: "Gold Monster 1000 or 2000",
        description:
          "Select the VLF detector tuned for small gold in tough, mineralized ground.",
      },
      {
        title: "Field-ready fulfillment",
        description:
          "Equipment and accessories ship according to your order confirmation.",
      },
    ],
    logoSrc: "/brands/minelab-co.svg",
    coBrandLogoSrc: "/brands/gpaa-gold-life.png",
    heroImageSrc: placeholderHero.minelab,
    heroImageAlt: "Forest creek gold country at sunrise",
    metaDescription: kitMetaDescription,
  },
  garrett: {
    id: "garrett",
    slug: "garrett",
    productHandle: "gold-life-garrett",
    displayName: "Garrett × Gold Life",
    tagline: "Official Garrett partnership — fine-gold performance.",
    /** Charcoal: headings & links (matches garrett.com greys on white) */
    primaryColor: "#332E2B",
    secondaryColor: "#FFFFFF",
    /** Logo / CTA yellow */
    accentColor: "#FFCC00",
    accentForegroundColor: "#1c1d1d",
    backgroundColor: GPAA_STORE_PAGE_BG,
    heroHeadline: "Gold Life – GPAA Lifetime Membership with Garrett",
    heroSubheadline:
      "Lifetime GPAA access plus Garrett’s fine-gold VLF—two coils so you can match bedrock, parks, and tight brush.",
    bundleName: "Garrett Goldmaster 24k Bundle",
    bundleDescription:
      "Garrett Gold Life: lifetime GPAA membership with the Goldmaster 24k and dual-coil flexibility.",
    bundleItems: [
      {
        title: "Goldmaster 24k with two coils",
        description:
          "High-frequency VLF for fine gold—switch coils for parks, bedrock, and tight spots.",
      },
      {
        title: "GPAA Lifetime Membership",
        description:
          "Claims access, publications, events, and prospector community for life.",
      },
      {
        title: "Secure checkout",
        description:
          "Complete your bundle online with trusted payment options.",
      },
    ],
    logoSrc: "/brands/garrett-co.svg",
    coBrandLogoSrc: "/brands/gpaa-gold-life.png",
    heroImageSrc: placeholderHero.garrett,
    heroImageAlt: "Misty mountains at dawn",
    metaDescription: kitMetaDescription,
  },
  goldcube: {
    id: "goldcube",
    slug: "goldcube",
    productHandle: "gold-life-gold-cube",
    displayName: "Gold Cube × Gold Life",
    tagline: "Gold Cube partnership — concentrate with confidence.",
    primaryColor: "#D4AF37",
    secondaryColor: "#FFFFFF",
    backgroundColor: GPAA_STORE_PAGE_BG,
    heroHeadline: "Gold Life – GPAA Lifetime Membership with Gold Cube",
    heroSubheadline:
      "Lifetime membership plus Gold Cube’s 3-Stack Deluxe—classify and concentrate fast when you’re moving serious material.",
    bundleName: "Gold Cube 3-Stack Bundle",
    bundleDescription:
      "Gold Cube Gold Life: lifetime GPAA membership plus the 3-Stack Deluxe concentration system.",
    bundleItems: [
      {
        title: "Gold Cube 3-Stack Deluxe",
        description:
          "Classify, concentrate, and retain gold efficiently—built for serious volume at camp or on the creek.",
      },
      {
        title: "GPAA Lifetime Membership",
        description:
          "Claims, community, education, and member events for life.",
      },
      {
        title: "Trusted fulfillment",
        description:
          "Order details and shipping confirmed at checkout.",
      },
    ],
    logoSrc: "/brands/goldcube-co.png",
    coBrandLogoSrc: "/brands/gpaa-gold-life.png",
    heroImageSrc: placeholderHero.goldcube,
    heroImageAlt: "River stones and rushing water",
    metaDescription: kitMetaDescription,
  },
};

export const BRAND_IDS = Object.keys(brands) as BrandId[];

/** Shopify product handles for GPAA Gold Life lifetime bundle products (used for cart note / paydirt tier). */
export const GOLD_LIFE_BUNDLE_PRODUCT_HANDLES = new Set(
  Object.values(brands).map((b) => b.productHandle)
);

export function isBrandId(value: string): value is BrandId {
  return value in brands;
}

export function getBrandConfig(brand: BrandId): BrandConfig {
  return brands[brand];
}

/** Map subdomain hostname segment to BrandId */
export function subdomainToBrandId(subdomain: string | null): BrandId {
  if (!subdomain) return "default";
  const key = subdomain.toLowerCase();
  if (key === "www") return "default";
  if (isBrandId(key)) return key;
  return "default";
}
