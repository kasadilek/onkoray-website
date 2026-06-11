import { siteConfig } from "./site-config";

export const buildCanonical = (
  pathname: string,
  origin: URL = siteConfig.url
): URL => {
  const clean =
    pathname !== "/" && pathname.endsWith("/")
      ? pathname.slice(0, -1)
      : pathname;
  return new URL(clean, origin);
};

// Google truncates meta descriptions around 160 chars. Break on the last
// whitespace so we don't slice mid-word.
export const truncateDescription = (text: string, maxLen = 160): string => {
  if (text.length <= maxLen) return text;
  const slice = text.slice(0, maxLen);
  const lastSpace = slice.lastIndexOf(" ");
  const cut = lastSpace > maxLen * 0.6 ? slice.slice(0, lastSpace) : slice;
  return `${cut.trimEnd()}…`;
};

export interface SEODefaults {
  title?: string;
  description?: string;
  image?: string;
}

export const mergeSEODefaults = <T extends Partial<SEODefaults>>(
  page: T,
  defaults: SEODefaults
): T & SEODefaults => ({
  ...defaults,
  ...page,
});
