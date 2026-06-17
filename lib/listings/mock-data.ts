import { calculateCompletenessScore, isCompleteListing } from "./completeness";
import type { Conversation, Listing, Offer } from "./schema";

const sellers = {
  atlas: {
    id: "seller-atlas",
    name: "Mike Torres",
    businessName: "Atlas Towing & Recovery",
    verified: true,
    rating: 4.9,
    reviewCount: 12,
    responseTimeHours: 2,
    location: "Dallas, TX",
    listingCount: 8,
  },
  midwest: {
    id: "seller-midwest",
    name: "Sarah Chen",
    businessName: "Midwest Wrecker Sales",
    verified: true,
    rating: 4.7,
    reviewCount: 31,
    responseTimeHours: 4,
    location: "Columbus, OH",
    listingCount: 22,
  },
  gulf: {
    id: "seller-gulf",
    name: "James Whitfield",
    businessName: "Gulf Coast Rotators",
    verified: true,
    rating: 5,
    reviewCount: 8,
    responseTimeHours: 1,
    location: "Houston, TX",
    listingCount: 5,
  },
  owner: {
    id: "seller-owner",
    name: "Tom Bradley",
    businessName: "Bradley Recovery",
    verified: false,
    rating: 4.2,
    reviewCount: 3,
    responseTimeHours: 12,
    location: "Phoenix, AZ",
    listingCount: 1,
  },
} as const;

function buildListing(partial: Omit<Listing, "completenessScore" | "isCompleteListing">): Listing {
  const completenessScore = calculateCompletenessScore(
    partial.specs,
    partial.photos.length,
    partial.description,
  );
  return {
    ...partial,
    completenessScore,
    isCompleteListing: isCompleteListing(
      partial.specs,
      partial.photos.length,
      partial.description,
    ),
  };
}

const photo = (label: string, sortOrder: number) => ({
  url: `https://images.unsplash.com/photo-1601584114967-9024747cc32d?auto=format&fit=crop&w=800&q=80&sig=${sortOrder}`,
  label,
  sortOrder,
});

