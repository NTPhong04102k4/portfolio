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

  window.addEventListener('load', () => {
    setTimeout(() => {
      loader.classList.add('hidden');
      document.body.style.overflow = '';
      if (typeof onReady === 'function') onReady();
    }, LOADER_DELAY);
  });
}
