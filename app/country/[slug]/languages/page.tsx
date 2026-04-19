import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getCountry, getCountryLanguages } from "@/lib/data/seed";

const ROLE_LABELS: Record<string, string> = {
  official: "Official",
  national: "National",
  widely_spoken: "Widely spoken",
  regional: "Regional",
  minority: "Minority",
  immigrant: "Immigrant community",
  sign: "Sign language",
};

const ROLE_STYLES: Record<string, string> = {
  official: "bg-indigo-100 text-indigo-900",
  national: "bg-indigo-50 text-indigo-900",
  widely_spoken: "bg-sky-100 text-sky-900",
  regional: "bg-emerald-100 text-emerald-900",
  minority: "bg-amber-100 text-amber-900",
  immigrant: "bg-slate-100 text-slate-800",
  sign: "bg-fuchsia-100 text-fuchsia-900",
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
  if (!country || !payload) notFound();

  const languages = [...payload.languages].sort(
    (a, b) => b.speakers_pct - a.speakers_pct,
  );

  return (
    <main className="mx-auto max-w-4xl px-6 py-12">
      <nav className="text-sm text-slate-500">
        <Link href="/" className="hover:underline">
          Home
        </Link>{" "}
        ·{" "}
        <Link href={`/country/${slug}`} className="hover:underline">
          {country.name}
        </Link>{" "}
        · Languages
      </nav>
      <h1 className="mt-2 text-3xl font-semibold">
        Languages of {country.name}
      </h1>
      <p className="mt-3 text-slate-600">
        Ranked by share of speakers, including official, regional, immigrant,
        and sign languages.
      </p>

      <section className="mt-8 rounded-lg border border-slate-200 bg-slate-50 p-5">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-sm uppercase tracking-wide text-slate-500">
              English proficiency
            </div>
            <div className="mt-1 text-2xl font-semibold">
              {payload.english_proficiency.band}
              <span className="ml-2 text-base font-normal text-slate-500">
                ({payload.english_proficiency.score} / 800)
              </span>
            </div>
          </div>
          <div className="text-xs text-slate-500">
            Source: {payload.english_proficiency.source}
          </div>
        </div>
        {payload.english_proficiency.notes && (
          <p className="mt-3 text-sm text-slate-700">
            {payload.english_proficiency.notes}
          </p>
        )}
      </section>

      <section className="mt-8 space-y-3">
        {languages.map((lang) => (
          <article
            key={lang.iso_639_3}
            className="rounded-lg border border-slate-200 p-4"
          >
            <header className="flex flex-wrap items-baseline justify-between gap-3">
              <h2 className="text-xl font-semibold">
                {lang.name}
                {lang.endangered && (
                  <span className="ml-2 rounded bg-red-100 px-1.5 py-0.5 text-xs font-medium text-red-900 align-middle">
                    Endangered
                  </span>
                )}
              </h2>
              <div className="flex items-center gap-3 text-sm">
                <span
                  className={`rounded-full px-2.5 py-0.5 text-xs ${ROLE_STYLES[lang.role]}`}
                >
                  {ROLE_LABELS[lang.role] ?? lang.role}
                </span>
                <span className="tabular-nums text-slate-700">
                  {formatPct(lang.speakers_pct)}
                </span>
              </div>
            </header>
            <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-slate-100">
              <div
                className="h-full bg-brand-500"
                style={{
                  width: `${Math.min(100, Math.max(0.5, lang.speakers_pct))}%`,
                }}
              />
            </div>
            {lang.script && (
              <div className="mt-2 text-xs text-slate-500">
                Script: {lang.script}
              </div>
            )}
            {lang.notes && (
              <p className="mt-3 text-sm leading-relaxed text-slate-700">
                {lang.notes}
              </p>
            )}
          </article>
        ))}
      </section>

      <p className="mt-10 text-xs text-slate-500">
        Percentages are approximate shares of the resident population and do
        not sum to 100% — bilingualism is common. Immigrant-community figures
        reflect the size of recent non-citizen populations.
      </p>
    </main>
  );
}

function formatPct(n: number) {
  if (n >= 1) return `${n.toFixed(1)}%`;
  if (n >= 0.1) return `${n.toFixed(2)}%`;
  return `< 0.1%`;
}
