"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { MainNavLink } from "@/components/navigation/MainNavLink";
import { navigationHref } from "@/lib/routes";
import {
  Bell,
  BriefcaseBusiness,
  ChevronRight,
  CircleGauge,
  Clock3,
  Compass,
  Globe2,
  HandCoins,
  Handshake,
  Headphones,
  Map,
  MapPin,
  Menu,
  MessageCircle,
  Moon,
  Plane,
  Play,
  Search,
  Settings,
  ShieldAlert,
  Shirt,
  Sparkles,
  Star,
  SunMedium,
  User,
  Utensils,
  Volume2,
  Wine,
} from "lucide-react";
import { JourneeLogoMark } from "@/components/brand/JourneeLogo";

const images = {
  hero:
    "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=2600&q=92",
  dining:
    "https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?auto=format&fit=crop&w=900&q=88",
  etiquette:
    "https://images.unsplash.com/photo-1521791055366-0d553872125f?auto=format&fit=crop&w=900&q=88",
  rituals:
    "https://images.unsplash.com/photo-1545569341-9eb8b30979d9?auto=format&fit=crop&w=900&q=88",
  dress:
    "https://images.unsplash.com/photo-1528164344705-47542687000d?auto=format&fit=crop&w=900&q=88",
  tipping:
    "https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?auto=format&fit=crop&w=900&q=88",
  behavior:
    "https://images.unsplash.com/photo-1542051841857-5f90071e7989?auto=format&fit=crop&w=900&q=88",
  religion:
    "https://images.unsplash.com/photo-1492321936769-b49830bc1d1e?auto=format&fit=crop&w=900&q=88",
  business:
    "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=900&q=88",
  train:
    "https://images.unsplash.com/photo-1513407030348-c983a97b98d8?auto=format&fit=crop&w=900&q=88",
  spain:
    "https://images.unsplash.com/photo-1515443961218-a51367888e4b?auto=format&fit=crop&w=900&q=88",
  home:
    "https://images.unsplash.com/photo-1523419409543-a5e549c1faa8?auto=format&fit=crop&w=900&q=88",
  eye:
    "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=900&q=88",
  gift:
    "https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?auto=format&fit=crop&w=900&q=88",
  gesture:
    "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=900&q=88",
  istanbul:
    "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?auto=format&fit=crop&w=1400&q=90",
  morocco:
    "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&w=1400&q=90",
  milan:
    "https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=1400&q=90",
  kyotoTea:
    "https://images.unsplash.com/photo-1563822249548-9a72b6353cd1?auto=format&fit=crop&w=1400&q=90",
  avatar:
    "https://images.unsplash.com/photo-1526772662000-3f88f10405ff?auto=format&fit=crop&w=240&q=82",
};

const navItems = [
  ["Culture Engine", Compass],
  ["Explore", Globe2],
  ["Atlas", Map],
  ["Trips", BriefcaseBusiness],
  ["Stays", Moon],
  ["Flights", Plane],
  ["Experiences", Sparkles],
  ["Concierge", Headphones],
  ["Alerts", Bell],
  ["Profile", User],
  ["Settings", Settings],
] as const;

const heroStats = [
  { label: "Local etiquette score", value: "9.2", unit: "/10", note: "Confident alignment", icon: Sparkles },
  { label: "Tourist saturation", value: "Moderate", unit: "58/100", note: "Seasonal pressure", icon: CircleGauge },
  { label: "Language friendliness", value: "High", unit: "82/100", note: "English support", icon: MessageCircle },
  { label: "Cultural immersion index", value: "Exceptional", unit: "92/100", note: "Deep local access", icon: Compass },
] as const;

const modules = [
  { title: "Dining Culture", image: images.dining, icon: Utensils, insight: "Learn how locals dine, order, toast, and show appreciation." },
  { title: "Social Etiquette", image: images.etiquette, icon: Handshake, insight: "Understand greetings, personal space, and social expectations." },
  { title: "Local Rituals", image: images.rituals, icon: Sparkles, insight: "Decode ceremonies, festivals, and everyday sacred routines." },
  { title: "Dress Expectations", image: images.dress, icon: Shirt, insight: "Know what to wear across temples, dinners, and city life." },
  { title: "Tipping Customs", image: images.tipping, icon: HandCoins, insight: "See where gratuity is welcomed, refused, or built in." },
  { title: "Public Behavior", image: images.behavior, icon: Volume2, insight: "Read the rules around trains, queues, phones, and noise." },
  { title: "Religious Sensitivities", image: images.religion, icon: ShieldAlert, insight: "Respect beliefs, spaces, and practices that shape daily life." },
  { title: "Business Culture", image: images.business, icon: BriefcaseBusiness, insight: "Navigate meetings, hierarchy, punctuality, and professional etiquette." },
] as const;

