"use client";

import Link from "next/link";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { OfferSheet } from "@/components/tow-usa/offer-sheet";
import { GridCard } from "@/components/tow-usa/listing-cards";
import {
  IconBack,
  IconFinance,
  IconHeart,
  IconMapPin,
  IconMessage,
  IconShield,
  IconShip,
  IconStar,
} from "@/components/tow-usa/icons";
import { TrustBadges, TypeBadge } from "@/components/tow-usa/trust-badges";
import {
  formatMiles,
  formatPrice,
  formatRelativeTime,
  getListingById,
  mockListings,
} from "@/lib/listings/mock-data";
import type { ListingSpecs } from "@/lib/listings/schema";

function specRows(specs: ListingSpecs): { label: string; value: string }[] {
  const base = [
    { label: "Year", value: String(specs.year) },
    { label: "Brand", value: specs.brand },
    { label: "Model", value: specs.model },
    { label: "Miles", value: specs.miles.toLocaleString() },
    { label: "Condition", value: specs.condition },
  ];
  if (specs.engine) base.push({ label: "Engine", value: specs.engine });
  if (specs.transmission) base.push({ label: "Transmission", value: specs.transmission });
  if (specs.gvwr) base.push({ label: "GVWR", value: `${specs.gvwr.toLocaleString()} lbs` });

  switch (specs.truckType) {
    case "rollback":
      return [
        ...base,
        { label: "Bed length", value: `${specs.bedLengthFeet} ft` },
        { label: "Wheel lift", value: specs.wheelLift ? "Yes" : "No" },
        ...(specs.winchCapacityLbs
          ? [{ label: "Winch", value: `${specs.winchCapacityLbs.toLocaleString()} lbs` }]
          : []),
      ];
    case "wrecker":
      return [
        ...base,
        { label: "Boom capacity", value: `${specs.boomCapacityLbs.toLocaleString()} lbs` },
        { label: "Winch", value: `${specs.winchCapacityLbs.toLocaleString()} lbs` },
        { label: "Wheel lift", value: specs.wheelLift ? "Yes" : "No" },
      ];
    case "heavy-wrecker":
      return [
        ...base,
        { label: "Boom capacity", value: `${specs.boomCapacityLbs.toLocaleString()} lbs` },
        { label: "Boom length", value: `${specs.boomLengthFeet} ft` },
        { label: "Winch", value: `${specs.winchCapacityLbs.toLocaleString()} lbs` },
      ];
    case "rotator":
      return [
        ...base,
        { label: "Boom capacity", value: `${specs.boomCapacityLbs.toLocaleString()} lbs` },
        { label: "Rotation", value: `${specs.rotationDegrees}°` },
        { label: "Outriggers", value: specs.outriggers ? "Yes" : "No" },
      ];
  }
}

function AccordionSection({
  title,
  defaultOpen,
  children,
}: {
  title: string;
  defaultOpen?: boolean;
  children: React.ReactNode;
}) {
  return (
    <details open={defaultOpen} className="group border-b border-zinc-100">
      <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between px-4 py-3 text-sm font-semibold text-zinc-900 [&::-webkit-details-marker]:hidden">
        {title}
        <span className="text-zinc-400 group-open:rotate-180">▾</span>
      </summary>
      <div className="px-4 pb-4">{children}</div>
    </details>
  );
}

