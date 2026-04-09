"use client";

import { usePathname } from "next/navigation";

import type { BrandConfig } from "@/lib/brands";
import { CartProvider } from "@/components/cart/cart-provider";
import { VariantPreferenceProvider } from "@/components/brand/variant-preference";
import { CartDrawer } from "@/components/layout/CartDrawer";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { GpaLifetimeValueStrip } from "@/components/layout/GpaLifetimeValueStrip";
import { PromoBar } from "@/components/layout/PromoBar";
import { cn } from "@/lib/utils";

/**
 * GPAA store palette (gpaastore.com theme): white page, #1c1d1d body text, #e8e8e1 borders, #f2f2f2 dim bands.
 * primaryColor → headings, links, icons; accentColor (or primary) → CTA fills; secondary / accentForeground → button text.
 */
export function BrandShell({
  brand,
  siteHost,
  children,
}: {
  brand: BrandConfig;
  /** Request host for bundle links (localhost vs. production subdomains). */
  siteHost: string;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isLegalPage =
    pathname?.includes("/privacy") || pathname?.includes("/terms");

  const accent = brand.accentColor ?? brand.primaryColor;
  const accentFg = brand.accentForegroundColor ?? brand.secondaryColor;

  const themeVars = {
    "--brand-primary": brand.primaryColor,
    "--brand-primary-foreground": brand.secondaryColor,
    "--brand-accent": accent,
    "--brand-accent-foreground": accentFg,
    "--brand-bg": brand.backgroundColor,
    "--brand-surface": brand.backgroundColor,
    "--brand-body": "#1c1d1d",
    "--brand-muted": "#5f6368",
    "--brand-border": "#e8e8e1",
    "--brand-body-dim": "#f2f2f2",
    "--brand-image-chrome": "#0f0f0f",
    ...(brand.id === "garrett"
      ? {
          "--brand-muted": "#6b6560",
          "--brand-border": "#ddd9d4",
          "--brand-body-dim": "#f0eeec",
          "--brand-image-chrome": "#2a2624",
        }
      : {}),
  } as React.CSSProperties;

  return (
    <CartProvider>
      <VariantPreferenceProvider>
        <div
          className={cn(
            "brand-surface flex min-h-screen flex-col text-[var(--brand-body)]",
            brand.id === "garrett" && "brand-surface-garrett"
          )}
          style={themeVars}
        >
          <div className="sticky top-0 z-40">
            <Header brand={brand} siteHost={siteHost} />
            <PromoBar />
          </div>
          {!isLegalPage ? <GpaLifetimeValueStrip brand={brand} /> : null}
          <main className="flex-1">{children}</main>
          <Footer brand={brand} siteHost={siteHost} />
          <CartDrawer />
        </div>
      </VariantPreferenceProvider>
    </CartProvider>
  );
}
