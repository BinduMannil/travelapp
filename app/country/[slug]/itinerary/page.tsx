import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { VietnamItineraryExperience } from "@/components/vietnam/VietnamItineraryExperience";

const COUNTRIES = {
  vietnam: { name: "Vietnam" },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  if (slug === "vietnam") {
    return {
      title: "Vietnam itinerary builder",
      description:
        "Build a Vietnam-wide route from dates, regional weather, transport, and travel activities.",
      };
  }
  return {
    title: "Destination not found",
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
  if (slug === "vietnam") return <VietnamItineraryExperience />;
  notFound();
}

export function generateStaticParams() {
  return Object.keys(COUNTRIES).map((slug) => ({ slug }));
}
