import type { Metadata } from "next";
import { headers } from "next/headers";
import type { ReactNode } from "react";

import { SeptMemberShell } from "@/components/layout/SeptMemberShell";
import { getBrandConfig } from "@/lib/brands";
import { septMemberBenefitsIntro, septMemberImages, septMemberMeta } from "@/lib/septmember";
import { isSeptMemberOnly } from "@/lib/septmember-cutover";

export const dynamic = "force-dynamic";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://gpaalifetime.com";

const ogImage = {
  url: septMemberImages.kitWide,
  width: 1600,
  height: 900,
  alt: "GPAA Lifetime kit with The Founder Bag, hat, and gold pan",
};

export function generateMetadata(): Metadata {
  const canonicalPath = isSeptMemberOnly() ? "/" : "/septmember";
  return {
    metadataBase: new URL(siteUrl),
    title: septMemberMeta.title,
    description: septMemberMeta.description,
    keywords: [
      "GPAA",
      "Gold Life",
      "Lifetime Membership",
      "SeptMember",
      "Founder Bag",
      "gold prospecting",
    ],
    alternates: {
      canonical: canonicalPath,
    },
    robots: {
      index: true,
      follow: true,
    },
    openGraph: {
      title: septMemberMeta.title,
      description: septMemberMeta.description,
      url: canonicalPath,
      siteName: "GPAA Gold Life",
      locale: "en_US",
      type: "website",
      images: [ogImage],
    },
    twitter: {
      card: "summary_large_image",
      title: septMemberMeta.title,
      description: septMemberMeta.description,
      images: [ogImage.url],
    },
  };
}

export default async function SeptMemberLayout({
  children,
}: {
  children: ReactNode;
}) {
  const brand = {
    ...getBrandConfig("default"),
    tagline: "SeptMember Gold Giveaway",
    benefitsIntro: septMemberBenefitsIntro,
  };
  const h = await headers();
  const siteHost = h.get("x-forwarded-host") ?? h.get("host") ?? "";

  return (
    <SeptMemberShell brand={brand} siteHost={siteHost}>
      {children}
    </SeptMemberShell>
  );
}
