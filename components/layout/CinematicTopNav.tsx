"use client";

import Image from "next/image";
import Link from "next/link";
import { Bell, Menu } from "lucide-react";
import { useState, type ReactNode } from "react";
import { MainNavLink } from "@/components/navigation/MainNavLink";
import { TopNavSearch } from "@/components/search/TopNavSearch";
import { JourneeLogoMark } from "@/components/brand/JourneeLogo";
import { cn } from "@/lib/utils";

export type CinematicTopNavItem = {
  label: string;
  href?: string;
};

type CinematicTopNavProps = {
  navItems: CinematicTopNavItem[];
  search?: ReactNode | false;
  searchPlaceholder?: string;
  notifications?: ReactNode | false;
  notificationCount?: number;
  avatar?: ReactNode | false;
  avatarSrc?: string;
  avatarAlt?: string;
  className?: string;
  navBreakpointClassName?: string;
  mobileMenu?: ReactNode;
};

export function CinematicTopNav({
  navItems,
  search,
  searchPlaceholder,
  notifications,
  notificationCount,
  avatar,
  avatarSrc,
  avatarAlt = "",
  className,
  navBreakpointClassName = "2xl:flex",
  mobileMenu,
}: CinematicTopNavProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className={cn("fixed inset-x-0 top-0 z-30 border-b border-white/8 bg-[#020506]/86 backdrop-blur-2xl", className)}>
      <div className="mx-auto flex h-16 max-w-[1920px] items-center gap-5 px-6 sm:px-8 lg:px-10">
        <Link href="/" className="flex shrink-0 items-center gap-3">
          <JourneeLogoMark className="h-9 w-9 text-[#e0aa3e]" />
          <span className="font-sans text-2xl uppercase tracking-[0.12em] text-white">
            JOURNEE
          </span>
        </Link>

        <nav className={cn("hidden flex-1 items-center justify-center gap-4 overflow-visible rounded-full border border-white/[0.07] bg-white/[0.035] px-4 py-1.5 backdrop-blur-xl xl:gap-5 2xl:gap-6", navBreakpointClassName)}>
          {navItems.map((item) => (
            <MainNavLink
              key={`${item.label}-${item.href ?? ""}`}
              label={item.label}
              href={item.href}
              className="relative inline-flex min-h-10 min-w-max items-center whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition hover:bg-white/[0.055] xl:px-5"
              activeClassName="bg-[#f3b544]/14 text-[#f3b544]"
              inactiveClassName="text-white/88 hover:text-white"
              underlineClassName="absolute bottom-1 left-1/2 h-[2px] w-8 -translate-x-1/2 rounded-full bg-[#f3b544]"
            />
          ))}
        </nav>

        <div className="ml-auto flex min-w-0 flex-1 justify-end">
          {search === false ? null : search ?? (
            <TopNavSearch readOnly placeholder={searchPlaceholder} className="ml-auto" />
          )}
        </div>

        {notifications === false ? null : notifications ?? (
          <button
            className="relative grid h-10 w-10 shrink-0 place-items-center rounded-full text-white/88"
            type="button"
            aria-label="Notifications"
          >
            <Bell className="h-5 w-5" />
            {notificationCount ? (
              <span className="absolute right-1.5 top-1 h-4 min-w-4 rounded-full bg-[#f3b544] px-1 text-[10px] font-bold leading-4 text-[#120d04]">
                {notificationCount}
              </span>
            ) : null}
          </button>
        )}

        {avatar === false ? null : avatar ?? (
          avatarSrc ? (
            <Image
              src={avatarSrc}
              alt={avatarAlt}
              width={40}
              height={40}
              className="h-10 w-10 shrink-0 rounded-full border border-[#d8aa4f]/55 object-cover"
            />
          ) : null
        )}

        <button
          className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-white/10 text-white/86 2xl:hidden"
          type="button"
          aria-label="Open menu"
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((open) => !open)}
        >
          <Menu className="h-5 w-5" />
        </button>
      </div>

      {mobileOpen ? (
        <div className="border-t border-white/10 bg-[#020506]/96 px-5 py-5 backdrop-blur-2xl sm:px-7 2xl:hidden">
          {mobileMenu ?? (
            <nav className="grid gap-2">
              {navItems.map((item) => (
                <MainNavLink
                  key={`mobile-${item.label}-${item.href ?? ""}`}
                  label={item.label}
                  href={item.href}
                  className="rounded-2xl px-5 py-4 text-sm font-semibold transition"
                  activeClassName="bg-[#e8c77b] text-[#130f0a]"
                  inactiveClassName="text-white/72 hover:bg-white/10 hover:text-white"
                />
              ))}
            </nav>
          )}
        </div>
      ) : null}
    </header>
  );
}
