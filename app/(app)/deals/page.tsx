"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { OfferStatusBadge } from "@/components/tow-usa/trust-badges";
import { IconChevronRight } from "@/components/tow-usa/icons";
import {
  PageContent,
  SegmentedControl,
  TopBar,
  useSavedListings,
} from "@/components/tow-usa/shared";
import {
  formatPrice,
  formatRelativeTime,
  getListingById,
  mockConversations,
  mockOffers,
} from "@/lib/listings/mock-data";

type DealsTab = "offers" | "messages" | "saved";

export default function DealsPage() {
  const [tab, setTab] = useState<DealsTab>("offers");
  const { savedIds } = useSavedListings();

  const savedListings = useMemo(
    () =>
      savedIds
        .map((id) => getListingById(id))
        .filter((listing): listing is NonNullable<typeof listing> => listing !== undefined),
    [savedIds],
  );

  return (
    <>
      <TopBar savedCount={savedIds.length} />
      <PageContent>
        <div className="space-y-4 px-4 py-4">
          <div>
            <h1 className="text-xl font-semibold text-zinc-900">Deals</h1>
            <p className="text-sm text-zinc-500">Offers, messages, and saved trucks</p>
          </div>

          <SegmentedControl
            options={[
              { value: "offers" as const, label: "Offers" },
              { value: "messages" as const, label: "Messages" },
              { value: "saved" as const, label: "Saved" },
            ]}
            value={tab}
            onChange={setTab}
          />

          {tab === "offers" && (
            <ul className="divide-y divide-zinc-100 overflow-hidden rounded-2xl bg-white ring-1 ring-zinc-100">
              {mockOffers.map((offer) => (
                <li key={offer.id}>
                  <Link
                    href={`/listings/${offer.listingId}`}
                    className="flex min-h-[72px] items-center gap-3 px-4 py-3"
                  >
                    <div className="h-12 w-12 shrink-0 rounded-lg bg-zinc-200" />
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-semibold text-zinc-900">
                        {offer.listingTitle}
                      </p>
                      <p className="text-sm text-zinc-600">
                        Your offer: {formatPrice(offer.amount)}
                      </p>
                      <div className="mt-1 flex items-center gap-2">
                        <OfferStatusBadge status={offer.status} />
                        <span className="text-xs text-zinc-400">
                          {formatRelativeTime(offer.createdAt)}
                        </span>
                      </div>
                    </div>
                    <IconChevronRight />
                  </Link>
                </li>
              ))}
            </ul>
          )}

          {tab === "messages" && (
            <ul className="divide-y divide-zinc-100 overflow-hidden rounded-2xl bg-white ring-1 ring-zinc-100">
              {mockConversations.map((conv) => (
                <li key={conv.id}>
                  <Link
                    href={`/listings/${conv.listingId}?action=message`}
                    className="flex min-h-[72px] items-center gap-3 px-4 py-3"
                  >
                    <div className="relative h-12 w-12 shrink-0 rounded-lg bg-zinc-200">
                      {conv.unread && (
                        <span className="absolute -right-1 -top-1 h-3 w-3 rounded-full bg-[#0B5FFF]" />
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-semibold text-zinc-900">
                        {conv.listingTitle}
                      </p>
                      <p className="truncate text-sm text-zinc-500">{conv.lastMessage}</p>
                      <p className="text-xs text-zinc-400">
                        {conv.sellerName} · {formatRelativeTime(conv.lastMessageAt)}
                      </p>
                    </div>
                    <IconChevronRight />
                  </Link>
                </li>
              ))}
            </ul>
          )}

          {tab === "saved" && (
            <ul className="divide-y divide-zinc-100 overflow-hidden rounded-2xl bg-white ring-1 ring-zinc-100">
              {savedListings.map((listing) => (
                <li key={listing.id}>
                  <Link
                    href={`/listings/${listing.id}`}
                    className="flex min-h-20 items-center gap-3 px-4 py-3"
                  >
                    <div className="h-14 w-14 shrink-0 overflow-hidden rounded-lg bg-zinc-200">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={listing.photos[0]?.url}
                        alt=""
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-semibold text-zinc-900">
                        {listing.title}
                      </p>
                      <p className="text-sm font-medium text-zinc-700">
                        {formatPrice(listing.price)}
                      </p>
                      {listing.priceReducedAt && (
                        <span className="mt-1 inline-block rounded-full bg-rose-100 px-2 py-0.5 text-xs font-semibold text-rose-800">
                          Price dropped
                        </span>
                      )}
                    </div>
                    <IconChevronRight />
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </PageContent>
    </>
  );
}
