import {
  PUBLIC_ANALYTICS_PROVIDER,
  PUBLIC_DEFAULT_LOCALE,
  PUBLIC_SITE_NAME,
  PUBLIC_SITE_URL,
} from "astro:env/client";

export type AnalyticsProvider = "plausible" | "vercel" | "none";

export interface SiteConfig {
  url: URL;
  name: string;
  locale: string;
  analytics: AnalyticsProvider;
}

export const siteConfig: SiteConfig = {
  url: new URL(PUBLIC_SITE_URL),
  name: PUBLIC_SITE_NAME,
  locale: PUBLIC_DEFAULT_LOCALE,
  analytics: PUBLIC_ANALYTICS_PROVIDER as AnalyticsProvider,
};
