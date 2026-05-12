import type { Metadata } from "next";
import { JourneyBuilderPage } from "@/components/trips/JourneyBuilderPage";
import { montserrat } from "@/app/fonts";

export const metadata: Metadata = {
  title: "My Trips",
  description:
    "Manage upcoming trips, itineraries, bookings, expenses, documents, and checklists in JOURNEE.",
};

export default function TripsPage() {
  return (
    <div className={montserrat.className}>
      <JourneyBuilderPage />
    </div>
  );
}
