/* ========================================================
   COMPONENT — Theme Toggle (Dark / Light)
   ======================================================== */
import { $ } from '../utils.js';
import { THEME_STORAGE_KEY, THEME_DARK, THEME_LIGHT } from '../constants.js';

/**
 * Get the saved theme from localStorage, or default to dark.
 * @returns {string}
 */
function getSavedTheme() {
  return localStorage.getItem(THEME_STORAGE_KEY) || THEME_DARK;
}

/**
 * Apply a theme to the document.
 * @param {string} theme — 'dark' | 'light'
 */
function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem(THEME_STORAGE_KEY, theme);

  // Update toggle icon
  const icon = $('.theme-toggle__icon');
  if (icon) {
    icon.className = `theme-toggle__icon fas ${theme === THEME_DARK ? 'fa-moon' : 'fa-sun'}`;
  }
}

/**
 * Initialise the theme toggle button.
 * Reads preference from localStorage and attaches click handler.
 */
export function initThemeToggle() {
  // Apply saved theme on load
  const savedTheme = getSavedTheme();
  applyTheme(savedTheme);

  // Attach click handler
  const toggleBtn = $('.theme-toggle');
  if (!toggleBtn) return;

  toggleBtn.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme') || THEME_DARK;
    const next = current === THEME_DARK ? THEME_LIGHT : THEME_DARK;
    applyTheme(next);
  });
}
