const boot = () => {
  const header = document.querySelector(".site-head");
  const toggle = document.querySelector("#nav-toggle");
  const menu = document.querySelector("#mobile-menu");

  if (header) {
    const updateHeader = () => {
      header.classList.toggle("is-scrolled", window.scrollY > 8);
    };

    updateHeader();
    window.addEventListener("scroll", updateHeader, { passive: true });
  }

  if (toggle && menu) {
    const close = () => {
      toggle.classList.remove("is-open");
      menu.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
    };

    toggle.addEventListener("click", () => {
      const isOpen = toggle.classList.toggle("is-open");
      menu.classList.toggle("is-open", isOpen);
      toggle.setAttribute("aria-expanded", String(isOpen));
    });

    menu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", close);
    });
  }

  const revealTargets = document.querySelectorAll("[data-reveal]");
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -48px 0px", threshold: 0.12 }
    );

    revealTargets.forEach((target) => observer.observe(target));
  } else {
    revealTargets.forEach((target) => target.classList.add("is-visible"));
  }

  document.querySelectorAll("[data-faq-item]").forEach((item) => {
    const button = item.querySelector("[data-faq-toggle]");
    const panel = item.querySelector("[data-faq-panel]");
    if (!button || !panel) return;

    button.addEventListener("click", () => {
      const shouldOpen = button.getAttribute("aria-expanded") !== "true";

      document.querySelectorAll("[data-faq-item]").forEach((other) => {
        const otherButton = other.querySelector("[data-faq-toggle]");
        const otherPanel = other.querySelector("[data-faq-panel]");
        otherButton?.setAttribute("aria-expanded", "false");
        otherPanel?.setAttribute("hidden", "");
      });

      button.setAttribute("aria-expanded", String(shouldOpen));
      panel.toggleAttribute("hidden", !shouldOpen);
    });
  });
};

boot();
