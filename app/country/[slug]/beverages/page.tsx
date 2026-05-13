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
    title: country ? `${country.name} beverages guide` : "Country beverages",
    description: country
      ? `Explore ${country.name} drinks, cafe culture, local beverages, and daily rituals.`
      : "Country beverages guide.",
  };
}

export default async function BeveragesPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const country = getCountryOption(slug);
  if (!country) notFound();
  return <CountrySubpageExperience country={country} kind="beverages" />;
}

export function generateStaticParams() {
  return COUNTRY_OPTIONS.map((country) => ({ slug: country.slug }));
}
