/* ========================================================
   COMPONENT — Smooth Scroll & Back to Top
   ======================================================== */
import { $, $$, createScrollSentinel, prefersReducedMotion } from '../utils.js';
import { SELECTORS, SCROLL_CONFIG } from '../constants.js';

/**
 * Initialise smooth scrolling for all anchor links.
 */
export function initSmoothScroll() {
  const behavior = prefersReducedMotion() ? 'auto' : 'smooth';

  $$(SELECTORS.anchorLinks).forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = $(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior });
      }
    });
  });
}

/**
 * Initialise the back-to-top button visibility and click handler.
 * Uses IntersectionObserver (not a scroll listener) to track threshold.
 */
export function initBackToTop() {
  const btn = $(SELECTORS.backToTop);
  if (!btn) return;

  const sentinel = createScrollSentinel(SCROLL_CONFIG.backToTopThreshold);
  const observer = new IntersectionObserver(([entry]) => {
    // The sentinel spans [0, threshold]; once its bottom edge has scrolled
    // above the viewport, the page has scrolled past the threshold.
    btn.classList.toggle('visible', entry.boundingClientRect.bottom < 0);
  });
  observer.observe(sentinel);

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: prefersReducedMotion() ? 'auto' : 'smooth' });
  });
}
