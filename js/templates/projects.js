/* ========================================================
   TEMPLATE — Projects Section
   ======================================================== */
import { FILTER_BUTTONS, PROJECTS_DATA } from '../constants.js';

/**
 * Render a single project card.
 * @param {Object} project
 * @returns {string} HTML string
 */
function renderProjectCard(project) {
  const tags = project.tags
    .map((tag) => `<span>${tag}</span>`)
    .join('\n              ');

  return `
        <article class="glass-card projects__card reveal-up" data-category="${project.category}">
          <div class="projects__card-image">
            <img src="${project.image}" alt="${project.alt}" loading="lazy" />
            <div class="projects__card-overlay">
              <a href="${project.github}" target="_blank" rel="noopener" class="projects__card-link">
                <i class="fab fa-github"></i>
              </a>
            </div>
          </div>
          <div class="projects__card-content">
            <h3 class="projects__card-title">${project.title}</h3>
            <p class="projects__card-description">${project.description}</p>
            <div class="projects__card-tags">
              ${tags}
            </div>
          </div>
        </article>`;
}

/**
 * Render the projects section with filter buttons and cards.
 * @returns {string} HTML string
 */
export function renderProjects() {
  const filters = FILTER_BUTTONS.map(
    (btn) =>
      `<button class="projects__filter${btn.active ? ' active' : ''}" data-filter="${btn.filter}">${btn.label}</button>`,
  ).join('\n        ');

  const cards = PROJECTS_DATA.map(renderProjectCard).join('\n');

  return `
  <section id="projects" class="section projects">
    <div class="container">
      <h2 class="section__title reveal-up">
        <span class="section__number">03.</span> Dự án
      </h2>
      <div class="projects__filters reveal-up">
        ${filters}
      </div>
      <div class="projects__grid">
        ${cards}
      </div>
    </div>
  </section>`;
}
