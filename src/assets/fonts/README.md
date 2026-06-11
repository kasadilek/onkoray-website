# `src/assets/fonts/`

Font files referenced from `astro.config.mjs` via the **Astro Fonts API**
(`fontProviders.local()`). Put your brand fonts here and they'll be
picked up, preloaded, subset-optimized, and served with metric-matched
fallbacks.

See [`docs/FONTS.md`](../../../docs/FONTS.md) for the full workflow.

## Optional: OG image font

The Satori-based OG image endpoint at
[`src/pages/api/og.png.ts`](../../pages/api/og.png.ts) reads
`og-font.ttf` from this folder at build time. Drop a TTF/OTF here and
`/api/og.png` renders real previews. Missing font → transparent
placeholder (no build failure).

Why separate from the site typography font:

- Satori requires a font buffer at build time, not a CSS reference.
- The OG font can be simpler (single weight, Latin-only) than the
  full site family, keeping the build fast.
- If you want the same font for both, the Fonts API still needs a
  local file path — just point both at the same file.
