import { AffiliateLink } from "./AffiliateLink";

// Compact, re-usable CTA blocks we can drop into specific pages
// (health-safety, connectivity, arrival, payments, nearby cities, etc.).
// Each renders a small card with a headline and one primary outbound button.

const AFFILIATE_IMAGES = {
  hotel:
    "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1200&q=82",
  flight:
    "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=1200&q=82",
  insurance:
    "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=82",
  esim:
    "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=82",
  car:
    "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=82",
  tours:
    "https://images.unsplash.com/photo-1528360983277-13d401cdc186?auto=format&fit=crop&w=1200&q=82",
  transfer:
    "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=82",
  stay:
    "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=82",
  luggage:
    "https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=1200&q=82",
  money:
    "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?auto=format&fit=crop&w=1200&q=82",
};

function Card({
  kanji,
  eyebrow,
  title,
  body,
  button,
  href,
  partner,
  source,
  accent = "enji",
  imageUrl,
}: {
  kanji: string;
  eyebrow: string;
  title: string;
  body: string;
  button: string;
  href: string;
  partner:
    | "booking"
    | "agoda"
    | "klook"
    | "getyourguide"
    | "viator"
    | "safetywing"
    | "heymondo"
    | "airalo"
    | "holafly"
    | "welcomepickups"
    | "bounce"
    | "wise"
    | "skyscanner"
    | "kiwi"
    | "discovercars"
    | "rentalcars";
  source?: string;
  accent?: "enji" | "aizome" | "matcha" | "kintsugi" | "ume";
  imageUrl: string;
}) {
  const accentBtn: Record<string, string> = {
    enji: "bg-enji-600/95 hover:bg-enji-500",
    aizome: "bg-aizome-600/95 hover:bg-aizome-500",
    matcha: "bg-matcha-700/95 hover:bg-matcha-600",
    kintsugi: "bg-kintsugi-500/95 hover:bg-kintsugi-400 text-sumi-900",
    ume: "bg-enji-700/95 hover:bg-enji-600",
  };
  const accentRing: Record<string, string> = {
    enji: "border-enji-300/40",
    aizome: "border-aizome-100/35",
    matcha: "border-matcha-100/35",
    kintsugi: "border-kintsugi-300/55",
    ume: "border-sakura-200/45",
  };

  return (
    <article className={`group relative flex min-h-[28rem] overflow-hidden rounded-[1.35rem] border ${accentRing[accent]} bg-sumi-900 text-white shadow-editorial-deep`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={imageUrl}
        alt=""
        className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,.04),rgba(0,0,0,.35)_36%,rgba(0,0,0,.88)),linear-gradient(90deg,rgba(0,0,0,.36),transparent)]" />
      <div className="relative flex w-full flex-col justify-end p-5 sm:p-7">
        <div className="rounded-[1.05rem] border border-white/18 bg-black/32 p-5 shadow-editorial-deep backdrop-blur-xl sm:p-6">
          <div className="flex items-center justify-between gap-4">
            <div className="text-[10px] font-bold uppercase tracking-[0.3em] text-kintsugi-300">
              {eyebrow}
            </div>
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full border border-white/25 bg-white/12 font-display text-2xl font-semibold text-white">
              {kanji}
            </span>
          </div>
          <h3 className="editorial-module-title mt-5 font-display font-semibold text-white">
            {title}
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-white/76">{body}</p>
          <AffiliateLink
            href={href}
            partner={partner}
            source={source}
            className={`mt-5 inline-flex w-full items-center justify-center rounded-full px-5 py-3 text-sm font-bold text-white transition ${accentBtn[accent]}`}
          >
            {button} →
          </AffiliateLink>
        </div>
      </div>
    </article>
  );
}

export function InsuranceCta({ source }: { source?: string } = {}) {
  return (
    <Card
      kanji="守"
      eyebrow="Travel insurance"
      title="Don't wing it on insurance"
      body="SafetyWing covers medical, lost baggage, and trip interruption. Month-to-month pricing so you can renew while you're away."
      button="Get a quote"
      href="https://safetywing.com/nomad-insurance"
      partner="safetywing"
      source={source}
      accent="enji"
      imageUrl={AFFILIATE_IMAGES.insurance}
    />
  );
}

export function FlightCta({
  destinationIata = "TYO",
  destinationLabel = "Tokyo",
  source,
}: {
  destinationIata?: string;
  destinationLabel?: string;
  source?: string;
} = {}) {
  return (
    <Card
      kanji="空"
      eyebrow="Flights"
      title={`Compare flights to ${destinationLabel}`}
      body="Skyscanner compares 1,200+ airlines and travel sites in one search. Flexible-date view catches the cheap weeks."
      button="Search flights"
      href={`https://www.skyscanner.net/transport/flights-to/${destinationIata}/`}
      partner="skyscanner"
      source={source}
      accent="aizome"
      imageUrl={AFFILIATE_IMAGES.flight}
    />
  );
}