const phraseGroups = {
  Common: [
    ["こんにちは", "Konnichiwa", "Hello"],
    ["ありがとうございます", "Arigatou gozaimasu", "Thank you very much"],
    ["すみません", "Sumimasen", "Excuse me / I am sorry"],
    ["これはいくらですか?", "Kore wa ikura desu ka?", "How much is this?"],
    ["助けてください", "Tasukete kudasai", "Please help me"],
  ],
  Greetings: [
    ["おはようございます", "Ohayou gozaimasu", "Good morning"],
    ["こんばんは", "Konbanwa", "Good evening"],
    ["はじめまして", "Hajimemashite", "Nice to meet you"],
    ["よろしくお願いします", "Yoroshiku onegaishimasu", "Thank you in advance"],
  ],
  Emergency: [
    ["病院はどこですか?", "Byouin wa doko desu ka?", "Where is the hospital?"],
    ["警察を呼んでください", "Keisatsu o yonde kudasai", "Please call the police"],
    ["英語を話せますか?", "Eigo o hanasemasu ka?", "Do you speak English?"],
  ],
} as const;

const insights = [
  { title: "Do not speak loudly on trains in Japan.", tag: "Public Behavior", image: images.train },
  { title: "Dinner begins late in Spain.", tag: "Dining Culture", image: images.spain },
  { title: "Remove shoes before entering homes in parts of Asia.", tag: "Social Etiquette", image: images.home },
  { title: "Eye contact expectations vary by region.", tag: "Social Norms", image: images.eye },
  { title: "Use both hands when giving or receiving items.", tag: "Respect & Etiquette", image: images.gift },
  { title: "Avoid pointing with your finger in many cultures.", tag: "Gestures & Body Language", image: images.gesture },
] as const;

const stories = [
  { title: "Tea Traditions in Kyoto", copy: "Rituals of harmony, attention, and tranquil hospitality.", image: images.kyotoTea },
  { title: "Midnight Dining in Istanbul", copy: "A city that becomes more generous after dark.", image: images.istanbul },
  { title: "Desert Hospitality in Morocco", copy: "Ceremony, tea, and generosity in the heart of the desert.", image: images.morocco },
  { title: "Cafe Culture in Milan", copy: "Where style, coffee, and conversation meet at street level.", image: images.milan },
] as const;

const norms = [
  ["Dining Etiquette", "Chopsticks, seating, table pace, and host signals.", Utensils],
  ["Payment Culture", "Cash, cards, splitting, tipping, and counter customs.", HandCoins],
  ["Reservation Expectations", "When to book, confirm, arrive, or cancel.", Clock3],
  ["Hospitality Style", "Warmth, formality, privacy, and guest posture.", Sparkles],
  ["Alcohol Customs", "Toasts, refusal etiquette, and drinking rituals.", Wine],
  ["Greeting Traditions", "Bows, handshakes, cheek kisses, and honorific terms.", Handshake],
] as const;

const feed = [
  ["Weather", "Cherry blossom etiquette season beginning in Kyoto.", "2m ago", "bg-[#f1ce7f]/18 text-[#f1ce7f]"],
  ["Insight", "Ramadan travel guidance is active for Middle East destinations.", "15m ago", "bg-cyan-300/15 text-cyan-200"],
  ["Traffic", "Venice crowd restrictions updated for summer 2026.", "28m ago", "bg-rose-400/16 text-rose-200"],
  ["Trending", "Local festival week beginning in Kyoto. Expect larger crowds.", "42m ago", "bg-[#d8aa4f]/18 text-[#f1ce7f]"],
  ["New Route", "Direct cultural weekends trending between Dubai and Toronto.", "1h ago", "bg-emerald-300/15 text-emerald-200"],
] as const;

const compatibility = [
  ["Introvert friendly", 8.5],
  ["Slow pace of life", 7.8],
  ["Nightlife intensity", 6.6],
  ["Luxury friendliness", 9.2],
  ["Remote work friendliness", 8.2],
] as const;

