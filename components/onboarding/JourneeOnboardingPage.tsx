import Image from "next/image";
import Link from "next/link";
import type { ComponentType, ReactNode } from "react";
import { MainNavLink } from "@/components/navigation/MainNavLink";
import {
  Bell,
  BriefcaseBusiness,
  Camera,
  Check,
  ChevronDown,
  CreditCard,
  Crown,
  Dumbbell,
  Gem,
  Heart,
  Landmark,
  Leaf,
  Lightbulb,
  MapPinned,
  Mountain,
  Palette,
  Palmtree,
  Plane,
  Route,
  ShieldCheck,
  ShoppingBag,
  Snowflake,
  Sparkles,
  Trees,
  Umbrella,
  User,
  UsersRound,
  Utensils,
  WalletCards,
  Waves,
} from "lucide-react";

type PreferenceOption = {
  id: string;
  label: string;
  description?: string;
  icon: ComponentType<{ className?: string; strokeWidth?: number }>;
};

type OnboardingPreferenceState = {
  currentStep: 2;
  travelStyle: string[];
  budgetStyle: string;
  travelPace: string;
  travelingWith: string;
  topInterests: string[];
  units: {
    distance: "kilometers" | "miles";
    temperature: "celsius" | "fahrenheit";
    currency: string;
  };
  safety: {
    alerts: boolean;
    soloFemaleTravel: boolean;
    emergencyContacts: boolean;
  };
  documents: {
    passportReminder: boolean;
    visaGuidance: boolean;
    defaultPassportCountry: string;
  };
  recommendationStyle: "local-first" | "balanced" | "iconic";
};

const onboardingState: OnboardingPreferenceState = {
  currentStep: 2,
  travelStyle: ["nature-outdoors", "food-culinary", "relaxation"],
  budgetStyle: "budget",
  travelPace: "slow-relaxed",
  travelingWith: "solo",
  topInterests: ["beaches", "road-trips", "local-experiences"],
  units: {
    distance: "kilometers",
    temperature: "celsius",
    currency: "USD",
  },
  safety: {
    alerts: true,
    soloFemaleTravel: true,
    emergencyContacts: false,
  },
  documents: {
    passportReminder: true,
    visaGuidance: true,
    defaultPassportCountry: "United States",
  },
  recommendationStyle: "local-first",
};

const navItems = [
  ["Home", "/"],
  ["Explore", "/explore"],
  ["Map", "/atlas"],
  ["Trips", "/trips"],
  ["Guides", "/guides"],
  ["Journal", "/journal"],
  ["Stays", "/stays"],
  ["Flights", "/flights"],
  ["Visa", "/visa"],
  ["Budget", "/budget"],
  ["Weather", "/weather"],
  ["Currency", "/currency"],
  ["Support", "/support"],
] as const;

const steps = [
  { id: 1, title: "Welcome", note: "Let's get started" },
  { id: 2, title: "Travel Preferences", note: "Your travel style & interests" },
  { id: 3, title: "Documents & Visa", note: "Passport & visa preferences" },
  { id: 4, title: "Preferences", note: "Currency, units & more" },
  { id: 5, title: "Safety Preferences", note: "Solo female travel preferences" },
  { id: 6, title: "Review", note: "Review your selections" },
  { id: 7, title: "You're all set!", note: "Ready to explore" },
];

const travelStyles: PreferenceOption[] = [
  { id: "nature-outdoors", label: "Nature & Outdoors", description: "Mountains, beaches, parks, adventure", icon: Mountain },
  { id: "culture-history", label: "Culture & History", description: "Museums, historical sites, local culture", icon: Landmark },
  { id: "food-culinary", label: "Food & Culinary", description: "Local cuisine, food tours, cooking", icon: Utensils },
  { id: "city-life", label: "City Life", description: "Urban areas, nightlife, shopping, events", icon: BriefcaseBusiness },
  { id: "relaxation", label: "Relaxation", description: "Beaches, spas, resorts, wellness", icon: Umbrella },
];

const budgetStyles: PreferenceOption[] = [
  { id: "budget", label: "Budget", description: "I like to save and find deals", icon: WalletCards },
  { id: "mid-range", label: "Mid-range", description: "Comfortable and balanced", icon: CreditCard },
  { id: "luxury", label: "Luxury", description: "Premium experiences", icon: Gem },
];

const paceStyles: PreferenceOption[] = [
  { id: "slow-relaxed", label: "Slow & Relaxed", description: "Take it easy, enjoy the moment", icon: Waves },
  { id: "balanced", label: "Balanced", description: "Mix of exploration and relaxation", icon: User },
  { id: "fast-active", label: "Fast & Active", description: "See more, do more", icon: Dumbbell },
];

