---
name: swaad-editable-content
description: Use when adding new editable content to the Swaad site (menu items, festivals, events, team, gallery captions) — the project keeps content in flat .js modules under src/data/ so non-devs can edit one file and ship. Don't reach for a CMS. Apply when extending menu.js / festivals.js / events.js / team.js or when introducing a new content-driven section.
---

# Swaad — Editable content via /src/data/

The project deliberately keeps content out of JSX and inside flat modules in [src/data/](src/data/):

- [src/data/menu.js](src/data/menu.js) — `menuCategories` + `drinks`
- [src/data/festivals.js](src/data/festivals.js) — Diwali, Holi, etc.
- [src/data/events.js](src/data/events.js) — live music, chef's table, private dinings
- [src/data/team.js](src/data/team.js) — chefs, sommelier, head waiter

This is the right call for a small business: no CMS to license, no migration, no preview-publish workflow. The owner (or their assistant) edits one file and pushes.

## When to use this pattern

Any data that:
- The bakery owner / restaurant manager will reasonably want to update *without a developer*
- Has a fixed shape (every item has `name`, `price`, `img`, `desc` — not free-form rich text)
- Doesn't need versioning, drafts, or scheduled publishing
- Is small enough to fit comfortably in one ~200-line file

Examples on this site that fit: weekly specials, menu prices, upcoming events, festival dates, team bios.

Examples that *don't* fit (and would warrant a real CMS or backend):
- Customer reviews (need moderation, scheduling, ranking)
- Dynamic table availability (real-time, needs a DB)
- Image-heavy editorial blog (needs media library + drafts)

## Shape conventions

Each `data/*.js` module exports a flat array (or object of arrays for grouped content like menu categories). Items have a stable shape — required fields explicit, optional fields documented in a comment at the top.

**Pattern from [data/festivals.js](src/data/festivals.js)** (read it for the actual shape, but typically):
```js
export const festivals = [
  {
    name: 'Diwali',           // required — display name
    date: '12 Nov',           // required — short display date
    subtitle: '...',          // optional — kicker line
    desc: '...',              // required — 1-3 sentence description
    img: '/images/...jpg'     // required — 4:3 photo, ≥1200px wide
  },
  // ...
];
```

**Rules when extending:**

1. **Don't change the shape mid-file.** If you add a new field (e.g. `priceFrom`), add it to *every* item or make the consumer code (`Festivals.jsx`) handle the absence (`{f.priceFrom && <span>...</span>}`).
2. **Image paths are stable.** When the owner adds a new festival, they drop a JPG into `/public/images/` and reference it in the data file. Never embed Base64.
3. **Order matters.** The visual order on the page is the order in the array. If chronological order matters (events), sort at the data level, not in the component.
4. **No HTML in strings.** Descriptions are plain text — line breaks via the layout, not `<br/>`. Keeps it editor-friendly.

## When the bakery moves beyond /src/data/

If the client wants to update content **without rebuilding the site**, the next step is a JSON file in `/public/data/` that's fetched at runtime:

```js
useEffect(() => {
  fetch('/data/festivals.json', { cache: 'no-store' })
    .then(r => r.ok ? r.json() : [])
    .then(setFestivals)
    .catch(() => setFestivals([]));
}, []);
```

The bakery project ([bakery_website/src/components/BakeOfTheDay.jsx](../../../../../Downloads/bakery_website%202/bakery_website/src/components/BakeOfTheDay.jsx) on this machine) uses this pattern for a daily ribbon — the owner edits `bake-of-the-day.json` via FTP/Dropbox sync and the page picks up the change on next reload.

**For Swaad specifically**, candidates for `/public/data/` JSON over `/src/data/.js`:
- Today's special (changes daily)
- This weekend's events (changes weekly)
- Live music schedule
- "We're closed today" override banner

But menu, team, festivals — those change monthly at most, so build-time `/src/data/` is fine.

## Adding a new content-driven section

1. Create the data file: `src/data/<topic>.js` exporting a typed-shape array.
2. Wire the JSX consumer to map over it with framer-motion's viewport-once reveal pattern (see [swaad-motion-vocabulary](../swaad-motion-vocabulary/SKILL.md)).
3. If the section is content-heavy and the client edits it weekly+, promote to `/public/data/<topic>.json` with the runtime-fetch pattern.
4. Document the shape with a one-comment block at the top of the data file so the owner knows what fields are required.

## What not to do

- Don't introduce Sanity / Strapi / Contentful for a 1-restaurant site. The client doesn't want a CMS dashboard, and the dev cost outweighs the editing convenience.
- Don't put copy directly in component JSX if it'll be edited more than once. The Hero copy ("Made in India. Loved by Everyone.") is acceptable in JSX because it's brand-permanent. Festival names aren't.
- Don't use `import festivals from './festivals.json'` and then transform it heavily in the component — keep the data shape close to what the component renders.
