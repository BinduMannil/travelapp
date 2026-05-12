import type { Metadata } from "next";
import { WeatherSeasonsPage } from "@/components/weather/WeatherSeasonsPage";

export const metadata: Metadata = {
  title: "Weather / Seasons",
  description:
    "Check Tokyo weather in May, the best time to visit Tokyo, Japan weather by month, packing guidance, and seasonal travel recommendations.",
};

export default function WeatherPage() {
  return <WeatherSeasonsPage />;
}
