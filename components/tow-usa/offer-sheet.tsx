"use client";

import { useState } from "react";
import type { Listing } from "@/lib/listings/schema";
import { formatPrice } from "@/lib/listings/mock-data";

interface OfferSheetProps {
  listing: Listing | null;
  open: boolean;
  onClose: () => void;
}

function OfferForm({
  listing,
  onClose,
}: {
  listing: Listing;
  onClose: () => void;
}) {
  const [amount, setAmount] = useState(String(Math.round(listing.price * 0.95)));
  const [note, setNote] = useState("");
  const [financing, setFinancing] = useState(false);
  const [shipping, setShipping] = useState(false);
  const [warranty, setWarranty] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="mt-6 rounded-2xl bg-emerald-50 p-4 text-center">
        <p className="font-semibold text-emerald-900">Offer submitted!</p>
        <p className="mt-1 text-sm text-emerald-800">
          The seller will review your offer on TOW USA. Track it in Deals.
        </p>
        <button
          type="button"
          onClick={onClose}
          className="mt-4 h-11 w-full rounded-full bg-[#0B5FFF] text-sm font-semibold text-white"
        >
          Done
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mt-4 space-y-4">
      <div>
        <label htmlFor="offer-amount" className="text-sm font-medium text-zinc-700">
          Your offer
        </label>
        <div className="mt-1 flex items-center rounded-xl border border-zinc-200 px-4 py-3">
          <span className="text-2xl text-zinc-400">$</span>
          <input
            id="offer-amount"
            type="number"
            inputMode="numeric"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full text-3xl font-semibold text-zinc-900 outline-none"
            required
          />
        </div>
      </div>

      <div>
        <label htmlFor="offer-note" className="text-sm font-medium text-zinc-700">
          Note (optional)
        </label>
        <textarea
          id="offer-note"
          rows={3}
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Pickup timeline, trade-in, questions..."
          className="mt-1 w-full rounded-xl border border-zinc-200 px-3 py-2 text-sm outline-none focus:border-[#0B5FFF]"
        />
      </div>

      <fieldset className="space-y-2">
        <legend className="text-sm font-medium text-zinc-700">Also interested in</legend>
        {[
          { id: "fin", label: "Financing", checked: financing, set: setFinancing },
          { id: "ship", label: "Shipping quote", checked: shipping, set: setShipping },
          { id: "war", label: "Warranty", checked: warranty, set: setWarranty },
        ].map(({ id, label, checked, set }) => (
          <label key={id} className="flex min-h-11 items-center gap-3 text-sm text-zinc-700">
            <input
              type="checkbox"
              checked={checked}
              onChange={(e) => set(e.target.checked)}
              className="h-5 w-5 rounded border-zinc-300"
            />
            {label}
          </label>
        ))}
      </fieldset>

      <button
        type="submit"
        className="h-12 w-full rounded-full bg-[#0B5FFF] text-sm font-semibold text-white"
      >
        Submit Offer
      </button>
      <p className="text-center text-[11px] leading-relaxed text-zinc-500">
        Offers are sent to the seller on TOW USA. Verified buyers only. Deals completed
        here help both parties.
      </p>
    </form>
  );
}

export function OfferSheet({ listing, open, onClose }: OfferSheetProps) {
  if (!open || !listing) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-end justify-center">
      <button
        type="button"
        className="absolute inset-0 bg-black/40"
        onClick={onClose}
        aria-label="Close offer sheet"
      />
      <div
        className="relative max-h-[70vh] w-full max-w-[430px] overflow-y-auto rounded-t-[20px] bg-white px-4 pb-8 pt-4"
        style={{ paddingBottom: "calc(2rem + env(safe-area-inset-bottom, 0px))" }}
      >
        <div className="mx-auto mb-4 h-1 w-10 rounded-full bg-zinc-200" />
        <h2 className="text-lg font-semibold text-zinc-900">Make an offer</h2>
        <p className="mt-1 text-sm text-zinc-500">{listing.title}</p>
        <p className="text-sm text-zinc-500">Listed at {formatPrice(listing.price)}</p>
        <OfferForm key={listing.id} listing={listing} onClose={onClose} />
      </div>
    </div>
  );
}
