/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import {
  Bike,
  Coffee,
  Compass,
  MapPinned,
  Moon,
  ShieldAlert,
  Smartphone,
  Train,
  Utensils,
  Waves,
  Wifi,
} from "lucide-react";
import {
  formatVnd,
  getVietnamIdentity,
  VIETNAM_ACTIVITIES,
  VIETNAM_ACTIVITY_DESTINATIONS,
  VIETNAM_CITY_IMAGES,
  VIETNAM_CITY_REGIONS,
  VIETNAM_LOCAL_APPS,
  VIETNAM_PRICE_BENCHMARKS,
  type VietnamCity,
} from "@/lib/vietnam/frontend";

const CITY_PERSONALITY: Record<
  string,
  {
    tempo: string;
    lead: string;
    highlights: string[];
    sections: Array<{ title: string; text: string; icon: typeof Coffee }>;
  }
> = {
  "ho-chi-minh-city": {
    tempo: "Fast, hot, neon, entrepreneurial",
    lead: "Use HCMC as the country’s highest-energy arrival: coffee by day, rooftop dusk, motorbike streams after dark, and Mekong access when you need river air.",
    highlights: ["Rooftop bars", "Street food", "Cafe work days", "Mekong day trips"],
    sections: [
      { title: "Motorbike rhythm", text: "GrabBike is everyday infrastructure; self-drive only if licensed, insured, and calm in dense traffic.", icon: Bike },
      { title: "Nightlife", text: "Bui Vien, cocktail rooms, craft beer, rooftop bars, late noodles, and app rides home.", icon: Moon },
      { title: "Digital nomad", text: "Strong apartment stock, cafés, coworking, delivery apps, and long-stay neighborhoods.", icon: Wifi },
    ],
  },
  hanoi: {
    tempo: "Layered, lake-led, old-quarter electric",
    lead: "Hanoi is slower than HCMC but denser in texture: old-quarter shopfronts, lakes, northern food, egg coffee, winter haze, and political boulevards.",
    highlights: ["Old Quarter", "Egg coffee", "Lakes", "Northern food"],
    sections: [
      { title: "Coffee culture", text: "Egg coffee, hidden cafés, lake-facing work sessions, and slow mornings before the alleys heat up.", icon: Coffee },
      { title: "Transport", text: "Walk compact areas, use Grab for longer jumps, and stage Ha Long, Sapa, or Ninh Binh from here.", icon: Train },
      { title: "Street crossing", text: "The old-quarter traffic rhythm rewards steady movement, not panic stops.", icon: ShieldAlert },
    ],
  },
  "da-nang": {
    tempo: "Airy, coastal, bridge-lit",
    lead: "Da Nang gives Vietnam a wide horizon: beach mornings, seafood nights, bridges, mountain roads, and the easiest base for Hoi An and Hue.",
    highlights: ["My Khe Beach", "Seafood", "Dragon Bridge", "Hoi An access"],
    sections: [
      { title: "Beaches", text: "Plan swims early or late; use the middle of the day for cafés, seafood, or Son Tra shade.", icon: Waves },
      { title: "Transport", text: "Airport convenience makes Da Nang the cleanest central-coast hub.", icon: Train },
      { title: "Day trips", text: "Hoi An, Hue, Ba Na Hills, Cham Islands, and the Hai Van Pass all orbit the city.", icon: Compass },
    ],
  },
  "hoi-an": {
    tempo: "Lantern-lit, handmade, crowded after dusk",
    lead: "Hoi An is for tailoring, cooking classes, cycling, riverside evenings, and knowing when to step away from the old-town crush.",
    highlights: ["Tailoring", "Lantern nights", "Cooking classes", "Cycling"],
    sections: [
      { title: "Hidden gems", text: "Go early for market lanes and river light; after dark, choose side streets and quieter bridges.", icon: MapPinned },
      { title: "Food culture", text: "Cao lầu, white rose dumplings, cooking classes, and market breakfasts.", icon: Utensils },
      { title: "Transport", text: "Pair walking old town with bicycles, taxis, or transfers from Da Nang.", icon: Train },
    ],
  },
  hue: {
    tempo: "Imperial, rainy, river-slow",
    lead: "Hue is Vietnam’s formal historical pause: citadel walls, royal tombs, pagodas, central cuisine, and rain that changes the mood rather than ruins it.",
    highlights: ["Citadel", "Royal tombs", "Perfume River", "Central food"],
    sections: [
      { title: "Food culture", text: "Bún bò Huế, imperial snacks, rice cakes, and slower meals near the river.", icon: Utensils },
      { title: "Transport", text: "Use drivers for tomb circuits; the Hue-Da Nang rail/road leg is part of the story.", icon: Train },
      { title: "Weather", text: "Rain can be atmospheric but affects tomb days, motorbike rides, and walking plans.", icon: ShieldAlert },
    ],
  },
  "nha-trang": {
    tempo: "Beachy, resort-forward, seafood bright",
    lead: "Nha Trang is a developed beach city for islands, diving, seafood, mud baths, and nightlife pockets.",
    highlights: ["Diving", "Islands", "Mud baths", "Seafood"],
    sections: [
      { title: "Beaches", text: "Boat days and visibility are weather-shaped; check operators before booking.", icon: Waves },
      { title: "Nightlife", text: "Beach bars and tourist strips need ordinary bill and late-ride awareness.", icon: Moon },
      { title: "Food", text: "Seafood, grilled dishes, and casual waterfront meals carry the city.", icon: Utensils },
    ],
  },
  "da-lat": {
    tempo: "Cool, pine-scented, romantic",
    lead: "Da Lat is the highland reset: cool air, flowers, waterfalls, pine forests, coffee farms, and lake walks.",
    highlights: ["Waterfalls", "Coffee farms", "Pine forests", "Cool weather"],
    sections: [
      { title: "Coffee culture", text: "Use Da Lat for origin stories, farms, roasteries, and long cool café sessions.", icon: Coffee },
      { title: "Mountains", text: "Waterfalls and viewpoints need weather checks and safer transport choices.", icon: MapPinned },
      { title: "Digital nomad", text: "Cooler weather makes longer work stays easier than coastal heat.", icon: Wifi },
    ],
  },
  sapa: {
    tempo: "Misty, steep, weather-dependent",
    lead: "Sapa is about rice terraces, village walks, homestays, mountain roads, fog, and learning to respect visibility.",
    highlights: ["Trekking", "Rice terraces", "Homestays", "Mountain weather"],
    sections: [
      { title: "Mountains", text: "Trekking quality depends on fog, rain, trail state, and guide quality.", icon: MapPinned },
      { title: "Safety", text: "Pack layers, expect slick trails, and avoid overcommitting in poor visibility.", icon: ShieldAlert },
      { title: "Transport", text: "Most travelers stage Sapa from Hanoi by train, bus, or private transfer.", icon: Train },
    ],
  },
  "phu-quoc": {
    tempo: "Island, sunset, resort-soft",
    lead: "Phu Quoc is Vietnam’s island finish: beaches, snorkeling, seafood, night markets, resorts, and boat days that depend on the sea.",
    highlights: ["Sunsets", "Snorkeling", "Seafood", "Night market"],
    sections: [
      { title: "Beaches", text: "Choose bases by beach style: resort quiet, sunset access, night-market energy, or boat trips.", icon: Waves },
      { title: "Transport", text: "Flights solve this leg; island distances make transfers worth planning.", icon: Train },
      { title: "Food", text: "Seafood grills, pepper farms, fish sauce context, and night-market snacks.", icon: Utensils },
    ],
  },
  "ha-long": {
    tempo: "Karst, cruise, fog, logistics",
    lead: "Ha Long is a bay decision more than a city break: cruise quality, weather, caves, routes, and transfer timing matter.",
    highlights: ["Bay cruises", "Caves", "Seafood", "Bai Tu Long"],
    sections: [
      { title: "Hidden gems", text: "Consider Bai Tu Long or Lan Ha alternatives when classic Ha Long feels too crowded.", icon: MapPinned },
      { title: "Safety", text: "Weather can cancel boats; check cruise reviews, safety standards, and pickup clarity.", icon: ShieldAlert },
      { title: "Transport", text: "Most trips stage from Hanoi by transfer; choose timing before booking a cruise.", icon: Train },
    ],
  },
  "ninh-binh": {
    tempo: "Limestone, river, bicycle, countryside",
    lead: "Ninh Binh is outdoors-first: boat caves, rice fields, temples, cycling, viewpoints, and easy Hanoi access.",
    highlights: ["Boat rides", "Cycling", "Viewpoints", "Temples"],
    sections: [
      { title: "Mountains", text: "Karst viewpoints and boat caves are the draw; rain changes visibility and river mood.", icon: MapPinned },
      { title: "Transport", text: "Train, bus, or car from Hanoi; local bicycles and drivers do the rest.", icon: Train },
      { title: "Hidden gems", text: "Stay overnight to get quiet mornings after day-trippers leave.", icon: Compass },
    ],
  },
  "can-tho": {
    tempo: "Delta dawn, canals, fruit, river heat",
    lead: "Can Tho is the Mekong’s urban base: floating markets, fruit gardens, canals, bridges, humid dawns, and southern food.",
    highlights: ["Floating markets", "Canals", "Fruit gardens", "Delta food"],
    sections: [
      { title: "Food culture", text: "Breakfast happens early on the water; build the day around dawn markets.", icon: Utensils },
      { title: "Transport", text: "Use boats, drivers, and patient timing; delta logistics do not reward rushing.", icon: Train },
      { title: "Hidden gems", text: "Fruit gardens, smaller canals, and local markets beat a one-photo stop.", icon: MapPinned },
    ],
  },
};

