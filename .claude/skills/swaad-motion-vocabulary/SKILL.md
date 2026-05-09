---
name: swaad-motion-vocabulary
description: Use when adding motion to the Swaad restaurant site — covers the framer-motion patterns already used (parallax hero, word-stagger title, viewport-once reveals, AnimatePresence + layoutId tab pill, useSpring scroll progress) so new motion stays consistent. Avoid bringing in new animation libs, generic SaaS bouncy easings, or motion that ignores prefers-reduced-motion.
---

# Swaad — Motion vocabulary

The site already has a strong, consistent motion system built on **framer-motion 11**. Don't add GSAP, Lottie, or custom rAF loops — extend the existing patterns. The brand easing is `[0.22, 1, 0.36, 1]` (decelerate cubic) and motion durations sit in the **0.4s–0.9s** range. Snappier feels SaaS-y; slower feels broken.

## The 6 patterns already in use

### 1. Hero parallax with `useScroll` + `useTransform`
File: [src/components/Hero.jsx:24-32](src/components/Hero.jsx#L24-L32)

```jsx
const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
const imgY      = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);
const imgScale  = useTransform(scrollYProgress, [0, 1], [1, 1.08]);
const textY     = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
const textOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
```

Image moves 20% / scales to 1.08; text moves 50% and fades to 0 by 60%. **Apply to:** any large photo-led section header (e.g. a future `<Story>` or `<Reservation>` hero).

### 2. Word-stagger title reveal
File: [src/components/Hero.jsx:6-21](src/components/Hero.jsx#L6-L21)

```js
const titleVariant = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.4 }}};
const wordVariant  = { hidden: { y: 60, opacity: 0 }, show: { y: 0, opacity: 1, transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] }}};
```

Each line wraps in `<span className="line">` with `overflow: hidden` so words rise from below the line. Use this for any *display-size* heading that should feel composed. **Don't** use it for `.h-section` headings — those use the simpler viewport-once reveal (pattern 3).

### 3. Viewport-once reveal (the workhorse)

```jsx
<motion.h2
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, amount: 0.4 }}
  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
/>
```

Used everywhere — [About.jsx](src/components/About.jsx), [Menu.jsx](src/components/Menu.jsx), [Gallery.jsx](src/components/Gallery.jsx), [Festivals.jsx](src/components/Festivals.jsx), [Footer.jsx](src/components/Footer.jsx). Tunables:

- `y: 20` for headlines, `y: 30` for paragraphs, `y: 40-50` for cards/tiles
- `amount: 0.4` for headlines (fire when 40% visible — feels eager)
- `amount: 0.15-0.2` for big tiles (fire as soon as the corner peeks in)
- `delay: i * 0.07` for grid stagger; cap with `(i % 4) * 0.08` for long bento grids

`once: true` is non-negotiable — re-firing on every scroll-by feels twitchy.

### 4. Tab pill with `layoutId` shared element
File: [src/components/Menu.jsx:69-78](src/components/Menu.jsx#L69-L78)

```jsx
{isActive && (
  <motion.span
    layoutId="tab-pill"
    className="tab-pill"
    transition={{ type: 'spring', stiffness: 400, damping: 32 }}
  />
)}
```

Sliding pill that morphs between active tabs. The spring (`stiffness: 400, damping: 32`) is tuned to feel snappy without overshoot. **Apply to:** any new tab/segmented-control pattern. Reuse the `layoutId="tab-pill"` only if there's only one such control in the viewport at a time — otherwise scope (`layoutId="drink-pill"` etc.).

### 5. `AnimatePresence mode="wait"` for swap content
File: [src/components/Menu.jsx:91-121](src/components/Menu.jsx#L91-L121)

```jsx
<AnimatePresence mode="wait">
  <motion.div key={cat.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.35 }}>
    {/* content */}
  </motion.div>
</AnimatePresence>
```

The `key` is what triggers the exit/enter. Use whenever a panel of content swaps based on a tab/filter/carousel index. Keep duration short (0.3–0.5s) — users are clicking, they don't want to wait.

### 6. Scroll progress bar with spring smoothing
File: [src/components/ScrollProgress.jsx](src/components/ScrollProgress.jsx)

```js
const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });
```

The spring smooths fast scrolling so the bar doesn't jitter. Keep these spring values; they're tuned. Already mounted in [App.jsx](src/App.jsx).

## Mobile drawer animation
File: [src/components/Navbar.jsx:71-122](src/components/Navbar.jsx#L71-L122)

`AnimatePresence` wraps the overlay; the drawer slides from `x: '-100%'` over 0.45s with the brand easing. Links inside fade-up with a `0.1 + i * 0.05` delay cascade. Already pairs with `document.body.style.overflow = 'hidden'` in an effect — preserve that pattern in any new drawer/modal.

## Universal rules

1. **Always pass the easing as an array** `[0.22, 1, 0.36, 1]`, never the string `'easeOut'`.
2. **Durations: 0.4s for swaps, 0.6-0.7s for reveals, 0.9s for hero word-rise.** Anything outside this range needs a reason.
3. **`prefers-reduced-motion` is already globally honoured** in [src/styles/index.css:208-213](src/styles/index.css#L208-L213) (transitions and animations clamped to 0.01ms). You don't need to gate individual animations — but if you add a JS-driven loop (rAF), check the media query yourself.
4. **`viewport={{ once: true }}` always** — never re-fire on scroll-back.
5. **`will-change: transform`** belongs on the *currently animating* element only ([Hero.css:17](src/components/Hero.css#L17), `.line span` in Hero). Don't sprinkle it on everything.
6. **Don't add Framer Motion to a primitive that doesn't need it.** A static section title with no entrance animation is fine. Motion should reward the user, not tax the GPU.

## When NOT to add motion

- Footer copyright line, contact details — static is correct.
- Form inputs and labels — focus state is enough.
- Hover-only ornament (e.g. a small sparkle) — adds noise.
- Anywhere the user is reading dense copy — let them read.

## Adding new motion patterns?

Add the variant to a `motion-variants.js` shared module under `src/lib/` (doesn't exist yet — create if reaching 3+ duplicate variant blocks across files). Don't paste the same `wordVariant`/`fadeUp` into every component.
