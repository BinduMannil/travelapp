/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import {
  Archive,
  Bell,
  Check,
  ChevronDown,
  CircleEllipsis,
  Cloud,
  Download,
  Eye,
  FileCheck2,
  FileText,
  Filter,
  Fingerprint,
  Folder,
  HeartPulse,
  Hotel,
  IdCard,
  LockKeyhole,
  Menu,
  Plane,
  Plus,
  ScanLine,
  Search,
  Share2,
  ShieldAlert,
  ShieldCheck,
  Siren,
  Sparkles,
  UploadCloud,
  WalletCards,
} from "lucide-react";
import { JourneeLogoMark } from "@/components/brand/JourneeLogo";
import { MainNavLink } from "@/components/navigation/MainNavLink";

type VaultCategory = {
  label: string;
  count: number;
  icon: typeof FileText;
  active?: boolean;
};

type VaultFolder = {
  name: string;
  documentCount: number;
  image: string;
};

type DocumentStatus = "Verified" | "Downloaded" | "Confirmed" | "Active" | "Approved";

type TravelDocument = {
  name: string;
  summary: string;
  type: string;
  uploadedAt: string;
  expiration?: string;
  status: DocumentStatus;
  icon: typeof FileText;
  accent: string;
  thumbnail: string;
};

type ExpirationAlert = {
  title: string;
  note: string;
  date: string;
  icon: typeof FileText;
  accent: string;
  progress: string;
  urgent?: boolean;
};

type ReadinessItem = {
  label: string;
  status: string;
};

type ActivityItem = {
  label: string;
  time: string;
  icon: typeof FileText;
  accent: string;
};

const avatar =
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=180&q=80";

