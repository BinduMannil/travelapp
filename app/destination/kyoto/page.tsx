import type { Metadata } from "next";
import { KyotoDestinationPage } from "@/components/destination/KyotoDestinationPage";

export const metadata: Metadata = {
  title: "Kyoto Travel Guide",
  description:
    "A cinematic Kyoto travel guide by JOURNEE with a Kyoto itinerary, Kyoto hidden gems, Kyoto temples, Kyoto food markets, Kyoto solo female travel guidance, and Kyoto safety tips.",
};

export default function Page() {
  return <KyotoDestinationPage />;
}
