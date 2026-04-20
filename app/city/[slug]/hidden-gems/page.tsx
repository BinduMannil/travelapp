import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getCity, getCityHiddenGems } from "@/lib/data/seed";
import { CoverTile } from "@/components/common/CoverTile";
import { PageHero } from "@/components/layout/PageHero";

const CATEGORY_PALETTE: Record<
  string,
  "enji" | "aizome" | "sakura" | "matcha" | "kintsugi" | "sumi" | "ume" | "ocean" | "forest"
> = {
  music: "aizome",
  drinking: "sumi",
  street: "enji",
  shrine: "matcha",
  neighborhood: "sakura",
  coffee: "kintsugi",
  bookshop: "ocean",
  sport: "ume",
  museum: "forest",
};

const CATEGORY_KANJI: Record<string, string> = {
  music: "奏",
  drinking: "酒",
  street: "巷",
  shrine: "社",
  neighborhood: "街",
  coffee: "珈",
  bookshop: "書",
  sport: "技",
  museum: "館",
};

export function generateMetadata(): Metadata {
  return {
    title: "Hidden gems",
    description:
      "The alleys, bars, shrines, and shops locals drag you to on your second trip.",
  };
}

export default async function HiddenGemsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const city = getCity(slug);
  const data = getCityHiddenGems(slug);
  if (!city || !data) notFound();

  return (
    <main>
      <PageHero
        crumbs={[
          { label: "Home", href: "/" },
          { label: city.name, href: `/city/${slug}` },
          { label: "Hidden gems" },
        ]}
        kanji="秘"
        eyebrow="Hidden gems"
        title={`Hidden gems`}
        subtitle="秘 境"
        lede={`The alleys, bars, shrines, and shops locals drag you to on your second trip.`}
        palette="ume"
      />
      <div className="mx-auto max-w-6xl px-6 py-12">
<section className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {data.picks.map((g) => {
          const palette = CATEGORY_PALETTE[g.category] ?? "aizome";
          const kanji = CATEGORY_KANJI[g.category] ?? "秘";
          return (
            <article
              key={g.slug}
              className="overflow-hidden rounded-2xl border border-washi-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:border-enji-400 hover:shadow-lg"
            >
              <CoverTile
                palette={palette}
                kanji={kanji}
                aspect="3/2"
                badge={g.neighborhood}
              />
              <div className="p-5">
                <div className="text-xs uppercase tracking-[0.25em] text-sumi-700">
                  {g.category}
                </div>
                <h2 className="mt-1 font-display text-lg font-semibold text-sumi-900">
                  {g.name}
                </h2>
                <p className="mt-2 text-sm text-sumi-700">{g.why}</p>
                {g.tip && (
                  <p className="mt-3 rounded-lg bg-washi-100 p-3 text-xs text-sumi-900">
                    <strong>Tip:</strong> {g.tip}
                  </p>
                )}
                {g.when && (
                  <p className="mt-2 text-xs italic text-sumi-700">{g.when}</p>
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
