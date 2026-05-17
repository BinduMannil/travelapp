import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CityDestinationPage } from "@/components/city/CityDestinationPage";
import { PlacePreviewExperience } from "@/components/city/PlacePreviewExperience";
import { VietnamCityExperience } from "@/components/vietnam/VietnamCityExperience";
import {
  getAllCityDestinationSlugs,
  getCityDestinationPageData,
} from "@/lib/city/city-destination-data";
import { getPlaceOption } from "@/lib/destinations/countries";
import { getVietnamCity } from "@/lib/vietnam/frontend";

type CityPageParams = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: CityPageParams): Promise<Metadata> {
  const { slug } = await params;
  const city = getCityDestinationPageData(slug);

  if (!city) {
    return {
      title: "City Guide | JOURNEE",
      description: "Cinematic city travel guides by JOURNEE.",
    };
  }

  return {
    title: `${city.city} Travel Guide | JOURNEE`,
    description: `${city.city} travel guide with itinerary ideas, hidden gems, food markets, safety tips, solo female travel context, stays and local travel intelligence.`,
  };
}

export default async function CityPage({ params }: CityPageParams) {
  const { slug } = await params;
  const city = getCityDestinationPageData(slug);
  const vietnamCity = getVietnamCity(slug);

  if (vietnamCity) return <VietnamCityExperience city={vietnamCity} />;

  if (city) {
    return <CityDestinationPage data={city} />;
  }

  const place = getPlaceOption(slug);
  if (place) return <PlacePreviewExperience place={place} />;

  notFound();
}

export function generateStaticParams() {
  return getAllCityDestinationSlugs().map((slug) => ({ slug }));
}
