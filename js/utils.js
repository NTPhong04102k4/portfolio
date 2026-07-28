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
 * Inject a <style> block into <head>
 * @param {string} css — raw CSS string
 */
export function injectStyles(css) {
  const style = document.createElement('style');
  style.textContent = css;
  document.head.appendChild(style);
}
