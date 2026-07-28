/* ========================================================
   COMPONENT — Scroll Reveal Animations
   ======================================================== */
import { $$ } from '../utils.js';
import {
  SELECTORS,
  REVEAL_OBSERVER_OPTIONS,
  REVEAL_STAGGER_STEP,
  REVEAL_STAGGER_GROUP,
} from '../constants.js';

/**
 * Initialise scroll-triggered reveal animations using IntersectionObserver.
 */
export function initRevealAnimations() {
  const reveals = $$(SELECTORS.revealElements);
  if (!reveals.length) return;

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          revealObserver.unobserve(entry.target);
        }
      });
    },
    REVEAL_OBSERVER_OPTIONS,
  );

  reveals.forEach((el, index) => {
    el.style.transitionDelay = `${(index % REVEAL_STAGGER_GROUP) * REVEAL_STAGGER_STEP}s`;
    revealObserver.observe(el);
  });
}
