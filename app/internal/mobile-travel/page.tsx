import type { Metadata } from "next";
import { MobileTravelMode } from "@/components/internal/MobileTravelMode";
import {
  VIETNAM_CITIES,
  VIETNAM_LOCAL_APPS,
  VIETNAM_PHRASES,
  VIETNAM_PRICE_BENCHMARKS,
} from "@/lib/vietnam/frontend";
import culturalIntelligenceJson from "@/db/seed/vietnam/cultural_intelligence.json";

export const metadata: Metadata = {
  title: "Internal Mobile Travel Mode",
  robots: {
    index: false,
    follow: false,
  },
};

type CulturalRisk = {
  note_key?: string;
  title?: string;
  traveler_summary?: string;
  practical_guidance?: string[];
  practical_safe_behavior?: string[];
  severity?: string;
  risk_level?: string;
};

export default function InternalMobileTravelPage() {
  const culturalRisks =
    "sensitivity_notes" in culturalIntelligenceJson
      ? (culturalIntelligenceJson.sensitivity_notes as CulturalRisk[]).map(
          (risk) => ({
            ...risk,
            practical_guidance:
              risk.practical_guidance ?? risk.practical_safe_behavior,
          }),
        )
      : [];

  return (
    <MobileTravelMode
      cities={VIETNAM_CITIES}
      localApps={VIETNAM_LOCAL_APPS}
      phrases={VIETNAM_PHRASES}
      priceBenchmarks={VIETNAM_PRICE_BENCHMARKS}
      riskNotes={culturalRisks}
    />
  );
}
