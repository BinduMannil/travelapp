import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  getCity,
  getCountryForCity,
  getVisaRuleset,
} from "@/lib/data/seed";
import { VisaPicker } from "@/components/city/VisaPicker";
import { PageHero } from "@/components/layout/PageHero";

export function generateMetadata(): Metadata {
  return {
    title: "Visa requirements",
    description:
      "Find the visa rule for your passport: visa-free, eVisa, or embassy application, with stay limits and official links.",
  };
}

export default async function VisaPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const city = getCity(slug);
  const countrySlug = getCountryForCity(slug);
  if (!city || !countrySlug) notFound();

  const ruleset = getVisaRuleset(countrySlug);
  if (!ruleset) notFound();

  return (
    <main>
      <PageHero
        crumbs={[
          { label: "Home", href: "/" },
          { label: city.name, href: `/city/${slug}` },
          { label: "Visa for you" },
        ]}
        kanji="旅"
        eyebrow="Visa for you"
        title={`Visa for ${city.name}`}
        subtitle="旅 券"
        lede="Pick your passport to see the current rule. Your selection is saved in this browser so we can personalise other pages — for example, which nearby cities need no extra visa."
        palette="sumi"
      />

      <section className="mx-auto max-w-3xl px-6 py-12">
        <VisaPicker
          rules={ruleset.rules}
          reviewedAt={ruleset.reviewed_at}
          officialSource={ruleset.official_source}
          disclaimer={ruleset.disclaimer}
        />
      </section>
    </main>
  );
}
