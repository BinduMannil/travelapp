import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getPlaceOption } from "@/lib/destinations/countries";
import { VietnamCityDetailPage } from "@/components/vietnam/VietnamCityDetailPage";
import { getVietnamCity } from "@/lib/vietnam/frontend";
import { getCity, getNeighborhoods } from "@/lib/data/seed";
import { PageHero } from "@/components/layout/PageHero";

export function generateMetadata(): Metadata {
  return {
    title: "Neighborhoods",
    description:
      "Vietnam city neighborhoods guide: where to stay, eat, work, walk, go out, and keep transfers simple.",
  };
}

const NEIGHBORHOOD_IMAGES: Record<string, string> = {
  shibuya:
    "https://images.unsplash.com/photo-1542051841857-5f90071e7989?auto=format&fit=crop&w=1800&q=84",
  shinjuku:
    "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=1800&q=84",
  ginza:
    "https://images.unsplash.com/photo-1526481280693-3bfa7568e0f3?auto=format&fit=crop&w=1800&q=84",
  asakusa:
    "https://images.unsplash.com/photo-1528360983277-13d401cdc186?auto=format&fit=crop&w=1800&q=84",
  harajuku:
    "https://images.unsplash.com/photo-1513407030348-c983a97b98d8?auto=format&fit=crop&w=1800&q=84",
  akihabara:
    "https://images.unsplash.com/photo-1519638399535-1b036603ac77?auto=format&fit=crop&w=1800&q=84",
  roppongi:
    "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=1800&q=84",
  daikanyama:
    "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1800&q=84",
  shimokitazawa:
    "https://images.unsplash.com/photo-1528164344705-47542687000d?auto=format&fit=crop&w=1800&q=84",
  yanaka:
    "https://images.unsplash.com/photo-1542640244-7e672d6cef4e?auto=format&fit=crop&w=1800&q=84",
  "tsukiji-toyosu":
    "https://images.unsplash.com/photo-1553621042-f6e147245754?auto=format&fit=crop&w=1800&q=84",
  odaiba:
    "https://images.unsplash.com/photo-1536098561742-ca998e48cbcc?auto=format&fit=crop&w=1800&q=84",
};

const fallbackNeighborhoodImage =
  "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=1800&q=84";

