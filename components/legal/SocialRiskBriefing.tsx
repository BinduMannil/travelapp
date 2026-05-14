import { ChevronDown } from "lucide-react";
import {
  LEGAL_SOCIAL_RISK_CATEGORY_LABELS,
  type LegalSocialRisk,
  type LegalSocialRiskCategory,
  type LegalSocialRiskLevel,
} from "@/lib/data/legal-social-risks";
import { formatLongDate } from "@/lib/legal/constants";
import { formatSourceLabel } from "@/lib/copy/formatting";

const CATEGORY_COPY: Record<
  LegalSocialRiskCategory,
  { title: string; short: string }
> = {
  social_media_online_speech: {
    title: "Social media & online speech",
    short: "Posts, reviews, rumours, insults and identifiable people.",
  },
  alcohol_public_behavior: {
    title: "Alcohol & public conduct",
    short: "Where drinking is normal, where it is not, and when behavior becomes the issue.",
  },
  public_conduct: {
    title: "Things that can get you in trouble",
    short: "Arguments, gestures, religious-site mistakes, public disruption and venue rules.",
  },
  lgbtq_relationships: {
    title: "Relationships & identity context",
    short: "Practical awareness for couples, nightlife, hotels and paperwork expectations.",
  },
  drugs_medication_controlled_substances: {
    title: "Medication & restricted items",
    short: "Prescription medicine, CBD/THC, controlled items and airport checks.",
  },
  police_official_interaction: {
    title: "Police & official interaction",
    short: "Documents to carry, calm stops, interpretation and consular support.",
  },
  immigration_entry: {
    title: "Immigration & entry",
    short: "Arrival strictness, proof of funds, onward travel and hotel details.",
  },
  photography_filming: {
    title: "Photography & filming",
    short: "Police, airports, children, accidents, protests, private venues and drones.",
  },
  local_sensitivities: {
    title: "Local sensitivities",
    short: "Disasters, memorials, religion, symbols, protests and crisis posts.",
  },
};

const LEVEL_STYLES: Record<
  LegalSocialRiskLevel,
  { label: string; badge: string; bar: string; text: string }
> = {
  low: {
    label: "Low awareness",
    badge: "border-emerald-200/40 bg-emerald-300/14 text-emerald-100",
    bar: "bg-emerald-300",
    text: "Most travelers have no issue; use normal courtesy and follow signs.",
  },
  moderate: {
    label: "Moderate awareness",
    badge: "border-kintsugi-300/45 bg-kintsugi-300/16 text-kintsugi-300",
    bar: "bg-kintsugi-300",
    text: "Easy to manage when you know the local expectation before you act.",
  },
  high: {
    label: "High awareness",
    badge: "border-amber-300/50 bg-amber-300/18 text-amber-100",
    bar: "bg-amber-300",
    text: "Check official rules before travel and keep documentation ready.",
  },
  critical: {
    label: "Critical awareness",
    badge: "border-rose-300/55 bg-rose-300/18 text-rose-100",
    bar: "bg-rose-300",
    text: "Avoid improvising; verify with official sources before you go.",
  },
};

function getHighestRiskLevel(risks: LegalSocialRisk[]): LegalSocialRiskLevel {
  const order: LegalSocialRiskLevel[] = ["low", "moderate", "high", "critical"];
  return risks.reduce<LegalSocialRiskLevel>(
    (highest, risk) =>
      order.indexOf(risk.risk_level) > order.indexOf(highest)
        ? risk.risk_level
        : highest,
    "low",
  );
}

function reviewedLabel(risks: LegalSocialRisk[]) {
  const dates = risks
    .map((risk) => risk.reviewed_at)
    .filter(Boolean)
    .sort();
  const latest = dates.at(-1);
  return latest ? formatLongDate(latest) : "recently";
}

function featuredCardClass(level: LegalSocialRiskLevel) {
  if (level === "critical" || level === "high") {
    return "sm:col-span-2 lg:col-span-1 lg:row-span-2 lg:min-h-[24rem]";
  }
  return "min-h-[18rem]";
}

