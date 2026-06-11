# Design Handoff

How to turn the skeleton into a client project.

## 0. Rename the project

```json
// package.json
{
  "name": "client-name-website",
  "version": "0.1.0",
  "description": "Website for Client Name"
}
```

Update `PUBLIC_SITE_NAME` in `.env` to match.

## 1. Tokens — colours, typography, spacing

Token files in [`tokens/`](../tokens/) are the **single source of truth** for design. Every edit regenerates `src/styles/generated/_variables.css` + `_utilities.css` on the next `npm run dev` or `npm run build`.

### Colours

```ts
// tokens/colors.ts
export const colors = {
  black: "#111111",
  white: "#ffffff",

  "brand-500": "#ff5500",
  "brand-600": "#dd4400",
  "brand-100": "#fff1eb",

  "gray-100": "#f5f5f5",
  "gray-500": "#6b7280",
  "gray-900": "#111827",
};
```

Produces:

- CSS vars: `--color-black`, `--color-brand-500` …
- Utilities: `.text-brand-500`, `.bg-brand-500` …

### Typography scale

Uses [Utopia](https://utopia.fyi) for fluid type:

```ts
// tokens/fontSize.ts
export const fontSize = {
  ...calculateTypeScale({
    minWidth: 320,
    maxWidth: 1440,
    minFontSize: 17,
    maxFontSize: 20,
    minTypeScale: 1.2, // Minor third
    maxTypeScale: 1.333, // Perfect fourth
    positiveSteps: 5,
    negativeSteps: 1,
  }).reduce(/* … */),
};
```

Produces `--text-step--1` through `--text-step-5` plus `.text-step-*` utility classes.

### Spacing

```ts
// tokens/spacing.ts
export const spacing = {
  ...calculateSpaceScale({
    minWidth: 320,
    maxWidth: 1440,
    minSize: 16,
    maxSize: 24,
    positiveSteps: [1.5, 2, 3, 4, 6],
    negativeSteps: [0.75, 0.5, 0.25],
  }).reduce(/* … */),
};
```

Produces `--space-xs` through `--space-3xl` plus `.p-*`, `.px-*`, `.py-*`, `.stack-*` utilities.

### Font weights + line heights

```ts
// tokens/fontWeight.ts
export const fontWeights = {
  regular: 400,
  medium: 500,
  bold: 700,
};

// tokens/lineHeight.ts
export const lineHeights = {
  tight: 1.1,
  normal: 1.5,
  loose: 1.7,
};
```

## 2. Fonts

Astro's Fonts API handles this declaratively — one config entry + one component. See [`docs/FONTS.md`](./FONTS.md) for the full walkthrough.

Quick version:

1. Drop WOFF2 into `src/assets/fonts/`
2. Register in `astro.config.mjs`:
   ```js
   fonts: [
     {
       provider: fontProviders.local(),
       name: "Brand",
       cssVariable: "--font-brand",
       options: {
         variants: [
           {
             src: ["./src/assets/fonts/brand.woff2"],
             weight: 400,
             style: "normal",
           },
         ],
       },
     },
   ];
   ```
3. Mount in pages via the BaseLayout slot:
   ```astro
   <Font slot="head" cssVariable="--font-brand" preload />
   ```

`src/styles/_root.css` already uses `var(--font-brand)` as the leading `font-family` with system-ui fallback — no edit needed.

## 3. Design components

Create `src/components/ui/` — deliberately absent from the skeleton. Typical starters:

- `Button.astro` (promote the existing generic one, or replace)
- `Card.astro`
- `Section.astro`
- `Heading.astro` (variant-based: h1/h2/display)
- `Link.astro` (external/internal-aware, external gets `rel="noopener"`)

Keep them composable: **components should have no margins** — spacing lives in layout wrappers (see [`src/styles/layout/`](../src/styles/layout/)).

## 4. Pages + layouts

- New pages → `src/pages/` — use `<BaseLayout>` as shell
- Additional layouts → `src/layouts/` — e.g. `BlogLayout`, `CaseStudyLayout`, inheriting `BaseLayout` via slot composition
- Dynamic routes → `src/pages/[slug].astro` with `getStaticPaths`

## 5. OG image template

1. Drop a brand font at `src/assets/fonts/og-font.ttf`
2. Edit [`src/lib/og-image.ts`](../src/lib/og-image.ts) — the Satori JSX maps to flexbox layout
3. `npm run build` → `/api/og.png` renders with your styling

## 6. CMS (per-project choice)

The skeleton is CMS-agnostic. Typical integrations:

- **Keystatic** — local-Git CMS, zero hosting, commits to your repo. Good for personal sites, small agencies.
- **Sanity** — hosted, real-time, structured content. Good for teams, large content volumes.
- **DatoCMS / Contentful** — GraphQL-based, hosted. Good for German market (Dato).
- **Local MDX** — `src/content/` collections, no CMS. Good for devs / docs sites.

Wire the data source into `src/content.config.ts`. Each entry-type becomes a typed collection.

## 7. Forms

Astro Actions are the lean default. Type-safe end-to-end via Zod, progressive-enhancement out of the box, JSON or form-encoded.

Requires on-demand rendering on the form page (`output: "server"` or `output: "hybrid"` + an adapter).

```ts
// src/actions/index.ts
import { defineAction } from "astro:actions";
import { z } from "astro/zod";

export const server = {
  newsletter: defineAction({
    accept: "form",
    input: z.object({
      email: z.email(),
      terms: z.boolean(),
    }),
    handler: async ({ email }) => {
      // send to Resend / Mailjet / your provider
      return { ok: true };
    },
  }),
};
```

```astro
---
// src/pages/signup.astro
import { actions } from "astro:actions";
const result = Astro.getActionResult(actions.newsletter);
---

<form method="POST" action={actions.newsletter}>
  <label>
    E-Mail
    <input required type="email" name="email" />
  </label>
  <label>
    <input required type="checkbox" name="terms" />
    AGB akzeptieren
  </label>
  <button>Anmelden</button>
  {result?.error && <p>Fehler — bitte erneut versuchen.</p>}
  {result?.data?.ok && <p>Danke!</p>}
</form>
```

Alternatives (no backend needed): Formspree, Web3Forms, Netlify Forms (if hosting there).

## 8. Analytics + Consent

If the site uses cookieless analytics (Plausible, Fathom):

```astro
<!-- BaseLayout head slot -->
<script
  defer
  data-domain="your-domain.com"
  src="https://plausible.io/js/script.js"
  slot="head"></script>
```

If using GA4 / GTM / Meta Pixel:

1. Install a cookie-consent module (Klaro, CookieConsent.v3)
2. Gate analytics loading behind consent
3. Document consent flow for legal

## 9. Deployment

Deployment-specific docs in [README.md § Deployment](../README.md#deployment).

First deploy checklist:

- [ ] `PUBLIC_SITE_URL` set on host (Vercel project settings, etc.)
- [ ] Custom domain configured
- [ ] HTTPS enforced
- [ ] 301 redirects from old site (`vercel.json → redirects`)
- [ ] Sitemap submitted to Google Search Console
- [ ] Analytics tag live

## 10. Pre-launch

Run through [`A11Y-CHECKLIST.md`](./A11Y-CHECKLIST.md). Merge nothing without it green.
