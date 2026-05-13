/* eslint-disable @next/next/no-img-element */
import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  BedDouble,
  Bell,
  Building2,
  CalendarDays,
  Check,
  ChevronDown,
  CircleDollarSign,
  Clock3,
  CreditCard,
  Headphones,
  HelpCircle,
  Hotel,
  Info,
  LockKeyhole,
  MapPin,
  Menu,
  Pencil,
  Plane,
  Plus,
  ShieldCheck,
  Sparkles,
  Star,
  UserRound,
  UsersRound,
  Utensils,
} from "lucide-react";
import { MainNavLink } from "@/components/navigation/MainNavLink";

export const metadata: Metadata = {
  title: "Booking Checkout",
  description:
    "Review your Journee hotel booking, add traveler details, choose stay preferences, and continue to secure payment.",
};

type BookingStep = {
  id: number;
  title: string;
  copy: string;
};

type Traveler = {
  firstName: string;
  lastName: string;
  email: string;
  phoneCountryCode: string;
  phoneNumber: string;
  country: string;
  specialRequests: string;
};

type Preference = {
  label: string;
  icon: typeof Clock3;
  selected: boolean;
};

type BookingCheckoutState = {
  currentStep: number;
  stay: {
    hotelName: string;
    location: string;
    image: string;
    checkIn: {
      short: string;
      full: string;
      time: string;
    };
    checkOut: {
      short: string;
      full: string;
      time: string;
    };
    nights: number;
    rooms: number;
    guests: string;
    roomType: string;
    bed: string;
    mealPlan: string;
    rating: number;
  };
  traveler: Traveler;
  preferences: Preference[];
  pricing: {
    currency: "USD";
    nightlyRate: number;
    nights: number;
    taxesAndFees: number;
    serviceFee: number;
    payNow: number;
    payAtProperty: number;
  };
  cancellation: {
    freeUntilShort: string;
    freeUntilFull: string;
    chargeAfter: string;
  };
};

const navItems = [
  "Home",
  "Explore",
  "Map",
  "Trips",
  "Guides",
  "Journal",
  "Stays",
  "Flights",
  "Visa",
  "Budget",
  "Weather",
  "Currency",
  "Support",
];

const bookingSteps: BookingStep[] = [
  { id: 1, title: "Search", copy: "Tokyo, Japan" },
  { id: 2, title: "Traveler & Details", copy: "Add traveler information" },
  { id: 3, title: "Payment", copy: "Select payment method" },
  { id: 4, title: "Review & Confirm", copy: "Review your booking" },
  { id: 5, title: "Confirmation", copy: "Get booking receipt" },
];

const checkoutState: BookingCheckoutState = {
  currentStep: 2,
  stay: {
    hotelName: "Park Hyatt Tokyo",
    location: "Shinjuku, Tokyo, Japan",
    image:
      "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=88",
    checkIn: {
      short: "May 20",
      full: "Tue, May 20, 2025",
      time: "3:00 PM",
    },
    checkOut: {
      short: "May 25",
      full: "Sun, May 25, 2025",
      time: "11:00 AM",
    },
    nights: 5,
    rooms: 1,
    guests: "2 Adults",
    roomType: "Park Room, 1 King Bed",
    bed: "King Bed",
    mealPlan: "Room Only",
    rating: 5,
  },
  traveler: {
    firstName: "Emma",
    lastName: "Johnson",
    email: "emma.johnson@email.com",
    phoneCountryCode: "+1",
    phoneNumber: "(555) 123-4567",
    country: "United States",
    specialRequests: "",
  },
  preferences: [
    { label: "Early Check-in", icon: Clock3, selected: false },
    { label: "Late Check-out", icon: Clock3, selected: false },
    { label: "High Floor", icon: Building2, selected: false },
    { label: "Non-smoking Room", icon: Sparkles, selected: false },
    { label: "Airport Transfer", icon: Plane, selected: false },
    { label: "Extra Bed", icon: BedDouble, selected: false },
  ],
  pricing: {
    currency: "USD",
    nightlyRate: 450,
    nights: 5,
    taxesAndFees: 315,
    serviceFee: 45,
    payNow: 0,
    payAtProperty: 2610,
  },
  cancellation: {
    freeUntilShort: "May 18, 2025",
    freeUntilFull: "May 18, 2025, 11:59 PM local time",
    chargeAfter: "After that, the first night will be charged.",
  },
};