const travelingOptions: PreferenceOption[] = [
  { id: "solo", label: "Solo", description: "Just me", icon: User },
  { id: "partner", label: "With Partner", description: "Couples travel", icon: Heart },
  { id: "family", label: "With Family", description: "Kids or multi-gen", icon: UsersRound },
  { id: "friends", label: "With Friends", description: "Friends & groups", icon: UsersRound },
];

const interests: PreferenceOption[] = [
  { id: "adventure", label: "Adventure", icon: Route },
  { id: "hiking", label: "Hiking", icon: Trees },
  { id: "beaches", label: "Beaches", icon: Waves },
  { id: "photography", label: "Photography", icon: Camera },
  { id: "wildlife", label: "Wildlife", icon: Leaf },
  { id: "wellness", label: "Wellness", icon: Sparkles },
  { id: "skiing", label: "Skiing", icon: Snowflake },
  { id: "road-trips", label: "Road Trips", icon: Route },
  { id: "festivals", label: "Festivals", icon: Heart },
  { id: "art-design", label: "Art & Design", icon: Palette },
  { id: "cruises", label: "Cruises", icon: Plane },
  { id: "luxury-travel", label: "Luxury Travel", icon: Crown },
  { id: "local-experiences", label: "Local Experiences", icon: MapPinned },
  { id: "nightlife", label: "Nightlife", icon: BriefcaseBusiness },
  { id: "shopping", label: "Shopping", icon: ShoppingBag },
];

function isSelected(id: string, selected: string | string[]) {
  return Array.isArray(selected) ? selected.includes(id) : selected === id;
}

function optionLabel(options: PreferenceOption[], id: string) {
  return options.find((option) => option.id === id)?.label ?? id;
}

function Brand() {
  return (
    <Link href="/" className="flex shrink-0 items-center gap-3 text-white" aria-label="Journee home">
      <span className="grid h-10 w-10 place-items-center text-[#ffb300]">
        <svg viewBox="0 0 48 48" className="h-9 w-9" aria-hidden="true">
          <path
            d="M5 37 18 9l8 16 5-9 12 21H5Z"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2.5"
          />
        </svg>
      </span>
      <span className="text-2xl font-semibold uppercase text-white">JOURNEE</span>
    </Link>
  );
}

function GlassPanel({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <section
      className={`rounded-lg border border-white/10 bg-[#07131b]/74 shadow-[0_24px_70px_rgba(0,0,0,0.34)] backdrop-blur-xl ${className}`}
    >
      {children}
    </section>
  );
}

function PreferenceCard({
  option,
  selected,
  compact = false,
}: {
  option: PreferenceOption;
  selected: boolean;
  compact?: boolean;
}) {
  const Icon = option.icon;

  return (
    <button
      type="button"
      className={`group relative flex min-h-[98px] flex-col items-center justify-center rounded-lg border p-4 text-center transition ${
        selected
          ? "border-[#f7ad10] bg-[#f7ad10]/10 text-[#f7ad10] shadow-[0_0_0_1px_rgba(247,173,16,0.16),0_18px_45px_rgba(247,173,16,0.08)]"
          : "border-white/12 bg-white/[0.025] text-white hover:border-white/26 hover:bg-white/[0.055]"
      } ${compact ? "min-h-[88px]" : ""}`}
      aria-pressed={selected}
    >
      {selected ? (
        <span className="absolute right-3 top-3 grid h-5 w-5 place-items-center rounded-full bg-[#ffc226] text-[#091018]">
          <Check className="h-3.5 w-3.5" strokeWidth={3} />
        </span>
      ) : null}
      <Icon className={`mb-3 h-9 w-9 ${selected ? "text-[#f7ad10]" : "text-white"}`} strokeWidth={1.7} />
      <span className={`text-sm font-semibold ${selected ? "text-[#f7ad10]" : "text-white"}`}>{option.label}</span>
      {option.description ? (
        <span className="mt-1 max-w-[11rem] text-xs leading-5 text-white/66">{option.description}</span>
      ) : null}
    </button>
  );
}

function InterestChip({ option, selected }: { option: PreferenceOption; selected: boolean }) {
  const Icon = option.icon;

  return (
    <button
      type="button"
      className={`flex h-11 items-center justify-center gap-3 rounded-md border px-4 text-sm font-medium transition ${
        selected
          ? "border-[#f7ad10] bg-[#f7ad10]/8 text-white shadow-[0_0_0_1px_rgba(247,173,16,0.12)]"
          : "border-white/12 bg-white/[0.025] text-white hover:border-white/24"
      }`}
      aria-pressed={selected}
    >
      <Icon className={selected ? "h-4 w-4 text-[#f7ad10]" : "h-4 w-4 text-white/84"} strokeWidth={1.8} />
      <span>{option.label}</span>
    </button>
  );
}

