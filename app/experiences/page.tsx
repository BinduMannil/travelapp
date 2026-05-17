import type { Metadata } from "next";
import Link from "next/link";
import { routes } from "@/lib/routes";

export const metadata: Metadata = {
  title: "Experiences",
  description: "Browse bookable JOURNEE experiences and activities.",
};

const experiences = [
  {
    title: "Shibuya Food & Culture Walk",
    city: "Tokyo",
    href: routes.experience("shibuya-food-culture-walk"),
    body: "A connected experience detail with booking, reviews, and confirmation flow.",
  },
];

export default function ExperiencesPage() {
  return (
    <main className="min-h-screen bg-[#020a0b] px-5 py-14 text-white">
      <div className="mx-auto max-w-5xl">
        <nav className="text-xs font-semibold uppercase tracking-[0.14em] text-white/50">
          <Link href={routes.home} className="hover:text-white">
            Home
          </Link>{" "}
          / Experiences
        </nav>
        <h1 className="mt-6 font-sans text-[clamp(2.6rem,9vw,5.4rem)] font-semibold leading-none">
          Experiences
        </h1>
        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {experiences.map((experience) => (
            <Link
              key={experience.href}
              href={experience.href}
              className="rounded-2xl border border-white/12 bg-white/[0.045] p-6 transition hover:-translate-y-0.5 hover:border-white/24"
            >
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#d8aa4f]">{experience.city}</p>
              <h2 className="mt-3 font-sans text-2xl font-semibold">{experience.title}</h2>
              <p className="mt-3 text-sm leading-6 text-white/64">{experience.body}</p>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
