import type { Metadata } from "next";
import { SearchResultsPage } from "@/components/search/SearchResultsPage";

export const metadata: Metadata = {
  title: "Search Results",
  description:
    "Search JOURNEE across destinations, guides, trips, stays, flights, articles, visa information, and travel tools.",
};

export default function SearchPage() {
  return <SearchResultsPage />;
}
