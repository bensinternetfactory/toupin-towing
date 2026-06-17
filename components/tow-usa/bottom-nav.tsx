"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  IconDeals,
  IconHome,
  IconPlus,
  IconSearch,
  IconUser,
} from "./icons";

const tabs = [
  { href: "/", label: "For You", Icon: IconHome },
  { href: "/search", label: "Search", Icon: IconSearch },
  { href: "/sell", label: "Sell", Icon: IconPlus, elevated: true },
  { href: "/deals", label: "Deals", Icon: IconDeals },
  { href: "/you", label: "You", Icon: IconUser },
] as const;

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav
      className="fixed bottom-0 left-1/2 z-50 w-full max-w-[430px] -translate-x-1/2 border-t border-zinc-200 bg-white/95 backdrop-blur-md"
      style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}
      aria-label="Main navigation"
    >
      <div className="flex h-16 items-end justify-around px-2">
        {tabs.map(({ href, label, Icon, ...rest }) => {
          const elevated = "elevated" in rest && rest.elevated;
          const active =
            href === "/"
              ? pathname === "/"
              : pathname.startsWith(href);

          if (elevated) {
            return (
              <Link
                key={href}
                href={href}
                className="relative -top-3 flex flex-col items-center gap-0.5"
                aria-current={active ? "page" : undefined}
              >
                <span className="flex h-14 w-14 items-center justify-center rounded-full bg-[#0B5FFF] text-white shadow-lg shadow-blue-500/30">
                  <Icon />
                </span>
                <span
                  className={`text-[11px] font-semibold ${active ? "text-[#0B5FFF]" : "text-zinc-500"}`}
                >
                  {label}
                </span>
              </Link>
            );
          }

          return (
            <Link
              key={href}
              href={href}
              className={`flex min-h-11 min-w-11 flex-col items-center justify-center gap-0.5 px-2 py-1 ${
                active ? "text-[#0B5FFF]" : "text-zinc-400"
              }`}
              aria-current={active ? "page" : undefined}
            >
              <Icon active={active} />
              <span className={`text-[11px] ${active ? "font-semibold" : "font-medium"}`}>
                {label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
