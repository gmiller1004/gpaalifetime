import type { Metadata } from "next";

import { LegalDocument } from "@/components/legal/LegalDocument";
import { getSiteUrl } from "@/lib/seo";
import { shareImageMeta } from "@/lib/share-image";

const termsDescription =
  "Terms and conditions for the GPAA Gold Life store: orders, checkout, shipping, returns, and use of the Minelab, Garrett, and Gold Cube lifetime bundle site.";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ brand: string }>;
}): Promise<Metadata> {
  void (await params);
  const siteUrl = getSiteUrl();
  return {
    title: "Terms & Conditions",
    description: termsDescription,
    metadataBase: new URL(siteUrl),
    alternates: { canonical: "/terms" },
    robots: { index: true, follow: true },
    keywords: [
      "GPAA Gold Life terms",
      "GPAA",
      "store terms",
      "gold prospecting",
    ],
    openGraph: {
      title: "Terms & Conditions | GPAA Gold Life",
      description: termsDescription,
      url: "/terms",
      siteName: "GPAA Gold Life",
      locale: "en_US",
      type: "website",
      images: [shareImageMeta],
    },
    twitter: {
      card: "summary_large_image",
      title: "Terms & Conditions | GPAA Gold Life",
      description: termsDescription,
      images: [shareImageMeta.url],
    },
  };
}

export default function TermsPage() {
  return (
    <LegalDocument title="Terms & Conditions">
      <p>
        Welcome to the GPAA Gold Life partner bundle site, operated as an extension of
        the Gold Prospectors Association of America (GPAA) and the Lost Dutchman&apos;s
        Mining Association (LDMA). By accessing or using this site, you agree to these
        terms.
      </p>

      <h2>Eligibility and use</h2>
      <p>
        You agree to use this site only for lawful purposes and in a way that does not
        infringe the rights of others or restrict their use of the site. You must
        provide accurate information at checkout.
      </p>

      <h2>Products and pricing</h2>
      <p>
        Product descriptions, images, and pricing are subject to change without notice.
        We strive for accuracy; errors may be corrected where discovered. GPAA Lifetime
        Membership benefits and partner equipment bundles are described on this site
        and confirmed at checkout.
      </p>

      <h2>Orders and payment</h2>
      <p>
        When you place an order, you offer to purchase the items in your cart at the
        prices shown, plus applicable taxes and shipping. We reserve the right to
        refuse or cancel orders, including for suspected fraud, inventory limits, or
        pricing errors. Payment is processed through our commerce provider using
        industry-standard security practices.
      </p>

      <h2>Shipping and returns</h2>
      <p>
        Shipping timelines and return or exchange policies for physical goods follow the
        terms presented at checkout and in communications from GPAA or its fulfillment
        partners. Membership and digital benefits may be governed by separate GPAA
        terms.
      </p>

      <h2>Intellectual property</h2>
      <p>
        Content on this site—including text, graphics, logos, and partner marks—is
        owned by GPAA, its partners, or licensors and is protected by applicable laws.
        You may not copy, modify, or distribute site content without permission, except
        as allowed for personal, non-commercial use.
      </p>

      <h2>Disclaimer of warranties</h2>
      <p>
        This site and its content are provided “as is” and “as available.” To the fullest
        extent permitted by law, we disclaim warranties of merchantability, fitness for
        a particular purpose, and non-infringement. Nothing on this site is a guarantee
        of specific prospecting results.
      </p>

      <h2>Limitation of liability</h2>
      <p>
        To the fullest extent permitted by law, GPAA, LDMA, and their affiliates and
        partners are not liable for indirect, incidental, special, consequential, or
        punitive damages arising from your use of the site or products purchased
        through it. Our total liability for any claim related to the site or an order is
        limited to the amount you paid for that order.
      </p>

      <h2>Indemnity</h2>
      <p>
        You agree to indemnify and hold harmless GPAA, LDMA, and their affiliates from
        claims arising from your misuse of the site or violation of these terms.
      </p>

      <h2>Governing law</h2>
      <p>
        These terms are governed by the laws of the State of California, without
        regard to conflict-of-law rules, except where prohibited by law.
      </p>

      <h2>Contact</h2>
      <p>
        Questions about these terms may be directed to GPAA using the mailing address
        and phone number shown in the site footer.
      </p>

      <p className="text-xs text-[var(--brand-muted)]">
        Last updated: April 8, 2026
      </p>
    </LegalDocument>
  );
}
