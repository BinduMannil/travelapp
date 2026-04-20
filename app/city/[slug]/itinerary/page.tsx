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
      <div className="mx-auto max-w-5xl px-6 py-12">
<section className="mt-8 grid gap-4 sm:grid-cols-2">
        {templates.map((t) => (
          <Link
            key={t.slug}
            href={`/city/${slug}/itinerary/${t.slug}`}
            className="block rounded-lg border border-washi-200 bg-white p-5 hover:border-brand-500 hover:bg-brand-50"
          >
            <header className="flex items-baseline justify-between gap-3">
              <h2 className="text-lg font-semibold">{t.name}</h2>
              <span className="rounded bg-washi-100 px-2 py-0.5 text-xs text-sumi-800">
                {t.days} days
              </span>
            </header>
            <p className="mt-2 text-sm text-sumi-800">{t.summary}</p>
            <div className="mt-3 flex flex-wrap gap-1 text-xs">
              {t.trip_type_slugs.map((s) => (
                <span
                  key={s}
                  className="rounded bg-brand-100 px-2 py-0.5 text-brand-800"
                >
                  {s}
                </span>
              ))}
            </div>
            <p className="mt-3 text-xs text-sumi-700">
              Pace: {t.pace} · Best for: {t.best_for.join(", ")}
            </p>
          </Link>
        ))}
      </section>
    </div>
    </main>
  );
}
