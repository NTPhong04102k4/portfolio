/* ========================================================
   TEMPLATE — Hero Section
   ======================================================== */
import { PERSONAL_INFO, SOCIAL_LINKS } from '../constants.js';

/**
 * Render the hero section with canvas, typewriter, CTA and socials.
 * @returns {string} HTML string
 */
export function renderHero() {
  const socials = SOCIAL_LINKS.map(
    (s) =>
      `<a href="${s.href}"${s.target ? ` target="${s.target}" rel="noopener"` : ''} aria-label="${s.label}" class="hero__social-link">
          <i class="${s.icon}"></i>
        </a>`,
  ).join('\n');

  return `
  <section id="hero" class="hero">
    <canvas id="hero-canvas" class="hero__canvas"></canvas>
    <div class="hero__content">
      <p class="hero__greeting reveal-up">${PERSONAL_INFO.greeting}</p>
      <h1 class="hero__name reveal-up">Nguyễn Thế <span class="gradient-text">${PERSONAL_INFO.firstName}</span></h1>
      <div class="hero__title-wrapper reveal-up">
        <span class="hero__title-prefix">${PERSONAL_INFO.titlePrefix}&nbsp;</span>
        <span id="typewriter" class="hero__typewriter gradient-text"></span>
        <span class="hero__cursor">|</span>
      </div>
      <p class="hero__description reveal-up">
        ${PERSONAL_INFO.description}
      </p>
      <div class="hero__cta reveal-up">
        <a href="#projects" class="btn btn--primary">
          <i class="fas fa-rocket"></i> Xem dự án
        </a>
        <a href="${PERSONAL_INFO.cvHref}" download class="btn btn--outline">
          <i class="fas fa-download"></i> Tải CV (PDF)
        </a>
        <a href="#contact" class="btn btn--outline">
          <i class="fas fa-paper-plane"></i> Liên hệ
        </a>
      </div>
      <div class="hero__socials reveal-up">
        ${socials}
      </div>
    </div>
    <div class="hero__scroll-indicator">
      <div class="hero__scroll-mouse">
        <div class="hero__scroll-wheel"></div>
      </div>
      <span>Cuộn xuống</span>
    </div>
  </section>`;
}
