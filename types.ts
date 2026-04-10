/**
 * Shared TypeScript types for the GPAA Gold Life headless storefront.
 */

export type BrandId = "default" | "minelab" | "garrett" | "goldcube";

export interface Money {
  amount: string;
  currencyCode: string;
}

export interface ShopifyImage {
  url: string;
  altText: string | null;
}

export interface VariantSelectedOption {
  name: string;
  value: string;
}

export interface ShopifyProductVariant {
  id: string;
  title: string;
  availableForSale: boolean;
  price: Money;
  /** When set and above `price`, shown as strikethrough “compare at” in the hero. */
  compareAtPrice: Money | null;
  image: ShopifyImage | null;
  /** Option values when the variant title is generic (e.g. Default Title). */
  selectedOptions?: VariantSelectedOption[];
}

export interface ShopifyProduct {
  id: string;
  title: string;
  description: string;
  handle: string;
  featuredImage: ShopifyImage | null;
  /** Product gallery (dedupe with featured in UI). */
  images: ShopifyImage[];
  variants: ShopifyProductVariant[];
}

export interface CartLineMerchandise {
  id: string;
  title: string;
  product: { title: string; handle: string };
  price: Money;
  image: ShopifyImage | null;
}

export interface CartLine {
  id: string;
  quantity: number;
  merchandise: CartLineMerchandise;
}

export interface ShopifyCart {
  id: string;
  checkoutUrl: string;
  /** Cart / order note (customer-visible; flows to checkout). */
  note: string | null;
  lines: CartLine[];
}
