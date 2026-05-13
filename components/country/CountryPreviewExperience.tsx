"use client";

/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import {
  CalendarDays,
  ChefHat,
  Globe2,
  MessageCircle,
  Sparkles,
  Star,
  Wine,
} from "lucide-react";
import {
  getPlacesForCountry,
  type CountryContentCard,
  type CountryLink,
  type CountryOption,
} from "@/lib/destinations/countries";

const fallbackOverview = (country: CountryOption): CountryContentCard[] => [
  {
    eyebrow: country.name,
    title: "Country Guide",
    description: country.summary,
    href: `/country/${country.slug}`,
    image: country.image,
  },
  {
    eyebrow: "Cities",
    title: "Explore Cities",
    description: `Discover the cities, towns, islands, and regions that shape ${country.name}.`,
    href: "#cities",
    image: country.image,
  },
  {
    eyebrow: "Planning",
    title: "Plan Your Journey",
    description: "Routes, timing, food, language, and practical travel notes in one place.",
    href: `/country/${country.slug}/itinerary`,
    image: country.image,
  },
];

const fallbackLinks = (country: CountryOption): CountryLink[] => [
  { label: "Itineraries", href: `/country/${country.slug}/itinerary`, description: "Curated travel ideas" },
  { label: "Cuisine", href: `/country/${country.slug}/cuisine`, description: `Flavors of ${country.name}` },
  { label: "Beverages", href: `/country/${country.slug}/beverages`, description: "Local drinks to try" },
  { label: "Famous For", href: `/country/${country.slug}/famous-for`, description: `What ${country.name} is known for` },
  { label: "Language", href: `/country/${country.slug}/languages`, description: "Useful travel phrases" },
];

const linkIcons = [CalendarDays, ChefHat, Wine, Star, MessageCircle];

function Arrow() {
  return <span aria-hidden className="text-lg leading-none text-[#d8aa4f] transition group-hover:translate-x-1">→</span>;
}

function ImageCard({ card, large = false }: { card: CountryContentCard; large?: boolean }) {
  return (
    <Link
      href={card.href}
      className={`group relative overflow-hidden rounded-lg border border-white/16 bg-white/[0.045] shadow-2xl shadow-black/20 ${
        large ? "min-h-[13rem]" : "min-h-[16rem]"
      }`}
    >
      <img
        src={card.image}
        alt=""
        className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105"
      />
      <span className="absolute inset-0 bg-[linear-gradient(90deg,rgba(2,10,11,.88),rgba(2,10,11,.54)_50%,rgba(2,10,11,.22)),linear-gradient(0deg,rgba(2,10,11,.88),transparent_66%)]" />
      <span className="relative flex h-full min-h-[inherit] flex-col justify-end p-6">
        <span className="text-[0.68rem] font-bold uppercase tracking-[0.18em] text-[#d8aa4f]">
          {card.eyebrow}
        </span>
        <strong className="mt-3 max-w-[16ch] font-sans text-2xl font-medium leading-tight text-white">
          {card.title}
        </strong>
        <span className="mt-3 max-w-md text-sm leading-6 text-white/72">{card.description}</span>
        <span className="mt-5 inline-flex items-center gap-3 text-[0.72rem] font-bold uppercase tracking-[0.14em] text-[#d8aa4f]">
          Explore <Arrow />
        </span>
      </span>
    </Link>
  );
}

