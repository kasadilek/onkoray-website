# A11Y Pre-Launch Checklist

Copy this into a GitHub issue / project card before every go-live. Targets WCAG 2.1 AA.

## Automated

- [ ] `npm run lint` — zero errors, includes jsx-a11y
- [ ] `npm run check` — zero TypeScript errors
- [ ] `npm run test:a11y` — pa11y-ci green across all tested URLs
- [ ] Lighthouse Accessibility score ≥ 95 on `/`, representative content page, and any form page
- [ ] [WAVE](https://wave.webaim.org/) — zero errors on the top 3 pages
- [ ] axe DevTools browser extension — zero violations on the top 3 pages

## Keyboard-only navigation

- [ ] Tab through the entire page — focus order matches visual order
- [ ] Skip-link visible on first Tab press
- [ ] Every interactive element reachable (nav, buttons, links, form controls, modals, drawers)
- [ ] Every interactive element activatable with Enter / Space
- [ ] Modals: focus trapped, Escape closes, focus returns to trigger
- [ ] Drawers / menus: same trap + Escape behaviour
- [ ] No keyboard traps — you can always Tab out

## Screen-reader (spot-check)

2-minute pass per representative page type. macOS: VoiceOver (Cmd+F5). Windows: NVDA (free).

- [ ] Page title announced on load
- [ ] Landmark navigation works (header / nav / main / footer)
- [ ] Heading order logical — `h1` → `h2` → `h3` with no skipped levels
- [ ] Every image has alt text (or is aria-hidden if decorative)
- [ ] Form labels announced with their fields
- [ ] Error messages associated with their field (aria-describedby)
- [ ] Buttons/links announce their action, not "button" / "link"

## Visual

- [ ] 200 % zoom — no content clipped, no horizontal scroll on content (nav exceptions OK)
- [ ] 400 % zoom — text reflows, no horizontal scroll for body content
- [ ] High-contrast mode (Windows) — content remains visible
- [ ] Forced dark mode (system toggle) — no unreadable combos

## Contrast

Run every unique foreground / background combo through [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/).

- [ ] Body text ≥ 4.5:1
- [ ] Large text (18pt+ or 14pt+ bold) ≥ 3:1
- [ ] UI components (button borders, icons) ≥ 3:1 against background
- [ ] Focus rings ≥ 3:1 against both adjacent colours

## Motion

- [ ] Enable `prefers-reduced-motion: reduce` (DevTools → Rendering) — all GSAP animations collapse
- [ ] No auto-playing video > 5 s without pause control
- [ ] No flashing content > 3 times per second

## Forms

- [ ] Labels persistently visible (no placeholder-only)
- [ ] Required fields marked both visually and via `required`
- [ ] Error messages appear next to fields, announced by screen reader
- [ ] Autocomplete attributes on name, email, address, tel fields

## Structured data + SEO

- [ ] `<title>` and `<meta name="description">` present on every page
- [ ] `<h1>` present and unique per page
- [ ] OG + Twitter Cards show correctly on [opengraph.xyz](https://www.opengraph.xyz/)
- [ ] JSON-LD validates via [Rich Results Test](https://search.google.com/test/rich-results)
