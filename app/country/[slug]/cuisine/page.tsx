import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getCountry, getCountryCuisine } from "@/lib/data/seed";
import { PageHero } from "@/components/layout/PageHero";
import { DishCard } from "@/components/cuisine/DishCard";

export function generateMetadata(): Metadata {
  return {
    title: "Must-try local cuisine",
    description:
      "The dishes you should actively seek out — what they're made of, where they were born, and what they resemble globally.",
  };
}

// Top 3 iconic dishes to rank per country (ordered). Anything not in the
// list renders without a ribbon.
const TOP_BY_COUNTRY: Record<string, string[]> = {
  japan: ["sushi", "ramen", "tempura"],
};

export default async function CuisinePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const country = getCountry(slug);
  const data = getCountryCuisine(slug);
  if (!country || !data) notFound();

  const topList = TOP_BY_COUNTRY[slug] ?? [];
  const rankOf = (dishSlug: string) => {
    const idx = topList.indexOf(dishSlug);
    return idx === -1 ? undefined : idx + 1;
  };

  return (
    <main>
      <PageHero
        crumbs={[
          { label: "Home", href: "/" },
          { label: country.name, href: `/country/${slug}` },
          { label: "Must-try cuisine" },
        ]}
        kanji="食"
        eyebrow="Must-try cuisine"
        title="Must-try dishes"
        subtitle="食 文 化"
        lede={`The dishes you should actively seek out — ingredients, origin, global equivalents, and vegan availability.`}
        palette="enji"
      />

      {/* Menu-style header band */}
      <section className="relative overflow-hidden bg-sumi-900 text-washi-50">
        <div
          className="absolute inset-0 -z-10 opacity-[0.06]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 50% 100%, rgba(255,255,255,.85) 0 26%, transparent 27%), radial-gradient(circle at 0% 100%, rgba(255,255,255,.85) 0 26%, transparent 27%), radial-gradient(circle at 100% 100%, rgba(255,255,255,.85) 0 26%, transparent 27%)",
            backgroundSize: "56px 28px",
          }}
          aria-hidden
        />
        <div className="mx-auto max-w-6xl px-6 py-16 text-center">
          <div className="relative inline-block">
            <span className="font-display text-[clamp(3rem,10vw,7rem)] font-bold uppercase leading-none tracking-tighter text-washi-50">
              Menu
            </span>
            <span className="absolute right-0 top-[58%] -translate-y-1/2 translate-x-[70%] font-script text-[clamp(1.5rem,4vw,2.75rem)] italic text-kintsugi-300">
              {country.name.toLowerCase()}
            </span>
          </div>
          <p className="mx-auto mt-6 max-w-2xl text-sm leading-relaxed text-washi-50/75 sm:text-base">
            {data.summary}
          </p>
          <p className="mt-6 text-[10px] uppercase tracking-[0.35em] text-washi-50/55">
            Tap any card to see the origin · how to try it · where in Tokyo
          </p>
        </div>
      </section>

      {/* Dish grid */}
      <div className="bg-sumi-900 pb-20">
        <div className="mx-auto grid max-w-6xl gap-y-20 gap-x-6 px-6 sm:grid-cols-2 lg:grid-cols-3">
          {data.dishes.map((d) => (
            <DishCard
              key={d.slug}
              dish={d}
              countryName={country.name}
              rank={rankOf(d.slug)}
            />
          ))}
        </div>
      </div>
    </main>
  );
}
