/* eslint-disable @next/next/no-img-element */
"use client";

import Link from "next/link";
import { createContext, useContext, useMemo, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  Bell,
  CalendarDays,
  Check,
  ChevronDown,
  ChevronRight,
  CircleHelp,
  Clock3,
  CreditCard,
  Headphones,
  Heart,
  Languages,
  MapPin,
  Menu,
  Minus,
  Navigation,
  Play,
  Plus,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Star,
  TicketCheck,
  UserRound,
  UsersRound,
  Utensils,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { MainNavLink } from "@/components/navigation/MainNavLink";

type TimeSlot = {
  id: string;
  label: string;
  availableSeats: number;
};

type ExperienceIconKey =
  | "badgeCheck"
  | "clock"
  | "languages"
  | "mapPin"
  | "navigation"
  | "sparkles"
  | "users"
  | "utensils";

type ExperienceIcon = LucideIcon | ExperienceIconKey;

export type ExperienceBookingData = {
  experience: {
    id: string;
    slug: string;
    title: string;
    city: string;
    country: string;
    rating: number;
    reviewCount: number;
    badge: string;
    description: string;
    overview: string;
    price: {
      currency: "USD";
      amount: number;
      unit: string;
    };
    gallery: {
      hero: string;
      thumbnails: { id: string; src: string; label: string; type?: "image" | "video" }[];
      remainingPhotos: number;
    };
    infoStrip: { label: string; value: string; helper: string; icon: ExperienceIcon }[];
    featureHighlights: { title: string; copy: string; icon: ExperienceIcon }[];
    included: string[];
    meetingPoint: {
      id: string;
      title: string;
      instructions: string;
      mapPreview: string;
      coordinates: { lat: number; lng: number };
    };
    cancellationPolicy: {
      id: string;
      shortRules: string[];
      fullPolicyHref: string;
    };
    highlights: string[];
  };
  availability: {
    selectedDate: string;
    dates: string[];
    timeSlots: TimeSlot[];
    guestLimit: {
      min: number;
      max: number;
      defaultGuests: number;
    };
  };
  reviews: {
    overall: number;
    count: number;
    metrics: { label: string; value: number }[];
    featured: {
      author: string;
      verified: boolean;
      avatar: string;
      rating: number;
      age: string;
      body: string;
    };
  };
  guide: {
    id: string;
    language: string;
    verification: string;
  };
  booking: {
    defaultStatus: "draft";
    confirmationType: "instant";
    paymentSecurity: "secure";
  };
};

export type ExperienceDetailPageData = ExperienceBookingData & {
  breadcrumbs?: Array<{ label: string; href?: string }>;
  backHref?: string;
  mapHref?: string;
  relatedExperiences?: Array<{
    title: string;
    href: string;
    image: string;
    meta: string;
  }>;
};

const ExperienceDetailContext = createContext<ExperienceDetailPageData | null>(null);

function useExperienceDetailData() {
  const data = useContext(ExperienceDetailContext);
  if (!data) return experienceBookingData;
  return data;
}

export const experienceBookingData: ExperienceDetailPageData = {
  experience: {
    id: "exp_tokyo_shibuya_food_walk",
    slug: "shibuya-food-culture-walk",
    title: "Shibuya Food & Culture Walk",
    city: "Tokyo",
    country: "Japan",
    rating: 4.8,
    reviewCount: 1248,
    badge: "Top Rated Experience",
    description:
      "Explore Shibuya's hidden gems, local eateries and iconic landmarks with a passionate local guide.",
    overview:
      "Join a local guide for an unforgettable walking tour through Shibuya. Taste authentic Japanese street food, discover hidden alleys and experience the vibrant culture of one of Tokyo's most exciting districts.",
    price: {
      currency: "USD",
      amount: 89,
      unit: "per person",
    },
    gallery: {
      hero:
        "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=1600&q=88",
      thumbnails: [
        {
          id: "video_intro",
          src: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=520&q=82",
          label: "Experience video",
          type: "video",
        },
        {
          id: "lantern_alley",
          src: "https://images.unsplash.com/photo-1528164344705-47542687000d?auto=format&fit=crop&w=520&q=82",
          label: "Lantern alley",
        },
        {
          id: "sushi_tasting",
          src: "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?auto=format&fit=crop&w=520&q=82",
          label: "Sushi tasting",
        },
        {
          id: "crossing",
          src: "https://images.unsplash.com/photo-1542051841857-5f90071e7989?auto=format&fit=crop&w=520&q=82",
          label: "Shibuya crossing",
        },
      ],
      remainingPhotos: 15,
    },
    infoStrip: [
      { label: "Duration", value: "3.5 Hours", helper: "Duration", icon: Clock3 },
      { label: "Small Group", value: "Small Group", helper: "Max 10 people", icon: UsersRound },
      { label: "Walking Tour", value: "Walking Tour", helper: "Easy Pace", icon: Navigation },
      { label: "Language", value: "English", helper: "Live Guide", icon: Languages },
    ],
    featureHighlights: [
      {
        title: "Taste & Discover",
        copy: "Enjoy 6+ food stops and local tastings.",
        icon: Utensils,
      },
      {
        title: "Hidden Gems",
        copy: "Visit spots known only to locals.",
        icon: MapPin,
      },
      {
        title: "Local Insights",
        copy: "Learn about Shibuya's culture and history.",
        icon: BadgeCheck,
      },
      {
        title: "Photo Opportunities",
        copy: "Capture iconic views and moments.",
        icon: Sparkles,
      },
    ],
    included: [
      "Local English-speaking guide",
      "6+ food and drink tastings",
      "Walking tour of Shibuya highlights",
      "Visit to hidden local spots",
      "Cultural insights and stories",
      "Small group experience",
      "Photo recommendations",
    ],
    meetingPoint: {
      id: "meeting_hachiko_statue",
      title: "Hachiko Statue, Shibuya Station",
      instructions: "Outside the main exit near the statue.",
      mapPreview:
        "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=900&q=82",
      coordinates: { lat: 35.6591, lng: 139.7005 },
    },
    cancellationPolicy: {
      id: "policy_free_24h",
      shortRules: [
        "Free cancellation up to 24 hours before the experience.",
        "Cancellations within 24 hours are non-refundable.",
      ],
      fullPolicyHref: "#cancellation",
    },
    highlights: [
      "Shibuya Crossing",
      "Hidden Food Alleys",
      "Local Izakaya Stop",
      "Trendy Cafes & Sweets",
      "Street Art & Culture",
    ],
  },
  availability: {
    selectedDate: "May 20, 2025",
    dates: ["May 20, 2025", "May 21, 2025", "May 22, 2025"],
    timeSlots: [
      { id: "slot_0900", label: "09:00 AM", availableSeats: 8 },
      { id: "slot_1200", label: "12:00 PM", availableSeats: 4 },
      { id: "slot_1500", label: "03:00 PM", availableSeats: 10 },
      { id: "slot_1700", label: "05:00 PM", availableSeats: 6 },
      { id: "slot_1900", label: "07:00 PM", availableSeats: 5 },
    ],
    guestLimit: {
      min: 1,
      max: 10,
      defaultGuests: 2,
    },
  },
  reviews: {
    overall: 4.8,
    count: 1248,
    metrics: [
      { label: "Overall Experience", value: 4.8 },
      { label: "Guide Quality", value: 4.9 },
      { label: "Value for Money", value: 4.7 },
      { label: "Service", value: 4.8 },
    ],
    featured: {
      author: "Emma Johnson",
      verified: true,
      avatar:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=160&q=80",
      rating: 5,
      age: "2 days ago",
      body:
        "Amazing experience! Our guide was so friendly and knowledgeable. The food was incredible!",
    },
  },
  guide: {
    id: "guide_tokyo_local_collective",
    language: "English",
    verification: "Licensed local guide",
  },
  booking: {
    defaultStatus: "draft",
    confirmationType: "instant",
    paymentSecurity: "secure",
  },
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

const tabs = [
  "Overview",
  "Itinerary",
  "What's Included",
  "Meeting Point",
  "Reviews",
  "Cancellation",
  "FAQ",
];

const avatar =
  "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=160&q=80";

const formatPrice = (value: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(value);

const iconByKey: Record<ExperienceIconKey, LucideIcon> = {
  badgeCheck: BadgeCheck,
  clock: Clock3,
  languages: Languages,
  mapPin: MapPin,
  navigation: Navigation,
  sparkles: Sparkles,
  users: UsersRound,
  utensils: Utensils,
};

function resolveIcon(icon: ExperienceIcon) {
  return typeof icon === "string" ? iconByKey[icon] : icon;
}

export function ExperienceDetailBookingPage({
  data = experienceBookingData,
}: {
  data?: ExperienceDetailPageData;
}) {
  const [selectedSlotId, setSelectedSlotId] = useState(
    data.availability.timeSlots[0]?.id ?? "",
  );
  const [guests, setGuests] = useState(data.availability.guestLimit.defaultGuests);
  const [selectedImage, setSelectedImage] = useState(data.experience.gallery.hero);

  const selectedSlot = useMemo(
    () =>
      data.availability.timeSlots.find((slot) => slot.id === selectedSlotId) ??
      data.availability.timeSlots[0],
    [data.availability.timeSlots, selectedSlotId],
  );

  const totalPrice = guests * data.experience.price.amount;

  return (
    <ExperienceDetailContext.Provider value={data}>
      <main className="min-h-screen bg-[#02070a] text-white">
        <TopNavigation />
        <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_22%_0%,rgba(244,178,31,.12),transparent_24%),radial-gradient(circle_at_76%_10%,rgba(68,117,132,.16),transparent_28%),linear-gradient(180deg,#02070a_0%,#061219_46%,#02070a_100%)]" />
        <div className="relative mx-auto w-full max-w-[1920px] px-4 pb-28 pt-20 sm:px-6 lg:pb-12">
          <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_490px] 2xl:grid-cols-[minmax(0,1fr)_510px]">
            <section className="min-w-0 space-y-4">
              <GlassPanel className="p-4 md:p-5">
                <Breadcrumb />
                <div className="mt-5 grid gap-6 2xl:grid-cols-[minmax(0,1.45fr)_minmax(360px,.95fr)]">
                  <Gallery selectedImage={selectedImage} onSelectImage={setSelectedImage} />
                  <HeroSummary />
                </div>
              </GlassPanel>
              <OverviewTabs />
              <DetailCards />
              <RelatedExperiences />
              <TrustStrip />
            </section>

            <aside className="space-y-4 xl:sticky xl:top-20 xl:self-start">
              <BookingPanel
                guests={guests}
                selectedSlotId={selectedSlotId}
                totalPrice={totalPrice}
                onSelectSlot={setSelectedSlotId}
                onGuestsChange={setGuests}
              />
              <HelpCard />
              <ReviewsCard />
            </aside>
          </div>
        </div>
        <div className="fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-[#02070a]/94 p-3 backdrop-blur-2xl xl:hidden">
          <div className="mx-auto flex max-w-3xl items-center gap-3">
            <div className="min-w-0 flex-1">
              <p className="text-[11px] font-semibold uppercase text-white/54">
                {selectedSlot?.label} · {guests} guests
              </p>
              <p className="text-lg font-bold text-white">{formatPrice(totalPrice)}</p>
            </div>
            <button
              type="button"
              className="flex min-h-12 shrink-0 items-center justify-center gap-2 rounded-md bg-[#f5b21d] px-5 text-sm font-extrabold text-[#150f04] shadow-[0_16px_42px_rgba(245,178,29,.28)]"
            >
              Book Now
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </main>
    </ExperienceDetailContext.Provider>
  );
}

function TopNavigation() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/8 bg-[#02070a]/90 backdrop-blur-2xl">
      <div className="mx-auto flex h-16 max-w-[1920px] items-center gap-3 px-4 sm:px-6">
        <Link href="/" className="flex shrink-0 items-center gap-3" aria-label="JOURNEE home">
          <JourneeMark />
          <span className="text-2xl font-medium uppercase tracking-[0] text-white">JOURNEE</span>
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
        <div className="ml-auto hidden items-center gap-2 text-sm font-semibold text-[#f5b21d] lg:flex">
          <ShoppingBag className="h-4 w-4" />
          Offline Access
        </div>
        <button
          type="button"
          aria-label="Notifications"
          className="relative grid h-10 w-10 shrink-0 place-items-center rounded-full text-white/88 transition hover:bg-white/[0.06]"
        >
          <Bell className="h-5 w-5" />
          <span className="absolute right-1.5 top-0.5 grid h-4 min-w-4 place-items-center rounded-full bg-[#f5b21d] px-1 text-[10px] font-bold text-[#150f04]">
            3
          </span>
        </button>
        <img
          src={avatar}
          alt="Profile avatar"
          className="h-10 w-10 shrink-0 rounded-full border border-[#f5b21d]/55 object-cover"
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
    <svg viewBox="0 0 44 44" aria-hidden="true" className="h-9 w-9 shrink-0 text-[#f5b21d]">
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

function Breadcrumb() {
  const data = useExperienceDetailData();
  const crumbs = data.breadcrumbs ?? [
    { label: "Explore", href: "/explore" },
    { label: "Activities", href: "/experiences" },
    { label: `${data.experience.city}, ${data.experience.country}` },
    { label: data.experience.title },
  ];

  return (
    <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-white/76">
      <Link href={data.backHref ?? "/experiences"} aria-label="Back" className="mr-2 text-white/90">
        <ArrowLeft className="h-5 w-5" />
      </Link>
      {crumbs.map((crumb, index) => (
        <span key={`${crumb.label}-${index}`} className="flex items-center gap-2">
          {crumb.href && index < crumbs.length - 1 ? (
            <Link href={crumb.href} className="transition hover:text-[#f5b21d]">
              {crumb.label}
            </Link>
          ) : (
            <span className={index === crumbs.length - 1 ? "text-white/90" : ""}>{crumb.label}</span>
          )}
          {index < crumbs.length - 1 ? <ChevronRight className="h-3.5 w-3.5 text-white/52" /> : null}
        </span>
      ))}
    </div>
  );
}

function Gallery({
  selectedImage,
  onSelectImage,
}: {
  selectedImage: string;
  onSelectImage: (image: string) => void;
}) {
  const { experience } = useExperienceDetailData();
  const { gallery } = experience;

  return (
    <div className="grid min-h-[360px] gap-3 sm:grid-cols-[150px_minmax(0,1fr)]">
      <div className="grid grid-cols-4 gap-2 sm:grid-cols-1">
        {gallery.thumbnails.map((image, index) => (
          <button
            key={image.id}
            type="button"
            onClick={() => onSelectImage(image.src)}
            className={`group relative min-h-[76px] overflow-hidden rounded-md border transition sm:h-[92px] ${
              selectedImage === image.src
                ? "border-[#f5b21d]"
                : "border-white/14 hover:border-white/34"
            }`}
            aria-label={image.label}
          >
            <img src={image.src} alt="" className="h-full w-full object-cover transition duration-300 group-hover:scale-105" />
            <span className="absolute inset-0 bg-black/18" />
            {image.type === "video" ? (
              <span className="absolute inset-0 grid place-items-center">
                <span className="grid h-10 w-10 place-items-center rounded-full border border-white/45 bg-black/35 text-white backdrop-blur-md">
                  <Play className="h-4 w-4 fill-current" />
                </span>
              </span>
            ) : null}
            {index === gallery.thumbnails.length - 1 ? (
              <span className="absolute inset-0 grid place-items-center bg-black/34 text-sm font-semibold text-white">
                + {gallery.remainingPhotos} Photos
              </span>
            ) : null}
          </button>
        ))}
      </div>
      <div className="relative min-h-[360px] overflow-hidden rounded-md border border-white/10 bg-[#061016]">
        <img src={selectedImage} alt={experience.title} className="h-full min-h-[360px] w-full object-cover" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,.16),transparent_45%),linear-gradient(0deg,rgba(0,0,0,.25),transparent_48%)]" />
        <button
          type="button"
          aria-label="Save experience"
          className="absolute right-5 top-5 grid h-11 w-11 place-items-center rounded-full border border-white/26 bg-black/24 text-white backdrop-blur-xl transition hover:border-[#f5b21d] hover:text-[#f5b21d]"
        >
          <Heart className="h-6 w-6" />
        </button>
      </div>
    </div>
  );
}

