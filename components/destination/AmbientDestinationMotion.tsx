"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { DestinationIdentity } from "@/lib/destination/identity";

const PETALS = [
  { left: 8, delay: 0.4, duration: 24, size: 10, drift: 42 },
  { left: 19, delay: 7.2, duration: 30, size: 7, drift: -34 },
  { left: 31, delay: 3.6, duration: 28, size: 9, drift: 52 },
  { left: 47, delay: 11.2, duration: 34, size: 6, drift: -46 },
  { left: 63, delay: 5.4, duration: 27, size: 8, drift: 38 },
  { left: 78, delay: 1.8, duration: 32, size: 11, drift: -54 },
  { left: 91, delay: 9.5, duration: 29, size: 7, drift: 36 },
];

const SNOW = [
  { left: 6, delay: 0.2, duration: 26, size: 2 },
  { left: 18, delay: 4.4, duration: 31, size: 2 },
  { left: 29, delay: 10.1, duration: 28, size: 3 },
  { left: 42, delay: 2.8, duration: 34, size: 2 },
  { left: 55, delay: 8.2, duration: 30, size: 2 },
  { left: 71, delay: 5.6, duration: 36, size: 3 },
  { left: 86, delay: 12.3, duration: 29, size: 2 },
  { left: 94, delay: 1.5, duration: 33, size: 2 },
];

const LANTERNS = [
  { left: 16, top: 22, delay: 0, size: 54 },
  { left: 72, top: 30, delay: 2.8, size: 42 },
  { left: 86, top: 54, delay: 5.6, size: 34 },
];

export function AmbientDestinationMotion({
  identity,
  variant = "hero",
}: {
  identity: DestinationIdentity;
  variant?: "hero" | "section";
}) {
  const reduceMotion = useReducedMotion();
  const quiet = identity.motion.intensity === "quiet";
  const opacity = variant === "hero" ? (quiet ? 0.55 : 0.68) : quiet ? 0.38 : 0.5;

  if (reduceMotion) {
    return (
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden" aria-hidden>
        <div
          className="absolute inset-0 opacity-40"
          style={{
            background: `radial-gradient(circle at 24% 20%, ${identity.colors.accent}2e, transparent 32%), radial-gradient(circle at 82% 28%, ${identity.colors.tertiary}20, transparent 34%)`,
          }}
        />
      </div>
    );
  }

  if (identity.motion.system === "aurora-snow") {
    return (
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden" aria-hidden>
        <motion.div
          className="absolute -left-1/4 top-0 h-1/2 w-[150%] blur-3xl"
          style={{
            background: `linear-gradient(110deg, transparent 8%, ${identity.colors.accent}33 35%, ${identity.colors.secondary}2e 52%, transparent 78%)`,
            opacity,
          }}
          animate={{ x: ["-8%", "7%", "-5%"], y: ["0%", "5%", "0%"], opacity: [opacity * 0.55, opacity, opacity * 0.55] }}
          transition={{ duration: 24, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute inset-x-[-10%] bottom-[-10%] h-2/3 blur-2xl"
          style={{
            background: "linear-gradient(0deg, rgba(230,245,248,.18), transparent 68%)",
          }}
          animate={{ x: ["0%", "3%", "0%"] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        />
        {SNOW.map((flake) => (
          <motion.span
            key={`${flake.left}-${flake.delay}`}
            className="absolute rounded-full bg-white/70"
            style={{ left: `${flake.left}%`, width: flake.size, height: flake.size }}
            animate={{ y: ["-12vh", "112vh"], x: [0, 18, -10], opacity: [0, 0.55, 0] }}
            transition={{ duration: flake.duration, delay: flake.delay, repeat: Infinity, ease: "linear" }}
          />
        ))}
      </div>
    );
  }

  if (identity.motion.system === "desert-haze" || identity.motion.system === "lantern-fog") {
    return (
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden" aria-hidden>
        <motion.div
          className="absolute inset-y-[-20%] left-[-20%] w-[80%] blur-3xl"
          style={{
            background: `radial-gradient(ellipse at center, ${identity.colors.accent}26, transparent 62%)`,
            opacity,
          }}
          animate={{ x: ["-4%", "12%", "-3%"], opacity: [opacity * 0.6, opacity, opacity * 0.66] }}
          transition={{ duration: 26, repeat: Infinity, ease: "easeInOut" }}
        />
        {LANTERNS.map((lantern) => (
          <motion.span
            key={`${lantern.left}-${lantern.top}`}
            className="absolute rounded-full blur-md"
            style={{
              left: `${lantern.left}%`,
              top: `${lantern.top}%`,
              width: lantern.size,
              height: lantern.size,
              background: `radial-gradient(circle, ${identity.colors.accentSoft}80, ${identity.colors.accent}26 38%, transparent 72%)`,
            }}
            animate={{ opacity: [0.18, 0.42, 0.18], scale: [0.96, 1.04, 0.98] }}
            transition={{ duration: 7, delay: lantern.delay, repeat: Infinity, ease: "easeInOut" }}
          />
        ))}
      </div>
    );
  }

  if (identity.motion.system === "jungle-mist") {
    return (
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden" aria-hidden>
        <motion.div
          className="absolute inset-x-[-18%] bottom-[-18%] h-3/4 blur-3xl"
          style={{
            background: `radial-gradient(ellipse at center, ${identity.colors.tertiary}2e, transparent 68%)`,
            opacity,
          }}
          animate={{ x: ["-3%", "4%", "-2%"], y: ["2%", "-4%", "2%"] }}
          transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute inset-x-0 bottom-0 h-28"
          style={{
            background: `linear-gradient(90deg, transparent, ${identity.colors.accent}24, transparent)`,
          }}
          animate={{ x: ["-35%", "35%", "-35%"] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>
    );
  }

  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden" aria-hidden>
      <motion.div
        className="absolute -left-24 top-[18%] h-56 w-[42rem] rotate-[-8deg] blur-3xl"
        style={{
          background: `linear-gradient(90deg, transparent, ${identity.colors.tertiary}28, ${identity.colors.secondary}22, transparent)`,
          opacity,
        }}
        animate={{ x: ["-8%", "18%", "-4%"], opacity: [opacity * 0.45, opacity, opacity * 0.5] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-[-12%] right-[-16%] h-72 w-[46rem] rounded-full blur-3xl"
        style={{ backgroundColor: `${identity.colors.accent}20` }}
        animate={{ scale: [1, 1.08, 1], opacity: [0.22, 0.42, 0.22] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
      />
      {PETALS.map((petal) => (
        <motion.span
          key={`${petal.left}-${petal.delay}`}
          className="absolute rounded-[70%_20%_70%_20%] bg-white/70 shadow-[0_0_16px_rgba(255,220,220,.28)]"
          style={{
            left: `${petal.left}%`,
            width: petal.size,
            height: petal.size * 1.65,
            background: `linear-gradient(145deg, ${identity.colors.ivory}cc, ${identity.colors.secondary}66)`,
          }}
          animate={{
            y: ["-12vh", "112vh"],
            x: [0, petal.drift, petal.drift * -0.35],
            rotate: [0, 80, 210],
            opacity: [0, 0.42, 0.18, 0],
          }}
          transition={{ duration: petal.duration, delay: petal.delay, repeat: Infinity, ease: "linear" }}
        />
      ))}
    </div>
  );
}
