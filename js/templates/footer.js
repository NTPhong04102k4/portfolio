/* ========================================================
   TEMPLATE — Footer + Back to Top
   ======================================================== */
import { SOCIAL_LINKS } from "../constants.js";

/**
 * Render the footer with logo, socials, and copyright.
 * @returns {string} HTML string
 */
export function renderFooter() {
  const socials = SOCIAL_LINKS.map(
    (s) =>
      `<a href="${s.href}"${s.target ? ` target="${s.target}" rel="noopener"` : ""} aria-label="${s.label}"><i class="${s.icon}"></i></a>`,
  ).join("\n          ");

  return `
  <footer id="footer" class="footer section">
    <div class="container">
      <div class="footer__content">
        <a href="#hero" class="footer__logo">
          <span class="navbar__logo-bracket">&lt;</span>Phong<span class="navbar__logo-slash"> /</span><span class="navbar__logo-bracket">&gt;</span>
        </a>
        <div class="footer__socials">
          ${socials}
        </div>
        <p class="footer__copy">&copy; ${new Date().getFullYear()} Nguyễn Thế Phong. All rights reserved.</p>
      </div>
    </div>
  </footer>`;
}

/**
 * Render the back-to-top button.
 * @returns {string} HTML string
 */
export function renderBackToTop() {
  return `
  <button id="back-to-top" class="back-to-top" aria-label="Lên đầu trang">
    <i class="fas fa-chevron-up"></i>
  </button>`;
}
