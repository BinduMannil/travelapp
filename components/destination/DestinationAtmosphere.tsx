import type { CSSProperties, ReactNode } from "react";
import {
  getDestinationAtmosphere,
  type DestinationAtmosphereTheme,
  type DestinationType,
} from "@/lib/destinationAtmospheres";

type AtmosphereStyle = CSSProperties & {
  "--destination-primary": string;
  "--destination-secondary": string;
  "--destination-glow": string;
  "--destination-overlay": string;
  "--destination-card-border": string;
  "--destination-image-gradient": string;
  "--destination-texture": string;
};

export function DestinationAtmosphereProvider({
  destinationSlug,
  destinationType,
  countrySlug,
  children,
  className = "",
}: {
  destinationSlug?: string | null;
  destinationType?: DestinationType;
  countrySlug?: string | null;
  children: ReactNode;
  className?: string;
}) {
  const atmosphereTheme = getDestinationAtmosphere({
    destinationSlug,
    destinationType,
    countrySlug,
  });

  const style: AtmosphereStyle = {
    "--destination-primary": atmosphereTheme.primaryAccent,
    "--destination-secondary": atmosphereTheme.secondaryAccent,
    "--destination-glow": atmosphereTheme.ambientGlow,
    "--destination-overlay": atmosphereTheme.overlayTint,
    "--destination-card-border": atmosphereTheme.cardBorderTint,
    "--destination-image-gradient": atmosphereTheme.imageGradient,
    "--destination-texture": atmosphereTheme.texturePattern,
  };

  return (
    <div
      className={`destination-atmosphere ${className}`}
      data-destination-theme={atmosphereTheme.slug}
      data-destination-motion={atmosphereTheme.motionType}
      style={style}
    >
      {children}
    </div>
  );
}

export function DestinationThemeOverlay({
  theme,
  className = "",
}: {
  theme: DestinationAtmosphereTheme;
  className?: string;
}) {
  return (
    <div className={`destination-theme-overlay ${className}`} aria-hidden>
      <div
        className="absolute inset-0 opacity-75"
        style={{ background: theme.imageGradient }}
      />
      <div
        className="absolute inset-0 opacity-55"
        style={{
          background:
            `radial-gradient(circle at 72% 28%, ${theme.ambientGlow}, transparent 34%), ` +
            `radial-gradient(circle at 18% 72%, ${theme.secondaryAccent}24, transparent 32%)`,
        }}
      />
      <div
        className="absolute inset-0 opacity-35"
        style={{ backgroundImage: theme.texturePattern, backgroundSize: "72px 72px" }}
      />
    </div>
  );
}

export function DestinationMotionLayer({
  theme,
  className = "",
}: {
  theme: DestinationAtmosphereTheme;
  className?: string;
}) {
  const quiet = theme.motionIntensity === "quiet";

  return (
    <div
      className={`destination-motion-layer ${className}`}
      data-motion={theme.motionType}
      data-intensity={theme.motionIntensity}
      aria-hidden
    >
      <span className="destination-motion-a" />
      <span className="destination-motion-b" />
      {!quiet ? <span className="destination-motion-c" /> : null}
    </div>
  );
}

export function getAtmosphereThemeForRender({
  destinationSlug,
  destinationType,
  countrySlug,
}: {
  destinationSlug?: string | null;
  destinationType?: DestinationType;
  countrySlug?: string | null;
}) {
  return getDestinationAtmosphere({ destinationSlug, destinationType, countrySlug });
}
