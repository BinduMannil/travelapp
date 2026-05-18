"use client";

/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import {
  getPlacesForCountry,
  type CountryContentCard,
  type CountryLink,
  type CountryOption,
} from "@/lib/destinations/countries";
import {
  DestinationAtmosphereProvider,
  DestinationMotionLayer,
  DestinationThemeOverlay,
  getAtmosphereThemeForRender,
} from "@/components/destination/DestinationAtmosphere";
import {
  getUniqueDestinationImage,
  inferImageCategoryFromText,
  resetUsedImagesForPage,
} from "@/lib/imageRotation";

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

function Arrow() {
  return <span aria-hidden className="text-lg leading-none text-[#d8aa4f] transition group-hover:translate-x-1">→</span>;
}

function ImageCard({ card, large = false }: { card: CountryContentCard; large?: boolean }) {
  return (
    <Link
      href={card.href}
      className={`group relative overflow-hidden rounded-lg border bg-white/[0.045] shadow-2xl shadow-black/20 ${
        large ? "min-h-[13rem]" : "min-h-[16rem]"
      }`}
      style={{ borderColor: "var(--destination-card-border)" }}
    >
      <img
        src={card.image}
        alt=""
        className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105"
      />
      <span className="absolute inset-0 bg-[linear-gradient(90deg,rgba(2,10,11,.7),rgba(2,10,11,.38)_52%,rgba(2,10,11,.1)),linear-gradient(0deg,rgba(2,10,11,.72),transparent_68%)]" />
      <span className="relative flex h-full min-h-[inherit] flex-col justify-end p-6">
        <span className="text-[0.68rem] font-bold uppercase tracking-[0.18em]" style={{ color: "var(--destination-primary)" }}>
          {card.eyebrow}
        </span>
        <strong className="mt-3 max-w-[16ch] font-sans text-2xl font-medium leading-tight text-white">
          {card.title}
        </strong>
        <span className="mt-3 max-w-md text-sm leading-6 text-white/72">{card.description}</span>
        <span className="mt-5 inline-flex items-center gap-3 text-[0.72rem] font-bold uppercase tracking-[0.14em]" style={{ color: "var(--destination-primary)" }}>
          Explore <Arrow />
        </span>
      </span>
    </Link>
  );
}

