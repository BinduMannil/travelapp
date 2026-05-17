import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CountrySubpageExperience } from "@/components/country/CountrySubpageExperience";
import { VietnamFamousForPage } from "@/components/vietnam/VietnamCountryDetailPages";
import { COUNTRY_OPTIONS, getCountryOption } from "@/lib/destinations/countries";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  if (slug === "vietnam") {
    return {
      title: "What Vietnam is famous for",
      description:
        "Vietnam travel identity guide covering coffee culture, tailoring, motorbike rhythm, coastline, karst landscapes, and activity choices.",
    };
  }
  const country = getCountryOption(slug);
  return {
    title: country ? `What ${country.name} is famous for` : "Country famous for",
    description: country
      ? `Explore what ${country.name} is known for, from landscapes and culture to food, craft, and routes.`
      : "Country famous-for guide.",
  };
}

export default async function FamousForPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const country = getCountryOption(slug);
  if (!country) notFound();
  if (slug === "vietnam") return <VietnamFamousForPage />;
  return <CountrySubpageExperience country={country} kind="famous-for" />;
}

export function generateStaticParams() {
  return COUNTRY_OPTIONS.map((country) => ({ slug: country.slug }));
}
