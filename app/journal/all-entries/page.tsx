import type { Metadata } from "next";
import { JourneyJournalPage } from "@/components/journal/JourneyJournalPage";

export const metadata: Metadata = {
  title: "All Entries / Journee Journal",
  description:
    "Browse every JOURNEE journal entry in a cinematic travel timeline with filters, photos, moods, and memories.",
};

export default function JournalAllEntriesPage() {
  return <JourneyJournalPage />;
}
