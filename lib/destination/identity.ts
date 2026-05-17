export type DestinationIdentity = {
  slug: string;
  label: string;
  mood: string;
  typographyMood: string;
  texture: string;
  motion: {
    system: "sakura-neon" | "aurora-snow" | "lantern-fog" | "desert-haze" | "jungle-mist";
    intensity: "quiet" | "medium";
  };
  colors: {
    ink: string;
    ground: string;
    panel: string;
    ivory: string;
    accent: string;
    accentSoft: string;
    secondary: string;
    tertiary: string;
  };
  chartPalette: string[];
  accents: {
    glyph: string;
    line: string;
  };
};

const DESTINATION_IDENTITIES: Record<string, DestinationIdentity> = {
  global: {
    slug: "global",
    label: "World atlas / cinematic neutral",
    mood: "Open horizons, layered climates, cities, coastlines and cultural depth.",
    typographyMood:
      "Large editorial statements balanced with quiet utility, built for comparing very different places.",
    texture:
      "linear-gradient(120deg, rgba(255,255,255,.06) 0 1px, transparent 1px 18px), radial-gradient(circle at 14% 10%, rgba(95,150,165,.22), transparent 34%), radial-gradient(circle at 86% 20%, rgba(210,165,82,.18), transparent 32%), radial-gradient(circle at 55% 92%, rgba(118,74,52,.18), transparent 34%)",
    motion: {
      system: "jungle-mist",
      intensity: "quiet",
    },
    colors: {
      ink: "#090b0b",
      ground: "#101313",
      panel: "rgba(9, 12, 12, 0.62)",
      ivory: "#f4efe5",
      accent: "#d1aa63",
      accentSoft: "#ead6a4",
      secondary: "#5f96a5",
      tertiary: "#315b51",
    },
    chartPalette: ["#d1aa63", "#5f96a5", "#315b51", "#f4efe5", "#9b6b4a", "#7c8f7c"],
    accents: {
      glyph: "◌",
      line: "World register",
    },
  },
  islands: {
    slug: "islands",
    label: "Oceanic warmth / tide glow",
    mood: "Warm water, ferry light, reef days and slow coastal mornings.",
    typographyMood:
      "Generous display type with soft spacing and clear practical prompts, like an editorial beach atlas.",
    texture:
      "linear-gradient(120deg, rgba(255,255,255,.07) 0 1px, transparent 1px 20px), radial-gradient(circle at 18% 16%, rgba(87,180,176,.24), transparent 34%), radial-gradient(circle at 84% 22%, rgba(224,156,83,.2), transparent 32%)",
    motion: {
      system: "jungle-mist",
      intensity: "quiet",
    },
    colors: {
      ink: "#061012",
      ground: "#0b2529",
      panel: "rgba(6, 18, 20, 0.64)",
      ivory: "#f5efe4",
      accent: "#dfb66b",
      accentSoft: "#f0d6a0",
      secondary: "#57b4b0",
      tertiary: "#1f706d",
    },
    chartPalette: ["#dfb66b", "#57b4b0", "#1f706d", "#f5efe4", "#c47745", "#84a87e"],
    accents: {
      glyph: "~",
      line: "Tide register",
    },
  },
  cities: {
    slug: "cities",
    label: "Neon glass / transit rhythm",
    mood: "Skyline weather, late trains, food streets and neighborhood energy.",
    typographyMood:
      "Crisp editorial hierarchy with bright accents and tactile controls for fast city comparison.",
    texture:
      "linear-gradient(135deg, rgba(255,255,255,.07) 0 1px, transparent 1px 12px), radial-gradient(circle at 14% 18%, rgba(42,199,201,.18), transparent 34%), radial-gradient(circle at 86% 24%, rgba(229,54,102,.18), transparent 30%)",
    motion: {
      system: "sakura-neon",
      intensity: "quiet",
    },
    colors: {
      ink: "#07080b",
      ground: "#101722",
      panel: "rgba(8, 11, 15, 0.64)",
      ivory: "#f5efe4",
      accent: "#d8ad4f",
      accentSoft: "#f1d99c",
      secondary: "#e53666",
      tertiary: "#2ac7c9",
    },
    chartPalette: ["#d8ad4f", "#e53666", "#2ac7c9", "#f5efe4", "#5f96a5", "#7a5068"],
    accents: {
      glyph: "◇",
      line: "City signal",
    },
  },
  deserts: {
    slug: "deserts",
    label: "Dune amber / dusk heat",
    mood: "Courtyard shade, long road light, dune edges and evening rituals.",
    typographyMood:
      "Warm Montserrat weight, restrained captions and practical timing notes with strong contrast.",
    texture:
      "linear-gradient(135deg, rgba(255,236,198,.08) 0 1px, transparent 1px 14px), radial-gradient(circle at 20% 18%, rgba(198,117,50,.24), transparent 34%), radial-gradient(circle at 78% 10%, rgba(212,167,91,.18), transparent 28%)",
    motion: {
      system: "desert-haze",
      intensity: "quiet",
    },
    colors: {
      ink: "#120906",
      ground: "#21120c",
      panel: "rgba(30, 16, 10, 0.64)",
      ivory: "#f8ead4",
      accent: "#d4a75b",
      accentSoft: "#efd39d",
      secondary: "#c67532",
      tertiary: "#74411e",
    },
    chartPalette: ["#d4a75b", "#c67532", "#74411e", "#f8ead4", "#8e382b", "#d9a06e"],
    accents: {
      glyph: "△",
      line: "Dusk register",
    },
  },
  forests: {
    slug: "forests",
    label: "Canopy green / rain mist",
    mood: "Lodge mornings, wet trails, green corridors and quiet rain strategy.",
    typographyMood:
      "Deep calm display type with clear spacing and gentle but readable information layers.",
    texture:
      "linear-gradient(120deg, rgba(255,255,255,.06) 0 1px, transparent 1px 18px), radial-gradient(circle at 20% 12%, rgba(105,130,76,.2), transparent 34%), radial-gradient(circle at 82% 22%, rgba(49,91,81,.22), transparent 32%)",
    motion: {
      system: "jungle-mist",
      intensity: "quiet",
    },
    colors: {
      ink: "#050c09",
      ground: "#102016",
      panel: "rgba(8, 18, 12, 0.64)",
      ivory: "#f4efe5",
      accent: "#d1aa63",
      accentSoft: "#ead6a4",
      secondary: "#69824c",
      tertiary: "#315b51",
    },
    chartPalette: ["#d1aa63", "#69824c", "#315b51", "#f4efe5", "#7c8f7c", "#5f96a5"],
    accents: {
      glyph: "◜",
      line: "Canopy register",
    },
  },
  villages: {
    slug: "villages",
    label: "Local craft / warm lamps",
    mood: "Market mornings, handmade texture, family stays and slower local rhythms.",
    typographyMood:
      "Warm editorial pacing with calm labels, avoiding rustic novelty while keeping human texture.",
    texture:
      "linear-gradient(135deg, rgba(255,236,198,.08) 0 1px, transparent 1px 15px), radial-gradient(circle at 18% 18%, rgba(196,136,66,.22), transparent 34%), radial-gradient(circle at 82% 18%, rgba(95,91,55,.18), transparent 30%)",
    motion: {
      system: "lantern-fog",
      intensity: "quiet",
    },
    colors: {
      ink: "#0f0a06",
      ground: "#20160e",
      panel: "rgba(28, 19, 12, 0.64)",
      ivory: "#f7ead7",
      accent: "#c89b4e",
      accentSoft: "#efd39d",
      secondary: "#9b6b4a",
      tertiary: "#5f5b37",
    },
    chartPalette: ["#c89b4e", "#9b6b4a", "#5f5b37", "#f7ead7", "#315b51", "#d9a06e"],
    accents: {
      glyph: "□",
      line: "Village register",
    },
  },
  mountains: {
    slug: "mountains",
    label: "Alpine air / glacier light",
    mood: "Rail passes, high valleys, snow windows and shoulder-season clarity.",
    typographyMood:
      "Open spacing and crisp editorial type with enough restraint for practical terrain details.",
    texture:
      "linear-gradient(135deg, rgba(255,255,255,.08) 0 1px, transparent 1px 16px), radial-gradient(circle at 15% 10%, rgba(145,202,215,.2), transparent 30%), radial-gradient(circle at 84% 28%, rgba(216,196,140,.14), transparent 30%)",
    motion: {
      system: "aurora-snow",
      intensity: "quiet",
    },
    colors: {
      ink: "#071113",
      ground: "#0d1b1d",
      panel: "rgba(9, 24, 27, 0.6)",
      ivory: "#eff7f4",
      accent: "#9ad3df",
      accentSoft: "#c9e8ed",
      secondary: "#1f5b50",
      tertiary: "#d8c48c",
    },
    chartPalette: ["#9ad3df", "#1f5b50", "#eff7f4", "#d8c48c", "#547784", "#b9d3c8"],
    accents: {
      glyph: "△",
      line: "Alpine register",
    },
  },
  tokyo: {
    slug: "tokyo",
    label: "Lacquer noir / neon ivory",
    mood: "Ceremonial calm, electric afterglow, precise urban rhythm.",
    typographyMood:
      "Compact editorial display type, generous vertical pause, and small-letter spacing inspired by Japanese print rhythm.",
    texture:
      "linear-gradient(135deg, rgba(255,255,255,.07) 0 1px, transparent 1px 12px), radial-gradient(circle at 18% 12%, rgba(230,185,85,.18), transparent 34%), radial-gradient(circle at 88% 22%, rgba(236,47,98,.16), transparent 30%)",
    motion: {
      system: "sakura-neon",
      intensity: "quiet",
    },
    colors: {
      ink: "#090807",
      ground: "#11100e",
      panel: "rgba(7, 7, 8, 0.58)",
      ivory: "#f5efe4",
      accent: "#d8ad4f",
      accentSoft: "#f1d99c",
      secondary: "#e53666",
      tertiary: "#2ac7c9",
    },
    chartPalette: ["#d8ad4f", "#e53666", "#2ac7c9", "#f5efe4", "#8d1c30", "#62707a"],
    accents: {
      glyph: "東",
      line: "Tokyo signal",
    },
  },
  japan: {
    slug: "japan",
    label: "Sumi ink / washi / kintsugi",
    mood: "Restraint, seasonality, craft, quiet ritual.",
    typographyMood:
      "Elegant Montserrat scale, narrow uppercase captions, and measured spacing that keeps the page calm.",
    texture:
      "linear-gradient(90deg, rgba(255,255,255,.06) 0 1px, transparent 1px 18px), radial-gradient(circle at 20% 0%, rgba(214,50,73,.16), transparent 32%), radial-gradient(circle at 80% 20%, rgba(216,173,79,.18), transparent 34%)",
    motion: {
      system: "sakura-neon",
      intensity: "quiet",
    },
    colors: {
      ink: "#0d0b0a",
      ground: "#151210",
      panel: "rgba(12, 10, 9, 0.62)",
      ivory: "#f6efe3",
      accent: "#d3a144",
      accentSoft: "#ead097",
      secondary: "#b6243a",
      tertiary: "#315f72",
    },
    chartPalette: ["#d3a144", "#b6243a", "#315f72", "#f6efe3", "#8b6d45", "#5f6c55"],
    accents: {
      glyph: "日",
      line: "Country cadence",
    },
  },
  norway: {
    slug: "norway",
    label: "Glacier / pine / northern air",
    mood: "Wide horizons, mineral light, quiet precision.",
    typographyMood: "Open spacing, crisp titles, and cool understated captions.",
    texture:
      "linear-gradient(135deg, rgba(255,255,255,.08) 0 1px, transparent 1px 16px), radial-gradient(circle at 15% 10%, rgba(145,202,215,.2), transparent 30%)",
    motion: {
      system: "aurora-snow",
      intensity: "quiet",
    },
    colors: {
      ink: "#071113",
      ground: "#0d1b1d",
      panel: "rgba(9, 24, 27, 0.6)",
      ivory: "#eff7f4",
      accent: "#9ad3df",
      accentSoft: "#c9e8ed",
      secondary: "#1f5b50",
      tertiary: "#d8c48c",
    },
    chartPalette: ["#9ad3df", "#1f5b50", "#eff7f4", "#d8c48c", "#547784", "#b9d3c8"],
    accents: {
      glyph: "N",
      line: "Northern register",
    },
  },
  marrakech: {
    slug: "marrakech",
    label: "Terracotta / brass / dusk rose",
    mood: "Warm stone, brass detail, courtyards, shade and spice.",
    typographyMood: "Serif warmth with script-like pacing, kept readable and refined.",
    texture:
      "linear-gradient(135deg, rgba(255,236,198,.08) 0 1px, transparent 1px 13px), radial-gradient(circle at 20% 20%, rgba(196,93,53,.24), transparent 34%)",
    motion: {
      system: "desert-haze",
      intensity: "quiet",
    },
    colors: {
      ink: "#170d09",
      ground: "#24130d",
      panel: "rgba(36, 19, 13, 0.62)",
      ivory: "#f7ead7",
      accent: "#c89b4e",
      accentSoft: "#efd39d",
      secondary: "#b65a36",
      tertiary: "#315b51",
    },
    chartPalette: ["#c89b4e", "#b65a36", "#315b51", "#f7ead7", "#8e382b", "#d9a06e"],
    accents: {
      glyph: "م",
      line: "Medina glow",
    },
  },
};

export function getDestinationIdentity(slug: string, fallback = "japan") {
  return DESTINATION_IDENTITIES[slug] ?? DESTINATION_IDENTITIES[fallback];
}
