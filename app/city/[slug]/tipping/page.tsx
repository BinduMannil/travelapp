import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  getCity,
  getCountryForCity,
  getCountryTipping,
} from "@/lib/data/seed";
import { PageHero } from "@/components/layout/PageHero";

const CONTEXT_LABELS: Record<string, string> = {
  restaurant: "Restaurants (mid-upper tier)",
  casual_dining: "Casual dining (ramen, izakaya, chains)",
  taxi: "Taxis",
  hotel: "Hotels & ryokan",
  tour_guide: "Tour guides",
  bar: "Bars",
  spa_salon: "Spas & salons",
  delivery: "Food delivery",
};

export function generateMetadata(): Metadata {
  return {
    title: "Tipping culture",
    description:
      "Whether to tip, how much, and what to do when a gratuity is refused.",
  };
}

export default async function TippingPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const city = getCity(slug);
  const countrySlug = getCountryForCity(slug);
  if (!city || !countrySlug) notFound();

  const payload = getCountryTipping(countrySlug);
  if (!payload) notFound();

  return (
    <main>
      <PageHero
        crumbs={[
          { label: "Home", href: "/" },
          { label: city.name, href: `/city/${slug}` },
          { label: "Tipping" },
        ]}
        kanji="心"
        eyebrow="Tipping culture"
        title={`Tipping in ${city.name}`}
        subtitle="心 付"
        lede={payload.summary}
        palette="enji"
      />

      <section className="mx-auto max-w-3xl px-6 py-12">
        <div className="space-y-3">
          {payload.rules.map((r) => (
            <article
              key={r.context}
              className="rounded-2xl border border-washi-200 bg-white p-5"
            >
              <header className="flex flex-wrap items-baseline justify-between gap-3">
                <h2 className="font-display text-lg font-semibold text-sumi-900">
                  {CONTEXT_LABELS[r.context] ?? r.context}
                </h2>
                <span
                  className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
                    r.expected
                      ? "bg-kintsugi-300/30 text-sumi-900"
                      : "bg-matcha-100 text-matcha-700"
                  }`}
                >
                  {r.expected ? "Tip expected" : "No tip"}
                </span>
              </header>
              <p className="mt-2 text-sm font-medium text-sumi-900">
                {r.amount_guidance}
              </p>
              {r.notes && (
                <p className="mt-2 text-sm leading-relaxed text-sumi-700">
                  {r.notes}
                </p>
              )}
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