export default function ListingDetailPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [photoIndex, setPhotoIndex] = useState(0);
  const [saved, setSaved] = useState(false);
  const [offerOpen, setOfferOpen] = useState(searchParams.get("action") === "offer");

  const listing = getListingById(params.id);

  if (!listing) {
    return (
      <div className="mx-auto flex min-h-full max-w-[430px] flex-col items-center justify-center p-8 text-center">
        <p className="text-lg font-semibold text-zinc-900">Listing not found</p>
        <Link href="/" className="mt-4 text-[#0B5FFF]">
          Back to For You
        </Link>
      </div>
    );
  }

  const similar = mockListings
    .filter(
      (l) =>
        l.id !== listing.id && l.specs.truckType === listing.specs.truckType,
    )
    .slice(0, 4);

  const photos = listing.photos;

  return (
    <div className="mx-auto min-h-full w-full max-w-[430px] bg-white pb-[calc(4.5rem+env(safe-area-inset-bottom,0px))]">
      <div className="relative aspect-[375/300] bg-zinc-200">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={photos[photoIndex]?.url}
          alt={listing.title}
          className="h-full w-full object-cover"
        />
        <button
          type="button"
          onClick={() => router.back()}
          className="absolute left-3 top-3 flex h-11 w-11 items-center justify-center rounded-full bg-white/90 text-zinc-800 shadow"
          aria-label="Go back"
        >
          <IconBack />
        </button>
        <button
          type="button"
          onClick={() => setSaved((s) => !s)}
          className="absolute right-3 top-3 flex h-11 w-11 items-center justify-center rounded-full bg-white/90 text-zinc-800 shadow"
          aria-label="Save listing"
        >
          <IconHeart filled={saved} />
        </button>
        <span className="absolute bottom-3 right-3 rounded-full bg-black/60 px-2.5 py-1 text-xs font-medium text-white">
          {photoIndex + 1} / {photos.length}
        </span>
        {photos.length > 1 && (
          <div className="absolute inset-x-0 bottom-3 flex justify-center gap-1.5">
            {photos.slice(0, 5).map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setPhotoIndex(i)}
                className={`h-1.5 w-1.5 rounded-full ${
                  i === photoIndex ? "bg-white" : "bg-white/50"
                }`}
                aria-label={`Photo ${i + 1}`}
              />
            ))}
          </div>
        )}
      </div>

      <div className="space-y-3 px-4 py-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <TypeBadge truckType={listing.specs.truckType} />
            <h1 className="mt-2 text-[22px] font-semibold leading-7 text-zinc-900">
              {listing.title}
            </h1>
          </div>
          <p className="text-2xl font-semibold text-zinc-900">{formatPrice(listing.price)}</p>
        </div>

        <TrustBadges listing={listing} />

        <p className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-zinc-500">
          <span className="inline-flex items-center gap-1">
            <IconMapPin />
            {listing.location}
          </span>
          <span>·</span>
          <span>{formatMiles(listing.specs.miles)}</span>
          <span>·</span>
          <span>Listed {formatRelativeTime(listing.listedAt)}</span>
        </p>

        <p className="text-xs text-zinc-500">
          {listing.offerCount} offers · {listing.viewCount} views
        </p>
      </div>

      <div className="grid grid-cols-4 border-y border-zinc-100 py-3">
        {[
          { icon: IconMessage, label: "Message" },
          { icon: IconFinance, label: "Finance" },
          { icon: IconShip, label: "Ship" },
          { icon: IconShield, label: "Warranty" },
        ].map(({ icon: Icon, label }) => (
          <button
            key={label}
            type="button"
            className="flex flex-col items-center gap-1 text-[11px] font-medium text-zinc-700"
          >
            <Icon />
            {label}
          </button>
        ))}
      </div>

      <div className="divide-y divide-zinc-100">
        <AccordionSection title="Key specs" defaultOpen>
          <dl className="space-y-2">
            {specRows(listing.specs).map(({ label, value }) => (
              <div key={label} className="flex justify-between text-sm">
                <dt className="text-zinc-500">{label}</dt>
                <dd className="font-medium text-zinc-900">{value}</dd>
              </div>
            ))}
          </dl>
        </AccordionSection>

        <AccordionSection title="Condition & photos">
          <p className="text-sm text-zinc-600">{listing.description}</p>
          <div className="mt-3 grid grid-cols-3 gap-2">
            {photos.slice(0, 6).map((photo, i) => (
              <button
                key={photo.sortOrder}
                type="button"
                onClick={() => setPhotoIndex(i)}
                className="aspect-square overflow-hidden rounded-lg bg-zinc-200"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={photo.url} alt={photo.label ?? "Truck photo"} className="h-full w-full object-cover" />
              </button>
            ))}
          </div>
        </AccordionSection>

        <AccordionSection title="Seller">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-zinc-200 text-sm font-bold text-zinc-600">
              {listing.seller.businessName.slice(0, 2).toUpperCase()}
            </div>
            <div>
              <p className="font-semibold text-zinc-900">{listing.seller.businessName}</p>
              <p className="text-sm text-zinc-500">{listing.seller.name}</p>
              <p className="mt-1 flex items-center gap-1 text-xs text-zinc-500">
                <IconStar />
                {listing.seller.rating} ({listing.seller.reviewCount} reviews) · Responds in ~
                {listing.seller.responseTimeHours}h
              </p>
            </div>
          </div>
          <p className="mt-2 text-sm text-zinc-500">
            {listing.seller.listingCount} active listings
          </p>
        </AccordionSection>

        {similar.length > 0 && (
          <div className="px-4 py-4">
            <h2 className="text-sm font-semibold text-zinc-900">Similar trucks</h2>
            <div className="mt-3 flex gap-3 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {similar.map((item) => (
                <div key={item.id} className="w-[140px] shrink-0">
                  <GridCard listing={item} />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <footer
        className="fixed bottom-0 left-1/2 z-50 flex w-full max-w-[430px] -translate-x-1/2 gap-2 border-t border-zinc-200 bg-white/95 px-4 py-3 backdrop-blur-md"
        style={{ paddingBottom: "calc(0.75rem + env(safe-area-inset-bottom, 0px))" }}
      >
        <button
          type="button"
          className="flex h-11 flex-1 items-center justify-center rounded-full border border-zinc-200 text-sm font-semibold text-zinc-900"
        >
          Message
        </button>
        <button
          type="button"
          onClick={() => setOfferOpen(true)}
          className="flex h-11 flex-1 items-center justify-center rounded-full bg-[#0B5FFF] text-sm font-semibold text-white"
        >
          Make Offer
        </button>
      </footer>

      <OfferSheet
        listing={listing}
        open={offerOpen}
        onClose={() => setOfferOpen(false)}
      />
    </div>
  );
}
