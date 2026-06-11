# Images

## `<ResponsiveImage>`

Wrapper around Astro's `<Picture />` with sensible defaults: AVIF + WebP, lazy-loaded, async-decoded.

```astro
---
import ResponsiveImage from "@components/base/ResponsiveImage.astro";
import hero from "@/assets/images/hero.jpg";
---

<ResponsiveImage
  src={hero}
  alt="Description of the image"
  widths={[400, 800, 1200, 1600]}
  sizes="(min-width: 48rem) 50vw, 100vw"
/>
```

| Prop      | Default            | Notes                                 |
| --------- | ------------------ | ------------------------------------- |
| `src`     | –                  | Imported asset (`ImageMetadata`)      |
| `alt`     | –                  | Required. Empty string for decorative |
| `widths`  | –                  | Array of px widths for `srcset`       |
| `sizes`   | –                  | `sizes` media query string            |
| `formats` | `["avif", "webp"]` | Emission order — first is preferred   |
| `loading` | `"lazy"`           | Use `"eager"` for above-the-fold hero |
| `class`   | –                  | Applied to `<img>`                    |

## Local images

Put source files in `src/assets/images/` (not `public/`). Astro processes them through the optimization pipeline:

```astro
---
import photo from "@/assets/images/photo.jpg";
---

<ResponsiveImage src={photo} alt="…" widths={[400, 800]} />
```

## Unsplash / remote images

Add the host to `astro.config.mjs`:

```js
image: {
  remotePatterns: [
    { protocol: "https", hostname: "images.unsplash.com" },
  ],
}
```

Then import astro:assets directly:

```astro
---
import { Picture } from "astro:assets";
---

<Picture
  src="https://images.unsplash.com/photo-123"
  alt="…"
  widths={[400, 800]}
  formats={["avif", "webp"]}
  inferSize
/>
```

## Format recommendations

| Content               | Format                                           |
| --------------------- | ------------------------------------------------ |
| Photos                | AVIF + WebP (fallback), no JPG                   |
| Flat UI illustrations | SVG (inline via `<Icon>` if possible, else PNG)  |
| Transparency          | WebP (smaller than PNG)                          |
| Animation             | WebP animated > GIF                              |
| Above-the-fold hero   | Force `loading="eager"` + `fetchpriority="high"` |

## SVG-to-currentColor

Icons dropped into `src/assets/icons/` get their `fill="black"` and `stroke="black"` automatically rewritten to `currentColor` at build time via [`replaceSvgBlackIntegration`](../src/utils/build-scripts/svg-black-to-currentcolor.js). Use `<Icon name="arrow">` from `astro-icon/components` — colour follows the surrounding text colour:

```astro
<a class="text-brand">
  Read more <Icon name="arrow-right" />
</a>
```

## Hero LCP optimization

Largest Contentful Paint is almost always a hero image. Keep it fast:

```astro
<ResponsiveImage
  src={hero}
  alt="…"
  loading="eager"
  fetchpriority="high"
  widths={[800, 1200, 1600, 2000]}
  sizes="100vw"
/>
```

For critical hero images, also add an explicit preload via the BaseLayout head slot:

```astro
<BaseLayout>
  <link slot="head" rel="preload" as="image" href="/_astro/hero.webp" />
</BaseLayout>
```

## Cropping + focal point

Astro's `<Image>` doesn't offer focal-point cropping out of the box. For editorial content where focal point matters, use an image CDN (Imgix, Cloudinary) or process images upstream. The skeleton assumes images are already framed correctly.

## Size budgets

Post-optimization targets:

- Hero image: < 150 KB (AVIF) / < 250 KB (WebP)
- Body image: < 80 KB (AVIF)
- Thumbnail: < 20 KB

Verify in DevTools Network tab. If you're over, source image is too large — reduce before import.
