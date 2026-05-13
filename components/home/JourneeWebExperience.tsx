/* eslint-disable @next/next/no-img-element */
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { CirclePlay, Search } from "lucide-react";
import { JourneeBrand } from "@/components/brand/JourneeLogo";
import { useI18n } from "@/lib/i18n/context";
import { routes } from "@/lib/routes";

const images = {
  hero:
    "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=2400&q=88",
  desert:
    "https://images.unsplash.com/photo-1509316785289-025f5b846b35?auto=format&fit=crop&w=2400&q=88",
  waterfall:
    "https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?auto=format&fit=crop&w=2400&q=88",
  coast:
    "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=2400&q=88",
  nightCity:
    "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=2400&q=88",
  nature:
    "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=900&q=84",
  culture:
    "https://images.unsplash.com/photo-1528360983277-13d401cdc186?auto=format&fit=crop&w=900&q=84",
  hidden:
    "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=900&q=84",
  adventure:
    "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=900&q=84",
  food:
    "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=900&q=84",
  spiritual:
    "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=900&q=84",
  ubud:
    "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1100&q=86",
  swiss:
    "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1100&q=86",
  vietnam:
    "https://images.unsplash.com/photo-1528360983277-13d401cdc186?auto=format&fit=crop&w=1100&q=86",
  lofoten:
    "https://images.unsplash.com/photo-1483347756197-71ef80e95f73?auto=format&fit=crop&w=1100&q=86",
  avatar:
    "https://images.unsplash.com/photo-1526772662000-3f88f10405ff?auto=format&fit=crop&w=200&q=80",
};

const heroSlides = [
  {
    label: "Lauterbrunnen Valley",
    place: "Switzerland",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=2400&q=88",
  },
  {
    label: "Kyoto",
    place: "Japan",
    image: "https://images.unsplash.com/photo-1528360983277-13d401cdc186?auto=format&fit=crop&w=2400&q=88",
  },
  {
    label: "Ho Chi Minh City",
    place: "Vietnam",
    image: "https://images.unsplash.com/photo-1583417319070-4a69db38a482?auto=format&fit=crop&w=2400&q=88",
  },
  {
    label: "Hoi An",
    place: "Vietnam",
    image: "https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=2400&q=88",
  },
  {
    label: "Ubud",
    place: "Indonesia",
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=2400&q=88",
  },
  {
    label: "Marrakech",
    place: "Morocco",
    image: "https://images.unsplash.com/photo-1548018560-c7196548e84d?auto=format&fit=crop&w=2400&q=88",
  },
  {
    label: "Lofoten Islands",
    place: "Norway",
    image: "https://images.unsplash.com/photo-1483347756197-71ef80e95f73?auto=format&fit=crop&w=2400&q=88",
  },
  {
    label: "Dolomites",
    place: "Italy",
    image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=2400&q=88",
  },
  {
    label: "Santorini",
    place: "Greece",
    image: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=2400&q=88",
  },
  {
    label: "Dubai",
    place: "United Arab Emirates",
    image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=2400&q=88",
  },
  {
    label: "New York",
    place: "United States",
    image: "https://images.unsplash.com/photo-1514565131-fce0801e5785?auto=format&fit=crop&w=2400&q=88",
  },
  {
    label: "Patagonia",
    place: "Argentina",
    image: "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=2400&q=88",
  },
  {
    label: "Banff",
    place: "Canada",
    image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=2400&q=88",
  },
  {
    label: "Cape Town",
    place: "South Africa",
    image: "https://images.unsplash.com/photo-1580060839134-75a5edca2e99?auto=format&fit=crop&w=2400&q=88",
  },
  {
    label: "Machu Picchu",
    place: "Peru",
    image: "https://images.unsplash.com/photo-1526392060635-9d6019884377?auto=format&fit=crop&w=2400&q=88",
  },
  {
    label: "Seoul",
    place: "South Korea",
    image: "https://images.unsplash.com/photo-1538485399081-7191377e8241?auto=format&fit=crop&w=2400&q=88",
  },
  {
    label: "Bangkok",
    place: "Thailand",
    image: "https://images.unsplash.com/photo-1508009603885-50cf7c579365?auto=format&fit=crop&w=2400&q=88",
  },
  {
    label: "Faroe Islands",
    place: "Denmark",
    image: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=2400&q=88",
  },
  {
    label: "Sahara Road",
    place: "Morocco",
    image: images.desert,
  },
  {
    label: "Coastal Islands",
    place: "The Tropics",
    image: images.coast,
  },
  {
    label: "Night Food Streets",
    place: "Global Cities",
    image: images.nightCity,
  },
  {
    label: "Rainforest Falls",
    place: "The Green Belt",
    image: images.waterfall,
  },
];

