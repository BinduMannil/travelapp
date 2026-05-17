import Image from "next/image";
import {
  ArrowRight,
  Car,
  ChefHat,
  Clock3,
  Compass,
  FileCheck2,
  HeartPulse,
  Hotel,
  LifeBuoy,
  MapPin,
  MessageCircle,
  Plane,
  Sailboat,
  ShieldCheck,
  Sparkles,
  Star,
  Sun,
  Utensils,
  Wand2,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

type TimelineItem = {
  title: string;
  detail: string;
  time: string;
  icon: LucideIcon;
};

type RequestCard = {
  title: string;
  detail: string;
  icon: LucideIcon;
};

type Reservation = {
  type: string;
  title: string;
  time: string;
  status: string;
  image: string;
  icon: LucideIcon;
};

const timelineItems: TimelineItem[] = [
  {
    title: "Airport pickup confirmed",
    detail: "Mercedes EQS, Gate 4 arrivals. Chauffeur has live flight tracking enabled.",
    time: "07:40",
    icon: Car,
  },
  {
    title: "Dinner reservation secured",
    detail: "Terrace table confirmed at La Pergola with dietary notes already briefed.",
    time: "20:30",
    icon: Utensils,
  },
  {
    title: "Visa document verified",
    detail: "Entry documents checked against the latest consular requirements.",
    time: "Complete",
    icon: FileCheck2,
  },
  {
    title: "Weather advisory",
    detail: "Light mistral expected near the coast. Driver window shifted by 12 minutes.",
    time: "Live",
    icon: Sun,
  },
  {
    title: "Private experience booked",
    detail: "After-hours gallery access and curator walk-through confirmed.",
    time: "Tomorrow",
    icon: Sparkles,
  },
];

const vipRequests: RequestCard[] = [
  { title: "Private Jet Inquiry", detail: "Route options, catering, hangar timing and ground transfer sync.", icon: Plane },
  { title: "Yacht Charter", detail: "Tender access, captain brief, lunch route and sunset anchorage.", icon: Sailboat },
  { title: "Fine Dining Access", detail: "Hard-to-secure tables, tasting menus and guest preference notes.", icon: ChefHat },
  { title: "Local Guide Booking", detail: "Vetted experts for art, architecture, markets and family pacing.", icon: Compass },
  { title: "Wellness Retreat", detail: "Spa holds, recovery menus, movement sessions and quiet transfers.", icon: HeartPulse },
  { title: "Last Minute Changes", detail: "Discreet rebooking support when plans need to move gracefully.", icon: Wand2 },
];

const recommendationItems = [
  "Hidden restaurants with terrace availability",
  "Best sunset spots within 18 minutes",
  "Private local experiences for tomorrow",
  "Emergency support and escalation paths",
  "Cultural etiquette before arrival",
];

const reservations: Reservation[] = [
  {
    type: "Flight",
    title: "DXB to FCO, First Class",
    time: "Departs 03:55, chauffeur at 01:40",
    status: "Confirmed",
    image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=1200&q=86",
    icon: Plane,
  },
  {
    type: "Stay",
    title: "Hotel de Russie, Garden Suite",
    time: "Early arrival prepared from 10:30",
    status: "VIP noted",
    image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=1200&q=86",
    icon: Hotel,
  },
  {
    type: "Transfer",
    title: "Fiumicino Arrival Service",
    time: "Driver arrives in 14 minutes",
    status: "Tracking",
    image: "https://images.unsplash.com/photo-1533106418989-88406c7cc8ca?auto=format&fit=crop&w=1200&q=86",
    icon: Car,
  },
  {
    type: "Experience",
    title: "Private Vatican After Hours",
    time: "Tomorrow, 19:00",
    status: "Secured",
    image: "https://images.unsplash.com/photo-1529260830199-42c24126f198?auto=format&fit=crop&w=1200&q=86",
    icon: Star,
  },
];

const supportItems = [
  "Embassy contacts",
  "Local emergency numbers",
  "Insurance support",
  "Medical assistance",
  "Lost passport guidance",
];

function SectionHeader({
  eyebrow,
  title,
  body,
}: {
  eyebrow: string;
  title: string;
  body: string;
}) {
  return (
    <div className="mx-auto mb-10 max-w-3xl text-center md:mb-12">
      <p className="text-sm font-medium uppercase text-[#d9b66d]">{eyebrow}</p>
      <h2 className="mt-3 text-3xl font-bold leading-tight text-white md:text-5xl">{title}</h2>
      <p className="mx-auto mt-4 max-w-2xl text-base font-normal leading-7 text-white/68 md:text-lg">{body}</p>
    </div>
  );
}

function GlassPanel({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-lg border border-white/12 bg-white/[0.075] shadow-[0_24px_90px_rgba(0,0,0,0.42)] backdrop-blur-2xl ${className}`}
    >
      {children}
    </div>
  );
}

export function ConciergeOSPage() {
  return (
    <main className="min-h-screen bg-[#050606] font-sans text-white">
      <section className="relative isolate min-h-screen overflow-hidden px-5 py-6 md:px-10 lg:px-16">
        <Image
          src="https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=2600&q=88"
          alt="Cinematic Italian coastline at golden hour"
          fill
          priority
          sizes="100vw"
          className="-z-30 object-cover"
        />
        <div className="absolute inset-0 -z-20 bg-[linear-gradient(90deg,rgba(4,5,5,0.94)_0%,rgba(6,7,7,0.78)_42%,rgba(6,7,7,0.34)_74%),linear-gradient(0deg,rgba(5,6,6,0.98)_0%,rgba(5,6,6,0.62)_38%,rgba(5,6,6,0.18)_78%)]" />
        <div className="absolute inset-x-0 bottom-0 -z-10 h-56 bg-[linear-gradient(0deg,#050606,rgba(5,6,6,0))]" />

        <nav className="mx-auto flex max-w-7xl items-center justify-between">
          <div className="text-2xl font-extrabold uppercase text-[#e8c878] md:text-3xl">JOURNEE</div>
          <div className="hidden items-center gap-8 text-sm font-medium text-white/70 md:flex">
            <span>Concierge OS</span>
            <span>Live Journey</span>
            <span>Member Support</span>
          </div>
          <button className="rounded-full border border-[#d9b66d]/40 px-5 py-3 text-sm font-semibold text-[#f4d98e] transition hover:border-[#f4d98e] hover:bg-[#d9b66d]/10">
            Member desk
          </button>
        </nav>

        <div className="mx-auto grid min-h-[calc(100vh-6rem)] max-w-7xl items-center gap-10 pb-16 pt-20 lg:grid-cols-[1fr_0.74fr]">
          <div className="max-w-3xl">
            <p className="mb-5 inline-flex rounded-full border border-[#d9b66d]/30 bg-black/25 px-4 py-2 text-sm font-medium uppercase text-[#e8c878] backdrop-blur-xl">
              Elite member journey control
            </p>
            <h1 className="text-5xl font-extrabold leading-[1.02] text-white md:text-7xl lg:text-8xl">
              Your Journey, Seamlessly Managed
            </h1>
            <p className="mt-7 max-w-2xl text-lg font-normal leading-8 text-white/76 md:text-xl">
              A cinematic concierge platform coordinating every arrival, reservation, preference, exception and quiet
              detail behind your trip.
            </p>

            <GlassPanel className="mt-9 grid max-w-2xl gap-5 p-5 sm:grid-cols-3">
              <div>
                <p className="text-sm font-medium uppercase text-white/48">Active trip</p>
                <p className="mt-2 text-lg font-semibold text-white">Rome and Amalfi</p>
              </div>
              <div>
                <p className="text-sm font-medium uppercase text-white/48">Member level</p>
                <p className="mt-2 text-lg font-semibold text-[#f4d98e]">Black Card</p>
              </div>
              <div>
                <p className="text-sm font-medium uppercase text-white/48">Next action</p>
                <p className="mt-2 text-lg font-semibold text-white">Driver en route</p>
              </div>
            </GlassPanel>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <button className="inline-flex items-center justify-center gap-3 rounded-full bg-[#e4bd68] px-7 py-4 text-base font-bold text-[#0b0b09] shadow-[0_18px_50px_rgba(228,189,104,0.22)] transition hover:bg-[#f1d37f]">
                Contact Concierge
                <MessageCircle size={19} />
              </button>
              <button className="inline-flex items-center justify-center gap-3 rounded-full border border-white/20 bg-white/8 px-7 py-4 text-base font-semibold text-white backdrop-blur-xl transition hover:border-[#e4bd68]/60 hover:bg-white/12">
                Modify Journey
                <ArrowRight size={19} />
              </button>
            </div>
          </div>

          <GlassPanel className="ml-auto w-full max-w-xl p-5 md:p-6">
            <div className="relative h-56 overflow-hidden rounded-lg">
              <Image
                src="https://images.unsplash.com/photo-1529260830199-42c24126f198?auto=format&fit=crop&w=1300&q=86"
                alt="Rome cityscape at dusk"
                fill
                sizes="(min-width: 1024px) 36vw, 90vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(0,0,0,0.66),rgba(0,0,0,0.06))]" />
              <div className="absolute bottom-5 left-5 right-5">
                <p className="text-sm font-medium uppercase text-[#f4d98e]">Current destination</p>
                <h2 className="mt-1 text-3xl font-bold text-white">Rome, Italy</h2>
              </div>
            </div>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {[
                ["Weather", "23°C, clear evening"],
                ["Local time", "18:42 CEST"],
                ["Reservation", "La Pergola, 20:30"],
                ["Driver status", "Arrives in 14 min"],
              ].map(([label, value]) => (
                <div key={label} className="rounded-lg border border-white/10 bg-black/20 p-4">
                  <p className="text-sm font-medium uppercase text-white/46">{label}</p>
                  <p className="mt-2 text-base font-semibold text-white">{value}</p>
                </div>
              ))}
            </div>
          </GlassPanel>
        </div>
      </section>

      <section className="px-5 py-20 md:px-10 md:py-28 lg:px-16">
        <SectionHeader
          eyebrow="Live concierge timeline"
          title="Every moving part, quietly synchronized."
          body="The operating layer behind your journey keeps confirmations, advisories and private access moving in real time."
        />
        <div className="mx-auto max-w-4xl">
          {timelineItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <div key={item.title} className="grid grid-cols-[2.75rem_1fr] gap-5">
                <div className="flex flex-col items-center">
                  <div className="flex size-11 items-center justify-center rounded-full border border-[#d9b66d]/50 bg-[#d9b66d]/14 text-[#f4d98e] shadow-[0_0_34px_rgba(217,182,109,0.18)]">
                    <Icon size={20} />
                  </div>
                  {index < timelineItems.length - 1 ? <div className="h-full w-px bg-[#d9b66d]/22" /> : null}
                </div>
                <GlassPanel className="mb-5 p-5 transition duration-300 hover:border-[#d9b66d]/36 hover:bg-white/[0.095] md:p-6">
                  <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-start">
                    <div>
                      <h3 className="text-xl font-semibold text-white">{item.title}</h3>
                      <p className="mt-2 text-base font-normal leading-7 text-white/64">{item.detail}</p>
                    </div>
                    <span className="shrink-0 rounded-full border border-white/12 bg-black/24 px-4 py-2 text-sm font-medium text-[#f4d98e]">
                      {item.time}
                    </span>
                  </div>
                </GlassPanel>
              </div>
            );
          })}
        </div>
      </section>

      <section className="px-5 py-20 md:px-10 md:py-28 lg:px-16">
        <SectionHeader
          eyebrow="VIP requests"
          title="High-touch requests without the noise."
          body="Each request opens into a managed concierge workflow, not a form. Preference history, timing and local context travel with it."
        />
        <div className="mx-auto grid max-w-7xl gap-4 md:grid-cols-2 xl:grid-cols-3">
          {vipRequests.map((card) => {
            const Icon = card.icon;
            return (
              <GlassPanel
                key={card.title}
                className="group min-h-56 p-6 transition duration-300 hover:-translate-y-1 hover:border-[#d9b66d]/42 hover:bg-white/[0.105]"
              >
                <div className="flex size-12 items-center justify-center rounded-lg border border-[#d9b66d]/30 bg-[#d9b66d]/12 text-[#f4d98e] transition group-hover:bg-[#d9b66d]/18">
                  <Icon size={22} />
                </div>
                <h3 className="mt-8 text-2xl font-semibold text-white">{card.title}</h3>
                <p className="mt-3 text-base font-normal leading-7 text-white/64">{card.detail}</p>
                <div className="mt-8 flex items-center gap-2 text-sm font-semibold uppercase text-[#e8c878]">
                  Request access <ArrowRight size={16} />
                </div>
              </GlassPanel>
            );
          })}
        </div>
      </section>

      <section className="px-5 py-20 md:px-10 md:py-28 lg:px-16">
        <SectionHeader
          eyebrow="Real-time assistance"
          title="A calm command center for the human details."
          body="Conversation, preference memory and local intelligence sit together, so the experience feels handled instead of managed."
        />
        <div className="mx-auto grid max-w-7xl gap-5 lg:grid-cols-[1.08fr_0.92fr]">
          <GlassPanel className="p-5 md:p-7">
            <div className="flex items-center justify-between border-b border-white/10 pb-5">
              <div>
                <p className="text-sm font-medium uppercase text-[#e8c878]">Live concierge</p>
                <h3 className="mt-1 text-2xl font-bold text-white">Amara is online</h3>
              </div>
              <span className="rounded-full bg-emerald-400/12 px-4 py-2 text-sm font-semibold text-emerald-200">Live</span>
            </div>
            <div className="space-y-4 py-6">
              <div className="max-w-[82%] rounded-lg rounded-tl-none border border-white/10 bg-white/10 p-4">
                <p className="text-base font-normal leading-7 text-white/74">
                  Your dinner terrace is confirmed. I also moved the pickup later by 10 minutes so you can arrive at
                  golden hour.
                </p>
              </div>
              <div className="ml-auto max-w-[82%] rounded-lg rounded-tr-none bg-[#e4bd68] p-4 text-[#11100c]">
                <p className="text-base font-medium leading-7">Could we add a quiet aperitivo stop before dinner?</p>
              </div>
              <div className="max-w-[82%] rounded-lg rounded-tl-none border border-white/10 bg-white/10 p-4">
                <p className="text-base font-normal leading-7 text-white/74">
                  Yes. I found a private courtyard bar seven minutes from the restaurant and placed a soft hold.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-full border border-white/12 bg-black/26 px-5 py-4">
              <MessageCircle className="text-[#e8c878]" size={20} />
              <span className="text-base font-normal text-white/48">Ask your concierge...</span>
            </div>
          </GlassPanel>

          <GlassPanel className="p-5 md:p-7">
            <div className="flex items-center gap-3">
              <div className="flex size-12 items-center justify-center rounded-lg bg-[#d9b66d]/14 text-[#f4d98e]">
                <Sparkles size={22} />
              </div>
              <div>
                <p className="text-sm font-medium uppercase text-[#e8c878]">Smart recommendations</p>
                <h3 className="text-2xl font-bold text-white">Contextual, discreet, immediate.</h3>
              </div>
            </div>
            <div className="mt-8 space-y-3">
              {recommendationItems.map((item) => (
                <div
                  key={item}
                  className="flex items-center justify-between gap-4 rounded-lg border border-white/10 bg-black/22 p-4 transition hover:border-[#d9b66d]/34 hover:bg-white/[0.08]"
                >
                  <span className="text-base font-medium text-white/78">{item}</span>
                  <ArrowRight className="shrink-0 text-[#e8c878]" size={18} />
                </div>
              ))}
            </div>
          </GlassPanel>
        </div>
      </section>

      <section className="px-5 py-20 md:px-10 md:py-28 lg:px-16">
        <SectionHeader
          eyebrow="Active reservations"
          title="Your itinerary, treated as a living production."
          body="Flights, stays, transfers and experiences are monitored as one connected journey with clear status and graceful change control."
        />
        <div className="mx-auto grid max-w-7xl gap-5 lg:grid-cols-4">
          {reservations.map((reservation) => {
            const Icon = reservation.icon;
            return (
              <GlassPanel key={reservation.title} className="overflow-hidden transition duration-300 hover:-translate-y-1 hover:border-[#d9b66d]/40">
                <div className="relative h-52">
                  <Image
                    src={reservation.image}
                    alt={reservation.title}
                    fill
                    sizes="(min-width: 1024px) 25vw, (min-width: 768px) 50vw, 100vw"
                    className="object-cover transition duration-500 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(0,0,0,0.72),rgba(0,0,0,0.08))]" />
                  <div className="absolute left-4 top-4 flex items-center gap-2 rounded-full border border-white/14 bg-black/34 px-3 py-2 text-sm font-semibold text-white backdrop-blur-xl">
                    <Icon size={16} className="text-[#f4d98e]" />
                    {reservation.type}
                  </div>
                </div>
                <div className="p-5">
                  <div className="flex items-center justify-between gap-3">
                    <span className="rounded-full bg-[#d9b66d]/12 px-3 py-1.5 text-sm font-semibold text-[#f4d98e]">
                      {reservation.status}
                    </span>
                    <Clock3 size={18} className="text-white/42" />
                  </div>
                  <h3 className="mt-5 text-xl font-semibold leading-snug text-white">{reservation.title}</h3>
                  <p className="mt-3 text-base font-normal leading-7 text-white/62">{reservation.time}</p>
                  <button className="mt-6 w-full rounded-full border border-white/14 px-4 py-3 text-sm font-bold uppercase text-white transition hover:border-[#e4bd68]/55 hover:bg-[#e4bd68]/10">
                    Modify
                  </button>
                </div>
              </GlassPanel>
            );
          })}
        </div>
      </section>

      <section className="px-5 pb-24 pt-16 md:px-10 md:pb-32 lg:px-16">
        <div className="mx-auto max-w-7xl overflow-hidden rounded-lg border border-[#d9b66d]/24 bg-[#0b0c0b] shadow-[0_30px_100px_rgba(0,0,0,0.45)]">
          <div className="grid lg:grid-cols-[0.9fr_1.1fr]">
            <div className="relative min-h-[420px]">
              <Image
                src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=1500&q=86"
                alt="Luxury travel desk with passport and map"
                fill
                sizes="(min-width: 1024px) 45vw, 100vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.2),rgba(0,0,0,0.84)),linear-gradient(0deg,rgba(0,0,0,0.6),rgba(0,0,0,0.05))]" />
            </div>
            <div className="p-6 md:p-10 lg:p-12">
              <p className="text-sm font-medium uppercase text-[#e8c878]">Emergency and support</p>
              <h2 className="mt-3 text-3xl font-bold leading-tight text-white md:text-5xl">
                Critical help, ready before it is needed.
              </h2>
              <p className="mt-5 text-base font-normal leading-7 text-white/66 md:text-lg">
                JOURNEE keeps the practical support layer close: embassy paths, medical options, insurance escalation and
                document recovery guidance prepared around your location.
              </p>
              <div className="mt-9 grid gap-3 sm:grid-cols-2">
                {supportItems.map((item) => (
                  <div key={item} className="flex items-center gap-3 rounded-lg border border-white/10 bg-white/[0.07] p-4">
                    <ShieldCheck className="shrink-0 text-[#f4d98e]" size={20} />
                    <span className="text-base font-semibold text-white/82">{item}</span>
                  </div>
                ))}
              </div>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <button className="inline-flex items-center justify-center gap-3 rounded-full bg-white px-6 py-4 text-base font-bold text-[#080909] transition hover:bg-[#f4d98e]">
                  Open support protocol
                  <LifeBuoy size={19} />
                </button>
                <button className="inline-flex items-center justify-center gap-3 rounded-full border border-white/16 px-6 py-4 text-base font-semibold text-white transition hover:border-[#f4d98e]/55 hover:bg-white/8">
                  Share live location
                  <MapPin size={19} />
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="mx-auto mt-12 flex max-w-7xl flex-col items-start justify-between gap-5 border-t border-white/10 pt-8 text-white/46 md:flex-row md:items-center">
          <div className="text-xl font-extrabold text-[#e8c878]">JOURNEE</div>
          <div className="flex flex-wrap gap-4 text-sm font-medium">
            <span>Concierge OS</span>
            <span>Private travel operations</span>
            <span>Elite member experience</span>
          </div>
        </div>
      </section>
    </main>
  );
}
