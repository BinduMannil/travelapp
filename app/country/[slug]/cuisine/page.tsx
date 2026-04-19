import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getCountry, getCountryCuisine } from "@/lib/data/seed";

export function generateMetadata(): Metadata {
  return {
    title: "Must-try local cuisine",
    description:
      "The dishes you should actively seek out — what they're made of, where they were born, and what they resemble globally.",
  };
}

export default async function CuisinePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const country = getCountry(slug);
  const data = getCountryCuisine(slug);
  if (!country || !data) notFound();

  return (
    <main className="mx-auto max-w-4xl px-6 py-12">
      <nav className="text-sm text-slate-500">
        <Link href="/" className="hover:underline">
          Home
        </Link>{" "}
        ·{" "}
        <Link href={`/country/${slug}`} className="hover:underline">
          {country.name}
        </Link>{" "}
        · Must-try cuisine
      </nav>
      <h1 className="mt-2 text-3xl font-semibold">
        Must-try dishes in {country.name}
      </h1>
      <p className="mt-3 text-slate-600">{data.summary}</p>

      <section className="mt-8 space-y-5">
        {data.dishes.map((d) => (
          <article
            key={d.slug}
            className="rounded-lg border border-slate-200 p-5"
            id={d.slug}
          >
            <header className="flex flex-wrap items-baseline justify-between gap-3">
              <div>
                <h2 className="text-xl font-semibold">
                  {d.name}
                  <span className="ml-2 text-slate-500">{d.native_script}</span>
                </h2>
                <div className="text-xs text-slate-500">
                  <em>{d.romaji}</em>
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-2 text-xs">
                {d.originated_here && (
                  <span className="rounded-full bg-amber-100 px-2.5 py-0.5 text-amber-900">
                    Originated in {country.name}
                  </span>
                )}
                {d.vegan_version && (
                  <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-emerald-900">
                    Vegan possible
                  </span>
                )}
              </div>
            </header>

            <p className="mt-3 text-sm leading-relaxed text-slate-800">
              <strong>Made of:</strong> {d.made_of}
            </p>
            <p className="mt-2 text-sm leading-relaxed text-slate-700">
              <strong>Origin:</strong> {d.origin}
            </p>

            {d.similar_to.length > 0 && (
              <p className="mt-2 text-sm leading-relaxed text-slate-700">
                <strong>Similar to:</strong> {d.similar_to.join(" · ")}
              </p>
            )}

            <p className="mt-2 text-sm leading-relaxed text-slate-700">
              <strong>How to try it:</strong> {d.must_try_form}
            </p>

            {d.vegan_version && d.vegan_notes && (
              <p className="mt-2 text-xs text-emerald-800">
                <strong>Vegan/vegetarian:</strong> {d.vegan_notes}
              </p>
            )}

            {d.where_in_tokyo && d.where_in_tokyo.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-2 text-xs">
                <span className="text-slate-500">Try in Tokyo:</span>
                {d.where_in_tokyo.map((r) => (
                  <Link
                    key={r}
                    href={`/city/tokyo/restaurants/${r}`}
                    className="rounded-full bg-brand-100 px-2.5 py-0.5 text-brand-800 hover:bg-brand-200"
                  >
                    {r.replace(/-/g, " ")} →
                  </Link>
                ))}
              </div>
            )}
          </article>
        ))}
      </section>
    </main>
  );
}
