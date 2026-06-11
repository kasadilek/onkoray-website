# Changelog

All notable changes to this project are documented here.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

## [0.1.0] — 2026-04-22

Initial release of the Astro Skeleton Starter. Migrated from a DatoCMS-specific boilerplate to a CMS-agnostic skeleton with Performance, SEO, A11y, and GSAP layers in place.

### Added

- **Setup & DX**
  - Astro 6.x, TypeScript strict, Node 22 baseline, path aliases (`@/`, `@components`, `@layouts`, `@lib`, `@styles`, `@content`)
  - ESLint 9 flat config with `eslint-plugin-astro`, `typescript-eslint`, `jsx-a11y`
  - Prettier + Husky + lint-staged pre-commit
  - Typed env via `astro:env` (`PUBLIC_SITE_URL`, `PUBLIC_SITE_NAME`, `PUBLIC_DEFAULT_LOCALE`, `PUBLIC_ANALYTICS_PROVIDER`)
- **Performance layer**
  - Built-in prefetch (viewport strategy, prefetchAll)
  - `astro-compressor` for gzip + brotli + zstd output
  - `<BaseHead>` with font preload support
  - `<ResponsiveImage>` wrapper (AVIF + WebP, lazy, decoding async)
  - Opt-in View Transitions via `enableViewTransitions` prop
- **SEO layer**
  - `<BaseHead>` with OG, Twitter Cards, canonical, noindex, site_name, locale
  - `<JsonLd>` component typed via `schema-dts`
  - `/api/og.png` endpoint (Satori + resvg, portable across hosts)
  - Dynamic `/robots.txt` from siteConfig
  - `src/lib/seo.ts` helpers (`buildCanonical`, `truncateDescription`, `mergeSEODefaults`)
- **A11y layer**
  - `<SkipLink>`, `<VisuallyHidden>`, `<Icon>` (astro-icon wrapper with a11y)
  - `:focus-visible` defaults with CSS custom properties
  - 44×44 min touch targets (WCAG 2.5.5)
  - Reduced-motion safety net + SSR-safe `prefersReducedMotion()` helper
  - `pa11y-ci` WCAG 2.1 AA config
- **Animations layer**
  - GSAP + ScrollTrigger plugin registry
  - `<FadeIn>`, `<SlideUp>`, `<ScrollReveal>`, `<Parallax>` primitives
  - Shared `initAnimations()` with reduced-motion bail
  - `astro:before-preparation` cleanup for View-Transitions compatibility
  - Demo page at `/demo/animations` (deletable per project)
- **Deploy & CI**
  - Vercel adapter wired (engages only when `VERCEL=1`)
  - GitHub Actions CI: lint, typecheck, build, a11y (pa11y), Lighthouse ≥ 95
  - `lighthouserc.json` with thresholds across Performance, A11y, Best Practices, SEO
  - `vercel.json` with long-lived cache headers for static assets
- **Bundled AI-agent skills** (`.claude/skills/`)
  - GSAP: core, timeline, scrolltrigger, plugins, utils, react, performance, frameworks (from greensock/gsap-skills, MIT)
  - `web-design-guidelines` (from vercel-labs/agent-skills)
  - `seo-audit`, `ai-seo` (from coreyhaines31/marketingskills, MIT)
  - `seo-geo` (from resciencelab/opc-skills, Apache-2.0)
- **Docs**
  - README as star doc with Quick Start, structure, Design-Layer-in-5-Steps
  - `docs/ARCHITECTURE.md`, `ANIMATIONS.md`, `SEO.md`, `A11Y.md`, `A11Y-CHECKLIST.md`, `IMAGES.md`, `DESIGN-HANDOFF.md`

### Kept from original boilerplate

- Utopia-based design-token system (`tokens/*.ts` → generated CSS vars + utility classes)
- SVG `fill="black"` → `currentColor` integration
- CUBE CSS structure (blocks / layout / utilities)
- PostCSS setup with `postcss-preset-env`, `postcss-import-ext-glob`, `@csstools/postcss-global-data`
- `astro-icon` with `iconDir: "src/assets/icons/currentColor"`
- `@astrojs/sitemap` integration
- `.prettierrc`, `.vscode/`

### Removed

- `@datocms/astro` and all DatoCMS-specific components, queries, helpers
- `@astrojs/netlify` adapter (replaced with Vercel + portable static fallback)
- `@fontsource-variable/sora` default font
- `dotenv` (replaced with Astro's `astro:env`)
- Demo assets (`src/assets/images/laptop.jpg`)
