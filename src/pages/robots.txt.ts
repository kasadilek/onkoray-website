import type { APIRoute } from "astro";
import { siteConfig } from "@lib/site-config";

export const prerender = true;

export const GET: APIRoute = () => {
  const body = `User-agent: *
Allow: /

Sitemap: ${new URL("sitemap-index.xml", siteConfig.url).href}
`;
  return new Response(body, {
    status: 200,
    headers: { "Content-Type": "text/plain" },
  });
};
