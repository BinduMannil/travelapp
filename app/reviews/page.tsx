import type { Metadata } from "next";
import { ReviewsRatingsPage } from "@/components/reviews/ReviewsRatingsPage";

export const metadata: Metadata = {
  title: "Reviews & Ratings",
  description:
    "Browse verified JOURNEE traveler reviews, rating breakdowns, traveler photos, trust signals, and review categories.",
};

export default function ReviewsPage() {
  return <ReviewsRatingsPage />;
}
