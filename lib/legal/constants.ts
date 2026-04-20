// Canonical legal / business entity metadata.
// Update once with real values from the UAE trade license + deployment domain;
// every legal page + CMP banner + disclosure block reads from here.

export const LEGAL = {
  // Legal entity behind the app (UAE FZ-LLC).
  entityName: "The Launch Hub FZ-LLC",
  // TODO: UAE trade-licence number (13-digit) + issuing authority (e.g. DED / IFZA / SHAMS)
  tradeLicenseNumber: "[UAE TRADE LICENSE NUMBER]",
  tradeLicenseAuthority: "[UAE FREE ZONE OR DED AUTHORITY]",
  // TODO: registered office address from the license
  registeredAddress: "[REGISTERED OFFICE ADDRESS, UAE]",
  // Consumer-facing product / app name
  brand: "Journee",
  // TODO: replace with production domain once live
  productUrl: "https://journee.app",
  // Inbox addresses — create on your domain and forward wherever you like
  supportEmail: "hello@journee.app",
  legalEmail: "legal@journee.app",
  privacyEmail: "privacy@journee.app",
  // Governing law (UAE standard for an FZ-LLC is the free-zone courts or ADGM/DIFC common-law courts)
  governingLaw:
    "Laws of the United Arab Emirates, with exclusive jurisdiction in the courts of the Dubai International Financial Centre (DIFC).",
  // Date last reviewed — update each time the docs change
  reviewedAt: "2026-04-20",
} as const;
