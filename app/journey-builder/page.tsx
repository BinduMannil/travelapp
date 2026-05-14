import type { Metadata } from "next";
import { JourneyBuilderPage } from "@/components/journey-builder/JourneyBuilderPage";
import { montserrat } from "@/app/fonts";

export const metadata: Metadata = {
  title: "Journey Builder / Journee",
  description:
    "Craft a cinematic Journee itinerary with destination, dates, travelers, style, budget, pace, interests, and an atmospheric journey preview.",
};

export default function JourneyBuilderRoute() {
  return (
    <div className={montserrat.className}>
      <JourneyBuilderPage />
    </div>
  );
}
