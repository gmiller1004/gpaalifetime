"use client";

import * as React from "react";

import {
  addCartLinesClient,
  createCartClient,
  ensureGoldLifeBundleCartNote,
  getCartClient,
  removeCartLinesClient,
  updateCartNoteClient,
} from "@/lib/shopify";
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
    const id = readCartId();
    if (!id) {
      setCart(null);
      return;
    }
    try {
      const next = await getCartClient(id);
      if (!next) {
        clearCartCookie();
        setCart(null);
        return;
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
          next = await createCartClient(merchandiseId, quantity);
        }
        next = await ensureGoldLifeBundleCartNote(next);
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
    ]
  );

  return (
    <CartContext.Provider value={value}>{children}</CartContext.Provider>
  );
}
