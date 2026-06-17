export const TRUCK_TYPES = [
  "rollback",
  "wrecker",
  "heavy-wrecker",
  "rotator",
] as const;

export type TruckType = (typeof TRUCK_TYPES)[number];

export const TRUCK_TYPE_LABELS: Record<TruckType, string> = {
  rollback: "Rollback",
  wrecker: "Wrecker",
  "heavy-wrecker": "Heavy Wrecker",
  rotator: "Rotator",
};

export const TRUCK_TYPE_COLORS: Record<TruckType, string> = {
  rollback: "bg-sky-100 text-sky-800",
  wrecker: "bg-amber-100 text-amber-900",
  "heavy-wrecker": "bg-violet-100 text-violet-900",
  rotator: "bg-rose-100 text-rose-900",
};

export const TRUCK_BRANDS = [
  "Peterbilt",
  "Kenworth",
  "Freightliner",
  "International",
  "Ford",
  "Chevrolet",
  "Mack",
  "Volvo",
  "Other",
] as const;

export type TruckBrand = (typeof TRUCK_BRANDS)[number];

export type ListingCondition = "excellent" | "good" | "fair" | "needs-work";

export type OfferStatus = "pending" | "countered" | "accepted" | "declined";

export type DealStatus = "active" | "sold" | "withdrawn";

export interface ListingPhoto {
  url: string;
  label?: string;
  sortOrder: number;
}

export interface SellerProfile {
  id: string;
  name: string;
  businessName: string;
  verified: boolean;
  rating: number;
  reviewCount: number;
  responseTimeHours: number;
  location: string;
  listingCount: number;
}

export interface BaseListingSpecs {
  year: number;
  brand: TruckBrand;
  model: string;
  miles: number;
  engine?: string;
  transmission?: string;
  fuelType?: "diesel" | "gas";
  gvwr?: number;
  condition: ListingCondition;
  vin?: string;
}

export interface RollbackSpecs extends BaseListingSpecs {
  truckType: "rollback";
  bedLengthFeet: number;
  winchCapacityLbs?: number;
  wheelLift: boolean;
  bedMaterial?: "steel" | "aluminum";
}

export interface WreckerSpecs extends BaseListingSpecs {
  truckType: "wrecker";
  boomCapacityLbs: number;
  boomLengthFeet?: number;
  winchCapacityLbs: number;
  wheelLift: boolean;
}

export interface HeavyWreckerSpecs extends BaseListingSpecs {
  truckType: "heavy-wrecker";
  boomCapacityLbs: number;
  boomLengthFeet: number;
  winchCapacityLbs: number;
  underliftCapacityLbs?: number;
  wheelLift: boolean;
}

export interface RotatorSpecs extends BaseListingSpecs {
  truckType: "rotator";
  boomCapacityLbs: number;
  boomLengthFeet: number;
  rotationDegrees: number;
  winchCapacityLbs: number;
  outriggers: boolean;
}

export type ListingSpecs =
  | RollbackSpecs
  | WreckerSpecs
  | HeavyWreckerSpecs
  | RotatorSpecs;

export interface Listing {
  id: string;
  title: string;
  price: number;
  location: string;
  state: string;
  latitude: number;
  longitude: number;
  photos: ListingPhoto[];
  specs: ListingSpecs;
  description: string;
  seller: SellerProfile;
  status: DealStatus;
  listedAt: string;
  updatedAt: string;
  saveCount: number;
  viewCount: number;
  offerCount: number;
  priceReducedAt?: string;
  completenessScore: number;
  isCompleteListing: boolean;
}

export interface SavedListing {
  listingId: string;
  savedAt: string;
  priceAtSave: number;
}

export interface Offer {
  id: string;
  listingId: string;
  listingTitle: string;
  amount: number;
  status: OfferStatus;
  direction: "sent" | "received";
  createdAt: string;
  wantsFinancing: boolean;
  wantsShipping: boolean;
  wantsWarranty: boolean;
  note?: string;
}

export interface Conversation {
  id: string;
  listingId: string;
  listingTitle: string;
  sellerName: string;
  lastMessage: string;
  lastMessageAt: string;
  unread: boolean;
}

export interface SearchFilters {
  truckTypes: TruckType[];
  minPrice?: number;
  maxPrice?: number;
  brands: TruckBrand[];
  maxMiles?: number;
  verifiedOnly: boolean;
  completeOnly: boolean;
  query?: string;
}

export const REQUIRED_PHOTOS_MIN = 8;
export const COMPLETE_PHOTOS_MIN = 15;

export const REQUIRED_FIELDS_BY_TYPE: Record<TruckType, readonly string[]> = {
  rollback: [
    "year",
    "brand",
    "model",
    "miles",
    "condition",
    "bedLengthFeet",
    "wheelLift",
  ],
  wrecker: [
    "year",
    "brand",
    "model",
    "miles",
    "condition",
    "boomCapacityLbs",
    "winchCapacityLbs",
    "wheelLift",
  ],
  "heavy-wrecker": [
    "year",
    "brand",
    "model",
    "miles",
    "condition",
    "boomCapacityLbs",
    "boomLengthFeet",
    "winchCapacityLbs",
    "wheelLift",
  ],
  rotator: [
    "year",
    "brand",
    "model",
    "miles",
    "condition",
    "boomCapacityLbs",
    "boomLengthFeet",
    "rotationDegrees",
    "winchCapacityLbs",
    "outriggers",
  ],
};

export const RECOMMENDED_PHOTO_LABELS = [
  "Front",
  "Driver side",
  "Passenger side",
  "Rear / bed",
  "Cab interior",
  "Engine bay",
  "Winch / boom",
  "Undercarriage",
] as const;
