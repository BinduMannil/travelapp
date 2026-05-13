"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import {
  ArrowRight,
  Bell,
  Bookmark,
  Bus,
  CalendarDays,
  Camera,
  ChevronRight,
  Coins,
  CreditCard,
  Landmark,
  Search,
  ShieldCheck,
  Sparkles,
  Train,
  Trash2,
  Utensils,
  WalletCards,
} from "lucide-react";
import { CityMapPreview } from "@/components/atlas/CityMapPreview";
import { JourneeBrand } from "@/components/brand/JourneeLogo";
import { MainNavLink } from "@/components/navigation/MainNavLink";
import {
  DestinationAtmosphereProvider,
  DestinationMotionLayer,
  DestinationThemeOverlay,
  getAtmosphereThemeForRender,
} from "@/components/destination/DestinationAtmosphere";
import type { CityDestinationPageData } from "@/lib/city/city-destination-data";
import {
  useTravelPreferences,
  type DistanceUnit,
  type TempUnit,
} from "@/lib/preferences/context";
import {
  getUniqueDestinationImage,
  inferImageCategoryFromText,
  resetUsedImagesForPage,
} from "@/lib/imageRotation";
import { primaryNavigation, routes, slugifyRouteSegment } from "@/lib/routes";

const SAVED_TRIPS_STORAGE_KEY = "journee-saved-trips";

const iconMap = {
  budget: WalletCards,
  calendar: CalendarDays,
  camera: Camera,
  cash: CreditCard,
  culture: Landmark,
  etiquette: Sparkles,
  food: Utensils,
  safety: ShieldCheck,
  transport: Train,
  bus: Bus,
  tipping: Coins,
  trash: Trash2,
} as const;

const compactCurrencies = ["AED", "USD", "EUR", "GBP", "JPY", "SGD"] as const;

type CityImageAssignments = {
  heroImages: NonNullable<CityDestinationPageData["heroImages"]>;
  why: string;
  moods: string[];
  itinerary: string[];
  hiddenGems: string[];
  safety: string;
};

function buildCityImageAssignments(data: CityDestinationPageData): CityImageAssignments {
  const usedImages = resetUsedImagesForPage();
  const countrySlug = countrySlugFromName(data.country);
  const baseHeroImages =
    data.heroImages && data.heroImages.length > 0
      ? data.heroImages
      : [{ src: data.images.hero, alt: `${data.city} cinematic city skyline`, mood: "City" }];

  return {
    heroImages: baseHeroImages.map((image) => ({
      ...image,
      src: getUniqueDestinationImage({
        destinationSlug: data.slug,
        countrySlug,
        category: inferImageCategoryFromText(image.mood),
        preferredImage: image.src,
        usedImages,
      }),
    })),
    why: getUniqueDestinationImage({
      destinationSlug: data.slug,
      countrySlug,
      category: inferImageCategoryFromText(`${data.why.headline} ${data.why.copy}`),
      preferredImage: data.why.image,
      usedImages,
    }),
    moods: data.moods.map((mood) =>
      getUniqueDestinationImage({
        destinationSlug: data.slug,
        countrySlug,
        category: inferImageCategoryFromText(mood.title),
        preferredImage: mood.image,
        usedImages,
      }),
    ),
    itinerary: data.itinerary.map((day) =>
      getUniqueDestinationImage({
        destinationSlug: data.slug,
        countrySlug,
        category: inferImageCategoryFromText(`${day.day} ${day.title} ${day.stops.join(" ")}`),
        preferredImage: day.image,
        usedImages,
      }),
    ),
    hiddenGems: data.hiddenGems.map((gem) =>
      getUniqueDestinationImage({
        destinationSlug: data.slug,
        countrySlug,
        category: inferImageCategoryFromText(`${gem.title} ${gem.place} ${gem.copy}`),
        preferredImage: gem.image,
        usedImages,
      }),
    ),
    safety: getUniqueDestinationImage({
      destinationSlug: data.slug,
      countrySlug,
      category: "nightlife",
      preferredImage: data.safety.image,
      usedImages,
    }),
  };
}

function PreferenceGroup({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="grid gap-2">
      <p className="text-[0.66rem] font-semibold uppercase tracking-[0.14em] text-white/58">
        {label}
      </p>
      {children}
    </div>
  );
}

