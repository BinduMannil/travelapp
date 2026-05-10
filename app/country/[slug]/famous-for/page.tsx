/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getCountry, getCountryFamousFor } from "@/lib/data/seed";
import { AmbientDestinationMotion } from "@/components/destination/AmbientDestinationMotion";
import { FamousCard } from "@/components/famous/FamousCard";
import { getDestinationIdentity } from "@/lib/destination/identity";

const FAMOUS_IMAGES = {
  hero:
    "https://images.unsplash.com/photo-1528360983277-13d401cdc186?auto=format&fit=crop&w=2400&q=85",
  craft:
    "https://images.unsplash.com/photo-1526481280693-3bfa7568e0f3?auto=format&fit=crop&w=1800&q=84",
  city:
    "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=1800&q=84",
};

export function generateMetadata(): Metadata {
  return {
    title: "Famous for",
    description:
      "What the country exports to the world — crafts, food, pop culture, design, and wellness traditions worth a detour.",
  };
}

export default async function FamousForPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const country = getCountry(slug);
  const data = getCountryFamousFor(slug);
  if (!country || !data) notFound();

  const identity = getDestinationIdentity(slug);
  const leadCategory = data.categories[0];

  return (
    <main className="editorial-page">
      <section className="relative isolate min-h-[calc(100svh-4rem)] overflow-hidden bg-sumi-900">
        <img
          src={FAMOUS_IMAGES.hero}
          alt={`${country.name} craft, culture, and streetscape`}
          className="image-drift absolute inset-0 -z-20 h-full w-full object-cover"
        />
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(8,7,6,.96),rgba(8,7,6,.62)_48%,rgba(8,7,6,.18)),linear-gradient(0deg,rgba(8,7,6,.9),transparent_52%)]" />
        <div className="absolute inset-0 -z-10 opacity-70" style={{ backgroundImage: identity.texture }} />
        <AmbientDestinationMotion identity={identity} />
        <div className="mx-auto grid min-h-[calc(100svh-4rem)] max-w-7xl content-end gap-12 px-6 pb-20 pt-24 lg:grid-cols-[1fr_.9fr] lg:items-end">
          <div>
            <nav className="luxury-kicker text-white/56">
              <Link href="/" className="hover:text-kintsugi-300">
                Home
              </Link>{" "}
              ·{" "}
              <Link href={`/country/${slug}`} className="hover:text-kintsugi-300">
                {country.name}
              </Link>{" "}
              · Famous for
            </nav>
            <p className="luxury-kicker mt-8 text-kintsugi-300">Cultural exports</p>
            <h1 className="luxury-display mt-4 text-[clamp(4rem,11vw,10rem)] font-semibold text-white">
              What Japan gives the world
            </h1>
            <p className="luxury-lede mt-8 max-w-2xl text-white/82">{data.summary}</p>
          </div>

          <aside className="scene-glass rounded-[1.35rem] p-6 sm:p-8">
            <p className="luxury-kicker text-kintsugi-300">Jump by world</p>
            <nav className="mt-6 flex flex-wrap gap-2.5 text-sm">
              {data.categories.map((category) => (
                <a
                  key={category.slug}
                  href={`#cat-${category.slug}`}
                  className="editorial-pill px-4 py-2 font-semibold"
                >
                  {category.label}
                </a>
              ))}
            </nav>
            <p className="mt-7 border-t border-white/12 pt-5 text-sm leading-7 text-white/64">
              Follow each cultural world into the places, rituals, and details that make it worth seeking out.
            </p>
          </aside>
        </div>
      </section>

      {leadCategory && (
        <section className="journee-scene relative overflow-hidden py-32 sm:py-44">
          <img
            src={FAMOUS_IMAGES.craft}
            alt=""
            className="absolute right-0 top-16 h-[34rem] w-[54vw] object-cover opacity-20"
            loading="lazy"
          />
          <div className="relative mx-auto grid max-w-7xl gap-16 px-6 lg:grid-cols-[.68fr_1.32fr] lg:items-start">
            <div className="lg:sticky lg:top-24">
              <p className="luxury-kicker text-kintsugi-300">{leadCategory.label}</p>
              <h2 className="luxury-display mt-4 text-[clamp(2.8rem,6vw,6rem)] font-semibold text-white">
                Craft is not souvenir logic.
              </h2>
              <p className="mt-7 max-w-lg text-base leading-8 text-white/68">
                The best-known objects are rooted in region, workshop, material and ritual. They deserve slower pacing than a shop grid.
              </p>
            </div>
            <div className="grid gap-8">
              {leadCategory.items.map((item, index) => (
                <div key={item.name} className={index % 2 === 1 ? "lg:ml-20" : ""}>
                  <FamousCard item={item} />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="relative overflow-hidden bg-[#11100e] py-32 sm:py-44">
        <div
          className="absolute inset-0 opacity-18"
          style={{
            backgroundImage: `url(${FAMOUS_IMAGES.city})`,
            backgroundPosition: "center",
            backgroundSize: "cover",
          }}
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(17,16,14,.96),rgba(17,16,14,.86),rgba(17,16,14,.98))]" />
        <div className="relative mx-auto max-w-7xl space-y-28 px-6">
          {data.categories.slice(1).map((category, categoryIndex) => (
            <section
              key={category.slug}
              id={`cat-${category.slug}`}
              className="scroll-mt-24"
            >
              <div className={`grid gap-14 lg:grid-cols-[.82fr_1.18fr] ${categoryIndex % 2 === 1 ? "lg:grid-cols-[1.18fr_.82fr]" : ""}`}>
                <div className={categoryIndex % 2 === 1 ? "lg:order-2" : ""}>
                  <p className="luxury-kicker text-kintsugi-300">{category.label}</p>
                  <h2 className="luxury-display mt-4 text-[clamp(2.7rem,5vw,5.4rem)] font-semibold text-white">
                    A different kind of pilgrimage.
                  </h2>
                  <p className="mt-7 max-w-lg text-base leading-8 text-white/68">
                    Each category has a different rhythm: bottle, studio, counter, department-store gallery, backstreet shop, hotel bar.
                  </p>
                </div>
                <div className="grid gap-8">
                  {category.items.map((item, index) => (
                    <div key={item.name} className={index % 2 === 1 ? "lg:ml-16" : ""}>
                      <FamousCard item={item} />
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
