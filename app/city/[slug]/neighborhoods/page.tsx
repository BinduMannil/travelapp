import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getPlaceOption } from "@/lib/destinations/countries";
import { VietnamCityDetailPage } from "@/components/vietnam/VietnamCityDetailPage";
import { getVietnamCity } from "@/lib/vietnam/frontend";
import {
  getCity,
  getCityHiddenGems,
  getHotels,
  getNeighborhoods,
} from "@/lib/data/seed";
import { NeighborhoodsDiscoveryPage } from "@/components/city/NeighborhoodsDiscoveryPage";

export function generateMetadata(): Metadata {
  return {
    title: "Neighborhoods",
    description:
      "Cinematic neighborhood guide: where to stay, how each district feels, safety, food, nightlife, walkability, and traveler fit.",
  };
}

export default async function NeighborhoodsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const vietnamCity = getVietnamCity(slug);
  if (vietnamCity) return <VietnamCityDetailPage city={vietnamCity} kind="neighborhoods" />;

  const city = getCity(slug);
  if (!city && getPlaceOption(slug)) notFound();
  if (!city) notFound();

  const neighborhoods = getNeighborhoods(slug);
  const hotels = getHotels(slug);
  const hiddenGems = getCityHiddenGems(slug);

  return (
    <NeighborhoodsDiscoveryPage
      city={city}
      neighborhoods={neighborhoods}
      hotels={hotels}
      hiddenGems={hiddenGems?.picks ?? []}
    />
  );
}
