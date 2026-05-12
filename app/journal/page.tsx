import type { Metadata } from "next";
import { JourneyJournalPage } from "@/components/journal/JourneyJournalPage";

export const metadata: Metadata = {
  title: "Journal / Travel Memories",
  description:
    "Browse JOURNEE travel memories, daily notes, photos, moods, saved places, and reflections.",
};

export default function JournalPage() {
  return <JourneyJournalPage />;
}
