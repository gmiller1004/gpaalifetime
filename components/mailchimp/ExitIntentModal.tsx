"use client";

import * as React from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  readExitCooldownActive,
  readSubscribed,
  writeExitShownNow,
} from "@/lib/mailchimp-storage";

import { MailchimpSignupForm } from "./MailchimpSignupForm";

const EXIT_INTENT_DELAY_MS = 8000;

/**
 * Desktop: exit intent (cursor leaves toward top). Shows at most once per 5 days
 * if the visitor has not subscribed. Skips legal pages via parent.
 */
export function ExitIntentModal() {
  const [open, setOpen] = React.useState(false);
  const armedRef = React.useRef(false);
  const shownSessionRef = React.useRef(false);

  React.useEffect(() => {
    if (readSubscribed()) return;
    if (readExitCooldownActive()) return;

    const t = window.setTimeout(() => {
      armedRef.current = true;
    }, EXIT_INTENT_DELAY_MS);

    function tryOpen() {
      if (!armedRef.current || shownSessionRef.current) return;
      if (readSubscribed()) return;
      if (readExitCooldownActive()) return;
      shownSessionRef.current = true;
      writeExitShownNow();
      setOpen(true);
    }

    function onMouseLeave(e: MouseEvent) {
      if (e.clientY > 0) return;
      tryOpen();
    }

    document.documentElement.addEventListener("mouseleave", onMouseLeave);
    return () => {
      window.clearTimeout(t);
      document.documentElement.removeEventListener("mouseleave", onMouseLeave);
    };
  }, []);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-md gap-0 overflow-hidden p-0">
        <DialogHeader className="border-b border-[var(--brand-border)] bg-[var(--brand-body-dim)] px-5 py-5">
          <DialogTitle className="text-[var(--brand-primary)]">
            New bundles &amp; offers
          </DialogTitle>
          <DialogDescription className="text-pretty">

            Get updates on new bundles and offers from GPAA—no spam, unsubscribe
            anytime.
          </DialogDescription>
        </DialogHeader>
        <div className="px-5 py-5">
          <MailchimpSignupForm variant="modal" />
        </div>
      </DialogContent>
    </Dialog>
  );
}
