export type IntelligenceMetric = {
  label: string;
  value: string;
  detail: string;
};

export type IntelligenceSlice = {
  label: string;
  value: number;
};

export type DestinationIntelligence = {
  eyebrow: string;
  title: string;
  lede: string;
  metrics: IntelligenceMetric[];
  nationality: {
    label: string;
    center: string;
    slices: IntelligenceSlice[];
  };
  languages: {
    label: string;
    note: string;
    bars: IntelligenceSlice[];
  };
};

export const CITY_INTELLIGENCE: Record<string, DestinationIntelligence> = {
  tokyo: {
    eyebrow: "City intelligence",
    title: "The numbers keep Tokyo cinematic.",
    lede:
      "Scale, language and residency signals are held as editorial context: useful at a glance, but still wrapped in the mood of the city.",
    metrics: [
      { label: "Metropolis size", value: "2,194 km²", detail: "Dense, layered, and stitched by rail." },
      { label: "Population", value: "14.1M", detail: "Tokyo Metropolis, with a far larger commuter orbit." },
      { label: "Density", value: "6.4k / km²", detail: "Practical pressure: book rooms and dinners early." },
      { label: "Tourism scale", value: "Primary gateway", detail: "Japan's main arrival, dining, shopping and onward rail hub." },
      { label: "Expat presence", value: "593k", detail: "Foreign residents, about 4.3% of Tokyo." },
      { label: "Travel tempo", value: "High precision", detail: "Transit and reservations reward advance planning." },
    ],
    nationality: {
      label: "Foreign resident mix",
      center: "593k",
      slices: [
        { label: "China", value: 39.1 },
        { label: "South Korea", value: 13.6 },
        { label: "Vietnam", value: 7.8 },
        { label: "Nepal", value: 6.2 },
        { label: "Philippines", value: 5.7 },
        { label: "United States", value: 3.3 },
        { label: "India", value: 2.7 },
        { label: "Other", value: 21.6 },
      ],
    },
    languages: {
      label: "Language environment",
      note: "Share/proficiency signals can overlap; this reads as atmosphere, not a census pie.",
      bars: [
        { label: "Japanese", value: 99 },
        { label: "English", value: 8 },
        { label: "Mandarin", value: 0.8 },
        { label: "Vietnamese", value: 0.4 },
        { label: "Korean", value: 0.35 },
        { label: "Tagalog", value: 0.2 },
        { label: "Nepali", value: 0.1 },
      ],
    },
  },
};

export const COUNTRY_INTELLIGENCE: Record<string, DestinationIntelligence> = {
  japan: {
    eyebrow: "Country intelligence",
    title: "National context, kept editorial.",
    lede:
      "Japan's country layer sets the cultural, language and residency baseline that city pages inherit and reinterpret locally.",
    metrics: [
      { label: "Country size", value: "377,975 km²", detail: "An archipelago of 14,000+ islands." },
      { label: "Population", value: "124M", detail: "Large national scale with concentrated urban corridors." },
      { label: "Density", value: "328 / km²", detail: "Mountains compress much of daily life into coastal plains." },
      { label: "Tourism scale", value: "Global draw", detail: "Cuisine, craft, seasons, pop culture and rail journeys." },
      { label: "Foreign residents", value: "3.41M", detail: "About 2.75% of the national population." },
      { label: "Primary language", value: "Japanese", detail: "English support varies sharply by place and context." },
    ],
    nationality: {
      label: "Foreign resident mix",
      center: "3.41M",
      slices: [
        { label: "China", value: 25.3 },
        { label: "Vietnam", value: 17.1 },
        { label: "South Korea", value: 12.2 },
        { label: "Philippines", value: 9.7 },
        { label: "Brazil", value: 6.3 },
        { label: "Nepal", value: 5.2 },
        { label: "Indonesia", value: 4.1 },
        { label: "Other", value: 20.1 },
      ],
    },
    languages: {
      label: "Language distribution",
      note: "Official, community and proficiency signals overlap; use this as traveler-facing context.",
      bars: [
        { label: "Japanese", value: 99 },
        { label: "English", value: 8 },
        { label: "Ryukyuan", value: 1 },
        { label: "Mandarin", value: 0.8 },
        { label: "Vietnamese", value: 0.4 },
        { label: "Korean", value: 0.35 },
        { label: "JSL", value: 0.25 },
      ],
    },
  },
};
