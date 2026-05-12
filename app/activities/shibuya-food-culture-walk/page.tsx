import type { Metadata } from "next";
import { ExperienceDetailBookingPage } from "@/components/experience/ExperienceDetailBookingPage";

export const metadata: Metadata = {
  title: "Shibuya Food & Culture Walk | Activity Booking",
  description:
    "Explore and book JOURNEE's Shibuya Food & Culture Walk with time slots, inclusions, meeting point details, reviews, and secure booking.",
};

export default function ShibuyaFoodCultureWalkPage() {
  return <ExperienceDetailBookingPage />;
}
