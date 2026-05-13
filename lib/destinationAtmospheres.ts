export type DestinationType = "country" | "city";

export type DestinationMotionType =
  | "city-glow"
  | "falling-petals"
  | "lantern-flicker"
  | "mist"
  | "coastal-shimmer"
  | "alpine-drift"
  | "desert-haze"
  | "palm-shadow"
  | "streetlight-shimmer";

export type DestinationMotionIntensity = "quiet" | "soft" | "medium";

export type DestinationAtmosphereTheme = {
  slug: string;
  name: string;
  primaryAccent: string;
  secondaryAccent: string;
  ambientGlow: string;
  overlayTint: string;
  imageGradient: string;
  cardBorderTint: string;
  motionType: DestinationMotionType;
  motionIntensity: DestinationMotionIntensity;
  texturePattern: string;
  heroMood: string;
};

const defaultTheme: DestinationAtmosphereTheme = {
  slug: "global",
  name: "JOURNEE",
  primaryAccent: "#d8aa4f",
  secondaryAccent: "#6c8f8a",
  ambientGlow: "rgba(216, 170, 79, 0.16)",
  overlayTint: "rgba(2, 10, 11, 0.72)",
  imageGradient:
    "linear-gradient(90deg, rgba(1,8,9,.94), rgba(1,8,9,.62) 44%, rgba(1,8,9,.24)), linear-gradient(0deg, #020a0b, rgba(2,10,11,.5) 26%, transparent 70%)",
  cardBorderTint: "rgba(216, 170, 79, 0.32)",
  motionType: "streetlight-shimmer",
  motionIntensity: "quiet",
  texturePattern:
    "linear-gradient(90deg, rgba(255,255,255,.05) 1px, transparent 1px), linear-gradient(0deg, rgba(255,255,255,.035) 1px, transparent 1px)",
  heroMood: "Cinematic night air",
};

