import Link from "next/link";
import { PageContent, TopBar } from "@/components/tow-usa/shared";
import { IconChevronRight } from "@/components/tow-usa/icons";

const menuItems = [
  "My Listings",
  "Reviews",
  "Financing applications",
  "Shipping quotes",
  "Warranty requests",
  "Settings",
  "Help",
];

export default function YouPage() {
  return (
    <>
      <TopBar />
      <PageContent>
        <div className="px-4 py-4">
          <div className="rounded-2xl bg-white p-4 ring-1 ring-zinc-100">
            <div className="flex items-center gap-3">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#0B5FFF]/10 text-lg font-bold text-[#0B5FFF]">
                TB
              </div>
              <div>
                <p className="font-semibold text-zinc-900">Tom Bradley</p>
                <p className="text-sm text-zinc-500">Bradley Recovery</p>
              </div>
            </div>
            <button
              type="button"
              className="mt-4 h-11 w-full rounded-full border border-[#0B5FFF] text-sm font-semibold text-[#0B5FFF]"
            >
              Get verified
            </button>
          </div>

          <ul className="mt-4 overflow-hidden rounded-2xl bg-white ring-1 ring-zinc-100">
            {menuItems.map((item) => (
              <li key={item}>
                <Link
                  href="#"
                  className="flex min-h-12 items-center justify-between px-4 py-3 text-sm text-zinc-800"
                >
                  {item}
                  <IconChevronRight />
                </Link>
              </li>
            ))}
          </ul>

          <p className="mt-6 text-center text-xs text-zinc-400">
            TOW USA — The easiest way to find your next tow truck.
          </p>
        </div>
      </PageContent>
    </>
  );
}
