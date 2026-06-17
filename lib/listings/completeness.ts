import {
  COMPLETE_PHOTOS_MIN,
  Listing,
  ListingSpecs,
  REQUIRED_FIELDS_BY_TYPE,
  REQUIRED_PHOTOS_MIN,
  TruckType,
} from "./schema";

function isFilled(value: unknown): boolean {
  if (value === undefined || value === null) return false;
  if (typeof value === "string") return value.trim().length > 0;
  if (typeof value === "number") return !Number.isNaN(value);
  if (typeof value === "boolean") return true;
  return true;
}

export function calculateCompletenessScore(
  specs: ListingSpecs,
  photoCount: number,
  description: string,
): number {
  const truckType = specs.truckType;
  const required = REQUIRED_FIELDS_BY_TYPE[truckType];
  const filledRequired = required.filter((field) =>
    isFilled(specs[field as keyof ListingSpecs]),
  ).length;
  const requiredScore = (filledRequired / required.length) * 40;

  let photoScore = 0;
  if (photoCount >= COMPLETE_PHOTOS_MIN) photoScore = 30;
  else if (photoCount >= REQUIRED_PHOTOS_MIN) photoScore = 20;
  else if (photoCount >= 4) photoScore = 10;

  const optionalFields: (keyof ListingSpecs)[] = [
    "engine",
    "transmission",
    "fuelType",
    "gvwr",
    "vin",
  ];
  const filledOptional = optionalFields.filter((field) =>
    isFilled(specs[field as keyof ListingSpecs]),
  ).length;
  const optionalScore = (filledOptional / optionalFields.length) * 15;

  const descriptionScore =
    description.trim().length >= 120
      ? 15
      : description.trim().length >= 40
        ? 8
        : 0;

  return Math.round(
    requiredScore + photoScore + optionalScore + descriptionScore,
  );
}

export function isCompleteListing(
  specs: ListingSpecs,
  photoCount: number,
  description: string,
): boolean {
  return (
    calculateCompletenessScore(specs, photoCount, description) >= 85 &&
    photoCount >= COMPLETE_PHOTOS_MIN
  );
}

export function completenessHint(listing: Listing): string | null {
  if (listing.isCompleteListing) return null;

  const missing: string[] = [];
  const required = REQUIRED_FIELDS_BY_TYPE[listing.specs.truckType];
  for (const field of required) {
    if (!isFilled(listing.specs[field as keyof ListingSpecs])) {
      missing.push(humanizeField(field));
    }
  }
  if (listing.photos.length < COMPLETE_PHOTOS_MIN) {
    missing.push(`${COMPLETE_PHOTOS_MIN - listing.photos.length} more photos`);
  }
  if (listing.description.trim().length < 120) {
    missing.push("longer description");
  }

  if (missing.length === 0) return null;
  return `Add ${missing.slice(0, 2).join(" and ")} to rank higher`;
}

function humanizeField(field: string): string {
  const labels: Record<string, string> = {
    bedLengthFeet: "bed length",
    boomCapacityLbs: "boom capacity",
    boomLengthFeet: "boom length",
    winchCapacityLbs: "winch capacity",
    rotationDegrees: "rotation degrees",
    wheelLift: "wheel lift info",
    outriggers: "outrigger info",
  };
  return labels[field] ?? field;
}

export function getTypeLabel(type: TruckType): string {
  return type
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}
