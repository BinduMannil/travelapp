import type { Metadata } from "next";
import { MyTripsPage } from "@/components/trips/MyTripsPage";
import { montserrat } from "@/app/fonts";

export const metadata: Metadata = {
  title: "My Trips / Journee Journal",
  description:
    "Browse cinematic JOURNEE trip cards with journey progress, places, photos, dates, and upcoming travel.",
};

export default function TripsPage() {
  return (
    <div className={montserrat.className}>
      <MyTripsPage />
    </div>
  );
}
