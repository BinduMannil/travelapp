import type { Metadata } from "next";
import { SuggestionBoard } from "@/components/suggestions/SuggestionBoard";

export const metadata: Metadata = {
  title: "Community Ideas & Feature Requests",
  description:
    "Suggest features, vote on community ideas, track roadmap status, and help decide what Journee builds next.",
};

export default function SuggestionsPage() {
  return <SuggestionBoard />;
}
