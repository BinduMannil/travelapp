import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getCity, getItineraries } from "@/lib/data/seed";
import { PageHero } from "@/components/layout/PageHero";

export function generateMetadata(): Metadata {
  return {
    title: "Itinerary templates",
    description:
      "Hand-crafted day-by-day plans for Tokyo across trip lengths and styles — first-timer, food crawl, family with kids.",
  };
}

export default async function ItineraryListPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const city = getCity(slug);
  if (!city) notFound();

  const templates = getItineraries(slug);

  return (
    <main>
      <PageHero
        crumbs={[
          { label: "Home", href: "/" },
          { label: city.name, href: `/city/${slug}` },
          { label: "Itinerary templates" },
        ]}
        kanji="道"
        eyebrow="Itineraries"
        title={`Pick a starting itinerary`}
        subtitle="旅 程"
        lede={`Start from one of these hand-picked plans, then customise.`}
        palette="matcha"
      />
      <div className="mx-auto max-w-6xl px-6 py-12">
        <section className="mt-4 grid gap-6 sm:grid-cols-2">
          {templates.map((t, index) => (
            <Link
              key={t.slug}
              href={`/city/${slug}/itinerary/${t.slug}`}
              className="group relative overflow-hidden rounded-2xl border border-washi-200/80 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-brand-300 hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500/60"
            >
              <div
                aria-hidden
                className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-br from-brand-100/70 via-brand-50/40 to-transparent opacity-70 transition-opacity duration-300 group-hover:opacity-100"
              />
              <div className="relative space-y-4">
                <header className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-brand-700/80">
                      Plan {String(index + 1).padStart(2, "0")}
                    </p>
                    <h2 className="mt-1 text-xl font-semibold leading-tight text-sumi-900">
                      {t.name}
                    </h2>
                  </div>
                  <span className="rounded-full border border-brand-200 bg-white/90 px-3 py-1 text-xs font-medium text-brand-800 shadow-sm">
                    {t.days} days
                  </span>
                </header>
                <p className="text-sm leading-relaxed text-sumi-800">{t.summary}</p>
                <div className="flex flex-wrap gap-2 text-xs">
                  {t.trip_type_slugs.map((s) => (
                    <span
                      key={s}
                      className="rounded-full bg-sumi-100 px-2.5 py-1 font-medium capitalize text-sumi-700"
                    >
                      {s}
                    </span>
                  ))}
                </div>
                <p className="border-t border-washi-200/80 pt-3 text-xs text-sumi-700">
                  <span className="font-semibold text-sumi-900">Pace:</span> {t.pace} ·{" "}
                  <span className="font-semibold text-sumi-900">Best for:</span>{" "}
                  {t.best_for.join(", ")}
                </p>
              </div>
            </Link>
          ))}
        </section>
      </div>
    </main>
  );
}