const heroQuotes = [
  "The best journeys answer questions you did not know to ask.",
  "A place becomes real when you know how it feels.",
  "Travel starts long before the ticket.",
  "Go where the map feels unfinished.",
  "The quiet details usually lead to the best days.",
  "Some places are planned. Others are found.",
];

const countryNavItems = [
  { label: "Vietnam", href: routes.country("vietnam") },
  { label: "Japan", href: routes.country("japan") },
  { label: "Italy", href: routes.country("italy") },
  { label: "France", href: routes.country("france") },
  { label: "Switzerland", href: routes.country("switzerland") },
  { label: "Indonesia", href: routes.country("indonesia") },
  { label: "Morocco", href: routes.country("morocco") },
];

const cityNavItems = [
  { label: "Ho Chi Minh City", href: routes.city("ho-chi-minh-city") },
  { label: "Hanoi", href: routes.city("hanoi") },
  { label: "Da Nang", href: routes.city("da-nang") },
  { label: "Hoi An", href: routes.city("hoi-an") },
  { label: "Hue", href: routes.city("hue") },
  { label: "Sapa", href: routes.city("sapa") },
  { label: "Phu Quoc", href: routes.city("phu-quoc") },
  { label: "Can Tho", href: routes.city("can-tho") },
];

const categories = [
  { titleKey: "homepage.discovery.categories.natureEscapes", countKey: "homepage.discovery.categories.places124", image: images.nature },
  { titleKey: "homepage.discovery.categories.culturalJourneys", countKey: "homepage.discovery.categories.places98", image: images.culture },
  { titleKey: "homepage.discovery.categories.hiddenGems", countKey: "homepage.discovery.categories.places76", image: images.hidden },
  { titleKey: "homepage.discovery.categories.adventure", countKey: "homepage.discovery.categories.places63", image: images.adventure },
  { titleKey: "homepage.discovery.categories.foodLocal", countKey: "homepage.discovery.categories.places54", image: images.food },
  { titleKey: "homepage.discovery.categories.spiritual", countKey: "homepage.discovery.categories.places48", image: images.spiritual },
];

const recommended = [
  {
    countryKey: "Vietnam",
    titleKey: "Ho Chi Minh City",
    rating: "4.8",
    reviews: "1,248",
    copyKey: "Street energy, coffee culture, District 1, District 3, Thao Dien, and practical first-arrival rhythm.",
    image: "https://images.unsplash.com/photo-1748591646636-ad5132fed078?auto=format&fit=crop&w=1400&q=82",
    imagePosition: "50% 50%",
    href: "/city/ho-chi-minh-city",
  },
  {
    countryKey: "Vietnam",
    titleKey: "Hanoi",
    rating: "4.9",
    reviews: "892",
    copyKey: "Old Quarter lanes, French Quarter hotels, Tay Ho routines, egg coffee, and northern food culture.",
    image: "https://images.unsplash.com/photo-1758298597219-b48f370675b8?auto=format&fit=crop&w=1400&q=82",
    imagePosition: "52% 50%",
    href: "/city/hanoi",
  },
  {
    countryKey: "Vietnam",
    titleKey: "Hoi An & Da Nang",
    rating: "4.8",
    reviews: "1,124",
    copyKey: "Lantern streets, beach mornings, tailoring, cafes, and a softer Central Vietnam route.",
    image: "https://images.unsplash.com/photo-1761150285834-7ab9ce6dbfd4?auto=format&fit=crop&w=1400&q=82",
    imagePosition: "50% 50%",
    href: "/country/vietnam",
  },
  {
    countryKey: "Vietnam",
    titleKey: "Sapa & Ninh Binh",
    rating: "4.9",
    reviews: "743",
    copyKey: "Northern mountains, rice terraces, karst rivers, boat caves, weather checks, and slower scenic travel.",
    image: "https://images.unsplash.com/photo-1741319268910-250e5850553b?auto=format&fit=crop&w=1400&q=82",
    imagePosition: "50% 52%",
    href: "/country/vietnam/itinerary",
  },
];

