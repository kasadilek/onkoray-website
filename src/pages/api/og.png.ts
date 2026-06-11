import type { APIRoute } from "astro";
import fs from "node:fs/promises";
import path from "node:path";
import { renderOgImage } from "@lib/og-image";
import { siteConfig } from "@lib/site-config";

export const prerender = true;

// 1x1 transparent PNG used when no OG font is configured yet.
// Drop a TTF/OTF into src/assets/fonts/og-font.ttf to render real images.
const PLACEHOLDER_PNG = Buffer.from(
  "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=",
  "base64"
);

const FONT_PATH = path.resolve(process.cwd(), "src/assets/fonts/og-font.ttf");

export const GET: APIRoute = async () => {
  let font: Buffer;
  try {
    font = await fs.readFile(FONT_PATH);
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") {
      return new Response(new Uint8Array(PLACEHOLDER_PNG), {
        status: 200,
        headers: { "Content-Type": "image/png" },
      });
    }
    throw error;
  }

  const png = await renderOgImage(
    {
      title: siteConfig.name,
      siteName: siteConfig.url.hostname,
    },
    {
      fonts: [
        {
          name: "OG",
          data: font,
          style: "normal",
          weight: 400,
        },
      ],
    }
  );

  return new Response(new Uint8Array(png), {
    status: 200,
    headers: {
      "Content-Type": "image/png",
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
};
