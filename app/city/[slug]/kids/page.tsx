import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getCity, getCityKids } from "@/lib/data/seed";
import { CoverTile } from "@/components/common/CoverTile";

export function generateMetadata(): Metadata {
  return {
    title: "With kids",
    description:
      "Family-friendly Tokyo — Disney, Ghibli, zoo, waterfront parks, rainy-day indoor attractions.",
  };
}

const KID_PALETTES: Array<
  "enji" | "aizome" | "sakura" | "matcha" | "kintsugi" | "ume" | "ocean" | "forest"
> = ["sakura", "aizome", "matcha", "ume", "enji", "kintsugi", "ocean", "forest"];

export default async function KidsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const city = getCity(slug);
  const data = getCityKids(slug);
  if (!city || !data) notFound();

  return (
    <main className="mx-auto max-w-6xl px-6 py-12">
      <nav className="text-xs uppercase tracking-[0.25em] text-sumi-700">
        <Link href="/" className="hover:text-enji-600">
          Home
        </Link>{" "}
        ·{" "}
        <Link href={`/city/${slug}`} className="hover:text-enji-600">
          {city.name}
        </Link>{" "}
        · With kids
      </nav>
      <h1 className="mt-4 font-display text-4xl font-semibold tracking-tight text-sumi-900">
        {city.name} with kids
      </h1>
      <p className="mt-3 max-w-2xl text-sumi-700">{data.summary}</p>

      <section className="mt-8 rounded-2xl border border-washi-200 bg-washi-100/60 p-5">
        <div className="text-xs font-semibold uppercase tracking-[0.25em] text-sumi-700">
          Family travel tips
        </div>
        <ul className="mt-3 space-y-2 text-sm text-sumi-900">
          {data.tips.map((t, i) => (
            <li key={i} className="flex items-start gap-2">
              <span aria-hidden className="text-enji-600">・</span>
              <span>{t}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {data.picks.map((p, i) => (
          <article
            key={p.slug}
            className="flex flex-col overflow-hidden rounded-2xl border border-washi-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:border-enji-400 hover:shadow-lg"
          >
            <CoverTile
              palette={KID_PALETTES[i % KID_PALETTES.length]}
              kanji="幼"
              aspect="3/2"
              badge={p.age_range}
            />
            <div className="flex flex-1 flex-col p-5">
              <div className="text-xs uppercase tracking-wide text-sumi-700">
                {p.neighborhood} · {p.price_band}
              </div>
              <h2 className="mt-1 font-display text-lg font-semibold text-sumi-900">
                {p.name}
              </h2>
              <p className="mt-2 text-sm text-sumi-700">{p.body}</p>
              {p.tip && (
                <p className="mt-3 rounded-lg bg-washi-100 p-3 text-xs text-sumi-900">
                  <strong>Tip:</strong> {p.tip}
                </p>
              )}
              {p.url && (
                <a
                  href={p.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-auto inline-block pt-3 text-sm font-semibold text-enji-600 hover:underline"
                >
                  Website →
                </a>
              )}
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}
