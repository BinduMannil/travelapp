import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  getCity,
  getCountryCulture,
  getCountryForCity,
  getCountryLanguages,
} from "@/lib/data/seed";
import { PageHero } from "@/components/layout/PageHero";

const DRESS_LABEL: Record<string, string> = {
  casual: "Casual",
  smart_casual: "Smart casual",
  modest: "Modest",
  formal: "Formal",
  nude: "Bathing suit not allowed",
};

const PHRASE_CATEGORY_LABEL: Record<string, string> = {
  greetings: "Greetings",
  courtesy: "Courtesy",
  food: "At a restaurant",
  directions: "Directions",
  shopping: "Shopping",
  emergency: "Emergency",
};

const PHRASE_CATEGORY_ORDER = [
  "greetings",
  "courtesy",
  "food",
  "directions",
  "shopping",
  "emergency",
];

export function generateMetadata(): Metadata {
  return {
    title: "People & language",
    description:
      "What to expect from local behaviour, dress code by context, and a practical phrasebook with romaji pronunciation.",
  };
}

export default async function CulturePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const city = getCity(slug);
  const countrySlug = getCountryForCity(slug);
  if (!city || !countrySlug) notFound();

  const culture = getCountryCulture(countrySlug);
  const langs = getCountryLanguages(countrySlug);
  if (!culture || !langs) notFound();

  const topLanguages = [...langs.languages]
    .sort((a, b) => b.speakers_pct - a.speakers_pct)
    .slice(0, 4);

  const phrasesByCategory = new Map<string, typeof culture.phrasebook>();
  for (const p of culture.phrasebook) {
    const list = phrasesByCategory.get(p.category) ?? [];
    list.push(p);
    phrasesByCategory.set(p.category, list);
  }

  return (
    <main>
      <PageHero
        crumbs={[
          { label: "Home", href: "/" },
          { label: city.name, href: `/city/${slug}` },
          { label: "People & language" },
        ]}
        kanji="和"
        eyebrow="People & language"
        title={`People, language & manners`}
        subtitle="文 化"
        lede={`What to expect from the local register, how to read dress codes, and a pocket phrasebook you can actually use.`}
        palette="ume"
      />
      <div className="mx-auto max-w-4xl px-6 py-12">
<section className="mt-6">
        <h2 className="px-5 text-sm font-semibold uppercase tracking-[0.25em] text-sumi-700">
          What to expect
        </h2>
        <p className="mt-2 text-sumi-800">{culture.people.summary}</p>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {culture.people.traits.map((t) => (
            <article
              key={t.title}
              className="rounded-lg border border-washi-200 p-4"
            >
              <h3 className="font-semibold">{t.title}</h3>
              <p className="mt-1 text-sm text-sumi-800">{t.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-10">
        <h2 className="px-5 text-sm font-semibold uppercase tracking-[0.25em] text-sumi-700">
          Dress code by context
        </h2>
        <div className="mt-3 space-y-2">
          {culture.dress_codes.map((d) => (
            <article
              key={d.context}
              className="flex flex-col rounded-lg border border-washi-200 p-4 sm:flex-row sm:items-start sm:justify-between sm:gap-4"
            >
              <div>
                <div className="text-xs uppercase tracking-[0.25em] text-sumi-700">
                  {DRESS_LABEL[d.requirement] ?? d.requirement}
                </div>
                <div className="font-semibold">{d.label}</div>
                <p className="mt-1 text-sm text-sumi-800">{d.notes}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-10">
        <h2 className="px-5 text-sm font-semibold uppercase tracking-[0.25em] text-sumi-700">
          Languages you will hear
        </h2>
        <div className="mt-3 flex flex-wrap gap-2">
          {topLanguages.map((l) => (
            <span
              key={l.iso_639_3}
              className="rounded-full bg-washi-100 px-3 py-1 text-sm text-sumi-900"
            >
              {l.name}{" "}
              <span className="text-xs text-sumi-700">
                {l.speakers_pct.toFixed(1)}%
              </span>
            </span>
          ))}
        </div>
        <Link
          href={`/country/${countrySlug}/languages`}
          className="mt-3 inline-block text-sm text-brand-600 underline"
        >
          See all languages →
        </Link>
      </section>

      <section className="mt-10">
        <h2 className="px-5 text-sm font-semibold uppercase tracking-[0.25em] text-sumi-700">
          Phrasebook
        </h2>
        <div className="mt-3 space-y-6">
          {PHRASE_CATEGORY_ORDER.filter((c) => phrasesByCategory.has(c)).map(
            (cat) => (
              <div key={cat}>
                <h3 className="text-sm font-semibold text-sumi-900">
                  {PHRASE_CATEGORY_LABEL[cat] ?? cat}
                </h3>
                <div className="mt-2 overflow-hidden rounded-lg border border-washi-200">
                  <table className="min-w-full divide-y divide-washi-200 text-sm">
                    <tbody className="divide-y divide-washi-200">
                      {(phrasesByCategory.get(cat) ?? []).map((p) => (
                        <tr key={p.romaji}>
                          <td className="px-4 py-2 font-medium text-sumi-900">
                            {p.ja}
                          </td>
                          <td className="px-4 py-2 text-sumi-800">
                            <em>{p.romaji}</em>
                          </td>
                          <td className="px-4 py-2 text-sumi-700">{p.en}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ),
          )}
        </div>
      </section>
    </div>
    </main>
  );
}
