const ACRONYMS = new Map<string, string>([
  ["aed", "AED"],
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
  ["wifi", "Wi-Fi"],
  ["wi-fi", "Wi-Fi"],
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

function titleWord(word: string, index: number, total: number) {
  const lower = word.toLowerCase();
  const clean = lower.replace(/[^a-z0-9+]/g, "");
  const acronym = ACRONYMS.get(clean) ?? ACRONYMS.get(lower);
  if (acronym) return acronym;
  if (index > 0 && index < total - 1 && LOWERCASE_JOINERS.has(lower)) {
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
