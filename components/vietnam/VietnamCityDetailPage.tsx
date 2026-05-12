/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import {
  BadgeDollarSign,
  CalendarDays,
  Coffee,
  Compass,
  Hotel,
  Languages,
  MapPinned,
  Moon,
  Plane,
  ShieldAlert,
  ShoppingBag,
  Smartphone,
  Train,
  Utensils,
  Waves,
} from "lucide-react";
import {
  formatVnd,
  VIETNAM_ACTIVITIES,
  VIETNAM_ACTIVITY_DESTINATIONS,
  VIETNAM_CITY_IMAGES,
  VIETNAM_CITY_REGIONS,
  VIETNAM_INTELLIGENCE_NOTES,
  VIETNAM_LOCAL_APPS,
  VIETNAM_PHRASES,
  VIETNAM_PRICE_BENCHMARKS,
  type VietnamCity,
} from "@/lib/vietnam/frontend";

export type VietnamCityDetailKind =
  | "apps"
  | "arrival"
  | "attractions"
  | "calendar"
  | "connectivity"
  | "costs"
  | "culture"
  | "emergency"
  | "good-to-know"
  | "health-safety"
  | "hidden-gems"
  | "hotels"
  | "itinerary"
  | "kids"
  | "nearby"
  | "neighborhoods"
  | "nightlife"
  | "packing"
  | "payments"
  | "restaurants"
  | "shopping"
  | "tipping"
  | "transit"
  | "visa"
  | "weather"
  | "wellness";

const DETAIL_META: Record<
  VietnamCityDetailKind,
  {
    eyebrow: string;
    title: string;
    lead: (city: VietnamCity) => string;
    icon: typeof Compass;
    chips: string[];
  }
