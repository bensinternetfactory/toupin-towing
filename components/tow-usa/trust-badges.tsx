import {
  TRUCK_TYPE_COLORS,
  TRUCK_TYPE_LABELS,
  type Listing,
} from "@/lib/listings/schema";
import { IconCheck, IconStar } from "./icons";

interface TrustBadgesProps {
  listing: Listing;
  compact?: boolean;
}

export function TrustBadges({ listing, compact }: TrustBadgesProps) {
  const { seller, isCompleteListing } = listing;

  return (
    <div className={`flex flex-wrap items-center gap-1.5 ${compact ? "text-[10px]" : "text-[11px]"}`}>
      {seller.verified && (
        <span className="inline-flex items-center gap-0.5 rounded-full bg-emerald-50 px-2 py-0.5 font-semibold uppercase tracking-wide text-emerald-800">
          <IconCheck />
          Verified
        </span>
      )}
      {seller.reviewCount > 0 && (
        <span className="inline-flex items-center gap-0.5 rounded-full bg-amber-50 px-2 py-0.5 font-semibold text-amber-900">
          <IconStar />
          {seller.rating.toFixed(1)}
        </span>
      )}
      {isCompleteListing && (
        <span className="inline-flex items-center gap-0.5 rounded-full bg-blue-50 px-2 py-0.5 font-semibold uppercase tracking-wide text-blue-800">
          Complete
        </span>
      )}
    </div>
  );
}

export function TypeBadge({ truckType }: { truckType: Listing["specs"]["truckType"] }) {
  return (
    <span
      className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${TRUCK_TYPE_COLORS[truckType]}`}
    >
      {TRUCK_TYPE_LABELS[truckType]}
    </span>
  );
}

export function OfferStatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    pending: "bg-amber-100 text-amber-900",
    countered: "bg-blue-100 text-blue-900",
    accepted: "bg-emerald-100 text-emerald-900",
    declined: "bg-zinc-100 text-zinc-600",
  };

  return (
    <span
      className={`rounded-full px-2 py-0.5 text-xs font-semibold capitalize ${styles[status] ?? styles.pending}`}
    >
      {status}
    </span>
  );
}
