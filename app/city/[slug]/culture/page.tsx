import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getPlaceOption } from "@/lib/destinations/countries";
import { VietnamCityDetailPage } from "@/components/vietnam/VietnamCityDetailPage";
import { getVietnamCity } from "@/lib/vietnam/frontend";
import {
  Clock3,
  HandCoins,
  Languages,
  MapPin,
  MessageSquareText,
  ShieldAlert,
  Shirt,
  ShoppingBag,
  Sparkles,
  Utensils,
  Volume2,
} from "lucide-react";
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

const TRAIT_ICONS = [
  Volume2,
  Sparkles,
  MessageSquareText,
  Clock3,
  ShoppingBag,
  Shirt,
  HandCoins,
  MessageSquareText,
  ShieldAlert,
  MapPin,
];

const PHRASE_CATEGORY_ICONS = {
  greetings: MessageSquareText,
  courtesy: Sparkles,
  food: Utensils,
  directions: MapPin,
  shopping: ShoppingBag,
  emergency: ShieldAlert,
};

const DRESS_TONE: Record<string, string> = {
  casual: "border-matcha-300/35 bg-matcha-300/10 text-matcha-100",
  smart_casual: "border-kintsugi-300/45 bg-kintsugi-300/12 text-kintsugi-100",
  modest: "border-aizome-300/40 bg-aizome-300/12 text-aizome-100",
  formal: "border-washi-100/35 bg-washi-100/10 text-washi-50",
  nude: "border-enji-300/40 bg-enji-300/16 text-sakura-100",
};

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
  if (getPlaceOption(slug)) notFound();
  const vietnamCity = getVietnamCity(slug);
  if (vietnamCity) return <VietnamCityDetailPage city={vietnamCity} kind="culture" />;
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
    <main className="editorial-page">
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
      <section className="relative overflow-hidden px-6 py-20 sm:py-24">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.78fr_1.22fr] lg:items-start">
          <aside className="scene-glass top-24 p-6 lg:sticky">
            <p className="luxury-kicker text-kintsugi-300">At a glance</p>
            <h2 className="mt-4 font-sans text-4xl font-semibold leading-tight text-white">
              Match the register and Japan becomes easier.
            </h2>
            <p className="mt-5 text-sm leading-7 text-white/70">
              {culture.people.summary}
            </p>
            <div className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
              {[
                ["Public volume", "Low"],
                ["Reservation culture", "Punctual"],
                ["Cash handling", "Use the tray"],
                ["Core phrase", "Sumimasen"],
              ].map(([label, value]) => (
                <div
                  key={label}
                  className="border-l border-kintsugi-300/45 bg-white/[0.06] px-4 py-3"
                >
                  <div className="text-[10px] font-semibold uppercase tracking-[0.12em] text-white/45">
                    {label}
                  </div>
                  <div className="mt-1 font-sans text-2xl font-semibold text-white">
                    {value}
                  </div>
                </div>
              ))}
            </div>
          </aside>

          <div className="space-y-5">
            <div>
              <p className="luxury-kicker text-kintsugi-300/80">What to expect</p>
              <h2 className="mt-4 max-w-3xl font-sans text-[clamp(2.5rem,5vw,5.2rem)] font-semibold leading-none text-white">
                Politeness is practical infrastructure.
              </h2>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {culture.people.traits.map((trait, index) => {
                const Icon = TRAIT_ICONS[index % TRAIT_ICONS.length];
                return (
                  <article
                    key={trait.title}
                    className="min-h-44 border border-washi-200 p-5"
                  >
                    <div className="flex items-start gap-4">
                      <span className="grid h-10 w-10 shrink-0 place-items-center border border-sumi-900/12 bg-sumi-900 text-washi-50">
                        <Icon size={18} strokeWidth={1.8} />
                      </span>
                      <div>
                        <h3 className="font-sans text-xl font-semibold leading-tight text-sumi-950">
                          {trait.title}
                        </h3>
                        <p className="mt-3 text-sm leading-7 text-sumi-700">
                          {trait.body}
                        </p>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="journee-scene px-6 py-20 sm:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-10 lg:grid-cols-[0.75fr_1.25fr] lg:items-end">
            <div>
              <p className="luxury-kicker text-kintsugi-300">Dress code</p>
              <h2 className="mt-4 font-sans text-[clamp(2.45rem,5vw,5rem)] font-semibold leading-none text-white">
                What to wear, by context.
              </h2>
              <p className="mt-5 max-w-md text-sm leading-7 text-white/68">
                Japan rarely feels flashy, but presentation matters. Clean,
                restrained, and context-aware clothing will get you almost
                everywhere.
              </p>
            </div>
            <div className="grid gap-3 md:grid-cols-2">
              {culture.dress_codes.map((dress) => (
                <article key={dress.context} className="scene-glass p-5">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="font-sans text-2xl font-semibold leading-tight text-white">
                        {dress.label}
                      </div>
                      <div
                        className={`mt-3 inline-flex border px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] ${DRESS_TONE[dress.requirement]}`}
                      >
                        {DRESS_LABEL[dress.requirement] ?? dress.requirement}
                      </div>
                    </div>
                    <Shirt className="mt-1 text-kintsugi-300" size={22} />
                  </div>
                  <p className="mt-5 text-sm leading-7 text-white/70">
                    {dress.notes}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 py-20 sm:py-24">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.05fr_.95fr] lg:items-start">
          <div className="scene-glass p-6 sm:p-8">
            <div className="flex items-start justify-between gap-6">
              <div>
                <p className="luxury-kicker text-kintsugi-300">Language field</p>
                <h2 className="mt-4 font-sans text-[clamp(2.35rem,5vw,4.8rem)] font-semibold leading-none text-white">
                  Japanese first, kindness second.
                </h2>
              </div>
              <Languages className="hidden text-kintsugi-300 sm:block" size={34} />
            </div>
            <p className="mt-5 max-w-2xl text-sm leading-7 text-white/68">
              You can navigate Tokyo with English signage and translation apps,
              but a few polite Japanese phrases change the tone of everyday
              exchanges immediately.
            </p>
            <div className="mt-8 space-y-5">
              {topLanguages.map((language) => {
                const width = Math.max(language.speakers_pct, 4);
                return (
                  <div
                    key={language.iso_639_3}
                    className="grid grid-cols-[7.5rem_1fr_4.5rem] items-center gap-3 text-sm"
                  >
                    <div className="truncate text-white/78">{language.name}</div>
                    <div className="h-px bg-white/16">
                      <div
                        className="h-px bg-kintsugi-300 shadow-[0_0_18px_rgba(200,155,60,.75)]"
                        style={{ width: `${width}%` }}
                      />
                    </div>
                    <div className="text-right font-sans text-lg text-white">
                      {language.speakers_pct.toFixed(
                        language.speakers_pct % 1 ? 1 : 0,
                      )}
                      %
                    </div>
                  </div>
                );
              })}
            </div>
            <Link
              href={`/country/${countrySlug}/languages`}
              className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-kintsugi-300 underline-offset-4 hover:underline"
            >
              See all languages <span aria-hidden>→</span>
            </Link>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
            {[
              {
                title: "Best default opening",
                body: "Start with sumimasen before asking for help, ordering, or gently getting attention.",
              },
              {
                title: "When you do not understand",
                body: "A small pause, a smile, and a translation screen usually lands better than louder English.",
              },
              {
                title: "When unsure",
                body: "Observe the queue, the volume, the shoes, and the payment tray. The room usually tells you what to do.",
              },
            ].map((note) => (
              <article key={note.title} className="border border-washi-200 p-5">
                <h3 className="font-sans text-2xl font-semibold text-sumi-950">
                  {note.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-sumi-700">{note.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="relative px-6 pb-24 pt-10 sm:pb-32">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 max-w-3xl">
            <p className="luxury-kicker text-kintsugi-300">Pocket phrasebook</p>
            <h2 className="mt-4 font-sans text-[clamp(2.7rem,6vw,6rem)] font-semibold leading-none text-white">
              Phrases you will actually use.
            </h2>
            <p className="mt-5 text-sm leading-7 text-white/68">
              Grouped by the moments where a traveler really reaches for a
              phrase: greeting, courtesy, food, directions, shopping, and
              emergencies.
            </p>
          </div>

          <div className="grid gap-5 lg:grid-cols-2">
            {PHRASE_CATEGORY_ORDER.filter((category) =>
              phrasesByCategory.has(category),
            ).map((category) => {
              const Icon =
                PHRASE_CATEGORY_ICONS[
                  category as keyof typeof PHRASE_CATEGORY_ICONS
                ] ?? MessageSquareText;

              return (
                <section
                  key={category}
                  className="scene-glass overflow-hidden"
                  aria-labelledby={`phrase-${category}`}
                >
                  <div className="flex items-center justify-between gap-4 border-b border-white/12 p-5">
                    <div className="flex items-center gap-3">
                      <span className="grid h-10 w-10 place-items-center border border-kintsugi-300/35 bg-kintsugi-300/10 text-kintsugi-300">
                        <Icon size={18} />
                      </span>
                      <h3
                        id={`phrase-${category}`}
                        className="font-sans text-2xl font-semibold text-white"
                      >
                        {PHRASE_CATEGORY_LABEL[category] ?? category}
                      </h3>
                    </div>
                    <div className="text-xs uppercase tracking-[0.12em] text-white/38">
                      {(phrasesByCategory.get(category) ?? []).length} lines
                    </div>
                  </div>
                  <div className="divide-y divide-white/10">
                    {(phrasesByCategory.get(category) ?? []).map((phrase) => (
                      <div
                        key={phrase.romaji}
                        className="grid gap-3 p-5 sm:grid-cols-[1fr_1fr]"
                      >
                        <div>
                          <div className="font-sans text-2xl font-semibold text-white">
                            {phrase.ja}
                          </div>
                          <div className="mt-1 text-sm italic text-kintsugi-300/88">
                            {phrase.romaji}
                          </div>
                        </div>
                        <p className="text-sm leading-7 text-white/68">
                          {phrase.en}
                        </p>
                      </div>
                    ))}
                  </div>
                </section>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}
