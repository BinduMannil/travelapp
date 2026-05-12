import Image from "next/image";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getPlaceOption } from "@/lib/destinations/countries";
import { VietnamCityDetailPage } from "@/components/vietnam/VietnamCityDetailPage";
import { getVietnamCity } from "@/lib/vietnam/frontend";
import { getCity, getCityKids } from "@/lib/data/seed";
import { PageHero } from "@/components/layout/PageHero";

const KID_IMAGES = [
  "https://images.unsplash.com/photo-1536098561742-ca998e48cbcc?auto=format&fit=crop&w=1600&q=84",
  "https://images.unsplash.com/photo-1528360983277-13d401cdc186?auto=format&fit=crop&w=1600&q=84",
  "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=1600&q=84",
  "https://images.unsplash.com/photo-1542640244-7e672d6cef4e?auto=format&fit=crop&w=1600&q=84",
  "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1600&q=84",
  "https://images.unsplash.com/photo-1513407030348-c983a97b98d8?auto=format&fit=crop&w=1600&q=84",
];

export function generateMetadata(): Metadata {
  return {
    title: "With kids",
    description:
      "Vietnam family travel planning with shade, pools, short transfers, snacks, soft pacing, and kid-friendly anchors.",
  };
}

export default async function KidsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (getPlaceOption(slug)) notFound();
  const vietnamCity = getVietnamCity(slug);
  if (vietnamCity) return <VietnamCityDetailPage city={vietnamCity} kind="kids" />;
  const city = getCity(slug);
  const data = getCityKids(slug);
  if (!city || !data) notFound();

  const [lead, second, ...rest] = data.picks;

  return (
    <main className="editorial-page">
      <PageHero
        crumbs={[
          { label: "Home", href: "/" },
          { label: city.name, href: `/city/${slug}` },
          { label: "With kids" },
        ]}
        kanji="幼"
        eyebrow="With kids"
        title={`${city.name} with kids`}
        subtitle="家 族"
        lede="Family-friendly picks beyond the usual — Disney, Ghibli, parks, rainy-day indoor saviours."
        palette="ume"
      />

      <div className="mx-auto max-w-7xl px-6 py-16 sm:py-20">
        <section className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <aside className="rounded-[1.45rem] border border-white/14 bg-[linear-gradient(180deg,rgba(37,30,25,0.94),rgba(13,12,11,0.96))] p-7 shadow-editorial-deep">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-kintsugi-200">
              Family rhythm
            </p>
            <h2 className="mt-5 font-sans text-[clamp(2.4rem,4.4vw,4.4rem)] font-semibold leading-[0.95] text-white">
              Fewer stops. Better timing. More room to recover.
            </h2>
            <ul className="mt-8 space-y-4 text-sm leading-7 text-white/78">
              {data.tips.map((t, i) => (
                <li key={i} className="flex gap-3">
                  <span className="mt-3 h-px w-8 shrink-0 bg-kintsugi-300" />
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </aside>

          {lead && (
            <article className="relative min-h-[540px] overflow-hidden rounded-[1.6rem] border border-white/18 bg-black shadow-editorial-deep">
              <Image
                src={KID_IMAGES[0]}
                alt=""
                fill
                sizes="(min-width: 1024px) 56vw, 100vw"
                className="absolute inset-0 h-full w-full object-cover opacity-82"
              />
              <span className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.04),rgba(0,0,0,0.36)_40%,rgba(0,0,0,0.94))]" />
              <span className="absolute inset-x-0 bottom-0 h-[70%] bg-[linear-gradient(0deg,rgba(0,0,0,0.95),rgba(0,0,0,0.72)_52%,rgba(0,0,0,0))]" />
              <div className="relative flex min-h-[540px] flex-col justify-end p-6 sm:p-9">
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-kintsugi-100 drop-shadow-[0_2px_10px_rgba(0,0,0,0.85)]">
                  {lead.neighborhood} · {lead.age_range}
                </p>
                <h2 className="mt-4 max-w-3xl font-sans text-[clamp(3rem,7vw,6.4rem)] font-semibold leading-[0.9] text-white drop-shadow-[0_4px_22px_rgba(0,0,0,0.9)]">
                  {lead.name}
                </h2>
                <p className="mt-5 max-w-2xl text-base leading-8 text-white/92 drop-shadow-[0_2px_10px_rgba(0,0,0,0.75)] sm:text-lg">
                  {lead.body}
                </p>
                {lead.url && (
                  <a
                    href={lead.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-7 inline-flex w-fit rounded-full border border-white/30 bg-white px-5 py-2.5 text-sm font-semibold text-sumi-950 transition hover:bg-kintsugi-200 focus:outline-none focus:ring-2 focus:ring-kintsugi-300"
                  >
                    Website →
                  </a>
                )}
              </div>
            </article>
          )}
        </section>

        {second && (
          <section className="mt-8 grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
            <article className="relative min-h-[380px] overflow-hidden rounded-[1.35rem] border border-white/16 bg-black shadow-editorial-deep">
              <Image
                src={KID_IMAGES[1]}
                alt=""
                fill
                sizes="(min-width: 1024px) 52vw, 100vw"
                className="absolute inset-0 h-full w-full object-cover opacity-76"
              />
              <span className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.76),rgba(0,0,0,0.18)_62%,rgba(0,0,0,0.66))]" />
              <span className="absolute inset-x-0 bottom-0 h-[72%] bg-[linear-gradient(0deg,rgba(0,0,0,0.94),rgba(0,0,0,0.72)_52%,rgba(0,0,0,0))]" />
              <div className="relative flex min-h-[380px] flex-col justify-end p-6 sm:p-8">
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-kintsugi-100 drop-shadow-[0_2px_10px_rgba(0,0,0,0.85)]">
                  {second.neighborhood} · {second.price_band}
                </p>
                <h2 className="mt-3 font-sans text-[clamp(2.5rem,5vw,4.7rem)] font-semibold leading-[0.94] text-white drop-shadow-[0_4px_18px_rgba(0,0,0,0.9)]">
                  {second.name}
                </h2>
                <p className="mt-4 max-w-2xl text-sm leading-7 text-white/90 drop-shadow-[0_2px_10px_rgba(0,0,0,0.7)] sm:text-base">
                  {second.body}
                </p>
              </div>
            </article>

            <div className="rounded-[1.35rem] border border-white/12 bg-white/[0.065] p-6 shadow-editorial-deep backdrop-blur">
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-kintsugi-200">
                Useful note
              </p>
              <p className="mt-4 text-lg leading-8 text-white/84">
                {second.tip ??
                  "Build the day around one big anchor, then keep the next stop flexible."}
              </p>
            </div>
          </section>
        )}

        <section className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {rest.map((p, i) => (
            <article
              key={p.slug}
              className="relative min-h-[420px] overflow-hidden rounded-[1.35rem] border border-white/16 bg-black shadow-editorial-deep"
            >
              <Image
                src={KID_IMAGES[(i + 2) % KID_IMAGES.length]}
                alt=""
                fill
                sizes="(min-width: 1280px) 33vw, (min-width: 768px) 50vw, 100vw"
                className="absolute inset-0 h-full w-full object-cover opacity-72"
              />
              <span className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.04),rgba(0,0,0,0.4)_38%,rgba(0,0,0,0.96))]" />
              <span className="absolute inset-x-0 bottom-0 h-[76%] bg-[linear-gradient(0deg,rgba(0,0,0,0.95),rgba(0,0,0,0.74)_52%,rgba(0,0,0,0))]" />
              <div className="relative flex min-h-[420px] flex-col justify-end p-6">
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-kintsugi-100 drop-shadow-[0_2px_10px_rgba(0,0,0,0.85)]">
                  {p.neighborhood} · {p.age_range}
                </p>
                <h2 className="mt-3 font-sans text-4xl font-semibold leading-none text-white drop-shadow-[0_4px_18px_rgba(0,0,0,0.9)]">
                  {p.name}
                </h2>
                <p className="mt-4 text-sm leading-7 text-white/90 drop-shadow-[0_2px_10px_rgba(0,0,0,0.7)]">{p.body}</p>
                {p.tip && (
                  <p className="mt-5 rounded-2xl border border-white/20 bg-black/46 p-4 text-sm leading-6 text-white/90 shadow-2xl backdrop-blur-md">
                    <span className="font-semibold text-kintsugi-100">Tip:</span>{" "}
                    {p.tip}
                  </p>
                )}
                {p.url && (
                  <a
                    href={p.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-5 inline-flex w-fit text-sm font-semibold text-kintsugi-200 underline decoration-kintsugi-400/60 underline-offset-4 hover:text-white"
                  >
                    Website →
                  </a>
                )}
              </div>
            </article>
          ))}
        </section>
      </div>
    </main>
  );
}
