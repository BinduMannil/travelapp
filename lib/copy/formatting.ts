const ACRONYMS = new Map<string, string>([
  ["aed", "AED"],
  ["ai", "AI"],
  ["api", "API"],
  ["atm", "ATM"],
  ["atms", "ATMs"],
  ["cbd", "CBD"],
  ["esim", "eSIM"],
  ["faq", "FAQ"],
  ["hcmc", "HCMC"],
  ["hnd", "HND"],
  ["iata", "IATA"],
  ["ic", "IC"],
  ["jr", "JR"],
  ["lgbtq", "LGBTQ+"],
  ["lgbtq+", "LGBTQ+"],
  ["mofa", "MOFA"],
  ["nrt", "NRT"],
  ["pasmo", "PASMO"],
  ["sim", "SIM"],
  ["sims", "SIMs"],
  ["thc", "THC"],
  ["uk", "UK"],
  ["us", "US"],
  ["usa", "USA"],
  ["wifi", "Wi-Fi"],
  ["wi-fi", "Wi-Fi"],
]);

const BRAND_NAMES = new Map<string, string>([
  ["airbnb", "Airbnb"],
  ["getyourguide", "GetYourGuide"],
  ["journee", "Journee"],
  ["teamlab", "teamLab"],
  ["youtube", "YouTube"],
]);

const LOWERCASE_JOINERS = new Set([
  "a",
  "an",
  "and",
  "as",
  "at",
  "by",
  "for",
  "from",
  "in",
  "of",
  "on",
  "or",
  "the",
  "to",
  "vs",
  "with",
]);

function titleWord(word: string, index: number, total: number, forceTitle = false) {
  const lower = word.toLowerCase();
  const clean = lower.replace(/[^a-z0-9+]/g, "");
  const brandName = BRAND_NAMES.get(clean) ?? BRAND_NAMES.get(lower);
  if (brandName) return brandName;
  const acronym = ACRONYMS.get(clean) ?? ACRONYMS.get(lower);
  if (acronym) return acronym;
  if (!forceTitle && index > 0 && index < total - 1 && LOWERCASE_JOINERS.has(lower)) {
    return lower;
  }
  return lower.charAt(0).toUpperCase() + lower.slice(1);
}

export function formatTitleCase(value: string | number | null | undefined) {
  if (value === null || value === undefined) return "";
  return String(value)
    .trim()
    .replace(/[_-]+/g, " ")
    .replace(/\s+/g, " ")
    .split(" ")
    .map((word, index, words) =>
      word
        .split("/")
        .map((part) => titleWord(part, index, words.length))
        .join("/"),
    )
    .join(" ");
}

export { formatDisplayTitle } from "@/lib/ui/formatDisplayTitle";

export function formatLabel(value: string | number | null | undefined) {
  return formatTitleCase(value);
}

export function formatCategoryName(value: string | number | null | undefined) {
  return formatTitleCase(value);
}

export function formatDestinationType(value: string | number | null | undefined) {
  return formatTitleCase(value);
}

export function formatTag(value: string | number | null | undefined) {
  return formatTitleCase(value);
}

export function formatSentenceCase(value: string | number | null | undefined) {
  if (value === null || value === undefined) return "";
  const text = String(value).trim().replace(/\s+/g, " ");
  if (!text) return "";
  return text.charAt(0).toLocaleUpperCase("en-US") + text.slice(1);
}

export function formatSourceLabel(value: string | number | null | undefined) {
  if (value === null || value === undefined) return "";
  const text = String(value).trim().replace(/\s+/g, " ");
  if (!text) return "";

  const colonIndex = text.indexOf(":");
  if (colonIndex === -1) return text;

  const organization = text.slice(0, colonIndex).trim();
  const description = text.slice(colonIndex + 1).trim();
  if (!description) return organization;

  return `${organization}: ${formatTitleCase(description)}`;
}

export function formatNavigationLabel(value: string | number | null | undefined) {
  return formatTitleCase(value);
}

export function formatEyebrow(value: string | number | null | undefined) {
  return formatTitleCase(value).toLocaleUpperCase("en-US");
}

export function formatMetadata(parts: Array<string | number | null | undefined>) {
  return parts
    .map((part) => formatTitleCase(part))
    .filter(Boolean)
    .join(" · ");
}
