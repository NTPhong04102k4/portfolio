/* ========================================================
   TEMPLATE — Navbar
   ======================================================== */
import { NAV_LINKS } from '../constants.js';

/**
 * Render the fixed navigation bar.
 * @returns {string} HTML string
 */
export function renderNavbar() {
  const links = NAV_LINKS.map(
    (link) =>
      `<li><a href="${link.href}" class="navbar__link${link.active ? ' active' : ''}" data-section="${link.section}">${link.label}</a></li>`,
  ).join('\n        ');

  return `
  <nav id="navbar" class="navbar">
    <div class="navbar__container">
      <a href="#footer" class="navbar__logo">
        <span class="navbar__logo-bracket">&lt;</span>Phong<span class="navbar__logo-slash"> /</span><span class="navbar__logo-bracket">&gt;</span>
      </a>
      <ul id="nav-menu" class="navbar__menu">
        ${links}
      </ul>
      <div class="navbar__actions">
       
        <button class="theme-toggle" aria-label="Chuyển đổi theme">
          <i class="theme-toggle__icon fas fa-moon"></i>
        </button>
        <button id="nav-toggle" class="navbar__toggle" aria-label="Toggle menu">
          <span class="navbar__toggle-bar"></span>
          <span class="navbar__toggle-bar"></span>
          <span class="navbar__toggle-bar"></span>
        </button>
      </div>
    </div>
  </nav>`;
}