function SegmentButton({
  active,
  children,
  onClick,
}: {
  active: boolean;
  children: ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={`min-h-8 rounded-full px-3 py-1.5 text-[0.72rem] font-semibold tracking-[0.04em] transition ${
        active
          ? "bg-[#d8aa4f] text-[#120f0a] shadow-[0_10px_24px_rgba(216,170,79,.22)]"
          : "text-white/74 hover:bg-white/[0.08] hover:text-white"
      }`}
    >
      {children}
    </button>
  );
}

function UnitsCurrencyDropdown() {
  const {
    currency,
    setCurrency,
    tempUnit,
    setTempUnit,
    distanceUnit,
    setDistanceUnit,
  } = useTravelPreferences();

  return (
    <div className="absolute right-0 top-[calc(100%+0.75rem)] z-50 w-[min(calc(100vw-2rem),18rem)] rounded-2xl border border-[#d8aa4f]/35 bg-[#090d0d]/86 p-4 text-white shadow-2xl shadow-black/50 backdrop-blur-2xl">
      <p className="text-sm font-semibold tracking-[-0.01em] text-white">
        Units & Currency
      </p>

      <div className="mt-4 grid gap-4">
        <PreferenceGroup label="Currency">
          <div className="grid grid-cols-3 gap-1.5 rounded-[1.15rem] border border-white/10 bg-black/24 p-1.5">
            {compactCurrencies.map((option) => (
              <SegmentButton
                key={option}
                active={currency === option}
                onClick={() => setCurrency(option)}
              >
                {option}
              </SegmentButton>
            ))}
          </div>
        </PreferenceGroup>

        <PreferenceGroup label="Temperature">
          <div className="grid grid-cols-2 gap-1.5 rounded-full border border-white/10 bg-black/24 p-1.5">
            {[
              ["c", "°C"],
              ["f", "°F"],
            ].map(([value, label]) => (
              <SegmentButton
                key={value}
                active={tempUnit === value}
                onClick={() => setTempUnit(value as TempUnit)}
              >
                {label}
              </SegmentButton>
            ))}
          </div>
        </PreferenceGroup>

        <PreferenceGroup label="Distance">
          <div className="grid grid-cols-2 gap-1.5 rounded-full border border-white/10 bg-black/24 p-1.5">
            {[
              ["km", "KM"],
              ["mi", "MI"],
            ].map(([value, label]) => (
              <SegmentButton
                key={value}
                active={distanceUnit === value}
                onClick={() => setDistanceUnit(value as DistanceUnit)}
              >
                {label}
              </SegmentButton>
            ))}
          </div>
        </PreferenceGroup>
      </div>
    </div>
  );
}

function SectionKicker({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[0.68rem] font-bold uppercase tracking-[0.12em]" style={{ color: "var(--destination-primary)" }}>
      {children}
    </p>
  );
}

function ImageBackdrop({
  src,
  alt,
  className = "",
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes="(min-width: 1024px) 33vw, 100vw"
      className={`z-0 object-cover ${className}`}
    />
  );
}

function usePrefersReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    function handleChange() {
      setPrefersReducedMotion(mediaQuery.matches);
    }

    handleChange();
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  return prefersReducedMotion;
}

