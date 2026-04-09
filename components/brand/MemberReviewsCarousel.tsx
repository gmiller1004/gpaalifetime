"use client";

import { StarIcon } from "lucide-react";

import type { JudgeMeDisplayReview } from "@/types/judgeme";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const STAR = "#2d8a29";

const FALLBACK: JudgeMeDisplayReview[] = [
  {
    id: "fallback-1",
    title: "Best move I made for weekends",
    body:
      "I wanted one membership that actually gets me on ground—not just another subscription. GPAA delivered.",
    reviewerName: "Jamie R.",
    verified: false,
    productHandle: null,
  },
  {
    id: "fallback-2",
    title: "Clear upgrade path",
    body:
      "I knew what gear I was walking into before I paid. No surprises at checkout.",
    reviewerName: "Morgan T.",
    verified: false,
    productHandle: null,
  },
  {
    id: "fallback-3",
    title: "Finally feels serious",
    body:
      "Between the claims network and the magazine, I’m not guessing where to go next.",
    reviewerName: "Chris L.",
    verified: false,
    productHandle: null,
  },
];

function StarsRow() {
  return (
    <div className="flex gap-0.5" aria-hidden>
      {Array.from({ length: 5 }).map((_, i) => (
        <StarIcon
          key={i}
          className="size-4"
          style={{ color: STAR, fill: STAR }}
        />
      ))}
    </div>
  );
}

export function MemberReviewsCarousel({
  reviews,
  reviewCount,
}: {
  reviews: JudgeMeDisplayReview[];
  reviewCount: number;
}) {
  const list = reviews.length > 0 ? reviews : FALLBACK;
  const hasLive = reviews.length > 0;

  const subhead = hasLive
    ? reviewCount === 1
      ? "Five stars from a fellow member who purchased GPAA membership—the same lifetime benefits you get in this Gold Life bundle."
      : `${reviewCount} recent five-star reviews from members who purchased GPAA membership—the same core benefits you get here, plus the equipment on this page.`
    : "Examples of the kind of feedback lifetime members share.";

  return (
    <section className="border-b border-[var(--brand-border)] bg-[#fdfcf8] py-14 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="font-heading text-sm font-medium uppercase tracking-[0.2em] text-[var(--brand-primary)]">
            Member voices
          </p>
          <h2 className="font-heading mt-2 text-3xl font-semibold tracking-tight text-[var(--brand-primary)] sm:text-4xl">
            Hear it from people who already went lifetime
          </h2>
          <p className="mt-3 text-[var(--brand-body)]">{subhead}</p>
        </div>

        <div className="relative mt-10 px-10 sm:px-12">
          <Carousel
            opts={{ align: "start", loop: list.length > 1 }}
            className="w-full"
          >
            <CarouselContent className="-ml-4">
              {list.map((r) => (
                <CarouselItem
                  key={r.id}
                  className="pl-4 md:basis-1/2 lg:basis-1/3"
                >
                  <Card className="h-full border-[var(--brand-border)] bg-white shadow-sm">
                    <CardContent className="flex h-full flex-col gap-3 pt-6">
                      <StarsRow />
                      <div className="flex flex-wrap items-center gap-2">
                        <p className="text-sm font-semibold text-[var(--brand-primary)]">
                          {r.reviewerName}
                        </p>
                        {r.verified ? (
                          <Badge
                            variant="secondary"
                            className="border-0 bg-[#e8f5e9] text-xs font-medium text-[#1b5e20]"
                          >
                            Verified
                          </Badge>
                        ) : null}
                      </div>
                      <p className="text-sm font-semibold text-[#1c1d1d]">
                        {r.title}
                      </p>
                      <p className="text-sm leading-relaxed text-[#1c1d1d]">
                        {r.body}
                      </p>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious
              className="left-0 top-1/2 -translate-y-1/2 border-[var(--brand-border)] bg-white sm:-left-2"
              variant="outline"
            />
            <CarouselNext
              className="right-0 top-1/2 -translate-y-1/2 border-[var(--brand-border)] bg-white sm:-right-2"
              variant="outline"
            />
          </Carousel>
        </div>
      </div>
    </section>
  );
}
