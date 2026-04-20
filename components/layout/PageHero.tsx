import Link from "next/link";
import type { ReactNode } from "react";

type Crumb = { label: string; href?: string };

type Palette = "sumi" | "enji" | "aizome" | "matcha" | "ume";

const GRADIENTS: Record<Palette, string> = {
  sumi: "from-enji-700/40 via-sumi-900 to-aizome-900/80",
  enji: "from-enji-700/60 via-enji-900 to-sumi-900",
  aizome: "from-aizome-500/60 via-aizome-900 to-sumi-900",
  matcha: "from-matcha-600/60 via-matcha-700 to-sumi-900",
  ume: "from-sakura-400/50 via-enji-700 to-sumi-900",
};

/**
 * PageHero — dark sumi hero with a kanji accent + editorial-serif title.
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
  const padY =
    size === "lg"
      ? "py-20 sm:py-28"
      : size === "sm"
        ? "py-12 sm:py-14"
        : "py-16 sm:py-20";
  const headingSize =
    size === "lg"
      ? "text-[clamp(2.5rem,9vw,6rem)]"
      : size === "sm"
        ? "text-[clamp(2rem,6vw,3.25rem)]"
        : "text-[clamp(2.25rem,7vw,4.5rem)]";

  return (
    <section className="relative isolate overflow-hidden bg-sumi-900 text-washi-50">
      <div
        className={`absolute inset-0 -z-10 bg-gradient-to-br ${GRADIENTS[palette]}`}
        aria-hidden
      />
      {/* seigaiha wave texture */}
      <div
        className="absolute inset-0 -z-10 opacity-[0.08]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 50% 100%, rgba(255,255,255,.85) 0 26%, transparent 27%), radial-gradient(circle at 0% 100%, rgba(255,255,255,.85) 0 26%, transparent 27%), radial-gradient(circle at 100% 100%, rgba(255,255,255,.85) 0 26%, transparent 27%)",
          backgroundSize: "56px 28px",
        }}
        aria-hidden
      />

      <div className={`mx-auto max-w-6xl px-6 ${padY}`}>
        <nav className="text-[11px] uppercase tracking-[0.3em] text-washi-50/65">
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

        <div className="mt-6 grid gap-6 sm:grid-cols-[auto_1fr] sm:items-end">
          {kanji && (
            <div className="grid h-20 w-20 place-items-center rounded-2xl bg-washi-50/10 font-display text-5xl font-bold text-washi-50 backdrop-blur-md sm:h-24 sm:w-24 sm:text-6xl">
              {kanji}
            </div>
          )}
          <div>
            {eyebrow && (
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-sakura-200">
                {eyebrow}
              </p>
            )}
            <h1
              className={`mt-2 font-display font-bold leading-[0.95] tracking-tight text-washi-50 ${headingSize}`}
            >
              {title}
            </h1>
            {subtitle && (
              <p className="mt-2 font-display text-lg tracking-[0.3em] text-sakura-200 sm:text-xl">
                {subtitle}
              </p>
            )}
          </div>
        </div>

        {lede && (
          <p className="mt-8 max-w-3xl text-lg leading-relaxed text-washi-50/85 sm:text-xl">
            {lede}
          </p>
        )}

        {children && <div className="mt-8">{children}</div>}
      </div>
    </section>
  );
}
