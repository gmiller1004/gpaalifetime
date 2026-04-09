"use client";

import Image from "next/image";
import Link from "next/link";
import { ShoppingCartIcon } from "lucide-react";

import type { BrandConfig } from "@/lib/brands";
import { BundleNavMenu } from "@/components/layout/BundleNavMenu";
import { useCart } from "@/components/cart/cart-provider";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

function partnerLogoAlt(brand: BrandConfig): string {
  if (brand.coBrandLogoSrc) {
    const left = brand.displayName.split("×")[0]?.trim();
    return left ? `${left} logo` : "Partner logo";
  }
  return `${brand.displayName} logo`;
}

export function Header({
  brand,
  siteHost,
}: {
  brand: BrandConfig;
  siteHost: string;
}) {
  const { lineCount, setDrawerOpen } = useCart();
  const coBranded = Boolean(brand.coBrandLogoSrc);

  return (
    <header className="border-b border-white/[0.06] bg-[#050505]/92 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3 sm:gap-4 sm:px-6">
        <Link
          href="/"
          className="group flex min-w-0 items-center gap-2 sm:gap-3"
        >
          <div className="flex shrink-0 items-center gap-2 sm:gap-3">
            <div className="relative h-9 w-[7.25rem] shrink-0 sm:h-11 sm:w-40">
              <Image
                src={brand.logoSrc}
                alt={partnerLogoAlt(brand)}
                fill
                className="object-contain object-left transition-opacity group-hover:opacity-95 group-active:opacity-90"
                priority
                sizes="(max-width: 640px) 120px, 180px"
              />
            </div>
            {brand.coBrandLogoSrc ? (
              <>
                <span
                  className="hidden h-7 w-px shrink-0 bg-white/15 sm:block"
                  aria-hidden
                />
                <div className="relative h-9 w-[5.5rem] shrink-0 sm:h-11 sm:w-28">
                  <Image
                    src={brand.coBrandLogoSrc}
                    alt="GPAA Gold Life logo"
                    fill
                    className="object-contain object-left transition-opacity group-hover:opacity-95 group-active:opacity-90"
                    priority
                    sizes="(max-width: 640px) 100px, 130px"
                  />
                </div>
              </>
            ) : null}
          </div>
          <div className="min-w-0 flex flex-col justify-center">
            {!coBranded ? (
              <span className="font-heading text-xs font-semibold tracking-tight text-white/95 underline-offset-4 transition-colors group-hover:text-white group-hover:underline group-hover:decoration-white/35 sm:text-sm">
                Gold Life
              </span>
            ) : null}
            <span
              className={
                coBranded
                  ? "line-clamp-2 text-[11px] text-white/60 sm:line-clamp-none sm:max-w-[240px] sm:text-xs sm:text-white/65"
                  : "hidden max-w-[200px] truncate text-xs text-white/60 sm:block"
              }
            >
              {brand.tagline}
            </span>
          </div>
        </Link>

        <div className="flex shrink-0 items-center gap-2">
          <BundleNavMenu brand={brand} siteHost={siteHost} />
          <Badge
            variant="outline"
            className="hidden border-white/20 bg-white/10 text-[10px] text-white/90 sm:inline-flex"
          >
            GPAA Lifetime
          </Badge>
          <Button
            type="button"
            variant="secondary"
            size="sm"
            className="relative border border-white/20 bg-white/10 text-white shadow-sm hover:bg-white/15"
            onClick={() => setDrawerOpen(true)}
            aria-label="Open cart"
          >
            <ShoppingCartIcon className="size-4" />
            {lineCount > 0 ? (
              <span className="absolute -top-1 -right-1 flex size-4 items-center justify-center rounded-full bg-white text-[10px] font-bold text-neutral-900">
                {lineCount > 9 ? "9+" : lineCount}
              </span>
            ) : null}
          </Button>
        </div>
      </div>
    </header>
  );
}
