/* eslint-disable @next/next/no-img-element */
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Bell, CirclePlay, Search } from "lucide-react";
import { JourneeBrand } from "@/components/brand/JourneeLogo";
import { useI18n } from "@/lib/i18n/context";
import { LanguagePicker } from "@/components/layout/LanguagePicker";
import { PreferencesMenu } from "@/components/layout/PreferencesMenu";

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
  kyoto:
    "https://images.unsplash.com/photo-1528360983277-13d401cdc186?auto=format&fit=crop&w=1100&q=86",
  lofoten:
    "https://images.unsplash.com/photo-1483347756197-71ef80e95f73?auto=format&fit=crop&w=1100&q=86",
  avatar:
    "https://images.unsplash.com/photo-1526772662000-3f88f10405ff?auto=format&fit=crop&w=200&q=80",
};

const heroSlides = [
  { label: "Alpine lake", image: images.hero },
  { label: "Desert road", image: images.desert },
  { label: "Kyoto sunset", image: images.kyoto },
  { label: "Tropical waterfall", image: images.waterfall },
  { label: "Coastal island", image: images.coast },
  { label: "Night city", image: images.nightCity },
  { label: "Northern lights", image: images.lofoten },
];

const heroQuotes = [
  "The best journeys answer questions you did not know to ask.",
  "A place becomes real when you know how it feels.",
  "Travel starts long before the ticket.",
  "Go where the map feels unfinished.",
  "The quiet details usually lead to the best days.",
  "Some places are planned. Others are found.",
];