export const destinationAtmospheres: Record<string, DestinationAtmosphereTheme> = {
  vietnam: {
    slug: "vietnam",
    name: "Vietnam",
    primaryAccent: "#f2a83b",
    secondaryAccent: "#2f7d5b",
    ambientGlow: "rgba(242, 168, 59, 0.2)",
    overlayTint: "rgba(7, 34, 26, 0.72)",
    imageGradient:
      "linear-gradient(90deg, rgba(5,16,13,.97), rgba(16,78,58,.68) 46%, rgba(0,0,0,.28)), linear-gradient(0deg, #07120f, rgba(7,18,15,.52) 28%, transparent 70%)",
    cardBorderTint: "rgba(242, 168, 59, 0.34)",
    motionType: "lantern-flicker",
    motionIntensity: "soft",
    texturePattern:
      "radial-gradient(circle at 18% 24%, rgba(242,168,59,.12), transparent 24%), linear-gradient(90deg, rgba(255,255,255,.045) 1px, transparent 1px)",
    heroMood: "Lantern amber, river mist, and warm streetlight movement.",
  },
  japan: {
    slug: "japan",
    name: "Japan",
    primaryAccent: "#f3a6bb",
    secondaryAccent: "#b63b3b",
    ambientGlow: "rgba(243, 166, 187, 0.18)",
    overlayTint: "rgba(12, 10, 10, 0.76)",
    imageGradient:
      "linear-gradient(90deg, rgba(6,7,8,.96), rgba(44,18,22,.62) 45%, rgba(4,5,6,.22)), linear-gradient(0deg, #050807, rgba(5,8,7,.48) 30%, transparent 72%)",
    cardBorderTint: "rgba(243, 166, 187, 0.32)",
    motionType: "falling-petals",
    motionIntensity: "quiet",
    texturePattern:
      "linear-gradient(90deg, rgba(255,255,255,.06) 1px, transparent 1px), radial-gradient(circle at 75% 18%, rgba(182,59,59,.12), transparent 26%)",
    heroMood: "Ink black, temple red, paper softness, and falling petals.",
  },
  italy: {
    slug: "italy",
    name: "Italy",
    primaryAccent: "#c97846",
    secondaryAccent: "#7c8b4f",
    ambientGlow: "rgba(201, 120, 70, 0.2)",
    overlayTint: "rgba(28, 17, 11, 0.7)",
    imageGradient:
      "linear-gradient(90deg, rgba(22,13,9,.96), rgba(91,58,36,.62) 48%, rgba(34,22,14,.22)), linear-gradient(0deg, #120d0b, rgba(38,24,16,.5) 30%, transparent 72%)",
    cardBorderTint: "rgba(218, 166, 99, 0.34)",
    motionType: "streetlight-shimmer",
    motionIntensity: "quiet",
    texturePattern:
      "radial-gradient(circle at 20% 18%, rgba(255,214,146,.12), transparent 24%), linear-gradient(135deg, rgba(255,255,255,.04) 1px, transparent 1px)",
    heroMood: "Terracotta, olive shade, marble cream, and soft window light.",
  },
  france: {
    slug: "france",
    name: "France",
    primaryAccent: "#d9b765",
    secondaryAccent: "#6d7f96",
    ambientGlow: "rgba(217, 183, 101, 0.18)",
    overlayTint: "rgba(12, 17, 25, 0.72)",
    imageGradient:
      "linear-gradient(90deg, rgba(8,11,17,.96), rgba(38,48,64,.66) 45%, rgba(9,12,18,.24)), linear-gradient(0deg, #070b12, rgba(7,11,18,.5) 30%, transparent 72%)",
    cardBorderTint: "rgba(217, 183, 101, 0.34)",
    motionType: "streetlight-shimmer",
    motionIntensity: "quiet",
    texturePattern:
      "linear-gradient(90deg, rgba(255,255,255,.045) 1px, transparent 1px), radial-gradient(circle at 70% 20%, rgba(217,183,101,.1), transparent 28%)",
    heroMood: "Champagne gold, stone grey, evening blue, and cafe amber.",
  },
  switzerland: {
    slug: "switzerland",
    name: "Switzerland",
    primaryAccent: "#9bd8f4",
    secondaryAccent: "#4f8a68",
    ambientGlow: "rgba(155, 216, 244, 0.2)",
    overlayTint: "rgba(7, 18, 25, 0.7)",
    imageGradient:
      "linear-gradient(90deg, rgba(3,11,17,.96), rgba(15,45,56,.62) 46%, rgba(5,12,16,.2)), linear-gradient(0deg, #041017, rgba(4,16,23,.46) 30%, transparent 72%)",
    cardBorderTint: "rgba(155, 216, 244, 0.36)",
    motionType: "alpine-drift",
    motionIntensity: "quiet",
    texturePattern:
      "linear-gradient(120deg, rgba(255,255,255,.06) 1px, transparent 1px), radial-gradient(circle at 78% 18%, rgba(255,255,255,.12), transparent 25%)",
    heroMood: "Alpine blue, snow white, pine green, and drifting glacier air.",
  },
  morocco: {
    slug: "morocco",
    name: "Morocco",
    primaryAccent: "#e0a13f",
    secondaryAccent: "#344c88",
    ambientGlow: "rgba(224, 161, 63, 0.22)",
    overlayTint: "rgba(35, 17, 10, 0.72)",
    imageGradient:
      "linear-gradient(90deg, rgba(24,10,7,.97), rgba(104,55,26,.64) 46%, rgba(20,11,14,.25)), linear-gradient(0deg, #130907, rgba(46,21,12,.48) 30%, transparent 72%)",
    cardBorderTint: "rgba(224, 161, 63, 0.38)",
    motionType: "desert-haze",
    motionIntensity: "soft",
    texturePattern:
      "radial-gradient(circle at 20% 18%, rgba(224,161,63,.12), transparent 26%), linear-gradient(135deg, rgba(255,255,255,.045) 1px, transparent 1px)",
    heroMood: "Desert clay, saffron gold, indigo shadow, and lantern haze.",
  },
  indonesia: {
    slug: "indonesia",
    name: "Indonesia",
    primaryAccent: "#2dd49c",
    secondaryAccent: "#35c7c9",
    ambientGlow: "rgba(45, 212, 156, 0.18)",
    overlayTint: "rgba(4, 28, 22, 0.7)",
    imageGradient:
      "linear-gradient(90deg, rgba(3,17,14,.97), rgba(12,80,59,.62) 46%, rgba(0,28,30,.24)), linear-gradient(0deg, #04100d, rgba(4,24,20,.48) 30%, transparent 72%)",
    cardBorderTint: "rgba(45, 212, 156, 0.34)",
    motionType: "palm-shadow",
    motionIntensity: "soft",
    texturePattern:
      "radial-gradient(circle at 72% 20%, rgba(53,199,201,.12), transparent 28%), linear-gradient(90deg, rgba(255,255,255,.04) 1px, transparent 1px)",
    heroMood: "Volcanic black, tropical green, ocean turquoise, and palm shade.",
  },
};

