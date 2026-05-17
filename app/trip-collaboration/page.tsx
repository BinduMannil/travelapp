import type { Metadata } from "next";
import { TripCollaborationPage } from "@/components/collaboration/TripCollaborationPage";

export const metadata: Metadata = {
  title: "Trip Collaboration",
  description:
    "Invite members, share trip links, manage permissions, comment, vote, track shared budgets, and review group activity in JOURNEE.",
};

export default function Page() {
  return <TripCollaborationPage />;
}
