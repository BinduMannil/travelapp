import Link from "next/link";
import type { ReactNode } from "react";
import { AmbientDestinationMotion } from "@/components/destination/AmbientDestinationMotion";
import { getDestinationIdentity } from "@/lib/destination/identity";

type Crumb = { label: string; href?: string };

type Palette =
  | "sumi"
  | "enji"
  | "aizome"
  | "matcha"
  | "ume"
  | "kintsugi"
  | "sakura"
  | "ocean"
  | "forest";

const GRADIENTS: Record<Palette, string> = {
  sumi: "from-enji-700/40 via-sumi-900 to-aizome-900/80",
  enji: "from-enji-700/60 via-enji-900 to-sumi-900",
  aizome: "from-aizome-500/60 via-aizome-900 to-sumi-900",
  matcha: "from-matcha-600/60 via-matcha-700 to-sumi-900",
  ume: "from-sakura-400/50 via-enji-700 to-sumi-900",
  kintsugi: "from-kintsugi-500/50 via-enji-700 to-sumi-900",
  sakura: "from-sakura-300/60 via-enji-700 to-sumi-900",
  ocean: "from-aizome-400/60 via-aizome-700 to-sumi-900",
  forest: "from-matcha-500/60 via-matcha-700 to-aizome-900",
};

const HERO_IMAGES: Record<Palette, string> = {
  sumi: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=2200&q=84",
  enji: "https://images.unsplash.com/photo-1528360983277-13d401cdc186?auto=format&fit=crop&w=2200&q=84",
  aizome: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=2200&q=84",
  matcha: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=2200&q=84",
  ume: "https://images.unsplash.com/photo-1536098561742-ca998e48cbcc?auto=format&fit=crop&w=2200&q=84",
  kintsugi: "https://images.unsplash.com/photo-1553621042-f6e147245754?auto=format&fit=crop&w=2200&q=84",
  sakura: "https://images.unsplash.com/photo-1522383225653-ed111181a951?auto=format&fit=crop&w=2200&q=84",
  ocean: "https://images.unsplash.com/photo-1528164344705-47542687000d?auto=format&fit=crop&w=2200&q=84",
  forest: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=2200&q=84",
};

/**
 * PageHero — dark sumi hero with a kanji accent and Montserrat title.
 * Use on every internal city / country page so the product has one voice.
 *
 *  <PageHero
 *    crumbs={[{ label: "Home", href: "/" }, { label: "Tokyo", href: "/city/tokyo" }, { label: "Visa" }]}
 *    kanji="旅"
 *    eyebrow="Visa for you"
 *    title="Visa requirements for Tokyo"
 *    lede="Pick your passport to see the current rule."
 *  />
 */
export function PageHero({
  crumbs,
  kanji,
  eyebrow,
  title,
  subtitle,
  lede,
  children,
  palette = "sumi",
  size = "md",
}: {
  crumbs: Crumb[];
  kanji?: string;
  eyebrow?: string;
  title: string;
  /** Optional tagline rendered in a sakura-pink tracking-spaced style under the title (e.g. kanji transliteration). */
  subtitle?: string;
  lede?: string;
  /** Extra content (e.g. a picker, stats chips) rendered below the lede but inside the hero. */
  children?: ReactNode;
  palette?: Palette;
  size?: "sm" | "md" | "lg";
}) {
  const identity = getDestinationIdentity("tokyo");
  const padY =
    size === "lg"
      ? "py-24 sm:py-32"
      : size === "sm"
        ? "py-14 sm:py-20"
        : "py-16 sm:py-24";
  const headingSize =
    size === "lg"
      ? "text-[clamp(3.2rem,8vw,7rem)]"
      : size === "sm"
        ? "text-[clamp(2.45rem,5vw,4rem)]"
        : "text-[clamp(2.65rem,5.6vw,5.25rem)]";

  return (
    <section className="relative isolate min-h-[27rem] overflow-hidden bg-sumi-900 text-washi-50">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={HERO_IMAGES[palette]}
        alt=""
        className="image-drift absolute inset-0 -z-30 h-full w-full object-cover opacity-90"
        loading="eager"
      />
      <div
        className={`absolute inset-0 -z-20 bg-gradient-to-br ${GRADIENTS[palette]}`}
        aria-hidden
      />
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(8,7,6,.92),rgba(8,7,6,.6)_46%,rgba(8,7,6,.18)),linear-gradient(0deg,rgba(8,7,6,.84),rgba(8,7,6,.2)_48%,transparent_72%)]" />
      <div className="absolute inset-0 -z-10 opacity-15" style={{ backgroundImage: identity.texture }} />
      <AmbientDestinationMotion identity={identity} />

      <div className={`mx-auto max-w-6xl px-6 ${padY}`}>
        <nav className="text-[11px] uppercase tracking-[0.12em] text-washi-50/65">
          {crumbs.map((c, i) => (
            <span key={i}>
              {i > 0 && <span className="mx-2 text-washi-50/30">·</span>}
              {c.href ? (
                <Link href={c.href} className="hover:text-washi-50">
                  {c.label}
                </Link>
              ) : (
                <span>{c.label}</span>
              )}
            </span>
          ))}
        </nav>

        <div className="mt-10 grid gap-8 lg:grid-cols-[auto_minmax(0,1fr)] lg:items-end">
          {kanji && (
            <div className="grid h-20 w-20 place-items-center rounded-[1.1rem] border border-white/18 bg-washi-50/12 font-sans text-5xl font-bold text-washi-50 shadow-editorial-deep backdrop-blur-md sm:h-24 sm:w-24 sm:text-6xl">
              {kanji}
            </div>
          )}
          <div className="max-w-4xl">
            {eyebrow && (
              <p className="luxury-kicker text-kintsugi-300">
                {eyebrow}
              </p>
            )}
            <h1
              className={`luxury-display mt-4 font-semibold text-washi-50 ${headingSize}`}
            >
              {title}
            </h1>
            {subtitle && (
              <p className="mt-3 font-sans text-lg tracking-[0.12em] text-kintsugi-300/82 sm:text-xl">
                {subtitle}
              </p>
            )}
          </div>
        </div>

        {lede && (
          <p className="mt-8 max-w-3xl text-lg leading-9 text-washi-50/82 sm:text-xl">
            {lede}
          </p>
        )}

        {children && <div className="mt-8">{children}</div>}
      </div>
    </section>
  );
}