function TopNavigation() {
  return (
    <header className="sticky top-0 z-20 border-b border-white/8 bg-[#02080c]/82 px-4 py-4 backdrop-blur-xl sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-[1900px] items-center gap-7">
        <Brand />
        <nav className="hidden min-w-0 flex-1 items-center gap-5 overflow-x-auto whitespace-nowrap text-sm font-semibold text-white lg:flex">
          {navItems.map(([label, href]) => (
            <MainNavLink
              key={label}
              label={label}
              href={href}
              className="shrink-0 text-white/92 transition hover:text-[#f7ad10]"
              activeClassName="text-[#f7ad10]"
            />
          ))}
        </nav>
        <div className="ml-auto hidden w-[220px] shrink-0 md:block">
          <div className="mb-2 flex items-center justify-between text-xs font-medium text-white/62">
            <span>Step 2 of 7</span>
          </div>
          <div className="h-1 rounded-full bg-white/12">
            <div className="h-full w-[30%] rounded-full bg-[#f7ad10]" />
          </div>
        </div>
        <button type="button" className="relative grid h-10 w-10 shrink-0 place-items-center rounded-full border border-white/10 bg-white/[0.03] text-white">
          <Bell className="h-5 w-5" strokeWidth={1.8} />
          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-[#f7ad10]" />
        </button>
        <button type="button" className="hidden shrink-0 items-center gap-2 sm:flex" aria-label="Profile menu">
          <Image
            src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80"
            alt="Profile avatar"
            width={42}
            height={42}
            className="h-10 w-10 rounded-full border border-[#f7ad10]/35 object-cover"
          />
          <ChevronDown className="h-4 w-4 text-white/80" />
        </button>
      </div>
      <div className="mt-4 md:hidden">
        <div className="mb-2 flex items-center justify-between text-xs font-medium text-white/70">
          <span>Travel Preferences</span>
          <span>Step 2 of 7</span>
        </div>
        <div className="h-1 rounded-full bg-white/12">
          <div className="h-full w-[30%] rounded-full bg-[#f7ad10]" />
        </div>
      </div>
    </header>
  );
}

function LeftSidebar() {
  return (
    <GlassPanel className="flex h-full flex-col p-6 lg:p-7">
      <div>
        <h1 className="max-w-[16rem] text-[1.45rem] font-bold leading-tight text-white lg:text-[1.6rem]">
          Let&apos;s personalize Journee for you
        </h1>
        <p className="mt-4 text-sm leading-6 text-white/74">
          Tell us a bit about your travel style so we can create the perfect experience.
        </p>
        <Sparkles className="mt-5 h-5 w-5 text-[#f7ad10]" strokeWidth={1.8} />
      </div>

      <ol className="mt-7 space-y-1">
        {steps.map((step, index) => {
          const active = step.id === onboardingState.currentStep;
          const complete = step.id < onboardingState.currentStep;

          return (
            <li key={step.id} className="relative">
              {index < steps.length - 1 ? (
                <span className="absolute left-[17px] top-9 h-10 w-px bg-white/12" aria-hidden="true" />
              ) : null}
              <div className={`flex gap-4 rounded-md px-2 py-3 ${active ? "bg-[#f7ad10]/16" : ""}`}>
                <span
                  className={`relative z-10 grid h-8 w-8 shrink-0 place-items-center rounded-full border text-xs font-semibold ${
                    active
                      ? "border-[#f7ad10] bg-[#f7ad10] text-[#071018]"
                      : complete
                        ? "border-[#f7ad10] bg-[#071018] text-[#f7ad10]"
                        : "border-white/28 bg-[#071018] text-white/62"
                  }`}
                >
                  {complete ? <Check className="h-4 w-4" strokeWidth={2.4} /> : step.id}
                </span>
                <span>
                  <span className={`block text-sm font-semibold ${active ? "text-white" : "text-white/86"}`}>
                    {step.title}
                  </span>
                  <span className={`mt-0.5 block text-xs ${active ? "text-[#f7ad10]" : "text-white/56"}`}>
                    {step.note}
                  </span>
                </span>
              </div>
            </li>
          );
        })}
      </ol>

      <div className="mt-8 rounded-lg border border-white/12 bg-white/[0.035] p-5 lg:mt-auto">
        <div className="flex items-center gap-3">
          <span className="grid h-9 w-9 place-items-center rounded-full border border-[#f7ad10]/55 text-[#f7ad10]">
            <ShieldCheck className="h-5 w-5" strokeWidth={1.8} />
          </span>
          <p className="text-sm font-semibold text-white">Your data is safe with us.</p>
        </div>
        <p className="mt-4 text-xs leading-6 text-white/70">
          We use your preferences only to personalize your experience.
        </p>
      </div>
    </GlassPanel>
  );
}

function PreferenceSection({
  title,
  children,
  className = "",
}: {
  title: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`rounded-lg border border-white/10 bg-white/[0.025] p-4 ${className}`}>
      <h3 className="mb-3 text-sm font-semibold text-white">{title}</h3>
      {children}
    </div>
  );
}

