import type { Metadata } from "next";
import { CultureEnginePage } from "@/components/culture/CultureEnginePage";

export const metadata: Metadata = {
  title: "Culture Engine",
  description:
    "JOURNEE's cinematic cultural intelligence engine for customs, rituals, phrases, social norms, and destination compatibility.",
};

export default function CulturePage() {
  return <CultureEnginePage />;
}