function HeroSummary() {
  const { experience } = useExperienceDetailData();

  return (
    <div className="flex min-h-full flex-col justify-center py-1 lg:pl-2">
      <div>
        <span className="inline-flex items-center gap-2 rounded-md border border-[#f5b21d]/20 bg-[#f5b21d]/8 px-3 py-2 text-xs font-bold text-[#f5b21d]">
          <Star className="h-3.5 w-3.5 fill-current" />
          {experience.badge}
        </span>
        <h1 className="mt-5 text-[clamp(2rem,4vw,3rem)] font-extrabold leading-tight text-white">
          {experience.title}
        </h1>
        <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-white/78">
          <span className="flex items-center gap-1 text-[#f5b21d]">
            {Array.from({ length: 5 }).map((_, index) => (
              <Star key={index} className="h-4 w-4 fill-current" />
            ))}
          </span>
          <span className="font-semibold text-white">{experience.rating.toFixed(1)}</span>
          <span>({experience.reviewCount.toLocaleString()} reviews)</span>
          <span className="h-4 w-px bg-white/20" />
          <span>{experience.city}, {experience.country}</span>
        </div>
        <p className="mt-5 max-w-2xl text-base leading-7 text-white/78">{experience.description}</p>
      </div>
      <div className="my-7 h-px bg-white/10" />
      <div className="grid grid-cols-2 gap-y-5 sm:grid-cols-4">
        {experience.infoStrip.map((item, index) => {
          const Icon = resolveIcon(item.icon);
          return (
            <div
              key={`${item.label}-${item.value}`}
              className={`px-3 text-center ${index > 0 ? "sm:border-l sm:border-white/10" : ""}`}
            >
              <Icon className="mx-auto h-5 w-5 text-[#f5b21d]" />
              <p className="mt-2 text-sm font-semibold text-white">{item.value}</p>
              <p className="mt-0.5 text-xs text-white/62">{item.helper}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function OverviewTabs() {
  const { experience } = useExperienceDetailData();

  return (
    <GlassPanel className="overflow-hidden">
      <div className="flex gap-4 overflow-x-auto border-b border-white/10 px-5">
        {tabs.map((tab, index) => (
          <button
            key={tab}
            type="button"
            className={`min-h-14 shrink-0 border-b-2 px-1 text-sm font-semibold transition ${
              index === 0
                ? "border-[#f5b21d] text-[#f5b21d]"
                : "border-transparent text-white/82 hover:text-white"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>
      <div className="p-5">
        <p className="max-w-6xl text-base leading-8 text-white/78">{experience.overview}</p>
        <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {experience.featureHighlights.map((feature, index) => {
            const Icon = resolveIcon(feature.icon);
            return (
              <div
                key={feature.title}
                className={`flex gap-4 ${index > 0 ? "xl:border-l xl:border-white/10 xl:pl-8" : ""}`}
              >
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-md border border-[#f5b21d]/40 text-[#f5b21d]">
                  <Icon className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="text-base font-semibold text-white">{feature.title}</h3>
                  <p className="mt-1 text-sm leading-6 text-white/70">{feature.copy}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </GlassPanel>
  );
}

function DetailCards() {
  const { experience, mapHref } = useExperienceDetailData();

  return (
    <div className="grid gap-4 lg:grid-cols-2 2xl:grid-cols-4">
      <GlassPanel className="p-5">
        <h2 className="text-lg font-bold text-white">What&apos;s Included</h2>
        <ul className="mt-4 space-y-3">
          {experience.included.map((item) => (
            <li key={item} className="flex gap-3 text-sm text-white/76">
              <Check className="mt-0.5 h-4 w-4 shrink-0 rounded-full bg-[#35b75d]/20 p-0.5 text-[#57db76]" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </GlassPanel>

      <GlassPanel className="p-5">
        <h2 className="text-lg font-bold text-white">Meeting Point</h2>
        <img
          src={experience.meetingPoint.mapPreview}
          alt=""
          className="mt-4 h-28 w-full rounded-md object-cover"
        />
        <h3 className="mt-3 text-sm font-bold text-white">{experience.meetingPoint.title}</h3>
        <p className="mt-1 text-sm text-white/72">{experience.meetingPoint.instructions}</p>
        <Link
          href={mapHref ?? "#"}
          className="mt-4 flex min-h-10 w-full items-center justify-center gap-2 rounded-md border border-[#f5b21d]/70 text-sm font-bold text-[#f5b21d] transition hover:bg-[#f5b21d] hover:text-[#150f04]"
        >
          <MapPin className="h-4 w-4" />
          View on Map
        </Link>
      </GlassPanel>

      <GlassPanel className="p-5">
        <h2 className="text-lg font-bold text-white">Cancellation Policy</h2>
        <div className="mt-4 space-y-5">
          {experience.cancellationPolicy.shortRules.map((rule, index) => (
            <div key={rule} className="flex gap-4 text-sm leading-6 text-white/76">
              {index === 0 ? (
                <Clock3 className="mt-1 h-5 w-5 shrink-0 text-white/82" />
              ) : (
                <CircleHelp className="mt-1 h-5 w-5 shrink-0 text-white/82" />
              )}
              <p>{rule}</p>
            </div>
          ))}
        </div>
        <a
          href={experience.cancellationPolicy.fullPolicyHref}
          className="mt-8 inline-flex items-center gap-2 text-sm font-bold text-[#f5b21d]"
        >
          View full policy
          <ArrowRight className="h-4 w-4" />
        </a>
      </GlassPanel>

      <GlassPanel className="p-5">
        <h2 className="text-lg font-bold text-white">Experience Highlights</h2>
        <ul className="mt-4 space-y-4">
          {experience.highlights.map((item, index) => {
            const icons = [UsersRound, MapPin, Utensils, Navigation, Clock3];
            const Icon = icons[index] ?? Sparkles;
            return (
              <li key={item} className="flex items-center gap-4 text-sm text-white/78">
                <Icon className="h-5 w-5 shrink-0 text-white/84" />
                <span>{item}</span>
              </li>
            );
          })}
        </ul>
      </GlassPanel>
    </div>
  );
}

function TrustStrip() {
  const trustItems = [
    { title: "Secure Booking", copy: "Your payment is protected", icon: ShieldCheck },
    { title: "Best Price Guarantee", copy: "We match any lower price", icon: BadgeCheck },
    { title: "Trusted Local Guides", copy: "Licensed & verified experts", icon: UserRound },
    { title: "Flexible Plans", copy: "Change or cancel easily", icon: CalendarDays },
  ];

  return (
    <GlassPanel className="grid gap-4 p-5 sm:grid-cols-2 xl:grid-cols-4">
      {trustItems.map((item) => {
        const Icon = item.icon;
        return (
          <div key={item.title} className="flex items-center gap-4">
            <Icon className="h-8 w-8 shrink-0 text-[#f5b21d]" />
            <div>
              <p className="font-bold text-white">{item.title}</p>
              <p className="mt-1 text-sm text-white/66">{item.copy}</p>
            </div>
          </div>
        );
      })}
    </GlassPanel>
  );
}

function RelatedExperiences() {
  const { relatedExperiences } = useExperienceDetailData();
  if (!relatedExperiences?.length) return null;

  return (
    <GlassPanel className="p-5">
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-lg font-bold text-white">Related Experiences</h2>
        <span className="text-xs font-bold uppercase tracking-[0.12em] text-[#f5b21d]">
          Hidden gems
        </span>
      </div>
      <div className="mt-4 grid gap-3 md:grid-cols-3">
        {relatedExperiences.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="group overflow-hidden rounded-md border border-white/12 bg-black/16 transition hover:border-[#f5b21d]/60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f5b21d]"
          >
            <span className="relative block h-32 overflow-hidden">
              <img
                src={item.image}
                alt=""
                className="h-full w-full object-cover opacity-78 transition duration-500 group-hover:scale-105"
              />
              <span className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
            </span>
            <span className="block p-3">
              <span className="block text-[11px] font-bold uppercase tracking-[0.12em] text-[#f5b21d]">
                {item.meta}
              </span>
              <span className="mt-1 block text-sm font-bold leading-5 text-white">
                {item.title}
              </span>
            </span>
          </Link>
        ))}
      </div>
    </GlassPanel>
  );
}

function BookingPanel({
  guests,
  selectedSlotId,
  totalPrice,
  onSelectSlot,
  onGuestsChange,
}: {
  guests: number;
  selectedSlotId: string;
  totalPrice: number;
  onSelectSlot: (slotId: string) => void;
  onGuestsChange: (guests: number) => void;
}) {
  const { experience, availability } = useExperienceDetailData();

  return (
    <GlassPanel className="p-5 md:p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-medium text-white/62">From</p>
          <p className="mt-1 text-3xl font-extrabold text-white">
            {formatPrice(experience.price.amount)}
            <span className="ml-2 text-sm font-medium text-white/64">{experience.price.unit}</span>
          </p>
        </div>
      </div>
      <button
        type="button"
        className="mt-5 flex w-full items-center justify-between border-b border-t border-white/10 py-4 text-sm font-semibold text-[#57db76]"
      >
        <span className="flex items-center gap-2">
          <ShieldCheck className="h-5 w-5" />
          Best Price Guarantee
        </span>
        <ChevronRight className="h-4 w-4 text-white/76" />
      </button>

      <div className="mt-5 space-y-5">
        <label className="block">
          <span className="text-sm font-semibold text-white">Select Date</span>
          <span className="mt-3 flex min-h-12 items-center gap-3 rounded-md border border-white/14 bg-black/12 px-3 text-sm font-semibold text-white">
            <CalendarDays className="h-5 w-5 text-white/86" />
            {availability.selectedDate}
            <ChevronDown className="ml-auto h-4 w-4 text-white/70" />
          </span>
        </label>

        <div>
          <p className="text-sm font-semibold text-white">Available Time Slots</p>
          <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-3">
            {availability.timeSlots.map((slot) => {
              const active = slot.id === selectedSlotId;
              return (
                <button
                  key={slot.id}
                  type="button"
                  onClick={() => onSelectSlot(slot.id)}
                  className={`min-h-12 rounded-md border px-2 text-sm font-bold transition ${
                    active
                      ? "border-[#f5b21d] bg-[#f5b21d]/10 text-[#f5b21d]"
                      : "border-white/16 bg-black/10 text-white hover:border-white/36"
                  }`}
                  aria-pressed={active}
                >
                  {slot.label}
                </button>
              );
            })}
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <span className="text-sm font-semibold text-white">Guests</span>
          <button
            type="button"
            aria-label="Decrease guests"
            onClick={() => onGuestsChange(Math.max(availability.guestLimit.min, guests - 1))}
            className="grid h-9 w-9 place-items-center rounded-md border border-[#f5b21d]/60 text-[#f5b21d]"
          >
            <Minus className="h-4 w-4" />
          </button>
          <span className="w-7 text-center text-sm font-bold text-white">{guests}</span>
          <button
            type="button"
            aria-label="Increase guests"
            onClick={() => onGuestsChange(Math.min(availability.guestLimit.max, guests + 1))}
            className="grid h-9 w-9 place-items-center rounded-md border border-[#f5b21d]/60 text-[#f5b21d]"
          >
            <Plus className="h-4 w-4" />
          </button>
          <span className="ml-auto text-sm text-white/62">Max {availability.guestLimit.max} guests</span>
        </div>
      </div>

      <div className="mt-6 rounded-md border border-white/10 bg-black/12 p-4">
        <div className="flex items-center justify-between text-sm text-white/68">
          <span>Total for {guests} guests</span>
          <span>{formatPrice(totalPrice)}</span>
        </div>
      </div>

      <div className="mt-5 space-y-3">
        <button
          type="button"
          className="flex min-h-12 w-full items-center justify-center gap-3 rounded-md bg-[#f5b21d] px-5 text-sm font-extrabold text-[#150f04] shadow-[0_16px_42px_rgba(245,178,29,.28)] transition hover:bg-[#ffc547]"
        >
          Book Now
          <ArrowRight className="h-4 w-4" />
        </button>
        <button
          type="button"
          className="flex min-h-12 w-full items-center justify-center gap-3 rounded-md border border-[#f5b21d]/70 px-5 text-sm font-bold text-[#f5b21d] transition hover:bg-[#f5b21d]/10"
        >
          <ShoppingBag className="h-4 w-4" />
          Add to Trip
        </button>
      </div>

      <div className="mt-6 grid grid-cols-3 gap-3">
        {[
          { title: "Free Cancellation", copy: "up to 24 hours", icon: ShieldCheck },
          { title: "Instant Confirmation", copy: "Get tickets right away", icon: TicketCheck },
          { title: "Secure Payment", copy: "Your data is protected", icon: CreditCard },
        ].map((item) => {
          const Icon = item.icon;
          return (
            <div key={item.title} className="text-center">
              <Icon className="mx-auto h-5 w-5 text-white/84" />
              <p className="mt-2 text-[10px] font-bold leading-4 text-white/80">{item.title}</p>
              <p className="text-[10px] leading-4 text-white/50">{item.copy}</p>
            </div>
          );
        })}
      </div>
    </GlassPanel>
  );
}

function HelpCard() {
  return (
    <GlassPanel className="flex items-center gap-5 p-5">
      <Headphones className="h-8 w-8 shrink-0 text-white/88" />
      <div className="min-w-0 flex-1">
        <h2 className="text-lg font-bold text-white">Need Help?</h2>
        <p className="mt-1 text-sm text-white/66">Our support team is here for you.</p>
      </div>
      <button
        type="button"
        className="min-h-10 shrink-0 rounded-md border border-[#f5b21d]/70 px-5 text-sm font-bold text-[#f5b21d] transition hover:bg-[#f5b21d] hover:text-[#150f04]"
      >
        Contact Support
      </button>
    </GlassPanel>
  );
}

function ReviewsCard() {
  const { reviews } = useExperienceDetailData();

  return (
    <GlassPanel className="p-5 md:p-6">
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-lg font-bold text-white">What Travelers Say</h2>
        <button type="button" className="flex items-center gap-2 text-xs font-bold text-[#f5b21d]">
          View All Reviews
          <ArrowRight className="h-3.5 w-3.5" />
        </button>
      </div>
      <div className="mt-5 flex items-end gap-3">
        <span className="text-4xl font-extrabold text-white">{reviews.overall.toFixed(1)}</span>
        <span className="mb-2 flex items-center gap-1 text-[#f5b21d]">
          {Array.from({ length: 5 }).map((_, index) => (
            <Star key={index} className="h-4 w-4 fill-current" />
          ))}
        </span>
        <span className="mb-2 text-sm text-white/72">{reviews.count.toLocaleString()} reviews</span>
      </div>
      <div className="mt-5 space-y-2">
        {reviews.metrics.map((metric) => (
          <div key={metric.label} className="grid grid-cols-[130px_minmax(0,1fr)_28px] items-center gap-3 text-xs">
            <span className="text-white/76">{metric.label}</span>
            <span className="h-1.5 overflow-hidden rounded-full bg-white/12">
              <span
                className="block h-full rounded-full bg-[#f5b21d]"
                style={{ width: `${(metric.value / 5) * 100}%` }}
              />
            </span>
            <span className="text-right text-white/74">{metric.value.toFixed(1)}</span>
          </div>
        ))}
      </div>
      <div className="mt-6 border-t border-white/10 pt-5">
        <div className="flex items-center gap-3">
          <img src={reviews.featured.avatar} alt="" className="h-10 w-10 rounded-full object-cover" />
          <div className="min-w-0">
            <p className="font-bold text-white">{reviews.featured.author}</p>
            <p className="inline-flex items-center gap-1 rounded-full bg-[#35b75d]/16 px-2 py-0.5 text-[11px] font-bold text-[#57db76]">
              <BadgeCheck className="h-3 w-3" />
              Verified
            </p>
          </div>
        </div>
        <div className="mt-3 flex flex-wrap items-center gap-2 text-sm">
          <span className="flex text-[#f5b21d]">
            {Array.from({ length: reviews.featured.rating }).map((_, index) => (
              <Star key={index} className="h-4 w-4 fill-current" />
            ))}
          </span>
          <span className="text-white/58">{reviews.featured.age}</span>
        </div>
        <div className="mt-3 flex items-center gap-3">
          <ChevronRight className="h-5 w-5 rotate-180 text-white/76" />
          <p className="flex-1 text-sm leading-6 text-white/74">{reviews.featured.body}</p>
          <ChevronRight className="h-5 w-5 text-white/76" />
        </div>
      </div>
    </GlassPanel>
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
