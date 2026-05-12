import Image from "next/image";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { VietnamCityDetailPage } from "@/components/vietnam/VietnamCityDetailPage";
import { getVietnamCity } from "@/lib/vietnam/frontend";
import { getCity, getCityHiddenGems } from "@/lib/data/seed";
import { PageHero } from "@/components/layout/PageHero";

const GEM_IMAGES: Record<string, string> = {
  music:
    "https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=1600&q=84",
  drinking:
    "https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=1600&q=84",
  street:
    "https://images.unsplash.com/photo-1542051841857-5f90071e7989?auto=format&fit=crop&w=1600&q=84",
  shrine:
    "https://images.unsplash.com/photo-1528360983277-13d401cdc186?auto=format&fit=crop&w=1600&q=84",
  neighborhood:
    "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1600&q=84",
  coffee:
    "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1600&q=84",
  bookshop:
    "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=1600&q=84",
  sport:
    "https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=1600&q=84",
  museum:
    "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1600&q=84",
};

const fallbackGemImage =
  "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=1600&q=84";

export function generateMetadata(): Metadata {
  return {
    title: "Hidden gems",
    description:
      "Vietnam city hidden gems: quiet cafes, alleys, markets, local walks, smaller museums, and second-day ideas.",
  };
}

export default async function HiddenGemsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const vietnamCity = getVietnamCity(slug);
  if (vietnamCity) return <VietnamCityDetailPage city={vietnamCity} kind="hidden-gems" />;
  const city = getCity(slug);
  const data = getCityHiddenGems(slug);
  if (!city || !data) notFound();

  const [lead, ...rest] = data.picks;

  return (
    <main className="editorial-page">
      <PageHero
        crumbs={[
          { label: "Home", href: "/" },
          { label: city.name, href: `/city/${slug}` },
          { label: "Hidden gems" },
        ]}
        kanji="秘"
        eyebrow="Hidden gems"
        title="Hidden gems"
        subtitle="秘 境"
        lede="Tokyo hidden gems for a second trip: jazz kissa, pocket bars, quiet neighborhoods, small shrines, local shops and streets worth slowing down for."
        palette="ume"
      />

      <div className="mx-auto max-w-7xl px-6 py-16 sm:py-20">
        {lead && (
          <section className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
            <article className="relative min-h-[520px] overflow-hidden rounded-[1.6rem] border border-white/18 bg-black shadow-editorial-deep">
              <Image
                src={GEM_IMAGES[lead.category] ?? fallbackGemImage}
                alt=""
                fill
                sizes="(min-width: 1024px) 58vw, 100vw"
                className="absolute inset-0 h-full w-full object-cover opacity-80"
              />
              <span className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.78),rgba(0,0,0,0.28)_58%,rgba(0,0,0,0.66))]" />
              <span className="absolute inset-x-0 bottom-0 h-[68%] bg-[linear-gradient(0deg,rgba(0,0,0,0.96),rgba(0,0,0,0.82)_48%,rgba(0,0,0,0))]" />
              <div className="relative flex min-h-[520px] flex-col justify-end p-6 sm:p-9">
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-kintsugi-100 drop-shadow-[0_2px_10px_rgba(0,0,0,0.85)]">
                  {lead.neighborhood} · {lead.category}
                </p>
                <h2 className="mt-4 max-w-3xl font-sans text-[clamp(3rem,7vw,6.25rem)] font-semibold leading-[0.92] text-white drop-shadow-[0_4px_22px_rgba(0,0,0,0.9)]">
                  {lead.name}
                </h2>
                <p className="mt-5 max-w-2xl text-base leading-8 text-white/92 drop-shadow-[0_2px_10px_rgba(0,0,0,0.75)] sm:text-lg">
                  {lead.why}
                </p>
                {lead.tip && (
                  <p className="mt-7 max-w-xl rounded-2xl border border-white/22 bg-black/48 p-4 text-sm leading-7 text-white/92 shadow-2xl backdrop-blur-md">
                    <span className="font-semibold text-kintsugi-100">Tip:</span>{" "}
                    {lead.tip}
                  </p>
                )}
              </div>
            </article>

            <aside className="rounded-[1.45rem] border border-white/14 bg-[linear-gradient(180deg,rgba(35,29,29,0.92),rgba(12,12,11,0.96))] p-7 shadow-editorial-deep">
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-kintsugi-200">
                Second-trip Tokyo
              </p>
              <h3 className="mt-5 font-sans text-[clamp(2.3rem,4vw,4rem)] font-semibold leading-[0.96] text-white">
                Leave room for Tokyo&apos;s smaller places.
              </h3>
              <p className="mt-5 text-sm leading-7 text-white/72">
                These places work best when you stop treating Tokyo like a list.
                Go later, walk slower, and give one neighborhood enough time to surprise you.
              </p>
              <div className="mt-8 grid gap-3">
                {data.picks.slice(0, 4).map((g) => (
                  <div
                    key={g.slug}
                    className="rounded-2xl border border-white/12 bg-white/[0.06] p-4"
                  >
                    <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-kintsugi-200">
                      {g.neighborhood}
                    </p>
                    <p className="mt-1 font-sans text-xl font-semibold text-white">
                      {g.name}
                    </p>
                  </div>
                ))}
              </div>
            </aside>
          </section>
        )}

        <section className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-12">
          {rest.map((g, index) => {
            const wide = index % 4 === 1;
            return (
              <article
                key={g.slug}
                className={[
                  "relative min-h-[360px] overflow-hidden rounded-[1.35rem] border border-white/16 bg-black shadow-editorial-deep",
                  wide ? "xl:col-span-7" : "xl:col-span-5",
                ].join(" ")}
              >
                <Image
                  src={GEM_IMAGES[g.category] ?? fallbackGemImage}
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
                <div className="relative flex min-h-[360px] flex-col justify-end p-6">
                  <p className="text-xs font-semibold uppercase tracking-[0.12em] text-kintsugi-100 drop-shadow-[0_2px_10px_rgba(0,0,0,0.85)]">
                    {g.neighborhood} · {g.category}
                  </p>
                  <h2 className="mt-3 max-w-2xl font-sans text-[clamp(2.2rem,4.5vw,4rem)] font-semibold leading-[0.96] text-white drop-shadow-[0_4px_18px_rgba(0,0,0,0.9)]">
                    {g.name}
                  </h2>
                  <p className="mt-4 max-w-2xl text-sm leading-7 text-white/90 drop-shadow-[0_2px_10px_rgba(0,0,0,0.7)] sm:text-base">
                    {g.why}
                  </p>
                  {(g.tip || g.when) && (
                    <div className="mt-5 rounded-2xl border border-white/20 bg-black/46 p-4 text-sm leading-6 text-white/90 shadow-2xl backdrop-blur-md">
                      {g.tip && (
                        <p>
                          <span className="font-semibold text-kintsugi-100">
                            Tip:
                          </span>{" "}
                          {g.tip}
                        </p>
                      )}
                      {g.when && <p className="mt-2 italic">{g.when}</p>}
                    </div>
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
