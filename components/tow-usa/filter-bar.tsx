"use client";

import { TRUCK_BRANDS, type SearchFilters, type TruckBrand, type TruckType } from "@/lib/listings/schema";
import { TypeChips } from "./shared";

const PRICE_PRESETS = [
  { label: "Any", min: undefined, max: undefined },
  { label: "Under $50k", min: undefined, max: 50000 },
  { label: "$50–100k", min: 50000, max: 100000 },
  { label: "$100–200k", min: 100000, max: 200000 },
  { label: "$200k+", min: 200000, max: undefined },
] as const;

interface FilterBarProps {
  filters: SearchFilters;
  onChange: (filters: SearchFilters) => void;
  resultCount: number;
}

export function FilterBar({ filters, onChange, resultCount }: FilterBarProps) {
  const toggleBrand = (brand: TruckBrand) => {
    const brands = filters.brands.includes(brand)
      ? filters.brands.filter((b) => b !== brand)
      : [...filters.brands, brand];
    onChange({ ...filters, brands });
  };

  const setPricePreset = (min?: number, max?: number) => {
    onChange({ ...filters, minPrice: min, maxPrice: max });
  };

  const isPriceActive = (min?: number, max?: number) =>
    filters.minPrice === min && filters.maxPrice === max;

  return (
    <div className="sticky top-0 z-30 space-y-3 border-b border-zinc-100 bg-white pb-3 pt-2">
      <TypeChips
        selected={filters.truckTypes}
        onChange={(truckTypes: TruckType[]) => onChange({ ...filters, truckTypes })}
      />

      <div className="space-y-2 px-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">Price</p>
        <div className="flex gap-2 overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {PRICE_PRESETS.map((preset) => (
            <button
              key={preset.label}
              type="button"
              onClick={() => setPricePreset(preset.min, preset.max)}
              className={`h-9 shrink-0 rounded-full px-3 text-sm font-medium ${
                isPriceActive(preset.min, preset.max)
                  ? "bg-[#0B5FFF] text-white"
                  : "bg-zinc-100 text-zinc-800"
              }`}
            >
              {preset.label}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-2 px-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">Brand</p>
        <div className="flex gap-2 overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {TRUCK_BRANDS.slice(0, 7).map((brand) => (
            <button
              key={brand}
              type="button"
              onClick={() => toggleBrand(brand)}
              className={`h-9 shrink-0 rounded-full px-3 text-sm font-medium ${
                filters.brands.includes(brand)
                  ? "bg-[#0B5FFF] text-white"
                  : "bg-zinc-100 text-zinc-800"
              }`}
            >
              {brand}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-2 px-4">
        <div className="flex items-center justify-between">
          <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
            Max miles
          </p>
          <span className="text-sm font-medium text-zinc-700">
            {filters.maxMiles ? `${Math.round(filters.maxMiles / 1000)}k` : "Any"}
          </span>
        </div>
        <input
          type="range"
          min={50000}
          max={500000}
          step={10000}
          value={filters.maxMiles ?? 500000}
          onChange={(e) =>
            onChange({
              ...filters,
              maxMiles: Number(e.target.value) >= 500000 ? undefined : Number(e.target.value),
            })
          }
          className="w-full accent-[#0B5FFF]"
        />
      </div>

      <div className="space-y-2 px-4">
        {[
          { key: "verifiedOnly" as const, label: "Verified sellers only" },
          { key: "completeOnly" as const, label: "Complete listings only" },
        ].map(({ key, label }) => (
          <label
            key={key}
            className="flex min-h-11 items-center justify-between text-sm text-zinc-800"
          >
            {label}
            <input
              type="checkbox"
              checked={filters[key]}
              onChange={(e) => onChange({ ...filters, [key]: e.target.checked })}
              className="h-5 w-5 rounded accent-[#0B5FFF]"
            />
          </label>
        ))}
      </div>

      <p className="px-4 text-sm font-medium text-zinc-600">{resultCount} trucks</p>
    </div>
  );
}

export function filterListings<T extends { specs: { truckType: TruckType; brand: TruckBrand; miles: number }; price: number; seller: { verified: boolean }; isCompleteListing: boolean }>(
  listings: T[],
  filters: SearchFilters,
): T[] {
  return listings.filter((listing) => {
    if (
      filters.truckTypes.length > 0 &&
      !filters.truckTypes.includes(listing.specs.truckType)
    ) {
      return false;
    }
    if (filters.minPrice !== undefined && listing.price < filters.minPrice) return false;
    if (filters.maxPrice !== undefined && listing.price > filters.maxPrice) return false;
    if (filters.brands.length > 0 && !filters.brands.includes(listing.specs.brand)) {
      return false;
    }
    if (filters.maxMiles !== undefined && listing.specs.miles > filters.maxMiles) {
      return false;
    }
    if (filters.verifiedOnly && !listing.seller.verified) return false;
    if (filters.completeOnly && !listing.isCompleteListing) return false;
    return true;
  });
}
