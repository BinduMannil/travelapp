import type { Metadata } from "next";
import { ConciergeOSPage } from "@/components/concierge/ConciergeOSPage";

export const metadata: Metadata = {
  title: "Concierge OS",
  description:
    "A premium cinematic concierge operations page for JOURNEE members, active journeys, reservations, live assistance and travel support.",
};

export default function ConciergePage() {
  return <ConciergeOSPage />;
}
