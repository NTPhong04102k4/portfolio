/* ========================================================
   COMPONENT — Projects Filter
   ======================================================== */
import { $$ } from '../utils.js';
import { SELECTORS, FILTER_ANIMATION } from '../constants.js';

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
      filterBtns.forEach(b => {
        b.classList.toggle('active', b === btn);
        b.setAttribute('aria-pressed', String(b === btn));
      });

      const filter = btn.dataset.filter;
      let visibleIndex = 0;

      projectCards.forEach(card => {
        // data-category is space-separated; exact token match so "cms"
        // can't accidentally match a hypothetical "cms-internal".
        const categories = (card.dataset.category || '').split(/\s+/);
        const show = filter === 'all' || categories.includes(filter);

        card.classList.toggle('hidden', !show);
        if (!show) {
          card.style.animation = '';
          return;
        }

        // Re-assigning the same animation string doesn't restart it, so
        // clear → force a style flush → set again.
        card.style.animation = 'none';
        void card.offsetWidth;
        card.style.animation = FILTER_ANIMATION;
        card.style.animationDelay = `${visibleIndex * 60}ms`; // after the shorthand, which resets it
        visibleIndex++;
      });
    });
  });
}