const avatar =
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=160&q=80";

const formatMoney = (value: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(value);

const subtotal = checkoutState.pricing.nightlyRate * checkoutState.pricing.nights;
const total =
  subtotal + checkoutState.pricing.taxesAndFees + checkoutState.pricing.serviceFee;

export default function BookingCheckoutPage() {
  return (
    <main className="min-h-screen bg-[#03070a] text-white">
      <TopNavigation />
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_18%_0%,rgba(241,181,64,.13),transparent_28%),radial-gradient(circle_at_78%_8%,rgba(70,112,122,.16),transparent_30%),linear-gradient(180deg,#020609_0%,#061015_48%,#020609_100%)]" />
      <div className="relative mx-auto w-full max-w-[1920px] px-4 pb-24 pt-20 sm:px-5 lg:px-6 lg:pb-8">
        <div className="grid gap-5 xl:grid-cols-[300px_minmax(0,1fr)_380px] 2xl:grid-cols-[340px_minmax(0,1fr)_480px]">
          <aside className="xl:sticky xl:top-20 xl:self-start">
            <CheckoutSteps />
          </aside>

          <section className="min-w-0">
            <TravelerDetails />
          </section>

          <aside className="space-y-4 xl:sticky xl:top-20 xl:self-start">
            <BookingSummary />
          </aside>
        </div>
        <TrustStrip />
      </div>
      <div className="fixed inset-x-0 bottom-0 z-30 border-t border-white/10 bg-[#03070a]/92 p-3 backdrop-blur-2xl lg:hidden">
        <button
          type="button"
          className="flex min-h-12 w-full items-center justify-center gap-2 rounded-md bg-[#f4b21f] px-5 text-sm font-bold text-[#160f05] shadow-[0_14px_36px_rgba(244,178,31,.24)]"
        >
          Continue to Payment
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </main>
  );
}

function TopNavigation() {
  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-white/8 bg-[#02070a]/88 backdrop-blur-2xl">
      <div className="mx-auto flex h-16 max-w-[1920px] items-center gap-3 px-4 sm:px-6">
        <Link href="/" className="flex shrink-0 items-center gap-3" aria-label="JOURNEE home">
          <JourneeCheckoutMark />
          <span className="text-2xl font-medium uppercase text-white">JOURNEE</span>
        </Link>
        <nav className="hidden flex-1 items-center justify-center gap-1 2xl:flex">
          {navItems.map((item) => (
            <MainNavLink
              key={item}
              label={item}
              className="rounded-md px-3 py-2 text-sm font-medium text-white/90 transition hover:bg-white/[0.055] hover:text-white"
              activeClassName="text-[#f5b21d]"
            />
          ))}
        </nav>
        <div className="ml-auto hidden items-center gap-2 text-sm font-medium text-[#84ee78] lg:flex">
          <LockKeyhole className="h-4 w-4" />
          Secure Checkout
        </div>
        <button
          type="button"
          aria-label="Notifications"
          className="relative grid h-10 w-10 shrink-0 place-items-center rounded-full text-white/88 transition hover:bg-white/[0.06]"
        >
          <Bell className="h-5 w-5" />
          <span className="absolute right-1.5 top-0.5 grid h-4 min-w-4 place-items-center rounded-full bg-[#f4b21f] px-1 text-[10px] font-bold text-[#160f05]">
            3
          </span>
        </button>
        <img
          src={avatar}
          alt=""
          className="h-10 w-10 shrink-0 rounded-full border border-[#f4b21f]/55 object-cover"
        />
        <ChevronDown className="hidden h-4 w-4 text-white/72 sm:block" />
        <button
          type="button"
          aria-label="Open menu"
          className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-white/10 text-white/86 2xl:hidden"
        >
          <Menu className="h-5 w-5" />
        </button>
      </div>
    </header>
  );
}

function JourneeCheckoutMark() {
  return (
    <svg
      viewBox="0 0 44 44"
      aria-hidden="true"
      className="h-9 w-9 shrink-0 text-[#f5b51d]"
    >
      <path
        d="M6 35 15.2 9.5l6 13.3 4.6-8.7L38 35H6Z"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2.2"
      />
      <path
        d="M15.2 9.5 15 21.4M25.8 14.1l-.2 9.2"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="1.5"
        opacity=".72"
      />
    </svg>
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
      className={`rounded-lg border border-white/12 bg-[#07131a]/82 shadow-[0_24px_80px_rgba(0,0,0,.34),inset_0_1px_0_rgba(255,255,255,.06)] backdrop-blur-2xl ${className}`}
    >
      {children}
    </div>
  );
}

function CheckoutSteps() {
  return (
    <GlassPanel className="p-5 lg:p-6">
      <h2 className="text-xs font-bold uppercase text-[#f4b21f]">Booking Steps</h2>
      <ol className="relative mt-6 space-y-2">
        <span className="absolute bottom-12 left-4 top-6 w-px bg-white/18" />
        {bookingSteps.map((step) => {
          const active = step.id === checkoutState.currentStep;
          const complete = step.id < checkoutState.currentStep;
          return (
            <li
              key={step.id}
              className={`relative flex gap-4 rounded-lg px-1 py-3 ${
                active
                  ? "bg-[linear-gradient(90deg,rgba(244,178,31,.28),rgba(244,178,31,.13),rgba(244,178,31,.04))]"
                  : ""
              }`}
            >
              <span
                className={`z-10 grid h-8 w-8 shrink-0 place-items-center rounded-full border text-sm font-bold ${
                  active
                    ? "border-[#f4b21f] bg-[#f4b21f] text-[#160f05]"
                    : complete
                      ? "border-[#f4b21f] bg-[#07131a] text-[#f4b21f]"
                      : "border-white/38 bg-[#07131a] text-white/80"
                }`}
              >
                {complete ? <Check className="h-4 w-4" /> : step.id}
              </span>
              <div className="min-w-0">
                <div className="flex items-center gap-4">
                  <span className={active ? "text-[#f4b21f]" : "text-white/80"}>
                    {step.id}
                  </span>
                  <p className="text-sm font-medium leading-5 text-white">{step.title}</p>
                </div>
                <p className="mt-0.5 text-xs leading-5 text-white/60">{step.copy}</p>
              </div>
            </li>
          );
        })}
      </ol>
      <TrustCard />
      <HelpCard />
    </GlassPanel>
  );
}

function TrustCard() {
  const items = [
    { label: "24/7 Customer Support", icon: Headphones },
    { label: "Secure Payments", icon: CreditCard },
    { label: "Best Price Guarantee", icon: ShieldCheck },
    { label: "Free Cancellation options", icon: Clock3 },
  ];

  return (
    <div className="mt-20 rounded-lg border border-white/12 bg-white/[0.035] p-5">
      <div className="flex items-center gap-3">
        <ShieldCheck className="h-7 w-7 text-[#f4b21f]" />
        <h3 className="text-sm font-semibold text-white">We have got you covered</h3>
      </div>
      <div className="mt-5 space-y-3">
        {items.map(({ label, icon: Icon }) => (
          <div key={label} className="flex items-center gap-3 text-sm text-white/76">
            <Icon className="h-4 w-4 text-white/62" />
            <span>{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function HelpCard() {
  return (
    <div className="mt-5 rounded-lg border border-white/12 bg-white/[0.035] p-5">
      <div className="flex gap-3">
        <Headphones className="mt-1 h-7 w-7 text-white/90" />
        <div>
          <h3 className="text-sm font-semibold text-white">Need help?</h3>
          <p className="mt-1 text-xs leading-5 text-white/68">
            Our support team is here for you.
          </p>
        </div>
      </div>
      <button
        type="button"
        className="mt-4 flex min-h-11 w-full items-center justify-center gap-2 rounded-md border border-[#f4b21f]/70 px-4 text-sm font-semibold text-[#f4b21f] transition hover:bg-[#f4b21f]/10"
      >
        <Headphones className="h-4 w-4" />
        Contact Support
      </button>
    </div>
  );
}

function TravelerDetails() {
  const { stay, traveler } = checkoutState;

  return (
    <GlassPanel className="p-4 sm:p-6">
      <div>
        <h1 className="text-[1.45rem] font-bold leading-tight text-white sm:text-[1.65rem]">
          Traveler & Booking Details
        </h1>
        <p className="mt-2 text-sm leading-6 text-white/74">
          Please enter traveler information and review your booking details.
        </p>
      </div>

      <div className="mt-5 rounded-lg border border-white/12 bg-black/[0.12] p-4">
        <div className="grid gap-4 lg:grid-cols-[240px_minmax(0,1fr)]">
          <img
            src={stay.image}
            alt=""
            className="h-44 w-full rounded-md object-cover lg:h-full"
          />
          <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="text-xl font-bold text-white">{stay.hotelName}</h2>
                <StarRating />
              </div>
              <p className="mt-2 flex items-center gap-2 text-sm text-white/68">
                <MapPin className="h-4 w-4 text-white/82" />
                {stay.location}
              </p>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <DetailLine
                  icon={CalendarDays}
                  title={`${stay.checkIn.short} to ${stay.checkOut.short}, 2025`}
                  copy={`${stay.nights} nights`}
                />
                <DetailLine
                  icon={UsersRound}
                  title={`${stay.rooms} Room, 2 Guests`}
                  copy={stay.bed}
                  bordered
                />
              </div>
            </div>
            <button
              type="button"
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md border border-[#f4b21f]/80 px-4 text-sm font-semibold text-[#f4b21f] transition hover:bg-[#f4b21f]/10"
            >
              <Pencil className="h-4 w-4" />
              Edit Stay
            </button>
          </div>
        </div>
      </div>

      <section className="mt-5 rounded-lg border border-white/12 bg-white/[0.025] p-4 sm:p-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-base font-bold text-white">Traveler Information</h2>
          <button
            type="button"
            className="hidden min-h-10 items-center gap-2 rounded-md border border-white/14 px-4 text-sm text-white/88 transition hover:border-[#f4b21f]/58 sm:inline-flex"
          >
            <Plus className="h-4 w-4" />
            Add Another Traveler
          </button>
        </div>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <TextField label="First Name" value={traveler.firstName} />
          <TextField label="Last Name" value={traveler.lastName} />
          <TextField label="Email Address" value={traveler.email} type="email" />
          <PhoneField />
          <SelectField label="Country / Region" value={traveler.country} />
          <TextAreaField label="Special Requests (Optional)" />
        </div>
        <button
          type="button"
          className="mt-4 inline-flex min-h-10 w-full items-center justify-center gap-2 rounded-md border border-white/14 px-4 text-sm text-white/88 sm:hidden"
        >
          <Plus className="h-4 w-4" />
          Add Another Traveler
        </button>
      </section>

      <section className="mt-5">
        <h2 className="text-base font-bold text-white">
          Additional Preferences <span className="font-medium text-white/58">(Optional)</span>
        </h2>
        <div className="mt-3 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {checkoutState.preferences.map(({ label, icon: Icon, selected }) => (
            <label
              key={label}
              className="flex min-h-14 items-center gap-3 rounded-md border border-white/12 bg-white/[0.028] px-4 text-sm text-white/88 transition hover:border-[#f4b21f]/45"
            >
              <Icon className="h-6 w-6 text-white/86" />
              <span className="min-w-0 flex-1">{label}</span>
              <span
                className={`grid h-5 w-5 place-items-center rounded border ${
                  selected
                    ? "border-[#f4b21f] bg-[#f4b21f] text-[#160f05]"
                    : "border-white/58"
                }`}
              >
                {selected && <Check className="h-3.5 w-3.5" />}
              </span>
            </label>
          ))}
        </div>
      </section>

      <div className="mt-5 flex flex-wrap items-center justify-between gap-3 rounded-md border border-[#f4b21f]/36 bg-[#f4b21f]/10 px-4 py-3 text-sm text-[#f4b21f]">
        <div className="flex items-center gap-3">
          <Info className="h-5 w-5 shrink-0" />
          <span>Free cancellation available until May 18, 2025.</span>
        </div>
        <button type="button" className="inline-flex items-center gap-2 font-semibold">
          View cancellation policy
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>

      <div className="mt-5 hidden items-center justify-between gap-4 lg:flex">
        <button
          type="button"
          className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md border border-white/14 px-6 text-sm font-medium text-white/90 transition hover:bg-white/[0.055]"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </button>
        <button
          type="button"
          className="inline-flex min-h-12 min-w-[310px] items-center justify-center gap-2 rounded-md bg-[#f4b21f] px-6 text-sm font-bold text-[#160f05] shadow-[0_16px_42px_rgba(244,178,31,.24)] transition hover:bg-[#ffc33d]"
        >
          Continue to Payment
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </GlassPanel>
  );
}

function DetailLine({
  icon: Icon,
  title,
  copy,
  bordered = false,
}: {
  icon: typeof CalendarDays;
  title: string;
  copy: string;
  bordered?: boolean;
}) {
  return (
    <div className={`flex gap-3 ${bordered ? "sm:border-l sm:border-white/12 sm:pl-7" : ""}`}>
      <Icon className="mt-0.5 h-6 w-6 shrink-0 text-white/88" />
      <div>
        <p className="text-sm font-medium text-white">{title}</p>
        <p className="mt-0.5 text-sm text-white/58">{copy}</p>
      </div>
    </div>
  );
}

function StarRating() {
  return (
    <span className="inline-flex items-center gap-0.5 text-[#f4b21f]" aria-label="5 star rating">
      {Array.from({ length: checkoutState.stay.rating }).map((_, index) => (
        <Star key={index} className="h-4 w-4 fill-current" />
      ))}
    </span>
  );
}

function TextField({
  label,
  value,
  type = "text",
}: {
  label: string;
  value: string;
  type?: string;
}) {
  return (
    <label className="block">
      <span className="text-sm font-medium text-white/82">{label}</span>
      <input
        type={type}
        defaultValue={value}
        className="mt-2 h-11 w-full rounded-md border border-white/14 bg-[#061118] px-3 text-sm text-white outline-none transition placeholder:text-white/38 focus:border-[#f4b21f]/70"
      />
    </label>
  );
}

function SelectField({ label, value }: { label: string; value: string }) {
  return (
    <label className="block">
      <span className="text-sm font-medium text-white/82">{label}</span>
      <span className="mt-2 flex h-11 w-full items-center rounded-md border border-white/14 bg-[#061118] px-3 text-sm text-white">
        <span className="flex-1">{value}</span>
        <ChevronDown className="h-4 w-4 text-white/70" />
      </span>
    </label>
  );
}

function PhoneField() {
  return (
    <label className="block">
      <span className="text-sm font-medium text-white/82">Phone Number</span>
      <span className="mt-2 flex h-11 w-full items-center rounded-md border border-white/14 bg-[#061118] text-sm text-white">
        <span className="flex h-full items-center gap-2 border-r border-white/12 px-3">
          <span>US</span>
          <ChevronDown className="h-4 w-4 text-white/70" />
        </span>
        <span className="px-3 text-white/82">{checkoutState.traveler.phoneCountryCode}</span>
        <input
          type="tel"
          defaultValue={checkoutState.traveler.phoneNumber}
          className="h-full min-w-0 flex-1 bg-transparent pr-3 text-sm text-white outline-none"
        />
      </span>
    </label>
  );
}

function TextAreaField({ label }: { label: string }) {
  return (
    <label className="block">
      <span className="text-sm font-medium text-white/82">{label}</span>
      <span className="relative mt-2 block">
        <textarea
          defaultValue={checkoutState.traveler.specialRequests}
          placeholder="Any special requests for your stay?"
          maxLength={250}
          className="min-h-[78px] w-full resize-none rounded-md border border-white/14 bg-[#061118] px-3 py-3 text-sm text-white outline-none transition placeholder:text-white/42 focus:border-[#f4b21f]/70"
        />
        <span className="absolute bottom-2 right-3 text-xs text-white/58">0/250</span>
      </span>
    </label>
  );
}

function BookingSummary() {
  const { stay, pricing, cancellation } = checkoutState;

  return (
    <>
      <GlassPanel className="p-5 lg:p-6">
        <h2 className="text-lg font-bold text-white">Booking Summary</h2>
        <div className="mt-5 flex gap-4">
          <img
            src={stay.image}
            alt=""
            className="h-24 w-36 shrink-0 rounded-md object-cover"
          />
          <div className="min-w-0 pt-1">
            <h3 className="text-base font-bold text-white">{stay.hotelName}</h3>
            <StarRating />
            <p className="mt-2 flex items-center gap-1.5 text-xs text-white/60">
              <MapPin className="h-3.5 w-3.5" />
              {stay.location}
            </p>
          </div>
        </div>
        <div className="mt-5 space-y-4 border-t border-white/10 pt-5">
          <SummaryRow icon={CalendarDays} label="Check-in" value={stay.checkIn.full} side={stay.checkIn.time} />
          <SummaryRow icon={CalendarDays} label="Check-out" value={stay.checkOut.full} side={stay.checkOut.time} />
          <SummaryRow icon={UserRound} label="Guests" value={stay.guests} />
          <SummaryRow icon={Hotel} label="Room Type" value={stay.roomType} />
          <SummaryRow icon={Utensils} label="Meal Plan" value={stay.mealPlan} />
        </div>
      </GlassPanel>

      <GlassPanel className="overflow-hidden">
        <div className="p-5 lg:p-6">
          <h2 className="text-lg font-bold text-white">Price Details</h2>
          <div className="mt-5 space-y-3">
            <PriceRow
              label={`${formatMoney(pricing.nightlyRate)} x ${pricing.nights} nights`}
              value={formatMoney(subtotal)}
            />
            <PriceRow label="Taxes & Fees" value={formatMoney(pricing.taxesAndFees)} info />
            <PriceRow label="Service Fee" value={formatMoney(pricing.serviceFee)} info />
          </div>
          <div className="my-5 border-t border-dashed border-[#f4b21f]/30" />
          <div className="flex items-center justify-between gap-4">
            <span className="text-base font-bold text-white">Total Price</span>
            <span className="text-right text-sm font-semibold text-white">
              {pricing.currency}{" "}
              <strong className="ml-1 text-2xl text-[#f4b21f]">{formatMoney(total).replace("$", "$")}</strong>
            </span>
          </div>
          <div className="mt-5 space-y-3">
            <PriceRow label="Pay now" value={formatMoney(pricing.payNow)} muted />
            <PriceRow label="Pay at property" value={formatMoney(pricing.payAtProperty)} muted />
          </div>
          <div className="mt-5 rounded-md border border-[#35d46a]/18 bg-[#124e32]/32 p-4">
            <div className="flex gap-3">
              <ShieldCheck className="h-8 w-8 shrink-0 text-[#6cf07e]" />
              <div>
                <h3 className="text-sm font-semibold text-[#84ee78]">
                  Best Price Guarantee
                </h3>
                <p className="mt-1 text-xs leading-5 text-white/70">
                  Found a lower price? We will match it.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="border-t border-white/10 p-5 lg:p-6">
          <h2 className="text-base font-bold text-white">Cancellation Policy</h2>
          <p className="mt-4 text-sm leading-6 text-white/72">
            Free cancellation until {cancellation.freeUntilFull}.
          </p>
          <p className="mt-1 text-sm leading-6 text-white/72">{cancellation.chargeAfter}</p>
          <button
            type="button"
            className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#f4b21f]"
          >
            View full policy
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </GlassPanel>
    </>
  );
}

function SummaryRow({
  icon: Icon,
  label,
  value,
  side,
}: {
  icon: typeof CalendarDays;
  label: string;
  value: string;
  side?: string;
}) {
  return (
    <div className="grid grid-cols-[24px_100px_minmax(0,1fr)_auto] items-center gap-2 text-sm">
      <Icon className="h-4 w-4 text-white/74" />
      <span className="text-white/72">{label}</span>
      <span className="min-w-0 text-white">{value}</span>
      {side && <span className="text-xs text-white/62">{side}</span>}
    </div>
  );
}

function PriceRow({
  label,
  value,
  info = false,
  muted = false,
}: {
  label: string;
  value: string;
  info?: boolean;
  muted?: boolean;
}) {
  return (
    <div className={`flex items-center justify-between gap-4 text-sm ${muted ? "text-white/78" : "text-white/88"}`}>
      <span className="inline-flex items-center gap-1.5">
        {label}
        {info && <HelpCircle className="h-3.5 w-3.5 text-white/50" />}
      </span>
      <span>{value}</span>
    </div>
  );
}

function TrustStrip() {
  const items = [
    { title: "Secure Checkout", copy: "Your data is protected", icon: LockKeyhole },
    { title: "Flexible Payment", copy: "Pay now or at the property", icon: CreditCard },
    { title: "Free Cancellation", copy: "On eligible bookings", icon: CircleDollarSign },
    { title: "24/7 Support", copy: "We are here to help", icon: Headphones },
  ];

  return (
    <GlassPanel className="mt-5 p-5">
      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {items.map(({ title, copy, icon: Icon }) => (
          <div key={title} className="flex items-center gap-4 px-2">
            <Icon className="h-9 w-9 shrink-0 text-[#f4b21f]" />
            <div>
              <h3 className="text-base font-medium text-white">{title}</h3>
              <p className="mt-0.5 text-sm text-white/66">{copy}</p>
            </div>
          </div>
        ))}
      </div>
    </GlassPanel>
  );
}