const features = [
  {
    titleKey: "homepage.features.curatedTitle",
    copyKey: "homepage.features.curatedCopy",
  },
  {
    titleKey: "homepage.features.confidenceTitle",
    copyKey: "homepage.features.confidenceCopy",
  },
  {
    titleKey: "homepage.features.planningTitle",
    copyKey: "homepage.features.planningCopy",
  },
];

function NavDropdown({
  label,
  items,
}: {
  label: string;
  items: Array<{ label: string; href: string }>;
}) {
  return (
    <div className="group relative shrink-0">
      <button
        type="button"
        className="relative py-3 text-sm font-medium tracking-[-0.01em] text-white/82 transition hover:text-white focus-visible:outline-none focus-visible:text-white"
      >
        {label}
      </button>
      <div className="pointer-events-none absolute left-1/2 top-full w-64 -translate-x-1/2 translate-y-2 pt-4 opacity-0 transition duration-200 ease-out group-hover:pointer-events-auto group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:pointer-events-auto group-focus-within:translate-y-0 group-focus-within:opacity-100">
        <div className="overflow-hidden rounded-[1rem] border border-white/12 bg-[#0a1010]/88 shadow-2xl shadow-black/45 backdrop-blur-2xl">
          {items.map((item, index) => (
            <Link
              key={item.href}
              href={item.href}
              className={`group/item flex items-center justify-between px-5 py-3.5 text-sm font-medium text-white/72 transition hover:bg-white/[0.055] hover:text-white ${
                index > 0 ? "border-t border-white/[0.075]" : ""
              }`}
            >
              <span>{item.label}</span>
              <span className="h-px w-0 bg-[#d8aa4f] transition-all group-hover/item:w-7" />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

function HeaderNav() {
  return (
    <header className="absolute inset-x-0 top-0 z-30 px-4 pt-4 sm:px-5 sm:pt-6">
      <div className="mx-auto flex max-w-[1160px] flex-wrap items-center justify-between gap-x-6 gap-y-3 border border-white/10 bg-[#020a0b]/34 px-5 py-3 shadow-2xl shadow-black/20 backdrop-blur-2xl sm:px-6 lg:flex-nowrap">
        <Link href="/" className="flex min-w-0 items-center gap-3 text-white">
          <JourneeBrand direction="celestial-route" />
        </Link>

        <nav className="order-3 -mx-1 flex w-full items-center gap-6 overflow-x-auto px-1 font-sans [scrollbar-width:none] [&::-webkit-scrollbar]:hidden lg:order-none lg:mx-0 lg:w-auto lg:justify-center lg:gap-7 lg:overflow-visible lg:px-0">
          <Link href={routes.home} className="relative shrink-0 py-3 text-sm font-medium text-white">
            Home
            <span className="absolute bottom-1 left-0 h-px w-full bg-[#d8aa4f]" />
          </Link>
          <NavDropdown label="Countries" items={countryNavItems} />
          <NavDropdown label="Cities" items={cityNavItems} />
          <Link
            href={routes.countrySection("vietnam", "itinerary")}
            className="shrink-0 py-3 text-sm font-medium text-white/82 transition hover:text-white"
          >
            Journeys
          </Link>
          <Link
            href="/guides"
            className="shrink-0 py-3 text-sm font-medium text-white/82 transition hover:text-white"
          >
            Guides
          </Link>
          <Link
            href="/journal"
            className="shrink-0 py-3 text-sm font-medium text-white/82 transition hover:text-white"
          >
            Journal
          </Link>
        </nav>

        <Link
          href={routes.countrySection("vietnam", "itinerary")}
          className="border-b border-[#d8aa4f]/70 pb-1 text-sm font-semibold text-white/88 transition hover:border-[#f0c96e] hover:text-white"
        >
          Build the Route
        </Link>
      </div>
    </header>
  );
}

function HeroSearch() {
  const { t } = useI18n();
  const fields = [
    { label: t("homepage.search.whereLabel"), value: t("homepage.search.anywhere") },
    { label: t("homepage.search.anytimeLabel"), value: t("homepage.search.addDates") },
    { label: t("homepage.search.travelersLabel"), value: t("homepage.search.soloTraveler") },
  ];

  return (
    <div className="relative z-20 mx-auto -mt-8 max-w-[980px] px-4 sm:-mt-12 sm:px-5">
      <div className="grid gap-3 rounded-[1.5rem] border border-white/24 bg-[#101514]/80 p-4 shadow-2xl shadow-black/45 backdrop-blur-2xl md:grid-cols-[1fr_1fr_1fr_auto] md:items-center md:rounded-full md:p-5">
        {fields.map((field, index) => {
          return (
            <div
              key={field.label}
              className={`min-w-0 rounded-2xl bg-white/[0.035] px-4 py-3 md:rounded-none md:bg-transparent md:py-0 ${
                index > 0 ? "md:border-l md:border-white/12" : ""
              }`}
            >
              <div className="min-w-0">
                <p className="text-xs font-semibold text-white/88">{field.label}</p>
                <p className="mt-1 truncate text-sm text-white/62 sm:text-base">{field.value}</p>
              </div>
            </div>
          );
        })}
        <button
          type="button"
          aria-label={t("homepage.search.searchJourneys")}
          className="grid h-[3.25rem] min-h-[3.25rem] w-full place-items-center rounded-full bg-[#d8aa4f] py-3 text-white shadow-xl shadow-[#d8aa4f]/20 transition hover:bg-[#f0c96e] md:h-14 md:min-h-14 md:w-14 md:py-0"
        >
          <Search className="h-6 w-6" />
        </button>
      </div>
    </div>
  );
}

function CategoryCard({
  titleKey,
  countKey,
  image,
}: (typeof categories)[number]) {
  const { t } = useI18n();
  const title = t(titleKey);
  const count = t(countKey);

  return (
    <Link
      href={routes.explore}
      className="group relative min-h-[178px] min-w-[172px] snap-start overflow-hidden rounded-2xl border border-white/14 bg-white/[0.04] sm:min-h-[205px] sm:min-w-0"
    >
      <img
        src={image}
        alt=""
        className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105"
      />
      <span className="absolute inset-x-0 bottom-0 h-[76%] bg-gradient-to-t from-black/92 via-black/58 to-transparent" />
      <span className="absolute inset-x-0 bottom-0 h-[48%] bg-[radial-gradient(ellipse_at_bottom_left,rgba(0,0,0,.82),rgba(0,0,0,.46)_48%,transparent_78%)]" />
      <span className="relative flex h-full min-w-0 flex-col justify-end p-4 sm:p-5">
        <strong className="max-w-full text-wrap break-words text-lg font-bold leading-tight text-white drop-shadow-[0_2px_10px_rgba(0,0,0,.85)] sm:text-xl">
          {title}
        </strong>
        <span className="mt-3 w-fit rounded-full border border-white/14 bg-black/26 px-3 py-1 text-sm font-medium text-white/90 shadow-lg shadow-black/25 backdrop-blur-sm drop-shadow-[0_2px_8px_rgba(0,0,0,.8)]">
          {count}
        </span>
      </span>
    </Link>
  );
}

function DestinationCard({
  countryKey,
  titleKey,
  rating,
  reviews,
  copyKey,
  image,
  imagePosition,
  href,
}: (typeof recommended)[number]) {
  const { t } = useI18n();
  const country = countryKey.startsWith("homepage.") ? t(countryKey) : countryKey;
  const title = titleKey.startsWith("homepage.") ? t(titleKey) : titleKey;
  const copy = copyKey.startsWith("homepage.") ? t(copyKey) : copyKey;

  return (
    <Link
      href={href}
      className="group relative min-h-[420px] overflow-hidden rounded-[1.75rem] border border-white/12 bg-black shadow-2xl shadow-black/40 sm:min-h-[440px] xl:min-h-[430px]"
    >
      <img
        src={image}
        alt={`${title}, ${country}`}
        className="absolute inset-0 h-full w-full object-cover brightness-[0.72] saturate-[0.9] contrast-[1.04] transition duration-700 group-hover:scale-105 group-hover:brightness-[0.78]"
        style={{ objectPosition: imagePosition }}
      />
      <span
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.65) 55%, rgba(0,0,0,0.88) 100%)",
        }}
      />
      <span className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,.34),transparent_42%,rgba(0,0,0,.24))]" />
      <div className="relative flex h-full min-w-0 flex-col justify-end p-4 sm:p-5">
        <div className="min-w-0 max-w-full rounded-3xl border border-white/10 bg-black/50 p-5 shadow-2xl shadow-black/45 backdrop-blur-xl sm:p-6">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/82 drop-shadow-[0_2px_8px_rgba(0,0,0,.8)]">
            {country}
          </p>
          <h3 className="mt-3 max-w-full text-wrap break-words font-sans text-[clamp(2rem,9vw,2.5rem)] font-semibold leading-[0.98] text-white drop-shadow-[0_3px_16px_rgba(0,0,0,.95)] md:text-[clamp(2.05rem,4vw,2.5rem)] xl:text-[clamp(2rem,2.25vw,2.5rem)]">
            {title}
          </h3>
          <p className="mt-4 inline-flex max-w-full flex-wrap items-center gap-1.5 rounded-full border border-white/18 bg-black/45 px-3 py-1 text-[0.78rem] font-medium leading-5 text-white/90 shadow-lg shadow-black/30 backdrop-blur-md">
            <span>{rating}</span>
            <span className="text-white/72">· {reviews} reviews</span>
          </p>
          <p className="mt-4 line-clamp-4 max-w-full text-base font-medium leading-7 text-white/88 drop-shadow-[0_2px_10px_rgba(0,0,0,.88)]">
            {copy}
          </p>
        </div>
      </div>
    </Link>
  );
}

