import type { Metadata } from "next";
import { headers } from "next/headers";
import { notFound } from "next/navigation";

import { BrandShell } from "@/components/layout/BrandShell";
import { getBrandConfig, isBrandId } from "@/lib/brands";
import { brandCanonicalPath } from "@/lib/seo";
import { shareImageMeta } from "@/lib/share-image";
import type { BrandId } from "@/types";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://gpaalifetime.com";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ brand: string }>;
}): Promise<Metadata> {
  const { brand } = await params;
  if (!isBrandId(brand)) return {};
  const c = getBrandConfig(brand);
  const id = brand as BrandId;
  const canonicalPath = brandCanonicalPath(id);
  const partnerKeyword = c.displayName.split("×")[0]?.trim() ?? "";
  const keywords = [
    "GPAA",
    "Gold Life",
    "Lifetime Membership",
    partnerKeyword,
    "gold prospecting",
    "gold prospectors",
    c.bundleName,
  ].filter(Boolean);

  return {
    metadataBase: new URL(siteUrl),
    title: `${c.displayName} | Gold Life`,
    description: c.metaDescription,
    keywords,
    alternates: {
      canonical: canonicalPath,
    },
    robots: {
      index: true,
      follow: true,
    },
    openGraph: {
      title: `${c.displayName} | Gold Life`,
      description: c.metaDescription,
      url: canonicalPath,
      siteName: "GPAA Gold Life",
      locale: "en_US",
      type: "website",
      images: [shareImageMeta],
    },
    twitter: {
      card: "summary_large_image",
      title: `${c.displayName} | Gold Life`,
      description: c.metaDescription,
      images: [shareImageMeta.url],
    },
  };
}

export default async function BrandLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ brand: string }>;
}) {
  const { brand } = await params;
  if (!isBrandId(brand)) notFound();
  const config = getBrandConfig(brand);
  const h = await headers();
  const siteHost = h.get("x-forwarded-host") ?? h.get("host") ?? "";
  return (
    <BrandShell brand={config} siteHost={siteHost}>
      {children}
    </BrandShell>
  );
}
