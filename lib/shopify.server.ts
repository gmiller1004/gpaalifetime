import "server-only";

import {
  mapProductNode,
  PRODUCT_BY_HANDLE,
  storefrontFetch,
} from "@/lib/shopify";
import type { ShopifyProduct } from "@/types";

/**
 * Cached product query for App Router server components.
 * Returns null when env is missing or Shopify errors (demo / build without secrets).
 */
export async function getProductByHandle(
  handle: string,
  country: string = "US"
): Promise<ShopifyProduct | null> {
  if (
    !process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN ||
    !process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN
  ) {
    return null;
  }
  try {
    const data = await storefrontFetch<{
      product: {
        id: string;
        title: string;
        description: string;
        handle: string;
        featuredImage: { url: string; altText: string | null } | null;
        images: {
          edges: Array<{
            node: { url: string; altText: string | null };
          }>;
        };
        variants: {
          edges: Array<{
            node: {
              id: string;
              title: string;
              availableForSale: boolean;
              price: { amount: string; currencyCode: string };
              selectedOptions: Array<{ name: string; value: string }>;
              image: { url: string; altText: string | null } | null;
            };
          }>;
        };
      } | null;
    }>(
      PRODUCT_BY_HANDLE,
      { handle, country: country as "US" },
      { next: { revalidate: 60 } }
    );
    return mapProductNode({ product: data.product });
  } catch {
    return null;
  }
}
