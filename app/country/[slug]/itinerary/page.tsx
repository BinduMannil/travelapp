import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { JapanTripPlanner } from "@/components/itinerary/JapanTripPlanner";
import { PageHero } from "@/components/layout/PageHero";

const COUNTRIES = {
  japan: { name: "Japan" },
};

export function generateMetadata(): Metadata {
  return {
    title: "Japan itinerary builder",
    description:
      "Build a Japan-wide route from dates, season, pace, and activities.",
  };
}

export default async function CountryItineraryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const country = COUNTRIES[slug as keyof typeof COUNTRIES];
  if (!country) notFound();

  return (
    <main className="editorial-page">
      <PageHero
        crumbs={[
          { label: "Home", href: "/" },
          { label: country.name, href: `/country/${slug}` },
          { label: "Itinerary builder" },
        ]}
        kanji="道"
        eyebrow="Japan itineraries"
        title="Build your Japan route"
        subtitle="旅 程"
        lede="Choose your dates, season, pace, and activities. The planner ranks whole-country routes before you drill into city guides."
        palette="matcha"
      />
      <JapanTripPlanner />
    </main>
  );
}

export function generateStaticParams() {
  return Object.keys(COUNTRIES).map((slug) => ({ slug }));
}
