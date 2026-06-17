"use client";

import { useState } from "react";
import { TRUCK_TYPES, TRUCK_TYPE_LABELS, type TruckType } from "@/lib/listings/schema";

const EXTRA_CHIPS = [
  { id: "new-today", label: "New Today" },
  { id: "near-me", label: "Near Me" },
] as const;

interface TypeChipsProps {
  selected: TruckType[];
  onChange: (types: TruckType[]) => void;
  extraSelected?: string[];
  onExtraChange?: (ids: string[]) => void;
}

export function TypeChips({
  selected,
  onChange,
  extraSelected = [],
  onExtraChange,
}: TypeChipsProps) {
  const toggleType = (type: TruckType) => {
    if (selected.includes(type)) {
      onChange(selected.filter((t) => t !== type));
    } else {
      onChange([...selected, type]);
    }
  };

  const toggleExtra = (id: string) => {
    if (!onExtraChange) return;
    if (extraSelected.includes(id)) {
      onExtraChange(extraSelected.filter((x) => x !== id));
    } else {
      onExtraChange([...extraSelected, id]);
    }
  };

  return (
    <div className="flex gap-2 overflow-x-auto px-4 pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      {TRUCK_TYPES.map((type) => {
        const active = selected.includes(type);
        return (
          <button
            key={type}
            type="button"
            onClick={() => toggleType(type)}
            className={`h-9 shrink-0 rounded-full px-4 text-sm font-medium transition-colors ${
              active
                ? "bg-[#0B5FFF] text-white"
                : "bg-zinc-100 text-zinc-900"
            }`}
          >
            {TRUCK_TYPE_LABELS[type]}
          </button>
        );
      })}
      {EXTRA_CHIPS.map(({ id, label }) => {
        const active = extraSelected.includes(id);
        return (
          <button
            key={id}
            type="button"
            onClick={() => toggleExtra(id)}
            className={`h-9 shrink-0 rounded-full px-4 text-sm font-medium transition-colors ${
              active
                ? "bg-[#0B5FFF] text-white"
                : "bg-zinc-100 text-zinc-900"
            }`}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}

export function StoryRail() {
  const stories = [
    { label: "Listed Today", ring: true },
    { label: "Price Drops", ring: true },
    { label: "Under $50k", ring: false },
    { label: "Verified Dealers", ring: false },
  ];

  return (
    <div className="flex gap-3 overflow-x-auto px-4 py-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      {stories.map((story) => (
        <button
          key={story.label}
          type="button"
          className="flex w-[72px] shrink-0 flex-col items-center gap-1"
        >
          <span
            className={`flex h-16 w-16 items-center justify-center rounded-full bg-zinc-200 text-xs font-semibold text-zinc-600 ${
              story.ring ? "ring-2 ring-[#0B5FFF] ring-offset-2" : ""
            }`}
          >
            TOW
          </span>
          <span className="line-clamp-2 text-center text-[11px] leading-tight text-zinc-600">
            {story.label}
          </span>
        </button>
      ))}
    </div>
  );
}

interface TopBarProps {
  savedCount?: number;
}

export function TopBar({ savedCount = 0 }: TopBarProps) {
  return (
    <header className="sticky top-0 z-40 flex h-14 items-center justify-between border-b border-zinc-100 bg-white/95 px-4 backdrop-blur-md">
      <div>
        <p className="text-lg font-bold tracking-tight text-zinc-900">TOW USA</p>
        <p className="text-[11px] text-zinc-500">New &amp; used tow trucks for sale</p>
      </div>
      <div className="flex items-center gap-1">
        <button
          type="button"
          className="flex h-11 w-11 items-center justify-center rounded-full text-zinc-700"
          aria-label="Notifications"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path
              d="M12 3a5 5 0 00-5 5v3l-1.5 3H18.5L17 11V8a5 5 0 00-5-5zM10 18a2 2 0 004 0"
              stroke="currentColor"
              strokeWidth="1.8"
            />
          </svg>
        </button>
        {savedCount > 0 && (
          <span className="rounded-full bg-zinc-100 px-3 py-1.5 text-xs font-semibold text-zinc-700">
            Saved {savedCount}
          </span>
        )}
      </div>
    </header>
  );
}

export function SegmentedControl<T extends string>({
  options,
  value,
  onChange,
}: {
  options: { value: T; label: string }[];
  value: T;
  onChange: (value: T) => void;
}) {
  return (
    <div className="flex rounded-xl bg-zinc-100 p-1">
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          onClick={() => onChange(option.value)}
          className={`flex-1 rounded-lg py-2 text-sm font-medium transition-colors ${
            value === option.value
              ? "bg-white text-zinc-900 shadow-sm"
              : "text-zinc-500"
          }`}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}

export function MobileShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto flex min-h-full w-full max-w-[430px] flex-col bg-zinc-50">
      {children}
    </div>
  );
}

export function PageContent({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex-1 pb-[calc(4rem+env(safe-area-inset-bottom,0px))]">
      {children}
    </main>
  );
}

export function useSavedListings() {
  const [savedIds, setSavedIds] = useState<string[]>(["lst-001", "lst-002", "lst-006"]);

  const toggleSave = (id: string) => {
    setSavedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );
  };

  return { savedIds, toggleSave, savedCount: savedIds.length };
}
