"use client";

import { useMemo, useState } from "react";
import { FeedCard } from "@/components/tow-usa/listing-cards";
import { OfferSheet } from "@/components/tow-usa/offer-sheet";
import {
  PageContent,
  StoryRail,
  TopBar,
  TypeChips,
  useSavedListings,
} from "@/components/tow-usa/shared";
import { mockListings } from "@/lib/listings/mock-data";
import type { Listing, TruckType } from "@/lib/listings/schema";

function rankFeed(listings: Listing[], types: TruckType[], savedIds: string[]): Listing[] {
  let result = [...listings];

  if (types.length > 0) {
    result = result.filter((l) => types.includes(l.specs.truckType));
  }

  result.sort((a, b) => {
    let scoreA = 0;
    let scoreB = 0;
    if (a.isCompleteListing) scoreA += 20;
    if (b.isCompleteListing) scoreB += 20;
    if (a.seller.verified) scoreA += 10;
    if (b.seller.verified) scoreB += 10;
    if (savedIds.includes(a.id)) scoreA += 15;
    if (savedIds.includes(b.id)) scoreB += 15;
    scoreA += a.saveCount + a.viewCount * 0.01;
    scoreB += b.saveCount + b.viewCount * 0.01;
    return scoreB - scoreA;
  });

  return result;
}

export default function ForYouPage() {
  const { savedIds, toggleSave, savedCount } = useSavedListings();
  const [selectedTypes, setSelectedTypes] = useState<TruckType[]>([]);
  const [extraFilters, setExtraFilters] = useState<string[]>([]);
  const [offerListing, setOfferListing] = useState<Listing | null>(null);
  const [now] = useState(() => Date.now());

  const feed = useMemo(() => {
    let items = rankFeed(mockListings, selectedTypes, savedIds);
    if (extraFilters.includes("new-today")) {
      items = items.filter((l) => {
        const days = (now - new Date(l.listedAt).getTime()) / (1000 * 60 * 60 * 24);
        return days <= 1;
      });
    }
    return items;
  }, [selectedTypes, extraFilters, savedIds, now]);

  return (
    <>
      <TopBar savedCount={savedCount} />
      <PageContent>
        <div className="space-y-3 py-3">
          <TypeChips
            selected={selectedTypes}
            onChange={setSelectedTypes}
            extraSelected={extraFilters}
            onExtraChange={setExtraFilters}
          />
          <StoryRail />
          <p className="px-4 text-xs text-zinc-500">
            Recommended based on your saves and searches
          </p>
          <div className="space-y-4 pb-4">
            {feed.length === 0 ? (
              <p className="px-4 py-8 text-center text-sm text-zinc-500">
                No trucks match yet. Try Search or widen your filters.
              </p>
            ) : (
              feed.map((listing) => (
                <FeedCard
                  key={listing.id}
                  listing={listing}
                  saved={savedIds.includes(listing.id)}
                  onToggleSave={() => toggleSave(listing.id)}
                  onOffer={() => setOfferListing(listing)}
                />
              ))
            )}
          </div>
        </div>
      </PageContent>
      <OfferSheet
        listing={offerListing}
        open={offerListing !== null}
        onClose={() => setOfferListing(null)}
      />
    </>
  );
}
