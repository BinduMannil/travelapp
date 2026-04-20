import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getCity, getClimate } from "@/lib/data/seed";
import { DEFAULT_RULES } from "@/lib/packing/rules";
import { PackingPlanner } from "@/components/packing/PackingPlanner";
import { EsimCta, InsuranceCta } from "@/components/affiliate/AffiliateCtas";
import { AffiliateDisclosure } from "@/components/affiliate/AffiliateDisclosure";
import { PageHero } from "@/components/layout/PageHero";

export function generateMetadata(): Metadata {
  return {
    title: "Packing list",
    description:
      "A packing list computed from your travel dates, trip style, and planned activities — tuned to Tokyo's climate and culture.",
  };
}

export default async function PackingPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const city = getCity(slug);
  if (!city) notFound();

  const climate = getClimate(slug);

  return (
    <main>
      <PageHero
        crumbs={[
          { label: "Home", href: "/" },
          { label: city.name, href: `/city/${slug}` },
          { label: "Packing list" },
        ]}
        kanji="装"
        eyebrow="Packing list"
        title={`Packing for ${city.name}`}
        subtitle="旅 装"
        lede="Enter your dates, party size, and what you plan to do. The list updates live — essentials are highlighted, quantities scale with your trip length, and we only surface weather layers your forecast actually needs."
        palette="ume"
      />

      <section className="mx-auto max-w-6xl px-6 py-12">
        <PackingPlanner climate={climate} rules={DEFAULT_RULES} />

        <div className="mt-10 grid gap-3 sm:grid-cols-2">
          <EsimCta source="packing-bottom" />
          <InsuranceCta source="packing-bottom" />
        </div>
        <AffiliateDisclosure />

        <p className="mt-6 text-xs text-sumi-700">
          Weather layers are driven by historical monthly averages — the day
          you arrive may vary. Check the live forecast the week before you
          travel.
        </p>
      </section>
    </main>
  );
}
