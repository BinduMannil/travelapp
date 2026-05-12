import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getPlaceOption } from "@/lib/destinations/countries";
import { VietnamCityDetailPage } from "@/components/vietnam/VietnamCityDetailPage";
import { getVietnamCity } from "@/lib/vietnam/frontend";
import {
  getCity,
  getCountryForCity,
  getCountryTipping,
} from "@/lib/data/seed";
import { PageHero } from "@/components/layout/PageHero";

const CONTEXT_LABELS: Record<string, string> = {
  restaurant: "Restaurants",
  casual_dining: "Casual dining",
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
  if (getPlaceOption(slug)) notFound();
  const vietnamCity = getVietnamCity(slug);
  if (vietnamCity) return <VietnamCityDetailPage city={vietnamCity} kind="tipping" />;
  const city = getCity(slug);
  const countrySlug = getCountryForCity(slug);
  if (!city || !countrySlug) notFound();

  const payload = getCountryTipping(countrySlug);
  if (!payload) notFound();

  const expected = payload.rules.filter((r) => r.expected);
  const notExpected = payload.rules.filter((r) => !r.expected);

  return (
    <main className="editorial-page">
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

      <section className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
        <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <aside className="rounded-[1.45rem] border border-white/14 bg-[linear-gradient(180deg,rgba(35,29,25,0.94),rgba(13,12,11,0.96))] p-7 shadow-editorial-deep">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-kintsugi-200">
              Cultural rule
            </p>
            <h2 className="mt-5 font-sans text-[clamp(2.6rem,5vw,5rem)] font-semibold leading-[0.92] text-white">
              When in doubt, do less.
            </h2>
            <p className="mt-5 text-sm leading-7 text-white/76">
              The etiquette is simple, but it matters: respect the local rhythm,
              avoid performative generosity, and use official service charges where
              they exist.
            </p>
          </aside>

          <div className="rounded-[1.45rem] border border-white/15 bg-[linear-gradient(135deg,rgba(244,238,224,0.99),rgba(229,219,199,0.96))] p-6 text-sumi-950 shadow-editorial-deep sm:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-enji-700">
              Quick answer
            </p>
            <p className="mt-4 font-sans text-[clamp(2.2rem,4vw,4rem)] font-semibold leading-[0.98]">
              {notExpected.length >= expected.length
                ? "Most everyday situations do not need a tip."
                : "Some situations may expect a gratuity."}
            </p>
            <p className="mt-5 text-sm leading-7 text-sumi-800">
              {payload.summary}
            </p>
          </div>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2">
          {payload.rules.map((r) => (
            <article
              key={r.context}
              className="rounded-[1.25rem] border border-white/14 bg-white/[0.08] p-5 text-white shadow-editorial-deep backdrop-blur"
            >
              <header className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-kintsugi-200">
                    {r.expected ? "Handled carefully" : "Usually no tip"}
                  </p>
                  <h2 className="mt-2 font-sans text-3xl font-semibold leading-none">
                    {CONTEXT_LABELS[r.context] ?? r.context}
                  </h2>
                </div>
                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold ${
                    r.expected
                      ? "bg-kintsugi-300 text-sumi-950"
                      : "bg-matcha-200 text-matcha-900"
                  }`}
                >
                  {r.expected ? "Tip expected" : "No tip"}
                </span>
              </header>
              <p className="mt-5 text-base font-semibold leading-7 text-white">
                {r.amount_guidance}
              </p>
              {r.notes && (
                <p className="mt-3 border-t border-white/12 pt-4 text-sm leading-7 text-white/74">
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
