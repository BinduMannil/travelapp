/* eslint-disable @next/next/no-img-element */
import type { Metadata } from "next";
import Link from "next/link";
import {
  Accessibility,
  Bell,
  CalendarDays,
  Check,
  ChevronDown,
  ChevronRight,
  Clock3,
  Cloud,
  CreditCard,
  Crown,
  Download,
  Gauge,
  Globe2,
  Languages,
  LockKeyhole,
  LogOut,
  MapPin,
  Menu,
  MessageCircleQuestion,
  Palette,
  Plane,
  Search,
  Settings,
  ShieldCheck,
  SlidersHorizontal,
  Thermometer,
  Trash2,
  UserRound,
  WalletCards,
} from "lucide-react";
import { JourneeLogoMark } from "@/components/brand/JourneeLogo";

export const metadata: Metadata = {
  title: "Settings / Preferences",
  description:
    "Manage JOURNEE account preferences, regional settings, travel style, translations, privacy, notifications, accessibility, and billing.",
};

const avatar =
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=160&q=80";

const navItems = [
  "Home",
  "Explore",
  "Map",
  "Trips",
  "Guides",
  "Journal",
  "Profile",
  "Stays",
  "Flights",
  "Visa",
  "Budget",
  "Weather",
  "Currency",
  "Settings",
];

const settingsMenu = [
  { label: "Preferences", note: "Units, currency, language", icon: Settings, active: true },
  { label: "Account", note: "Personal information", icon: UserRound },
  { label: "Travel Preferences", note: "Travel style and interests", icon: Plane },
  { label: "Notifications", note: "Email, push and updates", icon: Bell },
  { label: "Privacy & Security", note: "Data, privacy and security", icon: LockKeyhole },
  { label: "Payment & Billing", note: "Cards, billing and plans", icon: CreditCard },
  { label: "Accessibility", note: "Accessibility and display", icon: Accessibility },
  { label: "Connected Accounts", note: "Social and third-party", icon: Cloud },
  { label: "Data & Storage", note: "Manage your data", icon: Download },
  { label: "Support", note: "Help center and contact", icon: MessageCircleQuestion },
];

const regionalSettings = [
  {
    label: "Language",
    help: "Choose your preferred language.",
    icon: Globe2,
    control: <SelectControl label="Language" value="English" options={["English", "Arabic", "French", "Japanese"]} />,
  },
  {
    label: "Currency",
    help: "Select your preferred currency.",
    icon: WalletCards,
    control: (
      <SelectControl
        label="Currency"
        value="USD - US Dollar"
        options={["USD - US Dollar", "AED - UAE Dirham", "EUR - Euro", "JPY - Japanese Yen"]}
      />
    ),
  },
  {
    label: "Temperature",
    help: "Choose temperature unit.",
    icon: Thermometer,
    control: <SegmentedControl label="Temperature" options={["Celsius", "Fahrenheit"]} active="Celsius" prefix={["°C", "°F"]} />,
  },
  {
    label: "Distance",
    help: "Choose distance unit.",
    icon: Gauge,
    control: <SegmentedControl label="Distance" options={["Kilometers", "Miles"]} active="Kilometers" prefix={["km", "mi"]} />,
  },
  {
    label: "Time Format",
    help: "Choose time display format.",
    icon: Clock3,
    control: <SelectControl label="Time Format" value="24-Hour (14:30)" options={["24-Hour (14:30)", "12-Hour (2:30 PM)"]} />,
  },
  {
    label: "Date Format",
    help: "Choose date display format.",
    icon: CalendarDays,
    control: (
      <SelectControl
        label="Date Format"
        value="DD MMMM YYYY (03 May 2025)"
        options={["DD MMMM YYYY (03 May 2025)", "MMMM DD, YYYY (May 03, 2025)", "YYYY-MM-DD (2025-05-03)"]}
      />
    ),
  },
];

