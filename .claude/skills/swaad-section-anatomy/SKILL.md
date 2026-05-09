---
name: swaad-section-anatomy
description: Use when planning, adding, or removing top-level sections on the Swaad site. Indian dine-in restaurants need specific sections that a generic SaaS or food-delivery template will skip — Festivals, Live Events, Team/Chefs, a separate Drinks carousel, and a photo Moments grid. Apply when an audit asks "is this site complete enough to sell?" or when adding a new section to App.jsx.
---

# Swaad — Sections an Indian restaurant site actually needs

A generic restaurant template gives you Hero / Menu / Contact and calls it done. That's enough for a Subway franchise, not for a Mumbai dine-in restaurant trying to fill 80 seats on a Saturday. Below is the section list specific to the dine-in / authentic-cuisine category and the why behind each.

## The 9 sections — current state in [App.jsx](src/App.jsx)

1. ✓ **Hero** — image-led, minimal copy, two CTAs (browse, reserve)
2. ✓ **About / Story** — the "why we cook" narrative carousel
3. ✓ **Menu** — tabbed dish categories + separate drinks carousel
4. ✓ **Team** — chefs, head waiter, sommelier
5. ✓ **Gallery (Moments)** — bento-grid editorial photos
6. ✓ **Festivals** — Diwali / Holi / Onam special menus
7. ✓ **Events** — live music, chef's table, private dining
8. ✓ **Footer** — newsletter, address, hours, socials, Zomato link

Status: the section coverage is **strong**. Most restaurant templates lack Festivals and Team entirely.

## What each section is *for* (and what to delete if it's not doing that)

### Hero
**Job:** answer "what kind of restaurant is this and where?" in 2 seconds.
**Must contain:** restaurant name, cuisine descriptor (e.g. "Authentic Indian"), a hint of location, primary photo, primary CTA.
**Cut if missing:** *literally nothing* — every visitor sees this first.

### About
**Job:** establish trust ("these people care, they're not a chain") and convert curiosity into appetite.
**Must contain:** a story (chefs/origin/sourcing), at least one stat that's verifiable ("25 years", "12 regions on the menu"), and 2-3 photos of the kitchen/staff (not just food).
**Currently:** the carousel format with three stories is great — keeps the section short while letting curious visitors dig in.

### Menu
**Job:** convince the visitor what to order. Not list the entire menu.
**Must contain:** category tabs, 6-8 hero dishes per category with photo + price + 1-line desc, a separate drinks section, and a "View full menu (PDF)" link for completeness.
**Currently:** missing the "full menu PDF" link. Add a `<a href="/menu.pdf" target="_blank">Download full menu →</a>` below the dish grid for completeness.

### Team
**Job:** put faces on the cooking. Indian dine-in is high-touch — guests want to feel they know the people.
**Must contain:** head chef and 2-3 supporting roles (sous chef, sommelier, host). Photo + name + role + 1-line bio.
**Specific to Indian restaurants:** the head chef's regional origin matters ("Chef Ramesh — from Kerala" signals authenticity). Don't omit it.

### Gallery / Moments
**Job:** atmosphere. The photos do what copy can't — show the room, the lighting, the laughter.
**Must contain:** at minimum 6 photos in a varied grid. **Mix:** food (40%), interior (30%), people (20%), ingredients/process (10%).
**Trap:** don't reuse the dish photos from the Menu section. Use *different* angles, candid shots, behind-the-scenes.

### Festivals
**Job:** drive bookings during the high-margin Indian holiday calendar.
**Must contain:** the next 2-4 festivals with dates, special menu price, photo, and a per-festival "Reserve" CTA that pre-fills the festival name in the WhatsApp message (see [swaad-restaurant-ctas](../swaad-restaurant-ctas/SKILL.md)).
**Cadence:** the data file should be updated *quarterly* by the manager. If a festival has passed, drop it from the array.

### Events
**Job:** position the restaurant as a *place to spend an evening*, not a quick meal stop.
**Must contain:** live music (qawwali night, ghazal evening), chef's table experiences, private-dining packages, and **dates if known**.
**Specific tip:** include "Capacity: 8 guests" or "From ₹3500/head" — events without numbers feel hypothetical.

### Footer
**Job:** newsletter capture + the practical info (address, hours, phone, socials, delivery aggregator links).
**Must contain:** address with map link, opening hours, phone (tap-to-call), email, Instagram, Zomato/Swiggy.
**Currently:** the Zomato link is `href="#"` — a sale-blocker. Real link or delete the icon.

## Sections this site doesn't need (yet)

- **Press / Reviews** — only valuable if Swaad has 5+ legitimate press mentions or a Times Food Award. If it's just Google reviews, embed those in the Footer instead.
- **Loyalty / Membership** — high-overhead to maintain, low conversion for a single-location restaurant.
- **Catering / Wholesale** — only if it's a real revenue stream. If yes, build it as a separate page (`/catering`), not a section on Home.
- **Reservation widget** (in-page form picker) — adds friction vs. a WhatsApp deep-link for a 80-seat restaurant. Tools like SuperMenu / Dine Deck are worth it at 200+ seats; not here.

## Order rules

- Hero first. Footer last. Non-negotiable.
- About *immediately* after Hero — visitors are most receptive to the story when they've just landed.
- Menu *before* Team — appetite first, faces second.
- Gallery *between* Menu and Team OR between Team and Festivals — it acts as a visual breath between content-dense sections.
- Festivals + Events near the end — these are conversion-oriented, and a visitor who's read this far is high-intent.
- Currently the order in [App.jsx:13-26](src/App.jsx#L13-L26) is **Hero → About → Menu → Team → Gallery → Festivals → Events → Footer** — that's correct, don't reorder.

## When adding a 10th section

Ask: does this section have a job that one of the existing 9 isn't doing? If not, it doesn't belong. Examples that *would* warrant a new section:

- A "Press" section if Swaad gets a TOI or Conde Nast feature
- A "Reservation" hero block if WhatsApp + phone aren't enough and the restaurant adopts an OpenTable-style system
- A "Locations" section if Swaad opens a second branch

Examples that should NOT become new sections (because they belong elsewhere):

- "Awards" → put inline as 2-3 logo strip in About
- "Sourcing partners" → put inline in About
- "Sustainability" → integrate into the About story, don't isolate
- "FAQ" → only if 5+ real recurring questions; otherwise put in Footer
