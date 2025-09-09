export function initRevealOnScroll() {
  if (typeof window === "undefined" || typeof IntersectionObserver === "undefined") return;

  const elements = Array.from(document.querySelectorAll('[data-reveal]:not(.is-revealed)'));
  if (!elements.length) return;

  // Optional stagger: if a parent has data-reveal-stagger, apply incremental delays
  elements.forEach((el) => {
    // Explicit per-element delay support via data-reveal-delay (ms)
    const explicitDelay = el.getAttribute('data-reveal-delay');
    if (explicitDelay) {
      el.style.transitionDelay = `${parseInt(explicitDelay, 10)}ms`;
      return;
    }
    const parent = el.closest('[data-reveal-stagger]');
    if (parent) {
      const spec = parent.getAttribute('data-reveal-stagger') || '';
      const [baseStr, stepStr] = spec.split(',');
      const base = parseInt(baseStr || '0', 10) || 0;
      const step = parseInt(stepStr || '60', 10) || 60;
      const siblings = Array.from(parent.querySelectorAll('[data-reveal]'));
      const index = siblings.indexOf(el);
      el.style.transitionDelay = `${base + index * step}ms`;
    }
  });

  const obs = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-revealed');
        obs.unobserve(entry.target);
      }
    }
  }, { threshold: 0.1 });

  elements.forEach((el) => obs.observe(el));
}

export default initRevealOnScroll;
