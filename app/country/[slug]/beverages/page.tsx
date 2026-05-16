import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CountrySubpageExperience } from "@/components/country/CountrySubpageExperience";
import { VietnamBeveragesPage } from "@/components/vietnam/VietnamCountryDetailPages";
import { COUNTRY_OPTIONS, getCountryOption } from "@/lib/destinations/countries";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  if (slug === "vietnam") {
    return {
      title: "Vietnam coffee, beer & street drinks",
      description:
        "Vietnam drink culture guide for phin coffee, iced milk coffee, egg coffee, bia hoi, sugarcane juice, and cafe routines.",
    };
  }
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
  if (slug === "vietnam") return <VietnamBeveragesPage />;
  return <CountrySubpageExperience country={country} kind="beverages" />;
}

export function generateStaticParams() {
  return COUNTRY_OPTIONS.map((country) => ({ slug: country.slug }));
}