const navItems = ["Home", "Explore", "Map", "Trips", "Guides", "Journal"];

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
    countryKey: "homepage.recommended.bali",
    titleKey: "homepage.recommended.ubud",
    rating: "4.8",
    reviews: "1,248",
    copyKey: "homepage.recommended.ubudCopy",
    image: images.ubud,
    href: "/discover",
    overlay: "from-black/96 via-black/68 to-transparent",
  },
  {
    countryKey: "homepage.recommended.switzerland",
    titleKey: "homepage.recommended.lauterbrunnen",
    rating: "4.9",
    reviews: "892",
    copyKey: "homepage.recommended.lauterbrunnenCopy",
    image: images.swiss,
    href: "/discover",
    overlay: "from-black/94 via-black/58 to-transparent",
  },
  {
    countryKey: "homepage.recommended.japan",
    titleKey: "homepage.recommended.kyoto",
    rating: "4.8",
    reviews: "1,124",
    copyKey: "homepage.recommended.kyotoCopy",
    image: images.kyoto,
    href: "/country/japan",
    overlay: "from-black/95 via-black/64 to-transparent",
  },
  {
    countryKey: "homepage.recommended.norway",
    titleKey: "homepage.recommended.lofoten",
    rating: "4.9",
    reviews: "743",
    copyKey: "homepage.recommended.lofotenCopy",
    image: images.lofoten,
    href: "/discover",
    overlay: "from-black/92 via-black/54 to-transparent",
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

function HeaderNav() {
  const { t } = useI18n();
  const navLabels: Record<string, string> = {
    Home: t("navigation.home"),
    Explore: t("navigation.explore"),
    Map: t("navigation.map"),
    Trips: t("navigation.trips"),
    Guides: t("navigation.guides"),
    Journal: t("navigation.journal"),
  };

  return (
    <header className="absolute inset-x-0 top-0 z-30">
      <div className="mx-auto flex max-w-[1160px] items-center justify-between px-4 py-5 sm:px-5 sm:py-7 xl:px-0">
        <Link href="/" className="flex min-w-0 items-center gap-3 text-white">
          <JourneeBrand direction="celestial-route" />
        </Link>

        <nav className="hidden items-center gap-8 text-sm font-medium text-white/86 xl:flex">
          {navItems.map((item) => (
            <a
              key={item}
              href={item === "Home" ? "#home" : `#${item.toLowerCase()}`}
              className={`relative transition hover:text-white ${
                item === "Home" ? "text-white" : ""
              }`}
            >
              {navLabels[item]}
              {item === "Home" && (
                <span className="absolute -bottom-5 left-1/2 h-px w-8 -translate-x-1/2 bg-[#d8aa4f]" />
              )}
            </a>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-2 sm:gap-4">
          <button
            type="button"
            aria-label="Search"
            className="grid h-10 w-10 place-items-center rounded-full border border-white/18 bg-black/18 text-white backdrop-blur sm:h-12 sm:w-12"
          >
            <Search className="h-5 w-5" />
          </button>
          <button
            type="button"
            aria-label="Notifications"
            className="relative hidden h-11 w-11 place-items-center rounded-full text-white sm:grid"
          >
            <Bell className="h-5 w-5" />
            <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-[#d8aa4f]" />
          </button>
          <img
            src={images.avatar}
            alt=""
            className="h-10 w-10 rounded-full border border-white/20 object-cover sm:h-12 sm:w-12"
          />
          <details className="group relative hidden sm:block">
            <summary className="grid h-10 w-10 cursor-pointer list-none place-items-center rounded-full border border-white/18 bg-black/18 text-white backdrop-blur transition hover:border-[#d8aa4f]/60 hover:text-[#d8aa4f] [&::-webkit-details-marker]:hidden">
              <span className="sr-only">{t("navigation.openPreferences")}</span>
              <span className="text-[0.6rem] font-bold uppercase tracking-[0.12em]">
                Prefs
              </span>
            </summary>
            <div className="absolute right-0 top-[calc(100%+12px)] w-[min(88vw,34rem)] rounded-[1.2rem] border border-white/16 bg-[#081011]/94 p-4 shadow-2xl shadow-black/45 backdrop-blur-2xl">
              <p className="mb-3 text-[0.65rem] font-bold uppercase tracking-[0.12em] text-[#d8aa4f]">
                {t("settings.travelPreferences")}
              </p>
              <div className="grid gap-3">
                <LanguagePicker compact />
                <PreferencesMenu compact />
              </div>
            </div>
          </details>
        </div>
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
    <a
      href="#recommended"
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
    </a>
  );
}

function DestinationCard({
  countryKey,
  titleKey,
  rating,
  reviews,
  copyKey,
  image,
  href,
  overlay,
}: (typeof recommended)[number]) {
  const { t } = useI18n();
  const country = t(countryKey);
  const title = t(titleKey);
  const copy = t(copyKey);

  return (
    <Link
      href={href}
      className="group relative min-h-[360px] overflow-hidden rounded-2xl border border-white/16 bg-white/[0.04] shadow-2xl shadow-black/30 sm:min-h-[400px]"
    >
      <img
        src={image}
        alt=""
        className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105"
      />
      <span className={`absolute inset-x-0 bottom-0 h-[82%] bg-gradient-to-t ${overlay}`} />
      <span className="absolute inset-x-0 bottom-0 h-[58%] bg-[radial-gradient(ellipse_at_bottom_left,rgba(0,0,0,.9),rgba(0,0,0,.52)_48%,transparent_78%)]" />
      <span className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-black/34 to-transparent" />
      <div className="relative flex h-full min-w-0 flex-col justify-end p-4 sm:p-6">
        <div className="min-w-0 max-w-full rounded-[1.25rem] border border-white/10 bg-black/[0.18] p-4 shadow-2xl shadow-black/35 backdrop-blur-[2px] sm:rounded-[1.35rem]">
          <p className="text-[0.65rem] font-bold uppercase tracking-[0.12em] text-white/88 drop-shadow-[0_2px_8px_rgba(0,0,0,.85)]">
            {country}
          </p>
          <h3 className="mt-3 max-w-full text-wrap break-words pr-3 font-sans text-[clamp(1.72rem,8vw,2.35rem)] font-medium leading-[1.05] text-white drop-shadow-[0_3px_14px_rgba(0,0,0,.92)] md:text-[clamp(1.85rem,3.2vw,2.35rem)] xl:text-[clamp(1.75rem,2.1vw,2.35rem)]">
            {title}
          </h3>
          <p className="mt-4 inline-flex max-w-full flex-wrap items-center gap-2 rounded-full border border-white/14 bg-black/36 px-3 py-1.5 text-sm font-medium text-white/90 shadow-lg shadow-black/30 backdrop-blur-sm">
            <span>{rating}</span>
            <span className="text-white/72">· {reviews} reviews</span>
          </p>
          <p className="mt-4 max-w-full pr-2 text-base font-medium leading-6 text-white/92 drop-shadow-[0_2px_10px_rgba(0,0,0,.85)]">
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
                <a
                  href="#recommended"
                  className="mt-5 inline-flex border-b border-[#d8aa4f]/50 pb-1 text-sm font-semibold text-[#d8aa4f]"
                >
                  {t("homepage.features.explore")}
                </a>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

export function JourneeWebExperience() {
  const [activeHeroIndex, setActiveHeroIndex] = useState(0);
  const [activeQuoteIndex, setActiveQuoteIndex] = useState(0);
  const { t } = useI18n();

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
            <h1 className="mt-5 max-w-[650px] text-wrap break-words font-sans text-[clamp(3.2rem,15.5vw,5.4rem)] font-semibold leading-[0.91] tracking-[-0.025em] text-white sm:mt-6 md:text-[clamp(5rem,10vw,6.35rem)] xl:text-[clamp(5.8rem,7.6vw,7.3rem)]">
              {t("homepage.hero.titlePrefix")}{" "}
              <span className="block italic text-[#d8aa4f]">{t("homepage.hero.titleAccent")}</span>
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

        <div className="absolute bottom-28 left-1/2 z-20 hidden -translate-x-1/2 items-center gap-2 md:flex">
          {heroSlides.map((slide, index) => (
            <button
              key={slide.label}
              type="button"
              aria-label={`Show ${slide.label}`}
              onClick={() => setActiveHeroIndex(index)}
              className={`h-1.5 rounded-full transition-all duration-500 ${
                index === activeHeroIndex
                  ? "w-10 bg-[#d8aa4f]"
                  : "w-4 bg-white/28 hover:bg-white/52"
              }`}
            />
          ))}
        </div>
      </section>

      <HeroSearch />

      <section id="journeys" className="mx-auto mt-8 max-w-[1160px] px-4 sm:mt-9 sm:px-5">
        <div className="mb-5 flex items-center justify-between gap-4">
          <h2 className="font-sans text-[clamp(1.75rem,8vw,1.95rem)] font-medium leading-tight text-white sm:text-3xl">
            {t("homepage.discovery.title")}
          </h2>
          <a
            href="#recommended"
            className="hidden border-b border-white/24 pb-1 text-sm font-medium text-white/86 sm:inline-flex"
          >
            {t("homepage.discovery.viewAll")}
          </a>
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
            href="/discover"
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
