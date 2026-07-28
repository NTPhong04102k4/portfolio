/* ========================================================
   MAIN — Portfolio Entry Point
   Nguyễn Thế Phong | Frontend Developer

   This file only imports modules and calls init functions.
   All logic lives in components/, templates in templates/,
   constants in constants.js.
   ======================================================== */

import { $ } from './utils.js';
import { injectStyles } from './utils.js';
import { FADE_IN_UP_KEYFRAMES, SELECTORS } from './constants.js';

// Templates (HTML rendering)
import { renderLoader } from './templates/loader.js';
import { renderNavbar } from './templates/navbar.js';
import { renderHero } from './templates/hero.js';
import { renderAbout } from './templates/about.js';
import { renderSkills } from './templates/skills.js';
import { renderProjects } from './templates/projects.js';
import { renderExperience } from './templates/experience.js';
import { renderContact } from './templates/contact.js';
import { renderFooter, renderBackToTop } from './templates/footer.js';

// Components (behavior/init)
import { initLoader } from './components/loader.js';
import { initNavbar } from './components/navbar.js';
import { initTypewriter } from './components/typewriter.js';
import { initParticles } from './components/particles.js';
import { initRevealAnimations } from './components/reveal.js';
import { initProjectsFilter } from './components/filter.js';
import { initContactForm } from './components/contact.js';
import { initSmoothScroll, initBackToTop } from './components/scroll.js';
import { initThemeToggle } from './components/theme.js';

// ======================== RENDER ========================

const app = $(SELECTORS.app);

app.innerHTML = [
  renderLoader(),
  renderNavbar(),
  renderHero(),
  renderAbout(),
  renderSkills(),
  renderProjects(),
  renderExperience(),
  renderContact(),
  renderFooter(),
  renderBackToTop(),
].join('\n');

// ======================== INIT ========================

// Theme (apply ASAP to prevent flash)
initThemeToggle();

// Inject dynamic keyframes
injectStyles(FADE_IN_UP_KEYFRAMES);

// Loader — triggers reveal animations when done
initLoader(initRevealAnimations);

// Navigation
initNavbar();

// Hero effects
initTypewriter();
initParticles();

// Interactive features
initProjectsFilter();
initContactForm();
initSmoothScroll();
initBackToTop();
