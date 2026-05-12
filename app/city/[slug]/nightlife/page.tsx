import Image from "next/image";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getCity, getCityNightlife } from "@/lib/data/seed";
import { PageHero } from "@/components/layout/PageHero";

const NIGHT_IMAGES: Record<string, string> = {
  "golden-gai":
    "https://images.unsplash.com/photo-1519608487953-e999c86e7455?auto=format&fit=crop&w=1800&q=84",
  "ni-chome":
    "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=1800&q=84",
  "jazz-kissa":
    "https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=1800&q=84",
  "craft-beer-trail":
    "https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=1800&q=84",
  "whisky-bars":
    "https://images.unsplash.com/photo-1470337458703-46ad1756a187?auto=format&fit=crop&w=1800&q=84",
  "izakaya-crawl":
    "https://images.unsplash.com/photo-1553621042-f6e147245754?auto=format&fit=crop&w=1800&q=84",
  clubs:
    "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1800&q=84",
  "rooftop-views":
    "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=1800&q=84",
};

const fallbackNightImage =
  "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=1800&q=84";

export function generateMetadata(): Metadata {
  return {
    title: "Nightlife",
    description:
      "Tokyo's nightlife layered: 18:00 izakaya → 22:00 jazz kissa → 02:00 Golden Gai. What to drink, where, and when.",
  };
}

export default async function NightlifePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const city = getCity(slug);
  const data = getCityNightlife(slug);
  if (!city || !data) notFound();

  const [lead, ...rest] = data.scenes;

  return (
    <main className="editorial-page">
      <PageHero
        crumbs={[
          { label: "Home", href: "/" },
          { label: city.name, href: `/city/${slug}` },
          { label: "Nightlife" },
        ]}
        kanji="宵"
        eyebrow="Nightlife"
        title="After dark"
        subtitle="夜 遊"
        lede="Layered nights: 18:00 izakaya → 22:00 jazz kissa → 02:00 Golden Gai. First train home is 04:45. Pace yourself."
        palette="sumi"
      />

      <div className="mx-auto max-w-7xl px-6 py-16 sm:py-20">
        {lead && (
          <section className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
            <article className="relative min-h-[540px] overflow-hidden rounded-[1.6rem] border border-white/18 bg-black shadow-editorial-deep">
              <Image
                src={NIGHT_IMAGES[lead.slug] ?? fallbackNightImage}
                alt=""
                fill
                sizes="(min-width: 1024px) 58vw, 100vw"
                className="absolute inset-0 h-full w-full object-cover opacity-82"
              />
              <span className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.78),rgba(0,0,0,0.24)_58%,rgba(0,0,0,0.68))]" />
              <span className="absolute inset-x-0 bottom-0 h-[68%] bg-[linear-gradient(0deg,rgba(0,0,0,0.96),rgba(0,0,0,0.8)_48%,rgba(0,0,0,0))]" />
              <div className="relative flex min-h-[540px] flex-col justify-end p-6 sm:p-9">
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-kintsugi-100 drop-shadow-[0_2px_10px_rgba(0,0,0,0.85)]">
                  {lead.neighborhood} · {lead.vibe}
                </p>
                <h2 className="mt-4 max-w-3xl font-sans text-[clamp(3rem,7vw,6.4rem)] font-semibold leading-[0.9] text-white drop-shadow-[0_4px_22px_rgba(0,0,0,0.9)]">
                  {lead.title}
                </h2>
                <p className="mt-5 max-w-2xl text-base leading-8 text-white/92 drop-shadow-[0_2px_10px_rgba(0,0,0,0.75)] sm:text-lg">
                  {lead.body}
                </p>
              </div>
            </article>

            <aside className="rounded-[1.45rem] border border-white/14 bg-[linear-gradient(180deg,rgba(29,28,34,0.94),rgba(10,10,11,0.97))] p-7 shadow-editorial-deep">
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-kintsugi-200">
                Night pacing
              </p>
              <h3 className="mt-5 font-sans text-[clamp(2.5rem,4.4vw,4.4rem)] font-semibold leading-[0.95] text-white">
                Choose one mood. Let the city do the rest.
              </h3>
              <p className="mt-5 text-sm leading-7 text-white/72">
                Tokyo nights are strongest when they move in layers: food first,
                one intimate room, then one late scene. The goal is memory, not
                a frantic crawl.
              </p>
              {lead.tip && (
                <p className="mt-8 rounded-2xl border border-white/12 bg-white/[0.07] p-4 text-sm leading-7 text-white/78">
                  <span className="font-semibold text-kintsugi-200">Tip:</span>{" "}
                  {lead.tip}
                </p>
              )}
            </aside>
          </section>
        )}

        <section className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-12">
          {rest.map((s, index) => {
            const vibes = s.vibe
              .split(",")
              .map((v) => v.trim())
              .filter(Boolean);
            const wide = index % 4 === 0;
            return (
              <article
                key={s.slug}
                className={[
                  "relative min-h-[390px] overflow-hidden rounded-[1.35rem] border border-white/16 bg-black shadow-editorial-deep",
                  wide ? "xl:col-span-7" : "xl:col-span-5",
                ].join(" ")}
              >
                <Image
                  src={NIGHT_IMAGES[s.slug] ?? fallbackNightImage}
                  alt=""
                  fill
                  sizes={
                    wide
                      ? "(min-width: 1280px) 58vw, (min-width: 768px) 50vw, 100vw"
                      : "(min-width: 1280px) 42vw, (min-width: 768px) 50vw, 100vw"
                  }
                  className="absolute inset-0 h-full w-full object-cover opacity-74"
                />
                <span className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.03),rgba(0,0,0,0.42)_36%,rgba(0,0,0,0.96))]" />
                <span className="absolute inset-x-0 bottom-0 h-[76%] bg-[linear-gradient(0deg,rgba(0,0,0,0.95),rgba(0,0,0,0.74)_52%,rgba(0,0,0,0))]" />
                <div className="relative flex min-h-[390px] flex-col justify-end p-6">
                  <p className="text-xs font-semibold uppercase tracking-[0.12em] text-kintsugi-100 drop-shadow-[0_2px_10px_rgba(0,0,0,0.85)]">
                    {s.neighborhood}
                  </p>
                  <h2 className="mt-3 font-sans text-[clamp(2.2rem,4.5vw,4.2rem)] font-semibold leading-[0.95] text-white drop-shadow-[0_4px_18px_rgba(0,0,0,0.9)]">
                    {s.title}
                  </h2>
                  {vibes.length > 0 && (
                    <div className="mt-4 flex flex-wrap gap-2">
                      {vibes.map((v) => (
                        <span
                          key={v}
                          className="rounded-full border border-white/30 bg-white/10 px-3 py-1 text-xs font-semibold text-white backdrop-blur"
                        >
                          {v}
                        </span>
                      ))}
                    </div>
                  )}
                  <p className="mt-4 text-sm leading-7 text-white/90 drop-shadow-[0_2px_10px_rgba(0,0,0,0.7)] sm:text-base">
                    {s.body}
                  </p>
                  {s.tip && (
                    <p className="mt-5 rounded-2xl border border-white/20 bg-black/46 p-4 text-sm leading-6 text-white/90 shadow-2xl backdrop-blur-md">
                      <span className="font-semibold text-kintsugi-100">Tip:</span>{" "}
                      {s.tip}
                    </p>
                  )}
                </div>
              </article>
            );
          })}
        </section>
      </div>
    </main>
  );
}
