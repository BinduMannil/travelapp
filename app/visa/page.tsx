import type { Metadata } from "next";
import { VisaEntryRequirementsPage } from "@/components/visa/VisaEntryRequirementsPage";

export const metadata: Metadata = {
  title: "Visa / Entry Requirements | JOURNEE",
  description:
    "Check Japan visa requirements, Japan visa-free entry, passport validity, travel documents, and official-source-aware entry guidance for U.S. passport holders.",
};

export default function VisaPage() {
  return <VisaEntryRequirementsPage />;
}
