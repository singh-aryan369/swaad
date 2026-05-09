---
name: swaad-aesthetic
description: Use when designing, auditing, or extending the visual language of the Swaad Indian restaurant site — palette (olive/sage/cream + saffron accent), Clash Display × Roboto pairing, eyebrow + h-section + lede typography pattern, and the design tokens defined in src/styles/index.css. Apply it when adding any new section, card, button, or page so the result feels native to the brand instead of bolted-on.
---

# Swaad — Visual language

This site is an authentic Indian restaurant in Mumbai. The aesthetic is **earthy, slow, and editorial** — not a glossy SaaS template, not a generic food-delivery app. Every new section should reinforce: warm spice tones, hand-crafted feel, photo-led, with a single saffron accent that hints "Indian" without leaning on cliché.

## Palette (CSS custom properties, defined in [src/styles/index.css](src/styles/index.css))

```
--c-ink:        #14160e   /* primary text + dark-section backgrounds */
--c-deep-olive: #2f3424
--c-olive:      #4a5237   /* hover state for primary button */
--c-olive-2:    #5e6648   /* muted text */
--c-sage-dark:  #828a6d
--c-sage:       #a4ab8b
--c-sage-light: #b6bd9d   /* secondary text on dark bg */
--c-sage-pale:  #c7ccb1
--c-stone:      #d8dcc4
--c-cream:      #ecedde   /* page background, dark-bg foreground */
--c-saffron:      #d97706 /* the ONE accent — focus rings, callouts */
--c-saffron-soft: #f59e0b /* hover state for saffron, hero pulse dot */
```

**Rule:** Saffron is the only accent. Use it for the hero pulse dot, focus rings (already wired), CTA hover state, and at most one "live now" indicator per page. **Never** stack two saffron elements next to each other.

## Type scale — already defined as utility classes

- `.h-display` — hero only. Clash Display 700, `clamp(48px, 6vw, 88px)`, `letter-spacing: -0.02em`, `line-height: 0.98`.
- `.h-section` — every section H2. Clash 700, `clamp(40px, 5vw, 72px)`. **Always** preceded by an `.eyebrow` line.
- `.h-card` — card titles (festival, team, dish). Clash 600, `clamp(22px, 2vw, 28px)`.
- `.eyebrow` — Roboto 500, 12px, `letter-spacing: 0.18em`, uppercase, with a leading em-dash (`— Our Story`). Use `.eyebrow-light` on dark sections.
- `.lede` — body intro paragraph after a heading. 15px, `line-height: 1.65`, capped at `56ch`.

**Pattern for any new section:**
```jsx
<section className="my-section" id="...">
  <div className="container">
    <p className="eyebrow">— Section Kicker</p>
    <h2 className="h-section">Section Title.</h2>
    <p className="lede">One-sentence lede that explains what this section is about.</p>
    {/* content */}
  </div>
</section>
```

The em-dash + uppercase eyebrow + period at the end of the headline are recurring across [About.jsx](src/components/About.jsx), [Menu.jsx](src/components/Menu.jsx), [Gallery.jsx](src/components/Gallery.jsx), [Festivals.jsx](src/components/Festivals.jsx) — keep that consistency.

## Layout tokens

- `--container: 1320px`, `--container-narrow: 880px`. Use `.container` wrapper inside every section.
- `--gutter: clamp(20px, 4vw, 60px)` — already applied by `.container`. Don't add extra padding-x at the section level.
- `--space-1` through `--space-10` follow a 4 / 8 / 12 / 16 / 24 / 32 / 48 / 64 / 96 / 128 scale. Use these tokens, not raw px.
- `--r-sm: 6px`, `--r-md: 12px`, `--r-pill: 999px` — radii. Buttons are `--r-pill`, cards are `--r-md`.

## Buttons — already classed in CSS

- `.btn .btn-primary` — `var(--text-dark)` bg, cream text, `translateY(-2px)` on hover, bg shifts to `var(--c-olive)`.
- `.btn .btn-ghost` — transparent with `currentColor` border, fills to dark on hover.
- `.icon-btn` — circular 48px control, used for prev/next carousel arrows.

**Don't** invent new button styles per section. Reuse these three. On dark sections, override `.btn-primary` to cream-bg + ink-text (see [Hero.css:78-82](src/components/Hero.css#L78-L82)).

## Motion easing — universal

Every transition uses `--ease-out: cubic-bezier(0.22, 1, 0.36, 1)` (a Material-style decelerate). Treat this as the brand easing — never use Framer Motion's default `easeOut` string, always pass the array `[0.22, 1, 0.36, 1]`.

## What to avoid on Swaad

- Pastel pink/lavender (clashes with sage/olive)
- Pure white sections — use `var(--c-cream)` as the cream background
- Inter font (we use Roboto for body — do not introduce a third sans)
- Glassmorphism / neon gradients
- Hindi typography in display unless the user explicitly asks — keep the type system as one Devanagari-free system for now
- Multiple accent colors (no red, no green, no blue — only saffron)

## When applying

1. Adding a new section → reuse `eyebrow + h-section + lede` opener, wrap in `.container`, alternate background per [swaad-section-rhythm](../swaad-section-rhythm/SKILL.md).
2. Adding a new card → use `--r-md` radius, photo-led, dark text on cream OR cream text on ink. Match Festival/Dish card structure.
3. Adding a new color anywhere → don't. If genuinely needed, add a token to `:root` with the `--c-` prefix and document why.
