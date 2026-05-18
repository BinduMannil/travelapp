import Image from "next/image";
import Link from "next/link";
import {
  AlertCircle,
  BarChart3,
  Bell,
  CalendarDays,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  CircleGauge,
  ClipboardList,
  FileText,
  Globe2,
  Home,
  Lightbulb,
  Megaphone,
  Search,
  Settings,
  ShieldCheck,
  Sparkles,
  UsersRound,
} from "lucide-react";
import { JourneeLogoMark } from "@/components/brand/JourneeLogo";

type AdminItem = {
  label: string;
  helper: string;
  count?: number;
  icon: typeof Home;
  active?: boolean;
};

type Priority = "High" | "Medium" | "Low";

const topNav = [
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
  "Settings",
  "Support",
  "Admin",
];

const adminMenu: AdminItem[] = [
  { label: "Overview", helper: "Dashboard & key metrics", icon: Home, active: true },
  { label: "Content Moderation", helper: "Review & manage content", icon: ShieldCheck },
  { label: "User Suggestions", helper: "Ideas & community voting", count: 128, icon: Megaphone },
  { label: "Destination Review", helper: "Review destination content", count: 34, icon: ClipboardList },
  { label: "Stale Data Review", helper: "Outdated content cleanup", count: 56, icon: CalendarDays },
  { label: "Guide Publishing", helper: "Drafts & publishing controls", count: 12, icon: FileText },
  { label: "Safety / Visa / Weather", helper: "Source & data review", count: 8, icon: ShieldCheck },
  { label: "Reported Issues", helper: "User reported problems", count: 23, icon: AlertCircle },
  { label: "Feature Requests", helper: "Product & feature queue", count: 41, icon: Lightbulb },
  { label: "Users & Roles", helper: "Manage admins & roles", icon: UsersRound },
  { label: "Analytics", helper: "Platform analytics & reports", icon: BarChart3 },
  { label: "Settings", helper: "Admin settings & permissions", icon: Settings },
];

const metrics = [
  { label: "Total Users", value: "1,248,732", change: "12.4%", trend: "up", compare: "vs Apr 29 - May 5", icon: UsersRound },
  { label: "Content Items", value: "24,531", change: "8.7%", trend: "up", compare: "vs Apr 29 - May 5", icon: FileText },
  { label: "Pending Reviews", value: "273", change: "5.1%", trend: "down", compare: "vs Apr 29 - May 5", icon: CircleGauge },
  { label: "Issues Reported", value: "23", change: "14.8%", trend: "down", compare: "vs Apr 29 - May 5", icon: ShieldCheck },
  { label: "Feature Requests", value: "41", change: "16.2%", trend: "up", compare: "vs Apr 29 - May 5", icon: Lightbulb },
];

const chartSeries = [
  { name: "New Submissions", color: "#f0a61f", points: [148, 158, 182, 190, 162, 176, 199, 179, 164, 185, 199, 187, 195] },
  { name: "Approved", color: "#52c86b", points: [90, 98, 116, 138, 106, 126, 132, 140, 110, 138, 138, 119, 124] },
  { name: "Rejected", color: "#ee6656", points: [58, 66, 63, 52, 62, 49, 70, 55, 61, 74, 78, 66, 72] },
  { name: "Updated", color: "#4a8ae8", points: [22, 31, 27, 24, 32, 25, 36, 24, 33, 26, 36, 27, 34] },
];

const chartLabels = ["Apr 29", "Apr 30", "May 1", "May 2", "May 3", "May 4", "May 5", "May 6", "May 7", "May 8", "May 9", "May 10", "May 12"];

const queue = [
  { label: "Destination Reviews", count: 34, priority: "High Priority", icon: Globe2 },
  { label: "Stale Data Items", count: 56, priority: "High Priority", icon: FileText },
  { label: "Guide Drafts", count: 12, priority: "Medium Priority", icon: ClipboardList },
  { label: "Safety / Visa Updates", count: 8, priority: "Medium Priority", icon: ShieldCheck },
  { label: "Reported Issues", count: 23, priority: "High Priority", icon: AlertCircle },
];

