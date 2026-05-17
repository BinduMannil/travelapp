import type { Metadata } from "next";
import { MyTripsPage } from "@/components/trips/MyTripsPage";
import { montserrat } from "@/app/fonts";

export const metadata: Metadata = {
  title: "Trips Dashboard / Journee",
  description:
    "Manage active, upcoming, drafted, and completed Journee trips with collaborators, memories, journals, saved places, and trip status.",
};

export default function TripsPage() {
  return (
    <div className={montserrat.className}>
      <MyTripsPage />
    </div>
  );
}
