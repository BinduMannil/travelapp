/* eslint-disable @next/next/no-img-element */
"use client";

import Link from "next/link";
import { Bell, Heart, Search } from "lucide-react";
import { JourneeBrand } from "@/components/brand/JourneeLogo";
import { MainNavLink } from "@/components/navigation/MainNavLink";
import {
  getUniqueDestinationImage,
  inferImageCategoryFromText,
  resetUsedImagesForPage,
} from "@/lib/imageRotation";
import { mainNavigation, routes } from "@/lib/routes";

const imageSet = {
  hero:
    "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=2600&q=88",
  avatar:
    "https://images.unsplash.com/photo-1526772662000-3f88f10405ff?auto=format&fit=crop&w=200&q=80",
  nature:
    "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=84",
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
    "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1200&q=86",
  lauterbrunnen:
    "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1200&q=86",
  kyoto:
    "https://images.unsplash.com/photo-1528360983277-13d401cdc186?auto=format&fit=crop&w=1200&q=86",
  lofoten:
    "https://images.unsplash.com/photo-1483347756197-71ef80e95f73?auto=format&fit=crop&w=1200&q=86",
};

const navItems = mainNavigation.slice(0, 6);

const categories = [
  { title: "Nature Escapes", count: "124 places", image: imageSet.nature, mark: "mountain" },
  { title: "Cultural Journeys", count: "98 places", image: imageSet.culture, mark: "columns" },
  { title: "Hidden Gems", count: "76 places", image: imageSet.hidden, mark: "diamond" },
  { title: "Adventure", count: "63 places", image: imageSet.adventure, mark: "peak" },
  { title: "Food & Local", count: "54 places", image: imageSet.food, mark: "bowl" },
  { title: "Spiritual", count: "48 places", image: imageSet.spiritual, mark: "lotus" },
];

const destinations = [
  {
    country: "Bali",
    title: "Ubud Indonesia",
    rating: "4.8",
    reviews: "1,248",
    copy: "Rice terraces, temples and peaceful vibes.",
    image: imageSet.ubud,
    href: routes.country("indonesia"),
  },
  {
    country: "Switzerland",
    title: "Lauterbrunnen Valley",
    rating: "4.9",
    reviews: "892",
    copy: "Waterfalls, valleys and alpine beauty.",
    image: imageSet.lauterbrunnen,
    href: routes.country("switzerland"),
  },
  {
    country: "Japan",
    title: "Kyoto Japan",
    rating: "4.8",
    reviews: "1,124",
    copy: "Timeless temples, traditions and culture.",
    image: imageSet.kyoto,
    href: routes.city("kyoto"),
  },
  {
    country: "Norway",
    title: "Lofoten Islands",
    rating: "4.9",
    reviews: "743",
    copy: "Dramatic landscapes and remote beauty.",
    image: imageSet.lofoten,
    href: routes.country("norway"),
  },
];

const features = [
  {
    title: "Curated by locals",
    copy: "Authentic experiences and recommendations from people who call these places home.",
    mark: "globe",
  },
  {
    title: "Travel with confidence",
    copy: "Safety tips, local insights and 24/7 support for worry-free exploration.",
    mark: "shield",
  },
  {
    title: "Save & plan your trips",
    copy: "Save places, build itineraries and organize your journey in one place.",
    mark: "bookmark",
  },
];

