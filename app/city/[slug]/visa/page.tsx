import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  getCity,
  getCountryForCity,
  getVisaRuleset,
} from "@/lib/data/seed";
import { VisaPicker } from "@/components/city/VisaPicker";
import { SocialRiskBriefing } from "@/components/legal/SocialRiskBriefing";
import { PageHero } from "@/components/layout/PageHero";
import { getLegalSocialRisksLive } from "@/lib/data/legal-social-risks";

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
  const legalSocialRisks = await getLegalSocialRisksLive({
    countrySlug,
    citySlug: slug,
  });

  return (
    <main className="editorial-page">
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

      <section className="relative mx-auto max-w-5xl px-6 py-16 sm:py-20">
        <div className="grid gap-8 lg:grid-cols-2 lg:items-start">
          <aside className="scene-glass h-full rounded-[1.35rem] p-6 sm:p-8">
            <p className="luxury-kicker text-kintsugi-300">Before you book</p>
            <h2 className="mt-4 max-w-sm font-display text-[clamp(2rem,3.2vw,2.75rem)] font-semibold leading-[1.08] text-white">
              Passport first. Everything else after.
            </h2>
            <p className="mt-5 max-w-md text-sm leading-7 text-white/76">
              Select your passport and residence to see the current tourist
              entry rule, stay limit, and official source.
            </p>
            <div className="mt-8 max-w-md space-y-4 border-t border-white/14 pt-6 text-sm leading-7 text-white/70">
              <p>
                Your citizenship drives the rule. Residence can affect
                waivers, eVisa eligibility, and consular process.
              </p>
              <p>
                Treat this as a planning layer, then verify with the official
                government source before paying for flights.
              </p>
            </div>
          </aside>

          <div className="h-full rounded-[1.35rem] border border-white/14 bg-black/24 p-5 shadow-editorial-deep backdrop-blur-sm sm:p-6">
            <VisaPicker
              rules={ruleset.rules}
              reviewedAt={ruleset.reviewed_at}
              officialSource={ruleset.official_source}
              disclaimer={ruleset.disclaimer}
            />
          </div>
        </div>
      </section>

      <SocialRiskBriefing
        risks={legalSocialRisks}
        destinationName={city.name}
        compact
        focusCategories={[
          "immigration_entry",
          "police_official_interaction",
          "drugs_medication_controlled_substances",
        ]}
      />
    </main>
  );
}
