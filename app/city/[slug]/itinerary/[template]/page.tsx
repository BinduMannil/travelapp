import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getPlaceOption } from "@/lib/destinations/countries";
import {
  getAttraction,
  getCity,
  getItineraries,
  getItinerary,
  getNeighborhood,
  getRestaurant,
  type ItineraryBlock,
} from "@/lib/data/seed";
import { PageHero } from "@/components/layout/PageHero";
import {
  attractionCover,
  neighborhoodCover,
  restaurantCover,
} from "@/components/common/CoverTile";
import { CityItineraryDayDetail } from "@/components/itinerary/CityItineraryDayDetail";
import {
  getAllCityItineraryDayParams,
  getCityItineraryDay,
} from "@/lib/city/itinerary-day-data";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; template: string }>;
}): Promise<Metadata> {
  const { slug, template } = await params;
  const day = getCityItineraryDay(slug, template);
  if (day) {
    return {
      title: `${day.city.city} ${day.dayLabel}: ${day.title}`,
      description: day.overview,
    };
  }

  if (getPlaceOption(slug)) notFound();
  const t = getItinerary(slug, template);
  if (!t) return { title: "Itinerary" };
  return { title: t.name, description: t.summary };
}

const PALETTE_GRADIENT: Record<string, string> = {
  enji: "from-enji-500 via-enji-700 to-sumi-900",
  aizome: "from-aizome-500 via-aizome-700 to-sumi-900",
  sakura: "from-sakura-300 via-sakura-400 to-enji-700",
  matcha: "from-matcha-500 via-matcha-700 to-sumi-900",
  kintsugi: "from-kintsugi-300 via-kintsugi-500 to-enji-700",
  sumi: "from-sumi-700 via-sumi-900 to-black",
  ume: "from-sakura-400 via-enji-600 to-enji-900",
  ocean: "from-aizome-400 via-aizome-700 to-sumi-900",
  forest: "from-matcha-500 via-matcha-700 to-aizome-900",
};

function blockCover(
  citySlug: string,
  block: ItineraryBlock,
): { kanji: string; palette: string } {
  if (block.attraction_slug) {
    const a = getAttraction(citySlug, block.attraction_slug);
    if (a) return attractionCover(a.category);
  }
  if (block.restaurant_slug) {
    const r = getRestaurant(citySlug, block.restaurant_slug);
    if (r) return restaurantCover(r.cuisine);
  }
  if (block.neighborhood_slug) {
    const n = getNeighborhood(citySlug, block.neighborhood_slug);
    if (n) return neighborhoodCover(n.vibe);
  }
  // Fallback for free-form blocks (e.g. "Walk to Skytree", "Dawn run").
  const t = block.title.toLowerCase();
  if (/(dinner|lunch|breakfast|brunch|food|ramen|sushi|coffee|drink|bar|izakaya)/.test(t))
    return { kanji: "食", palette: "enji" };
  if (/(walk|stroll|run)/.test(t)) return { kanji: "歩", palette: "matcha" };
  if (/(train|shinkansen|metro|bus|tram|taxi)/.test(t))
    return { kanji: "発", palette: "aizome" };
  if (/(sunset|night|skyline|view|observation)/.test(t))
    return { kanji: "景", palette: "sumi" };
  if (/(temple|shrine|jingu|jingū)/.test(t))
    return { kanji: "寺", palette: "enji" };
  return { kanji: "旅", palette: "kintsugi" };
}