const reviewRows = [
  {
    type: "Destination",
    title: "Santorini, Greece",
    detail: "New destination submission",
    submittedBy: "AdventureSeeker",
    submitted: "May 12, 2025",
    status: "Pending Review",
    priority: "High" as Priority,
    action: "Review",
  },
  {
    type: "Guide",
    title: "Tokyo Budget Guide",
    detail: "Guide submission",
    submittedBy: "TravelWithSam",
    submitted: "May 12, 2025",
    status: "Pending Review",
    priority: "Medium" as Priority,
    action: "Review",
  },
  {
    type: "Suggestion",
    title: "Add night markets in Vietnam",
    detail: "Community suggestion",
    submittedBy: "WanderLust89",
    submitted: "May 11, 2025",
    status: "Under Review",
    priority: "Low" as Priority,
    action: "View",
  },
  {
    type: "Issue",
    title: "Broken link in Paris guide",
    detail: "User reported issue",
    submittedBy: "Explorer_101",
    submitted: "May 11, 2025",
    status: "New",
    priority: "High" as Priority,
    action: "Investigate",
  },
  {
    type: "Data Update",
    title: "Thailand visa fee update",
    detail: "Visa information update",
    submittedBy: "Admin System",
    submitted: "May 10, 2025",
    status: "Pending Review",
    priority: "Medium" as Priority,
    action: "Review",
  },
];

