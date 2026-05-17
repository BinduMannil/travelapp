import type { Metadata } from "next";
import { FieldNotesCapture } from "@/components/internal/FieldNotesCapture";

export const metadata: Metadata = {
  title: "Internal Field Notes Capture",
  robots: {
    index: false,
    follow: false,
  },
};

export default function InternalFieldNotesPage() {
  return <FieldNotesCapture />;
}
