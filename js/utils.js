/* ========================================================
   UTILS — Shared utility functions
   ======================================================== */

/**
 * querySelector shorthand
 * @param {string} selector
 * @param {Element} [parent=document]
 * @returns {Element|null}
 */
export function $(selector, parent = document) {
  return parent.querySelector(selector);
}

/**
 * querySelectorAll shorthand (returns real Array)
 * @param {string} selector
 * @param {Element} [parent=document]
 * @returns {Element[]}
 */
export function $$(selector, parent = document) {
  return [...parent.querySelectorAll(selector)];
}

/**
 * Validate email format
 * @param {string} email
 * @param {RegExp} regex
 * @returns {boolean}
 */
export function validateEmail(email, regex) {
  return regex.test(email);
}

/**
 * Create and append a backdrop overlay element
 * @param {string} className
 * @returns {HTMLDivElement}
 */
export function createBackdrop(className = 'navbar__backdrop') {
  const backdrop = document.createElement('div');
  backdrop.className = className;
  document.body.appendChild(backdrop);
  return backdrop;
}

/**
 * Create an invisible sentinel spanning from the top of the document down to
 * `offset`px, used to observe scroll-position thresholds via
 * IntersectionObserver instead of a `scroll` event listener. Spanning the
 * whole [0, offset] range (rather than a 1px point at `offset`) makes the
 * crossing much harder to miss on a fast/large scroll jump, since the
 * browser only needs to sample the intersection once anywhere while the
 * block is passing through the viewport.
 * @param {number} offset — distance from document top, in pixels
 * @returns {HTMLDivElement}
 */
export function createScrollSentinel(offset) {
  const sentinel = document.createElement('div');
  sentinel.style.cssText = `position:absolute; top:0; left:0; width:1px; height:${offset}px; pointer-events:none; visibility:hidden;`;
  document.body.appendChild(sentinel);
  return sentinel;
}

/**
 * Check the user's reduced-motion preference.
 * @returns {boolean}
 */
export function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * Debounce a function by `wait` ms.
 * @param {Function} fn
 * @param {number} wait
 * @returns {Function}
 */
export function debounce(fn, wait) {
  let timer = null;
  return function debounced(...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), wait);
  };
}