const experienceSettings = [
  {
    label: "Default Home Region",
    help: "Select your default region for recommendations.",
    icon: MapPin,
    control: <SelectControl label="Default Home Region" value="Asia" options={["Asia", "Europe", "Middle East", "North America"]} />,
  },
  {
    label: "Travel Style",
    help: "Your preferred travel style.",
    icon: Plane,
    control: <SegmentedControl label="Travel Style" options={["Budget", "Mid-range", "Luxury", "Custom"]} active="Mid-range" />,
  },
  {
    label: "Interests",
    help: "Types of places and activities you love.",
    icon: Palette,
    control: <GoldButton>Manage Interests</GoldButton>,
  },
  {
    label: "Crowd Preference",
    help: "Choose your preference for crowded places.",
    icon: SlidersHorizontal,
    control: <SegmentedControl label="Crowd Preference" options={["Avoid Crowds", "Balanced", "Don't Mind Crowds"]} active="Balanced" />,
  },
];

const contentSettings = [
  {
    label: "Translation",
    help: "Automatically translate content.",
    icon: Languages,
    control: <ToggleSwitch label="Translation" checked />,
  },
  {
    label: "Content Language",
    help: "Language for guides, tips and articles.",
    icon: Languages,
    control: <SelectControl label="Content Language" value="English" options={["English", "Arabic", "French", "Japanese"]} />,
  },
  {
    label: "Notifications",
    help: "Travel alerts, itinerary reminders and account updates.",
    icon: Bell,
    control: <SegmentedControl label="Notifications" options={["Essential", "Balanced", "All"]} active="Balanced" />,
  },
];

function navHref(item: string) {
  if (item === "Home") return "/";
  if (item === "Explore") return "/discover";
  if (item === "Map") return "/atlas";
  return `/${item.toLowerCase().replaceAll(" ", "-")}`;
}

export default function SettingsPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#020607] text-white">
      <TopNavigation />
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_16%_0%,rgba(218,163,48,.17),transparent_30%),radial-gradient(circle_at_82%_10%,rgba(74,112,125,.16),transparent_34%),linear-gradient(180deg,#020607_0%,#071011_44%,#030708_100%)]" />
      <div className="pointer-events-none fixed inset-0 opacity-[0.18] [background-image:linear-gradient(rgba(255,255,255,.045)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.035)_1px,transparent_1px)] [background-size:72px_72px]" />

      <div className="relative mx-auto grid w-full max-w-[1920px] gap-5 px-4 pb-8 pt-20 sm:px-5 lg:px-6 xl:grid-cols-[300px_minmax(0,1fr)_360px] 2xl:grid-cols-[340px_minmax(720px,1fr)_410px]">
        <aside className="hidden xl:block">
          <LeftSidebar />
        </aside>

        <section className="min-w-0 space-y-4">
          <MobileSettingsMenu />
          <header className="px-1 py-2">
            <h1 className="text-[1.85rem] font-extrabold leading-tight text-white sm:text-[2.15rem]">
              Preferences
            </h1>
            <p className="mt-2 text-[0.95rem] leading-7 text-white/74">
              Manage your travel experience across Journee.
            </p>
          </header>

          <SettingsSection title="Regional Preferences" settings={regionalSettings} />
          <SettingsSection title="Experience Preferences" settings={experienceSettings} />
          <SettingsSection title="Translation & Content" settings={contentSettings} />
        </section>

        <aside className="space-y-4 xl:sticky xl:top-24 xl:self-start">
          <RightSidebar />
        </aside>
      </div>
    </main>
  );
}

