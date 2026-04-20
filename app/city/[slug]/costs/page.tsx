import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getCity, getPriceItems } from "@/lib/data/seed";
import { CostTable } from "@/components/money/CostTable";
import { PageHero } from "@/components/layout/PageHero";

export function generateMetadata(): Metadata {
  return {
    title: "Daily costs",
    description:
      "Typical prices for coffee, meals, transit, taxis, SIM cards and more, converted to your chosen currency.",
  };
}

export default async function CostsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const city = getCity(slug);
  if (!city) notFound();

  const items = getPriceItems(slug);

  return (
    <main>
      <PageHero
        crumbs={[
          { label: "Home", href: "/" },
          { label: city.name, href: `/city/${slug}` },
          { label: "Daily costs" },
        ]}
        kanji="円"
        eyebrow="Daily costs"
        title={`What ${city.name} costs`}
        subtitle="物 価"
        lede="Typical prices for common travel purchases, converted into the display currency you picked on the home page."
        palette="sumi"
      />
      <section className="mx-auto max-w-5xl px-6 py-12">
        <CostTable items={items} />
        <p className="mt-10 text-xs text-sumi-700">
          Prices are typical ranges for central {city.name}. Individual
          businesses vary — treat as a planning guide, not a guarantee.
        </p>
      </section>
    </main>
  );
}
