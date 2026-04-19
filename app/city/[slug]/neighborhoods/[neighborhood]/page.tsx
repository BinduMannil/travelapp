import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  getAttractions,
  getCity,
  getNeighborhood,
  getNeighborhoods,
} from "@/lib/data/seed";

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
    <main className="mx-auto max-w-4xl px-6 py-12">
      <nav className="text-sm text-slate-500">
        <Link href="/" className="hover:underline">
          Home
        </Link>{" "}
        ·{" "}
        <Link href={`/city/${slug}`} className="hover:underline">
          {city.name}
        </Link>{" "}
        ·{" "}
        <Link href={`/city/${slug}/neighborhoods`} className="hover:underline">
          Neighborhoods
        </Link>{" "}
        · {n.name}
      </nav>
      <h1 className="mt-2 text-3xl font-semibold">{n.name}</h1>
      <div className="mt-2 flex flex-wrap gap-1 text-xs">
        {n.vibe.map((v) => (
          <span
            key={v}
            className="rounded bg-slate-100 px-2 py-0.5 text-slate-700"
          >
            {v}
          </span>
        ))}
      </div>

      <p className="mt-4 text-lg text-slate-700">{n.summary}</p>

      <section className="mt-6 rounded-lg border border-slate-200 p-5">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
          The gist
        </h2>
        <p className="mt-2 text-slate-800">{n.description}</p>
      </section>

      <section className="mt-6 grid gap-4 sm:grid-cols-2">
        <article className="rounded-lg border border-slate-200 p-4">
          <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
            Best for
          </h3>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-700">
            {n.best_for.map((b) => (
              <li key={b}>{b}</li>
            ))}
          </ul>
        </article>
        <article className="rounded-lg border border-slate-200 p-4">
          <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
            Transit
          </h3>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-700">
            {n.transit_hubs.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
        </article>
      </section>

      {attractionsHere.length > 0 && (
        <section className="mt-8">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
            Attractions here
          </h2>
          <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {attractionsHere.map((a) => (
              <Link
                key={a.slug}
                href={`/city/${slug}/attractions/${a.slug}`}
                className="rounded-lg border border-slate-200 p-3 hover:border-brand-500 hover:bg-brand-50"
              >
                <div className="font-medium">{a.name}</div>
                <div className="text-xs text-slate-500">{a.summary}</div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}

export function generateStaticParams() {
  const list = getNeighborhoods("tokyo");
  return list.map((n) => ({ slug: "tokyo", neighborhood: n.slug }));
}
