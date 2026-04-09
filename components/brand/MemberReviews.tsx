import { getMembershipFiveStarReviews } from "@/lib/judgeme.server";
import { MemberReviewsCarousel } from "@/components/brand/MemberReviewsCarousel";

export async function MemberReviews() {
  const reviews = await getMembershipFiveStarReviews();
  return (
    <MemberReviewsCarousel reviews={reviews} reviewCount={reviews.length} />
  );
}
