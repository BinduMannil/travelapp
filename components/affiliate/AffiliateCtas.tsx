import { AffiliateLink } from "./AffiliateLink";

// Compact, re-usable CTA blocks we can drop into specific pages
// (health-safety, connectivity, arrival, payments, nearby cities, etc.).
// Each renders a small card with a headline and one primary outbound button.

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
}) {
  // Editorial Japanese palette: every card is a sheet of washi (paper)
  // marked with a single accent — a top stripe (like a book spine or
  // hanko border), a tinted kanji badge, and an ink-stamp button.
  const accentStripe: Record<string, string> = {
    enji: "bg-enji-600",
    aizome: "bg-aizome-600",
    matcha: "bg-matcha-600",
    kintsugi: "bg-kintsugi-500",
    ume: "bg-enji-700",
  };
  const accentKanji: Record<string, string> = {
    enji: "bg-enji-50 text-enji-700 ring-enji-200",
    aizome: "bg-aizome-50 text-aizome-700 ring-aizome-200",
    matcha: "bg-matcha-100 text-matcha-700 ring-matcha-400/40",
    kintsugi: "bg-kintsugi-300/25 text-enji-700 ring-kintsugi-400/50",
    ume: "bg-washi-200 text-enji-700 ring-enji-200",
  };
  const accentBtn: Record<string, string> = {
    enji: "bg-enji-600 hover:bg-enji-700",
    aizome: "bg-aizome-600 hover:bg-aizome-700",
    matcha: "bg-matcha-600 hover:bg-matcha-700",
    kintsugi: "bg-kintsugi-500 hover:bg-enji-700",
    ume: "bg-enji-700 hover:bg-enji-900",
  };

  return (
    <div className="relative flex h-full flex-col overflow-hidden rounded-2xl border border-washi-200 bg-washi-50 p-6 shadow-sm">
      <span
        aria-hidden
        className={`absolute inset-x-0 top-0 h-1 ${accentStripe[accent]}`}
      />
      <div className="flex items-center gap-3">
        <span
          className={`grid h-11 w-11 shrink-0 place-items-center rounded-xl font-display text-xl font-bold ring-1 ${accentKanji[accent]}`}
        >
          {kanji}
        </span>
        <div className="text-[10px] font-semibold uppercase tracking-[0.25em] text-sumi-700">
          {eyebrow}
        </div>
      </div>
      <h3 className="mt-4 font-display text-xl font-semibold leading-snug text-sumi-900">
        {title}
      </h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-sumi-700">{body}</p>
      <AffiliateLink
        href={href}
        partner={partner}
        source={source}
        className={`mt-5 inline-flex items-center justify-center rounded-full px-5 py-2.5 text-sm font-semibold text-white transition ${accentBtn[accent]}`}
      >
        {button} →
      </AffiliateLink>
    </div>
  );
}

export function InsuranceCta({ source }: { source?: string } = {}) {
  return (
    <Card
      kanji="守"
      eyebrow="Travel insurance"
      title="Don't wing it on insurance"
      body="SafetyWing covers medical, lost baggage, and trip interruption. $45/4 weeks for most travelers; renew monthly while you're away."
      button="Get a quote"
      href="https://safetywing.com/nomad-insurance"
      partner="safetywing"
      source={source}
      accent="enji"
    />
  );
}

export function FlightCta({
  destinationIata = "TYO",
  source,
}: {
  destinationIata?: string;
  source?: string;
} = {}) {
  return (
    <Card
      kanji="空"
      eyebrow="Flights"
      title="Compare flights to Tokyo"
      body="Skyscanner compares 1,200+ airlines and travel sites in one search. Flexible-date view catches the cheap weeks."
      button="Search flights"
      href={`https://www.skyscanner.net/transport/flights-to/${destinationIata}/`}
      partner="skyscanner"
      source={source}
      accent="aizome"
    />
  );
}

export function EsimCta({ source }: { source?: string } = {}) {
  return (
    <Card
      kanji="通"
      eyebrow="eSIM for Japan"
      title="Arrive online"
      body="Airalo's Moshi Moshi eSIM activates the moment you land. $18.50 for 5GB / 30 days — cheaper than most airport SIM counters."
      button="Get an eSIM"
      href="https://www.airalo.com/japan-esim"
      partner="airalo"
      source={source}
      accent="matcha"
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
    />
  );
}

export function LuggageCta({ source }: { source?: string } = {}) {
  return (
    <Card
      kanji="荷"
      eyebrow="Luggage storage"
      title="Drop the bags, go see the city"
      body="Bounce partners with cafés, hotels, and shops for same-day luggage drops — from $5.90/day, booked in 60 seconds."
      button="Find luggage storage"
      href="https://usebounce.com/city/tokyo"
      partner="bounce"
      source={source}
      accent="matcha"
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
    />
  );
}
