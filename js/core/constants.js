/* ========================================================
   CORE — constants
   Values shared across the whole app (page-specific values live in their own folder)
   ======================================================== */


export const SELECTORS = {
  app: "#app",
};

export const SCROLL_CONFIG = {
  scrolledThreshold: 50,
  backToTopThreshold: 500,
};

// Width thresholds (px) used by js/core/dimensions.js — keep in sync with the media queries in css/pages/*.css
export const BREAKPOINTS = { tablet: 768, desktop: 1024 };
