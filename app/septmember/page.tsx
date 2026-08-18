import { Benefits } from "@/components/brand/Benefits";
import { GoldProspectorsMagazineSection } from "@/components/brand/GoldProspectorsMagazineSection";
import { GpaaClaimsAndGuide } from "@/components/brand/GpaaClaimsAndGuide";
import { MemberReviews } from "@/components/brand/MemberReviews";
import { ProofMetrics } from "@/components/brand/ProofMetrics";
import { TrustStrip } from "@/components/brand/TrustStrip";
import { MailchimpSignupStrip } from "@/components/mailchimp/MailchimpSignupStrip";
import { SeptMemberCTA } from "@/components/septmember/SeptMemberCTA";
import { SeptMemberFAQ } from "@/components/septmember/SeptMemberFAQ";
import { SeptMemberFounderBag } from "@/components/septmember/SeptMemberFounderBag";
import { SeptMemberHero } from "@/components/septmember/SeptMemberHero";
import { SeptMemberKitStrip } from "@/components/septmember/SeptMemberKitStrip";
import { SeptMemberOfferCards } from "@/components/septmember/SeptMemberOfferCards";
import { getBrandConfig } from "@/lib/brands";
import { septMemberBenefitsIntro } from "@/lib/septmember";
import { SEPTMEMBER_PRODUCT_ID } from "@/lib/shopify-ids";
import { getProductById } from "@/lib/shopify.server";

export const revalidate = 60;

export default async function SeptMemberPage() {
  const product = await getProductById(SEPTMEMBER_PRODUCT_ID);
  const brand = {
    ...getBrandConfig("default"),
    benefitsIntro: septMemberBenefitsIntro,
  };

  return (
    <>
      <SeptMemberHero />
      <SeptMemberOfferCards product={product} />
      <SeptMemberFounderBag />
      <SeptMemberKitStrip />
      <TrustStrip />
      <ProofMetrics />
      <Benefits brand={brand} />
      <GpaaClaimsAndGuide />
      <GoldProspectorsMagazineSection />
      <MemberReviews />
      <SeptMemberFAQ />
      <MailchimpSignupStrip />
      <SeptMemberCTA />
    </>
  );
}