function FeatureStrip() {
  const { t } = useI18n();

  return (
    <section className="mx-auto mt-12 max-w-[1160px] px-4 pb-16 sm:px-5 sm:pb-20">
      <div className="grid overflow-hidden rounded-2xl border border-white/16 bg-white/[0.045] shadow-2xl shadow-black/30 backdrop-blur md:grid-cols-3">
        {features.map((feature, index) => {
          const title = t(feature.titleKey);
          const copy = t(feature.copyKey);

          return (
            <article
              key={feature.titleKey}
              className={`p-6 sm:p-8 md:p-7 xl:p-9 ${
                index > 0 ? "border-t border-white/12 md:border-l md:border-t-0" : ""
              }`}
            >
              <div>
                <p className="mb-5 text-[0.65rem] font-bold uppercase tracking-[0.18em] text-[#d8aa4f]/86">
                  0{index + 1}
                </p>
                <h3 className="font-sans text-[clamp(1.35rem,5vw,1.5rem)] font-medium leading-tight text-white">
                  {title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-white/62">{copy}</p>
                <Link
                  href={routes.explore}
                  className="mt-5 inline-flex border-b border-[#d8aa4f]/50 pb-1 text-sm font-semibold text-[#d8aa4f]"
                >
                  {t("homepage.features.explore")}
                </Link>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

function getHeroTitleParts(prefix: string) {
  const words = prefix.trim().split(/\s+/);

  if (words.length < 2) {
    return { lead: prefix, anchor: "" };
  }

  return {
    lead: words.slice(0, -1).join(" "),
    anchor: words.at(-1) ?? "",
  };
}

export function JourneeWebExperience() {
  const [activeHeroIndex, setActiveHeroIndex] = useState(0);
  const [activeQuoteIndex, setActiveQuoteIndex] = useState(0);
  const { t } = useI18n();
  const activeHero = heroSlides[activeHeroIndex] ?? heroSlides[0];
  const heroTitle = getHeroTitleParts(t("homepage.hero.titlePrefix"));

  useEffect(() => {
    const interval = window.setInterval(() => {
      setActiveHeroIndex((current) => (current + 1) % heroSlides.length);
    }, 7000);

    return () => window.clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setActiveQuoteIndex((current) => (current + 1) % heroQuotes.length);
    }, 7000);

    return () => window.clearInterval(interval);
  }, []);

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#020a0b] text-white">
      <section id="home" className="relative min-h-[690px] overflow-hidden sm:min-h-[740px] lg:min-h-[760px]">
        {heroSlides.map((slide, index) => {
          const isActive = index === activeHeroIndex;
          return (
            <img
              key={slide.label}
              src={slide.image}
              alt=""
              className={`absolute inset-0 h-full w-full object-cover transition-[opacity,transform] duration-[2200ms] ease-out motion-reduce:transition-none ${
                isActive ? "scale-105 opacity-100" : "scale-100 opacity-0"
              }`}
              style={{
                transformOrigin:
                  index % 3 === 0 ? "55% 45%" : index % 3 === 1 ? "45% 55%" : "50% 50%",
              }}
            />
          );
        })}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_68%_35%,rgba(216,170,79,.12),transparent_24%),linear-gradient(90deg,rgba(1,8,9,.9)_0%,rgba(1,8,9,.58)_36%,rgba(1,8,9,.18)_68%,rgba(1,8,9,.58)_100%),linear-gradient(0deg,#020a0b_0%,rgba(2,10,11,.72)_9%,rgba(2,10,11,.05)_42%)]" />

        <HeaderNav />

        <div className="relative z-10 mx-auto grid min-h-[690px] max-w-[1160px] content-center gap-10 px-4 pb-16 pt-28 sm:min-h-[740px] sm:px-5 sm:pt-32 lg:min-h-[760px] xl:grid-cols-[0.9fr_0.42fr] xl:items-center xl:px-0">
          <div className="min-w-0">
            <p className="text-[0.68rem] font-bold uppercase tracking-[0.12em] text-[#d8aa4f] sm:text-[0.78rem] tracking-[0.12em] md:text-[0.86rem] tracking-[0.12em]">
              {t("homepage.hero.eyebrow")}
            </p>
            <h1 className="mt-5 max-w-[660px] text-wrap break-words font-sans text-[clamp(3rem,13vw,4.85rem)] font-extrabold uppercase leading-[0.88] tracking-[-0.04em] text-white sm:mt-6 md:text-[clamp(4.45rem,8.4vw,5.7rem)] xl:text-[clamp(5.05rem,6.35vw,6.35rem)]">
              <span className="block text-[0.88em] font-extrabold tracking-[-0.035em]">{heroTitle.lead}</span>
              {heroTitle.anchor ? <span className="block font-black tracking-[-0.045em]">{heroTitle.anchor}</span> : null}
              <span className="mt-2 block max-w-full normal-case text-[0.58em] font-semibold italic leading-[1.05] tracking-[0.018em] text-[#e4bd68] sm:mt-3">
                {t("homepage.hero.titleAccent")}
              </span>
            </h1>
            <p className="mt-6 max-w-[520px] text-base leading-7 text-white/78 sm:mt-7 sm:text-lg sm:leading-8">
              {t("homepage.hero.body")}
            </p>
            <div className="mt-8 flex flex-col items-stretch gap-4 min-[390px]:flex-row min-[390px]:flex-wrap min-[390px]:items-center sm:gap-5">
              <a
                href="#journeys"
                className="inline-flex items-center justify-center gap-5 rounded-2xl bg-[#d8aa4f] px-6 py-4 text-base font-semibold text-white shadow-xl shadow-[#d8aa4f]/25 transition hover:bg-[#efc76d] sm:gap-8 sm:px-7"
              >
                {t("homepage.hero.primaryCta")}
              </a>
              <a
                href="#recommended"
                className="inline-flex items-center justify-center gap-3 text-sm font-semibold text-white min-[390px]:justify-start"
              >
                <span className="grid h-12 w-12 place-items-center rounded-full border border-white/22 bg-black/22 backdrop-blur">
                  <CirclePlay className="h-5 w-5" />
                </span>
                {t("homepage.hero.secondaryCta")}
              </a>
            </div>
          </div>

          <aside className="hidden justify-self-end rounded-2xl border border-white/18 bg-[#151a14]/72 p-8 shadow-2xl shadow-black/35 backdrop-blur-xl xl:block xl:w-[250px]">
            <p className="font-sans text-4xl leading-none text-[#d8aa4f]">“</p>
            <div className="relative mt-3 min-h-[8rem]">
              {heroQuotes.map((quote, index) => (
                <p
                  key={quote}
                  className={`absolute inset-0 text-base leading-8 text-white/86 transition-opacity duration-700 motion-reduce:transition-none ${
                    index === activeQuoteIndex ? "opacity-100" : "opacity-0"
                  }`}
                  aria-hidden={index !== activeQuoteIndex}
                >
                  {quote}
                </p>
              ))}
            </div>
            <div className="mt-7 border-t border-white/14 pt-5 text-sm font-semibold tracking-[0.14em] text-[#d8aa4f]/88">
              JOURNEE
            </div>
            <div className="mt-5 flex gap-1.5" aria-hidden="true">
              {heroQuotes.map((quote, index) => (
                <span
                  key={quote}
                  className={`h-1 rounded-full transition-all duration-500 ${
                    index === activeQuoteIndex ? "w-7 bg-[#d8aa4f]" : "w-2 bg-white/24"
                  }`}
                />
              ))}
            </div>
          </aside>
        </div>

        <div className="absolute bottom-[7.5rem] left-1/2 z-20 hidden -translate-x-1/2 rounded-full border border-white/14 bg-black/22 px-4 py-2 text-[0.68rem] font-bold uppercase tracking-[0.14em] text-white/78 backdrop-blur-md md:block">
          {activeHero.label} · {activeHero.place}
        </div>
      </section>

      <HeroSearch />
      <section id="journeys" className="mx-auto mt-8 max-w-[1160px] px-4 sm:mt-9 sm:px-5">
        <div className="mb-5 flex items-center justify-between gap-4">
          <h2 className="font-sans text-[clamp(1.75rem,8vw,1.95rem)] font-medium leading-tight text-white sm:text-3xl">
            {t("homepage.discovery.title")}
          </h2>
          <Link
            href={routes.explore}
            className="hidden border-b border-white/24 pb-1 text-sm font-medium text-white/86 sm:inline-flex"
          >
            {t("homepage.discovery.viewAll")}
          </Link>
        </div>
        <div className="-mx-4 flex snap-x gap-4 overflow-x-auto px-4 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:mx-0 sm:grid sm:grid-cols-2 sm:overflow-visible sm:px-0 sm:pb-0 lg:grid-cols-3 xl:grid-cols-6">
          {categories.map((category) => (
            <CategoryCard key={category.titleKey} {...category} />
          ))}
        </div>
      </section>

      <section id="recommended" className="mx-auto mt-12 max-w-[1160px] px-4 sm:px-5">
        <div className="mb-5 flex items-center justify-between gap-4">
          <h2 className="font-sans text-[clamp(1.75rem,8vw,1.95rem)] font-medium leading-tight text-white sm:text-3xl">
            {t("homepage.recommended.title")}
          </h2>
          <Link
            href={routes.country("vietnam")}
            className="hidden border-b border-white/24 pb-1 text-sm font-medium text-white/86 sm:inline-flex"
          >
            {t("homepage.discovery.viewAll")}
          </Link>
        </div>
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {recommended.map((destination) => (
            <DestinationCard key={destination.titleKey} {...destination} />
          ))}
        </div>
      </section>

      <FeatureStrip />
    </main>
  );
}
