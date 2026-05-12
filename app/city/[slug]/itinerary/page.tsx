import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { VietnamCityDetailPage } from "@/components/vietnam/VietnamCityDetailPage";
import { getVietnamCity } from "@/lib/vietnam/frontend";
import { getCity } from "@/lib/data/seed";
import { JapanTripPlanner } from "@/components/itinerary/JapanTripPlanner";
import { PageHero } from "@/components/layout/PageHero";

export function generateMetadata(): Metadata {
  return {
    title: "Vietnam city itinerary",
    description:
      "Plan how a Vietnam city fits into the wider route by pace, region, weather, transfers, and activities.",
  };
}

export default async function ItineraryListPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const vietnamCity = getVietnamCity(slug);
  if (vietnamCity) return <VietnamCityDetailPage city={vietnamCity} kind="itinerary" />;
  const city = getCity(slug);
  if (!city) notFound();

  return (
    <main className="editorial-page">
      <PageHero
        crumbs={[
          { label: "Home", href: "/" },
          { label: city.name, href: `/city/${slug}` },
          { label: "Japan itinerary builder" },
        ]}
        kanji="道"
        eyebrow="Japan itineraries"
        title={`Build your Japan route`}
        subtitle="旅 程"
        lede={`Start with dates, season, pace, and activities. Tokyo can be the arrival city, but the plan is built around Japan as a country.`}
        palette="matcha"
      />
      <JapanTripPlanner />
    </main>
  );
}
