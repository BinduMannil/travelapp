"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { isNavigationHrefActive, navigationHref } from "@/lib/routes";

export function MainNavLink({
  label,
  href,
  className,
  activeClassName = "",
  inactiveClassName = "",
  underlineClassName,
  children,
}: {
  label: string;
  href?: string;
  className: string;
  activeClassName?: string;
  inactiveClassName?: string;
  underlineClassName?: string;
  children?: ReactNode;
}) {
  const pathname = usePathname() ?? "/";
  const resolvedHref = href ?? navigationHref(label);
  const active = isNavigationHrefActive(pathname, resolvedHref);

  return (
    <Link
      href={resolvedHref}
      aria-current={active ? "page" : undefined}
      className={`${className} ${active ? activeClassName : inactiveClassName}`}
    >
      {children ?? label}
      {underlineClassName && active ? <span className={underlineClassName} /> : null}
    </Link>
  );
}
