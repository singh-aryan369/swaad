---
name: swaad-section-rhythm
description: Use when adding a new top-level section to the Swaad page or auditing the current section order — every page should alternate ink-dark / cream / sage backgrounds in a deliberate rhythm so the visitor never reads four similar surfaces in a row. Apply when the page starts feeling "flat" or when inserting a new <section> into App.jsx.
---

# Swaad — Section background rhythm

A long single-page restaurant site reads as one undifferentiated slab if every section has the same background. The fix is **deliberate alternation** between ink (dark), cream (light), and sage (mid-tone) surfaces.

## The current rhythm in [App.jsx](src/App.jsx)

```
Hero        → ink (#14160e)         dark
About       → cream                  light
Menu        → ?                      check
Team        → ?
Gallery     → ?
Festivals   → ?
Events      → ?
Footer      → ink                   dark
```

Audit the actual `background-color` in each `*.css` file before inserting anything new and confirm the pattern is **dark → light → mid → light → dark → light → dark** or similar. The exact order matters less than "no three of the same in a row".

## The 3 surface types

### 1. Ink (dark) — for impact/anchor sections
- Background: `var(--c-ink)` (#14160e)
- Foreground text: `var(--c-cream)` headings, `var(--c-sage-light)` body
- Eyebrow uses `.eyebrow-light` modifier
- Hero, Footer, Festivals (already), and one more dark "anchor" section in the middle of the page is the right balance.

### 2. Cream (light) — the workhorse, NOT pure white
- Background: `var(--c-cream)` (#ecedde) **or** the global body `#ffffff`. Both work; cream is warmer, white is cleaner.
- Foreground: `var(--text-dark)` (#14160e)
- Use for About, Menu, Team — content-dense sections where readability matters most.

### 3. Sage (mid-tone) — for "in-between" sections
- Background: `var(--c-sage-light)` (#b6bd9d) or `var(--c-stone)` (#d8dcc4)
- Foreground: ink for headings, olive for body
- Good for Gallery (lets photos pop without competing) or a future "Press" / "Reviews" section.

## The rules

1. **Never three identical backgrounds in a row.** If two cream sections are unavoidably adjacent, break them with a thin `<div className="section-divider">` containing a hand-drawn ornament or a single saffron rule line.

2. **Open and close on dark.** Hero is ink, Footer is ink — the page bookends in dark, with the lighter content sandwiched. Don't change this.

3. **Festivals / Events / a "celebration" section** belongs on dark or sage, never cream — the photos in these are bright and lively, and they sing on a darker surface.

4. **Menu / About** belong on cream — they're text-dense and need maximum contrast. Reading 60-word descriptions on sage-light is borderline.

5. **Gallery** is the exception — it can live on any surface, because the photos take over. Currently sits on cream which works.

## Bridging sections — the dissolve trick

When transitioning between two strong-contrast surfaces (ink → cream), avoid a hard horizontal line by adding a fade gradient at the boundary:

```css
.festivals { /* dark section */
  position: relative;
}
.festivals::after {
  content: '';
  position: absolute;
  left: 0; right: 0; bottom: 0;
  height: 80px;
  background: linear-gradient(to bottom, transparent, var(--c-cream));
  pointer-events: none;
  z-index: 1;
}
```

Or, conversely, fade *out of* a cream section *into* the ink section below it. Pick one direction per transition; doing both creates a muddled middle band.

## When inserting a new section

1. Read the CSS file of the section directly above and directly below your new section.
2. Pick a surface that's **different from both neighbors**. If neighbors are both cream, use sage or ink. If one is ink and one is cream, you have flexibility — match the section's content energy (intimate text → cream, bold visuals → dark).
3. Use the matching `.eyebrow` variant (`.eyebrow-light` on ink, plain `.eyebrow` on cream).
4. Verify the `.h-section` color is set explicitly — don't let it inherit body color and end up invisible on a dark surface.

## Test

Squint at the page (or screenshot it small). Can you tell where one section ends and another begins? If sections blend together for >2 in a row, the rhythm has failed and you need to swap a surface.
