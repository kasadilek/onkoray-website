# Architecture

## Principles

### Zero-JS by default

Astro ships **no JavaScript** unless a component explicitly opts in. Every page starts with 0 KB of client JS. Interactivity is added one island at a time via `<script>` tags or framework components with `client:*` directives.

**Implication:** A page without animations / framework components has no JS bundle. The prefetch script is the only unconditional runtime JS, and it's ~2 KB.

### Islands over SPA

The skeleton does **not** ship a React/Vue/Svelte runtime. Interactive parts are isolated islands — a video player, a map widget, an animation block. State never crosses island boundaries.

View Transitions (`<ClientRouter />`) are opt-in via the `enableViewTransitions` prop on `<BaseLayout>`. Default is `false` because the ~4 KB router is wasted on static marketing pages.

### Design-less on purpose

The skeleton ships **no default design**. `tokens/` files are template scaffolds — empty-ish objects the token generator consumes. This prevents the "remove the default theme" ritual every new project would otherwise need.

## Why not React / Tailwind out of the box?

- **React:** Adds ~45 KB runtime per page that uses a single island. GSAP, the primary animation library here, is vanilla JS — no React needed. When a project actually needs React (complex form, dashboard), it's `astro add react` away.
- **Tailwind:** Preference varies per project. An empty Tailwind config still ships ~20 KB of utility CSS baseline. Enable per-project via `astro add tailwind`.

## Folder conventions

- `src/components/base/` — reusable skeleton primitives (`BaseHead`, `ResponsiveImage`, `Icon`). Keep framework-agnostic.
- `src/components/a11y/` — a11y-specific (`SkipLink`, `VisuallyHidden`).
- `src/components/animations/` — GSAP-powered primitives.
- `src/components/seo/` — structured-data helpers (`JsonLd`).
- `src/components/ui/` — **deliberately not in the skeleton**. Design-Layer lives here per project.
- `src/lib/` — pure TypeScript utilities, no Astro frontmatter. Importable from both `.astro` and `.ts` files.

## Build pipeline

1. `generateVarUtils` → reads `tokens/*.ts` → writes `src/styles/generated/*.css`
2. `replaceSvgBlackIntegration` → rewrites `fill="black"` / `stroke="black"` to `currentColor` in `src/assets/icons/`
3. Astro builds routes + islands
4. `@astrojs/sitemap` emits `sitemap-index.xml`
5. `astro-compressor` (last) emits `.gz` / `.br` / `.zst` next to every output

## Render modes

- **Default:** `output: "static"` — full SSG, fastest, deployable anywhere
- **Vercel:** set `VERCEL=1` or deploy via Vercel → `@astrojs/vercel` adapter engages, gives you ISR + image optimization
- **Server:** if you need per-request logic (auth, A/B testing, personalization) switch to `output: "server"` and add the adapter for your host

## When static isn't enough — Astro 6 upgrade paths

The skeleton is static-first, but the same shell scales up without a rewrite when a project grows. Three upgrade paths to keep in mind:

### Server Islands (`server:defer`)

Render a single component on demand while the rest of the page stays static. Useful for personalized fragments (avatar, basket count) on otherwise cacheable pages.

```astro
---
import UserAvatar from "@components/UserAvatar.astro";
---

<UserAvatar server:defer>
  <img slot="fallback" src="/generic-avatar.svg" alt="" />
</UserAvatar>
```

Requires an adapter (`@astrojs/vercel` et al.). Astro inlines a small script that fetches the island after the main document paints — no full-page SSR needed. [Docs](https://docs.astro.build/en/guides/server-islands/).

### Astro Actions

Type-safe server-side mutations with Zod validation, progressive enhancement, and automatic error handling. Replaces hand-written API routes for forms. See `docs/DESIGN-HANDOFF.md § 7 Forms` for the wiring.

### Live Content Collections (Astro 6.0+)

`src/live.config.ts` with `defineLiveCollection()` — fetches CMS data per request instead of at build time. Useful when content updates shouldn't require a rebuild (stock, inventory, user-generated content).

```ts
import { defineLiveCollection } from "astro:content";
import { sanityLoader } from "@sanity/astro-loader"; // example

export const collections = {
  products: defineLiveCollection({
    loader: sanityLoader({ projectId: "…" }),
  }),
};
```

Build-time `defineCollection()` in `src/content.config.ts` stays the default — live collections are opt-in where freshness matters more than perf.

## What makes this opinionated

- **German locale default** — reflects typical agency audience; override via `PUBLIC_DEFAULT_LOCALE`
- **Utopia fluid type + space** — no breakpoint hell
- **CUBE CSS** — layout / blocks / utilities separation in `src/styles/`
- **CSS Layers** — `@layer fonts, reset, layout, plugins, utils, blocks;` for predictable specificity
