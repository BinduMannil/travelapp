"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState, type ReactNode } from "react";
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
import { JourneeBrand } from "@/components/brand/JourneeLogo";
import type { CityDestinationPageData } from "@/lib/city/city-destination-data";
import {
  useTravelPreferences,
  type DistanceUnit,
  type TempUnit,
} from "@/lib/preferences/context";
import { primaryNavigation } from "@/lib/routes";

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

const atlasLegend = [
  ["Historic Sites", "bg-[#f1b75c]"],
  ["Cultural Spots", "bg-[#d2bd82]"],
  ["Food & Markets", "bg-[#e68ea9]"],
  ["Nature", "bg-[#b7d7b1]"],
  ["Unique Experiences", "bg-[#b7b4d7]"],
] as const;

const atlasDotColors = [
  "bg-[#b7d7b1]",
  "bg-[#d2bd82]",
  "bg-[#d85d61]",
  "bg-[#ff8b5f]",
  "bg-[#e68ea9]",
  "bg-[#cfd7df]",
] as const;

const compactCurrencies = ["AED", "USD", "EUR", "GBP", "JPY", "SGD"] as const;

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
    <p className="text-[0.68rem] font-bold uppercase tracking-[0.12em] text-[#d8aa4f]">
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
            <Link
              key={item.label}
              href={item.href}
              className="transition hover:text-[#f0c96e]"
            >
              {item.label}
            </Link>
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

function HeroSection({ data }: { data: CityDestinationPageData }) {
  return (
    <section className="relative isolate min-h-[820px] overflow-hidden bg-[#050807] pt-28 text-white lg:min-h-[660px]">
      <Image
        src={data.images.hero}
        alt={`${data.city} cinematic city skyline`}
        fill
        priority
        sizes="100vw"
        className="z-0 object-cover"
      />
      <div className="absolute inset-0 z-[1] bg-[linear-gradient(90deg,rgba(2,5,5,.86)_0%,rgba(2,5,5,.5)_42%,rgba(2,5,5,.22)_68%,rgba(2,5,5,.76)_100%)]" />
      <div className="absolute inset-0 z-[2] bg-[linear-gradient(180deg,rgba(2,5,5,.34)_0%,rgba(2,5,5,.12)_36%,#050807_100%)]" />
      <div className="absolute inset-0 z-[3] bg-[radial-gradient(circle_at_72%_24%,rgba(216,170,79,.28),transparent_30%),radial-gradient(circle_at_18%_82%,rgba(126,35,24,.22),transparent_34%)]" />

      <HeaderNav avatar={data.images.avatar} />

      <div className="relative z-10 mx-auto grid max-w-[1180px] gap-10 px-5 pb-16 pt-24 lg:grid-cols-[1fr_300px] lg:items-center lg:px-0 lg:pt-32">
        <div className="max-w-2xl">
          <p className="text-xs font-bold uppercase tracking-[0.12em] text-[#d8aa4f]">
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
            <button className="inline-flex h-14 items-center justify-center gap-3 rounded-xl bg-[#d8aa4f] px-7 text-sm font-bold text-[#1b1307] shadow-[0_18px_50px_rgba(216,170,79,.24)] transition hover:bg-[#f0c96e]">
              Plan Your Journey <ArrowRight className="h-4 w-4" />
            </button>
            <button className="inline-flex h-14 items-center justify-center gap-3 rounded-xl border border-white/30 bg-black/22 px-7 text-sm font-semibold text-white backdrop-blur transition hover:border-[#d8aa4f]/70 hover:text-[#f0c96e]">
              <Bookmark className="h-4 w-4" /> Save Destination
            </button>
          </div>
        </div>

        <aside className="rounded-3xl border border-white/16 bg-[#0a1110]/72 p-6 shadow-[0_24px_90px_rgba(0,0,0,.45)] backdrop-blur-2xl">
          <p className="text-[0.62rem] font-bold uppercase tracking-[0.12em] text-white/48">
            Destination Score
          </p>
          <div className="mt-3 flex items-end gap-3">
            <span className="font-sans text-5xl font-light text-[#f1c56d]">
              {data.score.overall}
            </span>
            <span className="pb-2 text-xs font-semibold text-white/62">
              <span className="block text-[#d8aa4f]">★★★★★</span>
              {data.score.reviews}
            </span>
          </div>
          <div className="mt-6 space-y-4">
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

function WhyCity({ data }: { data: CityDestinationPageData }) {
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
        <ImageBackdrop src={data.why.image} alt={`${data.city} atmospheric travel scene`} />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(4,8,7,.72),transparent_44%,rgba(216,170,79,.12)),linear-gradient(0deg,rgba(3,6,5,.45),transparent_55%)]" />
        <div className="absolute left-8 top-8 h-24 w-24 rounded-full bg-[#d8aa4f]/10 blur-3xl" />
      </div>
    </section>
  );
}