export const mockListings: Listing[] = [
  buildListing({
    id: "lst-001",
    title: "2019 Peterbilt 567 Rollback",
    price: 89500,
    location: "Dallas, TX",
    state: "TX",
    latitude: 32.7767,
    longitude: -96.797,
    photos: Array.from({ length: 18 }, (_, i) => photo("Exterior", i + 1)),
    specs: {
      truckType: "rollback",
      year: 2019,
      brand: "Peterbilt",
      model: "567",
      miles: 142000,
      condition: "good",
      engine: "PACCAR MX-13",
      transmission: "Allison 4500 RDS",
      fuelType: "diesel",
      gvwr: 52000,
      bedLengthFeet: 40,
      winchCapacityLbs: 12000,
      wheelLift: true,
      bedMaterial: "steel",
      vin: "1XPWD40X9KD123456",
    },
    description:
      "Well-maintained rollback with strong winch and wheel lift. Recently serviced, ready for daily calls. Complete photo set and maintenance records available.",
    seller: sellers.atlas,
    status: "active",
    listedAt: "2026-06-14T10:00:00Z",
    updatedAt: "2026-06-16T08:00:00Z",
    saveCount: 24,
    viewCount: 312,
    offerCount: 2,
    priceReducedAt: "2026-06-15T12:00:00Z",
  }),
  buildListing({
    id: "lst-002",
    title: "2021 Kenworth T880 Rotator",
    price: 385000,
    location: "Houston, TX",
    state: "TX",
    latitude: 29.7604,
    longitude: -95.3698,
    photos: Array.from({ length: 20 }, (_, i) => photo("Rotator", i + 1)),
    specs: {
      truckType: "rotator",
      year: 2021,
      brand: "Kenworth",
      model: "T880",
      miles: 89000,
      condition: "excellent",
      engine: "Cummins X15",
      transmission: "Allison 4700",
      fuelType: "diesel",
      boomCapacityLbs: 75000,
      boomLengthFeet: 50,
      rotationDegrees: 360,
      winchCapacityLbs: 30000,
      outriggers: true,
    },
    description:
      "Top-tier rotator setup with full rotation and outriggers. Low miles, dealer-maintained. Ideal for heavy recovery routes along the Gulf.",
    seller: sellers.gulf,
    status: "active",
    listedAt: "2026-06-10T14:00:00Z",
    updatedAt: "2026-06-10T14:00:00Z",
    saveCount: 41,
    viewCount: 890,
    offerCount: 5,
  }),
  buildListing({
    id: "lst-003",
    title: "2017 Freightliner M2 Wrecker",
    price: 62000,
    location: "Columbus, OH",
    state: "OH",
    latitude: 39.9612,
    longitude: -82.9988,
    photos: Array.from({ length: 12 }, (_, i) => photo("Wrecker", i + 1)),
    specs: {
      truckType: "wrecker",
      year: 2017,
      brand: "Freightliner",
      model: "M2 106",
      miles: 198000,
      condition: "good",
      engine: "Cummins ISB 6.7",
      transmission: "Allison 3000",
      fuelType: "diesel",
      boomCapacityLbs: 12000,
      boomLengthFeet: 22,
      winchCapacityLbs: 15000,
      wheelLift: true,
    },
    description:
      "Reliable light-duty wrecker for city work. Strong boom and winch, wheel lift included. Priced to move.",
    seller: sellers.midwest,
    status: "active",
    listedAt: "2026-06-12T09:00:00Z",
    updatedAt: "2026-06-12T09:00:00Z",
    saveCount: 11,
    viewCount: 156,
    offerCount: 1,
  }),
  buildListing({
    id: "lst-004",
    title: "2020 International HV513 Heavy Wrecker",
    price: 215000,
    location: "Atlanta, GA",
    state: "GA",
    latitude: 33.749,
    longitude: -84.388,
    photos: Array.from({ length: 16 }, (_, i) => photo("Heavy", i + 1)),
    specs: {
      truckType: "heavy-wrecker",
      year: 2020,
      brand: "International",
      model: "HV513",
      miles: 121000,
      condition: "excellent",
      engine: "Cummins X15",
      transmission: "Allison 4500",
      fuelType: "diesel",
      gvwr: 68000,
      boomCapacityLbs: 50000,
      boomLengthFeet: 40,
      winchCapacityLbs: 25000,
      underliftCapacityLbs: 35000,
      wheelLift: false,
    },
    description:
      "Heavy wrecker configured for interstate recovery. Underlift package, strong winch line, clean interior.",
    seller: sellers.midwest,
    status: "active",
    listedAt: "2026-06-08T11:00:00Z",
    updatedAt: "2026-06-08T11:00:00Z",
    saveCount: 18,
    viewCount: 445,
    offerCount: 3,
  }),
  buildListing({
    id: "lst-005",
    title: "2015 Ford F-650 Rollback",
    price: 48500,
    location: "Phoenix, AZ",
    state: "AZ",
    latitude: 33.4484,
    longitude: -112.074,
    photos: Array.from({ length: 6 }, (_, i) => photo("Rollback", i + 1)),
    specs: {
      truckType: "rollback",
      year: 2015,
      brand: "Ford",
      model: "F-650",
      miles: 167000,
      condition: "fair",
      bedLengthFeet: 32,
      wheelLift: false,
    },
    description: "Budget rollback for a small operator getting started.",
    seller: sellers.owner,
    status: "active",
    listedAt: "2026-06-16T16:00:00Z",
    updatedAt: "2026-06-16T16:00:00Z",
    saveCount: 4,
    viewCount: 67,
    offerCount: 0,
  }),
  buildListing({
    id: "lst-006",
    title: "2022 Peterbilt 389 Wrecker",
    price: 148000,
    location: "Denver, CO",
    state: "CO",
    latitude: 39.7392,
    longitude: -104.9903,
    photos: Array.from({ length: 15 }, (_, i) => photo("Wrecker", i + 1)),
    specs: {
      truckType: "wrecker",
      year: 2022,
      brand: "Peterbilt",
      model: "389",
      miles: 54000,
      condition: "excellent",
      engine: "PACCAR MX-13",
      transmission: "Eaton Fuller",
      fuelType: "diesel",
      boomCapacityLbs: 20000,
      boomLengthFeet: 28,
      winchCapacityLbs: 20000,
      wheelLift: true,
    },
    description:
      "Low-mile wrecker with modern cab comforts. Full maintenance history. Ready for immediate deployment.",
    seller: sellers.atlas,
    status: "active",
    listedAt: "2026-06-15T08:00:00Z",
    updatedAt: "2026-06-15T08:00:00Z",
    saveCount: 29,
    viewCount: 521,
    offerCount: 4,
  }),
];

export const mockOffers: Offer[] = [
  {
    id: "off-001",
    listingId: "lst-001",
    listingTitle: "2019 Peterbilt 567 Rollback",
    amount: 85000,
    status: "pending",
    direction: "sent",
    createdAt: "2026-06-16T14:00:00Z",
    wantsFinancing: true,
    wantsShipping: false,
    wantsWarranty: true,
  },
  {
    id: "off-002",
    listingId: "lst-002",
    listingTitle: "2021 Kenworth T880 Rotator",
    amount: 365000,
    status: "countered",
    direction: "sent",
    createdAt: "2026-06-15T10:00:00Z",
    wantsFinancing: true,
    wantsShipping: true,
    wantsWarranty: false,
    note: "Can close within 2 weeks",
  },
];

export const mockConversations: Conversation[] = [
  {
    id: "conv-001",
    listingId: "lst-003",
    listingTitle: "2017 Freightliner M2 Wrecker",
    sellerName: "Midwest Wrecker Sales",
    lastMessage: "Yes, still available. Can you pick up this week?",
    lastMessageAt: "2026-06-16T18:30:00Z",
    unread: true,
  },
  {
    id: "conv-002",
    listingId: "lst-001",
    listingTitle: "2019 Peterbilt 567 Rollback",
    sellerName: "Atlas Towing & Recovery",
    lastMessage: "Thanks for your offer — reviewing with my partner.",
    lastMessageAt: "2026-06-16T12:00:00Z",
    unread: false,
  },
];

export function getListingById(id: string): Listing | undefined {
  return mockListings.find((listing) => listing.id === id);
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(price);
}

export function formatMiles(miles: number): string {
  if (miles >= 1000) {
    return `${Math.round(miles / 1000)}k mi`;
  }
  return `${miles} mi`;
}

export function formatRelativeTime(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const hours = Math.floor(diff / (1000 * 60 * 60));
  if (hours < 1) return "Just now";
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days === 1) return "1 day ago";
  return `${days} days ago`;
}