export function CountryPreviewExperience({ country }: { country: CountryOption }) {
  const isVietnam = country.slug === "vietnam";
  const atmosphereTheme = getAtmosphereThemeForRender({
    destinationSlug: country.slug,
    destinationType: "country",
  });
  const places = getPlacesForCountry(country.slug);
  const usedImages = resetUsedImagesForPage();
  const heroImage = getUniqueDestinationImage({
    destinationSlug: country.slug,
    countrySlug: country.slug,
    category: "hero",
    preferredImage: country.image,
    usedImages,
  });
  const overviewCards = (country.overviewCards ?? fallbackOverview(country)).map((card) => ({
    ...card,
    image: getUniqueDestinationImage({
      destinationSlug: country.slug,
      countrySlug: country.slug,
      category: inferImageCategoryFromText(`${card.eyebrow} ${card.title} ${card.description}`),
      preferredImage: card.image,
      usedImages,
    }),
  }));
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
  const assignedFeaturedExperiences = featuredExperiences.map((card) => ({
    ...card,
    image: getUniqueDestinationImage({
      destinationSlug: country.slug,
      countrySlug: country.slug,
      category: inferImageCategoryFromText(`${card.eyebrow} ${card.title} ${card.description}`),
      preferredImage: card.image,
      usedImages,
    }),
  }));

  return (
    <DestinationAtmosphereProvider destinationSlug={country.slug} destinationType="country">
    <main className={`${isVietnam ? "vietnam-editorial" : ""} min-h-screen overflow-x-hidden bg-[#020a0b] text-white`}>
      <section className="relative isolate overflow-hidden">
        <div className="relative min-h-[52rem] overflow-hidden">
          <img
            src={heroImage}
            alt=""
            className="absolute inset-0 -z-30 h-full w-full object-cover brightness-[1.06] contrast-[1.08] saturate-[1.32]"
          />
          <DestinationThemeOverlay theme={atmosphereTheme} className="-z-20" />
          <DestinationMotionLayer theme={atmosphereTheme} className="-z-10" />
          {isVietnam ? (
            <>
              <div className="vietnam-hero-overlay absolute inset-0 -z-20" />
              <div className="vietnam-fog absolute inset-x-0 bottom-0 -z-10 h-56" />
              <div className="vietnam-reflection absolute inset-x-10 bottom-10 -z-10 h-20" />
            </>
          ) : null}
          <div className="absolute inset-x-0 top-0 z-20 border-b border-white/8 bg-black/10 backdrop-blur-sm">
            <div className="mx-auto flex max-w-[1160px] items-center justify-between gap-6 px-4 py-5 sm:px-5 xl:px-0">
              <Link href="/" className="min-w-0">
                <span className="block text-2xl font-bold uppercase tracking-[0.22em] text-white">
                  JOURNEE
                </span>
                <span className="block text-[0.55rem] font-bold uppercase tracking-[0.28em]" style={{ color: "var(--destination-primary)" }}>
                  by Dzeli
                </span>
              </Link>
              <nav className="hidden items-center gap-8 text-[0.72rem] font-bold uppercase tracking-[0.08em] text-white/86 lg:flex">
                {["Destinations", "Journeys", "Yachts", "Rail", "Aurora", "Expeditions", "Experiences", "Concierge"].map((item) => (
                  <Link key={item} href={item === "Destinations" ? "/discover" : `/${item.toLowerCase()}`} className="transition hover:text-[var(--destination-primary)]">
                    {item}
                  </Link>
                ))}
              </nav>
              <Link
                href="/concierge"
                className="rounded px-5 py-3 text-[0.7rem] font-bold uppercase tracking-[0.1em] text-[#15110a]"
                style={{ backgroundColor: "var(--destination-primary)" }}
              >
                Join
              </Link>
            </div>
          </div>

          <div className="mx-auto grid min-h-[52rem] max-w-[1160px] content-center px-4 pb-24 pt-32 sm:px-5 xl:px-0">
            <div className="max-w-xl">
              <p className="text-[0.76rem] font-bold uppercase tracking-[0.1em] drop-shadow-[0_2px_14px_rgba(0,0,0,.75)] sm:tracking-[0.16em]" style={{ color: "var(--destination-primary)" }}>
                {country.heroEyebrow ?? "Country guide"}
              </p>
              <h1 className="mt-4 max-w-[11ch] font-sans text-[clamp(3.6rem,20vw,6.6rem)] font-semibold leading-[0.82] text-white drop-shadow-[0_12px_38px_rgba(0,0,0,0.72)] sm:mt-5 md:text-[clamp(4.6rem,10vw,7.8rem)] lg:text-[clamp(5.4rem,8vw,8.8rem)] lg:leading-[0.82]">
                {country.name}
              </h1>
              {country.heroTitle && country.heroTitle !== country.name ? (
                <p className="mt-5 max-w-[13ch] font-sans text-[clamp(2rem,8vw,3.4rem)] font-semibold leading-[0.92] text-[#fff2d8] drop-shadow-[0_8px_30px_rgba(0,0,0,.72)] sm:text-[clamp(2.3rem,5vw,4rem)]">
                  {country.heroTitle}
                </p>
              ) : null}
              <p className="mt-6 max-w-lg text-base leading-7 text-white/88 drop-shadow-[0_3px_18px_rgba(0,0,0,.7)] sm:mt-7 sm:leading-8">
                {country.heroBody ?? country.summary}
              </p>
              <Link
                href="#overview"
                className="mt-8 inline-flex items-center gap-3 border-b pb-1 text-[0.72rem] font-bold uppercase tracking-[0.14em]"
                style={{ borderColor: "var(--destination-card-border)", color: "var(--destination-primary)" }}
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
        <p className="text-[0.72rem] font-bold uppercase tracking-[0.18em]" style={{ color: "var(--destination-primary)" }}>
          Essential links
        </p>
        <div className="mt-4 grid border-y border-white/12 md:grid-cols-5">
          {essentialLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="group flex min-w-0 items-center gap-4 border-white/12 py-4 pr-4 transition hover:bg-white/[0.035] md:border-r md:px-5"
              >
                <span className="min-w-0 flex-1">
                  <span className="block text-[0.68rem] font-bold uppercase tracking-[0.16em] text-white">
                    {item.label}
                  </span>
                  <span className="mt-1 block truncate text-sm text-white/60">{item.description}</span>
                </span>
                <Arrow />
              </Link>
          ))}
        </div>
      </section>

      {places.length ? (
        <section id="cities" className="mx-auto max-w-[1160px] px-4 py-10 sm:px-5 xl:px-0">
        <p className="text-[0.72rem] font-bold uppercase tracking-[0.18em]" style={{ color: "var(--destination-primary)" }}>
          City discovery
        </p>
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {places.slice(0, 8).map((place) => (
              <Link
                key={place.slug}
                href={`/city/${place.slug}`}
                className="group min-h-[11rem] rounded-lg border bg-white/[0.045] p-5 transition hover:-translate-y-1 hover:bg-white/[0.075]"
                style={{ borderColor: "rgba(255,255,255,.14)" }}
              >
                <span className="text-[0.68rem] font-bold uppercase tracking-[0.14em]" style={{ color: "var(--destination-primary)" }}>
                  {place.kind}
                </span>
                <span className="mt-3 block font-sans text-2xl font-medium leading-tight text-white group-hover:text-[var(--destination-primary)]">
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
        <p className="text-[0.72rem] font-bold uppercase tracking-[0.18em]" style={{ color: "var(--destination-primary)" }}>
          Featured experiences
        </p>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {assignedFeaturedExperiences.map((card) => (
            <ImageCard key={card.title} card={card} />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-[1160px] px-4 pb-8 pt-2 sm:px-5 xl:px-0">
        <Link
          href={country.routeCta?.href ?? `/country/${country.slug}/itinerary`}
          className="group flex flex-col gap-4 rounded-lg border bg-white/[0.035] px-5 py-5 shadow-2xl shadow-black/20 sm:flex-row sm:items-center sm:justify-between sm:px-7"
          style={{ borderColor: "var(--destination-card-border)" }}
        >
          <span className="flex min-w-0 items-center gap-5">
            <span>
              <span className="block text-[0.68rem] font-bold uppercase tracking-[0.16em]" style={{ color: "var(--destination-primary)" }}>
                {country.routeCta?.eyebrow ?? "Route builder"}
              </span>
              <span className="mt-1 block font-sans text-xl font-medium leading-snug text-white sm:text-2xl">
                {country.routeCta?.title ?? `Craft your perfect ${country.name} journey.`}
              </span>
            </span>
          </span>
          <span className="inline-flex w-fit items-center gap-3 rounded border px-5 py-3 text-[0.72rem] font-bold uppercase tracking-[0.12em]" style={{ borderColor: "var(--destination-card-border)", color: "var(--destination-primary)" }}>
            {country.routeCta?.label ?? "Build route"} <Arrow />
          </span>
        </Link>
      </section>
    </main>
    </DestinationAtmosphereProvider>
  );
}
