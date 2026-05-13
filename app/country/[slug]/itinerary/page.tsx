import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CountrySubpageExperience } from "@/components/country/CountrySubpageExperience";
import { COUNTRY_OPTIONS, getCountryOption } from "@/lib/destinations/countries";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const country = getCountryOption(slug);
  return {
    title: country ? `${country.name} itinerary planner` : "Country itinerary",
    description: country
      ? `Plan ${country.name} routes, cities, timing, and travel rhythm.`
      : "Country itinerary planner.",
  };
}

export default async function CountryItineraryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const country = getCountryOption(slug);
  if (!country) notFound();
  return <CountrySubpageExperience country={country} kind="itinerary" />;
}

export function generateStaticParams() {
  return COUNTRY_OPTIONS.map((country) => ({ slug: country.slug }));
}
