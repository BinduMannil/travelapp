/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getCountry, getCountryBeverages } from "@/lib/data/seed";
import { AmbientDestinationMotion } from "@/components/destination/AmbientDestinationMotion";
import { BeverageCard } from "@/components/beverages/BeverageCard";
import { getDestinationIdentity } from "@/lib/destination/identity";

const CATEGORY_LABEL: Record<string, string> = {
  tea: "Tea",
  coffee: "Coffee",
  alcohol: "Alcohol",
};

const CATEGORY_ORDER = ["alcohol", "tea", "coffee"] as const;

const DRINK_IMAGES = {
  hero:
    "https://images.unsplash.com/photo-1515823662972-da6a2e4d3002?auto=format&fit=crop&w=2400&q=85",
  tea:
    "https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?auto=format&fit=crop&w=1800&q=84",
  bar:
    "https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=1800&q=84",
  coffee:
    "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1800&q=84",
};

export function generateMetadata(): Metadata {
  return {
    title: "Tea, coffee & alcohol",
    description:
      "Tea-or-coffee verdict, the country's signature alcoholic drinks, and where to try each.",
  };
}

export default async function BeveragesPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const country = getCountry(slug);
  const data = getCountryBeverages(slug);
  if (!country || !data) notFound();

  const identity = getDestinationIdentity(slug);
  const grouped = new Map<string, typeof data.drinks>();
  for (const drink of data.drinks) {
    const list = grouped.get(drink.category) ?? [];
    list.push(drink);
    grouped.set(drink.category, list);
  }

  return (
    <main className="editorial-page">
      <section className="relative isolate min-h-[calc(100svh-4rem)] overflow-hidden bg-sumi-900">
        <img
          src={DRINK_IMAGES.hero}
          alt={`${country.name} bar and drink atmosphere`}
          className="image-drift absolute inset-0 -z-20 h-full w-full object-cover"
        />
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(8,7,6,.96),rgba(8,7,6,.62)_48%,rgba(8,7,6,.18)),linear-gradient(0deg,rgba(8,7,6,.9),transparent_52%)]" />
        <div className="absolute inset-0 -z-10 opacity-70" style={{ backgroundImage: identity.texture }} />
        <AmbientDestinationMotion identity={identity} />
        <div className="mx-auto grid min-h-[calc(100svh-4rem)] max-w-7xl content-end gap-12 px-6 pb-20 pt-24 lg:grid-cols-[1fr_.92fr] lg:items-end">
          <div>
            <nav className="luxury-kicker text-white/56">
              <Link href="/" className="hover:text-kintsugi-300">
                Home
              </Link>{" "}
              ·{" "}
              <Link href={`/country/${slug}`} className="hover:text-kintsugi-300">
                {country.name}
              </Link>{" "}
              · Tea, coffee & alcohol
            </nav>
            <p className="luxury-kicker mt-8 text-kintsugi-300">Drink culture</p>
            <h1 className="luxury-display mt-4 text-[clamp(4rem,11vw,10rem)] font-semibold text-white">
              What Japan pours
            </h1>
            <p className="luxury-lede mt-8 max-w-2xl text-white/82">{data.summary}</p>
          </div>

          <aside className="scene-glass rounded-[1.35rem] p-6 sm:p-8">
            <p className="luxury-kicker text-kintsugi-300">Tea or coffee?</p>
            <div className="mt-5 flex items-end gap-5">
              <div className="font-display text-[clamp(5rem,13vw,8rem)] font-semibold leading-none text-white">
                {data.tea_or_coffee.verdict === "tea"
                  ? "茶"
                  : data.tea_or_coffee.verdict === "coffee"
                    ? "珈"
                    : "両"}
              </div>
              <h2 className="pb-3 font-display text-3xl font-semibold leading-tight text-white">
                {data.tea_or_coffee.headline}
              </h2>
            </div>
            <p className="mt-6 text-sm leading-7 text-white/70">{data.tea_or_coffee.body}</p>
          </aside>
        </div>
      </section>

      <section className="journee-scene relative overflow-hidden py-32 sm:py-44">
        <img
          src={DRINK_IMAGES.tea}
          alt=""
          className="absolute right-0 top-16 h-[34rem] w-[54vw] object-cover opacity-20"
          loading="lazy"
        />
        <div className="relative mx-auto grid max-w-7xl gap-16 px-6 lg:grid-cols-[.72fr_1.28fr] lg:items-center">
          <div>
            <p className="luxury-kicker text-kintsugi-300">Cultural default</p>
            <h2 className="luxury-display mt-4 text-[clamp(2.8rem,6vw,6rem)] font-semibold text-white">
              Green tea is hospitality, not just a drink.
            </h2>
            <p className="mt-7 max-w-lg text-base leading-8 text-white/68">
              Tea sits inside meals, ceremony and convenience-store routine. Coffee is serious too, but it is layered on top of a tea country.
            </p>
          </div>
          <div className="grid gap-5 md:grid-cols-2">
            <DrinkCultureNote label="Tea culture">
              {data.tea_or_coffee.tea_culture_notes}
            </DrinkCultureNote>
            <DrinkCultureNote label="Coffee culture">
              {data.tea_or_coffee.coffee_culture_notes}
            </DrinkCultureNote>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#11100e] py-32 sm:py-44">
        <div
          className="absolute inset-0 opacity-18"
          style={{
            backgroundImage: `url(${DRINK_IMAGES.bar})`,
            backgroundPosition: "center",
            backgroundSize: "cover",
          }}
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(17,16,14,.96),rgba(17,16,14,.86),rgba(17,16,14,.98))]" />
        <div className="relative mx-auto max-w-7xl space-y-28 px-6">
          {CATEGORY_ORDER.filter((category) => grouped.has(category)).map((category, categoryIndex) => (
            <section key={category} id={`cat-${category}`} className="scroll-mt-24">
              <div className={`grid gap-14 lg:grid-cols-[.78fr_1.22fr] ${categoryIndex % 2 === 1 ? "lg:grid-cols-[1.18fr_.82fr]" : ""}`}>
                <div className={categoryIndex % 2 === 1 ? "lg:order-2" : ""}>
                  <p className="luxury-kicker text-kintsugi-300">{CATEGORY_LABEL[category]}</p>
                  <h2 className="luxury-display mt-4 text-[clamp(2.7rem,5vw,5.4rem)] font-semibold text-white">
                    {category === "alcohol"
                      ? "Bars, izakaya and the first pour."
                      : category === "tea"
                        ? "Ceremony, bottles and quiet meals."
                        : "Kissaten, pour-over and city mornings."}
                  </h2>
                  <p className="mt-7 max-w-lg text-base leading-8 text-white/68">
                    Tap any drink for how to order it and where locals go. The list stays useful, but the pacing follows the room.
                  </p>
                </div>
                <div className="grid gap-8">
                  {(grouped.get(category) ?? []).map((drink, index) => (
                    <div key={drink.slug} className={index % 2 === 1 ? "lg:ml-16" : ""}>
                      <BeverageCard drink={drink} />
                    </div>
                  ))}
                </div>
              </div>
            </section>
          ))}
        </div>
      </section>
    </main>
  );
}

function DrinkCultureNote({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <article className="scene-glass min-h-80 rounded-[1.35rem] p-6 sm:p-8">
      <p className="luxury-kicker text-kintsugi-300">{label}</p>
      <p className="mt-6 text-base leading-8 text-white/72">{children}</p>
    </article>
  );
}
