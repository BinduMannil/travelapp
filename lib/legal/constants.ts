// Canonical legal / business entity metadata.
// Update once with real values from the UAE trade license + deployment domain;
// every legal page + CMP banner + disclosure block reads from here.

export const LEGAL = {
  // TODO: replace with your exact legal entity name from the UAE trade license
  entityName: "Travel Companion FZ-LLC",
  // TODO: UAE trade-licence number (13-digit) + issuing authority (e.g. DED / IFZA / SHAMS)
  tradeLicenseNumber: "[UAE TRADE LICENSE NUMBER]",
  tradeLicenseAuthority: "[UAE FREE ZONE OR DED AUTHORITY]",
  // TODO: registered office address from the license
  registeredAddress: "[REGISTERED OFFICE ADDRESS, UAE]",
  // TODO: replace with production domain once live
  brand: "Travel Companion",
  productUrl: "https://travelcompanion.app",
  // Inbox addresses — create on your domain and forward wherever you like
  supportEmail: "hello@travelcompanion.app",
  legalEmail: "legal@travelcompanion.app",
  privacyEmail: "privacy@travelcompanion.app",
  // Governing law (UAE standard for an FZ-LLC is the free-zone courts or ADGM/DIFC common-law courts)
  governingLaw:
    "Laws of the United Arab Emirates, with exclusive jurisdiction in the courts of the Dubai International Financial Centre (DIFC).",
  // Date last reviewed — update each time the docs change
  reviewedAt: "2026-04-20",
} as const;
