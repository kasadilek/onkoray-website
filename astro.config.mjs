// @ts-check
import { defineConfig, envField } from "astro/config";
// Uncomment alongside the `fonts: []` scaffold below.
// import { fontProviders } from "astro/config";
import { generateVarUtils } from "./src/utils/build-scripts/generate-variables-utilities.ts";
import { replaceSvgBlackIntegration } from "./src/utils/build-scripts/svg-black-to-currentcolor.js";

import icon from "astro-icon";
import sitemap from "@astrojs/sitemap";
import compressor from "astro-compressor";
import vercel from "@astrojs/vercel";

const site =
  process.env.PUBLIC_SITE_URL ??
  process.env.SITE_URL ??
  `http://localhost:${process.env.PORT ?? 4321}`;

// Enable the Vercel adapter only when actually deploying to Vercel.
const useVercel = process.env.VERCEL === "1" || process.env.USE_VERCEL === "1";

// https://astro.build/config
export default defineConfig({
  site,
  output: "static",

  ...(useVercel ? { adapter: vercel({ imageService: true }) } : {}),

  devToolbar: {
    enabled: false,
  },

  scopedStyleStrategy: "where",

  prefetch: {
    prefetchAll: true,
    defaultStrategy: "viewport",
  },

  // Astro Fonts API — uncomment and configure per project.
  // Docs: https://docs.astro.build/en/guides/fonts/
  //
  // Providers: local(), fontsource(), google(), bunny(), adobe(), fontshare(), npm()
  // Use <Font cssVariable="--font-brand" preload /> in BaseHead slot to mount.
  // See docs/FONTS.md for a full walkthrough.
  //
  // fonts: [
  //   {
  //     provider: fontProviders.local(),
  //     name: "Brand",
  //     cssVariable: "--font-brand",
  //     options: {
  //       variants: [
  //         { src: ["./src/assets/fonts/brand-regular.woff2"], weight: 400, style: "normal" },
  //         { src: ["./src/assets/fonts/brand-bold.woff2"], weight: 700, style: "normal" },
  //       ],
  //     },
  //   },
  //   // Or use any hosted provider, e.g. Fontsource:
  //   // {
  //   //   provider: fontProviders.fontsource(),
  //   //   name: "Inter",
  //   //   cssVariable: "--font-inter",
  //   //   weights: [400, 500, 700],
  //   //   subsets: ["latin", "latin-ext"],
  //   // },
  // ],

  // i18n scaffolding — uncomment and adjust per project.
  //
  // i18n: {
  //   defaultLocale: "de",
  //   locales: ["de", "en"],
  //   routing: {
  //     prefixDefaultLocale: false,
  //   },
  // },

  env: {
    schema: {
      PUBLIC_SITE_URL: envField.string({
        context: "client",
        access: "public",
        default: "http://localhost:4321",
      }),
      PUBLIC_SITE_NAME: envField.string({
        context: "client",
        access: "public",
        default: "OnkoRay",
      }),
      PUBLIC_DEFAULT_LOCALE: envField.string({
        context: "client",
        access: "public",
        default: "de",
      }),
      PUBLIC_ANALYTICS_PROVIDER: envField.enum({
        context: "client",
        access: "public",
        values: ["plausible", "vercel", "none"],
        default: "none",
      }),
    },
  },

  integrations: [
    generateVarUtils(),
    replaceSvgBlackIntegration(),
    icon({
      iconDir: "src/assets/icons/currentColor",
    }),
    sitemap(),
    // astro-compressor MUST be last — compresses the final static output.
    compressor({
      gzip: true,
      brotli: true,
    }),
  ],
});
