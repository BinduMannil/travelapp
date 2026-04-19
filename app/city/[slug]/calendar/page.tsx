import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  getCity,
  getCountryCalendar,
  getCountryForCity,
} from "@/lib/data/seed";

const IMPACT_STYLES: Record<string, string> = {
  major: "bg-rose-50 text-rose-900 border-rose-200",
  moderate: "bg-amber-50 text-amber-900 border-amber-200",
  low: "bg-slate-50 text-slate-700 border-slate-200",
};

const IMPACT_LABEL: Record<string, string> = {
  major: "Peak prices + crowds",
  moderate: "Busier than usual",
  low: "Low impact",
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function formatRange(start: string, end: string) {
  if (start === end) return formatDate(start);
  return `${formatDate(start)} – ${formatDate(end)}`;
}

export function generateMetadata(): Metadata {
  return {
    title: "Holidays & festivals",
    description:
      "Public holidays and festival periods with price and crowd impact, so you can time or avoid the peaks.",
  };
}

export default async function CalendarPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const city = getCity(slug);
  const countrySlug = getCountryForCity(slug);
  if (!city || !countrySlug) notFound();

  const data = getCountryCalendar(countrySlug);
  if (!data) notFound();

  return (
    <main className="mx-auto max-w-5xl px-6 py-12">
      <nav className="text-sm text-slate-500">
        <Link href="/" className="hover:underline">
          Home
        </Link>{" "}
        ·{" "}
        <Link href={`/city/${slug}`} className="hover:underline">
          {city.name}
        </Link>{" "}
        · Holidays &amp; festivals
      </nav>
      <h1 className="mt-2 text-3xl font-semibold">
        When to go &mdash; and when to avoid
      </h1>
      <p className="mt-3 text-slate-600">
        Public holidays spike domestic travel; festivals spike international
        travel. Both move the needle on flight, hotel, and restaurant
        availability. Plan around the red dots if you want value; plan into
        them if you want the spectacle.
      </p>

      <section className="mt-8">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
          Public holidays
        </h2>
        <div className="mt-3 space-y-2">
          {data.holidays.map((h) => (
            <article
              key={h.date + h.name}
              className={`rounded-lg border p-4 ${IMPACT_STYLES[h.impact] ?? IMPACT_STYLES.low}`}
            >
              <header className="flex flex-wrap items-baseline justify-between gap-3">
                <div>
                  <div className="text-xs uppercase tracking-wide opacity-80">
                    {formatDate(h.date)}
                  </div>
                  <div className="font-semibold">{h.name}</div>
                </div>
                <span className="rounded-full bg-white/60 px-2.5 py-0.5 text-xs">
                  {IMPACT_LABEL[h.impact] ?? h.impact}
                </span>
              </header>
              {h.notes && <p className="mt-2 text-sm">{h.notes}</p>}
            </article>
          ))}
        </div>
      </section>

      <section className="mt-10">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
          Festivals &amp; seasonal events
        </h2>
        <div className="mt-3 space-y-3">
          {data.festivals.map((f) => (
            <article
              key={f.name}
              className={`rounded-lg border p-5 ${IMPACT_STYLES[f.price_impact] ?? IMPACT_STYLES.low}`}
            >
              <header className="flex flex-wrap items-baseline justify-between gap-3">
                <div>
                  <div className="text-xs uppercase tracking-wide opacity-80">
                    {formatRange(f.start_date, f.end_date)} · {f.category}
                  </div>
                  <h3 className="text-xl font-semibold">{f.name}</h3>
                </div>
                <span className="rounded-full bg-white/60 px-2.5 py-0.5 text-xs">
                  {IMPACT_LABEL[f.price_impact] ?? f.price_impact}
                </span>
              </header>
              <p className="mt-3 text-sm">{f.body}</p>
              {f.url && (
                <a
                  href={f.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-block text-sm underline"
                >
                  Official site →
                </a>
              )}
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