function GoldButton({ children }: { children: React.ReactNode }) {
  return (
    <button className="inline-flex h-12 items-center justify-center gap-3 rounded-lg bg-[#e8b95f] px-6 text-sm font-bold text-[#140f08] shadow-[0_20px_60px_rgba(232,185,95,.24)] transition hover:bg-[#f1ce7f]">
      {children}
    </button>
  );
}

function SectionShell({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={`rounded-lg border border-white/10 bg-[#07100f]/80 shadow-[0_22px_80px_rgba(0,0,0,.26)] backdrop-blur-xl ${className}`}>
      {children}
    </section>
  );
}

function SectionHeader({
  title,
  action,
}: {
  title: string;
  action?: string;
}) {
  return (
    <div className="flex items-center justify-between gap-4 px-5 pt-5">
      <h2 className="text-base font-bold uppercase text-white">{title}</h2>
      {action ? (
        <button className="text-sm font-semibold text-[#d8aa4f] transition hover:text-[#f1ce7f]">
          {action}
        </button>
      ) : null}
    </div>
  );
}

function Sidebar() {
  return (
    <aside className="fixed inset-y-0 left-0 z-40 hidden w-[184px] border-r border-white/10 bg-[#030807]/94 px-4 py-8 text-white shadow-[24px_0_80px_rgba(0,0,0,.45)] backdrop-blur-xl xl:block">
      <Link href="/" className="block px-2">
        <div className="text-2xl font-bold uppercase tracking-[0.28em] text-[#e8b95f]">Journee</div>
        <div className="mt-1 text-sm font-bold uppercase tracking-[0.12em] text-[#e8b95f]">Culture Engine</div>
      </Link>
      <nav className="mt-10 space-y-2">
        {navItems.map(([item, Icon], index) => (
          <MainNavLink
            key={item}
            label={item}
            href={item === "Culture Engine" ? "/culture" : navigationHref(item)}
            className={`flex h-11 items-center gap-3 rounded-md px-3 text-sm font-medium transition ${
              index === 0
                ? "border border-[#d8aa4f]/30 bg-[#d8aa4f]/14 text-[#f1ce7f]"
                : "text-white/78 hover:bg-white/[0.06] hover:text-white"
            }`}
          >
            <Icon className="h-4 w-4" strokeWidth={1.7} />
            <span>{item}</span>
            {item === "Alerts" ? (
              <span className="ml-auto grid h-5 w-5 place-items-center rounded-full bg-[#e8b95f] text-xs font-bold text-black">
                3
              </span>
            ) : null}
          </MainNavLink>
        ))}
      </nav>
      <div className="absolute inset-x-4 bottom-6 [@media(max-height:820px)]:hidden">
        <div className="flex items-center gap-3 px-3">
          <Image src={images.avatar} alt="Alexander profile" width={48} height={48} className="h-12 w-12 rounded-full object-cover" />
          <div>
            <div className="text-sm font-bold uppercase tracking-[0.08em]">Alexander</div>
            <div className="text-sm text-white/58">Platinum Member</div>
          </div>
        </div>
        <div className="mt-4 rounded-md bg-[#e8b95f]/14 px-4 py-3 text-center text-sm font-bold text-[#f1ce7f]">
          12,450 POINTS
        </div>
      </div>
    </aside>
  );
}