export function CountryPreviewExperience({ country }: { country: CountryOption }) {
  const places = getPlacesForCountry(country.slug);
  const overviewCards = country.overviewCards ?? fallbackOverview(country);
  const essentialLinks = country.essentialLinks ?? fallbackLinks(country);
  const featuredExperiences =
    country.featuredExperiences ??
    places.slice(0, 4).map((place) => ({
      eyebrow: place.kind,
      title: place.name,
      description: place.summary,
      href: `/city/${place.slug}`,
      image: place.image ?? country.image,
    }));

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#020a0b] text-white">
      <section className="relative isolate overflow-hidden">
        <div className="relative min-h-[52rem] overflow-hidden">
          <img
            src={country.image}
            alt=""
            className="absolute inset-0 -z-30 h-full w-full object-cover saturate-[1.15]"
          />
          <div className="absolute inset-0 -z-20 bg-[linear-gradient(90deg,rgba(1,8,9,.94)_0%,rgba(1,8,9,.72)_32%,rgba(1,8,9,.18)_70%,rgba(1,8,9,.36)_100%),linear-gradient(0deg,#020a0b_0%,rgba(2,10,11,.52)_16%,rgba(2,10,11,.02)_58%)]" />
          <div className="absolute inset-x-0 top-0 z-20 border-b border-white/8 bg-black/10 backdrop-blur-sm">
            <div className="mx-auto flex max-w-[1160px] items-center justify-between gap-6 px-4 py-5 sm:px-5 xl:px-0">
              <Link href="/" className="min-w-0">
                <span className="block text-2xl font-bold uppercase tracking-[0.22em] text-white">
                  JOURNEE
                </span>
                <span className="block text-[0.55rem] font-bold uppercase tracking-[0.28em] text-[#d8aa4f]">
                  by Dzeli
                </span>
              </Link>
              <nav className="hidden items-center gap-8 text-[0.72rem] font-bold uppercase tracking-[0.08em] text-white/86 lg:flex">
                {["Destinations", "Journeys", "Yachts", "Rail", "Aurora", "Expeditions", "Experiences", "Concierge"].map((item) => (
                  <Link key={item} href={item === "Destinations" ? "/discover" : `/${item.toLowerCase()}`} className="transition hover:text-[#d8aa4f]">
                    {item}
                  </Link>
                ))}
              </nav>
              <Link
                href="/concierge"
                className="rounded px-5 py-3 text-[0.7rem] font-bold uppercase tracking-[0.1em] text-[#15110a]"
                style={{ backgroundColor: country.accent }}
              >
                Join
              </Link>
            </div>
          </div>

          <div className="mx-auto grid min-h-[52rem] max-w-[1160px] content-center px-4 pb-24 pt-32 sm:px-5 xl:px-0">
            <div className="max-w-xl">
              <p className="text-[0.72rem] font-bold uppercase tracking-[0.18em]" style={{ color: country.accent }}>
                {country.heroEyebrow ?? country.name}
              </p>
              <h1 className="mt-5 max-w-[12ch] font-sans text-[clamp(3.1rem,8vw,5.35rem)] font-medium leading-[0.94] text-white">
                {country.heroTitle ?? country.name}
              </h1>
              <p className="mt-7 max-w-lg text-base leading-8 text-white/82">
                {country.heroBody ?? country.summary}
              </p>
              <Link
                href="#overview"
                className="mt-8 inline-flex items-center gap-3 border-b border-[#d8aa4f]/60 pb-1 text-[0.72rem] font-bold uppercase tracking-[0.14em] text-[#d8aa4f]"
              >
                Explore {country.name} <Arrow />
              </Link>
            </div>
          </div>
        </div>

        <section id="overview" className="relative z-10 mx-auto -mt-32 grid max-w-[1160px] gap-4 px-4 pb-10 sm:px-5 md:grid-cols-3 xl:px-0">
          {overviewCards.map((card) => (
            <ImageCard key={card.title} card={card} large />
          ))}
        </section>
      </section>

      <section className="mx-auto max-w-[1160px] px-4 py-7 sm:px-5 xl:px-0">
        <p className="text-[0.72rem] font-bold uppercase tracking-[0.18em] text-[#d8aa4f]">
          Essential links
        </p>
        <div className="mt-4 grid border-y border-white/12 md:grid-cols-5">
          {essentialLinks.map((item, index) => {
            const Icon = linkIcons[index] ?? Globe2;
            return (
              <Link
                key={item.href}
                href={item.href}
                className="group flex min-w-0 items-center gap-4 border-white/12 py-4 pr-4 transition hover:bg-white/[0.035] md:border-r md:px-5"
              >
                <Icon className="h-7 w-7 shrink-0 text-[#d8aa4f]" strokeWidth={1.4} />
                <span className="min-w-0 flex-1">
                  <span className="block text-[0.68rem] font-bold uppercase tracking-[0.16em] text-white">
                    {item.label}
                  </span>
                  <span className="mt-1 block truncate text-sm text-white/60">{item.description}</span>
                </span>
                <Arrow />
              </Link>
            );
          })}
        </div>
      </section>

      {places.length ? (
        <section id="cities" className="mx-auto max-w-[1160px] px-4 py-10 sm:px-5 xl:px-0">
          <p className="text-[0.72rem] font-bold uppercase tracking-[0.18em] text-[#d8aa4f]">
            City discovery
          </p>
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {places.slice(0, 8).map((place) => (
              <Link
                key={place.slug}
                href={`/city/${place.slug}`}
                className="group min-h-[11rem] rounded-lg border border-white/14 bg-white/[0.045] p-5 transition hover:-translate-y-1 hover:border-[#d8aa4f]/70 hover:bg-white/[0.075]"
              >
                <span className="text-[0.68rem] font-bold uppercase tracking-[0.14em] text-[#d8aa4f]">
                  {place.kind}
                </span>
                <span className="mt-3 block font-sans text-2xl font-medium leading-tight text-white group-hover:text-[#d8aa4f]">
                  {place.name}
                </span>
                <span className="mt-3 line-clamp-3 block text-sm leading-6 text-white/62">
                  {place.summary}
                </span>
              </Link>
            ))}
          </div>
        </section>
      ) : null}

      <section className="mx-auto max-w-[1160px] px-4 py-10 sm:px-5 xl:px-0">
        <p className="text-[0.72rem] font-bold uppercase tracking-[0.18em] text-[#d8aa4f]">
          Featured experiences
        </p>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {featuredExperiences.map((card) => (
            <ImageCard key={card.title} card={card} />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-[1160px] px-4 pb-8 pt-2 sm:px-5 xl:px-0">
        <Link
          href={country.routeCta?.href ?? `/country/${country.slug}/itinerary`}
          className="group flex flex-col gap-4 rounded-lg border border-[#d8aa4f]/28 bg-white/[0.035] px-5 py-5 shadow-2xl shadow-black/20 sm:flex-row sm:items-center sm:justify-between sm:px-7"
        >
          <span className="flex min-w-0 items-center gap-5">
            <Sparkles className="h-9 w-9 shrink-0 text-[#d8aa4f]" strokeWidth={1.3} />
            <span>
              <span className="block text-[0.68rem] font-bold uppercase tracking-[0.16em] text-[#d8aa4f]">
                {country.routeCta?.eyebrow ?? "Route builder"}
              </span>
              <span className="mt-1 block font-sans text-xl font-medium leading-snug text-white sm:text-2xl">
                {country.routeCta?.title ?? `Craft your perfect ${country.name} journey.`}
              </span>
            </span>
          </span>
          <span className="inline-flex w-fit items-center gap-3 rounded border border-[#d8aa4f]/50 px-5 py-3 text-[0.72rem] font-bold uppercase tracking-[0.12em] text-[#d8aa4f]">
            {country.routeCta?.label ?? "Build route"} <Arrow />
          </span>
        </Link>
      </section>
    </main>
  );
}
