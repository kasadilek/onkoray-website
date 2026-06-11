# SEO

## `<BaseLayout>` SEO props

Every page inherits these through the layout:

```astro
<BaseLayout
  title="Products | Acme"
  description="Short description under 160 chars."
  image="/api/og.png"
  type="website"
  canonicalURL={new URL("/products", Astro.site)}
  noindex={false}
  lang="de-DE"
/>
```

| Prop           | Default                        | Notes                                                    |
| -------------- | ------------------------------ | -------------------------------------------------------- |
| `title`        | `siteConfig.name`              | Appears in `<title>`, `og:title`, `twitter:title`        |
| `description`  | –                              | Truncated to 160 chars (word-safe)                       |
| `image`        | –                              | Absolute or relative URL. Resolved against canonical     |
| `canonicalURL` | Auto from `Astro.url.pathname` | Override for paginated pages / filters                   |
| `type`         | `"website"`                    | `"article"`, `"profile"` also supported                  |
| `noindex`      | `false`                        | Emits `<meta name="robots" content="noindex, nofollow">` |
| `lang`         | `siteConfig.locale`            | Drives `<html lang>` + `og:locale`                       |

## JSON-LD

```astro
---
import BaseLayout from "@/layouts/BaseLayout.astro";
import JsonLd from "@components/seo/JsonLd.astro";
---

<BaseLayout title="About">
  <JsonLd
    slot="head"
    schema={{
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "Acme GmbH",
      url: "https://acme.com",
      logo: "https://acme.com/logo.png",
      sameAs: ["https://twitter.com/acme", "https://linkedin.com/company/acme"],
    }}
  />
  <!-- page content -->
</BaseLayout>
```

The `schema` prop is typed via [`schema-dts`](https://github.com/google/schema-dts) — autocomplete in your editor gives you all 800+ Schema.org types.

### Common schemas

**Article (blog posts):**

```ts
{
  "@context": "https://schema.org",
  "@type": "Article",
  headline: post.title,
  datePublished: post.date.toISOString(),
  author: { "@type": "Person", name: post.author },
  image: post.cover,
}
```

**BreadcrumbList:**

```ts
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://…/" },
    { "@type": "ListItem", position: 2, name: "Blog", item: "https://…/blog" },
    { "@type": "ListItem", position: 3, name: post.title },
  ],
}
```

**FAQPage:**

```ts
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.question,
    acceptedAnswer: { "@type": "Answer", text: f.answer },
  })),
}
```

Validate with [Google Rich Results Test](https://search.google.com/test/rich-results).

## OG Images

### Out-of-the-box

The `/api/og.png` endpoint returns a **1×1 placeholder PNG** until you provide a font.

### Enable real rendering

1. Drop a TTF/OTF into [`src/assets/fonts/og-font.ttf`](../src/assets/fonts/README.md).
2. Rebuild. The endpoint now renders a 1200×630 PNG using your font.
3. Reference per page:
   ```astro
   <BaseLayout image="/api/og.png" />
   ```

### Customize the design

Edit [`src/lib/og-image.ts`](../src/lib/og-image.ts). The Satori JSX object supports flexbox, colors, gradients, nested divs.

### Per-page dynamic images

Static builds only generate one OG image. For dynamic `/api/og.png?title=...&subtitle=...`:

1. In `astro.config.mjs`, switch `output: "server"` (or `"hybrid"`).
2. Add an adapter (`@astrojs/vercel` etc.).
3. Remove `export const prerender = true;` from `src/pages/api/og.png.ts`.
4. Read query params: `const url = new URL(request.url); const title = url.searchParams.get("title");`

## Sitemap

`@astrojs/sitemap` is wired in `astro.config.mjs`. Every build produces `dist/sitemap-index.xml` — automatically included in `robots.txt` via `src/pages/robots.txt.ts`.

## Analytics

`<BaseLayout>` does **not** auto-inject analytics. The `PUBLIC_ANALYTICS_PROVIDER` env var is reserved for the wire-up:

- `none` (default) — no script
- `plausible` — cookieless, no consent banner needed (add to BaseHead slot)
- `vercel` — `@vercel/analytics` (opt-in, adds JS)

Wire it up per project — the scaffolding is intentional, not a default.

## AI-SEO (citation optimization)

`.claude/skills/ai-seo/` and `.claude/skills/seo-geo/` give AI agents the citation-first playbook: structure content for LLM extraction (ChatGPT, Perplexity, Claude). Ask the agent:

> "Audit the homepage for AI-SEO citation potential."

It'll apply the bundled skill's rules.