function MoodCards({ data }: { data: CityDestinationPageData }) {
  return (
    <section id="moods" className="mx-auto max-w-[1180px] px-5 pt-16 lg:px-0">
      <SectionKicker>Explore {data.city} by Mood</SectionKicker>
      <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-6">
        {data.moods.map(({ title, count, image }) => (
          <article
            key={title}
            className="group relative min-h-[210px] overflow-hidden rounded-2xl border border-white/12 bg-white/[0.04]"
          >
            <ImageBackdrop src={image} alt={title} className="transition duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/94 via-black/38 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-4">
              <h3 className="text-base font-bold leading-tight text-white">{title}</h3>
              <p className="mt-1 text-[0.7rem] font-semibold uppercase tracking-[0.08em] text-[#d8aa4f]">
                {count}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function ItinerarySection({ data }: { data: CityDestinationPageData }) {
  return (
    <section className="mx-auto max-w-[1180px] px-5 pt-16 lg:px-0">
      <SectionKicker>Explore 3-Day {data.city} Itinerary</SectionKicker>
      <div className="mt-5 grid gap-5 lg:grid-cols-3">
        {data.itinerary.map((day) => (
          <article
            key={day.day}
            className="relative min-h-[230px] overflow-hidden rounded-2xl border border-white/12 bg-[#0a1110]"
          >
            <ImageBackdrop src={day.image} alt={day.title} />
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
          </article>
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
            <button className="mt-7 inline-flex items-center gap-3 rounded-xl bg-[#d8aa4f] px-6 py-4 text-sm font-bold text-[#1b1307] transition hover:bg-[#f0c96e]">
              Open Interactive Map <ArrowRight className="h-4 w-4" />
            </button>
          </div>

          <div className="relative min-h-[330px] overflow-hidden rounded-2xl border border-white/10 bg-[#081312]/70">
            <div className="absolute inset-0 opacity-45 [background-image:radial-gradient(circle_at_center,rgba(255,255,255,.2)_1px,transparent_1px)] [background-size:18px_18px]" />
            <svg className="absolute inset-0 h-full w-full" viewBox="0 0 760 330" aria-hidden="true">
              <path d="M35 252 C150 210, 190 92, 310 132 S488 270, 710 112" fill="none" stroke="rgba(216,170,79,.72)" strokeWidth="2" strokeDasharray="6 8" />
              <path d="M72 110 C214 154, 350 86, 456 118 S618 240, 725 222" fill="none" stroke="rgba(111,177,177,.34)" strokeWidth="2" />
              <path d="M420 20 C388 96, 420 196, 365 318" fill="none" stroke="rgba(255,255,255,.15)" strokeWidth="2" />
              <path d="M130 310 C205 240, 276 198, 362 210 S548 170, 682 292" fill="none" stroke="rgba(231,105,114,.38)" strokeWidth="2" />
            </svg>
            {data.atlas.points.map((point, index) => (
              <div
                key={point.name}
                className="absolute flex -translate-x-2 -translate-y-2 items-center gap-2"
                style={{ left: point.x, top: point.y }}
              >
                <span className={`h-3.5 w-3.5 rounded-full ${atlasDotColors[index % atlasDotColors.length]} shadow-[0_0_18px_currentColor] ring-4 ring-white/10`} />
                <span className="rounded-full bg-black/42 px-2.5 py-1 text-[0.68rem] font-bold text-white/88 backdrop-blur">
                  {point.name}
                </span>
              </div>
            ))}
            <div className="absolute bottom-5 right-5 rounded-2xl border border-white/16 bg-[#06100f]/82 p-5 text-xs text-white/72 backdrop-blur-xl">
              {atlasLegend.map(([label, dot]) => (
                <p key={label} className="mt-3 first:mt-0">
                  <span className={`mr-3 inline-block h-3 w-3 rounded-full ${dot}`} />
                  {label}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function HiddenGems({ data }: { data: CityDestinationPageData }) {
  return (
    <section className="mx-auto max-w-[1180px] px-5 pt-16 lg:px-0">
      <div className="flex items-center justify-between gap-4">
        <SectionKicker>Hidden Gems</SectionKicker>
        <Link href={`/city/${data.slug}/hidden-gems`} className="inline-flex items-center gap-2 text-xs font-bold text-[#d8aa4f]">
          See all <ChevronRight className="h-4 w-4" />
        </Link>
      </div>
      <div className="mt-5 grid gap-5 md:grid-cols-2 lg:grid-cols-5">
        {data.hiddenGems.map((gem) => (
          <article key={gem.title} className="group overflow-hidden rounded-2xl border border-white/12 bg-[#07100f]">
            <div className="relative h-44 overflow-hidden">
              <ImageBackdrop src={gem.image} alt={gem.title} className="transition duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/78 to-transparent" />
            </div>
            <div className="p-5">
              <h3 className="text-base font-bold text-[#fff7e5]">{gem.title}</h3>
              <p className="mt-2 text-xs leading-5 text-white/62">{gem.copy}</p>
              <p className="mt-3 text-xs font-bold text-[#d8aa4f]">{gem.place}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function SafetyAndCulture({ data }: { data: CityDestinationPageData }) {
  return (
    <section className="mx-auto grid max-w-[1180px] gap-5 px-5 pt-8 lg:grid-cols-[0.48fr_0.52fr] lg:px-0">
      <article className="relative overflow-hidden rounded-3xl border border-white/14 bg-[#08100f] p-7 shadow-[0_22px_80px_rgba(0,0,0,.3)]">
        <Image
          src={data.safety.image}
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
          {[
            ["Save to Trip", Bookmark],
            ["Compare Dates", CalendarDays],
            ["See Stays", Landmark],
          ].map(([label, Icon]) => (
            <button
              key={label as string}
              className="inline-flex h-12 items-center justify-center gap-3 rounded-xl border border-white/16 bg-black/20 px-5 text-sm font-semibold text-white transition hover:border-[#d8aa4f]/60 hover:text-[#f0c96e]"
            >
              <Icon className="h-4 w-4 text-[#d8aa4f]" /> {label as string}
            </button>
          ))}
          <button className="inline-flex h-12 items-center justify-center gap-3 rounded-xl bg-[#d8aa4f] px-5 text-sm font-bold text-[#1b1307] transition hover:bg-[#f0c96e]">
            Explore Nearby <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </section>
  );
}

export function CityDestinationPage({ data }: { data: CityDestinationPageData }) {
  return (
    <main className="min-h-screen overflow-hidden bg-[#050807] font-sans text-white">
      <HeroSection data={data} />
      <div className="relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_16%_12%,rgba(216,170,79,.12),transparent_28%),radial-gradient(circle_at_80%_34%,rgba(61,118,112,.12),transparent_34%)]" />
        <div className="absolute inset-0 opacity-[0.035] [background-image:linear-gradient(90deg,#fff_1px,transparent_1px)] [background-size:96px_96px]" />
        <div className="relative z-10">
          <IntelligenceStrip data={data} />
          <WhyCity data={data} />
          <MoodCards data={data} />
          <ItinerarySection data={data} />
          <AtlasSection data={data} />
          <HiddenGems data={data} />
          <SafetyAndCulture data={data} />
          <BottomCta data={data} />
        </div>
      </div>
    </main>
  );
}
