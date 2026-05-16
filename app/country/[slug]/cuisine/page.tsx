import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CountrySubpageExperience } from "@/components/country/CountrySubpageExperience";
import { VietnamCuisinePage } from "@/components/vietnam/VietnamCountryDetailPages";
import { COUNTRY_OPTIONS, getCountryOption } from "@/lib/destinations/countries";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  if (slug === "vietnam") {
    return {
      title: "Vietnam food guide",
      description:
        "A Vietnam food guide covering pho, banh mi, bun cha, cao lau, regional food rhythms, and practical price cues.",
    };
  }
  const country = getCountryOption(slug);
  return {
    title: country ? `${country.name} cuisine guide` : "Country cuisine",
    description: country
      ? `Explore ${country.name} cuisine, regional dishes, markets, and meal planning.`
      : "Country cuisine guide.",
  };
}

export default async function CuisinePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const country = getCountryOption(slug);
  if (!country) notFound();
  if (slug === "vietnam") return <VietnamCuisinePage />;
  return <CountrySubpageExperience country={country} kind="cuisine" />;
}

export function generateStaticParams() {
  return COUNTRY_OPTIONS.map((country) => ({ slug: country.slug }));
}
