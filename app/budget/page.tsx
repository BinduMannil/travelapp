import type { Metadata } from "next";
import { BudgetExperience } from "@/components/budget/BudgetExperience";

export const metadata: Metadata = {
  title: "Budget / Cost Planner",
  description:
    "A cinematic Journee travel financial planning experience for realistic trip costs, budget styles, expense planning, and smart journey insights.",
};

export default function BudgetPage() {
  return <BudgetExperience />;
}
