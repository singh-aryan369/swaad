---
name: swaad-mobile-fundamentals
description: Use before any phone demo of the Swaad site, when reviewing mobile UX, or when adding any new input/button/menu component. Covers the iOS auto-zoom trap (16px input font), 44px tap-target minimum, drawer focus trap and Esc-to-close, and the small set of media-query breakpoints used in the project.
---

# Swaad — Mobile fundamentals

Every issue on this list ruins the first 30 seconds of a phone demo. They're 1-line CSS fixes if caught early and embarrassing if caught by the client. Run through this before any phone demo and whenever adding a new form field, button, or overlay.

## Tier 1 — must-fix (page-breaking)

### M1. Input font-size ≥ 16px
**Why:** iOS Safari auto-zooms the viewport on focus when input `font-size < 16px`, then doesn't auto-zoom back. The user has to manually pinch out after each field.

**Where to check:** [src/components/Footer.jsx:33-40](src/components/Footer.jsx#L33-L40) (newsletter input). Any future contact form, reservation form, or search box.

**Fix:** ensure every `<input>`, `<textarea>`, `<select>` has explicit `font-size: 16px` (not `font-size: 14px` or default-inheriting `--font-body`). Add to the relevant `.css` file:

```css
.footer-form input { font-size: 16px; }
```

### M2. Tap targets ≥ 44×44 px
**Why:** Apple HIG and Google Material both require ≥ 44px. Below that, a meaningful share of taps misfire on cards/menu links.

**Where to check:**
- Hamburger button [Navbar.jsx:42-48](src/components/Navbar.jsx#L42-L48) — wraps a 22px lucide icon. Confirm `.hamburger` CSS adds enough padding to hit 44px+ (pad to `12px` on each side).
- Drawer links [Navbar.jsx:101-113](src/components/Navbar.jsx#L101-L113) — `.nav-drawer-links a` should have ≥ `padding: 16px 0` to give a 50px+ row.
- Footer social icons [Footer.jsx:71-74](src/components/Footer.jsx#L71-L74) — 18px icons need ≥ 13px padding all around. Currently inline `<a>` — add a class with explicit min size.
- Menu category tabs [Menu.jsx:62-79](src/components/Menu.jsx#L62-L79) — `.tab-btn` needs `padding: 12px 18px` minimum.

### M3. Drawer locks body overflow + closes on Esc
**Already done** at [Navbar.jsx:26-29](src/components/Navbar.jsx#L26-L29) for body overflow. **Missing:** Esc-to-close and focus trap.

**Add to [Navbar.jsx](src/components/Navbar.jsx):**
```jsx
useEffect(() => {
  if (!open) return;
  const onKey = (e) => { if (e.key === 'Escape') setOpen(false); };
  document.addEventListener('keydown', onKey);
  // focus the first link on open
  drawerRef.current?.querySelector('a')?.focus();
  return () => document.removeEventListener('keydown', onKey);
}, [open]);
```

Also: when the drawer closes, return focus to the hamburger button (`hamburgerRef.current?.focus()`).

## Tier 2 — major

### M4. `.lede` doesn't blow up at 320px width
The class caps at `56ch` which is fine, but on a 320px viewport `clamp(40px, 5vw, 72px)` resolves to 40px and `.h-section` headings can wrap into 4 lines on small phones. Check titles like "Festivals at Swaad" don't break awkwardly — if they do, drop to `clamp(36px, 5vw, 72px)`.

### M5. Hero `min-height: 100vh` issue on mobile Safari
On mobile Safari, `100vh` includes the URL bar, which then scrolls away and creates 80px of empty space below the fold. **Fix at [Hero.css:3](src/components/Hero.css#L3):**
```css
.hero { min-height: 100svh; } /* small viewport height — accounts for URL bar */
```
With `100vh` fallback for older browsers (svh is supported in Safari 15.4+).

### M6. Carousel arrows stack awkwardly on mobile
[Menu.jsx](src/components/Menu.jsx) has prev/next arrows on the dish grid. On phones these arrows can overlap card content. Either hide them at `max-width: 720px` and rely on touch-swipe + tab buttons, or stack them above the grid.

### M7. Gallery bento grid collapse
[Gallery.css](src/components/Gallery.css) — the `--tall`, `--wide`, `--square` spans probably collapse to 1-column at small widths. Verify visually at 375px that the layout doesn't have ragged gaps.

## Tier 3 — polish

- **M8.** Map/iframe (when added) should be `min-height: 320px` on mobile, not 224px (default).
- **M9.** Contact form (when added) — the textarea body can stay `font-size: 14px` (iOS doesn't auto-zoom textareas), but inputs/select must be 16px.
- **M10.** `appearance: none` on `<select>` + custom chevron — native chevron is plain on Android.

## What's already mobile-good (don't regret-touch)

- Drawer mobile menu with body-lock + AnimatePresence slide ✓
- Hero `padding-top: 140px` at `max-width: 720px` ✓
- `.hero-actions { flex-direction: column }` on mobile ✓
- Container gutters scale with `clamp(20px, 4vw, 60px)` ✓
- `prefers-reduced-motion` clamps all transitions globally [src/styles/index.css:207-213](src/styles/index.css#L207-L213) ✓

## Test rig

1. Chrome DevTools → device toolbar → iPhone SE (375 × 667) and iPhone 14 (390 × 844).
2. Tap every form input — does the page zoom on focus? It shouldn't.
3. Try to tap the hamburger — does your fingertip miss?
4. Open the drawer — does the page behind scroll? It shouldn't.
5. Open the drawer, hit Esc — does it close? It should.