> = {
  apps: {
    eyebrow: "Local apps",
    title: "The apps that make the city easier",
    lead: (city) => `Set up the core apps before you land in ${city.name}: rides, delivery, maps, translation, and mobile data.`,
    icon: Smartphone,
    chips: ["Grab", "Zalo", "Maps", "Delivery"],
  },
  arrival: {
    eyebrow: "Arrival",
    title: "Land, transfer, breathe",
    lead: (city) => `A first-hour guide for ${city.name}: airport or station arrival, ride-hailing, luggage, cash, SIM setup, and heat-aware timing.`,
    icon: Plane,
    chips: ["Airport", "Transfers", "Cash", "SIM"],
  },
  attractions: {
    eyebrow: "Attractions",
    title: "What to actually plan around",
    lead: (city) => `${city.name} works best when you mix one anchor sight with food, coffee, walking, and weather-flexible backups.`,
    icon: MapPinned,
    chips: ["Sights", "Markets", "Viewpoints", "Museums"],
  },
  calendar: {
    eyebrow: "Calendar",
    title: "Time the crowds and weather",
    lead: (city) => `Use ${city.name} around Vietnam's holiday surges, regional rain, school breaks, and festival travel spikes.`,
    icon: CalendarDays,
    chips: ["Tet", "Rain", "Weekends", "Festivals"],
  },
  connectivity: {
    eyebrow: "Connectivity",
    title: "Stay online without friction",
    lead: () => "Vietnam is app-first for rides, translation, food delivery, maps, and messaging. Sort data before the first transfer.",
    icon: Smartphone,
    chips: ["eSIM", "Local SIM", "Wi-Fi", "VPN"],
  },
  costs: {
    eyebrow: "Daily costs",
    title: "What the day will cost",
    lead: (city) => `Typical ${city.name} costs for coffee, meals, rides, laundry, coworking, attractions, and longer transfers.`,
    icon: BadgeDollarSign,
    chips: ["Coffee", "Meals", "Rides", "Rooms"],
  },
  culture: {
    eyebrow: "People and language",
    title: "Read the local rhythm",
    lead: (city) => `${city.name} becomes easier when you know the greetings, traffic rhythm, cafe etiquette, market style, and how to be politely direct.`,
    icon: Languages,
    chips: ["Phrases", "Manners", "Markets", "Dress"],
  },
  emergency: {
    eyebrow: "Emergency",
    title: "Save this before you need it",
    lead: () => "A simple quick card for urgent numbers, hotel address, ride apps, insurance, medication, and what to do when plans go sideways.",
    icon: ShieldAlert,
    chips: ["Police", "Medical", "Insurance", "Hotel card"],
  },
  "good-to-know": {
    eyebrow: "Good to know",
    title: "Small details, smoother days",
    lead: (city) => `The practical ${city.name} layer: bathrooms, crossing streets, paying, tipping, heat, laundry, scams, and how not to over-plan.`,
    icon: Compass,
    chips: ["Etiquette", "Heat", "Toilets", "Laundry"],
  },
  "health-safety": {
    eyebrow: "Health and safety",
    title: "Stay steady on the ground",
    lead: () => "Vietnam is rewarding and busy: road safety, food hygiene, heat, rain, medication rules, nightlife rides, and tour operator checks matter.",
    icon: ShieldAlert,
    chips: ["Roads", "Food", "Heat", "Medication"],
  },
  "hidden-gems": {
    eyebrow: "Hidden gems",
    title: "Leave room for the smaller places",
    lead: (city) => `The best ${city.name} days usually come from one quiet lane, one cafe, one market, and a flexible walk between them.`,
    icon: Coffee,
    chips: ["Cafes", "Alleys", "Markets", "Local walks"],
  },
  hotels: {
    eyebrow: "Hotels",
    title: "Pick the base before the room",
    lead: (city) => `For ${city.name}, neighborhood fit matters more than star count: walking radius, ride access, noise, heat, and day-trip logistics.`,
    icon: Hotel,
    chips: ["Areas", "Noise", "Pools", "Transfers"],
  },
  itinerary: {
    eyebrow: "Itineraries",
    title: "Build the city into the route",
    lead: (city) => `${city.name} should earn its place in the Vietnam route: arrival base, food stop, beach pause, mountain reset, or delta launchpad.`,
    icon: Compass,
    chips: ["2 days", "3 days", "Slow route", "Day trips"],
  },
  kids: {
    eyebrow: "Family travel",
    title: "Keep the day soft-edged",
    lead: (city) => `Family days in ${city.name} need shade, pools, short transfers, snack stops, and one clear anchor instead of a packed list.`,
    icon: Waves,
    chips: ["Pools", "Shade", "Snacks", "Short rides"],
  },
  nearby: {
    eyebrow: "Nearby",
    title: "Where to go next",
    lead: (city) => `${city.name} can connect into beaches, mountains, heritage towns, islands, river country, or the next big city.`,
    icon: Train,
    chips: ["Train", "Flight", "Private car", "Boat"],
  },
  neighborhoods: {
    eyebrow: "Neighborhoods",
    title: "Choose your base by trip style",
    lead: (city) => `${city.name} changes block by block. Pick the area by sleep, food, walks, nightlife, work needs, and transfer friction.`,
    icon: MapPinned,
    chips: ["Sleep", "Food", "Nightlife", "Walks"],
  },
  nightlife: {
    eyebrow: "Nightlife",
    title: "Eat first, stay flexible after dark",
    lead: (city) => `${city.name} nights are strongest when dinner, cafes, rooftops, music, and safe rides home are planned as one rhythm.`,
    icon: Moon,
    chips: ["Rooftops", "Beer", "Late food", "Rides"],
  },
  packing: {
    eyebrow: "Packing",
    title: "Pack for heat, rain, and motion",
    lead: () => "Vietnam packing is light, breathable, rain-aware, modest enough for temples, and ready for motorbike spray or sleeper trains.",
    icon: Waves,
    chips: ["Rain shell", "Breathable", "Temple layer", "Day bag"],
  },
  payments: {
    eyebrow: "Payments",
    title: "Cash, cards, and app habits",
    lead: () => "Carry cash for markets and small shops, cards for hotels and bigger restaurants, and expect app payments to be local-account dependent.",
    icon: BadgeDollarSign,
    chips: ["VND cash", "Cards", "ATMs", "QR"],
  },
  restaurants: {
    eyebrow: "Restaurants",
    title: "Eat by region, not just rating",
    lead: (city) => `${city.name} food planning should start with regional dishes, breakfast timing, market confidence, and one reservation-worthy meal.`,
    icon: Utensils,
    chips: ["Street food", "Regional dishes", "Cafes", "Seafood"],
  },
  shopping: {
    eyebrow: "Shopping",
    title: "What is worth carrying home",
    lead: () => "Vietnam is strongest for coffee, ceramics, textiles, tailoring, lacquerware, baskets, pepper, fish sauce, and small design studios.",
    icon: ShoppingBag,
    chips: ["Coffee", "Textiles", "Tailoring", "Ceramics"],
  },
  tipping: {
    eyebrow: "Tipping",
    title: "Tip simply, not performatively",
    lead: () => "Tipping is appreciated in tourist-facing services but not a complicated ritual. Use small cash and keep it easy.",
    icon: BadgeDollarSign,
    chips: ["Guides", "Drivers", "Hotels", "Restaurants"],
  },
  transit: {
    eyebrow: "Transit",
    title: "Move with the city, not against it",
    lead: (city) => `${city.name} transit is a mix of walking pockets, Grab rides, taxis, bikes, trains, buses, and weather-shaped patience.`,
    icon: Train,
    chips: ["Grab", "Walking", "Train", "Transfers"],
  },
  visa: {
    eyebrow: "Visa",
    title: "Check the rule before booking",
    lead: () => "Visa eligibility depends on passport, stay length, entry point, and current official rules. Treat this page as a planning prompt.",
    icon: Plane,
    chips: ["Passport", "eVisa", "Stay limit", "Official source"],
  },
  weather: {
    eyebrow: "Weather",
    title: "Vietnam is regional weather",
    lead: (city) => `${city.name} should be planned by heat, humidity, rain timing, storm season, visibility, and how much outdoor time you want.`,
    icon: CalendarDays,
    chips: ["Heat", "Rain", "Humidity", "Storms"],
  },
  wellness: {
    eyebrow: "Wellness",
    title: "Reset between the busy days",
    lead: (city) => `Use ${city.name} for massage, pools, quiet cafes, beach time, spa breaks, or one slow morning when the route gets loud.`,
    icon: Waves,
    chips: ["Massage", "Spa", "Pools", "Slow mornings"],
  },
};

