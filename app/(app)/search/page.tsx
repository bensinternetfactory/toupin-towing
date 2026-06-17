"use client";

import { useMemo, useState } from "react";
import { FilterBar, filterListings } from "@/components/tow-usa/filter-bar";
import { GridCard } from "@/components/tow-usa/listing-cards";
import { PageContent, TopBar } from "@/components/tow-usa/shared";
import { mockListings } from "@/lib/listings/mock-data";
import type { SearchFilters } from "@/lib/listings/schema";

const defaultFilters: SearchFilters = {
  truckTypes: [],
  brands: [],
  verifiedOnly: false,
  completeOnly: false,
};

export default function SearchPage() {
  const [filters, setFilters] = useState<SearchFilters>(defaultFilters);
  const [view, setView] = useState<"grid" | "list">("grid");

  const results = useMemo(
    () => filterListings(mockListings, filters),
    [filters],
  );

  return (
    <>
      <TopBar />
      <PageContent>
        <FilterBar
          filters={filters}
          onChange={setFilters}
          resultCount={results.length}
        />
        <div className="flex items-center justify-between px-4 py-2">
          <span className="text-sm text-zinc-500">Results</span>
          <div className="flex rounded-lg bg-zinc-100 p-0.5">
            {(["grid", "list"] as const).map((mode) => (
              <button
                key={mode}
                type="button"
                onClick={() => setView(mode)}
                className={`rounded-md px-3 py-1.5 text-xs font-medium capitalize ${
                  view === mode ? "bg-white shadow-sm" : "text-zinc-500"
                }`}
              >
                {mode}
              </button>
            ))}
          </div>
        </div>
        {view === "grid" ? (
          <div className="grid grid-cols-2 gap-3 px-4 pb-4">
            {results.map((listing) => (
              <GridCard key={listing.id} listing={listing} />
            ))}
          </div>
        ) : (
          <div className="space-y-3 px-4 pb-4">
            {results.map((listing) => (
              <GridCard key={listing.id} listing={listing} />
            ))}
          </div>
        )}
      </PageContent>
    </>
  );
}
