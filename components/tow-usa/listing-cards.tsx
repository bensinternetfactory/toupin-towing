"use client";

import Link from "next/link";
import type { Listing } from "@/lib/listings/schema";
import { formatMiles, formatPrice } from "@/lib/listings/mock-data";
import { IconHeart, IconMapPin } from "./icons";
import { TrustBadges, TypeBadge } from "./trust-badges";

interface FeedCardProps {
  listing: Listing;
  saved: boolean;
  onToggleSave: () => void;
  onOffer: () => void;
}

export function FeedCard({ listing, saved, onToggleSave, onOffer }: FeedCardProps) {
  const hero = listing.photos[0]?.url;

  return (
    <article className="mx-4 overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-zinc-100">
      <Link href={`/listings/${listing.id}`} className="block">
        <div className="relative aspect-[343/280] w-full bg-zinc-200">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={hero}
            alt={listing.title}
            className="h-full w-full object-cover"
          />
          {listing.priceReducedAt && (
            <span className="absolute left-3 top-3 rounded-full bg-rose-600 px-2.5 py-1 text-xs font-semibold text-white">
              Price drop
            </span>
          )}
        </div>
      </Link>

      <div className="space-y-3 p-4">
        <div className="flex items-start justify-between gap-2">
          <TypeBadge truckType={listing.specs.truckType} />
          <button
            type="button"
            onClick={onToggleSave}
            className={`flex h-11 w-11 items-center justify-center rounded-full ${
              saved ? "text-rose-500" : "text-zinc-400"
            }`}
            aria-label={saved ? "Unsave listing" : "Save listing"}
          >
            <IconHeart filled={saved} />
          </button>
        </div>

        <Link href={`/listings/${listing.id}`} className="block space-y-1">
          <h2 className="text-base font-semibold text-zinc-900">{listing.title}</h2>
          <p className="text-2xl font-semibold text-zinc-900">{formatPrice(listing.price)}</p>
          <p className="flex items-center gap-1 text-sm text-zinc-500">
            <IconMapPin />
            {formatMiles(listing.specs.miles)} · {listing.location}
          </p>
        </Link>

        <TrustBadges listing={listing} />

        {listing.saveCount > 10 && (
          <p className="text-xs text-zinc-500">{listing.saveCount} saves this week</p>
        )}

        <div className="flex gap-2">
          <button
            type="button"
            onClick={onOffer}
            className="flex h-11 flex-1 items-center justify-center rounded-full bg-[#0B5FFF] text-sm font-semibold text-white"
          >
            Offer
          </button>
          <Link
            href={`/listings/${listing.id}?action=message`}
            className="flex h-11 flex-1 items-center justify-center rounded-full border border-zinc-200 text-sm font-semibold text-zinc-900"
          >
            Message
          </Link>
        </div>
      </div>
    </article>
  );
}

interface GridCardProps {
  listing: Listing;
}

export function GridCard({ listing }: GridCardProps) {
  const hero = listing.photos[0]?.url;

  return (
    <Link
      href={`/listings/${listing.id}`}
      className="overflow-hidden rounded-2xl bg-white ring-1 ring-zinc-100"
    >
      <div className="aspect-[167/120] bg-zinc-200">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={hero} alt={listing.title} className="h-full w-full object-cover" />
      </div>
      <div className="space-y-1 p-2.5">
        <p className="text-base font-semibold text-zinc-900">{formatPrice(listing.price)}</p>
        <p className="text-xs font-medium text-zinc-700">
          &apos;{String(listing.specs.year).slice(-2)} {listing.specs.brand}
        </p>
        <p className="text-xs text-zinc-500">{formatMiles(listing.specs.miles)}</p>
        <TypeBadge truckType={listing.specs.truckType} />
      </div>
    </Link>
  );
}
