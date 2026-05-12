/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  getCountry,
  getCountryLanguages,
  getCountryResidents,
  type LanguageRow,
} from "@/lib/data/seed";
import { AmbientDestinationMotion } from "@/components/destination/AmbientDestinationMotion";
import { ResidentsPies } from "@/components/demographics/ResidentsPies";
import { getDestinationIdentity } from "@/lib/destination/identity";

const ROLE_LABELS: Record<string, string> = {
  official: "Official",
  national: "National",
  widely_spoken: "Widely spoken",
  regional: "Regional",
  minority: "Minority",
  immigrant: "Immigrant community",
  sign: "Sign language",
};

const LANGUAGE_IMAGES = {
  hero:
    "https://images.unsplash.com/photo-1528360983277-13d401cdc186?auto=format&fit=crop&w=2400&q=85",
  paper:
    "https://images.unsplash.com/photo-1528164344705-47542687000d?auto=format&fit=crop&w=1800&q=84",
  street:
    "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=1800&q=84",
};

export function generateMetadata(): Metadata {
  return {
    title: "Languages spoken",
    description:
      "Every language used in the country, ranked by share of speakers, including English-proficiency level.",
  };
}

export default async function LanguagesPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const country = getCountry(slug);
  const payload = getCountryLanguages(slug);
  const residents = getCountryResidents(slug);
  if (!country || !payload) notFound();

  const identity = getDestinationIdentity(slug);
  const languages = [...payload.languages].sort(
    (a, b) => b.speakers_pct - a.speakers_pct,
  );
  const primary = languages[0];
  const secondary = languages.slice(1, 4);
  const community = languages.slice(4);

  return (
    <main className="editorial-page">
      <section className="relative isolate min-h-[calc(100svh-4rem)] overflow-hidden bg-sumi-900">
        <img
          src={LANGUAGE_IMAGES.hero}
          alt={`${country.name} street with lanterns and signs`}
          className="image-drift absolute inset-0 -z-20 h-full w-full object-cover"
        />
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(8,7,6,.96),rgba(8,7,6,.62)_48%,rgba(8,7,6,.18)),linear-gradient(0deg,rgba(8,7,6,.9),transparent_52%)]" />
        <div className="absolute inset-0 -z-10 opacity-70" style={{ backgroundImage: identity.texture }} />
        <AmbientDestinationMotion identity={identity} />
        <div className="mx-auto grid min-h-[calc(100svh-4rem)] max-w-7xl content-end gap-12 px-6 pb-20 pt-24 lg:grid-cols-[1fr_1fr] lg:items-end">
          <div>
            <nav className="luxury-kicker text-white/56">
              <Link href="/" className="hover:text-kintsugi-300">
                Home
              </Link>{" "}
              ·{" "}
              <Link href={`/country/${slug}`} className="hover:text-kintsugi-300">
                {country.name}
              </Link>{" "}
              · Languages
            </nav>
            <p className="luxury-kicker mt-8 text-kintsugi-300">Language register</p>
            <h1 className="luxury-display mt-4 text-[clamp(4rem,11vw,10rem)] font-semibold text-white">
              How Japan speaks
            </h1>
            <p className="luxury-lede mt-8 max-w-2xl text-white/82">
              Japanese sets the rhythm. Regional, Indigenous, sign and immigrant languages add quieter layers that matter for culture, identity and travel.
            </p>
          </div>

          <aside className="scene-glass rounded-[1.35rem] p-6 sm:p-8">
            <p className="luxury-kicker text-kintsugi-300">English proficiency</p>
            <div className="mt-5 flex items-end gap-4">
              <div className="font-sans text-[clamp(4rem,10vw,7rem)] font-semibold leading-none text-white">
                {payload.english_proficiency.band}
              </div>
              <div className="pb-2 text-sm font-bold uppercase tracking-[0.12em] text-white/54">
                {payload.english_proficiency.score} / 800
              </div>
            </div>
            {payload.english_proficiency.notes && (
              <p className="mt-5 text-sm leading-7 text-white/70">
                {payload.english_proficiency.notes}
              </p>
            )}
            <p className="mt-6 border-t border-white/12 pt-4 text-xs leading-6 text-white/48">
              Source: {payload.english_proficiency.source}
            </p>
          </aside>
        </div>
      </section>

      <section className="journee-scene relative overflow-hidden py-32 sm:py-44">
        <img
          src={LANGUAGE_IMAGES.paper}
          alt=""
          className="absolute right-0 top-10 h-[34rem] w-[54vw] object-cover opacity-18"
          loading="lazy"
        />
        <div className="relative mx-auto grid max-w-7xl gap-16 px-6 lg:grid-cols-[.72fr_1.28fr] lg:items-center">
          <div>
            <p className="luxury-kicker text-kintsugi-300">Primary language</p>
            <h2 className="luxury-display mt-4 text-[clamp(2.8rem,6vw,6rem)] font-semibold text-white">
              Script is part of the landscape.
            </h2>
            <p className="mt-7 max-w-lg text-base leading-8 text-white/68">
              Visitors feel the language visually first: station signs, menu slips, temple notices, polite set phrases, hand-painted shopfronts.
            </p>
          </div>
          <LanguageFeature lang={primary} />
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#11100e] py-32 sm:py-44">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `url(${LANGUAGE_IMAGES.street})`,
            backgroundPosition: "center",
            backgroundSize: "cover",
          }}
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(17,16,14,.96),rgba(17,16,14,.86),rgba(17,16,14,.98))]" />
        <div className="relative mx-auto grid max-w-7xl gap-16 px-6 lg:grid-cols-[1fr_.9fr]">
          <div className="space-y-8">
            {secondary.map((lang, index) => (
              <LanguageBand key={lang.iso_639_3} lang={lang} index={index} />
            ))}
          </div>
          <div className="lg:pt-20">
            <p className="luxury-kicker text-kintsugi-300">Regional voices</p>
            <h2 className="luxury-display mt-4 text-[clamp(2.7rem,5vw,5.4rem)] font-semibold text-white">
              Not every language is loud in public.
            </h2>
            <p className="mt-7 text-base leading-8 text-white/68">
              Endangered and regional languages need more space than a small table row. They explain where the country is not a single cultural surface.
            </p>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden py-32 sm:py-44">
        <div className="relative mx-auto max-w-7xl px-6">
          <div className="mb-12 max-w-3xl">
            <p className="luxury-kicker text-kintsugi-300">Community languages</p>
            <h2 className="luxury-display mt-4 text-[clamp(2.7rem,5vw,5.4rem)] font-semibold text-white">
              The everyday sound of migration.
            </h2>
          </div>
          <div className="grid gap-5 md:grid-cols-2">
            {community.map((lang) => (
              <LanguageNote key={lang.iso_639_3} lang={lang} />
            ))}
          </div>

          {residents && (
            <ResidentsPies
              country={residents.country}
              city={residents.city}
              source={residents.source}
            />
          )}

          <p className="mt-10 max-w-3xl text-xs leading-6 text-white/48">
            Percentages are approximate shares of the resident population and do not sum to 100% because bilingualism is common. Immigrant-community figures reflect recent non-citizen populations.
          </p>
        </div>
      </section>
    </main>
  );
}