function Hero() {
  return (
    <section className="relative isolate min-h-[760px] overflow-hidden rounded-b-[1.75rem] bg-[#050807] xl:min-h-[690px]">
      <Image src={images.hero} alt="Kyoto street at sunset with temple architecture" fill priority sizes="100vw" className="z-0 object-cover" />
      <div className="absolute inset-0 z-[1] bg-[linear-gradient(90deg,rgba(2,5,5,.92)_0%,rgba(2,5,5,.58)_38%,rgba(2,5,5,.18)_67%,rgba(2,5,5,.78)_100%)]" />
      <div className="absolute inset-0 z-[2] bg-[linear-gradient(180deg,rgba(2,5,5,.18)_0%,rgba(2,5,5,.16)_54%,#050807_100%)]" />
      <header className="relative z-10 flex items-center justify-between gap-4 px-5 py-6 sm:px-8">
        <div className="flex min-w-0 flex-1 items-center gap-4">
          <Link href="/" className="flex items-center gap-3 xl:hidden">
            <JourneeLogoMark className="h-8 w-8 text-[#e8b95f]" />
            <span className="text-xl font-bold uppercase tracking-[0.16em] text-[#e8b95f]">Journee</span>
          </Link>
          <label className="hidden h-11 w-full max-w-[390px] items-center gap-3 rounded-lg border border-white/16 bg-black/45 px-4 text-white/76 backdrop-blur-xl md:flex">
            <Search className="h-5 w-5 shrink-0" />
            <input
              aria-label="Search cultures"
              placeholder="Search cultures, customs, rituals..."
              className="w-full bg-transparent text-sm font-medium text-white outline-none placeholder:text-white/45"
            />
          </label>
        </div>
        <div className="flex items-center gap-4 text-white">
          <Globe2 className="h-5 w-5" />
          <div className="relative">
            <Bell className="h-5 w-5" />
            <span className="absolute -right-2 -top-2 grid h-5 w-5 place-items-center rounded-full bg-[#e8b95f] text-xs font-bold text-black">3</span>
          </div>
          <Menu className="h-6 w-6" />
        </div>
      </header>

      <div className="relative z-10 grid gap-8 px-5 pb-14 pt-16 sm:px-8 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-center xl:pt-20">
        <div className="max-w-3xl">
          <p className="flex items-center gap-2 text-sm font-bold uppercase tracking-[0.14em] text-[#f1ce7f]">
            <MapPin className="h-4 w-4" /> Kyoto, Japan
          </p>
          <h1 className="mt-5 max-w-3xl text-[clamp(4rem,10vw,8.4rem)] font-extrabold uppercase leading-[0.86] text-white drop-shadow-[0_24px_70px_rgba(0,0,0,.72)]">
            Travel <span className="block text-[#f1ce7f]">Deeper</span>
          </h1>
          <p className="mt-7 max-w-xl text-lg font-medium leading-8 text-white/88 md:text-xl">
            Understand the people, customs, rituals, and rhythms behind every destination.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <GoldButton>
              Explore Culture <ChevronRight className="h-4 w-4" />
            </GoldButton>
            <button className="inline-flex h-12 items-center justify-center gap-3 rounded-lg border border-white/24 bg-black/28 px-6 text-sm font-bold text-white backdrop-blur transition hover:border-[#e8b95f]/70 hover:text-[#f1ce7f]">
              Build Cultural Journey <Plane className="h-4 w-4" />
            </button>
          </div>
        </div>
        <div className="overflow-hidden rounded-lg border border-white/14 bg-[#07100f]/72 shadow-[0_28px_90px_rgba(0,0,0,.5)] backdrop-blur-xl">
          {heroStats.map((stat) => (
            <div key={stat.label} className="flex items-center gap-4 border-b border-white/10 p-5 last:border-b-0">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full border border-[#d8aa4f]/35 bg-[#d8aa4f]/10 text-[#e8b95f]">
                <stat.icon className="h-5 w-5" strokeWidth={1.6} />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-bold uppercase tracking-[0.1em] text-white/48">{stat.label}</p>
                <div className="mt-1 flex items-end justify-between gap-3">
                  <p className="text-2xl font-semibold text-white">{stat.value} <span className="text-base text-white/60">{stat.unit.startsWith("/") ? stat.unit : ""}</span></p>
                  {!stat.unit.startsWith("/") ? <p className="text-base font-semibold text-[#f1ce7f]">{stat.unit}</p> : null}
                </div>
                <p className="mt-1 text-sm text-emerald-200/70">{stat.note}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function PhraseEngine() {
  const tabs = Object.keys(phraseGroups) as Array<keyof typeof phraseGroups>;
  const [active, setActive] = useState<(typeof tabs)[number]>("Common");
  const waveBars = useMemo(() => Array.from({ length: 34 }, (_, index) => 10 + ((index * 13) % 26)), []);

  return (
    <SectionShell>
      <div className="flex items-center justify-between gap-4 px-5 pt-5">
        <h2 className="text-base font-bold uppercase text-white">Local Phrases Engine</h2>
        <button className="rounded-md border border-white/12 bg-white/[0.04] px-4 py-2 text-sm font-semibold text-white/78">Japanese</button>
      </div>
      <div className="grid gap-4 p-5 md:grid-cols-[136px_1fr]">
        <div className="overflow-hidden rounded-md border border-white/8 bg-black/22">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActive(tab)}
              className={`block w-full px-4 py-4 text-left text-sm font-bold uppercase tracking-[0.08em] transition ${
                active === tab ? "bg-[#d8aa4f]/16 text-[#f1ce7f]" : "text-white/62 hover:bg-white/[0.05] hover:text-white"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
        <div className="rounded-md border border-white/10 bg-[#07100f]/70">
          {phraseGroups[active].map(([local, pronunciation, meaning]) => (
            <div key={local} className="grid items-center gap-4 border-b border-white/8 px-4 py-4 last:border-b-0 sm:grid-cols-[1fr_1fr_44px]">
              <div>
                <div className="text-lg font-bold text-white">{local}</div>
                <div className="mt-1 text-sm font-medium text-white/58">{pronunciation}</div>
              </div>
              <div className="text-base font-medium text-white/82">{meaning}</div>
              <button className="grid h-10 w-10 place-items-center rounded-full border border-[#d8aa4f]/55 text-[#f1ce7f] transition hover:bg-[#d8aa4f]/14" aria-label={`Play pronunciation for ${meaning}`}>
                <Play className="h-4 w-4 fill-current" />
              </button>
            </div>
          ))}
          <div className="flex items-center gap-4 px-4 py-4">
            <span className="text-sm font-semibold text-[#d8aa4f]">Hear pronunciation</span>
            <div className="flex h-8 flex-1 items-center gap-1 overflow-hidden">
              {waveBars.map((height, index) => (
                <span key={index} className="w-1 rounded-full bg-[#d8aa4f]/50" style={{ height }} />
              ))}
            </div>
            <button className="grid h-10 w-10 place-items-center rounded-full border border-[#d8aa4f]/55 text-[#f1ce7f]" aria-label="Play phrase sequence">
              <Play className="h-4 w-4 fill-current" />
            </button>
          </div>
        </div>
      </div>
    </SectionShell>
  );
}

function Compatibility() {
  return (
    <SectionShell className="p-5">
      <h2 className="text-base font-bold uppercase text-white">Culture Compatibility Engine</h2>
      <div className="mt-7 grid place-items-center">
        <div className="relative grid h-64 w-64 place-items-center">
          <div className="absolute h-56 w-56 rotate-45 border border-[#d8aa4f]/35 bg-[#d8aa4f]/8 shadow-[0_0_70px_rgba(216,170,79,.18)]" />
          <div className="absolute h-40 w-40 rotate-45 border border-white/10" />
          <div className="relative text-center">
            <div className="text-5xl font-bold text-[#f1ce7f]">8.2</div>
            <div className="mt-1 text-lg font-bold text-[#f1ce7f]">Great Match</div>
            <p className="mx-auto mt-3 max-w-[160px] text-sm leading-6 text-white/68">
              Your personality aligns well with Kyoto, Japan.
            </p>
          </div>
          {compatibility.map(([label, score], index) => {
            const positions = [
              "left-1/2 top-0 -translate-x-1/2 text-center",
              "right-0 top-14 text-right",
              "bottom-0 left-1/2 -translate-x-1/2 text-center",
              "bottom-14 left-0 text-left",
              "left-0 top-14 text-left",
            ];
            return (
              <div key={label} className={`absolute max-w-[92px] text-sm ${positions[index]}`}>
                <div className="text-white/50">{label}</div>
                <div className="font-bold text-[#f1ce7f]">{score}</div>
              </div>
            );
          })}
        </div>
      </div>
      <button className="mt-7 h-11 w-full rounded-md border border-[#d8aa4f]/55 text-sm font-bold uppercase text-[#f1ce7f] transition hover:bg-[#d8aa4f]/12">
        Find More Matches
      </button>
    </SectionShell>
  );
}

export function CultureEnginePage() {
  return (
    <main className="min-h-screen bg-[#030706] font-sans text-white">
      <Sidebar />
      <div className="xl:pl-[184px]">
        <Hero />
        <div className="space-y-4 px-4 pb-10 pt-4 sm:px-6 lg:px-8">
          <SectionShell>
            <SectionHeader title="Cultural Immersion Modules" action="View all modules" />
            <div className="grid gap-3 p-4 sm:grid-cols-2 lg:grid-cols-4">
              {modules.map((module) => (
                <article key={module.title} className="group relative min-h-[230px] overflow-hidden rounded-md border border-white/10 bg-black">
                  <Image src={module.image} alt="" fill sizes="(min-width: 1024px) 20vw, 50vw" className="object-cover opacity-70 transition duration-500 group-hover:scale-105 group-hover:opacity-88" />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,.12),rgba(0,0,0,.82))]" />
                  <div className="absolute inset-x-0 bottom-0 p-4">
                    <module.icon className="mb-3 h-5 w-5 text-[#d8aa4f]" />
                    <h3 className="text-base font-bold text-white">{module.title}</h3>
                    <p className="mt-3 text-sm leading-6 text-white/74">{module.insight}</p>
                    <ChevronRight className="mt-3 h-4 w-4 text-[#d8aa4f]" />
                  </div>
                </article>
              ))}
            </div>
          </SectionShell>

          <div className="grid gap-4 xl:grid-cols-[1fr_1.08fr]">
            <PhraseEngine />
            <SectionShell>
              <SectionHeader title="Local Behavior Insights" action="View all insights" />
              <div className="grid gap-3 p-4 sm:grid-cols-2">
                {insights.map((insight) => (
                  <article key={insight.title} className="relative min-h-[184px] overflow-hidden rounded-md border border-white/10 bg-black">
                    <Image src={insight.image} alt="" fill sizes="(min-width: 1280px) 16vw, 50vw" className="object-cover opacity-58" />
                    <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,.18),rgba(0,0,0,.84))]" />
                    <div className="absolute inset-x-0 bottom-0 p-4">
                      <h3 className="text-lg font-semibold leading-7 text-white">{insight.title}</h3>
                      <p className="mt-3 text-sm font-semibold text-[#d8aa4f]">{insight.tag}</p>
                    </div>
                  </article>
                ))}
              </div>
            </SectionShell>
          </div>

          <SectionShell>
            <SectionHeader title="Cinematic Cultural Stories" action="View all stories" />
            <div className="flex gap-4 overflow-x-auto p-4 [scrollbar-width:none]">
              {stories.map((story) => (
                <article key={story.title} className="relative h-52 min-w-[280px] overflow-hidden rounded-md border border-white/12 bg-black sm:min-w-[360px] lg:min-w-[420px]">
                  <Image src={story.image} alt="" fill sizes="420px" className="object-cover opacity-68" />
                  <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,.84),rgba(0,0,0,.2)),linear-gradient(180deg,transparent,rgba(0,0,0,.78))]" />
                  <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5">
                    <div>
                      <h3 className="max-w-[260px] text-2xl font-semibold leading-8 text-white">{story.title}</h3>
                      <p className="mt-2 max-w-[250px] text-base leading-7 text-white/78">{story.copy}</p>
                    </div>
                    <button className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-[#d8aa4f]/65 bg-black/36 text-[#f1ce7f]" aria-label={`Play ${story.title}`}>
                      <Play className="h-4 w-4 fill-current" />
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </SectionShell>

          <div className="grid gap-4 lg:grid-cols-[0.85fr_0.9fr_1.15fr]">
            <Compatibility />
            <SectionShell>
              <SectionHeader title="Local Dining & Social Norms" />
              <div className="p-5">
                {norms.map(([title, copy, Icon]) => (
                  <button key={title} className="flex w-full items-center gap-4 border-b border-white/8 py-4 text-left last:border-b-0">
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-md bg-[#d8aa4f]/10 text-[#d8aa4f]">
                      <Icon className="h-5 w-5" strokeWidth={1.7} />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-base font-semibold text-white">{title}</span>
                      <span className="mt-1 block text-sm leading-6 text-white/58">{copy}</span>
                    </span>
                    <ChevronRight className="h-4 w-4 text-[#d8aa4f]" />
                  </button>
                ))}
              </div>
            </SectionShell>
            <SectionShell>
              <SectionHeader title="Real-Time Cultural Feed" action="View all" />
              <div className="p-5">
                {feed.map(([label, copy, time, tone], index) => (
                  <article key={copy} className="flex gap-4 border-b border-white/8 py-4 first:pt-0 last:border-b-0 last:pb-0">
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-lg border border-white/10 bg-white/[0.04] text-[#f1ce7f]">
                      {index === 0 ? <SunMedium className="h-5 w-5" /> : index === 1 ? <Moon className="h-5 w-5" /> : index === 2 ? <ShieldAlert className="h-5 w-5" /> : index === 3 ? <Star className="h-5 w-5" /> : <Plane className="h-5 w-5" />}
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-3">
                        <span className={`rounded-sm px-2 py-1 text-sm font-bold uppercase ${tone}`}>{label}</span>
                        <span className="text-sm text-white/38">{time}</span>
                      </div>
                      <p className="mt-2 text-base leading-6 text-white/80">{copy}</p>
                    </div>
                  </article>
                ))}
              </div>
            </SectionShell>
          </div>
        </div>
      </div>
    </main>
  );
}
