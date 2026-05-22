# Best Boat Rentals — Agent Instructions

## Writing large data files (destination files, blog files, etc.)

**Always write to disk in batches. Never accumulate all content in memory before writing.**

When an agent is tasked with writing a file that contains many entries (e.g. a `tier*.ts` destination file with 40–45 objects):

1. Write the file header and first 10–15 entries immediately using the Write tool.
2. After every 10–15 additional entries, use the Edit tool to append them to the file (add entries before the closing `];`).
3. Do **not** wait until all entries are composed before writing. Write as you go.

This ensures partial progress is preserved even if the session ends mid-task.

### Pattern to follow

```
Step 1 — Write file with entries 1–15 immediately.
Step 2 — Edit to add entries 16–30.
Step 3 — Edit to add entries 31–45.
Step 4 — Verify entry count and close array.
```

Never: compose all 45 entries in your head/response, then write once at the end.

## Destination data schema

See `src/types/index.ts` for the full `Destination` interface.

Required fields for every destination (tier 1, 2, or 3):
- `slug` — kebab-case unique identifier
- `city`, `country`, `region`, `tier`
- `description` — 2–3 sentences
- `avgPriceRange` — e.g. `"$150–$600/day"`
- `bestMonths` — array of month name strings
- `boatTypes` — array of boat type strings
- `licenseRequired` — boolean
- `nearbyDestinations` — array of slugs (reference other destinations in the dataset)
- `faqs` — array of 2–4 `{ question, answer }` objects
- `affiliateLinks` — always use:
  ```ts
  {
    getmyboat: 'https://getmyboat.com/?ref=bestboatrentals',
    boatsetter: 'https://boatsetter.com/?ref=bestboatrentals',
    boatbookings: 'https://www.boatbookings.com/?affiliate=bestboatrentals',
  }
  ```

**Include `heroImage`** on every destination — pick an appropriate Unsplash URL from the list below based on region/type. Skip all other optional fields (`licenseNote`, `reviews`, `monthlyBreakdown`, `relatedBlogSlugs`).

## Unsplash photo IDs by region (use format: `https://images.unsplash.com/photo-{ID}?auto=format&fit=crop&w=1200&q=80`)

**Mediterranean / Greek Islands**
- `1506905925346-21bda4d32df4` — aerial turquoise water with boats
- `1570077188670-e3b613d3d77e` — Mykonos whitewashed town
- `1533105079780-68e769568e16` — Santorini blue domes
- `1548574505-5e239809ee19` — Dubrovnik old town
- `1533587851505-d119e13fa0d7` — Amalfi cliffside coast
- `1559827291-72416316937c` — catamaran sailing Mediterranean

**Caribbean / Tropical**
- `1507525428034-b723cf961d3e` — white sand beach turquoise water
- `1519046904884-53103b34b206` — aerial tropical island
- `1552733407-5d5c46c3bb3b` — turquoise Caribbean water from above
- `1544551763-46a013bb70d5` — sailing yacht blue sea

**Asia Pacific / Southeast Asia**
- `1537996194471-e657df975ab4` — Bali tropical scenery
- `1552465011-b4e21bf6e79a` — Phuket longtail boats
- `1528360983277-13d401cdc186` — Thai island turquoise water
- `1555400038-63f5ba517a47` — Bali rice terraces/coast

**Indian Ocean / Maldives / Seychelles**
- `1571003123894-1f0594d2b5d9` — Maldives overwater bungalows
- `1482192505345-5852b57a27d0` — tropical lagoon aerial

**Middle East**
- `1512453979798-5ea266f8880c` — Dubai skyline waterfront

**North America / Coastal USA**
- `1514924013411-cbf25faa35bb` — Miami beach aerial
- `1476514525535-07fb3b4ae5f1` — lake/coastal scenic

**Lakes & Inland Water (Tier 3)**
- `1434725039720-aaad6dd32dfe` — mountain lake
- `1476514525535-07fb3b4ae5f1` — scenic lake with trees
- `1501426026826-31c667bdf23d` — lake aerial view

**Northern Europe / UK**
- `1558618666-fcd25c85cd64` — European coastal town
- `1530053969535-4801f33e3fb0` — harbour with boats

Pick the closest match for each destination. Multiple destinations can share the same photo ID.

## Existing destinations (do not duplicate these slugs)

`mykonos`, `santorini`, `croatia`, `miami`, `dubai`, `ibiza`, `mallorca`, `amalfi-coast`, `bali`, `phuket`

## Regions (use these exact strings for consistency)

- `Mediterranean`
- `Caribbean`
- `Asia Pacific`
- `Indian Ocean`
- `Middle East`
- `North America`
- `South America`
- `Northern Europe`
- `Oceania`
- `Africa`