function SourceLinks({ risks }: { risks: LegalSocialRisk[] }) {
  const sources = Array.from(
    new Map(risks.map((risk) => [risk.source_url, risk])).values(),
  );

  return (
    <div className="mt-8 border-t border-[#efd9ae]/[0.22] pt-6">
      <p className="luxury-kicker text-[#d8c6a5]">Official sources</p>
      <div className="mt-4 flex flex-wrap gap-3">
        {sources.map((risk) => (
          <a
            key={risk.source_url}
            href={risk.source_url}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-[#efd9ae]/20 bg-[#fff7e7]/[0.07] px-4 py-2 text-sm font-semibold text-[#f0e6d2] transition hover:border-kintsugi-300/70 hover:text-white"
          >
            {formatSourceLabel(risk.source_label)} →
          </a>
        ))}
      </div>
    </div>
  );
}

export function SocialRiskBriefing({
  risks,
  destinationName,
  compact = false,
  focusCategories,
}: {
  risks: LegalSocialRisk[];
  destinationName: string;
  compact?: boolean;
  focusCategories?: LegalSocialRiskCategory[];
}) {
  const visibleRisks = focusCategories?.length
    ? risks.filter((risk) => focusCategories.includes(risk.risk_category))
    : risks;

  if (!visibleRisks.length) return null;

  const highestLevel = getHighestRiskLevel(visibleRisks);
  const highest = LEVEL_STYLES[highestLevel];
  const featured = visibleRisks.slice(0, compact ? 3 : 6);
  const expanded = compact ? visibleRisks.slice(0, 4) : visibleRisks;
  const disclaimer =
    visibleRisks[0]?.legal_disclaimer ??
    "This is practical traveler risk awareness, not legal advice. Laws and enforcement can change; check official sources before travel.";

  return (
    <section className="relative isolate overflow-hidden bg-[#11100d] px-6 py-20 text-[#f6eddb] sm:py-28">
      <div
        className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_18%_8%,rgba(216,173,79,.1),transparent_30%),radial-gradient(circle_at_86%_22%,rgba(90,135,142,.1),transparent_32%),linear-gradient(180deg,rgba(17,16,13,.98),rgba(17,16,13,.94))]"
        aria-hidden
      />
      <div
        className="absolute inset-0 -z-10 opacity-[0.06] [background-image:linear-gradient(rgba(255,255,255,.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.08)_1px,transparent_1px)] [background-size:38px_38px]"
        aria-hidden
      />
      <div
        className="absolute left-1/2 top-28 -z-10 h-[34rem] w-[34rem] -translate-x-1/2 rounded-full bg-kintsugi-300/[0.055] blur-3xl"
        aria-hidden
      />
      <div className="absolute inset-x-0 top-0 -z-10 h-px bg-gradient-to-r from-transparent via-kintsugi-300/35 to-transparent" />

      <div className="mx-auto max-w-7xl">
        <div className="relative overflow-hidden rounded-[2rem] border border-[#efd9ae]/20 bg-[linear-gradient(135deg,rgba(255,247,231,.08),rgba(255,247,231,.035)),rgba(24,20,16,.86)] p-6 shadow-editorial-deep backdrop-blur-xl sm:p-8 lg:p-10">
          <div
            className="absolute inset-y-0 right-0 w-1/2 bg-[radial-gradient(circle_at_58%_38%,rgba(216,173,79,.16),transparent_34%),linear-gradient(90deg,transparent,rgba(255,255,255,.05))]"
            aria-hidden
          />
          <div className="relative grid gap-10 lg:grid-cols-[.78fr_1.22fr] lg:items-end">
          <div>
            <p className="luxury-kicker text-kintsugi-300">
              Street-smart traveler briefing
            </p>
            <h2 className="mt-4 max-w-3xl font-sans text-[clamp(2.45rem,5vw,5.4rem)] font-semibold leading-[0.96] text-[#fff8ea]">
              Know the local line before you cross it.
            </h2>
            <p className="mt-6 max-w-xl text-base leading-8 text-[#f0e6d2]">
              A calm, source-backed briefing for {destinationName}: practical
              conduct, speech, filming, medication and official-interaction
              awareness without the drama of a warning page.
            </p>
          </div>

          <div className="rounded-[1.35rem] border border-[#efd9ae]/20 bg-[#11100d]/72 p-6 shadow-editorial-deep backdrop-blur-xl sm:p-8">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <span
                className={`rounded-full border px-4 py-2 text-sm font-bold ${highest.badge}`}
              >
                {highest.label}
              </span>
              <span className="text-sm text-[#d8c6a5]">
                Reviewed {reviewedLabel(visibleRisks)}
              </span>
            </div>
            <p className="mt-5 text-lg leading-8 text-[#f6eddb]">{highest.text}</p>
            <p className="mt-4 rounded-[1rem] border border-[#efd9ae]/[0.18] bg-[#fff7e7]/[0.07] p-4 text-sm leading-7 text-[#eadcc4]">
              {disclaimer}
            </p>
          </div>
          </div>
        </div>

        <div className="mt-12 grid auto-rows-fr gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((risk) => {
            const category = CATEGORY_COPY[risk.risk_category];
            const level = LEVEL_STYLES[risk.risk_level];

            return (
              <article
                key={risk.risk_category}
                className={`group relative overflow-hidden rounded-[1.35rem] border border-[#efd9ae]/[0.18] bg-[linear-gradient(145deg,rgba(255,247,231,.08),rgba(255,247,231,.035))] p-6 shadow-editorial-deep transition hover:-translate-y-1 hover:border-kintsugi-300/45 hover:bg-[#fff7e7]/[0.075] ${featuredCardClass(risk.risk_level)}`}
              >
                <div
                  className="absolute -right-10 -top-10 h-36 w-36 rounded-full bg-white/[0.035] blur-2xl transition group-hover:bg-kintsugi-300/[0.06]"
                  aria-hidden
                />
                <span
                  className={`absolute inset-x-0 top-0 h-1 ${level.bar}`}
                  aria-hidden
                />
                <div className="relative flex items-start justify-between gap-4">
                  <p className="text-[0.65rem] font-bold uppercase tracking-[0.18em] text-kintsugi-300/86">
                    Traveler briefing
                  </p>
                  <span className={`rounded-full border px-3 py-1 text-xs font-bold ${level.badge}`}>
                    {risk.risk_level}
                  </span>
                </div>
                <h3 className="relative mt-6 font-sans text-[clamp(1.6rem,2.6vw,2.55rem)] font-semibold leading-tight text-[#fff8ea]">
                  {category.title}
                </h3>
                <p className="relative mt-2 text-xs uppercase tracking-[0.12em] text-[#d8c6a5]">
                  {LEGAL_SOCIAL_RISK_CATEGORY_LABELS[risk.risk_category]}
                </p>
                <p className="relative mt-5 text-sm leading-7 text-[#f0e6d2]">
                  {category.short}
                </p>
              </article>
            );
          })}
        </div>

        <div className="mt-12 grid gap-5 lg:grid-cols-2">
          {expanded.map((risk) => {
            const category = CATEGORY_COPY[risk.risk_category];
            const level = LEVEL_STYLES[risk.risk_level];

            return (
              <details
                key={`${risk.risk_category}-details`}
                className="group rounded-[1.2rem] border border-[#efd9ae]/[0.18] bg-[#11100d]/[0.58] p-5 shadow-editorial-deep transition hover:border-[#efd9ae]/[0.32] open:bg-[#fff7e7]/[0.07]"
              >
                <summary className="flex cursor-pointer list-none items-start justify-between gap-5">
                  <span className="flex gap-4">
                    <span className={`mt-2 h-1.5 w-12 shrink-0 rounded-full ${level.bar}`} />
                    <span>
                      <span className="block font-sans text-xl font-semibold leading-tight text-[#fff8ea]">
                        {category.title}
                      </span>
                      <span className="mt-2 block text-sm leading-7 text-[#f0e6d2]">
                        {risk.traveler_summary}
                      </span>
                    </span>
                  </span>
                  <span className="mt-1 flex shrink-0 items-center gap-2">
                    <span className={`hidden rounded-full border px-3 py-1 text-xs font-bold sm:inline-flex ${level.badge}`}>
                      {risk.risk_level}
                    </span>
                    <ChevronDown className="text-[#d8c6a5] transition group-open:rotate-180" size={18} />
                  </span>
                </summary>

                <div className="mt-6 grid gap-5 border-t border-[#efd9ae]/[0.18] pt-5 md:grid-cols-2">
                  <div>
                    <p className="luxury-kicker text-rose-100">What not to do</p>
                    <ul className="mt-3 space-y-2 text-sm leading-7 text-[#f0e6d2]">
                      {risk.what_not_to_do.map((item) => (
                        <li key={item} className="flex gap-2">
                          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-rose-200/70" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="luxury-kicker text-emerald-100">Safer behavior</p>
                    <ul className="mt-3 space-y-2 text-sm leading-7 text-[#f0e6d2]">
                      {risk.practical_safe_behavior.map((item) => (
                        <li key={item} className="flex gap-2">
                          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-200/70" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {risk.examples.length ? (
                  <div className="mt-5 rounded-[1rem] border border-[#efd9ae]/[0.18] bg-[#fff7e7]/[0.06] p-4">
                    <p className="luxury-kicker text-kintsugi-300">Traveler examples</p>
                    <ul className="mt-3 space-y-2 text-sm leading-7 text-[#eadcc4]">
                      {risk.examples.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                ) : null}
              </details>
            );
          })}
        </div>

        <SourceLinks risks={visibleRisks} />
      </div>
    </section>
  );
}
