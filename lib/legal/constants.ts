// Canonical legal / business entity metadata.
// Update once with real values from the UAE trade license + deployment domain;
// every legal page + CMP banner + disclosure block reads from here.

export const LEGAL = {
  // Legal entity behind the app (UAE FZ-LLC).
  entityName: "The Launch Hub FZ-LLC",
  // Registered under Ras Al Khaimah Economic Zone. License number intentionally
  // not displayed publicly.
  tradeLicenseNumber: "",
  tradeLicenseAuthority: "RAKEZ",
  // TODO: registered office address from the license
  registeredAddress: "[REGISTERED OFFICE ADDRESS, UAE]",
  // Consumer-facing product / app name
  brand: "Journee",
  // TODO: replace with production domain once live
  productUrl: "https://journee-app.com",
  // Single inbox for now; forward internally if/when we split support/legal/privacy.
  supportEmail: "info@journee-app.com",
  legalEmail: "info@journee-app.com",
  privacyEmail: "info@journee-app.com",
  // Governing law (UAE standard for an FZ-LLC is the free-zone courts or ADGM/DIFC common-law courts)
  governingLaw:
    "Laws of the United Arab Emirates, with exclusive jurisdiction in the courts of the Dubai International Financial Centre (DIFC).",
  // Date last reviewed — update each time the docs change. Stored ISO,
  // surfaced via `formatReviewedAt` for human-readable rendering.
  reviewedAt: "2026-04-20",
} as const;

/**
 * Render an ISO date as "20 April 2026". Falls back to the raw string
 * if the date can't be parsed. The single source of truth for human-
 * facing dates anywhere in the app.
 */
export function formatLongDate(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function formatReviewedAt(iso: string = LEGAL.reviewedAt): string {
  return formatLongDate(iso);
}