function TopNavigation() {
  return (
    <header className="fixed inset-x-0 top-0 z-30 border-b border-white/8 bg-[#020506]/88 backdrop-blur-2xl">
      <div className="mx-auto flex h-16 max-w-[1920px] items-center gap-4 px-4 sm:px-6">
        <Link href="/" className="flex shrink-0 items-center gap-3" aria-label="JOURNEE home">
          <JourneeLogoMark className="h-9 w-9 text-[#e0aa3e]" />
          <span className="text-2xl font-medium uppercase tracking-[0.12em] text-white">
            JOURNEE
          </span>
        </Link>
        <nav className="hidden flex-1 items-center justify-center gap-1 2xl:flex">
          {navItems.map((item) => (
            <Link
              key={item}
              href={navHref(item)}
              className={`relative px-3 py-5 text-sm font-medium transition ${
                item === "Settings" ? "text-[#f3b544]" : "text-white/88 hover:text-white"
              }`}
            >
              {item}
              {item === "Settings" && (
                <span className="absolute bottom-0 left-3 right-3 h-0.5 rounded-full bg-[#f3b544]" />
              )}
            </Link>
          ))}
        </nav>
        <div className="ml-auto hidden min-w-[250px] max-w-[520px] flex-1 items-center rounded-full border border-white/12 bg-white/[0.045] px-4 py-2.5 text-white/70 shadow-[inset_0_1px_0_rgba(255,255,255,.08)] lg:flex">
          <Search className="mr-3 h-4 w-4 shrink-0 text-white/48" />
          <span className="truncate text-sm">Search destinations or anything...</span>
        </div>
        <button className="grid h-10 w-10 shrink-0 place-items-center rounded-full text-white/88" type="button" aria-label="Notifications">
          <Bell className="h-5 w-5" />
        </button>
        <img src={avatar} alt="" className="h-10 w-10 shrink-0 rounded-full border border-[#d8aa4f]/55 object-cover" />
        <button className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-white/10 text-white/86 2xl:hidden" type="button" aria-label="Open menu">
          <Menu className="h-5 w-5" />
        </button>
      </div>
    </header>
  );
}

function Panel({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <section className={`rounded-lg border border-white/12 bg-[#071011]/80 shadow-[0_22px_80px_rgba(0,0,0,.34),inset_0_1px_0_rgba(255,255,255,.06)] backdrop-blur-2xl ${className}`}>
      {children}
    </section>
  );
}

function LeftSidebar() {
  return (
    <div className="sticky top-24 space-y-5">
      <Panel className="p-5">
        <h2 className="mb-5 text-sm font-extrabold uppercase tracking-[0.16em] text-[#f3b544]">
          Settings
        </h2>
        <nav className="space-y-2">
          {settingsMenu.map((item) => {
            const Icon = item.icon;
            return (
              <a
                key={item.label}
                href="#"
                className={`flex min-h-[64px] items-center gap-4 rounded-md px-4 py-3 transition ${
                  item.active
                    ? "border-l-2 border-[#f0aa2c] bg-gradient-to-r from-[#b98125]/55 to-[#d8aa4f]/32 text-white shadow-[inset_0_1px_0_rgba(255,255,255,.08)]"
                    : "text-white/84 hover:bg-white/[0.055] hover:text-white"
                }`}
              >
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-md bg-white/[0.06]">
                  <Icon className="h-5 w-5" />
                </span>
                <span className="min-w-0">
                  <span className="block text-sm font-semibold">{item.label}</span>
                  <span className="mt-0.5 block truncate text-xs text-white/58">{item.note}</span>
                </span>
              </a>
            );
          })}
        </nav>
      </Panel>

      <Panel className="p-6">
        <div className="flex items-center gap-4">
          <Crown className="h-11 w-11 text-[#f3b544]" />
          <div>
            <h3 className="text-sm font-semibold text-white">JOURNEE Premium</h3>
            <p className="mt-1 text-xs leading-5 text-white/62">
              Unlock exclusive travel tools, insights and offers.
            </p>
          </div>
        </div>
        <button type="button" className="mt-5 w-full rounded-md border border-[#d8aa4f]/80 px-4 py-3 text-sm font-semibold text-[#f3b544] transition hover:bg-[#d8aa4f]/12">
          Upgrade Now
        </button>
      </Panel>
    </div>
  );
}

