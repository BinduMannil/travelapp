/* eslint-disable @next/next/no-img-element */
import type { ReactNode } from "react";

export const CINEMATIC_BACKGROUND_CLASS =
  "journee-cinematic-background pointer-events-none absolute inset-0 isolate overflow-hidden bg-[#020807]";

type CinematicBackgroundProps = {
  image?: string;
  images?: string[];
  activeImageIndex?: number;
  children?: ReactNode;
  className?: string;
  imageClassName?: string;
  overlayClassName?: string;
  overlayTone?: "default" | "rich";
};

export function CinematicBackground({
  image,
  images,
  activeImageIndex = 0,
  children,
  className = "",
  imageClassName = "",
  overlayClassName = "",
  overlayTone = "default",
}: CinematicBackgroundProps) {
  const backgroundImages = images?.length ? images : image ? [image] : [];
  const isRichOverlay = overlayTone === "rich";

  return (
    <div className={`${CINEMATIC_BACKGROUND_CLASS} ${className}`.trim()} aria-hidden>
      {backgroundImages.map((backgroundImage, index) => (
        <img
          key={backgroundImage}
          src={backgroundImage}
          alt=""
          className={`absolute inset-0 h-full w-full scale-[1.03] object-cover saturate-[1.12] transition-opacity duration-[3200ms] ease-[cubic-bezier(.19,1,.22,1)] motion-reduce:transition-none motion-safe:animate-[journeeCinematicDrift_36s_ease-in-out_infinite] ${imageClassName} ${
            index === activeImageIndex ? (isRichOverlay ? "opacity-100" : "opacity-90") : "opacity-0"
          }`}
        />
      ))}
      <div
        className={`absolute inset-[-24%] blur-[110px] mix-blend-screen [mask-image:radial-gradient(ellipse_at_center,black_0%,transparent_72%)] motion-safe:animate-[journeeAuroraFloat_32s_ease-in-out_infinite] ${
          isRichOverlay ? "opacity-35" : "opacity-60"
        }`}
      >
        <span className="absolute left-[4%] top-[8%] h-[44rem] w-[44rem] rounded-full bg-[radial-gradient(circle,rgba(216,170,79,.34),transparent_68%)]" />
        <span className="absolute right-[4%] top-[16%] h-[48rem] w-[48rem] rounded-full bg-[radial-gradient(circle,rgba(72,142,150,.26),transparent_70%)]" />
        <span className="absolute bottom-[-8%] left-[30%] h-[42rem] w-[52rem] rounded-full bg-[radial-gradient(circle,rgba(143,53,34,.22),transparent_72%)]" />
      </div>
      <div
        className={
          isRichOverlay
            ? "absolute inset-[-8%] bg-[radial-gradient(ellipse_at_50%_28%,transparent_0%,rgba(0,0,0,.1)_46%,rgba(0,0,0,.72)_100%)]"
            : "absolute inset-[-8%] bg-[radial-gradient(ellipse_at_50%_28%,transparent_0%,rgba(0,0,0,.18)_44%,rgba(0,0,0,.62)_100%)]"
        }
      />
      <div
        className={
          isRichOverlay
            ? "absolute inset-0 bg-[linear-gradient(180deg,rgba(2,6,7,.12),rgba(2,6,7,.1)_38%,rgba(2,6,7,.78)_100%)]"
            : "absolute inset-0 bg-[linear-gradient(180deg,rgba(2,6,7,.2),rgba(2,6,7,.18)_38%,rgba(2,6,7,.86)_100%)]"
        }
      />
      <div
        className={`absolute inset-0 mix-blend-soft-light [background-image:radial-gradient(circle_at_25%_15%,rgba(255,255,255,.8)_0_1px,transparent_1px),radial-gradient(circle_at_75%_65%,rgba(255,255,255,.55)_0_1px,transparent_1px)] [background-size:36px_36px,52px_52px] ${
          isRichOverlay ? "opacity-[0.045]" : "opacity-[0.09]"
        }`}
      />
      <div className={overlayClassName} />
      {children}
    </div>
  );
}
