"use client";

import { sendGAEvent } from "@next/third-parties/google";

import type { ShopifyCart } from "@/types";

export type MailchimpFormSource = "inline" | "exit_modal";

/** Call after route changes (initial load is covered by gtag config). */
export function trackPageView(pathname: string) {
  if (typeof window === "undefined") return;
  sendGAEvent("event", "page_view", {
    page_path: pathname,
    page_location: window.location.href,
    page_title: document.title,
  });
}

export function trackAddToCart(params: {
  currency: string;
  value: number;
  itemId: string;
  itemName: string;
  quantity?: number;
}) {
  sendGAEvent("event", "add_to_cart", {
    currency: params.currency,
    value: params.value,
    items: [
      {
        item_id: params.itemId,
        item_name: params.itemName,
        price: params.value,
        quantity: params.quantity ?? 1,
      },
    ],
  });
}

export function trackBeginCheckout(cart: ShopifyCart) {
  const currency =
    cart.lines[0]?.merchandise.price.currencyCode ?? "USD";
  const value = cart.lines.reduce(
    (sum, line) =>
      sum + Number(line.merchandise.price.amount) * line.quantity,
    0
  );
  const items = cart.lines.map((line) => ({
    item_id: line.merchandise.id,
    item_name: line.merchandise.product.title,
    item_variant: line.merchandise.title,
    price: Number(line.merchandise.price.amount),
    quantity: line.quantity,
  }));
  sendGAEvent("event", "begin_checkout", {
    currency,
    value,
    items,
  });
}

export function trackMailchimpLead(source: MailchimpFormSource) {
  sendGAEvent("event", "generate_lead", {
    form_destination: "mailchimp",
    form_source: source,
  });
}