const navItems = [
  "Home",
  "Explore",
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

const vaultCategories: VaultCategory[] = [
  { label: "All Documents", count: 32, icon: FileCheck2, active: true },
  { label: "Passports", count: 2, icon: IdCard },
  { label: "Visas", count: 4, icon: ShieldCheck },
  { label: "Flight Tickets", count: 6, icon: Plane },
  { label: "Hotel Bookings", count: 5, icon: Hotel },
  { label: "Insurance", count: 3, icon: ShieldCheck },
  { label: "Receipts", count: 7, icon: WalletCards },
  { label: "Health & Vaccination", count: 3, icon: HeartPulse },
  { label: "Emergency Docs", count: 2, icon: Siren },
  { label: "Archived", count: 4, icon: Archive },
];

const folders: VaultFolder[] = [
  {
    name: "Japan Trip 2025",
    documentCount: 12,
    image:
      "https://images.unsplash.com/photo-1528360983277-13d401cdc186?auto=format&fit=crop&w=760&q=86",
  },
  {
    name: "Europe Summer",
    documentCount: 9,
    image:
      "https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=760&q=86",
  },
  {
    name: "Bali Escape",
    documentCount: 7,
    image:
      "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=760&q=86",
  },
  {
    name: "Business Travel",
    documentCount: 4,
    image:
      "https://images.unsplash.com/photo-1514565131-fce0801e5785?auto=format&fit=crop&w=760&q=86",
  },
];

const documents: TravelDocument[] = [
  {
    name: "U.S. Passport",
    summary: "Valid until Mar 2029",
    type: "Passport",
    uploadedAt: "May 15, 2025 - 11:24 AM",
    expiration: "Mar 14, 2029",
    status: "Verified",
    icon: IdCard,
    accent: "from-violet-500/35 to-fuchsia-500/20 text-violet-200",
    thumbnail:
      "https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?auto=format&fit=crop&w=220&q=82",
  },
  {
    name: "Japan Flight Ticket",
    summary: "JFK -> HND",
    type: "Flight Ticket",
    uploadedAt: "May 15, 2025 - 10:15 AM",
    expiration: "May 20, 2025",
    status: "Downloaded",
    icon: Plane,
    accent: "from-sky-500/35 to-blue-500/20 text-sky-200",
    thumbnail:
      "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=220&q=82",
  },
  {
    name: "Park Hyatt Tokyo Booking",
    summary: "Hotel Reservation",
    type: "Hotel Booking",
    uploadedAt: "May 14, 2025 - 09:40 AM",
    expiration: "May 23, 2025",
    status: "Confirmed",
    icon: Hotel,
    accent: "from-amber-500/35 to-yellow-500/20 text-amber-200",
    thumbnail:
      "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=220&q=82",
  },
  {
    name: "Travel Insurance Policy",
    summary: "AXA Insurance",
    type: "PDF",
    uploadedAt: "May 10, 2025 - 02:30 PM",
    expiration: "Jun 10, 2025",
    status: "Active",
    icon: ShieldCheck,
    accent: "from-cyan-500/35 to-teal-500/20 text-cyan-200",
    thumbnail:
      "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=220&q=82",
  },
  {
    name: "Japan eVisa Approval",
    summary: "Visa Document",
    type: "Visa",
    uploadedAt: "May 8, 2025 - 08:20 AM",
    expiration: "Jun 07, 2025",
    status: "Approved",
    icon: ShieldCheck,
    accent: "from-purple-500/35 to-indigo-500/20 text-purple-200",
    thumbnail:
      "https://images.unsplash.com/photo-1586282391129-76a6df230234?auto=format&fit=crop&w=220&q=82",
  },
];

const expirationAlerts: ExpirationAlert[] = [
  {
    title: "Passport",
    note: "Expires in 11 months",
    date: "Mar 14, 2029",
    icon: IdCard,
    accent: "bg-[#1a315a] text-[#f5bd49]",
    progress: "72%",
  },
  {
    title: "Insurance",
    note: "Ends in 14 days",
    date: "Jun 10, 2025",
    icon: ShieldCheck,
    accent: "bg-cyan-500/18 text-cyan-200",
    progress: "42%",
    urgent: true,
  },
  {
    title: "Japan eVisa",
    note: "Expires in 30 days",
    date: "Jun 07, 2025",
    icon: ShieldCheck,
    accent: "bg-violet-500/24 text-violet-200",
    progress: "58%",
  },
];

const readinessItems: ReadinessItem[] = [
  { label: "Passport", status: "Valid" },
  { label: "Visa", status: "Approved" },
  { label: "Insurance", status: "Active" },
  { label: "Vaccination Records", status: "Uploaded" },
];

const recentActivity: ActivityItem[] = [
  {
    label: "U.S. Passport uploaded",
    time: "May 15, 2025 - 11:24 AM",
    icon: IdCard,
    accent: "bg-[#1a315a] text-[#f5bd49]",
  },
  {
    label: "Japan eVisa approved",
    time: "May 08, 2025 - 08:20 AM",
    icon: ShieldCheck,
    accent: "bg-violet-500/24 text-violet-200",
  },
  {
    label: "Park Hyatt Tokyo booking added",
    time: "May 14, 2025 - 09:40 AM",
    icon: Hotel,
    accent: "bg-amber-500/20 text-amber-200",
  },
  {
    label: "Japan Flight Ticket downloaded",
    time: "May 15, 2025 - 10:15 AM",
    icon: Plane,
    accent: "bg-sky-500/20 text-sky-200",
  },
];

const securityItems = [
  {
    title: "End-to-End Encryption",
    detail: "Your data is always protected",
    icon: LockKeyhole,
  },
  {
    title: "Secure Cloud Backup",
    detail: "Automatic encrypted backups",
    icon: Cloud,
  },
  {
    title: "Biometric Access Supported",
    detail: "Face ID and fingerprint enabled",
    icon: Fingerprint,
  },
  {
    title: "Offline Access Enabled",
    detail: "Access docs anywhere",
    icon: Plane,
  },
];

const quickActions = [
  { label: "Upload Document", icon: UploadCloud, primary: true },
  { label: "Scan Passport", icon: ScanLine },
  { label: "Create Folder", icon: Plus },
];

export function TravelRecordsPage() {
  return (
    <main className="min-h-screen bg-[#020607] font-sans text-white">
      <TopNavigation />
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_14%_4%,rgba(232,176,65,.15),transparent_28%),radial-gradient(circle_at_78%_0%,rgba(42,85,105,.18),transparent_30%),linear-gradient(180deg,#020607_0%,#071112_48%,#020607_100%)]" />
      <div className="pointer-events-none fixed inset-0 bg-[linear-gradient(rgba(255,255,255,.024)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.018)_1px,transparent_1px)] bg-[size:72px_72px] opacity-25" />

      <div className="relative mx-auto grid w-full max-w-[1920px] gap-5 px-4 pb-24 pt-20 sm:px-5 lg:px-6 xl:grid-cols-[280px_minmax(0,1fr)_340px] 2xl:grid-cols-[300px_minmax(0,1fr)_390px]">
        <aside className="hidden xl:block">
          <VaultSidebar />
        </aside>

        <section className="min-w-0 space-y-5">
          <MobileVaultMenu />
          <DocumentsHeader />
          <FolderGrid />
          <DocumentsTable />
          <SecurityStrip />
        </section>

        <aside className="space-y-4 lg:grid lg:grid-cols-2 lg:gap-4 lg:space-y-0 xl:sticky xl:top-24 xl:block xl:self-start xl:space-y-4">
          <ExpirationPanel />
          <ReadinessPanel />
          <ActivityPanel />
          <EmergencyAccessPanel />
        </aside>
      </div>

      <button
        type="button"
        className="fixed bottom-5 right-5 z-40 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#d99a32] to-[#f0bd54] px-5 py-3 text-sm font-bold text-[#130d04] shadow-[0_18px_48px_rgba(217,154,50,.35)] xl:hidden"
      >
        <UploadCloud className="h-4 w-4" />
        Upload
      </button>
    </main>
  );
}

function TopNavigation() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/[0.07] bg-[#010506]/86 backdrop-blur-2xl">
      <div className="mx-auto flex h-16 max-w-[1920px] items-center gap-4 px-4 sm:px-6">
        <Link href="/" className="flex shrink-0 items-center gap-3" aria-label="JOURNEE home">
          <JourneeLogoMark direction="meridian-pin" className="h-9 w-9 text-[#f0b64d]" />
          <span className="text-2xl font-semibold uppercase tracking-[0.12em] text-white">
            JOURNEE
          </span>
        </Link>

        <nav className="hidden flex-1 items-center justify-center gap-1 xl:flex">
          {navItems.map((item) => (
            <MainNavLink
              key={item}
              label={item}
              className="relative px-3 py-5 text-sm font-medium text-white/86 transition hover:text-white 2xl:px-4"
              activeClassName="text-[#f0b64d]"
            />
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-3">
          <button
            type="button"
            aria-label="Notifications"
            className="relative grid h-10 w-10 place-items-center rounded-full text-white/88 transition hover:bg-white/[0.06]"
          >
            <Bell className="h-5 w-5" />
            <span className="absolute right-1.5 top-1.5 grid h-5 min-w-5 place-items-center rounded-full bg-[#f0b64d] px-1 text-[0.72rem] font-bold text-[#160e04]">
              3
            </span>
          </button>
          <img
            src={avatar}
            alt="Profile avatar"
            className="h-10 w-10 rounded-full border border-[#f0b64d]/45 object-cover"
          />
          <ChevronDown className="hidden h-4 w-4 text-white/62 sm:block" />
          <button
            type="button"
            aria-label="Open menu"
            className="grid h-10 w-10 place-items-center rounded-full border border-white/10 text-white/88 xl:hidden"
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </div>
    </header>
  );
}

function Panel({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      className={`rounded-lg border border-white/10 bg-[#081012]/78 shadow-[0_24px_80px_rgba(0,0,0,.36),inset_0_1px_0_rgba(255,255,255,.055)] backdrop-blur-2xl ${className}`}
    >
      {children}
    </section>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-sm font-bold uppercase tracking-[0.08em] text-[#f0bd54]">
      {children}
    </h2>
  );
}

function VaultSidebar() {
  return (
    <div className="sticky top-24 space-y-4">
      <Panel className="p-5">
        <SectionTitle>Documents Vault</SectionTitle>
        <nav className="mt-4 space-y-1.5">
          {vaultCategories.map(({ label, count, icon: Icon, active }) => (
            <button
              type="button"
              key={label}
              className={`flex w-full items-center gap-3 rounded-md px-3 py-3 text-left text-sm transition ${
                active
                  ? "bg-[#d99a32]/16 text-[#ffd27a] shadow-[inset_3px_0_0_#e9aa3d]"
                  : "text-white/88 hover:bg-white/[0.045] hover:text-white"
              }`}
            >
              <Icon className="h-4 w-4 shrink-0" />
              <span className="min-w-0 flex-1 truncate">{label}</span>
              <span
                className={`rounded-md px-2 py-1 text-xs font-bold ${
                  active ? "bg-[#d99a32]/20 text-[#f7c86c]" : "bg-white/[0.07] text-white/72"
                }`}
              >
                {count}
              </span>
            </button>
          ))}
        </nav>

        <div className="my-5 h-px bg-white/10" />
        <SectionTitle>Quick Actions</SectionTitle>
        <div className="mt-4 space-y-3">
          {quickActions.map(({ label, icon: Icon, primary }) => (
            <button
              type="button"
              key={label}
              className={`flex w-full items-center gap-3 rounded-md border px-4 py-3 text-sm font-medium transition ${
                primary
                  ? "border-[#d99a32] bg-[#d99a32]/10 text-[#ffd27a] hover:bg-[#d99a32]/16"
                  : "border-white/12 bg-white/[0.035] text-white/86 hover:border-white/20"
              }`}
            >
              <Icon className="h-4 w-4" />
              {label}
            </button>
          ))}
        </div>
      </Panel>

      <Panel className="p-5">
        <div className="flex items-center gap-4">
          <div className="grid h-14 w-14 place-items-center rounded-full border border-[#f0b64d]/45 text-[#f0b64d] shadow-[0_0_32px_rgba(240,182,77,.16)]">
            <LockKeyhole className="h-7 w-7" />
          </div>
          <div>
            <h2 className="text-base font-semibold text-white">Storage</h2>
            <p className="mt-1 text-sm text-white/74">8.2 GB used of 25 GB</p>
          </div>
        </div>
        <div className="mt-7 h-2 rounded-full bg-white/12">
          <div className="h-full w-[33%] rounded-full bg-gradient-to-r from-[#f0a72d] to-[#f6c764]" />
        </div>
        <div className="mt-7 flex items-center gap-3 text-sm font-medium text-emerald-300">
          <span className="grid h-8 w-8 place-items-center rounded-full bg-emerald-400/18">
            <ShieldCheck className="h-5 w-5" />
          </span>
          Secure cloud storage enabled
        </div>
      </Panel>
    </div>
  );
}

function MobileVaultMenu() {
  return (
    <details className="group xl:hidden">
      <summary className="flex cursor-pointer list-none items-center justify-between rounded-lg border border-white/10 bg-[#081012]/86 px-4 py-3 text-sm font-semibold text-white backdrop-blur-2xl">
        <span className="flex items-center gap-2">
          <LockKeyhole className="h-4 w-4 text-[#f0bd54]" />
          Documents Vault
        </span>
        <ChevronDown className="h-4 w-4 transition group-open:rotate-180" />
      </summary>
      <div className="mt-3">
        <VaultSidebar />
      </div>
    </details>
  );
}

function DocumentsHeader() {
  return (
    <Panel className="p-4 sm:p-5">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.08em] text-[#f0bd54]">
            Documents Vault / Travel Records
          </p>
          <h1 className="mt-2 text-[clamp(1.8rem,3vw,2.45rem)] font-semibold leading-tight text-white">
            Your Travel Documents
          </h1>
          <p className="mt-2 max-w-2xl text-base leading-7 text-white/74">
            Keep all your important travel records organized and accessible.
          </p>
        </div>

        <div className="grid gap-3 sm:grid-cols-[minmax(230px,1fr)_auto_auto] lg:min-w-[560px]">
          <label className="flex h-11 items-center gap-3 rounded-md border border-white/12 bg-black/20 px-3 text-sm text-white/72">
            <Search className="h-4 w-4 text-white/55" />
            <span className="min-w-0 flex-1 truncate">Search documents...</span>
          </label>
          <ControlButton icon={Filter} label="Filter" />
          <ControlButton icon={ChevronDown} label="Sort" />
        </div>
      </div>
    </Panel>
  );
}

function ControlButton({ icon: Icon, label }: { icon: typeof Search; label: string }) {
  return (
    <button
      type="button"
      className="flex h-11 items-center justify-center gap-2 rounded-md border border-white/12 bg-black/20 px-4 text-sm font-medium text-white/84 transition hover:border-[#f0bd54]/45 hover:text-white"
    >
      <Icon className="h-4 w-4 text-[#f0bd54]" />
      {label}
      <ChevronDown className="h-4 w-4 text-white/56" />
    </button>
  );
}

function FolderGrid() {
  return (
    <div className="grid gap-4 md:grid-cols-2 2xl:grid-cols-4">
      {folders.map((folder) => (
        <article
          key={folder.name}
          className="group overflow-hidden rounded-lg border border-white/10 bg-[#081012]/80 shadow-[0_20px_60px_rgba(0,0,0,.28)] backdrop-blur-2xl"
        >
          <div className="relative h-44 overflow-hidden">
            <img
              src={folder.image}
              alt=""
              className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,.05),rgba(3,7,8,.62))]" />
            <button
              type="button"
              aria-label={`More options for ${folder.name}`}
              className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-md bg-black/42 text-white backdrop-blur"
            >
              <CircleEllipsis className="h-5 w-5" />
            </button>
          </div>
          <div className="flex items-start gap-3 p-4">
            <Folder className="mt-0.5 h-5 w-5 shrink-0 fill-[#f0b64d] text-[#f0b64d]" />
            <div className="min-w-0">
              <h3 className="truncate text-base font-semibold text-white">{folder.name}</h3>
              <p className="mt-1 text-sm text-white/66">{folder.documentCount} documents</p>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}

function DocumentsTable() {
  return (
    <Panel className="overflow-hidden">
      <div className="hidden grid-cols-[minmax(210px,1.35fr)_minmax(118px,.75fr)_minmax(128px,.8fr)_minmax(112px,.7fr)_minmax(104px,.62fr)_152px] gap-3 border-b border-white/10 px-5 py-4 text-sm font-medium uppercase tracking-[0.04em] text-white/55 2xl:grid">
        <span>Document Name</span>
        <span>Type</span>
        <span>Uploaded</span>
        <span>Expiration</span>
        <span>Status</span>
        <span className="text-center">Actions</span>
      </div>

      <div className="divide-y divide-white/10">
        {documents.map((document) => (
          <DocumentRow key={document.name} document={document} />
        ))}
      </div>

      <div className="border-t border-white/10 p-4 text-center">
        <button
          type="button"
          className="inline-flex min-h-11 w-full max-w-xs items-center justify-center gap-2 rounded-md border border-white/12 bg-white/[0.025] px-6 text-sm font-medium text-white/86 transition hover:border-[#f0bd54]/45 hover:text-white"
        >
          Load More Documents
          <ChevronDown className="h-4 w-4" />
        </button>
      </div>
    </Panel>
  );
}

function DocumentRow({ document }: { document: TravelDocument }) {
  const Icon = document.icon;

  return (
    <article className="grid gap-4 px-4 py-4 transition hover:bg-white/[0.025] sm:px-5 2xl:grid-cols-[minmax(210px,1.35fr)_minmax(118px,.75fr)_minmax(128px,.8fr)_minmax(112px,.7fr)_minmax(104px,.62fr)_152px] 2xl:items-center 2xl:gap-3">
      <div className="flex min-w-0 items-center gap-4">
        <img
          src={document.thumbnail}
          alt=""
          className="h-16 w-16 shrink-0 rounded-md border border-white/10 object-cover"
        />
        <div className="min-w-0">
          <h3 className="truncate text-base font-semibold text-white">{document.name}</h3>
          <p className="mt-1 text-sm text-white/68">{document.summary}</p>
        </div>
      </div>

      <div className="flex items-center justify-between gap-3 2xl:block">
        <span className="text-sm font-semibold uppercase tracking-[0.04em] text-white/48 2xl:hidden">
          Type
        </span>
        <span className="inline-flex items-center gap-2 rounded-md text-sm text-white/82">
          <span
            className={`grid h-8 w-8 place-items-center rounded-md bg-gradient-to-br ${document.accent}`}
          >
            <Icon className="h-4 w-4" />
          </span>
          {document.type}
        </span>
      </div>

      <MobileMeta label="Uploaded" value={document.uploadedAt} />
      <MobileMeta label="Expiration" value={document.expiration ?? "Not applicable"} />

      <div className="flex items-center justify-between gap-3 2xl:block">
        <span className="text-sm font-semibold uppercase tracking-[0.04em] text-white/48 2xl:hidden">
          Status
        </span>
        <StatusBadge status={document.status} />
      </div>

      <div className="flex items-center gap-2 2xl:justify-center">
        {[
          { label: "View", icon: Eye },
          { label: "Download", icon: Download },
          { label: "Share", icon: Share2 },
          { label: "Archive", icon: Archive },
        ].map(({ label, icon: ActionIcon }) => (
          <button
            type="button"
            key={label}
            aria-label={`${label} ${document.name}`}
            title={label}
            className="grid h-9 w-9 place-items-center rounded-md border border-white/10 bg-white/[0.045] text-white/80 transition hover:border-[#f0bd54]/45 hover:text-[#f0bd54]"
          >
            <ActionIcon className="h-4 w-4" />
          </button>
        ))}
      </div>
    </article>
  );
}

function MobileMeta({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-3 text-sm 2xl:block">
      <span className="font-semibold uppercase tracking-[0.04em] text-white/48 2xl:hidden">
        {label}
      </span>
      <span className="text-right text-white/76 2xl:text-left">{value}</span>
    </div>
  );
}

function StatusBadge({ status }: { status: DocumentStatus }) {
  const secureStates: DocumentStatus[] = ["Verified", "Confirmed", "Active", "Approved"];
  const isSecure = secureStates.includes(status);

  return (
    <span
      className={`inline-flex min-h-8 items-center gap-2 rounded-md border px-3 text-sm font-semibold ${
        isSecure
          ? "border-emerald-400/25 bg-emerald-400/12 text-emerald-300"
          : "border-sky-400/25 bg-sky-400/12 text-sky-300"
      }`}
    >
      {status}
      {isSecure && <Check className="h-3.5 w-3.5" />}
    </span>
  );
}

function SecurityStrip() {
  return (
    <Panel className="border-[#d99a32]/35 bg-[#11100a]/72 p-4">
      <div className="grid gap-4 md:grid-cols-2 2xl:grid-cols-4">
        {securityItems.map(({ title, detail, icon: Icon }) => (
          <div
            key={title}
            className="flex items-center gap-4 border-white/10 md:border-r md:pr-4 last:border-r-0"
          >
            <div className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-[#f0bd54]/45 text-[#f0bd54]">
              <Icon className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-white">{title}</h3>
              <p className="mt-1 text-sm text-white/62">{detail}</p>
            </div>
          </div>
        ))}
      </div>
    </Panel>
  );
}

function ExpirationPanel() {
  return (
    <Panel className="p-5">
      <div className="flex items-center gap-3">
        <ShieldAlert className="h-5 w-5 text-rose-300" />
        <h2 className="text-base font-semibold text-white">Upcoming Expirations</h2>
      </div>

      <div className="mt-5 space-y-3">
        {expirationAlerts.map((alert) => {
          const Icon = alert.icon;

          return (
            <article
              key={alert.title}
              className="rounded-lg border border-[#d99a32]/16 bg-[#120f0a]/54 p-4"
            >
              <div className="flex items-center gap-4">
                <span className={`grid h-11 w-11 place-items-center rounded-md ${alert.accent}`}>
                  <Icon className="h-5 w-5" />
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="truncate text-sm font-semibold text-white">{alert.title}</h3>
                    <span className="shrink-0 text-sm font-semibold text-[#ff7d6d]">
                      {alert.date}
                    </span>
                  </div>
                  <p
                    className={`mt-1 text-sm font-medium ${
                      alert.urgent ? "text-[#ff7d6d]" : "text-[#f0bd54]"
                    }`}
                  >
                    {alert.note}
                  </p>
                  <div className="mt-3 h-1.5 rounded-full bg-white/10">
                    <div
                      className={`h-full rounded-full ${
                        alert.urgent ? "bg-[#ff6f61]" : "bg-[#f0bd54]"
                      }`}
                      style={{ width: alert.progress }}
                    />
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </Panel>
  );
}

function ReadinessPanel() {
  return (
    <Panel className="p-5">
      <div className="flex items-center gap-3">
        <ShieldCheck className="h-5 w-5 text-emerald-300" />
        <h2 className="text-base font-semibold text-white">Travel Readiness</h2>
      </div>

      <div className="mt-4 divide-y divide-white/10">
        {readinessItems.map((item) => (
          <div key={item.label} className="flex items-center gap-3 py-3">
            <span className="grid h-6 w-6 place-items-center rounded-full bg-emerald-400/85 text-[#03140d]">
              <Check className="h-4 w-4" />
            </span>
            <span className="min-w-0 flex-1 text-sm font-medium text-white/88">{item.label}</span>
            <span className="text-sm font-semibold text-emerald-300">{item.status}</span>
          </div>
        ))}
      </div>
    </Panel>
  );
}

function ActivityPanel() {
  return (
    <Panel className="p-5">
      <div className="flex items-center gap-3">
        <Sparkles className="h-5 w-5 text-[#f0bd54]" />
        <h2 className="text-base font-semibold text-white">Recent Activity</h2>
      </div>

      <div className="mt-5 space-y-4">
        {recentActivity.map((activity) => {
          const Icon = activity.icon;

          return (
            <div key={activity.label} className="flex items-start gap-3">
              <span className={`grid h-9 w-9 shrink-0 place-items-center rounded-md ${activity.accent}`}>
                <Icon className="h-4 w-4" />
              </span>
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-white/90">{activity.label}</p>
                <p className="mt-1 text-sm text-white/58">{activity.time}</p>
              </div>
            </div>
          );
        })}
      </div>
    </Panel>
  );
}

function EmergencyAccessPanel() {
  return (
    <Panel className="p-5">
      <h2 className="text-base font-semibold text-[#f0bd54]">Emergency Access</h2>
      <p className="mt-3 text-sm leading-6 text-white/70">
        Store emergency copies for quick access during travel.
      </p>
      <button
        type="button"
        className="mt-5 flex min-h-11 w-full items-center justify-center gap-2 rounded-md border border-[#d99a32] bg-[#d99a32]/10 px-4 text-sm font-semibold text-[#ffd27a] transition hover:bg-[#d99a32]/16"
      >
        <ShieldCheck className="h-4 w-4" />
        Manage Emergency Docs
      </button>
    </Panel>
  );
}
