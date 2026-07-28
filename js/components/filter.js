/* ========================================================
   COMPONENT — Projects Filter
   ======================================================== */
import { $$ } from '../utils.js';
import { SELECTORS } from '../constants.js';

/**
 * Initialise the project cards filter buttons.
 */
export function initProjectsFilter() {
  const filterBtns = $$(SELECTORS.filterBtns);
  const projectCards = $$(SELECTORS.projectCards);

  if (!filterBtns.length || !projectCards.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Update active state
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;

      projectCards.forEach(card => {
        const categories = card.dataset.category || '';

        if (filter === 'all' || categories.includes(filter)) {
          card.classList.remove('hidden');
          card.style.animation = 'fadeInUp 0.5s var(--ease) forwards';
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });
}
