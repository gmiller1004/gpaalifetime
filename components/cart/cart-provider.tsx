"use client";

import * as React from "react";

import {
  addCartLinesClient,
  createCartClient,
  ensureGoldLifeBundleCartNote,
  ensureMemberReferralCartAttributes,
  getCartClient,
  removeCartLinesClient,
  updateCartNoteClient,
} from "@/lib/shopify";
import { captureMrefFromLocation } from "@/lib/mref-client";
import { REFERRAL_CODE_ATTRIBUTE_KEY } from "@/lib/mref";
import type { ShopifyCart } from "@/types";

const CART_COOKIE = "gpa_cart_id";
const CART_MAX_AGE_SEC = 60 * 60 * 24 * 14;

function readCartId(): string | null {
  if (typeof document === "undefined") return null;
  const m = document.cookie.match(
    new RegExp(`(?:^|; )${CART_COOKIE}=([^;]*)`)
  );
  return m?.[1] ? decodeURIComponent(m[1]) : null;
}

function writeCartId(id: string) {
  document.cookie = `${CART_COOKIE}=${encodeURIComponent(id)};path=/;max-age=${CART_MAX_AGE_SEC};samesite=lax`;
}

function clearCartCookie() {
  document.cookie = `${CART_COOKIE}=;path=/;max-age=0`;
}

type CartContextValue = {
  cart: ShopifyCart | null;
  lineCount: number;
  isLoading: boolean;
  noteSaving: boolean;
  error: string | null;
  drawerOpen: boolean;
  setDrawerOpen: (open: boolean) => void;
  refreshCart: () => Promise<void>;
  addBundle: (merchandiseId: string, quantity?: number) => Promise<void>;
  removeLine: (lineId: string) => Promise<void>;
  updateNote: (note: string) => Promise<void>;
  prepareHostedCheckout: () => Promise<string>;
};

const CartContext = React.createContext<CartContextValue | null>(null);

export function useCart() {
  const ctx = React.useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = React.useState<ShopifyCart | null>(null);
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const [noteSaving, setNoteSaving] = React.useState(false);

  const refreshCart = React.useCallback(async () => {
    captureMrefFromLocation();
    const id = readCartId();
    if (!id) {
      setCart(null);
      return;
    }
    try {
      let next = await getCartClient(id);
      if (!next) {
        clearCartCookie();
        setCart(null);
        return;
      }
      try {
        next = await ensureMemberReferralCartAttributes(
          next,
          captureMrefFromLocation()
        );
      } catch {
        /* Keep the cart; checkout stamps again. */
      }
      setCart(next);
    } catch {
      clearCartCookie();
      setCart(null);
    }
  }, []);

  React.useEffect(() => {
    let cancelled = false;
    (async () => {
      setIsLoading(true);
      await refreshCart();
      if (!cancelled) setIsLoading(false);
    })();
    return () => {
      cancelled = true;
    };
  }, [refreshCart]);

  const addBundle = React.useCallback(
    async (merchandiseId: string, quantity: number = 1) => {
      setError(null);
      setIsLoading(true);
      try {
        const existing = readCartId();
        let next: ShopifyCart;
        if (existing) {
          next = await addCartLinesClient(existing, [
            { merchandiseId, quantity },
          ]);
        } else {
          const code = captureMrefFromLocation();
          next = await createCartClient(
            merchandiseId,
            quantity,
            code
              ? [{ key: REFERRAL_CODE_ATTRIBUTE_KEY, value: code }]
              : undefined
          );
        }
        next = await ensureGoldLifeBundleCartNote(next);
        try {
          next = await ensureMemberReferralCartAttributes(
            next,
            captureMrefFromLocation()
          );
        } catch {
          /* Keep the cart; checkout stamps again. */
        }
        writeCartId(next.id);
        setCart(next);
        setDrawerOpen(true);
      } catch (e) {
        setError(e instanceof Error ? e.message : "Could not update cart");
        throw e;
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  const updateNote = React.useCallback(async (note: string) => {
    const cartId = readCartId();
    if (!cartId) return;
    setError(null);
    setNoteSaving(true);
    try {
      const trimmed = note.trim();
      const next = await updateCartNoteClient(
        cartId,
        trimmed.length === 0 ? null : trimmed
      );
      setCart(next);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not save note");
      throw e;
    } finally {
      setNoteSaving(false);
    }
  }, []);

  const removeLine = React.useCallback(async (lineId: string) => {
    const cartId = readCartId();
    if (!cartId) return;
    setError(null);
    try {
      const next = await removeCartLinesClient(cartId, [lineId]);
      const ensured = await ensureGoldLifeBundleCartNote(next);
      setCart(ensured);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not update cart");
      throw e;
    }
  }, []);

  const prepareHostedCheckout = React.useCallback(async () => {
    captureMrefFromLocation();
    const cartId = readCartId();
    if (!cartId) {
      const message = "Your cart is empty";
      setError(message);
      throw new Error(message);
    }
    setError(null);
    try {
      let next = await getCartClient(cartId);
      if (!next) {
        clearCartCookie();
        setCart(null);
        throw new Error("Your cart is empty");
      }
      next = await ensureMemberReferralCartAttributes(
        next,
        captureMrefFromLocation()
      );
      setCart(next);
      return next.checkoutUrl;
    } catch (e) {
      const message =
        e instanceof Error ? e.message : "Could not start checkout";
      setError(message);
      throw e instanceof Error ? e : new Error(message);
    }
  }, []);

  const lineCount = React.useMemo(
    () => cart?.lines.reduce((n, l) => n + l.quantity, 0) ?? 0,
    [cart]
  );

  const value = React.useMemo(
    () => ({
      cart,
      lineCount,
      isLoading,
      noteSaving,
      error,
      drawerOpen,
      setDrawerOpen,
      refreshCart,
      addBundle,
      removeLine,
      updateNote,
      prepareHostedCheckout,
    }),
    [
      cart,
      lineCount,
      isLoading,
      noteSaving,
      error,
      drawerOpen,
      refreshCart,
      addBundle,
      removeLine,
      updateNote,
      prepareHostedCheckout,
    ]
  );

  return (
    <CartContext.Provider value={value}>{children}</CartContext.Provider>
  );
}