function HeaderNav({ avatar }: { avatar: string }) {
  const [preferencesOpen, setPreferencesOpen] = useState(false);
  const avatarMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!preferencesOpen) return;

    function handlePointerDown(event: PointerEvent) {
      if (
        avatarMenuRef.current &&
        !avatarMenuRef.current.contains(event.target as Node)
      ) {
        setPreferencesOpen(false);
      }
    }

    document.addEventListener("pointerdown", handlePointerDown);
    return () => document.removeEventListener("pointerdown", handlePointerDown);
  }, [preferencesOpen]);

  return (
    <header className="absolute inset-x-0 top-0 z-40">
      <div className="mx-auto flex max-w-[1180px] items-center justify-between px-5 py-6 xl:px-0">
        <Link href="/" aria-label="JOURNEE home">
          <JourneeBrand direction="atlas-aperture" className="[&>span:first-child]:h-8 [&>span:first-child]:w-8 [&>span:first-child]:border-0 [&>span:first-child]:bg-transparent [&>span:first-child]:shadow-none [&>span:first-child_svg]:h-6 [&>span:first-child_svg]:w-6 [&>span:last-child]:text-xl [&>span:last-child]:tracking-[0.12em]" />
        </Link>

        <nav className="hidden items-center gap-8 text-[0.78rem] font-semibold text-white/86 lg:flex">
          {primaryNavigation.slice(0, 6).map((item) => (
            <MainNavLink
              key={item.label}
              label={item.label}
              href={item.href}
              className="transition hover:text-[#f0c96e]"
              activeClassName="text-[#f0c96e]"
            />
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <button
            type="button"
            aria-label="Search"
            className="grid h-10 w-10 place-items-center rounded-full text-white transition hover:bg-white/10"
          >
            <Search className="h-5 w-5" strokeWidth={1.6} />
          </button>
          <button
            type="button"
            aria-label="Notifications"
            className="hidden h-10 w-10 place-items-center rounded-full text-white transition hover:bg-white/10 sm:grid"
          >
            <Bell className="h-5 w-5" strokeWidth={1.6} />
          </button>
          <div ref={avatarMenuRef} className="relative">
            <button
              type="button"
              aria-label="Open units and currency preferences"
              aria-expanded={preferencesOpen}
              onClick={() => setPreferencesOpen((open) => !open)}
              className="block rounded-full outline-none transition focus:ring-2 focus:ring-[#d8aa4f]/55"
            >
              <Image
                src={avatar}
                alt="Profile avatar"
                width={40}
                height={40}
                className="h-10 w-10 rounded-full border border-[#d8aa4f]/45 object-cover"
              />
            </button>
            {preferencesOpen ? <UnitsCurrencyDropdown /> : null}
          </div>
        </div>
      </div>
    </header>
  );
}

function countrySlugFromName(country: string) {
  return country.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

function HeroSection({ data, images }: { data: CityDestinationPageData; images: CityImageAssignments }) {
  const atmosphereTheme = getAtmosphereThemeForRender({
    destinationSlug: data.slug,
    destinationType: "city",
    countrySlug: countrySlugFromName(data.country),
  });
  const heroImages = images.heroImages;
  const [activeHeroIndex, setActiveHeroIndex] = useState(0);
  const prefersReducedMotion = usePrefersReducedMotion();
  const activeHero = heroImages[activeHeroIndex] ?? heroImages[0];

  useEffect(() => {
    if (prefersReducedMotion || heroImages.length < 2) return;

    const interval = window.setInterval(() => {
      setActiveHeroIndex((index) => (index + 1) % heroImages.length);
    }, 7000);

    return () => window.clearInterval(interval);
  }, [heroImages.length, prefersReducedMotion]);

  return (
    <section className="relative isolate min-h-[820px] overflow-hidden bg-[#050807] pt-28 text-white lg:min-h-[660px]">
      <div className="absolute inset-0 z-0 bg-[#050807]">
        {heroImages.map((image, index) => (
          <Image
            key={`${image.src}-${image.mood}`}
            src={image.src}
            alt={image.alt}
            fill
            priority={index === 0}
            sizes="100vw"
            className={`object-cover transition-opacity duration-[1800ms] ease-out ${
              index === activeHeroIndex ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}
      </div>
      <DestinationThemeOverlay theme={atmosphereTheme} className="z-[1]" />
      <DestinationMotionLayer theme={atmosphereTheme} className="z-[2]" />
      <div className="absolute inset-0 z-[3] bg-[linear-gradient(90deg,rgba(1,4,4,.94)_0%,rgba(1,4,4,.76)_28%,rgba(1,4,4,.46)_54%,rgba(1,4,4,.72)_100%)]" />
      <div className="absolute inset-0 z-[4] bg-[linear-gradient(180deg,rgba(1,4,4,.42)_0%,rgba(1,4,4,.16)_34%,rgba(1,4,4,.74)_70%,#050807_100%)]" />
      <div className="absolute inset-0 z-[5] bg-[radial-gradient(circle_at_50%_28%,transparent_0%,rgba(0,0,0,.16)_42%,rgba(0,0,0,.58)_100%),radial-gradient(circle_at_72%_24%,var(--destination-glow),transparent_30%),radial-gradient(circle_at_18%_82%,rgba(126,35,24,.22),transparent_34%)]" />

      <HeaderNav avatar={data.images.avatar} />

      <div className="relative z-10 mx-auto grid max-w-[1180px] gap-10 px-5 pb-16 pt-24 lg:grid-cols-[1fr_300px] lg:items-center lg:px-0 lg:pt-32">
        <div className="max-w-2xl">
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border bg-black/28 px-3 py-1.5 text-[0.62rem] font-semibold uppercase tracking-[0.12em] shadow-[0_12px_36px_rgba(0,0,0,.28)] backdrop-blur-md" style={{ borderColor: "var(--destination-card-border)", color: "var(--destination-primary)" }}>
            <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: "var(--destination-primary)" }} />
            {activeHero.mood}
          </div>
          <p className="text-xs font-bold uppercase tracking-[0.12em]" style={{ color: "var(--destination-primary)" }}>
            {data.country}
          </p>
          <h1 className="mt-4 font-sans text-[4.8rem] font-extrabold leading-[0.86] text-[#fff7e5] drop-shadow-[0_18px_50px_rgba(0,0,0,.7)] sm:text-[7rem] lg:text-[8rem]">
            {data.city}
          </h1>
          <p className="mt-8 max-w-xl text-base leading-8 text-white/88 sm:text-lg">
            {data.description}
          </p>

          <div className="mt-6 flex flex-wrap gap-2.5">
            {data.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-md border border-white/20 bg-black/28 px-4 py-2 text-[0.72rem] font-semibold text-white/88 shadow-[0_1px_0_rgba(255,255,255,.1)_inset] backdrop-blur"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <button className="inline-flex h-14 items-center justify-center gap-3 rounded-xl px-7 text-sm font-bold text-[#1b1307] shadow-[0_18px_50px_rgba(216,170,79,.24)] transition" style={{ backgroundColor: "var(--destination-primary)" }}>
              Plan Your Journey <ArrowRight className="h-4 w-4" />
            </button>
            <button className="inline-flex h-14 items-center justify-center gap-3 rounded-xl border border-white/30 bg-black/22 px-7 text-sm font-semibold text-white backdrop-blur transition hover:border-[var(--destination-card-border)] hover:text-[var(--destination-primary)]">
              <Bookmark className="h-4 w-4" /> Save Destination
            </button>
          </div>
        </div>

        <aside className="rounded-3xl border border-white/16 bg-[#0a1110]/72 p-6 shadow-[0_24px_90px_rgba(0,0,0,.45)] backdrop-blur-2xl">
          <p className="text-[0.62rem] font-bold uppercase tracking-[0.12em] text-white/48">
            Destination Score
          </p>
          <div className="mt-3 flex items-end gap-3">
            <span className="font-sans text-5xl font-bold text-[#f1c56d]">
              {data.score.overall}
            </span>
            <span className="pb-2 text-sm font-semibold text-white/70">
              <span className="block tracking-[0.08em]" style={{ color: "var(--destination-primary)" }}>★★★★★</span>
              Premium city index
            </span>
          </div>
          <div className="mt-5 space-y-3 border-y border-white/10 py-4">
            {[data.score.globalRating, data.score.journeeRating].map((rating) => (
              <div key={rating.label}>
                <p className="text-[0.68rem] font-bold uppercase tracking-[0.12em] text-white/58">
                  {rating.label}
                </p>
                <p className="mt-1 text-xs font-medium leading-5 text-white/72">
                  {rating.description}
                </p>
              </div>
            ))}
          </div>
          <div className="mt-5 space-y-4">
            {data.score.rows.map((row) => {
              const Icon = iconMap[row.icon];
              return (
                <div key={row.label} className="flex items-center justify-between gap-4 text-sm">
                  <span className="inline-flex items-center gap-3 text-white/78">
                    <Icon className="h-4 w-4 text-white/68" strokeWidth={1.7} />
                    {row.label}
                  </span>
                  <span className="font-semibold text-white/86">{row.value}</span>
                </div>
              );
            })}
          </div>
        </aside>
      </div>
    </section>
  );
}

function IntelligenceStrip({ data }: { data: CityDestinationPageData }) {
  return (
    <section className="relative z-20 -mt-12 px-5">
      <div className="mx-auto grid max-w-[1180px] gap-3 sm:grid-cols-2 lg:grid-cols-6">
        {data.intelligence.map(({ title, value, detail, icon }) => {
          const Icon = iconMap[icon];
          return (
            <div
              key={title}
              className="rounded-2xl border border-white/12 bg-[#08110f]/78 p-5 shadow-[0_18px_60px_rgba(0,0,0,.28)] backdrop-blur-2xl"
            >
              <Icon className="h-6 w-6 text-[#d8aa4f]" strokeWidth={1.45} />
              <p className="mt-3 text-[0.62rem] font-bold uppercase tracking-[0.12em] text-white/45">
                {title}
              </p>
              <p className="mt-1 text-sm font-bold text-[#fff7e5]">{value}</p>
              <p className="text-xs font-medium text-white/62">{detail}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}

function WhyCity({ data, image }: { data: CityDestinationPageData; image: string }) {
  return (
    <section className="mx-auto grid max-w-[1180px] gap-9 px-5 pt-24 lg:grid-cols-[0.42fr_0.58fr] lg:items-center lg:px-0">
      <div>
        <SectionKicker>Why {data.city}</SectionKicker>
        <h2 className="mt-4 font-sans text-4xl font-semibold leading-[1.08] text-[#fff7e5] md:text-6xl">
          {data.why.headline}
        </h2>
        <p className="mt-6 max-w-md text-sm leading-7 text-white/66">
          {data.why.copy}
        </p>
        <Link href="#moods" className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-[#d8aa4f]">
          Explore {data.city} by mood <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
      <div className="relative min-h-[340px] overflow-hidden rounded-3xl border border-white/12 bg-[#111] shadow-[0_24px_100px_rgba(0,0,0,.4)] md:min-h-[430px]">
        <ImageBackdrop src={image} alt={`${data.city} atmospheric travel scene`} />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(4,8,7,.72),transparent_44%,rgba(216,170,79,.12)),linear-gradient(0deg,rgba(3,6,5,.45),transparent_55%)]" />
        <div className="absolute left-8 top-8 h-24 w-24 rounded-full bg-[#d8aa4f]/10 blur-3xl" />
      </div>
    </section>
  );
}

function MoodCards({ data, images }: { data: CityDestinationPageData; images: string[] }) {
  return (
    <section id="moods" className="mx-auto max-w-[1180px] px-5 pt-16 lg:px-0">
      <SectionKicker>Explore {data.city} by Mood</SectionKicker>
      <div className="mt-5 grid auto-rows-fr gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        {data.moods.map(({ title, count }, index) => (
          <article
            key={title}
            className="group relative flex min-h-[230px] h-full overflow-hidden rounded-2xl border border-white/12 bg-white/[0.04] shadow-[0_22px_80px_rgba(0,0,0,.28)] transition duration-500 hover:-translate-y-1 hover:border-[#d8aa4f]/42"
          >
            <ImageBackdrop
              src={images[index] ?? data.images.hero}
              alt={title}
              className="brightness-[0.76] saturate-[0.86] contrast-[1.04] transition duration-700 group-hover:scale-105 group-hover:brightness-[0.88] group-hover:saturate-[0.92]"
            />
            <div
              className="absolute inset-0 z-10"
              style={{
                background:
                  "linear-gradient(180deg, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0.25) 35%, rgba(0,0,0,0.72) 75%, rgba(0,0,0,0.92) 100%)",
              }}
            />
            <div className="absolute inset-x-0 bottom-0 z-20 p-4 pt-14">
              <div className="rounded-xl border border-white/10 bg-black/34 p-3 shadow-2xl shadow-black/35 backdrop-blur-md">
                <h3 className="flex min-h-[2.6rem] items-end text-base font-semibold leading-[1.12] text-white drop-shadow-[0_2px_12px_rgba(0,0,0,.95)]">
                  {title}
                </h3>
                <p className="mt-2 text-[0.66rem] font-semibold uppercase tracking-[0.1em] text-[#e4bd68]/88 drop-shadow-[0_1px_8px_rgba(0,0,0,.85)]">
                  {count}
                </p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function ItinerarySection({ data, images }: { data: CityDestinationPageData; images: string[] }) {
  return (
    <section className="mx-auto max-w-[1180px] px-5 pt-16 lg:px-0">
      <SectionKicker>Explore 3-Day {data.city} Itinerary</SectionKicker>
      <div className="mt-5 grid gap-5 lg:grid-cols-3">
        {data.itinerary.map((day, index) => (
          <Link
            key={day.day}
            href={routes.cityItineraryDay(data.slug, `day-${index + 1}`)}
            aria-label={`Open ${data.city} itinerary ${day.day}: ${day.title}`}
            className="group relative min-h-[230px] overflow-hidden rounded-2xl border border-white/12 bg-[#0a1110] transition hover:border-[#d8aa4f]/55 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#d8aa4f]"
          >
            <ImageBackdrop src={images[index] ?? data.images.hero} alt={day.title} />
            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(2,6,6,.94),rgba(2,6,6,.54)_54%,rgba(2,6,6,.18)),linear-gradient(0deg,rgba(2,6,6,.45),transparent)]" />
            <div className="relative z-10 p-6">
              <p className="text-[0.68rem] font-bold uppercase tracking-[0.12em] text-[#d8aa4f]">{day.day}</p>
              <h3 className="mt-4 max-w-[14rem] font-sans text-2xl font-semibold leading-[1.1] text-[#fff7e5]">
                {day.title}
              </h3>
              <ul className="mt-5 space-y-1.5 text-xs font-medium text-white/74">
                {day.stops.map((stop) => (
                  <li key={stop} className="flex gap-2">
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[#d8aa4f]" />
                    {stop}
                  </li>
                ))}
              </ul>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

function AtlasSection({ data }: { data: CityDestinationPageData }) {
  return (
    <section className="mx-auto max-w-[1180px] px-5 pt-6 lg:px-0">
      <div className="relative overflow-hidden rounded-3xl border border-white/14 bg-[#07100f] p-6 shadow-[0_26px_90px_rgba(0,0,0,.34)] lg:p-8">
        <div className="absolute inset-0 opacity-50 [background-image:linear-gradient(rgba(255,255,255,.055)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.05)_1px,transparent_1px)] [background-size:44px_44px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_58%_45%,rgba(80,118,118,.28),transparent_34%),radial-gradient(circle_at_22%_78%,rgba(216,170,79,.16),transparent_32%)]" />
        <div className="relative z-10 grid gap-8 lg:grid-cols-[0.28fr_0.72fr]">
          <div>
            <SectionKicker>{data.city} Atlas</SectionKicker>
            <h2 className="mt-4 font-sans text-4xl font-semibold leading-[1.04] text-[#fff7e5] md:text-5xl">
              Navigate the city like a local.
            </h2>
            <p className="mt-5 text-sm leading-7 text-white/62">
              {data.atlas.copy}
            </p>
            <Link
              href={routes.atlas(data.slug)}
              className="mt-7 inline-flex items-center gap-3 rounded-xl bg-[#d8aa4f] px-6 py-4 text-sm font-bold text-[#1b1307] transition hover:bg-[#f0c96e]"
            >
              Open Interactive Map <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <CityMapPreview citySlug={data.slug} cityName={data.city} points={data.atlas.points} />
        </div>
      </div>
    </section>
  );
}

function HiddenGems({ data, images }: { data: CityDestinationPageData; images: string[] }) {
  return (
    <section className="mx-auto max-w-[1180px] px-5 pt-16 lg:px-0">
      <div className="flex items-center justify-between gap-4">
        <SectionKicker>Hidden Gems</SectionKicker>
        <Link href={`/city/${data.slug}/hidden-gems`} className="inline-flex items-center gap-2 text-xs font-bold text-[#d8aa4f]">
          See all <ChevronRight className="h-4 w-4" />
        </Link>
      </div>
      <div className="mt-5 grid gap-5 md:grid-cols-2 lg:grid-cols-5">
        {data.hiddenGems.map((gem, index) => (
          <Link
            key={gem.title}
            href={routes.cityHiddenGem(data.slug, slugifyRouteSegment(gem.title))}
            className="group overflow-hidden rounded-2xl border border-white/12 bg-[#07100f] transition hover:-translate-y-1 hover:border-[#d8aa4f]/55 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#d8aa4f]"
          >
            <div className="relative h-44 overflow-hidden">
              <ImageBackdrop src={images[index] ?? data.images.hero} alt={gem.title} className="transition duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/78 to-transparent" />
            </div>
            <div className="p-5">
              <h3 className="text-base font-bold text-[#fff7e5]">{gem.title}</h3>
              <p className="mt-2 text-xs leading-5 text-white/62">{gem.copy}</p>
              <p className="mt-3 text-xs font-bold text-[#d8aa4f]">{gem.place}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

function SafetyAndCulture({ data, image }: { data: CityDestinationPageData; image: string }) {
  return (
    <section className="mx-auto grid max-w-[1180px] gap-5 px-5 pt-8 lg:grid-cols-[0.48fr_0.52fr] lg:px-0">
      <article className="relative overflow-hidden rounded-3xl border border-white/14 bg-[#08100f] p-7 shadow-[0_22px_80px_rgba(0,0,0,.3)]">
        <Image
          src={image}
          alt={`${data.city} night safety context`}
          fill
          sizes="(min-width: 1024px) 45vw, 100vw"
          className="object-cover opacity-38"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,#08100f_0%,rgba(8,16,15,.88)_52%,rgba(8,16,15,.38)_100%)]" />
        <div className="relative z-10 max-w-lg">
          <SectionKicker>Safety & Solo Female Travel</SectionKicker>
          <h2 className="mt-4 font-sans text-3xl font-semibold leading-[1.12] text-[#fff7e5] sm:text-4xl">
            {data.safety.headline}
          </h2>
          <ul className="mt-6 space-y-2.5 text-sm text-white/76">
            {data.safety.tips.map((tip) => (
              <li key={tip} className="flex gap-3">
                <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-[#d8aa4f]" strokeWidth={1.7} />
                {tip}
              </li>
            ))}
          </ul>
          <div className="mt-7 rounded-2xl border border-[#d8aa4f]/45 bg-black/38 p-5 backdrop-blur">
            <p className="text-[0.68rem] font-bold uppercase tracking-[0.12em] text-[#d8aa4f]">
              Useful Phrase
            </p>
            <p className="mt-1 font-sans text-2xl font-semibold text-[#fff7e5]">
              &quot;{data.safety.phrase}&quot;
            </p>
            <p className="mt-2 text-xs leading-5 text-white/65">
              {data.safety.phraseNote}
            </p>
          </div>
        </div>
      </article>

      <article className="rounded-3xl border border-white/14 bg-[#08100f] p-7 shadow-[0_22px_80px_rgba(0,0,0,.3)]">
        <SectionKicker>Culture & Etiquette</SectionKicker>
        <div className="mt-7 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {data.culture.map(({ title, copy, icon }) => {
            const Icon = iconMap[icon];
            return (
              <div key={title} className="border-white/10 sm:border-l sm:pl-6 first:border-l-0 first:pl-0">
                <Icon className="h-7 w-7 text-[#d8aa4f]" strokeWidth={1.45} />
                <h3 className="mt-4 text-base font-bold text-[#fff7e5]">{title}</h3>
                <p className="mt-2 text-xs leading-5 text-white/62">{copy}</p>
              </div>
            );
          })}
        </div>
      </article>
    </section>
  );
}

function BottomCta({ data }: { data: CityDestinationPageData }) {
  const router = useRouter();
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(SAVED_TRIPS_STORAGE_KEY);
      if (!raw) return;

      const savedTrips = JSON.parse(raw) as Array<{ slug?: string }>;
      setSaved(savedTrips.some((trip) => trip.slug === data.slug));
    } catch {
      setSaved(false);
    }
  }, [data.slug]);

  function handleSaveToTrip() {
    const savedTrip = {
      slug: data.slug,
      city: data.city,
      country: data.country,
      savedAt: new Date().toISOString(),
      type: "city",
    };

    try {
      const raw = window.localStorage.getItem(SAVED_TRIPS_STORAGE_KEY);
      const savedTrips = raw ? (JSON.parse(raw) as Array<typeof savedTrip>) : [];
      const nextTrips = savedTrips.some((trip) => trip.slug === data.slug)
        ? savedTrips.map((trip) => (trip.slug === data.slug ? { ...trip, ...savedTrip } : trip))
        : [savedTrip, ...savedTrips];

      window.localStorage.setItem(SAVED_TRIPS_STORAGE_KEY, JSON.stringify(nextTrips));
      setSaved(true);
    } catch {
      window.localStorage.setItem(SAVED_TRIPS_STORAGE_KEY, JSON.stringify([savedTrip]));
      setSaved(true);
    }
  }

  function handleCompareDates() {
    router.push(`/journey-builder?city=${data.slug}&mode=dates`);
  }

  const secondaryCtas = [
    {
      label: saved ? "Saved" : "Save to Trip",
      icon: Bookmark,
      ariaLabel: saved ? `${data.city} saved to trip` : `Save ${data.city} to trip`,
      onClick: handleSaveToTrip,
      pressed: saved,
    },
    {
      label: "Compare Dates",
      icon: CalendarDays,
      ariaLabel: `Compare dates for ${data.city}`,
      onClick: handleCompareDates,
    },
  ];

  return (
    <section className="mx-auto max-w-[1180px] px-5 pb-14 pt-6 lg:px-0">
      <div className="flex flex-col gap-5 rounded-3xl border border-white/14 bg-[#08100f]/90 p-6 shadow-[0_22px_80px_rgba(0,0,0,.24)] backdrop-blur-xl lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.12em] text-white/80">
            Plan your {data.city} journey
          </p>
          <p className="mt-1 text-sm text-white/58">
            Save, compare and personalize your perfect {data.city} itinerary.
          </p>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {secondaryCtas.map(({ label, icon: Icon, ariaLabel, onClick, pressed }) => (
            <button
              key={label as string}
              type="button"
              aria-label={ariaLabel}
              aria-pressed={pressed}
              onClick={onClick}
              className="inline-flex h-12 items-center justify-center gap-3 rounded-xl border border-white/16 bg-black/20 px-5 text-sm font-semibold text-white transition hover:border-[#d8aa4f]/60 hover:text-[#f0c96e] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#d8aa4f]"
            >
              <Icon className="h-4 w-4 text-[#d8aa4f]" /> {label as string}
            </button>
          ))}
          <Link
            href={`/stays?city=${data.slug}`}
            aria-label={`See stays in ${data.city}`}
            className="inline-flex h-12 items-center justify-center gap-3 rounded-xl border border-white/16 bg-black/20 px-5 text-sm font-semibold text-white transition hover:border-[#d8aa4f]/60 hover:text-[#f0c96e] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#d8aa4f]"
          >
            <Landmark className="h-4 w-4 text-[#d8aa4f]" /> See Stays
          </Link>
          <Link
            href={`${routes.explore}?near=${data.slug}`}
            aria-label={`Explore places near ${data.city}`}
            className="inline-flex h-12 items-center justify-center gap-3 rounded-xl bg-[#d8aa4f] px-5 text-sm font-bold text-[#1b1307] transition hover:bg-[#f0c96e] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f0c96e]"
          >
            Explore Nearby <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

export function CityDestinationPage({ data }: { data: CityDestinationPageData }) {
  const images = useMemo(() => buildCityImageAssignments(data), [data]);

  return (
    <DestinationAtmosphereProvider destinationSlug={data.slug} destinationType="city" countrySlug={countrySlugFromName(data.country)}>
    <main className="min-h-screen overflow-hidden bg-[#050807] font-sans text-white">
      <HeroSection data={data} images={images} />
      <div className="relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_16%_12%,var(--destination-glow),transparent_28%),radial-gradient(circle_at_80%_34%,rgba(61,118,112,.12),transparent_34%)]" />
        <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: "var(--destination-texture)", backgroundSize: "96px 96px" }} />
        <div className="relative z-10">
          <IntelligenceStrip data={data} />
          <WhyCity data={data} image={images.why} />
          <MoodCards data={data} images={images.moods} />
          <ItinerarySection data={data} images={images.itinerary} />
          <AtlasSection data={data} />
          <HiddenGems data={data} images={images.hiddenGems} />
          <SafetyAndCulture data={data} image={images.safety} />
          <BottomCta data={data} />
        </div>
      </div>
    </main>
    </DestinationAtmosphereProvider>
  );
}