function BlockLine({
  citySlug,
  block,
}: {
  citySlug: string;
  block: ItineraryBlock;
}) {
  const linkHref = block.attraction_slug
    ? `/city/${citySlug}/attractions/${block.attraction_slug}`
    : block.restaurant_slug
      ? `/city/${citySlug}/restaurants/${block.restaurant_slug}`
      : block.neighborhood_slug
        ? `/city/${citySlug}/neighborhoods/${block.neighborhood_slug}`
        : null;

  const { kanji, palette } = blockCover(citySlug, block);
  const gradient = PALETTE_GRADIENT[palette] ?? PALETTE_GRADIENT.kintsugi;

  const thumb = (
    <div
      className={`relative grid h-14 w-14 shrink-0 place-items-center overflow-hidden rounded-xl bg-gradient-to-br shadow-sm sm:h-16 sm:w-16 ${gradient}`}
      aria-hidden
    >
      <span className="font-sans text-2xl font-bold text-white/90 drop-shadow sm:text-3xl">
        {kanji}
      </span>
      <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-white/15" />
    </div>
  );

  return (
    <li className="flex items-start gap-4 rounded-2xl border border-transparent p-2 transition">
      <div className="w-12 shrink-0 pt-2 text-right font-sans text-xs font-semibold tabular-nums text-enji-700 sm:w-14 sm:text-sm">
        {block.time}
      </div>
      {linkHref ? (
        <Link
          href={linkHref}
          className="group flex flex-1 items-start gap-4 rounded-2xl p-2 transition hover:bg-washi-100 focus:outline-none focus:ring-2 focus:ring-kintsugi-400"
        >
          {thumb}
          <div className="flex-1 pt-1">
            <div className="font-sans text-lg font-semibold leading-tight text-sumi-950 group-hover:text-enji-700">
              {block.title}
            </div>
            {block.note && (
              <p className="mt-1.5 text-sm leading-6 text-sumi-800">{block.note}</p>
            )}
          </div>
        </Link>
      ) : (
        <div className="flex flex-1 items-start gap-4 p-2">
          {thumb}
          <div className="flex-1 pt-1">
            <div className="font-sans text-lg font-semibold leading-tight text-sumi-950">
              {block.title}
            </div>
            {block.note && (
              <p className="mt-1.5 text-sm leading-6 text-sumi-800">{block.note}</p>
            )}
          </div>
        </div>
      )}
    </li>
  );
}

export default async function ItineraryDetailPage({
  params,
}: {
  params: Promise<{ slug: string; template: string }>;
}) {
  const { slug, template } = await params;
  const day = getCityItineraryDay(slug, template);
  if (day) return <CityItineraryDayDetail itinerary={day} />;

  if (getPlaceOption(slug)) notFound();
  const city = getCity(slug);
  const t = getItinerary(slug, template);
  if (!city || !t) notFound();

  return (
    <main className="editorial-page">
      <PageHero
        crumbs={[
          { label: "Home", href: "/" },
          { label: city.name, href: `/city/${slug}` },
          { label: "Itineraries", href: `/city/${slug}/itinerary` },
          { label: t.name },
        ]}
        kanji="旅"
        eyebrow={`${t.days} days · Pace ${t.pace}`}
        title={t.name}
        subtitle={t.trip_type_slugs.join(" · ")}
        lede={t.summary}
        palette="matcha"
      />
      <div className="mx-auto max-w-5xl px-6 py-16 sm:py-20">
      <div className="rounded-[1.25rem] border border-white/12 bg-black/25 p-5 shadow-editorial-deep sm:p-6">
        <p className="text-xs font-semibold uppercase tracking-[0.12em] text-kintsugi-300">
          Best for
        </p>
        <p className="mt-3 max-w-3xl text-base leading-7 text-white/86">
          {t.best_for.join(", ")}
        </p>
      </div>

      <section className="mt-8 space-y-8">
        {t.sections.map((sec) => (
          <article
            key={sec.day}
            className="rounded-[1.4rem] border border-white/15 bg-[linear-gradient(180deg,rgba(255,253,246,0.99),rgba(247,240,225,0.96))] p-5 shadow-editorial-deep sm:p-7"
          >
            <h2 className="font-sans text-2xl font-semibold leading-tight text-sumi-950 sm:text-3xl">
              {sec.title}
            </h2>
            <ul className="mt-6 space-y-3">
              {sec.blocks.map((b, i) => (
                <BlockLine key={i} citySlug={slug} block={b} />
              ))}
            </ul>
          </article>
        ))}
      </section>

      <section className="mt-10 rounded-[1.2rem] border border-kintsugi-500/35 bg-[linear-gradient(180deg,rgba(35,26,19,0.96),rgba(18,16,12,0.96))] p-6 text-sm leading-7 text-white/82 shadow-editorial-deep">
        <strong className="text-kintsugi-200">Heads-up:</strong> Reservations
        marked &ldquo;book ahead&rdquo; or &ldquo;T-30 days&rdquo; really do sell
        out that early. See{" "}
        <Link
          href={`/city/${slug}/calendar`}
          className="font-semibold text-kintsugi-200 underline decoration-kintsugi-400/60 underline-offset-4 hover:text-white"
        >
          holidays &amp; festivals
        </Link>{" "}
        before you lock in your dates.
      </section>
      </div>
    </main>
  );
}

export function generateStaticParams() {
  const list = getItineraries("tokyo");
  return [
    ...list.map((t) => ({ slug: "tokyo", template: t.slug })),
    ...getAllCityItineraryDayParams(),
  ];
}
