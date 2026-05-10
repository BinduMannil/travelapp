import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  getAttractions,
  getCity,
  getNeighborhood,
  getNeighborhoods,
} from "@/lib/data/seed";
import { PageHero } from "@/components/layout/PageHero";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; neighborhood: string }>;
}): Promise<Metadata> {
  const { slug, neighborhood } = await params;
  const n = getNeighborhood(slug, neighborhood);
  if (!n) return { title: "Neighborhood" };
  return { title: n.name, description: n.summary };
}

export default async function NeighborhoodDetailPage({
  params,
}: {
  params: Promise<{ slug: string; neighborhood: string }>;
}) {
  const { slug, neighborhood } = await params;
  const city = getCity(slug);
  const n = getNeighborhood(slug, neighborhood);
  if (!city || !n) notFound();

  const attractionsHere = getAttractions(slug).filter(
    (a) => a.neighborhood.toLowerCase() === n.name.toLowerCase().split(" &")[0].trim().toLowerCase()
      || a.neighborhood.toLowerCase() === n.name.toLowerCase(),
  );

  return (
    <main className="editorial-page">
      <PageHero
        crumbs={[
          { label: "Home", href: "/" },
          { label: city.name, href: `/city/${slug}` },
          { label: "Neighborhoods", href: `/city/${slug}/neighborhoods` },
          { label: n.name },
        ]}
        kanji="街"
        eyebrow={n.vibe.join(" · ")}
        title={n.name}
        subtitle={n.transit_hubs[0] ?? ""}
        lede={n.summary}
        palette="aizome"
      />
      <div className="mx-auto max-w-5xl px-6 py-16 sm:py-20">
      <section className="rounded-[1.4rem] border border-white/15 bg-[linear-gradient(180deg,rgba(255,253,246,0.99),rgba(247,240,225,0.96))] p-6 shadow-editorial-deep sm:p-8">
        <h2 className="text-xs font-semibold uppercase tracking-[0.32em] text-enji-700">
          The gist
        </h2>
        <p className="mt-4 max-w-3xl text-base leading-8 text-sumi-900 sm:text-lg">
          {n.description}
        </p>
      </section>

      <section className="mt-8 grid gap-5 md:grid-cols-2">
        <article className="rounded-[1.2rem] border border-washi-200/80 bg-washi-50/95 p-5 shadow-editorial sm:p-6">
          <h3 className="text-xs font-semibold uppercase tracking-[0.3em] text-enji-700">
            Best for
          </h3>
          <ul className="mt-4 space-y-3 text-sm leading-6 text-sumi-900">
            {n.best_for.map((b) => (
              <li key={b} className="flex gap-3">
                <span className="mt-2 h-px w-6 shrink-0 bg-kintsugi-500" />
                <span>{b}</span>
              </li>
            ))}
          </ul>
        </article>
        <article className="rounded-[1.2rem] border border-washi-200/80 bg-washi-50/95 p-5 shadow-editorial sm:p-6">
          <h3 className="text-xs font-semibold uppercase tracking-[0.3em] text-enji-700">
            Transit
          </h3>
          <ul className="mt-4 space-y-3 text-sm leading-6 text-sumi-900">
            {n.transit_hubs.map((t) => (
              <li key={t} className="flex gap-3">
                <span className="mt-2 h-px w-6 shrink-0 bg-aizome-500" />
                <span>{t}</span>
              </li>
            ))}
          </ul>
        </article>
      </section>

      {attractionsHere.length > 0 && (
        <section className="mt-12 rounded-[1.4rem] border border-white/12 bg-black/25 p-5 shadow-editorial-deep sm:p-7">
          <h2 className="text-xs font-semibold uppercase tracking-[0.32em] text-kintsugi-300">
            Attractions here
          </h2>
          <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {attractionsHere.map((a) => (
              <Link
                key={a.slug}
                href={`/city/${slug}/attractions/${a.slug}`}
                className="group rounded-[1.1rem] border border-washi-200/80 bg-washi-50/95 p-5 shadow-editorial transition hover:-translate-y-0.5 hover:border-kintsugi-500 hover:bg-white focus:outline-none focus:ring-2 focus:ring-kintsugi-400"
              >
                <div className="font-display text-xl font-semibold leading-tight text-sumi-950 group-hover:text-enji-700">
                  {a.name}
                </div>
                <div className="mt-2 text-sm leading-6 text-sumi-800">
                  {a.summary}
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
      </div>
    </main>
  );
}

export function generateStaticParams() {
  const list = getNeighborhoods("tokyo");
  return list.map((n) => ({ slug: "tokyo", neighborhood: n.slug }));
}