const DETAIL_ORDER: VietnamCityDetailKind[] = [
  "arrival",
  "neighborhoods",
  "hotels",
  "restaurants",
  "attractions",
  "itinerary",
  "transit",
  "weather",
  "costs",
  "culture",
  "health-safety",
  "hidden-gems",
];

export function VietnamCityDetailPage({
  city,
  kind,
}: {
  city: VietnamCity;
  kind: VietnamCityDetailKind;
}) {
  const meta = DETAIL_META[kind];
  const Icon = meta.icon;
  const cityActivities = VIETNAM_ACTIVITY_DESTINATIONS.filter(
    (item) => item.city_slug === city.slug || item.owner_kind === "country",
  )
    .map((item) => VIETNAM_ACTIVITIES.find((activity) => activity.slug === item.activity_slug))
    .filter(Boolean)
    .slice(0, 7);
  const notes = VIETNAM_INTELLIGENCE_NOTES.slice(0, 5);
  const image = VIETNAM_CITY_IMAGES[city.slug];

  return (
    <main className="min-h-screen bg-[#07120f] text-orange-50">
      <section className="relative isolate overflow-hidden px-6 pb-16 pt-24 sm:pb-24">
        <img src={image} alt="" className="absolute inset-0 -z-30 h-full w-full object-cover saturate-150" />
        <div className="absolute inset-0 -z-20 bg-[linear-gradient(90deg,rgba(5,16,13,.97),rgba(15,118,110,.72)_50%,rgba(0,0,0,.42)),linear-gradient(0deg,#07120f,transparent_62%)]" />
        <div className="absolute inset-0 -z-10 opacity-30 [background-image:repeating-linear-gradient(90deg,rgba(255,255,255,.14)_0_1px,transparent_1px_36px),repeating-linear-gradient(0deg,rgba(255,255,255,.08)_0_1px,transparent_1px_52px)]" />

        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.05fr_.95fr] lg:items-end">
          <div>
            <nav className="text-xs font-bold uppercase tracking-[0.12em] text-orange-100/62">
              <Link href="/" className="hover:text-orange-100">Home</Link> ·{" "}
              <Link href="/country/vietnam" className="hover:text-orange-100">Vietnam</Link> ·{" "}
              <Link href={`/city/${city.slug}`} className="hover:text-orange-100">{city.name}</Link>
            </nav>
            <p className="mt-16 text-xs font-black uppercase tracking-[0.12em] text-amber-300">
              {VIETNAM_CITY_REGIONS[city.slug]} · {meta.eyebrow}
            </p>
            <h1 className="mt-5 max-w-5xl font-sans text-[clamp(3.2rem,10vw,8rem)] font-black leading-[0.88] text-orange-50">
              {meta.title}
            </h1>
            <p className="mt-8 max-w-2xl text-xl leading-9 text-orange-50/82">
              {meta.lead(city)}
            </p>
          </div>
          <aside className="border border-orange-100/20 bg-black/35 p-6 shadow-2xl backdrop-blur-xl">
            <Icon className="text-amber-300" size={34} />
            <h2 className="mt-5 font-sans text-4xl font-black leading-none text-orange-50">
              {city.name}
            </h2>
            <div className="mt-5 flex flex-wrap gap-2">
              {meta.chips.map((chip) => (
                <span key={chip} className="border border-orange-100/14 bg-white/[0.07] px-3 py-1.5 text-xs font-bold text-orange-50/78">
                  {chip}
                </span>
              ))}
            </div>
          </aside>
        </div>
      </section>

      <section className="px-6 py-16 sm:py-24">
        <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[.9fr_1.1fr]">
          <article className="border border-orange-100/16 bg-black/24 p-6 sm:p-8">
            <p className="text-xs font-black uppercase tracking-[0.12em] text-amber-300">
              Practical read
            </p>
            <h2 className="mt-4 font-sans text-[clamp(2.2rem,5vw,4.8rem)] font-black leading-none text-orange-50">
              What matters first
            </h2>
            <div className="mt-8 grid gap-3">
              {notes.map((note) => (
                <div key={note.intelligence_category} className="border-l border-amber-300/55 bg-white/[0.055] px-4 py-3">
                  <div className="text-sm font-black text-orange-50">{note.title}</div>
                  <p className="mt-1 text-sm leading-6 text-orange-50/66">{note.traveler_summary}</p>
                </div>
              ))}
            </div>
          </article>

          <article className="border border-orange-100/16 bg-black/24 p-6 sm:p-8">
            <p className="text-xs font-black uppercase tracking-[0.12em] text-amber-300">
              Useful anchors
            </p>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {cityActivities.map((activity) => (
                <div key={activity!.slug} className="border border-orange-100/12 bg-white/[0.055] p-4">
                  <div className="font-sans text-2xl font-black text-orange-50">{activity!.label}</div>
                  <p className="mt-2 text-xs leading-5 text-orange-50/62">{activity!.description}</p>
                </div>
              ))}
            </div>
            <div className="mt-8 grid gap-3">
              {VIETNAM_PRICE_BENCHMARKS.slice(0, 4).map((price) => (
                <div key={price.benchmark_key} className="flex justify-between gap-4 border-b border-orange-100/10 pb-3 text-sm">
                  <span className="text-orange-50/68">{price.label}</span>
                  <span className="font-bold text-amber-300">{formatVnd(price.amount_typical_minor)}</span>
                </div>
              ))}
            </div>
          </article>
        </div>
      </section>

      <section className="px-6 pb-20 sm:pb-28">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-4 md:grid-cols-3">
            {VIETNAM_LOCAL_APPS.slice(0, 3).map((app) => (
              <a key={app.slug} href={app.web_url ?? "#"} className="border border-orange-100/14 bg-orange-50/[0.06] p-5">
                <div className="font-sans text-2xl font-black text-orange-50">{app.name}</div>
                <p className="mt-2 text-sm leading-6 text-orange-50/62">{app.traveler_notes}</p>
              </a>
            ))}
          </div>

          <div className="mt-12 border-t border-orange-100/14 pt-8">
            <p className="text-xs font-black uppercase tracking-[0.12em] text-amber-300">
              More {city.name}
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              {DETAIL_ORDER.filter((item) => item !== kind).map((item) => (
                <Link
                  key={item}
                  href={`/city/${city.slug}/${item}`}
                  className="border border-orange-100/14 bg-white/[0.055] px-4 py-2 text-sm font-bold text-orange-50/76 hover:border-amber-300 hover:text-amber-200"
                >
                  {DETAIL_META[item].eyebrow}
                </Link>
              ))}
              <Link
                href="/country/vietnam/itinerary"
                className="border border-amber-300/50 bg-amber-300 px-4 py-2 text-sm font-black text-slate-950"
              >
                Build Vietnam route
              </Link>
            </div>
          </div>

          <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {VIETNAM_PHRASES.slice(0, 6).map((phrase) => (
              <div key={phrase.phrase_key} className="border border-orange-100/10 bg-black/20 p-4">
                <div className="text-lg font-black text-orange-50">{phrase.translated_text}</div>
                <div className="mt-1 text-sm text-amber-200">{phrase.transliteration}</div>
                <div className="mt-2 text-xs text-orange-50/58">{phrase.source_text}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
