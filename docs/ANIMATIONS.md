# Animations

## Primitives

Four ready-to-use animation wrappers in [`src/components/animations/`](../src/components/animations/). Each renders a `<div data-animate="<type>">` around its slot content. A shared init script (hoisted once per page by Vite) reads the data attributes and sets up GSAP tweens + `ScrollTrigger`.

### `<FadeIn>`

```astro
<FadeIn duration={0.8} delay={0.2}>
  <p>Opacity 0 → 1 when in viewport.</p>
</FadeIn>
```

Props: `duration`, `delay`.

### `<SlideUp>`

```astro
<SlideUp distance={60}>
  <h2>Slides up + fades in</h2>
</SlideUp>
```

Props: `duration`, `delay`, `distance` (px, default 40).

### `<ScrollReveal>`

Generic — pass any GSAP `TweenVars` as `from`/`to`.

```astro
<ScrollReveal
  from={{ opacity: 0, x: -60, rotate: -2 }}
  to={{ opacity: 1, x: 0, rotate: 0 }}
  duration={0.8}
  ease="power3.out"
>
  <div class="card">…</div>
</ScrollReveal>
```

### `<Parallax>`

```astro
<Parallax speed={0.4}>
  <img src="..." alt="" />
</Parallax>
```

`speed` < 1 → slower than scroll (background). `speed` > 1 → faster than scroll. `0.5` is the conventional "half-speed parallax".

## Reduced-motion

The skeleton is reduced-motion-first:

1. **CSS:** initial hidden states only apply inside `@media (prefers-reduced-motion: no-preference)` ([animations.css](../src/styles/animations.css))
2. **JS:** [`initAnimations()`](../src/lib/animations.ts) bails immediately when `prefersReducedMotion()` is true — marks elements as initialized so CSS never hides them, never registers `ScrollTrigger`s
3. **CSS safety-net:** a global `@media (prefers-reduced-motion: reduce)` rule in [`_reset.css`](../src/styles/_reset.css) neutralizes any 3rd-party animation/transition

Test with: DevTools → Rendering → Emulate CSS media feature `prefers-reduced-motion: reduce`.

## Custom animations

### Pattern 1: data-attribute driven

Add a new handler to [`src/lib/animations.ts`](../src/lib/animations.ts):

```ts
handlers["zoom-in"] = (el) => {
  gsap.fromTo(
    el,
    { opacity: 0, scale: 0.8 },
    {
      opacity: 1,
      scale: 1,
      duration: num(el, "data-duration", 0.6),
      scrollTrigger: { trigger: el, start: "top 85%", once: true },
    }
  );
};
```

Use via `<div data-animate="zoom-in">…</div>` or wrap in a component.

### Pattern 2: Page-specific animation

If the animation is one-off, skip the primitive and inline:

```astro
<section id="hero">…</section>

<script>
  import { gsap } from "@lib/gsap";
  import { prefersReducedMotion } from "@lib/reduced-motion";

  document.addEventListener("astro:page-load", () => {
    if (prefersReducedMotion()) return;
    gsap.from("#hero h1", {
      opacity: 0,
      y: 40,
      duration: 1,
      stagger: 0.1,
    });
  });
</script>
```

## View Transitions + GSAP

When `enableViewTransitions` is active on `<BaseLayout>`, the `<ClientRouter />` fires:

- `astro:page-load` — run on every navigation (initial + subsequent)
- `astro:before-preparation` — cleanup hook before next page loads

The animation components already wire both. If you add custom animations, mirror the pattern:

```ts
document.addEventListener("astro:page-load", initYourAnimation);
document.addEventListener("astro:before-preparation", cleanupYourAnimation);
```

Otherwise ScrollTriggers from the previous page stick around and cause weird behavior.

## GSAP Club plugins

All GSAP plugins are **free** since the Webflow acquisition (2024). SplitText, MorphSVG, DrawSVG, Physics — all included under the standard GSAP license.

```bash
npm install gsap
```

```ts
// src/lib/gsap.ts
import { SplitText } from "gsap/SplitText";
gsap.registerPlugin(ScrollTrigger, SplitText);
export { gsap, ScrollTrigger, SplitText };
```

The skeleton ships only Core + ScrollTrigger for bundle-size discipline (~115 KB). Add plugins per project when needed.

## AI-Agent Skills

The [`.claude/skills/`](../.claude/skills/) folder includes official GreenSock skills — Claude Code, Cursor etc. automatically know how to write correct GSAP code. Ask them:

> "Add a staggered reveal to the testimonials section with ScrollTrigger pinning."

The agent will pull from `gsap-scrolltrigger` + `gsap-timeline` skills and produce idiomatic code.
