import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getCountry, getCountryCuisine } from "@/lib/data/seed";
import { PageHero } from "@/components/layout/PageHero";
import { DishCard } from "@/components/cuisine/DishCard";

export function generateMetadata(): Metadata {
  return {
    title: "Must-try local cuisine",
    description:
      "The dishes you should actively seek out — what they're made of, where they were born, and what they resemble globally.",
  };
}

export default async function CuisinePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const country = getCountry(slug);
  const data = getCountryCuisine(slug);
  if (!country || !data) notFound();

  return (
    <main>
      <PageHero
        crumbs={[
          { label: "Home", href: "/" },
          { label: country.name, href: `/country/${slug}` },
          { label: "Must-try cuisine" },
        ]}
        kanji="食"
        eyebrow="Must-try cuisine"
        title="Must-try dishes"
        subtitle="食 文 化"
        lede={`The dishes you should actively seek out — ingredients, origin, global equivalents, and vegan availability.`}
        palette="enji"
      />
      <div className="mx-auto max-w-4xl px-6 py-12">
        <p className="text-[11px] uppercase tracking-[0.25em] text-sumi-700">
          Tap any card to reveal origin, equivalents, and where to try it.
        </p>
        <div className="mt-5 space-y-4">
          {data.dishes.map((d) => (
            <DishCard key={d.slug} dish={d} countryName={country.name} />
          ))}
        </div>
      </div>
    </main>
  );
}
