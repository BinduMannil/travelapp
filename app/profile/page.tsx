import type { Metadata } from "next";
import { ProfileSavedPlacesPage } from "@/components/profile/ProfileSavedPlacesPage";

export const metadata: Metadata = {
  title: "Profile / Saved Places",
  description:
    "Emma Walker's JOURNEE profile, saved places, saved trips, wishlist, travel stats, and journal entries.",
};

export default function ProfilePage() {
  return <ProfileSavedPlacesPage />;
}
