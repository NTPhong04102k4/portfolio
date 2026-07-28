/* ========================================================
   TEMPLATE — Loader
   ======================================================== */

/**
 * Render the page loader overlay.
 * @returns {string} HTML string
 */
export function renderLoader() {
  return `
  <div id="loader" class="loader">
    <div class="loader__spinner">
      <div class="loader__ring"></div>
      <span class="loader__text">NTP</span>
    </div>
  </div>`;
}