export function VietnamCityExperience({ city }: { city: VietnamCity }) {
  const identity = getVietnamIdentity(city.slug);
  const color = identity?.color_palette ?? {
    primary: "#111827",
    secondary: "#0F766E",
    accent: "#F97316",
    paper: "#FFF7ED",
  };
  const personality =
    CITY_PERSONALITY[city.slug] ??
    ({
      tempo: "Vibrant, humid, street-alive",
      lead: city.summary,
      highlights: ["Food", "Coffee", "Transport", "Local rhythm"],
      sections: [
        { title: "Local rhythm", text: city.summary, icon: MapPinned },
        { title: "Transport", text: "Use apps, local advice, and weather-aware transfers.", icon: Train },
        { title: "Safety", text: "Keep plans flexible around heat, rain, traffic, and activity risk.", icon: ShieldAlert },
      ],
    } satisfies (typeof CITY_PERSONALITY)[string]);

  const mappedActivities = VIETNAM_ACTIVITY_DESTINATIONS.filter(
    (item) => item.city_slug === city.slug || item.owner_kind === "country",
  )
    .slice(0, 6)
    .map((item) =>
      VIETNAM_ACTIVITIES.find((activity) => activity.slug === item.activity_slug),
    )
    .filter(Boolean);

  return (
    <main className="min-h-screen text-orange-50" style={{ backgroundColor: color.primary }}>
      <section className="relative isolate min-h-[calc(100svh-4rem)] overflow-hidden">
        <img
          src={VIETNAM_CITY_IMAGES[city.slug]}
          alt=""
          className="absolute inset-0 -z-30 h-full w-full object-cover saturate-150"
        />
        <div
          className="absolute inset-0 -z-20"
          style={{
            background: `linear-gradient(90deg, ${color.primary}f5, ${color.secondary ?? "#0F766E"}b8 48%, rgba(0,0,0,.35)), linear-gradient(0deg, ${color.primary}f0, transparent 58%)`,
          }}
        />
        <div className="absolute inset-0 -z-10 opacity-30 [background-image:repeating-linear-gradient(90deg,rgba(255,255,255,.18)_0_1px,transparent_1px_34px),repeating-linear-gradient(0deg,rgba(255,255,255,.09)_0_1px,transparent_1px_48px)]" />
        <div className="mx-auto grid min-h-[calc(100svh-4rem)] max-w-7xl content-end gap-10 px-6 pb-16 pt-24 lg:grid-cols-[1.05fr_.95fr] lg:items-end">
          <div>
            <nav className="text-xs font-bold uppercase tracking-[0.12em] text-orange-100/62">
              <Link href="/" className="hover:text-orange-100">Home</Link> ·{" "}
              <Link href="/country/vietnam" className="hover:text-orange-100">Vietnam</Link> · {city.name}
            </nav>
            <p className="mt-12 text-xs font-black uppercase tracking-[0.12em]" style={{ color: color.accent }}>
              {VIETNAM_CITY_REGIONS[city.slug]} · {personality.tempo}
            </p>
            <h1 className="mt-5 max-w-5xl font-sans text-[clamp(3.7rem,13vw,11rem)] font-black leading-[0.84] text-orange-50">
              {city.name}
            </h1>
            <p className="mt-8 max-w-2xl text-xl leading-9 text-orange-50/82">
              {personality.lead}
            </p>
          </div>
          <aside className="border border-orange-100/20 bg-black/35 p-5 shadow-2xl backdrop-blur-xl sm:p-7">
            <div className="text-[10px] font-black uppercase tracking-[0.12em] text-orange-50/48">
              First read
            </div>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {personality.highlights.map((highlight) => (
                <div key={highlight} className="border-l px-4 py-3" style={{ borderColor: color.accent, backgroundColor: "rgba(255,255,255,.07)" }}>
                  <div className="font-sans text-2xl font-black text-orange-50">{highlight}</div>
                </div>
              ))}
            </div>
          </aside>
        </div>
      </section>

      <section className="px-6 py-20 sm:py-28">
        <div className="mx-auto grid max-w-7xl gap-5 lg:grid-cols-3">
          {personality.sections.map((section) => {
            const Icon = section.icon;
            return (
              <article key={section.title} className="border border-orange-100/16 bg-black/24 p-6 backdrop-blur">
                <Icon style={{ color: color.accent }} size={28} />
                <h2 className="mt-5 font-sans text-3xl font-black text-orange-50">
                  {section.title}
                </h2>
                <p className="mt-3 text-sm leading-7 text-orange-50/68">{section.text}</p>
              </article>
            );
          })}
        </div>
      </section>

      <section className="px-6 pb-20 sm:pb-28">
        <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[.95fr_1.05fr]">
          <div className="border border-orange-100/16 bg-black/24 p-6 sm:p-8">
            <div className="flex items-center justify-between gap-4">
              <h2 className="font-sans text-4xl font-black text-orange-50">
                City toolkit
              </h2>
              <Smartphone style={{ color: color.accent }} />
            </div>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {VIETNAM_LOCAL_APPS.slice(0, 6).map((app) => (
                <a key={app.slug} href={app.web_url ?? "#"} className="border border-orange-100/12 bg-white/[0.05] p-4">
                  <div className="font-sans text-2xl font-black text-orange-50">{app.name}</div>
                  <p className="mt-2 text-xs leading-5 text-orange-50/62">{app.traveler_notes}</p>
                </a>
              ))}
            </div>
          </div>

          <div className="border border-orange-100/16 bg-black/24 p-6 sm:p-8">
            <div className="flex items-center justify-between gap-4">
              <h2 className="font-sans text-4xl font-black text-orange-50">
                Activities here
              </h2>
              <Compass style={{ color: color.accent }} />
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              {mappedActivities.map((activity) => (
                <span key={activity!.slug} className="border border-orange-100/14 bg-white/[0.055] px-4 py-2 text-sm font-bold text-orange-50/82">
                  {activity!.label}
                </span>
              ))}
            </div>
            <div className="mt-8 grid gap-3">
              {VIETNAM_PRICE_BENCHMARKS.slice(0, 5).map((price) => (
                <div key={price.benchmark_key} className="flex justify-between gap-4 border-b border-orange-100/10 pb-3 text-sm">
                  <span className="text-orange-50/68">{price.label}</span>
                  <span className="font-bold" style={{ color: color.accent }}>{formatVnd(price.amount_typical_minor)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
