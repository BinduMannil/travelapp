import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getPlaceOption } from "@/lib/destinations/countries";
import { VietnamCityDetailPage } from "@/components/vietnam/VietnamCityDetailPage";
import { getVietnamCity } from "@/lib/vietnam/frontend";
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
      "Vietnam shopping guide for coffee, textiles, tailoring, ceramics, lacquerware, markets, and design finds.",
  };
}

export default async function ShoppingPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const vietnamCity = getVietnamCity(slug);
  if (vietnamCity) return <VietnamCityDetailPage city={vietnamCity} kind="shopping" />;
  if (getPlaceOption(slug)) notFound();
  const city = getCity(slug);
  const data = getCityShopping(slug);
  if (!city || !data) notFound();

  return (
    <main className="editorial-page">
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

      <div className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
<nav className="flex flex-wrap gap-3 text-xs">
        {data.categories.map((c) => (
          <a
            key={c.slug}
            href={`#cat-${c.slug}`}
            className="rounded-full border border-white/20 bg-white/[0.08] px-4 py-2 font-semibold text-white/82 backdrop-blur transition hover:border-kintsugi-300 hover:bg-kintsugi-300 hover:text-sumi-950"
          >
            {c.title}
          </a>
        ))}
      </nav>

      <div className="mt-12 space-y-20">
        {data.categories.map((c) => {
          const palette = CATEGORY_PALETTE[c.slug] ?? "aizome";
          return (
            <section
              key={c.slug}
              id={`cat-${c.slug}`}
              className="scroll-mt-20"
            >
              {/* Section header — single clean line, no side-by-side tile */}
              <header className="grid gap-6 rounded-[1.4rem] border border-white/14 bg-[linear-gradient(180deg,rgba(35,31,26,0.9),rgba(14,13,12,0.94))] p-6 shadow-editorial-deep md:grid-cols-[0.9fr_1.1fr]">
                <div className="flex items-start gap-4">
                  <span
                    aria-hidden
                    className={`grid h-16 w-16 shrink-0 place-items-center rounded-2xl border border-white/22 bg-white/[0.08] font-sans text-4xl font-semibold ${
                      palette === "sumi"
                        ? "text-white"
                        : palette === "matcha"
                          ? "text-matcha-200"
                          : palette === "aizome" || palette === "ocean"
                            ? "text-aizome-100"
                            : palette === "kintsugi"
                              ? "text-kintsugi-200"
                              : "text-sakura-100"
                    }`}
                  >
                    {c.kanji}
                  </span>
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-kintsugi-200">
                      {c.picks.length} {c.picks.length === 1 ? "pick" : "picks"}
                    </p>
                    <h2 className="mt-2 font-sans text-[clamp(2.4rem,5vw,4.7rem)] font-semibold leading-[0.95] text-white">
                      {c.title}
                    </h2>
                  </div>
                </div>
                <p className="max-w-2xl self-end text-sm leading-7 text-white/76 sm:text-base">
                  {c.body}
                </p>
              </header>

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

              <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {c.picks.map((p) => (
                  <article
                    key={p.name}
                    className="group flex flex-col rounded-[1.15rem] border border-white/14 bg-[linear-gradient(180deg,rgba(255,253,246,0.98),rgba(239,231,215,0.96))] p-5 text-sumi-950 shadow-editorial transition hover:-translate-y-0.5 hover:border-kintsugi-500 hover:shadow-editorial-deep"
                  >
                    <div className="text-[10px] font-semibold uppercase tracking-[0.12em] text-enji-700">
                      {p.neighborhood}
                    </div>
                    <h3 className="mt-2 font-sans text-2xl font-semibold leading-tight text-sumi-950 group-hover:text-enji-700">
                      {p.name}
                    </h3>
                    <p className="mt-3 flex-1 text-sm leading-7 text-sumi-800">
                      {p.body}
                    </p>
                    {p.url && (
                      <a
                        href={p.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-5 inline-block text-sm font-semibold text-enji-700 underline decoration-enji-300 underline-offset-4 hover:text-sumi-950"
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

      <aside className="mt-16 rounded-[1.25rem] border border-kintsugi-300/35 bg-[linear-gradient(180deg,rgba(35,29,20,0.94),rgba(15,13,11,0.96))] p-6 text-sm leading-7 text-white/82 shadow-editorial-deep">
        <div className="text-xs font-semibold uppercase tracking-[0.12em] text-kintsugi-200">
          Tax-free shopping
        </div>
        <p className="mt-2">{data.tax_free_note}</p>
      </aside>
    </div>
    </main>
  );
}