const contributors = [
  { name: "Sarah Thompson", contributions: "248 contributions", badge: "Top Contributor", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=160&q=80" },
  { name: "Michael Chen", contributions: "189 contributions", badge: "Top Contributor", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=160&q=80" },
  { name: "Priya Sharma", contributions: "156 contributions", badge: "Rising Star", image: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=160&q=80" },
  { name: "David Lee", contributions: "134 contributions", badge: "Rising Star", image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=160&q=80" },
  { name: "Emma Wilson", contributions: "98 contributions", badge: "Community Star", image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=160&q=80" },
];

const activity = [
  { title: "New destination submitted", detail: "Kyoto, Japan", time: "2 min ago", tone: "green" },
  { title: "Guide published", detail: "Bali Travel Guide", time: "15 min ago", tone: "green" },
  { title: "Safety alert updated", detail: "Paris, France", time: "32 min ago", tone: "gold" },
  { title: "User reported an issue", detail: "Payment not going through", time: "1 hr ago", tone: "red" },
  { title: "Visa information updated", detail: "Japan Tourist Visa", time: "2 hr ago", tone: "green" },
];

const quickActions = [
  { title: "Bulk Approve", detail: "Content Items", icon: CheckCircle2 },
  { title: "Bulk Update", detail: "Data Items", icon: Sparkles },
  { title: "Create Announcement", detail: "For Users", icon: Megaphone },
  { title: "View Audit Logs", detail: "System Activity", icon: FileText },
];

const tabs = ["All", "Destinations", "Guides", "Suggestions", "Issues", "Data Updates"];

function cx(...classes: Array<string | false | undefined>) {
  return classes.filter(Boolean).join(" ");
}

function panelClass(extra = "") {
  return cx(
    "rounded-lg border border-white/10 bg-[#08141a]/82 shadow-[0_18px_55px_rgba(0,0,0,.28)] backdrop-blur-xl",
    extra,
  );
}

function chartPath(points: number[], width: number, height: number) {
  const max = 250;
  const xStep = width / (points.length - 1);
  return points
    .map((point, index) => {
      const x = index * xStep;
      const y = height - (point / max) * height;
      return `${index === 0 ? "M" : "L"} ${x.toFixed(1)} ${y.toFixed(1)}`;
    })
    .join(" ");
}

function areaPath(points: number[], width: number, height: number) {
  return `${chartPath(points, width, height)} L ${width} ${height} L 0 ${height} Z`;
}

function priorityBadge(priority: Priority) {
  if (priority === "High") {
    return "border-red-400/18 bg-red-500/18 text-red-200";
  }
  if (priority === "Medium") {
    return "border-amber-400/20 bg-amber-500/16 text-amber-200";
  }
  return "border-emerald-400/20 bg-emerald-500/16 text-emerald-200";
}

function typeBadge(type: string) {
  const styles: Record<string, string> = {
    Destination: "border-emerald-400/20 bg-emerald-500/16 text-emerald-200",
    Guide: "border-sky-400/20 bg-sky-500/16 text-sky-200",
    Suggestion: "border-violet-400/20 bg-violet-500/16 text-violet-200",
    Issue: "border-red-400/20 bg-red-500/16 text-red-200",
    "Data Update": "border-amber-400/20 bg-amber-500/16 text-amber-200",
  };
  return styles[type] ?? "border-white/15 bg-white/8 text-white/75";
}

function TopNavigation() {
  return (
    <header className="sticky top-0 z-30 border-b border-white/8 bg-[#03090d]/88 backdrop-blur-2xl">
      <div className="flex min-h-[4.75rem] items-center gap-5 px-4 sm:px-6 2xl:px-8">
        <Link href="/" className="flex shrink-0 items-center gap-3 text-white">
          <span className="text-[#f6b800]">
            <JourneeLogoMark className="h-9 w-9" />
          </span>
          <span className="text-2xl font-semibold uppercase text-white">Journee</span>
        </Link>
        <nav className="hidden flex-1 items-center justify-center gap-8 overflow-visible 2xl:flex">
          {topNav.map((item) => (
            <Link
              href={item === "Admin" ? "/admin" : item === "Home" ? "/" : `/${item.toLowerCase()}`}
              key={item}
              className={cx(
                "relative inline-flex min-w-max items-center whitespace-nowrap px-1 py-3 text-[0.86rem] font-semibold text-white/82 transition hover:text-white",
                item === "Admin" && "text-[#f6b800]",
              )}
            >
              {item}
              {item === "Admin" && <span className="absolute bottom-0 left-1/2 h-[2px] w-8 -translate-x-1/2 rounded-full bg-[#f6b800]" />}
            </Link>
          ))}
        </nav>
        <div className="ml-auto flex min-w-0 shrink-0 items-center gap-3">
          <div className="hidden h-11 w-[17.5rem] items-center gap-3 rounded-full border border-white/12 bg-black/24 px-4 text-white/52 shadow-inner shadow-black/30 lg:flex">
            <span className="min-w-0 flex-1 truncate text-[0.76rem]">Search destinations, users, topics...</span>
            <Search className="h-4 w-4 shrink-0" />
          </div>
          <button type="button" aria-label="Notifications" className="relative grid h-10 w-10 place-items-center rounded-full text-white/88">
            <Bell className="h-5 w-5" />
            <span className="absolute right-1 top-1 grid h-4 min-w-4 place-items-center rounded-full bg-[#f6b800] px-1 text-[0.58rem] font-bold text-black">12</span>
          </button>
          <Image
            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=160&q=80"
            alt="Admin user"
            width={44}
            height={44}
            className="h-11 w-11 rounded-full border border-[#f6b800]/28 object-cover"
          />
          <ChevronDown className="hidden h-4 w-4 text-white/65 sm:block" />
        </div>
      </div>
    </header>
  );
}

function LeftSidebar() {
  return (
    <aside className="space-y-4 lg:sticky lg:top-24 lg:self-start">
      <div className={panelClass("p-4 sm:p-5")}>
        <h2 className="mb-4 text-[0.92rem] font-bold uppercase text-[#f6b800]">Admin Control Center</h2>
        <nav className="grid gap-1.5 sm:grid-cols-2 lg:grid-cols-1">
          {adminMenu.map((item) => {
            const Icon = item.icon;
            return (
              <button
                type="button"
                key={item.label}
                className={cx(
                  "flex min-h-[3.45rem] items-center gap-3 rounded-md border px-3 text-left transition",
                  item.active
                    ? "border-[#f6b800]/70 bg-[#f6b800]/38 text-white shadow-[0_0_34px_rgba(246,184,0,.18)]"
                    : "border-transparent text-white/82 hover:border-white/10 hover:bg-white/5",
                )}
              >
                <span className={cx("grid h-8 w-8 shrink-0 place-items-center rounded-md border", item.active ? "border-[#f6b800]/65 text-[#f6b800]" : "border-white/15 text-white/78")}>
                  <Icon className="h-4 w-4" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-[0.86rem] font-semibold">{item.label}</span>
                  <span className="block truncate text-[0.72rem] text-white/62">{item.helper}</span>
                </span>
                {item.count ? (
                  <span className="rounded-md bg-white/10 px-2 py-1 text-[0.72rem] font-bold text-white/85">{item.count}</span>
                ) : null}
              </button>
            );
          })}
        </nav>
      </div>

      <div className={panelClass("p-4")}>
        <div className="flex items-center gap-3">
          <Image
            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=160&q=80"
            alt=""
            width={56}
            height={56}
            className="h-14 w-14 rounded-full border border-white/15 object-cover"
          />
          <div>
            <p className="font-bold text-white">Admin User</p>
            <p className="text-[0.76rem] text-white/63">Super Administrator</p>
          </div>
        </div>
        <button type="button" className="mt-4 flex h-11 w-full items-center justify-center gap-2 rounded-md border border-white/12 bg-white/[0.03] text-[0.82rem] font-semibold text-white/88">
          <ChevronRight className="h-4 w-4" />
          View Profile
        </button>
      </div>

      <div className={panelClass("p-4")}>
        <div className="flex items-center gap-3">
          <span className="h-3 w-3 rounded-full bg-emerald-400 shadow-[0_0_18px_rgba(52,211,153,.7)]" />
          <p className="font-bold text-white">System Status</p>
        </div>
        <div className="mt-4 flex items-start gap-3">
          <span className="mt-1 h-2.5 w-2.5 rounded-full bg-emerald-400" />
          <div>
            <p className="font-semibold text-white">All Systems Operational</p>
            <p className="text-[0.78rem] text-white/62">Uptime: 99.98%</p>
          </div>
        </div>
      </div>
    </aside>
  );
}

function MetricCards() {
  return (
    <section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
      {metrics.map((metric) => {
        const Icon = metric.icon;
        return (
          <article key={metric.label} className={panelClass("min-h-[9.4rem] p-4")}>
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-[0.78rem] font-medium text-white/67">{metric.label}</p>
                <p className="mt-2 text-[1.55rem] font-semibold leading-tight text-white">{metric.value}</p>
              </div>
              <span className="grid h-14 w-14 shrink-0 place-items-center rounded-full border border-white/10 bg-black/16 text-white">
                <Icon className="h-6 w-6" />
              </span>
            </div>
            <p className={cx("mt-3 text-[0.76rem] font-bold", metric.trend === "up" ? "text-emerald-400" : "text-[#f6b800]")}>
              {metric.trend === "up" ? "↑" : "↓"} {metric.change}
            </p>
            <p className="mt-1 text-[0.72rem] text-white/55">{metric.compare}</p>
          </article>
        );
      })}
    </section>
  );
}

function ReviewChart() {
  const width = 760;
  const height = 220;

  return (
    <section className={panelClass("p-4 sm:p-5")}>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-[1rem] font-bold text-[#f6b800]">Content Review Overview</h2>
        <button type="button" className="flex h-10 items-center gap-3 rounded-md border border-white/12 bg-black/20 px-4 text-[0.76rem] font-semibold text-white/82">
          Last 14 Days
          <ChevronDown className="h-4 w-4" />
        </button>
      </div>
      <div className="mt-4 flex flex-wrap items-center justify-center gap-x-7 gap-y-2 text-[0.72rem] text-white/68">
        {chartSeries.map((series) => (
          <span key={series.name} className="inline-flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-sm" style={{ backgroundColor: series.color }} />
            {series.name}
          </span>
        ))}
      </div>
      <div className="mt-4 overflow-hidden">
        <svg viewBox={`0 0 ${width + 68} ${height + 58}`} role="img" aria-label="Content review line chart" className="h-[18rem] w-full">
          {[0, 50, 100, 150, 200, 250].map((value) => {
            const y = height - (value / 250) * height + 10;
            return (
              <g key={value}>
                <line x1="48" x2={width + 48} y1={y} y2={y} stroke="rgba(255,255,255,.08)" />
                <text x="0" y={y + 4} fill="rgba(255,255,255,.55)" fontSize="12">{value}</text>
              </g>
            );
          })}
          {chartSeries.map((series) => (
            <g key={series.name} transform="translate(48 10)">
              <path d={areaPath(series.points, width, height)} fill={series.color} opacity="0.12" />
              <path d={chartPath(series.points, width, height)} fill="none" stroke={series.color} strokeWidth="2.2" strokeLinecap="round" />
            </g>
          ))}
          {chartLabels.map((label, index) => (
            <text key={label} x={48 + (index * width) / (chartLabels.length - 1)} y={height + 42} textAnchor="middle" fill="rgba(255,255,255,.58)" fontSize="12">
              {label}
            </text>
          ))}
        </svg>
      </div>
    </section>
  );
}

function ReviewQueue() {
  return (
    <section className={panelClass("p-4 sm:p-5")}>
      <h2 className="text-[1rem] font-bold text-[#f6b800]">Review Queue</h2>
      <div className="mt-4 divide-y divide-white/8">
        {queue.map((item) => {
          const Icon = item.icon;
          const high = item.priority.startsWith("High");
          return (
            <div key={item.label} className="flex items-center gap-3 py-3 first:pt-0">
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-white/12 bg-white/[0.04] text-white/82">
                <Icon className="h-4 w-4" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-[0.86rem] font-semibold text-white">{item.label}</p>
                <p className={cx("text-[0.74rem] font-semibold", high ? "text-red-300" : "text-[#f6b800]")}>{item.priority}</p>
              </div>
              <p className="text-lg font-semibold text-white">{item.count}</p>
            </div>
          );
        })}
      </div>
      <button type="button" className="mx-auto mt-4 flex items-center gap-2 text-[0.84rem] font-bold text-[#f6b800]">
        View All Queues
        <ChevronRight className="h-4 w-4" />
      </button>
    </section>
  );
}

function ReviewTable() {
  return (
    <section className={panelClass("overflow-hidden")}>
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/8 px-4 py-4 sm:px-5">
        <h2 className="text-[1rem] font-bold text-[#f6b800]">Latest Items Needing Review</h2>
        <div className="flex max-w-full gap-2 overflow-x-auto text-[0.8rem] font-semibold text-white/82">
          {tabs.map((tab) => (
            <button
              type="button"
              key={tab}
              className={cx(
                "shrink-0 border-b-2 px-3 pb-2 pt-1",
                tab === "All" ? "border-[#f6b800] text-[#f6b800]" : "border-transparent hover:text-white",
              )}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[58rem] border-collapse">
          <thead>
            <tr className="text-left text-[0.74rem] font-semibold uppercase text-white/56">
              <th className="px-5 py-4">Type</th>
              <th className="px-5 py-4">Title</th>
              <th className="px-5 py-4">Submitted By</th>
              <th className="px-5 py-4">Submitted</th>
              <th className="px-5 py-4">Status</th>
              <th className="px-5 py-4">Priority</th>
              <th className="px-5 py-4">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/8">
            {reviewRows.map((row) => (
              <tr key={row.title} className="text-[0.82rem] text-white/78">
                <td className="px-5 py-3">
                  <span className={cx("inline-flex rounded-md border px-2.5 py-1 text-[0.72rem] font-bold", typeBadge(row.type))}>{row.type}</span>
                </td>
                <td className="px-5 py-3">
                  <p className="font-semibold text-white">{row.title}</p>
                  <p className="text-[0.72rem] text-white/55">{row.detail}</p>
                </td>
                <td className="px-5 py-3">{row.submittedBy}</td>
                <td className="px-5 py-3">{row.submitted}</td>
                <td className="px-5 py-3">
                  <span className="inline-flex rounded-md border border-[#f6b800]/18 bg-[#f6b800]/14 px-2.5 py-1 text-[0.72rem] font-bold text-[#ffd766]">{row.status}</span>
                </td>
                <td className="px-5 py-3">
                  <span className={cx("inline-flex rounded-md border px-2.5 py-1 text-[0.72rem] font-bold", priorityBadge(row.priority))}>{row.priority}</span>
                </td>
                <td className="px-5 py-3">
                  <button type="button" className="inline-flex min-w-24 items-center justify-center gap-2 rounded-md border border-[#f6b800]/70 px-3 py-2 text-[0.72rem] font-bold text-[#ffd766]">
                    {row.action}
                    <ChevronDown className="h-3.5 w-3.5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function RightSidebar() {
  return (
    <aside className="space-y-4 2xl:sticky 2xl:top-24 2xl:self-start">
      <section className={panelClass("p-4 sm:p-5")}>
        <div className="mb-4 flex items-center justify-between gap-3">
          <h2 className="text-[1rem] font-bold text-[#f6b800]">Top Content Contributors</h2>
          <button type="button" className="text-[0.75rem] font-bold text-[#f6b800]">View All</button>
        </div>
        <div className="divide-y divide-white/8">
          {contributors.map((person) => (
            <div key={person.name} className="flex items-center gap-3 py-3 first:pt-0">
              <Image src={person.image} alt="" width={44} height={44} className="h-11 w-11 rounded-full border border-white/12 object-cover" />
              <div className="min-w-0 flex-1">
                <p className="truncate text-[0.86rem] font-semibold text-white">{person.name}</p>
                <p className="text-[0.72rem] text-white/58">{person.contributions}</p>
              </div>
              <span className={cx("rounded-md px-2 py-1 text-[0.64rem] font-semibold", person.badge === "Top Contributor" ? "bg-emerald-500/16 text-emerald-300" : person.badge === "Rising Star" ? "bg-sky-500/16 text-sky-300" : "bg-violet-500/16 text-violet-300")}>
                {person.badge}
              </span>
            </div>
          ))}
        </div>
      </section>

      <section className={panelClass("p-4 sm:p-5")}>
        <h2 className="mb-4 text-[1rem] font-bold text-[#f6b800]">Recent System Activity</h2>
        <div className="space-y-4">
          {activity.map((item) => (
            <div key={item.title} className="flex gap-3">
              <span className={cx("mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full", item.tone === "green" && "bg-emerald-400", item.tone === "gold" && "bg-[#f6b800]", item.tone === "red" && "bg-red-400")} />
              <div className="min-w-0 flex-1">
                <div className="flex items-start justify-between gap-3">
                  <p className="font-semibold text-white">{item.title}</p>
                  <p className="shrink-0 text-[0.72rem] text-white/55">{item.time}</p>
                </div>
                <p className="text-[0.76rem] text-white/58">{item.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className={panelClass("p-4 sm:p-5")}>
        <h2 className="mb-4 text-[1rem] font-bold text-[#f6b800]">Quick Actions</h2>
        <div className="grid gap-3 sm:grid-cols-2 2xl:grid-cols-2">
          {quickActions.map((action) => {
            const Icon = action.icon;
            return (
              <button key={action.title} type="button" className="flex min-h-[5.4rem] items-center gap-3 rounded-md border border-white/10 bg-white/[0.03] p-3 text-left transition hover:border-[#f6b800]/50 hover:bg-[#f6b800]/8">
                <Icon className="h-7 w-7 shrink-0 text-[#f6b800]" />
                <span>
                  <span className="block text-[0.86rem] font-semibold text-white">{action.title}</span>
                  <span className="text-[0.74rem] text-white/58">{action.detail}</span>
                </span>
              </button>
            );
          })}
        </div>
      </section>
    </aside>
  );
}

export function AdminControlCenter() {
  return (
    <main className="min-h-screen bg-[#02070b] font-sans text-white">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_24%_16%,rgba(246,184,0,.12),transparent_28%),radial-gradient(circle_at_82%_72%,rgba(31,107,148,.18),transparent_34%),linear-gradient(135deg,#02070b_0%,#07141b_54%,#02070b_100%)]" />
      <TopNavigation />
      <div className="relative grid gap-4 px-4 py-5 sm:px-6 lg:grid-cols-[18rem_minmax(0,1fr)] 2xl:grid-cols-[18rem_minmax(0,1fr)_22.5rem] 2xl:px-8">
        <LeftSidebar />
        <div className="min-w-0 space-y-4">
          <div className="flex flex-wrap items-start justify-between gap-4 py-1">
            <div>
              <h1 className="text-[1.7rem] font-bold leading-tight text-white sm:text-[2rem]">Admin Control Center</h1>
              <p className="mt-1 text-[0.9rem] text-white/70">Manage content, review updates and keep Journee trusted and accurate.</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <button type="button" className="flex h-11 items-center gap-3 rounded-md border border-white/12 bg-black/20 px-4 text-[0.8rem] font-semibold text-white/86">
                May 6 - May 12, 2025
                <CalendarDays className="h-4 w-4" />
              </button>
              <button type="button" className="flex h-11 items-center gap-3 rounded-md border border-[#f6b800]/55 bg-[#f6b800]/16 px-5 text-[0.8rem] font-bold text-[#ffd766]">
                Export Report
                <ChevronDown className="h-4 w-4" />
              </button>
            </div>
          </div>
          <MetricCards />
          <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_19rem]">
            <ReviewChart />
            <ReviewQueue />
          </div>
          <ReviewTable />
        </div>
        <RightSidebar />
      </div>
    </main>
  );
}
