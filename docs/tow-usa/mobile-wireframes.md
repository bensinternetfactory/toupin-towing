# TOW USA — Mobile Wireframe Specs

Pixel specs assume **375×812** (iPhone baseline). Scale proportionally. Max content width on tablet/desktop: **430px** centered.

## Global tokens

| Token | Value | Use |
|-------|-------|-----|
| `--nav-height` | 64px | Bottom tab bar |
| `--header-height` | 56px | Top app bar |
| `--safe-bottom` | env(safe-area-inset-bottom) | Home indicator |
| `--touch-min` | 44px | Minimum tap target |
| `--radius-card` | 16px | Listing cards |
| `--radius-chip` | 999px | Type / filter chips |
| `--gap-page` | 16px | Horizontal page padding |
| Primary CTA | `#0B5FFF` | Offer, primary actions |
| Trust green | `#0A7B34` | Verified, Complete badges |

Typography (Geist):

- **H1 listing title:** 22px / 28px line / semibold
- **Price:** 24px / semibold
- **Card title:** 16px / semibold
- **Meta line:** 13px / regular / `#6B7280`
- **Badge:** 11px / semibold / uppercase tracking 0.04em

---

## 1. For You (Home) — `/`

### Top bar — 56px

```
┌────────────────────────────────────── 375px ──┐
│ 16px │ TOW USA (18px bold) │ 🔔 │ Saved (3) │
└────────────────────────────────────────────────┘
```

- Logo/wordmark left, 16px inset
- Right: notification icon 44×44, saved pill (min 44px height)

### Type chips — 48px row, scroll-x

- Height: 36px chips, 6px vertical padding
- Gap: 8px between chips
- Horizontal padding: 16px
- Active chip: filled `#0B5FFF`, white text
- Inactive: `#F3F4F6` bg, `#111827` text

Chips (order): Rollback · Wrecker · Heavy Wrecker · Rotator · New Today · Near Me

### Story rail — 96px

- Circle thumbnails: 64×64, 2px ring `#0B5FFF` if unseen
- Label below: 11px, max 72px width, truncate
- Items: Listed Today · Price Drops · Under $50k · Verified Dealers

### Feed card (full-width) — variable height ~520px

```
┌─────────────────────────────────────┐
│ Hero image 343×280 (16px margins)   │  ← swipeable carousel dots
│ border-radius 16px                  │
├─────────────────────────────────────┤
│ [Rollback]              ♥ Save      │  badge + 44px save
│ 2019 Peterbilt 567                  │  16px semibold
│ $89,500 · 142k mi · Dallas, TX      │  13px meta
│ ✓ Verified · ★ 4.9 · Complete       │  badges row 32px
│ ┌──────────┐ ┌──────────┐           │
│ │  Offer   │ │ Message  │           │  each 44px height, gap 8px
│ └──────────┘ └──────────┘           │
└─────────────────────────────────────┘
```

- Card vertical gap: 12px
- **Offer** button: primary fill, flex 1
- **Message** button: outline, flex 1
- Infinite scroll: load next card at 70% scroll depth

### Copy

- Empty feed: "No trucks match yet. Try Search or widen your filters."
- Feed subtitle (screen reader): "Recommended based on your saves and searches"

---

## 2. Search — `/search`

### Sticky filter panel — top 180px (collapsible to 56px)

**Row 1 — Type (multi-select chips)** — same as home

**Row 2 — Price presets**

- Pills: Any · Under $50k · $50–100k · $100–200k · $200k+
- Slider below when expanded: dual-thumb, 44px touch handles

**Row 3 — Brand (horizontal scroll)**

- Brand logos/text chips, multi-select

**Row 4 — Miles + toggles**

- Miles slider: 0 – 500k+
- Toggles: Verified only · Complete listings only (each 44px row)

### Results header — 40px

- "{n} trucks" left · Grid/List toggle right (44×44 icons)

### Grid card — 2 columns

```
┌─────────────┐ ┌─────────────┐
│ img 167×120 │ │ img 167×120 │
│ $89,500     │ │ $124,000    │
│ '19 Peterbilt│ │ '21 Kenworth│
│ 142k mi     │ │ 89k mi      │
│ Rollback    │ │ Rotator     │
└─────────────┘ └─────────────┘
```

- Column gap: 12px, row gap: 16px, page padding 16px
- Card tap → `/listings/[id]`

---

## 3. Listing detail — `/listings/[id]`

Full-bleed; bottom nav hidden. Sticky footer CTA.

### Hero carousel — 375×300

- Dots + photo count "3 / 18"
- Pinch zoom enabled

### Title block — padding 16px

```
2019 Peterbilt 567 · Rollback
$89,500                    [Make Offer]  ← sticky duplicates at bottom
★ 4.9 (12) · ✓ Verified · Complete Listing
📍 Dallas, TX · 142,000 mi · Listed 3 days ago
```

### Service row — 72px

Four equal columns (icon + label 11px):

- Message · Finance · Ship · Warranty

### Accordion sections (each header 48px)

1. **Key specs** — tow-specific fields from schema
2. **Condition & photos** — tagged photo groups
3. **Seller** — avatar, name, response time, other listings
4. **Similar trucks** — horizontal rail, card 140×180

### Sticky footer — 72px + safe area

```
┌─────────────────────────────────────┐
│  Message (outline)  │  Make Offer   │
└─────────────────────────────────────┘
```

---

## 4. Make Offer — bottom sheet

- Sheet height: 70vh max, radius top 20px
- Fields:
  - Offer amount (numeric, large 32px)
  - Note (optional, 3 lines)
  - Checkboxes: Interested in financing · Need shipping quote · Interested in warranty
- Submit: "Submit Offer" 48px primary
- Legal line: 11px "Offers are sent to the seller on TOW USA. Deals completed here help both parties."

---

## 5. Deals — `/deals`

Segmented control — 44px: **Offers · Messages · Saved**

### Offer row — 72px

```
[thumb 48×48] 2019 Peterbilt 567
              Your offer: $85,000 · Pending
              2h ago                    ›
```

Status colors: Pending amber · Countered blue · Accepted green

### Saved row — 80px

- Price drop badge: red "-$3,000"
- Alert toggle on right

---

## 6. Sell — `/sell`

Progress bar — 4 steps, 4px height, top of screen

| Step | Title | Key fields |
|------|-------|--------------|
| 1 | Basics | Type, year, brand, model, miles, price, location |
| 2 | Photos | Min 8 to publish; 15+ for Complete badge |
| 3 | Specs | Type-specific (see listing-schema.md) |
| 4 | Publish | Phone verify, preview, completeness score |

Completeness meter — circular or bar, copy:

- "Your listing is 60% complete — add winch specs to rank higher"

Primary CTA per step: **Continue** 48px.full width

---

## 7. You — `/you`

- Profile header: name, business, verification CTA if unverified
- Menu rows 48px: My Listings · Reviews · Financing applications · Shipping quotes · Settings · Help

---

## Bottom navigation — 64px + safe area

| Tab | Icon | Label |
|-----|------|-------|
| 1 | Home | For You |
| 2 | Search | Search |
| 3 | Plus (center, 56×56 elevated) | Sell |
| 4 | Inbox | Deals |
| 5 | User | You |

Active: `#0B5FFF` + label semibold. Inactive: `#9CA3AF`.

---

## Interaction notes

- **Haptic** on save and offer submit (native wrappers later)
- **Pull to refresh** on For You and Search
- **Skeleton loaders** for cards (280px image placeholder)
- **Offer requires verified buyer** — gate with phone + business name before first offer
