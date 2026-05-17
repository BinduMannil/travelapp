import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ArrowRight, Bookmark, MapPin } from "lucide-react";
import { PageHero } from "@/components/layout/PageHero";
import type { CityItineraryDay } from "@/lib/city/itinerary-day-data";
import {
  getUniqueDestinationImage,
  inferImageCategoryFromText,
  resetUsedImagesForPage,
} from "@/lib/imageRotation";
import { routes } from "@/lib/routes";

export function CityItineraryDayDetail({ itinerary }: { itinerary: CityItineraryDay }) {
  const articleImage = getUniqueDestinationImage({
    destinationSlug: itinerary.city.slug,
    category: inferImageCategoryFromText(`${itinerary.dayLabel} ${itinerary.title} ${itinerary.stops.join(" ")}`),
    preferredImage: itinerary.image,
    usedImages: resetUsedImagesForPage(),
  });

  return (
    <main className="editorial-page">
      <PageHero
        crumbs={[
          { label: "Home", href: routes.home },
          { label: itinerary.city.city, href: routes.city(itinerary.city.slug) },
          { label: "Itinerary", href: routes.citySection(itinerary.city.slug, "itinerary") },
          { label: itinerary.dayLabel },
        ]}
        kanji="旅"
        eyebrow={`${itinerary.city.city} · ${itinerary.dayLabel}`}
        title={itinerary.title}
        subtitle="3-day route"
        lede={itinerary.overview}
        palette="matcha"
      />

      <div className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
        <div className="mb-6 flex flex-wrap gap-3">
          <Link
            href={routes.city(itinerary.city.slug)}
            className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-white/14 bg-black/24 px-4 text-sm font-bold text-white/78 transition hover:border-kintsugi-300/60 hover:text-kintsugi-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-kintsugi-300"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to {itinerary.city.city}
          </Link>
          <Link
            href={itinerary.mapHref}
            className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-kintsugi-400/55 bg-kintsugi-300/10 px-4 text-sm font-bold text-kintsugi-200 transition hover:bg-kintsugi-300 hover:text-sumi-950 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-kintsugi-300"
          >
            <MapPin className="h-4 w-4" />
            Open in Atlas
          </Link>
          <button
            type="button"
            className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-white/14 bg-black/24 px-4 text-sm font-bold text-white/78 transition hover:border-kintsugi-300/60 hover:text-kintsugi-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-kintsugi-300"
          >
            <Bookmark className="h-4 w-4" />
            Save to Trip
          </button>
        </div>

        <section className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <article className="relative min-h-[420px] overflow-hidden rounded-[1.4rem] border border-white/15 bg-black shadow-editorial-deep">
            <Image
              src={articleImage}
              alt=""
              fill
              sizes="(min-width: 1024px) 45vw, 100vw"
              className="object-cover opacity-78"
            />
            <span className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,.82),rgba(0,0,0,.32)_58%,rgba(0,0,0,.68)),linear-gradient(0deg,rgba(0,0,0,.84),transparent_54%)]" />
            <div className="relative flex min-h-[420px] flex-col justify-end p-6 sm:p-8">
              <p className="text-xs font-bold uppercase tracking-[0.12em] text-kintsugi-200">
                {itinerary.dayLabel}
              </p>
              <h2 className="mt-3 max-w-xl font-sans text-[clamp(2.4rem,5vw,5rem)] font-semibold leading-none text-white">
                {itinerary.title}
              </h2>
              <p className="mt-5 max-w-2xl text-sm leading-7 text-white/78">
                {itinerary.overview}
              </p>
            </div>
          </article>

          <article className="rounded-[1.4rem] border border-white/15 bg-[linear-gradient(180deg,rgba(255,253,246,0.99),rgba(247,240,225,0.96))] p-5 shadow-editorial-deep sm:p-7">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-enji-700">
              Time-based flow
            </p>
            <ul className="mt-5 space-y-3">
              {itinerary.flow.map((block) => (
                <li key={`${block.time}-${block.title}`} className="flex items-start gap-4 rounded-2xl p-2">
                  <div className="w-14 shrink-0 pt-2 text-right font-sans text-sm font-semibold tabular-nums text-enji-700">
                    {block.time}
                  </div>
                  <div className="flex flex-1 items-start gap-4 p-2">
                    <div className="relative grid h-14 w-14 shrink-0 place-items-center overflow-hidden rounded-xl bg-gradient-to-br from-matcha-500 via-matcha-700 to-aizome-900 shadow-sm sm:h-16 sm:w-16">
                      <span className="font-sans text-2xl font-bold text-white/90 drop-shadow sm:text-3xl">
                        旅
                      </span>
                      <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-white/15" />
                    </div>
                    <div className="flex-1 pt-1">
                      <div className="font-sans text-lg font-semibold leading-tight text-sumi-950">
                        {block.title}
                      </div>
                      <p className="mt-1.5 text-sm leading-6 text-sumi-800">{block.note}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </article>
        </section>

        <section className="mt-8 grid gap-5 lg:grid-cols-3">
          <DetailPanel title="Stops" items={itinerary.stops} />
          <DetailPanel title="Food Suggestions" items={itinerary.foodSuggestions} />
          <DetailPanel title="Local Notes" items={itinerary.localNotes} />
        </section>

        <section className="mt-8 rounded-[1.2rem] border border-kintsugi-500/35 bg-[linear-gradient(180deg,rgba(35,26,19,0.96),rgba(18,16,12,0.96))] p-6 text-sm leading-7 text-white/82 shadow-editorial-deep">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <strong className="text-kintsugi-200">Related day navigation</strong>
              <p className="mt-1 text-white/68">Move through the 3-day route without returning to the city page.</p>
            </div>
            <div className="flex flex-wrap gap-3">
              {itinerary.relatedDays.map((day) => (
                <Link
                  key={day.href}
                  href={day.href}
                  className="inline-flex items-center gap-2 rounded-xl border border-white/14 bg-white/[0.05] px-4 py-2 text-sm font-bold text-white/76 transition hover:border-kintsugi-300/60 hover:text-kintsugi-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-kintsugi-300"
                >
                  {day.label}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              ))}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

function DetailPanel({ title, items }: { title: string; items: string[] }) {
  return (
    <article className="rounded-[1.2rem] border border-white/12 bg-black/25 p-5 shadow-editorial-deep">
      <p className="text-xs font-semibold uppercase tracking-[0.12em] text-kintsugi-300">
        {title}
      </p>
      <ul className="mt-4 space-y-3 text-sm leading-6 text-white/76">
        {items.map((item) => (
          <li key={item} className="flex gap-2">
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-kintsugi-300" />
            {item}
          </li>
        ))}
      </ul>
    </article>
  );
}