function destinationSlugFromTitle(title: string) {
  if (/ubud|bali/i.test(title)) return "bali";
  if (/kyoto/i.test(title)) return "kyoto";
  return title.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

function countrySlugFromLabel(country: string) {
  if (country === "Bali") return "indonesia";
  return country.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

function buildHomeImageAssignments() {
  const usedImages = resetUsedImagesForPage();
  const heroImage = getUniqueDestinationImage({
    destinationSlug: "switzerland",
    countrySlug: "switzerland",
    category: "hero",
    preferredImage: imageSet.hero,
    usedImages,
  });
  const assignedCategories = categories.map((category) => ({
    ...category,
    image: getUniqueDestinationImage({
      destinationSlug: category.title,
      category: inferImageCategoryFromText(category.title),
      preferredImage: category.image,
      usedImages,
    }),
  }));
  const assignedDestinations = destinations.map((destination) => ({
    ...destination,
    image: getUniqueDestinationImage({
      destinationSlug: destinationSlugFromTitle(destination.title),
      countrySlug: countrySlugFromLabel(destination.country),
      category: inferImageCategoryFromText(`${destination.title} ${destination.copy}`),
      preferredImage: destination.image,
      usedImages,
    }),
  }));

  return { heroImage, categories: assignedCategories, destinations: assignedDestinations };
}

function GoldMark({ type, className = "" }: { type: string; className?: string }) {
  const common = {
    fill: "none",
    stroke: "currentColor",
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    strokeWidth: 1.7,
  };

  if (type === "columns") {
    return (
      <svg viewBox="0 0 32 32" aria-hidden="true" className={className}>
        <path {...common} d="M5 13h22M7 25h18M8 13v12M14 13v12M20 13v12M26 13v12M16 5l11 8H5l11-8Z" />
      </svg>
    );
  }

  if (type === "diamond") {
    return (
      <svg viewBox="0 0 32 32" aria-hidden="true" className={className}>
        <path {...common} d="M8 7h16l5 7-13 13L3 14l5-7ZM3 14h26M11 7l5 20M21 7l-5 20" />
      </svg>
    );
  }

  if (type === "bowl") {
    return (
      <svg viewBox="0 0 32 32" aria-hidden="true" className={className}>
        <path {...common} d="M6 15h20c-.6 6.2-4.3 10-10 10S6.6 21.2 6 15ZM10 25h12M12 9c1.8 1.4 1.8 2.8 0 4M18 7c2.2 1.8 2.2 3.8 0 5.6M23 9c1.8 1.4 1.8 2.8 0 4" />
      </svg>
    );
  }

  if (type === "lotus") {
    return (
      <svg viewBox="0 0 32 32" aria-hidden="true" className={className}>
        <path {...common} d="M16 25c-5.8-2.7-8.4-6.5-7.8-11.5 4.2.6 6.8 3.2 7.8 7.8 1-4.6 3.6-7.2 7.8-7.8.6 5-2 8.8-7.8 11.5Z" />
        <path {...common} d="M16 20c-3.3-3.7-3.3-8 0-12 3.3 4 3.3 8.3 0 12ZM5 18c2.8 5 6.5 7.3 11 7M27 18c-2.8 5-6.5 7.3-11 7" />
      </svg>
    );
  }

  if (type === "globe") {
    return (
      <svg viewBox="0 0 32 32" aria-hidden="true" className={className}>
        <circle {...common} cx="16" cy="16" r="11" />
        <path {...common} d="M5 16h22M16 5c3 3.1 4.5 6.8 4.5 11S19 23.9 16 27M16 5c-3 3.1-4.5 6.8-4.5 11S13 23.9 16 27" />
      </svg>
    );
  }

  if (type === "shield") {
    return (
      <svg viewBox="0 0 32 32" aria-hidden="true" className={className}>
        <path {...common} d="M16 4 26 8v7.4c0 6-3.8 10.4-10 12.6C9.8 25.8 6 21.4 6 15.4V8l10-4Z" />
        <path {...common} d="m11.5 16.2 3.1 3.1 6-7" />
      </svg>
    );
  }

  if (type === "bookmark") {
    return (
      <svg viewBox="0 0 32 32" aria-hidden="true" className={className}>
        <path {...common} d="M9 5h14v22l-7-4-7 4V5Z" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 32 32" aria-hidden="true" className={className}>
      <path {...common} d="m4 23 7.5-11 5.2 7.4L21 13l7 10H4Z" />
      <path {...common} d="m18.8 16.2 2.4 3.2 1.8-2.3" />
    </svg>
  );
}

function HomeNavbar() {
  return (
    <header className="absolute inset-x-0 top-0 z-30 px-4 pt-5 sm:px-6 lg:px-10">
      <div className="mx-auto flex max-w-[1168px] items-center justify-between gap-5">
        <Link href={routes.home} className="shrink-0 text-white">
          <JourneeBrand direction="celestial-route" />
        </Link>

        <nav className="hidden items-center gap-9 rounded-full border border-white/[0.06] bg-black/[0.08] px-3 font-sans backdrop-blur-sm lg:flex">
          {navItems.map((item) => (
            <MainNavLink
              key={item.href}
              label={item.label}
              href={item.href}
              className="group relative py-4 text-sm font-medium text-white/86 transition hover:text-white"
              underlineClassName="absolute bottom-2 left-1/2 h-px w-7 -translate-x-1/2 bg-[#d9a947]"
            >
              {item.label}
              <span
                className={`absolute bottom-2 left-1/2 h-px -translate-x-1/2 bg-[#d9a947] transition-all duration-300 ${
                  "w-0 group-hover:w-6"
                }`}
              />
            </MainNavLink>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <button
            type="button"
            aria-label="Search"
            className="hidden h-12 w-12 place-items-center rounded-full border border-white/18 bg-black/12 text-white backdrop-blur-md transition hover:border-[#d9a947]/70 hover:text-[#d9a947] sm:grid"
          >
            <Search className="h-5 w-5" />
          </button>
          <button
            type="button"
            aria-label="Notifications"
            className="relative hidden h-12 w-12 place-items-center rounded-full border border-white/10 bg-black/10 text-white backdrop-blur-md transition hover:border-[#d9a947]/70 hover:text-[#d9a947] sm:grid"
          >
            <Bell className="h-5 w-5" />
            <span className="absolute right-3 top-3 h-2 w-2 rounded-full bg-[#d9a947]" />
          </button>
          <img
            src={imageSet.avatar}
            alt="Profile"
            className="h-11 w-11 rounded-full border border-white/20 object-cover shadow-xl shadow-black/30"
          />
        </div>
      </div>

      <nav className="mx-auto mt-4 flex max-w-[1168px] gap-6 overflow-x-auto border-y border-white/[0.08] bg-black/12 px-1 font-sans backdrop-blur-md [scrollbar-width:none] [&::-webkit-scrollbar]:hidden lg:hidden">
        {navItems.map((item) => (
          <MainNavLink
            key={item.href}
            label={item.label}
            href={item.href}
            className="relative shrink-0 py-3 text-sm font-medium text-white/84"
            underlineClassName="absolute bottom-2 left-0 h-px w-full bg-[#d9a947]"
          >
            {item.label}
          </MainNavLink>
        ))}
      </nav>
    </header>
  );
}

function HomeHero({ heroImage }: { heroImage: string }) {
  return (
    <section className="relative min-h-[760px] overflow-hidden bg-[#020908] sm:min-h-[820px] lg:min-h-[850px]">
      <img
        src={heroImage}
        alt=""
        className="absolute inset-0 h-full w-full object-cover motion-safe:animate-[journeeHeroDrift_18s_ease-in-out_infinite_alternate]"
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_69%_43%,rgba(217,169,71,.11),transparent_25%),linear-gradient(90deg,rgba(2,8,8,.94)_0%,rgba(2,8,8,.76)_26%,rgba(2,8,8,.22)_58%,rgba(2,8,8,.58)_100%),linear-gradient(180deg,rgba(2,8,8,.66)_0%,rgba(2,8,8,.08)_42%,#020908_100%)]" />

      <HomeNavbar />

      <div className="relative z-10 mx-auto grid min-h-[760px] max-w-[1168px] items-center gap-8 px-5 pb-24 pt-40 sm:min-h-[820px] sm:px-8 sm:pt-44 lg:min-h-[850px] lg:grid-cols-[1fr_330px] lg:px-10 lg:pb-28 xl:px-0">
        <div className="max-w-[610px] motion-safe:animate-[journeeFadeUp_.9s_ease-out_both]">
          <p className="font-sans text-[0.78rem] font-bold uppercase tracking-[0.44em] text-[#d9a947]">
            NOT JUST A TRIP,
          </p>
          <h1 className="mt-6 text-balance font-sans text-[clamp(4rem,15vw,7.4rem)] font-semibold leading-[0.9] text-[#fffaf0]">
            Until it
            <span className="block">becomes</span>
            <span className="block italic text-[#d9a947]">a place.</span>
          </h1>
          <p className="mt-7 max-w-[470px] font-sans text-base leading-8 text-white/78 sm:text-lg">
            Journee helps you discover meaningful travel experiences, hidden gems and authentic
            places around the world.
          </p>
          <div className="mt-9 flex flex-col gap-4 min-[390px]:flex-row min-[390px]:items-center">
            <Link
              href={routes.explore}
              className="inline-flex h-14 items-center justify-center rounded-2xl bg-[#d9a947] px-7 font-sans text-sm font-bold text-white shadow-[0_18px_45px_rgba(217,169,71,.28)] transition hover:bg-[#efc66d]"
            >
              Start Exploring
              <span className="ml-8 text-xl leading-none">→</span>
            </Link>
            <Link
              href="#recommended"
              className="inline-flex h-14 items-center gap-3 font-sans text-sm font-semibold text-white"
            >
              <span className="grid h-11 w-11 place-items-center rounded-full border border-white/28 bg-black/20 backdrop-blur-md">
                <span className="ml-0.5 h-0 w-0 border-y-[5px] border-l-[8px] border-y-transparent border-l-white" />
              </span>
              Watch Journee
            </Link>
          </div>
        </div>

        <aside className="hidden rounded-[1.35rem] border border-white/18 bg-[#121713]/64 p-8 shadow-2xl shadow-black/35 backdrop-blur-xl lg:block">
          <p className="font-sans text-5xl leading-none text-[#d9a947]">“</p>
          <p className="mt-4 font-sans text-base leading-8 text-white/86">
            The best journeys answer questions that in the beginning you didn’t even think to ask.
          </p>
          <div className="mt-7 border-t border-white/14 pt-5 font-sans text-sm text-white/70">
            —&nbsp; Unknown
          </div>
        </aside>
      </div>
    </section>
  );
}

function HeroSearchBar() {
  const fields = [
    { label: "Where to?", value: "Anywhere" },
    { label: "Anytime", value: "Add dates" },
    { label: "Travelers", value: "Solo traveler" },
  ];

  return (
    <div className="relative z-20 mx-auto -mt-16 max-w-[968px] px-5 sm:px-8 lg:px-10 xl:px-0">
      <div className="grid gap-3 rounded-[1.65rem] border border-white/20 bg-[#0b1110]/82 p-4 shadow-[0_28px_80px_rgba(0,0,0,.48)] backdrop-blur-2xl md:grid-cols-[1fr_1fr_1fr_auto] md:items-center md:rounded-full md:p-5">
        {fields.map((field, index) => (
          <button
            key={field.label}
            type="button"
            className={`min-w-0 rounded-2xl bg-white/[0.035] px-4 py-3 text-left transition hover:bg-white/[0.06] md:rounded-none md:bg-transparent md:px-7 md:py-0 ${
              index > 0 ? "md:border-l md:border-white/12" : ""
            }`}
          >
            <span className="block font-sans text-xs font-semibold text-white/88">{field.label}</span>
            <span className="mt-1 block truncate font-sans text-base text-white/62">{field.value}</span>
          </button>
        ))}
        <button
          type="button"
          aria-label="Search journeys"
          className="grid h-14 w-full place-items-center rounded-full bg-[#d9a947] text-white shadow-[0_14px_36px_rgba(217,169,71,.28)] transition hover:bg-[#efc66d] md:w-14"
        >
          <Search className="h-6 w-6" />
        </button>
      </div>
    </div>
  );
}

function SectionHeading({ title }: { title: string }) {
  return (
    <div className="mb-5 flex items-center justify-between gap-6">
      <h2 className="font-sans text-[clamp(1.65rem,5vw,2.05rem)] font-medium leading-tight text-[#fffaf0]">
        {title}
      </h2>
      <Link
        href={routes.explore}
        className="shrink-0 font-sans text-sm font-medium text-white/86 transition hover:text-[#d9a947]"
      >
        View all <span className="ml-3 text-lg">›</span>
      </Link>
    </div>
  );
}

function JourneyCategoryRail({ items }: { items: typeof categories }) {
  return (
    <section id="journeys" className="mx-auto mt-10 max-w-[1168px] px-5 sm:px-8 lg:px-10 xl:px-0">
      <SectionHeading title="Find your kind of journey" />
      <div className="-mx-5 flex snap-x gap-4 overflow-x-auto px-5 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:-mx-8 sm:px-8 lg:mx-0 lg:grid lg:grid-cols-6 lg:overflow-visible lg:px-0">
        {items.map((category) => (
          <Link
            key={category.title}
            href={routes.explore}
            className="group relative h-[202px] min-w-[184px] snap-start overflow-hidden rounded-[1.1rem] border border-white/12 bg-white/[0.04] shadow-xl shadow-black/20 transition duration-300 hover:-translate-y-1 hover:border-[#d9a947]/35 lg:min-w-0"
          >
            <img
              src={category.image}
              alt=""
              className="absolute inset-0 h-full w-full object-cover opacity-82 transition duration-700 group-hover:scale-105"
            />
            <span className="absolute inset-0 bg-gradient-to-t from-black/92 via-black/44 to-black/12" />
            <span className="absolute inset-x-0 bottom-0 h-[68%] bg-[radial-gradient(ellipse_at_bottom_left,rgba(0,0,0,.88),rgba(0,0,0,.44)_52%,transparent_78%)]" />
            <span className="relative flex h-full flex-col justify-end p-5">
              <GoldMark type={category.mark} className="mb-4 h-8 w-8 text-[#d9a947]" />
              <strong className="font-sans text-base font-semibold leading-tight text-white drop-shadow-[0_2px_8px_rgba(0,0,0,.9)]">
                {category.title}
              </strong>
              <span className="mt-1 font-sans text-sm text-white/78">{category.count}</span>
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}

function RecommendedDestinations({ items }: { items: typeof destinations }) {
  return (
    <section id="recommended" className="mx-auto mt-12 max-w-[1168px] px-5 sm:px-8 lg:px-10 xl:px-0">
      <SectionHeading title="Recommended for you" />
      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {items.map((destination) => (
          <Link
            key={destination.title}
            href={destination.href}
            className="group relative min-h-[405px] overflow-hidden rounded-[1.2rem] border border-white/13 bg-white/[0.04] shadow-2xl shadow-black/28 transition duration-300 hover:-translate-y-1 hover:border-[#d9a947]/35 sm:min-h-[440px]"
          >
            <img
              src={destination.image}
              alt={destination.title}
              className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105"
            />
            <span className="absolute inset-0 bg-gradient-to-t from-black/96 via-black/55 to-black/8" />
            <span className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full border border-white/24 bg-black/28 text-white backdrop-blur-md">
              <Heart className="h-4 w-4" />
            </span>
            <span className="relative flex h-full flex-col justify-end p-5 sm:p-6">
              <span className="font-sans text-[0.68rem] font-bold uppercase tracking-[0.16em] text-white/78">
                {destination.country}
              </span>
              <strong className="mt-3 max-w-full text-wrap break-words font-sans text-[clamp(2rem,8vw,2.55rem)] font-medium leading-[0.98] text-[#fffaf0] drop-shadow-[0_3px_14px_rgba(0,0,0,.95)] sm:text-[2.2rem]">
                {destination.title}
              </strong>
              <span className="mt-5 flex items-center gap-2 font-sans text-sm text-white/86">
                <span className="text-[#d9a947]">★</span>
                {destination.rating} <span className="text-white/55">({destination.reviews})</span>
              </span>
              <span className="mt-4 max-w-[16rem] font-sans text-sm leading-6 text-white/84">
                {destination.copy}
              </span>
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}

function FeatureStrip() {
  return (
    <section className="mx-auto mt-14 max-w-[1168px] px-5 pb-16 sm:px-8 sm:pb-20 lg:px-10 xl:px-0">
      <div className="grid overflow-hidden rounded-[1.25rem] border border-white/13 bg-white/[0.045] shadow-2xl shadow-black/28 backdrop-blur-xl md:grid-cols-3">
        {features.map((feature, index) => (
          <article
            key={feature.title}
            className={`p-7 sm:p-9 ${index > 0 ? "border-t border-white/10 md:border-l md:border-t-0" : ""}`}
          >
            <div className="flex gap-6">
              <GoldMark type={feature.mark} className="mt-1 h-10 w-10 shrink-0 text-[#d9a947]" />
              <div>
                <h3 className="font-sans text-[1.45rem] font-medium leading-tight text-[#fffaf0]">
                  {feature.title}
                </h3>
                <p className="mt-3 max-w-[18rem] font-sans text-sm leading-6 text-white/62">{feature.copy}</p>
                <Link
                  href={routes.explore}
                  className="mt-5 inline-flex items-center font-sans text-sm font-semibold text-[#d9a947] transition hover:text-[#efc66d]"
                >
                  Explore <span className="ml-3">→</span>
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export function JourneeWebExperience() {
  const homeImages = buildHomeImageAssignments();

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#020908] font-sans text-white">
      <style>
        {`
          @keyframes journeeHeroDrift {
            from { transform: scale(1.02) translate3d(0, 0, 0); }
            to { transform: scale(1.09) translate3d(-1.2%, -0.8%, 0); }
          }
          @keyframes journeeFadeUp {
            from { opacity: 0; transform: translateY(18px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}
      </style>
      <HomeHero heroImage={homeImages.heroImage} />
      <HeroSearchBar />
      <JourneyCategoryRail items={homeImages.categories} />
      <RecommendedDestinations items={homeImages.destinations} />
      <FeatureStrip />
    </main>
  );
}
