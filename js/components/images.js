/* ========================================================
   COMPONENT — Image fallbacks
   ======================================================== */
import { $$ } from '../utils.js';
import { SELECTORS } from '../constants.js';

/**
 * Mark project card images that fail to load so CSS can swap in a
 * placeholder instead of rendering the raw alt text over the card.
 */
export function initImageFallbacks() {
  $$(SELECTORS.projectImages).forEach(img => {
    const markMissing = () => img.parentElement?.classList.add('is-missing');

    // Already failed before we attached (cached 404, fast network)
    if (img.complete && img.naturalWidth === 0) {
      markMissing();
      return;
    }
    img.addEventListener('error', markMissing, { once: true });
  });
}
