import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CountryPreviewExperience } from "@/components/country/CountryPreviewExperience";
import { COUNTRY_OPTIONS, getCountryOption } from "@/lib/destinations/countries";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const country = getCountryOption(slug);
  return {
    title: country ? `${country.name} travel guide` : "Country travel guide",
    description: country?.summary ?? "Country travel guide.",
  };
}

export default async function CountryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const country = getCountryOption(slug);
  if (!country) notFound();
  return <CountryPreviewExperience country={country} />;
}

export function generateStaticParams() {
  return COUNTRY_OPTIONS.map((country) => ({ slug: country.slug }));
}
