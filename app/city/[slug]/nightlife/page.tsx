import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getCity, getCityNightlife } from "@/lib/data/seed";
import { CoverTile } from "@/components/common/CoverTile";
import { PageHero } from "@/components/layout/PageHero";

const SCENE_PALETTE: Record<
  string,
  "enji" | "aizome" | "sakura" | "matcha" | "kintsugi" | "sumi" | "ume" | "ocean" | "forest"
> = {
  "golden-gai": "enji",
  "ni-chome": "ume",
  "jazz-kissa": "sumi",
  "craft-beer-trail": "kintsugi",
  "whisky-bars": "sumi",
  "izakaya-crawl": "enji",
  clubs: "aizome",
  "rooftop-views": "ocean",
};

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

  return (
    <main>
      <PageHero
        crumbs={[
          { label: "Home", href: "/" },
          { label: city.name, href: `/city/${slug}` },
          { label: "Nightlife" },
        ]}
        kanji="宵"
        eyebrow="Nightlife"
        title={`After dark`}
        subtitle="夜 遊"
        lede={`Layered nights: 18:00 izakaya → 22:00 jazz kissa → 02:00 Golden Gai. First train home is 04:45. Pace yourself.`}
        palette="sumi"
      />
      <div className="mx-auto max-w-5xl px-6 py-12">
<section className="mt-10 space-y-6">
        {data.scenes.map((s) => (
          <article
            key={s.slug}
            className="grid gap-5 overflow-hidden rounded-2xl border border-washi-200 bg-white shadow-sm md:grid-cols-[260px_1fr]"
          >
            <CoverTile
              palette={SCENE_PALETTE[s.slug] ?? "aizome"}
              kanji={s.kanji}
              aspect="3/2"
              className="!rounded-none !aspect-square md:!aspect-auto md:h-full"
            />
            <div className="p-6 md:py-6 md:pr-6">
              <div className="text-xs uppercase tracking-wide text-sumi-700">
                {s.neighborhood} · {s.vibe}
              </div>
              <h2 className="mt-1 font-display text-2xl font-semibold text-sumi-900">
                {s.title}
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-sumi-700">
                {s.body}
              </p>
              {s.tip && (
                <p className="mt-3 rounded-lg bg-washi-100 p-3 text-xs text-sumi-900">
                  <strong>Tip:</strong> {s.tip}
                </p>
              )}
            </div>
          </article>
        ))}
      </section>
    </div>
    </main>
  );
}