export function EsimCta({ source }: { source?: string } = {}) {
  return (
    <Card
      kanji="通"
      eyebrow="eSIM for Japan"
      title="Arrive online"
      body="Airalo's Moshi Moshi eSIM activates the moment you land — 5 GB for 30 days, cheaper than most airport SIM counters."
      button="Get an eSIM"
      href="https://www.airalo.com/japan-esim"
      partner="airalo"
      source={source}
      accent="matcha"
      imageUrl={AFFILIATE_IMAGES.esim}
    />
  );
}

export function CarRentalCta({ source }: { source?: string } = {}) {
  return (
    <Card
      kanji="車"
      eyebrow="Rental cars"
      title="Rent a car for the countryside"
      body="Discover Cars aggregates Nippon Rent-A-Car, Times, Toyota Rent a Car, and the big internationals. Full insurance coverage included in the rate."
      button="Compare cars"
      href="https://www.discovercars.com/japan"
      partner="discovercars"
      source={source}
      accent="aizome"
      imageUrl={AFFILIATE_IMAGES.car}
    />
  );
}

export function ToursCta({
  city = "Tokyo",
  source,
}: {
  city?: string;
  source?: string;
} = {}) {
  return (
    <Card
      kanji="巡"
      eyebrow="Tours & tickets"
      title={`Pre-book ${city} tours`}
      body="GetYourGuide handles skip-the-line tickets, foodie walks, cultural experiences. Free cancellation up to 24h on most."
      button="Browse tours"
      href={`https://www.getyourguide.com/s/?q=${encodeURIComponent(city)}`}
      partner="getyourguide"
      source={source}
      accent="kintsugi"
      imageUrl={AFFILIATE_IMAGES.tours}
    />
  );
}

export function HotelCta({
  city = "Tokyo",
  source,
}: {
  city?: string;
  source?: string;
} = {}) {
  return (
    <Card
      kanji="宿"
      eyebrow="Hotels"
      title={`Find a room in ${city}`}
      body="Booking.com lists every tier from capsules to Aman. Free cancellation filter + no hidden fees."
      button="Search hotels"
      href={`https://www.booking.com/searchresults.html?ss=${encodeURIComponent(city)}`}
      partner="booking"
      source={source}
      accent="ume"
      imageUrl={AFFILIATE_IMAGES.hotel}
    />
  );
}

export function PrivateStayCta({
  city = "Tokyo",
  source,
}: {
  city?: string;
  source?: string;
} = {}) {
  return (
    <Card
      kanji="宅"
      eyebrow="Private stays"
      title={`Apartments & homes in ${city}`}
      body="Airbnb-style stays — machiya townhouses, serviced apartments, whole homes. Better for groups, families, or stays of a week+."
      button="Browse stays"
      href={`https://www.airbnb.com/s/${encodeURIComponent(city)}/homes`}
      // No Airbnb affiliate programme in 2026; outbound link only. Swap
      // to Vrbo or Plum Guide (both have affiliate programmes) once you
      // have a preferred partner.
      partner="booking"
      source={source}
      accent="matcha"
      imageUrl={AFFILIATE_IMAGES.stay}
    />
  );
}

export function AirportTransferCta({
  city = "Tokyo",
  source,
}: {
  city?: string;
  source?: string;
} = {}) {
  return (
    <Card
      kanji="送"
      eyebrow="Airport transfer"
      title={`Door-to-door into ${city}`}
      body="Welcome Pickups books an English-speaking driver waiting at arrivals with a sign. Fixed price, no haggling with the taxi queue."
      button="Book transfer"
      href={`https://www.welcomepickups.com/${city.toLowerCase()}/airport-taxi/`}
      partner="welcomepickups"
      source={source}
      accent="enji"
      imageUrl={AFFILIATE_IMAGES.transfer}
    />
  );
}

export function LuggageCta({ source }: { source?: string } = {}) {
  return (
    <Card
      kanji="荷"
      eyebrow="Luggage storage"
      title="Drop the bags, go see the city"
      body="Bounce partners with cafés, hotels, and shops for same-day luggage drops — low day rate, booked in 60 seconds."
      button="Find luggage storage"
      href="https://usebounce.com/city/tokyo"
      partner="bounce"
      source={source}
      accent="matcha"
      imageUrl={AFFILIATE_IMAGES.luggage}
    />
  );
}

export function FxCardCta({ source }: { source?: string } = {}) {
  return (
    <Card
      kanji="替"
      eyebrow="Money card"
      title="Avoid the FX markup"
      body="Wise gives you near-interbank rates and a multi-currency debit card. Better than every airport exchange counter; works at 7-Eleven ATMs in Japan."
      button="Sign up free"
      href="https://wise.com/invite"
      partner="wise"
      source={source}
      accent="kintsugi"
      imageUrl={AFFILIATE_IMAGES.money}
    />
  );
}
