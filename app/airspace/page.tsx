import type { Metadata } from "next";
import { AirspacePage } from "@/components/airspace/AirspacePage";

export const metadata: Metadata = {
  title: "Airspace / Global Routes Intelligence",
  description:
    "A cinematic JOURNEE airspace intelligence page for premium global routes, flight corridors, airline experience, and real-time movement signals.",
};

export default function Page() {
  return <AirspacePage />;
}
