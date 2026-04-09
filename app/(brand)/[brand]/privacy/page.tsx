import type { Metadata } from "next";

import { LegalDocument } from "@/components/legal/LegalDocument";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Privacy Policy",
    description:
      "How GPAA Gold Life handles information when you use this partner bundle site.",
  };
}

export default function PrivacyPolicyPage() {
  return (
    <LegalDocument title="Privacy Policy">
      <p>
        GPAA Gold Life (“we,” “us”) operates this site as an extension of the Gold
        Prospectors Association of America (GPAA) and the Lost Dutchman&apos;s Mining
        Association (LDMA). This policy describes how we collect, use, and share
        information when you browse or purchase through this storefront.
      </p>

      <h2>Information we collect</h2>
      <ul>
        <li>
          <strong>Information you provide:</strong> name, email, phone, shipping and
          billing address, and payment details when you place an order or contact us.
        </li>
        <li>
          <strong>Order and device data:</strong> cart activity, checkout details,
          and technical data such as browser type, device identifiers, and IP address.
        </li>
        <li>
          <strong>Cookies and similar technologies:</strong> used to run the site,
          remember preferences, measure performance, and support secure checkout.
        </li>
      </ul>

      <h2>How we use information</h2>
      <p>We use information to:</p>
      <ul>
        <li>Process and fulfill orders, memberships, and partner bundle offers.</li>
        <li>Provide customer support and respond to inquiries.</li>
        <li>Improve the site, prevent fraud, and meet legal obligations.</li>
        <li>Send transactional messages about your order or account when needed.</li>
      </ul>

      <h2>Commerce and payments</h2>
      <p>
        Checkout and payment processing may be provided by Shopify or other service
        providers. Their use of data is governed by their respective policies. We do
        not store full payment card numbers on our servers when processing is handled
        by a certified provider.
      </p>

      <h2>Sharing</h2>
      <p>
        We may share information with service providers who assist with hosting,
        payments, shipping, analytics, and email; with GPAA/LDMA affiliates as needed
        to deliver membership benefits; and when required by law or to protect rights
        and safety.
      </p>

      <h2>Your choices</h2>
      <ul>
        <li>
          You may update account or contact details through the channels provided at
          checkout or by contacting GPAA using the information in the site footer.
        </li>
        <li>
          You can control cookies through your browser settings; disabling cookies may
          affect site functionality.
        </li>
      </ul>

      <h2>Children&apos;s privacy</h2>
      <p>
        This site is not directed to children under 13, and we do not knowingly
        collect personal information from children.
      </p>

      <h2>Changes</h2>
      <p>
        We may update this policy from time to time. The “last updated” indication at
        the bottom reflects the latest revision. Continued use of the site after
        changes means you accept the updated policy.
      </p>

      <p className="text-xs text-[var(--brand-muted)]">
        Last updated: April 8, 2026
      </p>
    </LegalDocument>
  );
}
