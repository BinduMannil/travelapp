import type { Metadata } from "next";
import { ExploreDiscoveryPage } from "@/components/explore/ExploreDiscoveryPage";

export const metadata: Metadata = {
  title: "Explore",
  description:
    "Discover solo travel destinations, budget travel ideas, visa-free travel options, safe cities for solo female travelers, and seasonal travel inspiration with Journee.",
};

export default function ExplorePage() {
  return <ExploreDiscoveryPage />;
}
