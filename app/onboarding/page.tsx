import type { Metadata } from "next";
import { JourneeOnboardingPage } from "@/components/onboarding/JourneeOnboardingPage";

export const metadata: Metadata = {
  title: "Onboarding",
  description: "Personalize your Journee travel preferences, budget, pace, safety settings, documents, and recommendation style.",
};

export default function OnboardingPage() {
  return <JourneeOnboardingPage />;
}
