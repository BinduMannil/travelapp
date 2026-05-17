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

function normalizeToken(token: string) {
  return token.toLowerCase().replace(/[^a-z0-9+]/g, "");
}

function titleWord(word: string, index: number, total: number, forceTitle = false) {
  const lower = word.toLowerCase();
  const clean = normalizeToken(word);
  const brandName = BRAND_NAMES.get(clean) ?? BRAND_NAMES.get(lower);
  if (brandName) return brandName;
  const acronym = ACRONYMS.get(clean) ?? ACRONYMS.get(lower);
  if (acronym) return acronym;
  if (!forceTitle && index > 0 && index < total - 1 && LOWERCASE_JOINERS.has(lower)) {
    return lower;
  }
  return lower.charAt(0).toUpperCase() + lower.slice(1);
}

function titleDisplayWord(word: string, index: number, total: number) {
  return word
    .split(/([/-])/)
    .map((part, partIndex) => {
      if (part === "/" || part === "-") return part;
      return titleWord(part, index, total, partIndex > 0);
    })
    .join("");
}

export function formatDisplayTitle(label: string): string {
  return label
    .trim()
    .replace(/[_]+/g, " ")
    .replace(/\s+/g, " ")
    .split(" ")
    .filter(Boolean)
    .map((word, index, words) => titleDisplayWord(word, index, words.length))
    .join(" ");
}