export default async function NeighborhoodsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const vietnamCity = getVietnamCity(slug);
  if (vietnamCity) return <VietnamCityDetailPage city={vietnamCity} kind="neighborhoods" />;
  if (getPlaceOption(slug)) notFound();
  const city = getCity(slug);
  if (!city) notFound();

  const neighborhoods = getNeighborhoods(slug);
  const [lead, second, third, ...rest] = neighborhoods;

  return (
    <main className="editorial-page">
      <PageHero
        crumbs={[
          { label: "Home", href: "/" },
          { label: city.name, href: `/city/${slug}` },
          { label: "Neighborhoods" },
        ]}
        kanji="街"
        eyebrow="Neighborhoods"
        title={`Neighborhoods`}
        subtitle="地 区"
        lede={`Pick the area that matches your trip. The right Tokyo base can change your days more than any single attraction.`}
        palette="aizome"
      />
      <div className="mx-auto max-w-7xl px-6 py-16 sm:py-20">
        {lead && (
          <section className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
            <Link
              href={`/city/${slug}/neighborhoods/${lead.slug}`}
              className="group relative min-h-[520px] overflow-hidden rounded-[1.65rem] border border-white/20 bg-black shadow-editorial-deep focus:outline-none focus:ring-2 focus:ring-kintsugi-300"
            >
              <Image
                src={NEIGHBORHOOD_IMAGES[lead.slug] ?? fallbackNeighborhoodImage}
                alt=""
                fill
                sizes="(min-width: 1280px) 58vw, 100vw"
                className="absolute inset-0 h-full w-full object-cover opacity-82 transition duration-700 group-hover:scale-[1.04]"
              />
              <span className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.78),rgba(0,0,0,0.26)_58%,rgba(0,0,0,0.68))]" />
              <div className="relative flex h-full min-h-[520px] max-w-2xl flex-col justify-end p-6 sm:p-9">
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-kintsugi-200">
                  First base
                </p>
                <h2 className="mt-4 font-sans text-[clamp(3.2rem,8vw,6.8rem)] font-semibold leading-[0.9] text-white">
                  {lead.name}
                </h2>
                <p className="mt-5 max-w-xl text-base leading-7 text-white/88 sm:text-lg">
                  {lead.summary}
                </p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {lead.vibe.slice(0, 4).map((v) => (
                    <span
                      key={v}
                      className="rounded-full border border-white/35 bg-white/12 px-3 py-1 text-xs font-semibold text-white backdrop-blur"
                    >
                      {v}
                    </span>
                  ))}
                </div>
              </div>
            </Link>

            <aside className="grid gap-6">
              <div className="rounded-[1.45rem] border border-white/15 bg-[linear-gradient(180deg,rgba(35,31,26,0.92),rgba(13,13,12,0.94))] p-7 shadow-editorial-deep">
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-kintsugi-200">
                  Choose by rhythm
                </p>
                <h3 className="mt-5 font-sans text-[clamp(2.4rem,4vw,4.2rem)] font-semibold leading-[0.95] text-white">
                  The right district changes the whole trip.
                </h3>
                <p className="mt-5 text-sm leading-7 text-white/72">
                  Use neighborhoods like a mood map: late-night neon, old-town mornings,
                  polished dining, family waterfronts, or quiet lanes after the crowds.
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-1">
                {[second, third].filter(Boolean).map((n) => (
                  <Link
                    key={n!.slug}
                    href={`/city/${slug}/neighborhoods/${n!.slug}`}
                    className="group relative min-h-56 overflow-hidden rounded-[1.25rem] border border-white/18 bg-black shadow-editorial focus:outline-none focus:ring-2 focus:ring-kintsugi-300"
                  >
                    <Image
                      src={NEIGHBORHOOD_IMAGES[n!.slug] ?? fallbackNeighborhoodImage}
                      alt=""
                      fill
                      sizes="(min-width: 1280px) 34vw, (min-width: 640px) 50vw, 100vw"
                      className="absolute inset-0 h-full w-full object-cover opacity-75 transition duration-700 group-hover:scale-[1.05]"
                    />
                    <span className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.16),rgba(0,0,0,0.82))]" />
                    <div className="relative flex min-h-56 flex-col justify-end p-5">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-kintsugi-200">
                        {n!.vibe[0]}
                      </p>
                      <h3 className="mt-2 font-sans text-3xl font-semibold leading-none text-white">
                        {n!.name}
                      </h3>
                      <p className="mt-2 line-clamp-2 text-sm leading-6 text-white/78">
                        {n!.summary}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </aside>
          </section>
        )}

        <section className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-12">
          {rest.map((n, index) => {
            const wide = index % 5 === 0 || index % 5 === 3;
            return (
              <Link
                key={n.slug}
                href={`/city/${slug}/neighborhoods/${n.slug}`}
                className={[
                  "group relative min-h-[360px] overflow-hidden rounded-[1.35rem] border border-white/18 bg-black shadow-editorial-deep transition hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-kintsugi-300",
                  wide ? "xl:col-span-7" : "xl:col-span-5",
                ].join(" ")}
              >
                <Image
                  src={NEIGHBORHOOD_IMAGES[n.slug] ?? fallbackNeighborhoodImage}
                  alt=""
                  fill
                  sizes={wide ? "(min-width: 1280px) 58vw, (min-width: 768px) 50vw, 100vw" : "(min-width: 1280px) 42vw, (min-width: 768px) 50vw, 100vw"}
                  className="absolute inset-0 h-full w-full object-cover opacity-78 transition duration-700 group-hover:scale-[1.05]"
                />
                <span className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.08),rgba(0,0,0,0.42)_42%,rgba(0,0,0,0.9))]" />
                <div className="relative flex h-full min-h-[360px] flex-col justify-end p-6">
                  <div className="mb-auto flex flex-wrap gap-2">
                    {n.vibe.slice(0, 2).map((v) => (
                      <span
                        key={v}
                        className="rounded-full border border-white/35 bg-black/28 px-3 py-1 text-xs font-semibold text-white backdrop-blur"
                      >
                        {v}
                      </span>
                    ))}
                  </div>
                  <h2 className="max-w-xl font-sans text-[clamp(2.45rem,5vw,4.6rem)] font-semibold leading-[0.95] text-white">
                    {n.name}
                  </h2>
                  <p className="mt-4 max-w-2xl text-sm leading-7 text-white/82 sm:text-base">
                    {n.summary}
                  </p>
                  {n.best_for.length > 0 && (
                    <p className="mt-5 border-t border-white/16 pt-4 text-xs font-medium leading-6 text-white/70">
                      <span className="text-kintsugi-200">Best for:</span>{" "}
                      {n.best_for.join(", ")}
                    </p>
                  )}
                </div>
              </Link>
            );
          })}
        </section>
    </div>
    </main>
  );
}
