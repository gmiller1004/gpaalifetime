import "server-only";

import type { BrandConfig } from "@/lib/brands";
import { shopifyVariantGid } from "@/lib/shopify-ids";
import {
  mapProductNode,
  mapVariantByIdNode,
  PRODUCT_BY_HANDLE,
  storefrontFetch,
  VARIANT_BY_ID,
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
              compareAtPrice: { amount: string; currencyCode: string } | null;
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

export async function getProductByVariantId(
  variantId: string,
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
      node: Parameters<typeof mapVariantByIdNode>[0]["node"];
    }>(
      VARIANT_BY_ID,
      { id: shopifyVariantGid(variantId), country: country as "US" },
      { next: { revalidate: 60 } }
    );
    return mapVariantByIdNode(data);
  } catch {
    return null;
  }
}

/** Loads Shopify product for a brand (variant pin or product handle). */
export async function getProductForBrand(
  brand: BrandConfig
): Promise<ShopifyProduct | null> {
  if (brand.fixedVariantId) {
    const fromVariant = await getProductByVariantId(brand.fixedVariantId);
    if (fromVariant) return fromVariant;
  }
  return getProductByHandle(brand.productHandle);
}