function MobileSettingsMenu() {
  return (
    <Panel className="p-3 xl:hidden">
      <div className="flex gap-2 overflow-x-auto pb-1">
        {settingsMenu.map((item) => (
          <button
            type="button"
            key={item.label}
            className={`shrink-0 rounded-md border px-3 py-2 text-xs font-semibold ${
              item.active
                ? "border-[#d8aa4f] bg-[#d8aa4f]/18 text-[#f3b544]"
                : "border-white/10 bg-white/[0.035] text-white/74"
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>
    </Panel>
  );
}

function SettingsSection({
  title,
  settings,
}: {
  title: string;
  settings: Array<{
    label: string;
    help: string;
    icon: typeof Settings;
    control: React.ReactNode;
  }>;
}) {
  return (
    <Panel className="overflow-hidden">
      <div className="border-b border-white/[0.07] px-5 py-5 sm:px-7">
        <h2 className="text-sm font-extrabold uppercase tracking-[0.16em] text-[#f3b544]">
          {title}
        </h2>
      </div>
      <div className="divide-y divide-white/[0.07]">
        {settings.map((item) => {
          const Icon = item.icon;
          return (
            <div key={item.label} className="grid gap-4 px-5 py-4 sm:px-7 2xl:grid-cols-[minmax(260px,1fr)_minmax(320px,0.72fr)] 2xl:items-center">
              <div className="flex min-w-0 items-center gap-4">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-md bg-white/[0.075] text-white/90">
                  <Icon className="h-5 w-5" />
                </span>
                <div className="min-w-0">
                  <h3 className="text-[0.95rem] font-semibold leading-5 text-white">{item.label}</h3>
                  <p className="mt-0.5 text-sm leading-5 text-white/58">{item.help}</p>
                </div>
              </div>
              <div className="min-w-0 2xl:justify-self-end">{item.control}</div>
            </div>
          );
        })}
      </div>
    </Panel>
  );
}

function SelectControl({ label, value, options }: { label: string; value: string; options: string[] }) {
  return (
    <label className="relative block w-full lg:w-[292px]">
      <span className="sr-only">{label}</span>
      <select
        defaultValue={value}
        aria-label={label}
        className="h-11 w-full appearance-none rounded-md border border-white/12 bg-[#050b0d] px-4 pr-10 text-sm font-medium text-white outline-none transition hover:border-[#d8aa4f]/55 focus:border-[#d8aa4f] focus:ring-2 focus:ring-[#d8aa4f]/30"
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/66" />
    </label>
  );
}

function SegmentedControl({
  label,
  options,
  active,
  prefix,
}: {
  label: string;
  options: string[];
  active: string;
  prefix?: string[];
}) {
  return (
    <div role="radiogroup" aria-label={label} className="grid w-full gap-2 sm:grid-flow-col sm:auto-cols-fr lg:w-[292px]">
      {options.map((option, index) => {
        const selected = option === active;
        return (
          <button
            key={option}
            type="button"
            aria-pressed={selected}
            className={`min-h-11 rounded-md border px-3 text-sm font-semibold transition ${
              selected
                ? "border-[#d8aa4f] bg-[#d8aa4f]/16 text-[#f3b544] shadow-[inset_0_1px_0_rgba(255,255,255,.08)]"
                : "border-white/10 bg-white/[0.035] text-white/78 hover:border-white/20 hover:text-white"
            }`}
          >
            {prefix?.[index] && <span className="mr-1 text-[#f3b544]">{prefix[index]}</span>}
            {option}
          </button>
        );
      })}
    </div>
  );
}

function ToggleSwitch({ label, checked }: { label: string; checked?: boolean }) {
  return (
    <button
      type="button"
      role="switch"
      aria-label={label}
      aria-checked={checked}
      className={`flex h-8 w-14 items-center rounded-full border p-1 transition ${
        checked ? "justify-end border-[#d8aa4f] bg-[#c98921]" : "justify-start border-white/16 bg-white/10"
      }`}
    >
      <span className="h-6 w-6 rounded-full bg-white shadow-[0_4px_12px_rgba(0,0,0,.35)]" />
    </button>
  );
}

function GoldButton({ children }: { children: React.ReactNode }) {
  return (
    <button type="button" className="h-11 w-full rounded-md border border-[#d8aa4f]/85 px-4 text-sm font-semibold text-[#f3b544] transition hover:bg-[#d8aa4f]/12 lg:w-[190px]">
      {children}
    </button>
  );
}

function RightSidebar() {
  return (
    <>
      <Panel className="p-6">
        <h2 className="text-sm font-extrabold uppercase tracking-[0.16em] text-[#f3b544]">
          Account Summary
        </h2>
        <div className="mt-5 flex items-center gap-4">
          <img src={avatar} alt="" className="h-16 w-16 rounded-full border border-[#d8aa4f]/50 object-cover" />
          <div className="min-w-0">
            <h3 className="truncate text-base font-semibold text-white">Sarah Johnson</h3>
            <p className="mt-1 truncate text-sm text-white/64">sarah.johnson@example.com</p>
            <a href="#" className="mt-3 inline-flex text-sm font-semibold text-[#f3b544]">
              View Profile
            </a>
          </div>
        </div>
        <div className="mt-6 space-y-3 border-t border-white/10 pt-4 text-sm">
          <SummaryRow label="Member Since" value="May 12, 2024" />
          <SummaryRow label="Account Type" value="Premium" />
          <div className="flex items-center justify-between gap-4">
            <span className="text-white/62">Account Status</span>
            <span className="inline-flex items-center gap-2 font-semibold text-emerald-400">
              <Check className="h-4 w-4" /> Active
            </span>
          </div>
        </div>
      </Panel>

      <Panel className="p-6">
        <h2 className="text-sm font-extrabold uppercase tracking-[0.16em] text-[#f3b544]">
          Your Subscription
        </h2>
        <div className="mt-5 flex items-center gap-4">
          <Crown className="h-12 w-12 text-[#f3b544]" />
          <div>
            <h3 className="text-base font-semibold text-white">JOURNEE Premium</h3>
            <p className="mt-1 text-sm text-white/64">Renews on May 20, 2025</p>
          </div>
        </div>
        <ul className="mt-5 space-y-3 text-sm text-white/80">
          {["Unlimited trip planning", "Premium travel insights", "Exclusive member perks", "Priority support"].map((item) => (
            <li key={item} className="flex items-center gap-3">
              <Check className="h-4 w-4 text-emerald-400" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
        <GoldButton>Manage Subscription</GoldButton>
      </Panel>

      <Panel className="p-6">
        <h2 className="text-sm font-extrabold uppercase tracking-[0.16em] text-[#f3b544]">
          Privacy & Security
        </h2>
        <div className="mt-5 flex gap-4">
          <ShieldCheck className="h-12 w-12 shrink-0 text-[#f3b544]" />
          <p className="text-sm leading-6 text-white/72">
            Your privacy matters. Manage your data, permissions and security settings.
          </p>
        </div>
        <GoldButton>Manage Now</GoldButton>
      </Panel>

      <Panel className="p-6">
        <h2 className="text-sm font-extrabold uppercase tracking-[0.16em] text-[#f3b544]">
          Quick Actions
        </h2>
        <div className="mt-4 divide-y divide-white/[0.07]">
          <ActionRow icon={Download} label="Download Your Data" />
          <ActionRow icon={Trash2} label="Delete Account" />
          <ActionRow icon={LogOut} label="Sign Out" />
        </div>
      </Panel>
    </>
  );
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <span className="text-white/62">{label}</span>
      <span className="font-semibold text-white">{value}</span>
    </div>
  );
}

function ActionRow({ icon: Icon, label }: { icon: typeof Download; label: string }) {
  return (
    <button type="button" className="flex w-full items-center gap-4 py-4 text-left text-sm text-white/84 transition hover:text-[#f3b544]">
      <Icon className="h-5 w-5 shrink-0" />
      <span className="min-w-0 flex-1">{label}</span>
      <ChevronRight className="h-4 w-4 shrink-0" />
    </button>
  );
}
