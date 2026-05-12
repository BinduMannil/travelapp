/* eslint-disable @next/next/no-img-element */
"use client";

import Link from "next/link";
import {
  ArrowRight,
  Bell,
  Briefcase,
  CalendarCheck,
  CalendarDays,
  Check,
  ChevronDown,
  Copy,
  CreditCard,
  Download,
  Headphones,
  Mail,
  MapPin,
  Menu,
  Phone,
  Printer,
  Share2,
  Shield,
  ShieldCheck,
  Star,
  UserRound,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

type BookingStep = {
  label: string;
  status: "completed" | "current";
};

type ReceiptAction = {
  label: string;
  icon: LucideIcon;
  action: "download" | "email" | "share" | "print";
};

type ConfirmationData = {
  bookingReference: string;
  status: "Confirmed";
  stay: {
    hotelName: string;
    image: string;
    rating: number;
    location: string;
    dateRange: string;
    nights: number;
    rooms: number;
    guestsSummary: string;
    bed: string;
    tags: string[];
  };
  bookingDetails: {
    checkIn: { label: string; date: string; time: string };
    checkOut: { label: string; date: string; time: string };
    guests: string;
    roomType: string;
    mealPlan: string;
  };
  payment: {
    status: "Paid in Full";
    method: string;
    paidAmount: number;
    paidOn: string;
    currency: "USD";
  };
  pricing: {
    nightlyRate: number;
    nights: number;
    taxesAndFees: number;
    serviceFee: number;
  };
  contact: {
    phone: string;
    email: string;
    address: string;
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

const confirmationSteps: BookingStep[] = [
  { label: "Search", status: "completed" },
  { label: "Traveler & Details", status: "completed" },
  { label: "Payment", status: "completed" },
  { label: "Review & Confirm", status: "completed" },
  { label: "Confirmation", status: "current" },
];

const confirmationData: ConfirmationData = {
  bookingReference: "JRNE-8X7Q-2K4L",
  status: "Confirmed",
  stay: {
    hotelName: "Park Hyatt Tokyo",
    image:
      "https://images.unsplash.com/photo-1536098561742-ca998e48cbcc?auto=format&fit=crop&w=1200&q=88",
    rating: 5,
    location: "Shinjuku, Tokyo, Japan",
    dateRange: "May 20 to May 25, 2025",
    nights: 5,
    rooms: 1,
    guestsSummary: "2 Guests",
    bed: "King Bed",
    tags: ["Park Room", "Room Only"],
  },
  bookingDetails: {
    checkIn: {
      label: "Check-in",
      date: "Tue, May 20, 2025",
      time: "3:00 PM",
    },
    checkOut: {
      label: "Check-out",
      date: "Sun, May 25, 2025",
      time: "11:00 AM",
    },
    guests: "2 Adults",
    roomType: "Park Room, 1 King Bed",
    mealPlan: "Room Only",
  },
  payment: {
    status: "Paid in Full",
    method: "Visa ending 4242",
    paidAmount: 2610,
    paidOn: "Paid on May 15, 2025, 10:42 AM",
    currency: "USD",
  },
  pricing: {
    nightlyRate: 450,
    nights: 5,
    taxesAndFees: 315,
    serviceFee: 45,
  },
  contact: {
    phone: "+81 3-5323-1234",
    email: "tokyo.park@hyatt.com",
    address: "3-7-1-2 Nishi Shinjuku, Shinjuku-ku, Tokyo 163-1055, Japan",
  },
};

const receiptActions: ReceiptAction[] = [
  { label: "Download Receipt", icon: Download, action: "download" },
  { label: "Email Receipt", icon: Mail, action: "email" },
  { label: "Share Booking", icon: Share2, action: "share" },
  { label: "Print", icon: Printer, action: "print" },
];

const avatar =
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=160&q=80";

const subtotal =
  confirmationData.pricing.nightlyRate * confirmationData.pricing.nights;
const totalPaid =
  subtotal +
  confirmationData.pricing.taxesAndFees +
  confirmationData.pricing.serviceFee;

const formatMoney = (value: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: confirmationData.payment.currency,
  }).format(value);

export function BookingConfirmationPage() {
  const handleReceiptAction = async (action: ReceiptAction["action"]) => {
    const subject = `JOURNEE Booking ${confirmationData.bookingReference}`;
    const body = `Booking confirmed for ${confirmationData.stay.hotelName}. Reference: ${confirmationData.bookingReference}. Total paid: ${confirmationData.payment.currency} ${formatMoney(totalPaid)}.`;

    if (action === "download") {
      const receiptText = [
        "JOURNEE Booking Confirmation",
        `Reference: ${confirmationData.bookingReference}`,
        `Hotel: ${confirmationData.stay.hotelName}`,
        `Dates: ${confirmationData.stay.dateRange}`,
        `Payment: ${confirmationData.payment.status}`,
        `Total Paid: ${confirmationData.payment.currency} ${formatMoney(totalPaid)}`,
      ].join("\n");
      const blob = new Blob([receiptText], { type: "text/plain;charset=utf-8" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `${confirmationData.bookingReference}-receipt.txt`;
      link.click();
      URL.revokeObjectURL(url);
      return;
    }

    if (action === "email") {
      window.location.href = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      return;
    }

    if (action === "share") {
      if (navigator.share) {
        await navigator.share({ title: subject, text: body });
        return;
      }

      await navigator.clipboard?.writeText(body);
      return;
    }

    window.print();
  };

  return (
    <main className="min-h-screen bg-[#02070a] text-white">
      <TopNavigation />
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_14%_4%,rgba(243,181,42,.12),transparent_24%),radial-gradient(circle_at_76%_2%,rgba(54,113,125,.18),transparent_31%),linear-gradient(180deg,#02070a_0%,#06131a_46%,#02070a_100%)]" />
      <div className="pointer-events-none fixed inset-0 opacity-[0.055] [background-image:linear-gradient(rgba(255,255,255,.85)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.85)_1px,transparent_1px)] [background-size:72px_72px]" />

      <div className="relative mx-auto w-full max-w-[1920px] px-4 pb-9 pt-20 sm:px-6">
        <div className="grid gap-5 xl:grid-cols-[300px_minmax(0,1fr)_380px] 2xl:grid-cols-[360px_minmax(0,1fr)_500px]">
          <aside className="xl:sticky xl:top-20 xl:self-start">
            <SuccessSidebar />
          </aside>

          <section className="min-w-0 space-y-5">
            <HotelSummaryCard />
            <BookingPaymentDetails />
            <PriceSummary />
            <div className="grid gap-3 sm:grid-cols-2 2xl:grid-cols-4">
              {receiptActions.map(({ label, icon: Icon, action }) => (
                <button
                  key={label}
                  type="button"
                  onClick={() => void handleReceiptAction(action)}
                  className="flex min-h-16 items-center justify-center gap-3 rounded-lg border border-white/14 bg-[#07131a]/78 px-4 text-sm font-semibold text-white shadow-[inset_0_1px_0_rgba(255,255,255,.055)] transition hover:border-[#f4b21f]/70 hover:text-[#f4b21f]"
                >
                  <Icon className="h-5 w-5" />
                  {label}
                </button>
              ))}
            </div>
          </section>

          <aside className="space-y-5 xl:sticky xl:top-20 xl:self-start">
            <NextSteps />
            <HotelContact />
            <ProtectionCard />
          </aside>
        </div>
        <TrustStrip />
      </div>
    </main>
  );
}

function TopNavigation() {
  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-white/8 bg-[#02070a]/90 backdrop-blur-2xl">
      <div className="mx-auto flex h-16 max-w-[1920px] items-center gap-3 px-4 sm:px-6">
        <Link href="/" className="flex shrink-0 items-center gap-3" aria-label="JOURNEE home">
          <JourneeMark />
          <span className="text-2xl font-medium uppercase text-white">JOURNEE</span>
        </Link>
        <nav className="hidden flex-1 items-center justify-center gap-1 2xl:flex">
          {navItems.map((item) => (
            <Link
              key={item}
              href={item === "Home" ? "/" : `/${item.toLowerCase()}`}
              className="rounded-md px-3 py-2 text-sm font-medium text-white/90 transition hover:bg-white/[0.055] hover:text-white"
            >
              {item}
            </Link>
          ))}
        </nav>
        <div className="ml-auto hidden items-center gap-2 text-sm font-medium text-[#63e267] lg:flex">
          <ShieldCheck className="h-4 w-4" />
          Secure Booking
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

function JourneeMark() {
  return (
    <svg viewBox="0 0 44 44" aria-hidden="true" className="h-9 w-9 shrink-0 text-[#f5b51d]">
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

function SuccessSidebar() {
  return (
    <GlassPanel className="p-5 lg:p-6">
      <div className="relative mx-auto grid h-28 w-28 place-items-center">
        {Array.from({ length: 12 }).map((_, index) => (
          <span
            key={index}
            className="absolute h-1.5 w-5 rounded-full bg-[#f4b21f]"
            style={{
              transform: `rotate(${index * 30}deg) translateX(78px)`,
              opacity: index % 3 === 0 ? 0.55 : 0.9,
            }}
          />
        ))}
        <span className="grid h-24 w-24 place-items-center rounded-full border-[5px] border-[#59db62] bg-[#11331d]/55 text-[#65e66c] shadow-[0_0_34px_rgba(89,219,98,.18)]">
          <Check className="h-12 w-12 stroke-[3]" />
        </span>
      </div>

      <div className="mt-5 text-center">
        <h1 className="text-[1.75rem] font-extrabold leading-[1.08] text-white">
          Your booking is confirmed!
        </h1>
        <p className="mx-auto mt-4 max-w-[250px] text-[0.96rem] leading-6 text-white/75">
          We can&apos;t wait to be part of your amazing journey.
        </p>
      </div>

      <div className="mt-6 rounded-lg border border-[#f4b21f]/50 bg-black/12 p-4 text-center">
        <p className="text-sm text-white/76">Booking Reference</p>
        <div className="mt-2 flex items-center justify-center gap-2 text-xl font-extrabold text-[#f4b21f]">
          {confirmationData.bookingReference}
          <Copy className="h-4 w-4 text-white/72" />
        </div>
        <span className="mx-auto mt-3 inline-flex items-center gap-2 rounded-full border border-[#59db62]/26 bg-[#143d21] px-4 py-2 text-sm font-semibold text-white">
          <Check className="h-4 w-4 text-[#65e66c]" />
          {confirmationData.status}
        </span>
      </div>

      <ol className="relative mt-7 space-y-0">
        <span className="absolute bottom-7 left-3 top-5 w-px bg-[#59db62]/45" />
        {confirmationSteps.map((step, index) => (
          <li key={step.label} className="relative flex gap-4 pb-4 last:pb-0">
            <span
              className={`z-10 grid h-7 w-7 shrink-0 place-items-center rounded-full border text-sm font-bold ${
                step.status === "current"
                  ? "border-[#f4b21f] bg-[#f4b21f] text-[#160f05]"
                  : "border-[#59db62] bg-[#12351e] text-[#65e66c]"
              }`}
            >
              {step.status === "current" ? index + 1 : <Check className="h-4 w-4" />}
            </span>
            <div>
              <p className="text-sm font-semibold leading-5 text-white">{step.label}</p>
              <p
                className={`text-xs font-medium leading-5 ${
                  step.status === "current" ? "text-[#f4b21f]" : "text-white/62"
                }`}
              >
                {step.status === "current" ? "You're all set!" : "Completed"}
              </p>
            </div>
          </li>
        ))}
      </ol>

      <div className="mt-6 rounded-lg border border-white/12 bg-white/[0.035] p-5">
        <div className="flex gap-3">
          <Headphones className="mt-1 h-7 w-7 text-white/90" />
          <div>
            <h2 className="text-base font-semibold text-white">Need help?</h2>
            <p className="mt-1 text-sm leading-6 text-white/66">
              Our support team is here 24/7 if you need anything.
            </p>
          </div>
        </div>
        <button
          type="button"
          className="mt-4 flex min-h-11 w-full items-center justify-center rounded-md border border-[#f4b21f]/70 px-4 text-sm font-semibold text-[#f4b21f] transition hover:bg-[#f4b21f]/10"
        >
          Contact Support
        </button>
      </div>
    </GlassPanel>
  );
}

function HotelSummaryCard() {
  const stay = confirmationData.stay;

  return (
    <GlassPanel className="p-4 sm:p-5">
      <div className="grid gap-5 2xl:grid-cols-[340px_minmax(0,1fr)]">
        <img
          src={stay.image}
          alt="Tokyo skyline at dusk with Tokyo Tower"
          className="h-60 w-full rounded-md object-cover 2xl:h-64"
        />
        <div className="min-w-0 py-1">
          <h2 className="text-[1.55rem] font-extrabold leading-tight text-white">
            {stay.hotelName}
          </h2>
          <div className="mt-3 flex items-center gap-1 text-[#f4b21f]">
            {Array.from({ length: stay.rating }).map((_, index) => (
              <Star key={index} className="h-4 w-4 fill-current" />
            ))}
          </div>
          <p className="mt-3 flex items-center gap-2 text-sm text-white/78">
            <MapPin className="h-4 w-4 text-white" />
            {stay.location}
          </p>
          <div className="mt-7 grid gap-5 sm:grid-cols-2">
            <DetailLine
              icon={CalendarDays}
              title={stay.dateRange}
              copy={`${stay.nights} nights`}
            />
            <DetailLine
              icon={UserRound}
              title={`${stay.rooms} Room, ${stay.guestsSummary}`}
              copy={stay.bed}
              bordered
            />
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            {stay.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-md border border-white/14 bg-white/[0.04] px-4 py-2 text-sm text-white/86"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
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
  icon: LucideIcon;
  title: string;
  copy: string;
  bordered?: boolean;
}) {
  return (
    <div
      className={`flex gap-4 ${bordered ? "sm:border-l sm:border-white/10 sm:pl-7" : ""}`}
    >
      <Icon className="mt-0.5 h-6 w-6 shrink-0 text-white" />
      <div>
        <p className="text-sm font-semibold text-white">{title}</p>
        <p className="mt-1 text-sm text-white/65">{copy}</p>
      </div>
    </div>
  );
}

function BookingPaymentDetails() {
  const { bookingDetails, payment } = confirmationData;
  const leftDetails = [
    bookingDetails.checkIn,
    bookingDetails.checkOut,
    { label: "Guests", date: bookingDetails.guests, time: "" },
    { label: "Room Type", date: bookingDetails.roomType, time: "" },
    { label: "Meal Plan", date: bookingDetails.mealPlan, time: "" },
  ];

  return (
    <GlassPanel className="p-5 lg:p-6">
      <h2 className="text-xl font-extrabold text-white">Booking & Payment Details</h2>
      <div className="mt-5 grid gap-6 2xl:grid-cols-[minmax(0,1.15fr)_minmax(260px,.85fr)]">
        <div className="space-y-4">
          {leftDetails.map((item) => (
            <div key={item.label} className="grid gap-2 sm:grid-cols-[150px_minmax(0,1fr)_100px]">
              <p className="text-sm text-white/68">{item.label}</p>
              <p className="text-base font-medium text-white">{item.date}</p>
              {item.time ? (
                <p className="text-base font-medium text-white sm:text-right">{item.time}</p>
              ) : null}
            </div>
          ))}
        </div>
        <div className="border-t border-white/10 pt-5 2xl:border-l 2xl:border-t-0 2xl:pl-8 2xl:pt-0">
          <p className="text-sm text-white/68">Payment Status</p>
          <span className="mt-2 inline-flex items-center gap-2 rounded-md border border-[#59db62]/42 bg-[#12351e] px-3 py-2 text-sm font-semibold text-white">
            <Check className="h-4 w-4 text-[#65e66c]" />
            {payment.status}
          </span>
          <p className="mt-6 text-sm text-white/68">Payment Method</p>
          <div className="mt-2 inline-flex items-center gap-3 rounded-md border border-white/12 bg-black/16 px-3 py-2 text-sm font-semibold text-white">
            <span className="rounded bg-[#254f9e] px-1.5 py-0.5 text-[0.72rem] font-extrabold">
              VISA
            </span>
            <span>{payment.method.replace("Visa ending ", ".... ")}</span>
          </div>
          <p className="mt-6 text-sm text-white/68">Paid Amount</p>
          <p className="mt-1 text-xl font-extrabold text-[#49df56]">
            {payment.currency} {formatMoney(payment.paidAmount)}
          </p>
          <p className="mt-1 text-sm text-white/70">{payment.paidOn}</p>
        </div>
      </div>
    </GlassPanel>
  );
}

function PriceSummary() {
  const rows = [
    {
      label: `${formatMoney(confirmationData.pricing.nightlyRate)} x ${confirmationData.pricing.nights} nights`,
      value: subtotal,
    },
    { label: "Taxes & Fees", value: confirmationData.pricing.taxesAndFees },
    { label: "Service Fee", value: confirmationData.pricing.serviceFee },
  ];

  return (
    <GlassPanel className="p-5">
      <h2 className="text-xl font-extrabold text-white">Price Summary</h2>
      <div className="mt-3 space-y-2">
        {rows.map((row) => (
          <div key={row.label} className="flex items-center justify-between gap-4 text-base">
            <p className="text-white/78">{row.label}</p>
            <p className="shrink-0 text-right font-medium text-white">{formatMoney(row.value)}</p>
          </div>
        ))}
      </div>
      <div className="mt-4 flex items-center justify-between gap-4 border-t border-dashed border-white/16 pt-4">
        <p className="text-base font-extrabold text-white">Total Paid</p>
        <p className="shrink-0 text-right text-xl font-extrabold text-[#49df56]">
          {confirmationData.payment.currency} {formatMoney(totalPaid)}
        </p>
      </div>
    </GlassPanel>
  );
}

function NextSteps() {
  const steps = [
    {
      title: "Add to Calendar",
      copy: "Add your booking details to your calendar",
      button: "Add",
      icon: CalendarCheck,
    },
    {
      title: "Add to Trip",
      copy: "Save this booking to your upcoming trip",
      button: "Add",
      icon: Briefcase,
    },
    {
      title: "Set Reminder",
      copy: "Get reminded before your trip begins",
      button: "Set",
      icon: Bell,
    },
  ];

  return (
    <GlassPanel className="p-5 lg:p-6">
      <h2 className="text-xl font-extrabold text-white">What&apos;s Next?</h2>
      <div className="mt-6 space-y-7">
        {steps.map(({ title, copy, button, icon: Icon }) => (
          <div key={title} className="grid grid-cols-[56px_minmax(0,1fr)_94px] items-center gap-4">
            <span className="grid h-14 w-14 place-items-center rounded-full border border-white/12 bg-black/12">
              <Icon className="h-7 w-7 text-white/90" />
            </span>
            <div>
              <h3 className="text-base font-semibold text-white">{title}</h3>
              <p className="mt-1 text-sm leading-5 text-white/66">{copy}</p>
            </div>
            <button
              type="button"
              className="min-h-11 rounded-md border border-[#f4b21f]/70 px-4 text-sm font-semibold text-[#f4b21f] transition hover:bg-[#f4b21f]/10"
            >
              {button}
            </button>
          </div>
        ))}
      </div>
      <button
        type="button"
        className="mx-auto mt-7 flex min-h-11 items-center gap-3 px-4 text-sm font-semibold text-[#f4b21f] transition hover:text-[#ffd46a]"
      >
        Manage Booking
        <ArrowRight className="h-4 w-4" />
      </button>
    </GlassPanel>
  );
}

function HotelContact() {
  const { contact } = confirmationData;
  const items = [
    { label: contact.phone, icon: Phone },
    { label: contact.email, icon: Mail },
    { label: contact.address, icon: MapPin },
  ];

  return (
    <GlassPanel className="p-5 lg:p-6">
      <h2 className="text-lg font-extrabold text-white">Hotel Contact</h2>
      <div className="mt-4 space-y-4">
        {items.map(({ label, icon: Icon }) => (
          <div key={label} className="flex gap-3 text-sm leading-6 text-white/78">
            <Icon className="mt-1 h-5 w-5 shrink-0 text-white" />
            <span>{label}</span>
          </div>
        ))}
      </div>
      <button
        type="button"
        className="mt-6 flex min-h-12 w-full items-center justify-center gap-2 rounded-md border border-[#f4b21f]/72 px-4 text-sm font-semibold text-[#f4b21f] transition hover:bg-[#f4b21f]/10"
      >
        <MapPin className="h-4 w-4" />
        View Hotel Location
      </button>
    </GlassPanel>
  );
}

function ProtectionCard() {
  return (
    <GlassPanel className="p-6">
      <div className="flex gap-5">
        <Shield className="mt-1 h-12 w-12 shrink-0 text-[#49df56]" />
        <div>
          <h2 className="text-lg font-extrabold text-white">Your trip is protected.</h2>
          <p className="mt-2 text-sm leading-6 text-white/72">
            This booking is covered by our Best Price Guarantee and flexible cancellation policy.
          </p>
          <button
            type="button"
            className="mt-5 flex items-center gap-3 text-sm font-semibold text-[#49df56]"
          >
            View policy details
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </GlassPanel>
  );
}

function TrustStrip() {
  const trustItems = [
    {
      title: "24/7 Customer Support",
      copy: "Always here to help",
      icon: Headphones,
    },
    {
      title: "Best Price Guarantee",
      copy: "Found a lower price? We'll match it.",
      icon: ShieldCheck,
    },
    {
      title: "Flexible Cancellation",
      copy: "Plans change, we get it.",
      icon: CalendarDays,
    },
    {
      title: "Secure Payments",
      copy: "Your data is always protected",
      icon: CreditCard,
    },
  ];

  return (
    <GlassPanel className="mt-5 p-5 lg:p-6">
      <h2 className="text-center text-[1.35rem] font-medium text-white">
        We&apos;re here for you, every step of the way
      </h2>
      <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {trustItems.map(({ title, copy, icon: Icon }, index) => (
          <div
            key={title}
            className={`flex items-center gap-5 xl:px-8 ${
              index > 0 ? "xl:border-l xl:border-white/12" : ""
            }`}
          >
            <Icon className="h-10 w-10 shrink-0 text-[#f4b21f]" />
            <div>
              <h3 className="text-sm font-semibold text-white">{title}</h3>
              <p className="mt-1 text-sm text-white/64">{copy}</p>
            </div>
          </div>
        ))}
      </div>
    </GlassPanel>
  );
}
