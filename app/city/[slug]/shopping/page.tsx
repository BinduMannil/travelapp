import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { MoneyText } from "@/components/common/MoneyText";
import { getCity, getCityShopping } from "@/lib/data/seed";
import { PageHero } from "@/components/layout/PageHero";
import { ShoppingBubbleHero } from "@/components/shopping/ShoppingBubbleHero";
import { ShoppingCategoryCover } from "@/components/shopping/ShoppingCategoryCover";

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
  malls: "kintsugi",
  boutiques: "ume",
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
    <main>
      <PageHero
        crumbs={[
          { label: "Home", href: "/" },
          { label: city.name, href: `/city/${slug}` },
          { label: "Shopping" },
        ]}
        kanji="買"
        eyebrow="Shopping"
        title={`Shopping in Tokyo`}
        subtitle="買 物"
        lede={`Japan rewards the specialist. Twelve floors of stationery, a block of vintage denim, a basement dedicated to depachika sweets.`}
        palette="kintsugi"
        size="sm"
      />

      {/* Bubble hero — vertical orbit of the category bubbles, Bali-reference
          aesthetic. Tap any bubble to focus it; tap the centre to scroll to
          the full category block below. */}
      <ShoppingBubbleHero
        items={data.categories.map((c) => ({
          slug: c.slug,
          title: c.title,
          subtitle: `${c.picks.length} ${c.picks.length === 1 ? "pick" : "picks"}`,
          kanji: c.kanji,
          palette: CATEGORY_PALETTE[c.slug] ?? "aizome",
          images: c.hero_image_urls ?? [],
        }))}
      />

      <div className="mx-auto max-w-5xl px-6 py-12">
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

      <div className="mt-10 space-y-14">
        {data.categories.map((c) => {
          const palette = CATEGORY_PALETTE[c.slug] ?? "aizome";
          return (
            <section
              key={c.slug}
              id={`cat-${c.slug}`}
              className="scroll-mt-20"
            >
              {/* Section header — single clean line, no side-by-side tile */}
              <header className="flex items-baseline justify-between gap-4 border-b border-washi-200 pb-3">
                <div className="flex items-baseline gap-3">
                  <span
                    aria-hidden
                    className={`font-display text-2xl font-semibold ${
                      palette === "sumi"
                        ? "text-sumi-900"
                        : palette === "matcha"
                          ? "text-matcha-700"
                          : palette === "aizome" || palette === "ocean"
                            ? "text-aizome-600"
                            : palette === "kintsugi"
                              ? "text-kintsugi-500"
                              : "text-enji-600"
                    }`}
                  >
                    {c.kanji}
                  </span>
                  <h2 className="font-display text-xl font-semibold tracking-tight text-sumi-900 sm:text-2xl">
                    {c.title}
                  </h2>
                </div>
                <div className="shrink-0 text-[10px] uppercase tracking-[0.2em] text-sumi-700">
                  {c.picks.length}{" "}
                  {c.picks.length === 1 ? "pick" : "picks"}
                </div>
              </header>

              <p className="mt-3 max-w-3xl text-sm leading-relaxed text-sumi-700">
                {c.body}
              </p>

              {/* Optional cover strip — spans full width, calmer than a
                  side tile. Only shown when we have real images. */}
              {(c.hero_image_urls ?? []).length > 0 && (
                <div className="mt-5 overflow-hidden rounded-2xl">
                  <ShoppingCategoryCover
                    palette={palette}
                    kanji={c.kanji}
                    images={c.hero_image_urls ?? []}
                    alt={c.title}
                  />
                </div>
              )}

              <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {c.picks.map((p) => (
                  <article
                    key={p.name}
                    className="group flex flex-col rounded-xl border border-washi-200 bg-white p-4 transition hover:-translate-y-0.5 hover:border-enji-300 hover:shadow-md"
                  >
                    <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-sumi-700">
                      {p.neighborhood}
                    </div>
                    <h3 className="mt-1 text-base font-semibold leading-snug text-sumi-900 group-hover:text-enji-700">
                      {p.name}
                    </h3>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-sumi-700">
                      <MoneyText>{p.body}</MoneyText>
                    </p>
                    {p.url && (
                      <a
                        href={p.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-3 inline-block text-xs font-semibold text-enji-600 hover:underline"
                      >
                        Website →
                      </a>
                    )}
                  </article>
                ))}
              </div>
            </section>
          );
        })}
      </div>

      <aside className="mt-14 rounded-2xl border border-kintsugi-300/50 bg-kintsugi-300/10 p-5 text-sm text-sumi-900">
        <div className="text-xs font-semibold uppercase tracking-[0.25em] text-kintsugi-600">
          Tax-free shopping
        </div>
        <p className="mt-2">{data.tax_free_note}</p>
      </aside>
    </div>
    </main>
  );
}