const cityAtmosphereOverrides: Record<string, Partial<DestinationAtmosphereTheme> & { parent: string }> = {
  "ho-chi-minh-city": {
    parent: "vietnam",
    motionType: "city-glow",
    heroMood: "Scooter light trails, coffee heat, and late Saigon glow.",
  },
  hanoi: {
    parent: "vietnam",
    motionType: "mist",
    heroMood: "Old Quarter mist, lake air, and rain-softened streetlight.",
  },
  "da-nang": {
    parent: "vietnam",
    motionType: "coastal-shimmer",
    heroMood: "Beach morning haze, bridges, and soft coastal reflections.",
  },
  "hoi-an": {
    parent: "vietnam",
    motionType: "lantern-flicker",
    heroMood: "Lantern streets, river reflections, and warm evening air.",
  },
  kyoto: {
    parent: "japan",
    motionType: "falling-petals",
    heroMood: "Temple red, garden quiet, and petal-light movement.",
  },
  tokyo: {
    parent: "japan",
    motionType: "city-glow",
    heroMood: "Neon reflection, station rhythm, and quiet precision.",
  },
  paris: {
    parent: "france",
    motionType: "streetlight-shimmer",
    heroMood: "Cafe amber, stone facades, and evening-blue streetlight.",
  },
  milan: {
    parent: "italy",
    motionType: "streetlight-shimmer",
    heroMood: "Fast tailoring, marble light, and rain-polished streets.",
  },
  marrakech: {
    parent: "morocco",
    motionType: "lantern-flicker",
    heroMood: "Medina shadow, saffron light, and rooftop dusk.",
  },
  bali: {
    parent: "indonesia",
    motionType: "palm-shadow",
    heroMood: "Palm shade, volcanic black, rice-field green, and ocean air.",
  },
};

function normalizeSlug(slug?: string | null) {
  return slug?.trim().toLowerCase() || "";
}

export function getDestinationAtmosphere({
  destinationSlug,
  destinationType,
  countrySlug,
}: {
  destinationSlug?: string | null;
  destinationType?: DestinationType;
  countrySlug?: string | null;
}): DestinationAtmosphereTheme {
  const slug = normalizeSlug(destinationSlug);
  const country = normalizeSlug(countrySlug);

  if (destinationType === "city" && cityAtmosphereOverrides[slug]) {
    const override = cityAtmosphereOverrides[slug];
    const parent = destinationAtmospheres[override.parent] ?? defaultTheme;
    return { ...parent, ...override, slug, name: slug };
  }

  if (destinationAtmospheres[slug]) return destinationAtmospheres[slug];
  if (country && destinationAtmospheres[country]) return destinationAtmospheres[country];

  return defaultTheme;
}
