/**
 * Shopify Storefront API (GraphQL) — shared client for browser + server.
 * Cart helpers are used from client components; keep tokens scoped to Storefront permissions only.
 */

import { computeAutoCartNote } from "@/lib/cart-notes";
import type {
  ShopifyCart,
  ShopifyImage,
  ShopifyProduct,
  ShopifyProductVariant,
} from "@/types";

const API_VERSION = "2024-10";

export function getShopifyEndpoint(): string {
  const domain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN;
  if (!domain) {
    throw new Error("NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN is not set");
  }
  const normalized = domain.replace(/^https?:\/\//, "").replace(/\/$/, "");
  return `https://${normalized}/api/${API_VERSION}/graphql.json`;
}

function getHeaders(): HeadersInit {
  const token = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN;
  if (!token) {
    throw new Error("NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN is not set");
  }
  return {
    "Content-Type": "application/json",
    "X-Shopify-Storefront-Access-Token": token,
  };
}

interface GraphQLResponse<T> {
  data?: T;
  errors?: { message: string }[];
}

/** Low-level GraphQL (works in browser for cart; use from server actions with care) */
export async function storefrontFetch<T>(
  query: string,
  variables?: Record<string, unknown>,
  init?: RequestInit
): Promise<T> {
  const res = await fetch(getShopifyEndpoint(), {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify({ query, variables }),
    ...init,
  });
  if (!res.ok) throw new Error(`Shopify HTTP ${res.status}`);
  const json = (await res.json()) as GraphQLResponse<T>;
  if (json.errors?.length) {
    throw new Error(json.errors.map((e) => e.message).join("; "));
  }
  if (!json.data) throw new Error("Shopify response missing data");
  return json.data;
}

export const PRODUCT_BY_HANDLE = /* GraphQL */ `
  query ProductByHandle($handle: String!, $country: CountryCode)
  @inContext(country: $country) {
    product(handle: $handle) {
      id
      title
      description
      handle
      featuredImage {
        url
        altText
      }
      images(first: 20) {
        edges {
          node {
            url
            altText
          }
        }
      }
      variants(first: 50) {
        edges {
          node {
            id
            title
            availableForSale
            price {
              amount
              currencyCode
            }
            selectedOptions {
              name
              value
            }
            image {
              url
              altText
            }
          }
        }
      }
    }
  }
`;

export function mapProductNode(data: {
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
}): ShopifyProduct | null {
  const p = data.product;
  if (!p) return null;

  const variants: ShopifyProductVariant[] = p.variants.edges.map(({ node: n }) => ({
    id: n.id,
    title: n.title,
    availableForSale: n.availableForSale,
    price: n.price,
    image: n.image
      ? { url: n.image.url, altText: n.image.altText }
      : null,
    selectedOptions:
      n.selectedOptions?.length > 0 ? n.selectedOptions : undefined,
  }));

  const images: ShopifyImage[] = p.images.edges.map(({ node: n }) => ({
    url: n.url,
    altText: n.altText,
  }));

  return {
    id: p.id,
    title: p.title,
    description: p.description,
    handle: p.handle,
    featuredImage: p.featuredImage
      ? { url: p.featuredImage.url, altText: p.featuredImage.altText }
      : null,
    images,
    variants,
  };
}

const CART_CREATE = /* GraphQL */ `
  mutation CartCreate($input: CartInput!) {
    cartCreate(input: $input) {
      cart {
        id
        checkoutUrl
        note
        lines(first: 50) {
          edges {
            node {
              id
              quantity
              merchandise {
                ... on ProductVariant {
                  id
                  title
                  price {
                    amount
                    currencyCode
                  }
                  image {
                    url
                    altText
                  }
                  product {
                    title
                    handle
                  }
                }
              }
            }
          }
        }
      }
      userErrors {
        field
        message
      }
    }
  }
`;

const CART_LINES_ADD = /* GraphQL */ `
  mutation CartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
    cartLinesAdd(cartId: $cartId, lines: $lines) {
      cart {
        id
        checkoutUrl
        note
        lines(first: 50) {
          edges {
            node {
              id
              quantity
              merchandise {
                ... on ProductVariant {
                  id
                  title
                  price {
                    amount
                    currencyCode
                  }
                  image {
                    url
                    altText
                  }
                  product {
                    title
                    handle
                  }
                }
              }
            }
          }
        }
      }
      userErrors {
        field
        message
      }
    }
  }
`;

const CART_LINES_REMOVE = /* GraphQL */ `
  mutation CartLinesRemove($cartId: ID!, $lineIds: [ID!]!) {
    cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
      cart {
        id
        checkoutUrl
        note
        lines(first: 50) {
          edges {
            node {
              id
              quantity
              merchandise {
                ... on ProductVariant {
                  id
                  title
                  price {
                    amount
                    currencyCode
                  }
                  image {
                    url
                    altText
                  }
                  product {
                    title
                    handle
                  }
                }
              }
            }
          }
        }
      }
      userErrors {
        field
        message
      }
    }
  }
`;

const CART_NOTE_UPDATE = /* GraphQL */ `
  mutation CartNoteUpdate($cartId: ID!, $note: String!) {
    cartNoteUpdate(cartId: $cartId, note: $note) {
      cart {
        id
        checkoutUrl
        note
        lines(first: 50) {
          edges {
            node {
              id
              quantity
              merchandise {
                ... on ProductVariant {
                  id
                  title
                  price {
                    amount
                    currencyCode
                  }
                  image {
                    url
                    altText
                  }
                  product {
                    title
                    handle
                  }
                }
              }
            }
          }
        }
      }
      userErrors {
        field
        message
      }
    }
  }
`;

const CART_QUERY = /* GraphQL */ `
  query Cart($cartId: ID!) {
    cart(id: $cartId) {
      id
      checkoutUrl
      note
      lines(first: 50) {
        edges {
          node {
            id
            quantity
            merchandise {
              ... on ProductVariant {
                id
                title
                price {
                  amount
                  currencyCode
                }
                image {
                  url
                  altText
                }
                product {
                  title
                  handle
                }
              }
            }
          }
        }
      }
    }
  }
`;

function mapCart(
  cart: {
    id: string;
    checkoutUrl: string;
    note?: string | null;
    lines: {
      edges: Array<{
        node: {
          id: string;
          quantity: number;
          merchandise: {
            id: string;
            title: string;
            price: { amount: string; currencyCode: string };
            image: { url: string; altText: string | null } | null;
            product: { title: string; handle: string };
          } | null;
        };
      }>;
    };
  } | null
): ShopifyCart | null {
  if (!cart) return null;
  const lines = cart.lines.edges
    .map((e) => e.node)
    .filter((n) => n.merchandise)
    .map((n) => ({
      id: n.id,
      quantity: n.quantity,
      merchandise: {
        id: n.merchandise!.id,
        title: n.merchandise!.title,
        price: n.merchandise!.price,
        image: n.merchandise!.image
          ? {
              url: n.merchandise!.image.url,
              altText: n.merchandise!.image.altText,
            }
          : null,
        product: n.merchandise!.product,
      },
    }));
  return {
    id: cart.id,
    checkoutUrl: cart.checkoutUrl,
    note: cart.note ?? null,
    lines,
  };
}

export async function createCartClient(
  merchandiseId: string,
  quantity: number = 1
): Promise<ShopifyCart> {
  const data = await storefrontFetch<{
    cartCreate: {
      cart: Parameters<typeof mapCart>[0];
      userErrors: { message: string }[];
    };
  }>(CART_CREATE, {
    input: {
      lines: [{ merchandiseId, quantity }],
    },
  });
  if (data.cartCreate.userErrors?.length) {
    throw new Error(data.cartCreate.userErrors.map((e) => e.message).join("; "));
  }
  const cart = mapCart(data.cartCreate.cart);
  if (!cart) throw new Error("Cart create returned empty cart");
  return cart;
}

export async function addCartLinesClient(
  cartId: string,
  lines: { merchandiseId: string; quantity: number }[]
): Promise<ShopifyCart> {
  const data = await storefrontFetch<{
    cartLinesAdd: {
      cart: Parameters<typeof mapCart>[0];
      userErrors: { message: string }[];
    };
  }>(CART_LINES_ADD, { cartId, lines });
  if (data.cartLinesAdd.userErrors?.length) {
    throw new Error(data.cartLinesAdd.userErrors.map((e) => e.message).join("; "));
  }
  const cart = mapCart(data.cartLinesAdd.cart);
  if (!cart) throw new Error("Cart lines add returned empty cart");
  return cart;
}

export async function removeCartLinesClient(
  cartId: string,
  lineIds: string[]
): Promise<ShopifyCart> {
  const data = await storefrontFetch<{
    cartLinesRemove: {
      cart: Parameters<typeof mapCart>[0];
      userErrors: { message: string }[];
    };
  }>(CART_LINES_REMOVE, { cartId, lineIds });
  if (data.cartLinesRemove.userErrors?.length) {
    throw new Error(
      data.cartLinesRemove.userErrors.map((e) => e.message).join("; ")
    );
  }
  const cart = mapCart(data.cartLinesRemove.cart);
  if (!cart) throw new Error("Cart lines remove returned empty cart");
  return cart;
}

export async function getCartClient(cartId: string): Promise<ShopifyCart | null> {
  const data = await storefrontFetch<{ cart: Parameters<typeof mapCart>[0] }>(
    CART_QUERY,
    { cartId }
  );
  return mapCart(data.cart);
}

export async function updateCartNoteClient(
  cartId: string,
  note: string | null
): Promise<ShopifyCart> {
  const data = await storefrontFetch<{
    cartNoteUpdate: {
      cart: Parameters<typeof mapCart>[0];
      userErrors: { message: string }[];
    };
  }>(CART_NOTE_UPDATE, { cartId, note: note ?? "" });
  if (data.cartNoteUpdate.userErrors?.length) {
    throw new Error(
      data.cartNoteUpdate.userErrors.map((e) => e.message).join("; ")
    );
  }
  const cart = mapCart(data.cartNoteUpdate.cart);
  if (!cart) throw new Error("Cart note update returned empty cart");
  return cart;
}

/**
 * Syncs cart note to bundle summary + paydirt tier (1 free $50 bag per $250 on qualifying
 * Gold Life bundle subtotal). Replaces prior auto note when the cart changes.
 */
export async function ensureGoldLifeBundleCartNote(
  cart: ShopifyCart
): Promise<ShopifyCart> {
  const next = computeAutoCartNote(cart.lines);
  const norm = (s: string | null | undefined) => (s ?? "").trim();
  if (norm(next) === norm(cart.note)) {
    return cart;
  }
  return updateCartNoteClient(cart.id, next);
}
