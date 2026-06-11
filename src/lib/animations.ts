import { gsap, ScrollTrigger } from "./gsap";
import { prefersReducedMotion } from "./reduced-motion";

const INIT_ATTR = "data-animate-init";
const INIT_SELECTOR = `[data-animate]:not([${INIT_ATTR}])`;

const num = (el: Element, attr: string, fallback: number): number => {
  const raw = el.getAttribute(attr);
  if (raw === null) return fallback;
  const parsed = Number(raw);
  return Number.isFinite(parsed) ? parsed : fallback;
};

const str = (el: Element, attr: string, fallback: string): string =>
  el.getAttribute(attr) ?? fallback;

type AnimateHandler = (el: HTMLElement) => void;

const handlers: Record<string, AnimateHandler> = {
  "fade-in": (el) => {
    gsap.fromTo(
      el,
      { opacity: 0 },
      {
        opacity: 1,
        duration: num(el, "data-duration", 0.6),
        delay: num(el, "data-delay", 0),
        ease: "power2.out",
        scrollTrigger: { trigger: el, start: "top 85%", once: true },
      }
    );
  },

  "slide-up": (el) => {
    const distance = num(el, "data-distance", 40);
    gsap.fromTo(
      el,
      { opacity: 0, y: distance },
      {
        opacity: 1,
        y: 0,
        duration: num(el, "data-duration", 0.6),
        delay: num(el, "data-delay", 0),
        ease: "power2.out",
        scrollTrigger: { trigger: el, start: "top 85%", once: true },
      }
    );
  },

  reveal: (el) => {
    // Generic reveal — reads `data-from` / `data-to` as JSON.
    // Example: data-from='{"opacity":0,"x":-40}' data-to='{"opacity":1,"x":0}'
    let from: gsap.TweenVars = { opacity: 0, y: 24 };
    let to: gsap.TweenVars = { opacity: 1, y: 0 };
    try {
      const rawFrom = el.getAttribute("data-from");
      if (rawFrom) from = JSON.parse(rawFrom) as gsap.TweenVars;
      const rawTo = el.getAttribute("data-to");
      if (rawTo) to = JSON.parse(rawTo) as gsap.TweenVars;
    } catch {
      // Keep defaults if JSON is malformed.
    }
    gsap.fromTo(el, from, {
      ...to,
      duration: num(el, "data-duration", 0.6),
      delay: num(el, "data-delay", 0),
      ease: str(el, "data-ease", "power2.out"),
      scrollTrigger: { trigger: el, start: "top 85%", once: true },
    });
  },

  parallax: (el) => {
    const speed = num(el, "data-speed", 0.5);
    gsap.to(el, {
      yPercent: -50 * (1 - speed),
      ease: "none",
      scrollTrigger: {
        trigger: el,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });
  },
};

export const initAnimations = (): void => {
  const nodes = document.querySelectorAll<HTMLElement>(INIT_SELECTOR);
  if (nodes.length === 0) return;

  if (prefersReducedMotion()) {
    nodes.forEach((el) => el.setAttribute(INIT_ATTR, "skip"));
    return;
  }

  nodes.forEach((el) => {
    const type = el.getAttribute("data-animate");
    if (!type) return;
    const handler = handlers[type];
    if (!handler) return;
    el.setAttribute(INIT_ATTR, "true");
    handler(el);
  });
};

export const cleanupAnimations = (): void => {
  ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
  document
    .querySelectorAll(`[${INIT_ATTR}]`)
    .forEach((el) => el.removeAttribute(INIT_ATTR));
};
