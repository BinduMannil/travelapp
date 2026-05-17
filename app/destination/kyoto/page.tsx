import type { Metadata } from "next";
import { CityDestinationPage } from "@/components/city/CityDestinationPage";
import { KYOTO_CITY_DESTINATION } from "@/lib/city/city-destination-data";

export const metadata: Metadata = {
  title: "Kyoto Travel Guide",
  description:
    "A cinematic Kyoto travel guide by JOURNEE with a Kyoto itinerary, Kyoto hidden gems, Kyoto temples, Kyoto food markets, Kyoto solo female travel guidance, and Kyoto safety tips.",
};

export default function Page() {
  return <CityDestinationPage data={KYOTO_CITY_DESTINATION} />;
}
