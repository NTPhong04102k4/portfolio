/* ========================================================
   COMPONENT — Navbar
   Scroll effect, mobile menu, active section tracking
   ======================================================== */
import { $, $$, createBackdrop } from '../utils.js';
import { SELECTORS, SCROLL_CONFIG, NAV_OBSERVER_OPTIONS } from '../constants.js';

/**
 * Initialise all navbar behaviours.
 */
export function initNavbar() {
  const navbar = $(SELECTORS.navbar);
  const navToggle = $(SELECTORS.navToggle);
  const navMenu = $(SELECTORS.navMenu);
  const navLinks = $$(SELECTORS.navLinks);

  if (!navbar || !navToggle || !navMenu) return;

  // ---- Scroll effect ----
  window.addEventListener('scroll', () => {
    const currentScroll = window.scrollY;
    navbar.classList.toggle('scrolled', currentScroll > SCROLL_CONFIG.scrolledThreshold);
  });

  // ---- Mobile menu ----
  const backdrop = createBackdrop();

  function toggleMenu() {
    navToggle.classList.toggle('active');
    navMenu.classList.toggle('open');
    backdrop.classList.toggle('visible');
    document.body.style.overflow = navMenu.classList.contains('open') ? 'hidden' : '';
  }

  function closeMenu() {
    navToggle.classList.remove('active');
    navMenu.classList.remove('open');
    backdrop.classList.remove('visible');
    document.body.style.overflow = '';
  }

  navToggle.addEventListener('click', toggleMenu);
  backdrop.addEventListener('click', closeMenu);

  navLinks.forEach(link => {
    link.addEventListener('click', closeMenu);
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
