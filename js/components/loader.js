/* ========================================================
   COMPONENT — Loader
   ======================================================== */
import { $ } from '../utils.js';
import { SELECTORS, LOADER_DELAY } from '../constants.js';

/**
 * Initialise the page loader.
 * Hides the loader after a short delay then fires the callback.
 * @param {Function} onReady — called once the loader is hidden
 */
export function initLoader(onReady) {
  const loader = $(SELECTORS.loader);
  if (!loader) return;

  document.body.style.overflow = 'hidden';

  const reveal = () => {
    setTimeout(() => {
      loader.classList.add('hidden');
      document.body.style.overflow = '';
      if (typeof onReady === 'function') onReady();
    }, LOADER_DELAY);
  };

  // All markup is already rendered synchronously by main.js before this runs,
  // so DOMContentLoaded is enough — no need to wait for `load` (fonts/images).
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', reveal, { once: true });
  } else {
    reveal();
  }
}