function MainContent() {
  return (
    <GlassPanel className="p-5 sm:p-6">
      <div>
        <h2 className="text-2xl font-bold leading-tight text-white">What&apos;s your travel style?</h2>
        <p className="mt-2 text-sm text-white/74">
          Select all that apply. This helps us personalize recommendations for you.
        </p>
      </div>

      <div className="mt-5 space-y-3">
        <PreferenceSection title="I love to explore...">
          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-5">
            {travelStyles.map((option) => (
              <PreferenceCard key={option.id} option={option} selected={isSelected(option.id, onboardingState.travelStyle)} />
            ))}
          </div>
        </PreferenceSection>

        <div className="grid gap-3 2xl:grid-cols-2">
          <PreferenceSection title="My budget style">
            <div className="grid gap-3 sm:grid-cols-3">
              {budgetStyles.map((option) => (
                <PreferenceCard
                  key={option.id}
                  option={option}
                  selected={isSelected(option.id, onboardingState.budgetStyle)}
                  compact
                />
              ))}
            </div>
          </PreferenceSection>
          <PreferenceSection title="My travel pace">
            <div className="grid gap-3 sm:grid-cols-3">
              {paceStyles.map((option) => (
                <PreferenceCard
                  key={option.id}
                  option={option}
                  selected={isSelected(option.id, onboardingState.travelPace)}
                  compact
                />
              ))}
            </div>
          </PreferenceSection>
        </div>

        <PreferenceSection title="I usually travel...">
          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            {travelingOptions.map((option) => (
              <button
                key={option.id}
                type="button"
                className={`flex min-h-[78px] items-center justify-center gap-4 rounded-lg border px-4 text-left transition ${
                  isSelected(option.id, onboardingState.travelingWith)
                    ? "border-[#f7ad10] bg-[#f7ad10]/9 text-[#f7ad10]"
                    : "border-white/12 bg-white/[0.025] text-white hover:border-white/24"
                }`}
                aria-pressed={isSelected(option.id, onboardingState.travelingWith)}
              >
                <option.icon
                  className={isSelected(option.id, onboardingState.travelingWith) ? "h-8 w-8 text-[#f7ad10]" : "h-8 w-8 text-white"}
                  strokeWidth={1.7}
                />
                <span>
                  <span className="block text-sm font-semibold">{option.label}</span>
                  <span className="mt-0.5 block text-xs text-white/64">{option.description}</span>
                </span>
              </button>
            ))}
          </div>
        </PreferenceSection>

        <PreferenceSection title="I'm interested in...">
          <div className="mb-3 flex items-center gap-2 text-xs font-medium text-white/70">
            <Sparkles className="h-4 w-4 text-[#f7ad10]" strokeWidth={1.8} />
            <span>Choose your top 3 interests</span>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-5">
            {interests.map((option) => (
              <InterestChip key={option.id} option={option} selected={isSelected(option.id, onboardingState.topInterests)} />
            ))}
          </div>
        </PreferenceSection>

        <div className="flex flex-col gap-3 pt-1 sm:flex-row sm:items-center sm:justify-between">
          <button
            type="button"
            className="inline-flex h-12 items-center justify-center rounded-md border border-white/12 bg-white/[0.025] px-7 text-sm font-semibold text-white/80 transition hover:border-white/24"
          >
            Back
          </button>
          <button
            type="button"
            className="inline-flex h-12 items-center justify-center rounded-md bg-[#f7ad10] px-8 text-sm font-semibold text-[#071018] shadow-[0_15px_36px_rgba(247,173,16,0.25)] transition hover:bg-[#ffc226] sm:min-w-[280px]"
          >
            Next: Documents & Visa
          </button>
        </div>
      </div>
    </GlassPanel>
  );
}