function LanguageFeature({ lang }: { lang: LanguageRow }) {
  return (
    <article className="scene-glass relative min-h-[36rem] overflow-hidden rounded-[1.55rem] p-7 sm:p-10">
      <div className="absolute -right-8 -top-8 font-sans text-[17rem] font-semibold leading-none text-white/[0.035]" aria-hidden>
        語
      </div>
      <div className="relative flex min-h-[28rem] flex-col justify-end">
        <p className="luxury-kicker text-kintsugi-300">{ROLE_LABELS[lang.role]}</p>
        <h2 className="mt-4 font-sans text-[clamp(3.4rem,9vw,7.5rem)] font-semibold leading-[0.95] text-white">
          {lang.name}
        </h2>
        <p className="mt-4 text-lg leading-8 text-white/72">{lang.script}</p>
        <PercentLine value={lang.speakers_pct} />
        {lang.notes && <p className="mt-7 max-w-2xl text-base leading-8 text-white/72">{lang.notes}</p>}
      </div>
    </article>
  );
}

function LanguageBand({ lang, index }: { lang: LanguageRow; index: number }) {
  return (
    <article className={`scene-glass rounded-[1.3rem] p-6 sm:p-8 ${index === 1 ? "lg:ml-16" : ""}`}>
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="luxury-kicker text-kintsugi-300">{ROLE_LABELS[lang.role] ?? lang.role}</p>
          <h3 className="mt-3 font-sans text-[clamp(2rem,5vw,3.5rem)] font-semibold leading-tight text-white">
            {lang.name}
          </h3>
        </div>
        {lang.endangered && (
          <span className="rounded-full border border-enji-300/40 bg-enji-500/20 px-3 py-1 text-xs font-bold uppercase tracking-[0.12em] text-sakura-100">
            Endangered
          </span>
        )}
      </div>
      <PercentLine value={lang.speakers_pct} />
      {lang.notes && <p className="mt-5 text-sm leading-7 text-white/68">{lang.notes}</p>}
    </article>
  );
}

function LanguageNote({ lang }: { lang: LanguageRow }) {
  return (
    <article className="border-t border-white/12 py-6">
      <div className="flex items-baseline justify-between gap-4">
        <h3 className="font-sans text-2xl font-semibold text-white">{lang.name}</h3>
        <span className="text-sm font-semibold tabular-nums text-kintsugi-300">{formatPct(lang.speakers_pct)}</span>
      </div>
      <p className="mt-2 text-[0.64rem] font-bold uppercase tracking-[0.12em] text-white/42">
        {ROLE_LABELS[lang.role] ?? lang.role} · {lang.script}
      </p>
      {lang.notes && <p className="mt-4 text-sm leading-7 text-white/66">{lang.notes}</p>}
    </article>
  );
}

function PercentLine({ value }: { value: number }) {
  return (
    <div className="mt-7">
      <div className="flex items-baseline justify-between gap-4">
        <span className="luxury-kicker text-white/44">Speaker share</span>
        <span className="font-sans text-3xl font-semibold text-kintsugi-300 tabular-nums">
          {formatPct(value)}
        </span>
      </div>
      <div className="mt-3 h-px overflow-hidden bg-white/14">
        <div
          className="h-px bg-kintsugi-300"
          style={{ width: `${Math.min(100, Math.max(1, value))}%` }}
        />
      </div>
    </div>
  );
}

function formatPct(n: number) {
  if (n >= 1) return `${n.toFixed(1)}%`;
  if (n >= 0.1) return `${n.toFixed(2)}%`;
  return "< 0.1%";
}
