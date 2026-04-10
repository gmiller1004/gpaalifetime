"use client";

import * as React from "react";
import { usePathname } from "next/navigation";

import { trackPageView } from "@/lib/analytics";

/**
 * GA4: gtag config fires an initial page_view; this sends page_view on client navigations only.
 */
export function GaRouteTracker() {
  const pathname = usePathname();
  const first = React.useRef(true);

  React.useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    trackPageView(pathname ?? "/");
  }, [pathname]);

  return null;
}
