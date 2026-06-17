# TOW USA — Listing Spec Schema

Canonical field requirements for listings, completeness scoring, and search filters.

## Truck types

| Type ID | Label | Color token |
|---------|-------|---------------|
| `rollback` | Rollback | sky |
| `wrecker` | Wrecker | amber |
| `heavy-wrecker` | Heavy Wrecker | violet |
| `rotator` | Rotator | rose |

## Base fields (all types)

| Field | Type | Required | Search filter |
|-------|------|----------|---------------|
| `year` | number | yes | no |
| `brand` | enum | yes | yes |
| `model` | string | yes | no |
| `miles` | number | yes | yes (max) |
| `condition` | excellent \| good \| fair \| needs-work | yes | no |
| `engine` | string | no | no |
| `transmission` | string | no | no |
| `fuelType` | diesel \| gas | no | no |
| `gvwr` | number (lbs) | no | no |
| `vin` | string | no | no |

## Type-specific required fields

### Rollback

| Field | Type | Required |
|-------|------|----------|
| `bedLengthFeet` | number | yes |
| `wheelLift` | boolean | yes |
| `winchCapacityLbs` | number | no |
| `bedMaterial` | steel \| aluminum | no |

### Wrecker

| Field | Type | Required |
|-------|------|----------|
| `boomCapacityLbs` | number | yes |
| `winchCapacityLbs` | number | yes |
| `wheelLift` | boolean | yes |
| `boomLengthFeet` | number | no |

### Heavy Wrecker

| Field | Type | Required |
|-------|------|----------|
| `boomCapacityLbs` | number | yes |
| `boomLengthFeet` | number | yes |
| `winchCapacityLbs` | number | yes |
| `wheelLift` | boolean | yes |
| `underliftCapacityLbs` | number | no |

### Rotator

| Field | Type | Required |
|-------|------|----------|
| `boomCapacityLbs` | number | yes |
| `boomLengthFeet` | number | yes |
| `rotationDegrees` | number | yes |
| `winchCapacityLbs` | number | yes |
| `outriggers` | boolean | yes |

## Photos

| Rule | Threshold |
|------|-----------|
| Minimum to publish | 8 photos |
| Complete Listing badge | 15+ photos |
| Recommended tags | Front, Driver side, Passenger side, Rear/bed, Cab interior, Engine bay, Winch/boom, Undercarriage |

## Completeness score (0–100)

| Component | Weight |
|-----------|--------|
| Required spec fields filled | 40% |
| Photo count | 30% |
| Optional base fields (engine, transmission, fuel, GVWR, VIN) | 15% |
| Description length (≥120 chars = full) | 15% |

**Complete Listing** = score ≥ 85 AND photos ≥ 15

## Trust badges (display logic)

| Badge | Criteria |
|-------|----------|
| Verified Seller | `seller.verified === true` |
| Complete Listing | `isCompleteListing === true` |
| Reviews | `seller.reviewCount > 0` → show ★ rating |

## Offer payload

```typescript
{
  listingId: string;
  amount: number;
  note?: string;
  wantsFinancing: boolean;
  wantsShipping: boolean;
  wantsWarranty: boolean;
}
```

Offers require **verified buyer** status before submit.

## Listing card display (minimum viable)

Always show: hero photo, type badge, price, year + brand, miles, city/state, verified/complete badges when applicable.
