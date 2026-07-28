/* ========================================================
   TEMPLATE — Experience / Timeline Section
   ======================================================== */
import { EXPERIENCE_DATA } from '../constants.js';

/**
 * Render the experience timeline section.
 * @returns {string} HTML string
 */
export function renderExperience() {
  const items = EXPERIENCE_DATA.map(
    (exp) => `
        <div class="timeline__item ${exp.reveal}">
          <div class="timeline__dot"></div>
          <div class="glass-card timeline__card">
            <span class="timeline__date">${exp.date}</span>
            <h3 class="timeline__title">${exp.title}</h3>
            <p class="timeline__subtitle">${exp.subtitle}</p>
            <p class="timeline__text">${exp.text}</p>
          </div>
        </div>`,
  ).join('\n');

  return `
  <section id="experience" class="section experience">
    <div class="container">
      <h2 class="section__title reveal-up">
        <span class="section__number">04.</span> Hành trình
      </h2>
      <div class="timeline">
        ${items}
      </div>
    </div>
  </section>`;
}
