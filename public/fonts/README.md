# Fonts (legacy manual path)

> **Prefer Astro's Fonts API.** See [`docs/FONTS.md`](../../docs/FONTS.md).
> The Astro Fonts API handles self-hosting, preload, metric-optimized
> fallbacks, and subsets declaratively — no need to manage `@font-face`
> yourself.

This folder exists only for cases where the Fonts API doesn't cover what
you need (e.g. custom delivery URLs, ServiceWorker strategies, icon
fonts). Most projects should leave this folder empty and use the Fonts
API with `provider: fontProviders.local()` pointing at
`src/assets/fonts/`.

If you do need the manual path:

1. Drop WOFF2 files here.
2. Declare `@font-face` in a new global stylesheet (or inline `<style is:global>` in `BaseLayout`).
3. Reference the family in CSS.
4. Preload critical files manually in `<BaseLayout>` via the `head` slot:

   ```astro
   <BaseLayout>
     <link
       slot="head"
       rel="preload"
       as="font"
       type="font/woff2"
       href="/fonts/your-font.woff2"
       crossorigin="anonymous"
     />
   </BaseLayout>
   ```
