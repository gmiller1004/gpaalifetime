import type { CSSProperties, ReactNode } from "react";
import { VariantPreferenceProvider } from "@/components/brand/variant-preference";
import { CartProvider } from "@/components/cart/cart-provider";
import { CartDrawer } from "@/components/layout/CartDrawer";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { ExitIntentModal } from "@/components/mailchimp/ExitIntentModal";
import type { BrandConfig } from "@/lib/brands";
import { cn } from "@/lib/utils";

export function SeptMemberShell({
  brand,
  siteHost,
  children,
}: {
  brand: BrandConfig;
  siteHost: string;
  children: ReactNode;
}) {
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
  } as CSSProperties;

  return (
    <CartProvider>
      <VariantPreferenceProvider>
        <div
          className={cn("brand-surface flex min-h-screen flex-col text-[var(--brand-body)]")}
          style={themeVars}
        >
          <div className="sticky top-0 z-40">
            <Header brand={brand} siteHost={siteHost} hidePartnerNav />
            <div
              role="note"
              className="border-b border-black/10 bg-[#C45C26] px-4 py-2.5 text-center text-xs font-semibold leading-snug text-white sm:text-sm"
            >
              <p className="mx-auto max-w-4xl text-balance">
                SeptMember Gold Giveaway — The Founder Bag is only available with a
                new lifetime membership
              </p>
            </div>
          </div>
          <main className="flex-1">{children}</main>
          <Footer brand={brand} siteHost={siteHost} hideOtherBundles />
          <CartDrawer />
          <ExitIntentModal />
        </div>
      </VariantPreferenceProvider>
    </CartProvider>
  );
}
