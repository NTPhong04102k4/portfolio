/* ========================================================
   COMPONENT — Scroll Reveal Animations
   ======================================================== */
import { $$, prefersReducedMotion } from '../utils.js';
import {
  SELECTORS,
  REVEAL_OBSERVER_OPTIONS,
  REVEAL_STAGGER_STEP,
  REVEAL_STAGGER_MAX,
} from '../constants.js';

const REVEAL_CLASSES = ['reveal-up', 'reveal-left', 'reveal-right', 'revealed'];

/**
 * Strip every reveal class + the stagger delay so the element falls back
 * to its own styles (hover transitions, etc.) once the entrance is done.
 * @param {Element} el
 */
function finishReveal(el) {
  el.classList.remove(...REVEAL_CLASSES);
  el.style.removeProperty('--reveal-delay');
}

/**
 * Initialise scroll-triggered reveal animations using IntersectionObserver.
 */
export function initRevealAnimations() {
  const reveals = $$(SELECTORS.revealElements);
  if (!reveals.length) return;

  // CSS already forces these visible; just clean up so nothing lingers.
  if (prefersReducedMotion()) {
    reveals.forEach(finishReveal);
    return;
  }

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        const el = entry.target;

        // Page was restored scrolled down (reload / back-nav): anything
        // already above the viewport should just be there, not slide up
        // from below the moment the user scrolls back to it.
        const aboveViewport = entry.boundingClientRect.bottom < 0;

        if (!entry.isIntersecting && !aboveViewport) return;

        revealObserver.unobserve(el);

        if (aboveViewport) {
          finishReveal(el);
          return;
        }

        el.classList.add('revealed');
        el.addEventListener(
          'transitionend',
          (e) => { if (e.propertyName === 'opacity') finishReveal(el); },
          { once: true },
        );
      });
    },
    REVEAL_OBSERVER_OPTIONS,
  );

  // Stagger relative to siblings that share a parent (a card grid, the hero
  // stack), not the element's index across the whole page — otherwise a
  // section title could inherit a 0.3s delay left over from the previous
  // section's cards. The delay is capped (not wrapped) so a vertical stack
  // like the hero always enters top-to-bottom.
  const siblingIndex = new Map();
  reveals.forEach((el) => {
    const parent = el.parentElement;
    const i = siblingIndex.get(parent) ?? 0;
    siblingIndex.set(parent, i + 1);
    el.style.setProperty('--reveal-delay', `${Math.min(i, REVEAL_STAGGER_MAX) * REVEAL_STAGGER_STEP}s`);
    revealObserver.observe(el);
  });
}
