"use client";

import { usePathname } from "next/navigation";
import { ProfileTravelPreferencesDropdown } from "@/components/layout/ProfileTravelPreferencesDropdown";

export function GlobalTravelPreferencesAccess() {
  const pathname = usePathname();

  if (pathname === "/trips") {
    return null;
  }

  return (
    <ProfileTravelPreferencesDropdown className="fixed right-5 top-3 z-[80] sm:right-6" />
  );
}
