"use client";

import { useState } from "react";
import {
  TRUCK_TYPES,
  TRUCK_TYPE_LABELS,
  type TruckType,
} from "@/lib/listings/schema";
import { PageContent, TopBar } from "@/components/tow-usa/shared";

const STEPS = ["Basics", "Photos", "Specs", "Publish"] as const;

export default function SellPage() {
  const [step, setStep] = useState(0);
  const [truckType, setTruckType] = useState<TruckType>("rollback");
  const [photoCount, setPhotoCount] = useState(6);
  const completeness = Math.min(100, 30 + photoCount * 3 + (step >= 2 ? 25 : 0));

  return (
    <>
      <TopBar />
      <PageContent>
        <div className="px-4 py-4">
          <div className="mb-4 h-1 overflow-hidden rounded-full bg-zinc-200">
            <div
              className="h-full bg-[#0B5FFF] transition-all"
              style={{ width: `${((step + 1) / STEPS.length) * 100}%` }}
            />
          </div>
          <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
            Step {step + 1} of {STEPS.length} — {STEPS[step]}
          </p>
          <h1 className="mt-1 text-xl font-semibold text-zinc-900">List your truck free</h1>

          <div className="mt-4 rounded-2xl bg-white p-4 ring-1 ring-zinc-100">
            {step === 0 && (
              <div className="space-y-4">
                <fieldset>
                  <legend className="text-sm font-medium text-zinc-700">Truck type</legend>
                  <div className="mt-2 grid grid-cols-2 gap-2">
                    {TRUCK_TYPES.map((type) => (
                      <button
                        key={type}
                        type="button"
                        onClick={() => setTruckType(type)}
                        className={`h-11 rounded-xl text-sm font-medium ${
                          truckType === type
                            ? "bg-[#0B5FFF] text-white"
                            : "bg-zinc-100 text-zinc-800"
                        }`}
                      >
                        {TRUCK_TYPE_LABELS[type]}
                      </button>
                    ))}
                  </div>
                </fieldset>
                {[
                  { label: "Year", placeholder: "2019" },
                  { label: "Brand", placeholder: "Peterbilt" },
                  { label: "Model", placeholder: "567" },
                  { label: "Miles", placeholder: "142000" },
                  { label: "Price", placeholder: "89500" },
                  { label: "City, State", placeholder: "Dallas, TX" },
                ].map((field) => (
                  <label key={field.label} className="block">
                    <span className="text-sm font-medium text-zinc-700">{field.label}</span>
                    <input
                      placeholder={field.placeholder}
                      className="mt-1 h-11 w-full rounded-xl border border-zinc-200 px-3 text-sm outline-none focus:border-[#0B5FFF]"
                    />
                  </label>
                ))}
              </div>
            )}

            {step === 1 && (
              <div className="space-y-4">
                <p className="text-sm text-zinc-600">
                  Minimum 8 photos to publish. Add 15+ for a Complete Listing badge and
                  higher search ranking.
                </p>
                <div className="grid grid-cols-3 gap-2">
                  {Array.from({ length: 9 }).map((_, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setPhotoCount((c) => Math.min(18, c + 1))}
                      className="flex aspect-square items-center justify-center rounded-xl bg-zinc-100 text-xs text-zinc-500"
                    >
                      {i < photoCount ? "Photo" : "+ Add"}
                    </button>
                  ))}
                </div>
                <p className="text-sm font-medium text-zinc-700">{photoCount} photos added</p>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-4">
                <p className="text-sm text-zinc-600">
                  {TRUCK_TYPE_LABELS[truckType]}-specific specs help buyers filter and trust
                  your listing.
                </p>
                {truckType === "rollback" &&
                  ["Bed length (ft)", "Winch capacity (lbs)", "Wheel lift (yes/no)"].map(
                    (label) => (
                      <label key={label} className="block">
                        <span className="text-sm font-medium text-zinc-700">{label}</span>
                        <input className="mt-1 h-11 w-full rounded-xl border border-zinc-200 px-3 text-sm outline-none focus:border-[#0B5FFF]" />
                      </label>
                    ),
                  )}
                {truckType !== "rollback" &&
                  ["Boom capacity (lbs)", "Winch capacity (lbs)", "Boom length (ft)"].map(
                    (label) => (
                      <label key={label} className="block">
                        <span className="text-sm font-medium text-zinc-700">{label}</span>
                        <input className="mt-1 h-11 w-full rounded-xl border border-zinc-200 px-3 text-sm outline-none focus:border-[#0B5FFF]" />
                      </label>
                    ),
                  )}
                <label className="block">
                  <span className="text-sm font-medium text-zinc-700">Description</span>
                  <textarea
                    rows={4}
                    placeholder="Condition, maintenance, why you're selling..."
                    className="mt-1 w-full rounded-xl border border-zinc-200 px-3 py-2 text-sm outline-none focus:border-[#0B5FFF]"
                  />
                </label>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-4 text-center">
                <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-zinc-100">
                  <span className="text-2xl font-bold text-[#0B5FFF]">{completeness}%</span>
                </div>
                <p className="text-sm text-zinc-600">
                  {completeness < 85
                    ? "Your listing is incomplete — add winch specs and more photos to rank higher."
                    : "Your listing qualifies for Complete Listing badge!"}
                </p>
                <label className="block text-left">
                  <span className="text-sm font-medium text-zinc-700">Verify phone</span>
                  <input
                    placeholder="(555) 555-0100"
                    className="mt-1 h-11 w-full rounded-xl border border-zinc-200 px-3 text-sm outline-none focus:border-[#0B5FFF]"
                  />
                </label>
              </div>
            )}
          </div>

          <div className="mt-4 flex gap-2">
            {step > 0 && (
              <button
                type="button"
                onClick={() => setStep((s) => s - 1)}
                className="h-12 flex-1 rounded-full border border-zinc-200 text-sm font-semibold text-zinc-800"
              >
                Back
              </button>
            )}
            <button
              type="button"
              onClick={() => setStep((s) => Math.min(STEPS.length - 1, s + 1))}
              className="h-12 flex-1 rounded-full bg-[#0B5FFF] text-sm font-semibold text-white"
            >
              {step === STEPS.length - 1 ? "Publish listing" : "Continue"}
            </button>
          </div>
        </div>
      </PageContent>
    </>
  );
}
