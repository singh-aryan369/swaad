---
name: swaad-component-index
description: Quick reference for "where does X live?" in the Swaad codebase. Use when you need to find the file that owns a particular pattern (parallax, tab pill, scroll progress, drawer, eyebrow heading, etc.) before extending or copying it. Skim this skill first instead of grep-spelunking.
---

# Swaad — Component & pattern index

Single-file lookup so you don't waste turns grepping. Verify the file still exists before relying on a path — this index was written 2026-05-04.

## Stack

- React 18, Vite 5, react-dom 18
- **framer-motion 11** — all motion goes through this; do not add GSAP/Lottie
- **lucide-react** — all icons; do not add `react-icons`/`heroicons`
- Plain CSS files per component (NOT Tailwind, NOT CSS-in-JS)
- Design tokens as CSS custom properties in [src/styles/index.css](src/styles/index.css)
- No router — single-page anchored sections

## Where each pattern lives

| Feature | File | Notes |
|---|---|---|
| Design tokens (palette / type / spacing / motion easing) | [src/styles/index.css](src/styles/index.css) | All `--c-*`, `--space-*`, `--ease-*` |
| Hero parallax (image translateY/scale, text fade) | [src/components/Hero.jsx:24-32](src/components/Hero.jsx#L24-L32) | `useScroll` + `useTransform` |
| Word-stagger title reveal | [src/components/Hero.jsx:6-21](src/components/Hero.jsx#L6-L21) | `titleVariant` + `wordVariant`, `staggerChildren: 0.08` |
| Scroll-to-section indicator chevron | [src/components/Hero.jsx:76-91](src/components/Hero.jsx#L76-L91) | `lucide-react` ChevronDown + bouncing wrapper |
| Saffron pulsing dot (live indicator) | [src/components/Hero.css:46-56](src/components/Hero.css#L46-L56) | `@keyframes pulse` — copy for any "live" badge |
| Sticky scroll progress bar | [src/components/ScrollProgress.jsx](src/components/ScrollProgress.jsx) | `useSpring` smoothing, scaleX |
| Translucent → solid scroll navbar | [src/components/Navbar.jsx:19-23](src/components/Navbar.jsx#L19-L23) | `is-scrolled` class above 60px |
| Mobile drawer (slide-in + body lock) | [src/components/Navbar.jsx:71-122](src/components/Navbar.jsx#L71-L122) | `AnimatePresence` + `document.body.style.overflow` |
| Eyebrow + h-section + lede heading pattern | All `*.jsx` sections | Always wrap in `.container` inside `.section` |
| Story carousel (cycle through narrative cards) | [src/components/About.jsx](src/components/About.jsx) | `useState` index + prev/next icon-btns + 0X/0N counter |
| Tabbed category UI with morphing pill | [src/components/Menu.jsx:58-80](src/components/Menu.jsx#L58-L80) | `layoutId="tab-pill"` shared element |
| Carousel arrows on a content swap | [src/components/Menu.jsx:83-129](src/components/Menu.jsx#L83-L129) | `AnimatePresence mode="wait"` |
| Drinks visual carousel (image swap with scale) | [src/components/Menu.jsx:133-184](src/components/Menu.jsx#L133-L184) | Pattern for any "feature one item at a time" |
| Bento gallery grid (tall / wide / square spans) | [src/components/Gallery.jsx](src/components/Gallery.jsx) + [Gallery.css](src/components/Gallery.css) | `--tall`, `--wide`, `--square` modifiers |
| Festival/Event card with photo + meta + CTA | [src/components/Festivals.jsx](src/components/Festivals.jsx) | The "row + date" header pattern with right-aligned date |
| Newsletter form with fake-success state | [src/components/Footer.jsx:32-44](src/components/Footer.jsx#L32-L44) | Replace with real endpoint before client demo |
| Multi-region content (data files) | [src/data/](src/data/) (`menu.js`, `festivals.js`, `events.js`, `team.js`) | Edit content here, not in JSX |
| Reduced-motion override | [src/styles/index.css:207-213](src/styles/index.css#L207-L213) | Global — clamps animation/transition to 0.01ms |
| Focus-visible outline (saffron ring) | [src/styles/index.css:94-99](src/styles/index.css#L94-L99) | Already wired — don't override per-element |

## Brand tokens (cheat sheet)

```
--c-ink: #14160e      --c-cream: #ecedde
--c-olive: #4a5237    --c-sage-light: #b6bd9d
--c-saffron: #d97706  --c-saffron-soft: #f59e0b

--font-body: 'Roboto'
--font-display: 'Clash Display'

--ease-out: cubic-bezier(0.22, 1, 0.36, 1)
```

Easing as a framer-motion array: `[0.22, 1, 0.36, 1]` — never the string `'easeOut'`.

## Companion skills

- [swaad-aesthetic](../swaad-aesthetic/SKILL.md) — palette, typography, button rules
- [swaad-motion-vocabulary](../swaad-motion-vocabulary/SKILL.md) — the 6 framer-motion patterns
- [swaad-section-rhythm](../swaad-section-rhythm/SKILL.md) — alternate ink / cream / sage backgrounds
- [swaad-section-anatomy](../swaad-section-anatomy/SKILL.md) — what sections an Indian restaurant needs
- [swaad-mobile-fundamentals](../swaad-mobile-fundamentals/SKILL.md) — 16px inputs, 44px taps, drawer focus
- [swaad-restaurant-ctas](../swaad-restaurant-ctas/SKILL.md) — Reserve / Order / Menu CTAs
- [swaad-editable-content](../swaad-editable-content/SKILL.md) — `/src/data/` and `/public/data/` patterns

## Patterns from sister project worth porting

The Keithston Bakery codebase (`bakery_website/` on this machine) has 3 patterns absent from Swaad that may be worth porting:

1. **Hero video loop** — multi-clip muted crossfade with poster + Ken Burns + reduced-motion fallback. Currently Swaad uses a single static parallax image; a 4-clip stack would feel more alive.
2. **Sticky-scroll storytelling** — pinned image column + scrolling text panels, IntersectionObserver center-band. Could replace the About carousel for a more editorial feel.
3. **Daily JSON ribbon** — `/public/data/special.json` driving a top-of-page "today's special" bar. Good fit for Swaad's "thali of the day".

These are *recommendations*, not required — discuss with the user before implementing.
