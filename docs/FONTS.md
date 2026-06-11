# Fonts

The skeleton uses [Astro's Fonts API](https://docs.astro.build/en/guides/fonts/) (Astro 6.0+) for self-hosted fonts. Declarative config, automatic `@font-face` generation, metric-optimized fallbacks, preload control, subsets — no manual CSS needed.

## Add a local brand font

1. Drop WOFF2 files into `src/assets/fonts/`:

   ```text
   src/assets/fonts/
     brand-regular.woff2
     brand-bold.woff2
     brand-italic.woff2
   ```

2. Register them in `astro.config.mjs`:

   ```js
   import { defineConfig, fontProviders } from "astro/config";

   export default defineConfig({
     fonts: [
       {
         provider: fontProviders.local(),
         name: "Brand",
         cssVariable: "--font-brand",
         options: {
           variants: [
             {
               src: ["./src/assets/fonts/brand-regular.woff2"],
               weight: 400,
               style: "normal",
             },
             {
               src: ["./src/assets/fonts/brand-bold.woff2"],
               weight: 700,
               style: "normal",
             },
             {
               src: ["./src/assets/fonts/brand-italic.woff2"],
               weight: 400,
               style: "italic",
             },
           ],
         },
       },
     ],
   });
   ```

3. Mount in `<head>` via the `<BaseLayout>` slot:

   ```astro
   ---
   import { Font } from "astro:assets";
   import BaseLayout from "@/layouts/BaseLayout.astro";
   ---

   <BaseLayout title="…">
     <Font slot="head" cssVariable="--font-brand" preload />
     <!-- page content -->
   </BaseLayout>
   ```

4. Use in CSS. `src/styles/_root.css` already sets `font-family: var(--font-brand), system-ui, …` on `body`, so you only need to:

   ```css
   .heading-accent {
     font-family: var(--font-brand);
     font-weight: 700;
   }
   ```

## Google Fonts / Fontsource / Bunny / Adobe / Fontshare

No npm packages. Switch the provider:

```js
fonts: [
  {
    provider: fontProviders.fontsource(),
    name: "Inter",
    cssVariable: "--font-inter",
    weights: [400, 500, 700],
    subsets: ["latin", "latin-ext"],
  },
];
```

Astro downloads, subsets, and self-hosts the files automatically at build time. No runtime requests to Google.

Supported providers: `local()`, `fontsource()`, `google()`, `bunny()`, `adobe()`, `fontshare()`, `npm()`. See the [provider reference](https://docs.astro.build/en/reference/font-provider-reference/).

## Selective preload

Preloading every weight × style combo floods the network. Scope preload to what's above the fold:

```astro
<Font
  slot="head"
  cssVariable="--font-brand"
  preload={[
    { weight: 400, style: "normal", subset: "latin" },
    { weight: 700, style: "normal", subset: "latin" },
  ]}
/>
```

## Metric-optimized fallbacks

Set to `true` by default. Astro analyses your font's metrics and adjusts the system-ui fallback's `size-adjust`, `ascent-override`, `descent-override`, `line-gap-override` so there's no layout shift when the real font loads. Override the generic family:

```js
{
  // …
  fallbacks: ["CustomFont", "serif"],  // or ["sans-serif"] (default)
}
```

Disable the optimization if you need manual control:

```js
{
  // …
  optimizedFallbacks: false,
}
```

## Icon fonts — don't

Use SVG. The skeleton ships `astro-icon` + our [`<Icon>`](../src/components/base/Icon.astro) wrapper. Icon fonts are a dead pattern — they ship tens of kilobytes of glyphs you never render, break with reduced-motion, and fail a11y.

## OG image font

Separate path, because Satori at build time needs a raw font buffer, not a CSS reference. See [`src/assets/fonts/README.md`](../src/assets/fonts/README.md).

## Migration from manual `@font-face`

Old flow:

```text
public/fonts/brand.woff2
+ @font-face in fonts.css
+ <link rel="preload"> in BaseHead
```

New flow:

```text
src/assets/fonts/brand.woff2
+ fonts: [{ provider: fontProviders.local(), … }] in astro.config.mjs
+ <Font cssVariable="--font-brand" preload /> in BaseHead slot
```

Benefits:

- One source of truth (config).
- Automatic metric-matched fallback — fixes CLS.
- Subset support built in.
- Swap provider (local → Fontsource) with a single line.
