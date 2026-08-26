import Script from "next/script";

import {
  KLAVIYO_COMPANY_ID,
  KLAVIYO_OBJECT_STUB,
  KLAVIYO_ONSITE_SRC,
} from "@/lib/klaviyo-onsite";

/** Active on Site + identify queue. Same Company ID as goldprospectors.org. */
export function KlaviyoOnsite() {
  if (!KLAVIYO_COMPANY_ID) return null;
  return (
    <>
      <Script id="klaviyo-object" strategy="beforeInteractive">
        {KLAVIYO_OBJECT_STUB}
      </Script>
      <Script src={KLAVIYO_ONSITE_SRC} strategy="afterInteractive" />
    </>
  );
}
