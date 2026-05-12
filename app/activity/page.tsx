import type { Metadata } from "next";
import { ActivityFeedPage } from "@/components/activity/ActivityFeedPage";

export const metadata: Metadata = {
  title: "Activity Feed / Live Updates",
  description:
    "A premium JOURNEE live activity feed for booking updates, trip changes, price alerts, friend activity, saved-place updates, weather alerts, and system notifications.",
};

export default function ActivityPage() {
  return <ActivityFeedPage />;
}
