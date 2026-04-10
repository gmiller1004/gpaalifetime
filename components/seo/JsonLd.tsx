import { getSiteUrl } from "@/lib/seo";

/**
 * Organization + WebSite structured data for rich results eligibility.
 */
export function JsonLdSiteAndOrganization() {
  const url = getSiteUrl();
  const org = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Gold Prospectors Association of America",
    alternateName: "GPAA",
    url,
    description:
      "GPAA Gold Life offers GPAA Lifetime Membership bundled with Minelab, Garrett, and Gold Cube prospecting gear.",
  };
  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "GPAA Gold Life",
    url,
    publisher: { "@type": "Organization", name: "Gold Prospectors Association of America" },
  };
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(org) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(website) }}
      />
    </>
  );
}
