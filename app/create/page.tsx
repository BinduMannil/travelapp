import type { Metadata } from "next";
import { TravelerCreatorsPage } from "@/components/create/TravelerCreatorsPage";

export const metadata: Metadata = {
  title: "Traveler Creators",
  description:
    "Become a JOURNEE creator. Publish cinematic travel stories, city guides, hidden gems, and trusted creator-led travel intelligence.",
};

export default function CreatePage() {
  return <TravelerCreatorsPage />;
}