function SummaryItem({
  icon: Icon,
  title,
  value,
}: {
  icon: ComponentType<{ className?: string; strokeWidth?: number }>;
  title: string;
  value: string;
}) {
  return (
    <div className="flex gap-4">
      <Icon className="mt-1 h-7 w-7 shrink-0 text-white" strokeWidth={1.6} />
      <div>
        <p className="text-sm font-semibold text-white">{title}</p>
        <p className="mt-1 text-xs leading-5 text-white/66">{value}</p>
      </div>
    </div>
  );
}

function RightSidebar() {
  return (
    <aside className="space-y-4">
      <GlassPanel className="p-6 lg:p-7">
        <h2 className="text-sm font-bold uppercase text-[#f7ad10]">Your Personalization Summary</h2>
        <div className="mt-7 space-y-7">
          <SummaryItem
            icon={Mountain}
            title="Travel Style"
            value={onboardingState.travelStyle.map((id) => optionLabel(travelStyles, id)).join(", ")}
          />
          <SummaryItem icon={WalletCards} title="Budget Style" value={optionLabel(budgetStyles, onboardingState.budgetStyle)} />
          <SummaryItem icon={User} title="Travel Pace" value={optionLabel(paceStyles, onboardingState.travelPace)} />
          <SummaryItem icon={User} title="Traveling" value={optionLabel(travelingOptions, onboardingState.travelingWith)} />
          <SummaryItem
            icon={Palmtree}
            title={`Top Interests (${onboardingState.topInterests.length})`}
            value={onboardingState.topInterests.map((id) => optionLabel(interests, id)).join(", ")}
          />
        </div>
      </GlassPanel>

      <GlassPanel className="p-6 lg:p-7">
        <div className="flex gap-4">
          <Lightbulb className="h-7 w-7 shrink-0 text-[#f7ad10]" strokeWidth={1.8} />
          <div>
            <h2 className="text-sm font-bold text-[#f7ad10]">Why we ask?</h2>
            <p className="mt-3 text-sm leading-6 text-white/72">
              Your preferences help us show you better recommendations, create personalized itineraries and send relevant alerts.
            </p>
          </div>
        </div>
      </GlassPanel>

      <div className="relative overflow-hidden rounded-lg border border-white/10 bg-[#07131b]">
        <Image
          src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=900&q=86"
          alt="Mountain lake at sunset"
          width={900}
          height={620}
          className="h-[240px] w-full object-cover lg:h-[300px]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#03080b] via-[#03080b]/40 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 p-6">
          <h2 className="max-w-[18rem] text-xl font-semibold leading-snug text-white">
            Great trips start with personalization
          </h2>
          <p className="mt-3 text-sm leading-6 text-white/72">
            The more we know, the better Journee becomes for you.
          </p>
        </div>
      </div>
    </aside>
  );
}

function BottomStrip() {
  const items = [
    { icon: Sparkles, title: "Personalized Recommendations", note: "Get ideas you'll love" },
    { icon: Bell, title: "Smarter Alerts", note: "Only what matters to you" },
    { icon: MapPinned, title: "Better Itineraries", note: "Built around your style" },
  ];

  return (
    <div className="grid gap-4 rounded-lg border border-white/10 bg-[#07131b]/74 px-5 py-5 backdrop-blur-xl md:grid-cols-3 lg:px-10">
      {items.map(({ icon: Icon, title, note }) => (
        <div key={title} className="flex items-center justify-center gap-4 md:justify-start">
          <Icon className="h-7 w-7 shrink-0 text-[#f7ad10]" strokeWidth={1.8} />
          <div>
            <p className="text-sm font-semibold text-white">{title}</p>
            <p className="mt-0.5 text-xs text-white/60">{note}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export function JourneeOnboardingPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#02070b] font-sans text-white">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_18%_8%,rgba(247,173,16,0.14),transparent_28%),radial-gradient(circle_at_76%_10%,rgba(64,135,162,0.15),transparent_30%),linear-gradient(135deg,#02070b_0%,#06111a_48%,#02070b_100%)]" />
      <div className="pointer-events-none fixed inset-0 bg-[linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:72px_72px] opacity-20" />
      <div className="relative">
        <TopNavigation />
        <div className="mx-auto max-w-[1900px] px-4 py-4 sm:px-6 lg:px-8">
          <div className="grid gap-4 lg:grid-cols-[300px_minmax(0,1fr)_320px] xl:grid-cols-[340px_minmax(0,1fr)_380px] 2xl:grid-cols-[350px_minmax(0,1fr)_430px]">
            <div className="hidden lg:block">
              <LeftSidebar />
            </div>
            <MainContent />
            <div>
              <RightSidebar />
            </div>
          </div>
          <div className="mt-4">
            <BottomStrip />
          </div>
        </div>
      </div>
    </main>
  );
}
