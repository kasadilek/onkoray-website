/**
 * SSR-safe check for the user's `prefers-reduced-motion` setting.
 *
 * Returns `false` on the server (no window) so animations are assumed
 * OK at render time; the client re-checks on hydration. Pair with the
 * global CSS safety-net in `_reset.css` (@media prefers-reduced-motion)
 * so even synchronous CSS animations are neutralised.
 */
export const prefersReducedMotion = (): boolean => {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
};

/**
 * Subscribe to changes in the user's motion preference.
 * Returns an unsubscribe function.
 */
export const onReducedMotionChange = (
  callback: (reduced: boolean) => void
): (() => void) => {
  if (typeof window === "undefined") return () => {};
  const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
  const listener = (event: MediaQueryListEvent) => callback(event.matches);
  mql.addEventListener("change", listener);
  return () => mql.removeEventListener("change", listener);
};
