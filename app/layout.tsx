import type { Metadata } from "next";
import { DM_Sans, Fraunces, Geist_Mono } from "next/font/google";

import "./globals.css";

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

export const metadata: Metadata = {
  title: {
    default: "GPAA Gold Life | Lifetime Membership Bundles",
    template: "%s | GPAA Gold Life",
  },
  description:
    "Gold Life pairs GPAA Lifetime Membership with Minelab, Garrett, and Gold Cube bundles — secure checkout at gpaalifetime.com.",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://gpaalifetime.com"
  ),
  icons: {
    icon: [{ url: faviconSrc, type: "image/png", sizes: "1200x1200" }],
    apple: [{ url: faviconSrc, type: "image/png", sizes: "180x180" }],
    shortcut: faviconSrc,
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
        {children}
      </body>
    </html>
  );
}
