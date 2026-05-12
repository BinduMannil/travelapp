/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import {
  BadgeDollarSign,
  Bike,
  Coffee,
  Compass,
  MessageCircle,
  Mountain,
  ShieldAlert,
  Smartphone,
  Sparkles,
  Train,
  Utensils,
  Waves,
  Wifi,
} from "lucide-react";
import {
  formatVnd,
  VIETNAM_ACTIVITIES,
  VIETNAM_AFFILIATE_OPPORTUNITIES,
  VIETNAM_CITIES,
  VIETNAM_CITY_REGIONS,
  VIETNAM_COUNTRY,
  VIETNAM_COUNTRY_IMAGES,
  VIETNAM_INTELLIGENCE_NOTES,
  VIETNAM_LOCAL_APPS,
  VIETNAM_PHRASES,
  VIETNAM_PRICE_BENCHMARKS,
} from "@/lib/vietnam/frontend";

const EXPERIENCE_SECTIONS = [
  {
    icon: Bike,
    title: "Motorbike culture",
    text: "Vietnam moves on two wheels: ride-hailing, guided loops, market runs, food stops, and serious safety judgment.",
  },
  {
    icon: Coffee,
    title: "Coffee culture",
    text: "Phin, egg coffee, coconut coffee, roasteries, work cafés, and sticky late-afternoon heat broken by condensed milk.",
  },
  {
    icon: Utensils,
    title: "Food culture",
    text: "Street breakfasts, regional noodle dialects, seafood nights, market snacks, and meals that shape the route.",
  },
  {
    icon: Train,
    title: "Transport",
    text: "Sleeper trains, domestic flights, buses, limousines, GrabBike, ferries, and transfers chosen by geography.",
  },
  {
    icon: Waves,
    title: "Beaches",
    text: "Da Nang, Nha Trang, Phu Quoc, Cham Islands, and weather-sensitive boat days.",
  },
  {
    icon: Mountain,
    title: "Mountains",
    text: "Sapa terraces, Da Lat pine air, northern passes, waterfalls, mist, and trekking windows.",
  },
  {
    icon: ShieldAlert,
    title: "Scams & safety",
    text: "Taxi overcharging, motorbike deposits, unofficial tours, road crossing rhythm, and nightlife transport.",
  },
  {
    icon: Wifi,
    title: "Digital nomad life",
    text: "Cafés, SIM/eSIM setup, delivery apps, apartments, coworking, and city-by-city work rhythm.",
  },
];

const ROUTES = [
  {
    title: "North to South",
    days: "12-18 days",
    stops: "Hanoi · Sapa · Ninh Binh · Hue · Da Nang · Hoi An · HCMC",
    mood: "The whole-country arc: mountains, rail, heritage, coast, and street heat.",
  },
  {
    title: "Central Coast",
    days: "6-9 days",
    stops: "Da Nang · Hoi An · Hue",
    mood: "Beaches, lantern nights, imperial tombs, seafood, and the Hai Van Pass.",
  },
  {
    title: "Southern Heat",
    days: "5-8 days",
    stops: "Ho Chi Minh City · Can Tho · Phu Quoc",
    mood: "Cafés, rooftop nights, Mekong dawn, island sunsets, and humid color.",
  },
];

