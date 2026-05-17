import type { ComponentPropsWithoutRef } from "react";

type LogoDirection = "celestial-route" | "atlas-aperture" | "meridian-pin";

type LogoMarkProps = ComponentPropsWithoutRef<"svg"> & {
  direction?: LogoDirection;
};

const sharedStroke = {
  fill: "none",
  stroke: "currentColor",
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export function JourneeLogoMark({
  direction = "celestial-route",
  className,
  ...props
}: LogoMarkProps) {
  if (direction === "atlas-aperture") {
    return (
      <svg
        viewBox="0 0 48 48"
        aria-hidden="true"
        className={className}
        {...props}
      >
        <path {...sharedStroke} strokeWidth="2.2" d="M24 5 42 24 24 43 6 24 24 5Z" />
        <path {...sharedStroke} strokeWidth="1.7" d="M24 11v26M11 24h26" opacity=".72" />
        <path {...sharedStroke} strokeWidth="1.7" d="m16 16 16 16M32 16 16 32" opacity=".46" />
        <circle cx="24" cy="24" r="4.2" fill="currentColor" />
      </svg>
    );
  }

  if (direction === "meridian-pin") {
    return (
      <svg
        viewBox="0 0 48 48"
        aria-hidden="true"
        className={className}
        {...props}
      >
        <path
          {...sharedStroke}
          strokeWidth="2.2"
          d="M24 5c8 0 14 6.1 14 13.8 0 10.6-14 24.2-14 24.2S10 29.4 10 18.8C10 11.1 16 5 24 5Z"
        />
        <path {...sharedStroke} strokeWidth="1.8" d="M17 20h14M24 12v22" opacity=".7" />
        <circle cx="24" cy="20" r="4.6" fill="currentColor" />
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 48 48"
      aria-hidden="true"
      className={className}
      {...props}
    >
      <circle {...sharedStroke} cx="24" cy="24" r="18" strokeWidth="1.7" opacity=".72" />
      <path {...sharedStroke} strokeWidth="2.3" d="M15 30c5.4-10.5 12.2-14.6 21-15" />
      <path {...sharedStroke} strokeWidth="2.3" d="M16 15v14.5c0 5.4 3.5 8.8 8.7 8.8 4.2 0 7.4-2.3 8.6-6" />
      <path {...sharedStroke} strokeWidth="1.7" d="M11 24h26M24 11v26" opacity=".36" />
      <circle cx="36" cy="15" r="2.7" fill="currentColor" />
    </svg>
  );
}

export function JourneeBrand({
  direction = "celestial-route",
  className = "",
}: {
  direction?: LogoDirection;
  className?: string;
}) {
  return (
    <span className={`inline-flex items-center gap-3 text-white ${className}`}>
      <span className="grid h-11 w-11 place-items-center rounded-full border border-[#d8aa4f]/35 bg-black/24 text-[#d8aa4f] shadow-[0_0_34px_rgba(216,170,79,.16)] backdrop-blur">
        <JourneeLogoMark direction={direction} className="h-7 w-7" />
      </span>
      <span className="font-sans text-2xl font-semibold uppercase tracking-[0.12em]">
        Journee
      </span>
    </span>
  );
}

export const logoConcepts = [
  {
    direction: "celestial-route" as const,
    name: "Celestial Route",
    summary: "A monogram-like route orbit with a navigation star. Best fit for luxury exploration and destination intelligence.",
  },
  {
    direction: "atlas-aperture" as const,
    name: "Atlas Aperture",
    summary: "A compass-diamond aperture for map discovery, editorial guides, and curated journeys.",
  },
  {
    direction: "meridian-pin" as const,
    name: "Meridian Pin",
    summary: "A refined marker with meridian structure for location-first travel planning.",
  },
];

export function LogoDirectionPreviews() {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {logoConcepts.map((concept) => (
        <div
          key={concept.direction}
          className="rounded-2xl border border-white/12 bg-[#071010] p-5 text-white"
        >
          <JourneeBrand direction={concept.direction} />
          <p className="mt-5 text-sm font-semibold text-[#d8aa4f]">{concept.name}</p>
          <p className="mt-2 text-xs leading-5 text-white/60">{concept.summary}</p>
        </div>
      ))}
    </div>
  );
}
