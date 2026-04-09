import { notFound } from "next/navigation";

import { Benefits } from "@/components/brand/Benefits";
import { BundleBreakdown } from "@/components/brand/BundleBreakdown";
import { ConversionFAQ } from "@/components/brand/ConversionFAQ";
import { CTA } from "@/components/brand/CTA";
import { GoldCubeDeepDive } from "@/components/brand/GoldCubeDeepDive";
import { GoldmasterDeepDive } from "@/components/brand/GoldmasterDeepDive";
import { GoldMonsterDeepDive } from "@/components/brand/GoldMonsterDeepDive";
import { GoldProspectorsMagazineSection } from "@/components/brand/GoldProspectorsMagazineSection";
import { GpaaClaimsAndGuide } from "@/components/brand/GpaaClaimsAndGuide";
import { Hero } from "@/components/brand/Hero";
import { KitShowcase } from "@/components/brand/KitShowcase";
import { MemberReviews } from "@/components/brand/MemberReviews";
import { ProofMetrics } from "@/components/brand/ProofMetrics";
import { TrustStrip } from "@/components/brand/TrustStrip";
import { VisualStoryStrip } from "@/components/brand/VisualStoryStrip";
import { getBrandConfig, isBrandId } from "@/lib/brands";
import { getProductByHandle } from "@/lib/shopify.server";

export default async function BrandHomePage({
  params,
}: {
  params: Promise<{ brand: string }>;
}) {
  const { brand } = await params;
  if (!isBrandId(brand)) notFound();

  const config = getBrandConfig(brand);
  const product = await getProductByHandle(config.productHandle);

  return (
    <>
      <Hero brand={config} product={product} />
      <TrustStrip />
      <ProofMetrics />
      <Benefits />
      <VisualStoryStrip brand={config} />
      <BundleBreakdown brand={config} />
      <GoldMonsterDeepDive brandId={brand} product={product} />
      <GoldmasterDeepDive brandId={brand} product={product} />
      <GoldCubeDeepDive brandId={brand} product={product} />
      <KitShowcase />
      <MemberReviews />
      <GpaaClaimsAndGuide />
      <GoldProspectorsMagazineSection />
      <ConversionFAQ />
      <CTA brand={config} product={product} />
    </>
  );
}
