import type { Metadata } from "next";
import { DM_Sans, Fraunces, Geist_Mono } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";

import { GaRouteTracker } from "@/components/analytics/GaRouteTracker";
import { JsonLdSiteAndOrganization } from "@/components/seo/JsonLd";
import { shareImageMeta } from "@/lib/share-image";

import "./globals.css";

const gaMeasurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

const dmSans = DM_Sans({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const faviconSrc = "/brands/gpaa-gold-life.png";

const rootDescription =
  "Buy GPAA Lifetime Membership bundled with Minelab Gold Monster, Garrett Goldmaster, or Gold Cube gear—claims access, secure Shopify checkout, official GPAA Gold Life store.";

export const metadata: Metadata = {
  title: {
    default: "GPAA Gold Life | Lifetime Membership Bundles",
    template: "%s | GPAA Gold Life",
  },
  description: rootDescription,
  keywords: [
    "GPAA",
    "Gold Life",
    "GPAA Lifetime Membership",
    "Minelab Gold Monster",
    "Garrett Goldmaster",
    "Gold Cube",
    "gold prospecting equipment",
    "gold mining bundle",
  ],
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://gpaalifetime.com"
  ),
  robots: { index: true, follow: true },
  icons: {
    icon: [{ url: faviconSrc, type: "image/png", sizes: "1200x1200" }],
    apple: [{ url: faviconSrc, type: "image/png", sizes: "180x180" }],
    shortcut: faviconSrc,
  },
  openGraph: {
    type: "website",
    siteName: "GPAA Gold Life",
    title: "GPAA Gold Life | Lifetime Membership Bundles",
    description: rootDescription,
    images: [shareImageMeta],
  },
  twitter: {
    card: "summary_large_image",
    title: "GPAA Gold Life | Lifetime Membership Bundles",
    description: rootDescription,
    images: [shareImageMeta.url],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${dmSans.variable} ${fraunces.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-white text-[#1c1d1d]">
        <JsonLdSiteAndOrganization />
        {children}
        {gaMeasurementId ? (
          <>
            <GoogleAnalytics gaId={gaMeasurementId} />
            <GaRouteTracker />
          </>
        ) : null}
      </body>
    </html>
  );
}
