import type { Metadata } from "next";
import { CityDestinationPage } from "@/components/city/CityDestinationPage";
import { KYOTO_CITY_DESTINATION } from "@/lib/city/city-destination-data";

export const metadata: Metadata = {
  title: "Kyoto Travel Guide",
  description:
    "A cinematic Kyoto travel guide by JOURNEE with itinerary ideas, hidden gems, temples, food markets, safety tips, and local travel intelligence.",
};

export default function KyotoDestinationAliasPage() {
  return <CityDestinationPage data={KYOTO_CITY_DESTINATION} />;
}
