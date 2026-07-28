/* ========================================================
   COMPONENT — Smooth Scroll & Back to Top
   ======================================================== */
import { $, $$ } from '../utils.js';
import { SELECTORS, SCROLL_CONFIG } from '../constants.js';

/**
 * Initialise smooth scrolling for all anchor links.
 */
export function initSmoothScroll() {
  $$(SELECTORS.anchorLinks).forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = $(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
}

/**
 * Initialise the back-to-top button visibility and click handler.
 */
export function initBackToTop() {
  const btn = $(SELECTORS.backToTop);
  if (!btn) return;

  window.addEventListener('scroll', () => {
    btn.classList.toggle('visible', window.scrollY > SCROLL_CONFIG.backToTopThreshold);
  });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}
