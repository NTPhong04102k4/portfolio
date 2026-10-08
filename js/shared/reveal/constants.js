/* ========================================================
   REVEAL — constants
   Scroll-reveal selector, observer options and stagger
   ======================================================== */


export const SELECTORS = { revealElements: ".reveal-up, .reveal-left, .reveal-right" };

export const REVEAL_OBSERVER_OPTIONS = {
  threshold: 0.15,
  rootMargin: "0px 0px -50px 0px",
};

export const REVEAL_STAGGER_STEP = 0.08; // seconds between siblings
export const REVEAL_STAGGER_MAX = 5;     // cap: 5 × 0.08s = 0.4s max delay
