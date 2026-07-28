/* ========================================================
   TEMPLATE — Skills Section
   ======================================================== */
import { SKILLS_DATA } from '../constants.js';

/**
 * Render the skills section with category cards.
 * @returns {string} HTML string
 */
export function renderSkills() {
  const categories = SKILLS_DATA.map(
    (cat) => `
        <div class="glass-card skills__category reveal-up">
          <div class="skills__category-icon">
            <i class="${cat.icon}"></i>
          </div>
          <h3 class="skills__category-title">${cat.title}</h3>
          <div class="skills__tags">
            ${cat.tags.map((tag) => `<span class="skill-tag">${tag}</span>`).join('\n            ')}
          </div>
        </div>`,
  ).join('\n');

  return `
  <section id="skills" class="section skills">
    <div class="container">
      <h2 class="section__title reveal-up">
        <span class="section__number">02.</span> Kỹ năng
      </h2>
      <div class="skills__grid">
        ${categories}
      </div>
    </div>
  </section>`;
}
