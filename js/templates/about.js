/* ========================================================
   TEMPLATE — About Section
   ======================================================== */
import { PERSONAL_INFO } from '../constants.js';

/**
 * Render the about section with image, bio, and info grid.
 * @returns {string} HTML string
 */
export function renderAbout() {
  const infoItems = PERSONAL_INFO.details
    .map(
      (item) => `
              <div class="about__info-item">
                <i class="${item.icon}"></i>
                <div>
                  <span class="about__info-label">${item.label}</span>
                  <span class="about__info-value">${item.value}</span>
                </div>
              </div>`,
    )
    .join('\n');

  const paragraphs = PERSONAL_INFO.aboutText
    .map((text) => `<p class="about__text">${text}</p>`)
    .join('\n            ');

  return `
  <section id="about" class="section about">
    <div class="container">
      <h2 class="section__title reveal-up">
        <span class="section__number">01.</span> Giới thiệu
      </h2>
      <div class="about__grid">
        <div class="about__image-wrapper reveal-left">
          <div class="about__image-frame">
            <img src="${PERSONAL_INFO.avatarSrc}" alt="${PERSONAL_INFO.name}" class="about__image" loading="lazy" />
            <div class="about__image-overlay"></div>
          </div>
          <div class="about__image-decoration"></div>
        </div>
        <div class="about__content reveal-right">
          <div class="glass-card about__card">
            <h3 class="about__subtitle">${PERSONAL_INFO.name}</h3>
            <p class="about__role gradient-text">${PERSONAL_INFO.role}</p>
            ${paragraphs}
            <div class="about__info-grid">
              ${infoItems}
            </div>
            <a href="${PERSONAL_INFO.cvHref}" class="btn btn--primary about__cv-btn" download>
              <i class="fas fa-download"></i> Tải CV
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>`;
}