export function VietnamCountryExperience() {
  const safetyNotes = VIETNAM_INTELLIGENCE_NOTES.filter((note) =>
    ["scams", "street_crossing", "scooter_motorbike", "weather_region"].includes(
      note.intelligence_category,
    ),
  );

  return (
    <main className="min-h-screen bg-[#07120f] text-orange-50">
      <section className="relative isolate min-h-[calc(100svh-4rem)] overflow-hidden">
        <img
          src={VIETNAM_COUNTRY_IMAGES.hero}
          alt=""
          className="absolute inset-0 -z-30 h-full w-full object-cover saturate-150"
        />
        <div className="absolute inset-0 -z-20 bg-[linear-gradient(90deg,rgba(5,16,13,.96),rgba(15,118,110,.68)_45%,rgba(127,29,29,.52)),linear-gradient(0deg,rgba(5,16,13,.96),transparent_58%)]" />
        <div className="absolute inset-0 -z-10 opacity-35 mix-blend-screen [background-image:repeating-linear-gradient(90deg,rgba(255,255,255,.16)_0_1px,transparent_1px_38px),repeating-linear-gradient(0deg,rgba(255,255,255,.08)_0_1px,transparent_1px_54px)]" />
        <div className="absolute -right-16 top-10 -z-10 h-72 w-72 rounded-full bg-orange-500/28 blur-3xl" />
        <div className="absolute bottom-12 left-6 -z-10 h-56 w-56 rounded-full bg-teal-400/20 blur-3xl" />

        <div className="mx-auto grid min-h-[calc(100svh-4rem)] max-w-7xl content-end gap-10 px-6 pb-16 pt-24 lg:grid-cols-[1.05fr_.95fr] lg:items-end">
          <div>
            <nav className="text-xs font-bold uppercase tracking-[0.12em] text-orange-100/60">
              <Link href="/" className="hover:text-orange-100">Home</Link> · Vietnam
            </nav>
            <p className="mt-12 text-xs font-black uppercase tracking-[0.12em] text-amber-300">
              PILOT COUNTRY · STREET ALIVE
            </p>
            <h1 className="mt-5 max-w-4xl font-sans text-[clamp(4.2rem,14vw,12rem)] font-black leading-[0.82] text-orange-50">
              Vietnam
            </h1>
            <p className="mt-8 max-w-2xl text-xl leading-9 text-orange-50/82">
              {VIETNAM_COUNTRY.summary}
            </p>
          </div>
          <aside className="border border-orange-100/20 bg-black/35 p-5 shadow-2xl backdrop-blur-xl sm:p-7">
            <div className="grid grid-cols-2 gap-3">
              {[
                ["Cities", String(VIETNAM_CITIES.length)],
                ["Currency", "VND"],
                ["Timezone", "UTC+7"],
                ["Language", "Vietnamese"],
              ].map(([label, value]) => (
                <div key={label} className="border-l border-amber-300/55 bg-white/[0.06] px-4 py-3">
                  <div className="text-[10px] font-bold uppercase tracking-[0.12em] text-orange-100/48">
                    {label}
                  </div>
                  <div className="mt-1 font-sans text-3xl font-black text-orange-50">
                    {value}
                  </div>
                </div>
              ))}
            </div>
            <Link
              href="/country/vietnam/itinerary"
              className="mt-5 flex items-center justify-between border border-amber-300/50 bg-amber-300 px-5 py-4 text-sm font-black uppercase tracking-[0.12em] text-slate-950"
            >
              Build Vietnam route <Compass size={18} />
            </Link>
          </aside>
        </div>
      </section>

      <section className="relative overflow-hidden px-6 py-20 sm:py-28">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_18%_10%,rgba(249,115,22,.18),transparent_36%),radial-gradient(circle_at_82%_20%,rgba(20,184,166,.18),transparent_34%)]" />
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-10 lg:grid-cols-[.72fr_1.28fr]">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.12em] text-amber-300">
                City launchpad
              </p>
              <h2 className="mt-4 font-sans text-[clamp(2.7rem,6vw,6rem)] font-black leading-none text-orange-50">
                Route by region, not checklist.
              </h2>
              <p className="mt-6 max-w-md text-sm leading-7 text-orange-50/70">
                Vietnam is long, humid, and regional. The right route balances
                heat, rain, transfers, food, mountains, beaches, and how much
                street energy you want each day.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {VIETNAM_CITIES.map((city) => (
                <Link
                  key={city.slug}
                  href={`/city/${city.slug}`}
                  className="group border border-orange-100/14 bg-orange-50/[0.06] p-5 backdrop-blur transition hover:-translate-y-1 hover:border-amber-300/70 hover:bg-orange-50/[0.1]"
                >
                  <div className="text-[10px] font-black uppercase tracking-[0.12em] text-amber-300/80">
                    {VIETNAM_CITY_REGIONS[city.slug]}
                  </div>
                  <div className="mt-2 font-sans text-3xl font-black leading-none text-orange-50 group-hover:text-amber-200">
                    {city.name}
                  </div>
                  <p className="mt-4 line-clamp-3 text-sm leading-6 text-orange-50/62">
                    {city.summary}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 py-20 sm:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 max-w-3xl">
            <p className="text-xs font-black uppercase tracking-[0.12em] text-amber-300">
              Travel personality
            </p>
            <h2 className="mt-4 font-sans text-[clamp(2.7rem,6vw,6rem)] font-black leading-none text-orange-50">
              Humid, layered, street-driven.
            </h2>
          </div>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {EXPERIENCE_SECTIONS.map((section) => {
              const Icon = section.icon;
              return (
                <article key={section.title} className="border border-orange-100/14 bg-black/22 p-5">
                  <Icon className="text-amber-300" size={26} />
                  <h3 className="mt-5 font-sans text-2xl font-black text-orange-50">
                    {section.title}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-orange-50/64">
                    {section.text}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="grid lg:grid-cols-3">
        {[
          ["Food culture", VIETNAM_COUNTRY_IMAGES.food, "Phở, bánh mì, bún chả, seafood, market snacks, and regional dishes as the day plan."],
          ["Coffee culture", VIETNAM_COUNTRY_IMAGES.coffee, "Phin rituals, egg coffee, coconut coffee, roasteries, laptop cafés, and sweet afternoon fuel."],
          ["Beaches & mountains", VIETNAM_COUNTRY_IMAGES.mountain, "Sapa terraces, Da Lat pine air, Da Nang beaches, Phu Quoc sunsets, Ha Long karsts."],
        ].map(([title, image, text]) => (
          <article key={title} className="relative min-h-[34rem] overflow-hidden">
            <img src={image} alt="" className="absolute inset-0 h-full w-full object-cover saturate-150" loading="lazy" />
            <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(5,16,13,.92),rgba(5,16,13,.2)_62%)]" />
            <div className="absolute bottom-0 p-6 sm:p-8">
              <h3 className="font-sans text-4xl font-black text-orange-50">{title}</h3>
              <p className="mt-4 max-w-sm text-sm leading-7 text-orange-50/76">{text}</p>
            </div>
          </article>
        ))}
      </section>

      <section className="px-6 py-20 sm:py-28">
        <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[1fr_1fr]">
          <Panel title="Local apps" icon={Smartphone}>
            <div className="grid gap-3 sm:grid-cols-2">
              {VIETNAM_LOCAL_APPS.slice(0, 8).map((app) => (
                <a key={app.slug} href={app.web_url ?? "#"} className="border border-orange-100/14 bg-white/[0.055] p-4">
                  <div className="font-sans text-2xl font-black text-orange-50">{app.name}</div>
                  <p className="mt-2 text-xs leading-5 text-orange-50/62">{app.purpose}</p>
                </a>
              ))}
            </div>
          </Panel>
          <Panel title="Price benchmarks" icon={BadgeDollarSign}>
            <div className="space-y-3">
              {VIETNAM_PRICE_BENCHMARKS.slice(0, 7).map((item) => (
                <div key={item.benchmark_key} className="grid grid-cols-[1fr_auto] gap-4 border-b border-orange-100/10 pb-3 text-sm">
                  <span className="text-orange-50/74">{item.label}</span>
                  <span className="font-bold text-amber-300">
                    {formatVnd(item.amount_typical_minor)}
                  </span>
                </div>
              ))}
            </div>
          </Panel>
        </div>
      </section>

      <section className="px-6 pb-20 sm:pb-28">
        <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[.9fr_1.1fr]">
          <Panel title="Phrasebook" icon={MessageCircle}>
            <div className="grid gap-3">
              {VIETNAM_PHRASES.slice(0, 8).map((phrase) => (
                <div key={phrase.phrase_key} className="border border-orange-100/12 bg-black/20 p-4">
                  <div className="text-xs uppercase tracking-[0.12em] text-amber-300/75">{phrase.category}</div>
                  <div className="mt-2 font-sans text-2xl font-black text-orange-50">{phrase.translated_text}</div>
                  <div className="mt-1 text-sm italic text-orange-50/58">{phrase.transliteration}</div>
                  <p className="mt-2 text-sm text-orange-50/74">{phrase.source_text}</p>
                </div>
              ))}
            </div>
          </Panel>
          <div className="space-y-6">
            <Panel title="Scams, safety, weather" icon={ShieldAlert}>
              <div className="grid gap-4">
                {safetyNotes.map((note) => (
                  <article key={note.title} className="border-l border-amber-300/55 bg-white/[0.05] p-4">
                    <div className="text-[10px] font-black uppercase tracking-[0.12em] text-amber-300/80">
                      {note.risk_level} risk
                    </div>
                    <h3 className="mt-2 font-sans text-2xl font-black text-orange-50">{note.title}</h3>
                    <p className="mt-2 text-sm leading-7 text-orange-50/66">{note.traveler_summary}</p>
                  </article>
                ))}
              </div>
            </Panel>
            <Panel title="Affiliate CTAs" icon={Sparkles}>
              <div className="grid gap-3 sm:grid-cols-2">
                {VIETNAM_AFFILIATE_OPPORTUNITIES.slice(0, 6).map((opportunity) => (
                  <div key={opportunity.opportunity_key} className="border border-orange-100/12 bg-white/[0.05] p-4">
                    <div className="font-sans text-2xl font-black capitalize text-orange-50">
                      {opportunity.category.replaceAll("_", " ")}
                    </div>
                    <p className="mt-2 text-xs leading-5 text-orange-50/62">{opportunity.traveler_need}</p>
                    <div className="mt-3 text-[10px] font-black uppercase tracking-[0.12em] text-amber-300">
                      {opportunity.priority} priority
                    </div>
                  </div>
                ))}
              </div>
            </Panel>
          </div>
        </div>
      </section>

      <section className="px-6 pb-24 sm:pb-32">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.12em] text-amber-300">Itinerary routes</p>
              <h2 className="mt-4 font-sans text-[clamp(2.7rem,6vw,6rem)] font-black leading-none text-orange-50">
                Pick the country rhythm.
              </h2>
            </div>
            <Link href="/country/vietnam/itinerary" className="border border-amber-300/60 px-5 py-3 text-sm font-black uppercase tracking-[0.12em] text-amber-300">
              Open route builder
            </Link>
          </div>
          <div className="grid gap-4 lg:grid-cols-3">
            {ROUTES.map((route) => (
              <article key={route.title} className="border border-orange-100/14 bg-black/24 p-5">
                <div className="text-xs font-black uppercase tracking-[0.12em] text-amber-300">{route.days}</div>
                <h3 className="mt-3 font-sans text-3xl font-black text-orange-50">{route.title}</h3>
                <p className="mt-3 text-sm leading-7 text-orange-50/66">{route.mood}</p>
                <p className="mt-5 text-xs leading-6 text-orange-50/48">{route.stops}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 pb-24">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs font-black uppercase tracking-[0.12em] text-amber-300">Travel activities</p>
          <div className="mt-5 flex flex-wrap gap-3">
            {VIETNAM_ACTIVITIES.map((activity) => (
              <span key={activity.slug} className="border border-orange-100/14 bg-white/[0.055] px-4 py-2 text-sm font-bold text-orange-50/82">
                {activity.label}
              </span>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

function Panel({
  title,
  icon: Icon,
  children,
}: {
  title: string;
  icon: typeof Smartphone;
  children: React.ReactNode;
}) {
  return (
    <section className="border border-orange-100/14 bg-black/28 p-5 shadow-2xl backdrop-blur sm:p-7">
      <div className="mb-6 flex items-center justify-between gap-4">
        <h2 className="font-sans text-4xl font-black text-orange-50">{title}</h2>
        <Icon className="text-amber-300" size={28} />
      </div>
      {children}
    </section>
  );
}
