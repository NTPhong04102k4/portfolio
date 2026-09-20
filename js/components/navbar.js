/* ========================================================
   COMPONENT — Navbar
   Scroll effect, mobile menu, active section tracking
   ======================================================== */
import { $, $$, createBackdrop, createScrollSentinel } from '../utils.js';
import { SELECTORS, SCROLL_CONFIG, NAV_OBSERVER_OPTIONS, NAV_COLLAPSE_QUERY } from '../constants.js';

/**
 * Initialise all navbar behaviours.
 */
export function initNavbar() {
  const navbar = $(SELECTORS.navbar);
  const navToggle = $(SELECTORS.navToggle);
  const navMenu = $(SELECTORS.navMenu);
  const navLinks = $$(SELECTORS.navLinks);

  if (!navbar || !navToggle || !navMenu) return;

  // ---- Scroll effect (IntersectionObserver instead of a scroll listener) ----
  const scrolledSentinel = createScrollSentinel(SCROLL_CONFIG.scrolledThreshold);
  const scrolledObserver = new IntersectionObserver(([entry]) => {
    // Same approach as back-to-top: the sentinel spans [0, threshold], so
    // once its bottom edge scrolls above the viewport we've passed it.
    navbar.classList.toggle('scrolled', entry.boundingClientRect.bottom < 0);
  });
  scrolledObserver.observe(scrolledSentinel);

  // ---- Mobile menu ----
  const backdrop = createBackdrop();

  function setMenu(open) {
    navToggle.classList.toggle('active', open);
    navToggle.setAttribute('aria-expanded', String(open));
    navMenu.classList.toggle('open', open);
    backdrop.classList.toggle('visible', open);
    document.body.style.overflow = open ? 'hidden' : '';
  }

  const isOpen = () => navMenu.classList.contains('open');
  const closeMenu = () => setMenu(false);

  navToggle.addEventListener('click', () => setMenu(!isOpen()));
  backdrop.addEventListener('click', closeMenu);

  navLinks.forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && isOpen()) {
      closeMenu();
      navToggle.focus();
    }
  });

  // If the viewport grows past the collapse breakpoint while the drawer is
  // open, the drawer CSS goes away but body overflow / backdrop would stay.
  const collapseQuery = window.matchMedia(NAV_COLLAPSE_QUERY);
  collapseQuery.addEventListener('change', (e) => {
    if (!e.matches) closeMenu();
  });

  // ---- Active section tracking ----
  const sections = $$(SELECTORS.sections);

  const observerNav = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          navLinks.forEach(link => {
            link.classList.toggle('active', link.dataset.section === id);
          });
        }
      });
    },
    NAV_OBSERVER_OPTIONS,
  );

  sections.forEach(section => observerNav.observe(section));
}
