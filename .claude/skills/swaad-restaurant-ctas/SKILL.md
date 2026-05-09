---
name: swaad-restaurant-ctas
description: Use when adding or auditing any call-to-action on the Swaad restaurant site. The primary CTAs for an Indian dine-in restaurant should be Reserve (phone or WhatsApp), Order Online (Zomato/Swiggy deep-links), and View Menu — never a fake "Buy Now" pointing at an in-house cart that doesn't exist. Apply this skill when reviewing the Hero, Footer, Festivals, Events, or any banner CTA.
---

# Swaad — CTAs that actually convert

A dine-in restaurant in India earns revenue through **table reservations** and **delivery aggregators** (Zomato, Swiggy, sometimes Magicpin), not through an in-house e-commerce checkout. CTAs should match how the business actually takes orders, or they break the visitor's trust the moment they tap.

## The 4 conversion channels for Swaad

1. **Reserve a table** — `tel:+912240404040` or a WhatsApp deep-link (`https://wa.me/912240404040?text=...`). This is the #1 CTA on the page.
2. **Order delivery** — Zomato / Swiggy deep-link (the restaurant's own page on those platforms). Surface this near the menu, not the hero.
3. **View Menu** — same-page anchor `#menu`. Low-commitment, gets the visitor scrolling.
4. **Newsletter** — already wired in [Footer.jsx:32-44](src/components/Footer.jsx#L32-L44). Lowest priority but cheap retention.

## Current state — what's wired and what's fake

| CTA | Current target | Verdict |
|---|---|---|
| Hero "Reserve a Table" | `#contact` | ✓ scrolls to footer with phone/email — works |
| Hero "Explore Menu" | `#menu` | ✓ |
| Festival card "Reserve →" | `#contact` | ✓ |
| Footer "Subscribe" | local state, fakes success | ⚠ wire to real endpoint before client demo |
| Navbar "Reserve" | `#contact` | ✓ |
| Footer Zomato link | `href="#"` | ✗ **fix:** point at the real Zomato page (`https://www.zomato.com/mumbai/swaad`) |
| Footer Instagram/Facebook | `href="#"` | ✗ **fix:** real account or remove the icons |

## The patterns to use

### Tap-to-call
```jsx
<a href="tel:+912240404040" className="btn btn-primary">
  Call to Reserve
</a>
```
On a phone, this opens the dialer. On a desktop, it triggers the OS's default phone-call handler (FaceTime / Skype) which is fine — it's a fallback.

### WhatsApp prefilled message
```jsx
const wa = `https://wa.me/912240404040?text=${encodeURIComponent(
  `Hi Swaad! I'd like to reserve a table for [date] at [time], for [n] guests.`
)}`;

<a href={wa} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
  Reserve on WhatsApp
</a>
```
**Pre-filling the message** is the trick. The user just edits in their date/time/party-size and hits send. Drops friction enormously vs. an empty chat.

### Zomato / Swiggy deep-link
```jsx
<a href="https://www.zomato.com/mumbai/swaad-bandra" target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
  Order on Zomato
</a>
<a href="https://www.swiggy.com/restaurants/swaad-bandra-12345" target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
  Order on Swiggy
</a>
```

Place these **near the bottom of the Menu section**, not in the hero. The hero promise is "come in and dine"; the menu is where "I want this delivered now" lives.

### "Newsletter" → real fallback
Until there's a real endpoint, build a `mailto:` from the form values and `window.location.href = href` (the bakery project does this — see `bakery_website/src/components/ContactForm.jsx`). Better than fake-success state which lies to the user.

## Hero CTA hierarchy

The hero already does this right:
- **Primary:** "Explore Menu" — most visitors want to browse first
- **Secondary:** "Reserve a Table" — committed visitors

Don't flip these. Reservation is high-intent and a smaller % of visitors; menu browsing is the more common journey.

## Festival/Event "Reserve →" links

Each festival card and event row should pre-fill the WhatsApp message with the festival/event name:
```jsx
const reserveHref = `https://wa.me/912240404040?text=${encodeURIComponent(
  `Hi Swaad! I'd like to book for ${f.name} on ${f.date}.`
)}`;
```

Replace the current `href="#contact"` on [Festivals.jsx:46](src/components/Festivals.jsx#L46) with this — it's a 60-second change that turns a generic "scroll to footer" into "1-tap WhatsApp with the right context".

## A "sticky mobile bar" — the single biggest lift

Not yet on the site. For mobile, a fixed bottom bar with two buttons (Call · WhatsApp) is the highest-leverage conversion change available:

```jsx
<div className="mobile-bar">
  <a href="tel:+912240404040">📞 Call</a>
  <a href={waHref}>💬 WhatsApp</a>
</div>
```

```css
.mobile-bar { display: none; }
@media (max-width: 720px) {
  .mobile-bar {
    display: grid; grid-template-columns: 1fr 1fr;
    position: fixed; left: 0; right: 0; bottom: 0; z-index: 50;
    background: var(--c-ink); color: var(--c-cream);
    border-top: 1px solid var(--c-olive);
  }
  .mobile-bar a { padding: 16px; text-align: center; font-weight: 500; }
  .mobile-bar a + a { border-left: 1px solid var(--c-olive); }
}
```

Add 48px bottom padding on `<main>` (mobile only) so the bar doesn't cover content.

## What NOT to add

- Fake "Add to Cart" / "Buy Now" buttons — Swaad doesn't sell direct.
- "Sign Up" / "Create Account" — there's no account system, no reason to lie about one.
- Generic "Learn More" CTAs — say what the link does ("Read the menu", "Reserve for Diwali").
- "Discover" / "Explore" without a destination — every CTA must end on something concrete: a section, a phone, a chat, or an external partner page.
