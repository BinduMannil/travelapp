import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  getCity,
  getCountryForCity,
  getCountryTipping,
} from "@/lib/data/seed";

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
    <main className="mx-auto max-w-3xl px-6 py-12">
      <nav className="text-sm text-slate-500">
        <Link href="/" className="hover:underline">
          Home
        </Link>{" "}
        ·{" "}
        <Link href={`/city/${slug}`} className="hover:underline">
          {city.name}
        </Link>{" "}
        · Tipping
      </nav>
      <h1 className="mt-2 text-3xl font-semibold">
        Tipping in {city.name}
      </h1>

      <p className="mt-4 rounded-lg border border-emerald-200 bg-emerald-50 p-4 text-emerald-900">
        {payload.summary}
      </p>

      <section className="mt-8 space-y-3">
        {payload.rules.map((r) => (
          <article
            key={r.context}
            className="rounded-lg border border-slate-200 p-4"
          >
            <header className="flex flex-wrap items-baseline justify-between gap-3">
              <h2 className="text-lg font-semibold">
                {CONTEXT_LABELS[r.context] ?? r.context}
              </h2>
              <span
                className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
                  r.expected
                    ? "bg-amber-100 text-amber-900"
                    : "bg-slate-100 text-slate-700"
                }`}
              >
                {r.expected ? "Tip expected" : "No tip"}
              </span>
            </header>
            <p className="mt-2 text-sm font-medium text-slate-900">
              {r.amount_guidance}
            </p>
            {r.notes && (
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                {r.notes}
              </p>
            )}
          </article>
        ))}
      </section>
    </main>
  );
}
