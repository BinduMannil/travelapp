import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getCity, getCityShopping } from "@/lib/data/seed";
import { CoverTile } from "@/components/common/CoverTile";

const CATEGORY_PALETTE: Record<
  string,
  "enji" | "aizome" | "sakura" | "matcha" | "kintsugi" | "sumi" | "ume" | "ocean" | "forest"
> = {
  stationery: "aizome",
  knives: "sumi",
  vintage: "kintsugi",
  "anime-retro-games": "ume",
  electronics: "ocean",
  depachika: "enji",
  luxury: "sakura",
  "craft-workshops": "matcha",
};

export function generateMetadata(): Metadata {
  return {
    title: "Shopping",
    description:
      "Where to buy Japanese knives, stationery, vintage, retro games, craft, and everything else worth carrying home.",
  };
}

export default async function ShoppingPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const city = getCity(slug);
  const data = getCityShopping(slug);
  if (!city || !data) notFound();

  return (
    <main className="mx-auto max-w-5xl px-6 py-12">
      <nav className="text-xs uppercase tracking-[0.25em] text-sumi-700">
        <Link href="/" className="hover:text-enji-600">
          Home
        </Link>{" "}
        ·{" "}
        <Link href={`/city/${slug}`} className="hover:text-enji-600">
          {city.name}
        </Link>{" "}
        · Shopping
      </nav>
      <h1 className="mt-4 font-display text-4xl font-semibold tracking-tight text-sumi-900">
        Shopping in {city.name}
      </h1>
      <p className="mt-3 max-w-2xl text-sumi-700">{data.summary}</p>

      <nav className="mt-6 flex flex-wrap gap-2 text-xs">
        {data.categories.map((c) => (
          <a
            key={c.slug}
            href={`#cat-${c.slug}`}
            className="rounded-full border border-washi-200 bg-white px-3 py-1 font-medium text-sumi-700 hover:border-enji-400 hover:text-enji-700"
          >
            {c.title}
          </a>
        ))}
      </nav>

      <div className="mt-10 space-y-12">
        {data.categories.map((c) => (
          <section key={c.slug} id={`cat-${c.slug}`} className="scroll-mt-20">
            <div className="flex items-start gap-5">
              <div className="w-32 shrink-0">
                <CoverTile
                  palette={CATEGORY_PALETTE[c.slug] ?? "aizome"}
                  kanji={c.kanji}
                  aspect="1/1"
                />
              </div>
              <div className="flex-1">
                <h2 className="font-display text-2xl font-semibold tracking-tight text-sumi-900">
                  {c.title}
                </h2>
                <p className="mt-2 text-sm text-sumi-700">{c.body}</p>
              </div>
            </div>

            <div className="mt-5 grid gap-3 md:grid-cols-3">
              {c.picks.map((p) => (
                <article
                  key={p.name}
                  className="rounded-xl border border-washi-200 bg-white p-4"
                >
                  <h3 className="font-display text-base font-semibold text-sumi-900">
                    {p.name}
                  </h3>
                  <div className="text-xs text-sumi-700">{p.neighborhood}</div>
                  <p className="mt-2 text-sm text-sumi-700">{p.body}</p>
                  {p.url && (
                    <a
                      href={p.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-2 inline-block text-xs font-semibold text-enji-600 hover:underline"
                    >
                      Website →
                    </a>
                  )}
                </article>
              ))}
            </div>
          </section>
        ))}
      </div>

      <aside className="mt-14 rounded-2xl border border-kintsugi-300/50 bg-kintsugi-300/10 p-5 text-sm text-sumi-900">
        <div className="text-xs font-semibold uppercase tracking-[0.25em] text-kintsugi-600">
          Tax-free shopping
        </div>
        <p className="mt-2">{data.tax_free_note}</p>
      </aside>
    </main>
  );
}
