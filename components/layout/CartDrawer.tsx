"use client";

import * as React from "react";
import Image from "next/image";
import { Loader2Icon, ShoppingBagIcon, Trash2Icon } from "lucide-react";

import { useCart } from "@/components/cart/cart-provider";
import { trackBeginCheckout } from "@/lib/analytics";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";

/** Primary CTA styles without `buttonVariants` — default variant adds `[a]:hover:bg-primary`, which breaks brand accent colors on anchor checkout links. */
function checkoutButtonClassName(disabled: boolean) {
  return cn(
    "inline-flex h-11 w-full items-center justify-center rounded-xl text-base font-semibold shadow-md",
    "bg-[var(--brand-accent)] text-[var(--brand-accent-foreground)]",
    "transition-[filter,box-shadow]",
    "hover:brightness-[0.94] hover:shadow-lg",
    "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--brand-accent)]",
    disabled && "pointer-events-none opacity-50"
  );
}

export function CartDrawer() {
  const {
    cart,
    drawerOpen,
    setDrawerOpen,
    lineCount,
    removeLine,
    error,
    updateNote,
    noteSaving,
  } = useCart();
  const [removingLineId, setRemovingLineId] = React.useState<string | null>(
    null
  );
  const [noteDraft, setNoteDraft] = React.useState("");
  const noteDebounceRef = React.useRef<ReturnType<typeof setTimeout> | null>(
    null
  );

  React.useEffect(() => {
    setNoteDraft(cart?.note ?? "");
  }, [cart?.note, cart?.id]);

  const handleNoteChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setNoteDraft(value);
    if (noteDebounceRef.current) {
      clearTimeout(noteDebounceRef.current);
    }
    noteDebounceRef.current = setTimeout(() => {
      noteDebounceRef.current = null;
      void updateNote(value);
    }, 450);
  };

  const handleNoteBlur = () => {
    if (noteDebounceRef.current) {
      clearTimeout(noteDebounceRef.current);
      noteDebounceRef.current = null;
    }
    if (noteDraft === (cart?.note ?? "")) return;
    void updateNote(noteDraft);
  };

  const handleRemove = async (lineId: string) => {
    setRemovingLineId(lineId);
    try {
      await removeLine(lineId);
    } catch {
      /* error surfaced via context */
    } finally {
      setRemovingLineId(null);
    }
  };

  return (
    <Sheet open={drawerOpen} onOpenChange={setDrawerOpen}>
      <SheetContent
        side="right"
        className="flex w-full max-w-md flex-col gap-0 border-[var(--brand-border)] bg-white p-0 text-[var(--brand-body)] sm:max-w-lg"
      >
        <SheetHeader className="border-b border-[var(--brand-border)] px-6 py-5 text-left">
          <SheetTitle className="font-heading text-xl text-[var(--brand-primary)]">
            Your cart
          </SheetTitle>
          <SheetDescription className="text-[#1c1d1d]">
            {lineCount === 0
              ? "Add a Gold Life bundle to get started."
              : `${lineCount} item${lineCount === 1 ? "" : "s"} — ready for secure checkout.`}
          </SheetDescription>
        </SheetHeader>

        <ScrollArea className="flex-1 px-6 py-4">
          {error ? (
            <p className="mb-4 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-800">
              {error}
            </p>
          ) : null}
          {!cart?.lines.length ? (
            <div className="flex flex-col items-center justify-center gap-3 py-16 text-center">
              <ShoppingBagIcon
                className="size-12 text-[var(--brand-primary)]/40"
                aria-hidden
              />
              <p className="text-sm text-[#1c1d1d]">Your cart is empty.</p>
            </div>
          ) : (
            <ul className="flex flex-col gap-4">
              {cart.lines.map((line) => (
                <li
                  key={line.id}
                  className="flex gap-3 rounded-xl border border-[var(--brand-border)] bg-[var(--brand-body-dim)] p-3"
                >
                  <div className="relative size-16 shrink-0 overflow-hidden rounded-lg border border-[var(--brand-border)] bg-white">
                    {line.merchandise.image?.url ? (
                      <Image
                        src={line.merchandise.image.url}
                        alt={
                          line.merchandise.image.altText ??
                          line.merchandise.product.title
                        }
                        fill
                        className="object-cover brightness-105"
                        sizes="64px"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center text-xs text-[var(--brand-muted)]">
                        GPAA
                      </div>
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-medium leading-snug text-[#1c1d1d]">
                      {line.merchandise.product.title}
                    </p>
                    <p className="text-sm text-[var(--brand-muted)]">
                      {line.merchandise.title}
                    </p>
                    <p className="mt-1 text-sm tabular-nums text-[var(--brand-primary)]">
                      ×{line.quantity} ·{" "}
                      {line.merchandise.price.currencyCode}{" "}
                      {Number(line.merchandise.price.amount).toFixed(2)}
                    </p>
                  </div>
                  <p className="flex shrink-0 flex-col items-end">
                    <button
                      type="button"
                      className="rounded-lg p-2 text-[var(--brand-muted)] transition-colors hover:bg-white/80 hover:text-[#1c1d1d] disabled:opacity-50"
                      onClick={() => handleRemove(line.id)}
                      disabled={removingLineId === line.id}
                      aria-label={`Remove ${line.merchandise.product.title} from cart`}
                    >
                      {removingLineId === line.id ? (
                        <Loader2Icon
                          className="size-4 animate-spin text-[var(--brand-primary)]"
                          aria-hidden
                        />
                      ) : (
                        <Trash2Icon className="size-4" aria-hidden />
                      )}
                    </button>
                  </p>
                </li>
              ))}
            </ul>
          )}
        </ScrollArea>

        <div className="mt-auto border-t border-[var(--brand-border)] bg-[var(--brand-body-dim)] px-6 py-5">
          {lineCount > 0 ? (
            <div className="mb-4">
              <div className="mb-2 flex items-center justify-between gap-2">
                <Label
                  htmlFor="cart-order-note"
                  className="text-sm font-medium text-[var(--brand-primary)]"
                >
                  Order notes
                </Label>
                {noteSaving ? (
                  <Loader2Icon
                    className="size-4 shrink-0 animate-spin text-[var(--brand-primary)]"
                    aria-hidden
                  />
                ) : null}
              </div>
              <textarea
                id="cart-order-note"
                value={noteDraft}
                onChange={handleNoteChange}
                onBlur={handleNoteBlur}
                rows={4}
                placeholder="Special instructions, delivery details, or reminders for your order…"
                className={cn(
                  "w-full resize-y rounded-xl border border-[var(--brand-border)] bg-white px-3 py-2.5 text-sm leading-relaxed text-[#1c1d1d]",
                  "placeholder:text-[var(--brand-muted)]",
                  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--brand-primary)]"
                )}
              />
              <p className="mt-2 text-xs leading-relaxed text-[var(--brand-muted)]">
                Shown on your order confirmation for fulfillment.
                When you add or remove a Gold Life bundle, this note refreshes to
                match your free Training Paydirt bags (1 per $250 on bundle
                subtotal).
              </p>
            </div>
          ) : null}
          <Separator className="mb-4 bg-[var(--brand-border)]" />
          <a
            href={cart?.checkoutUrl ?? "#"}
            className={checkoutButtonClassName(!cart?.checkoutUrl)}
            onClick={() => {
              if (cart) trackBeginCheckout(cart);
            }}
          >
            Secure checkout
          </a>
          <p className="mt-3 text-center text-xs text-[var(--brand-muted)]">
            Encrypted checkout, trusted worldwide.
          </p>
        </div>
      </SheetContent>
    </Sheet>
  );
}
