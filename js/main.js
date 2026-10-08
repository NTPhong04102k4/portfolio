/* ========================================================
   MAIN — Portfolio Entry Point
   Nguyễn Thế Phong | Frontend Developer

   This file only imports modules and calls init functions.
   Each page (js/pages/<name>/) owns its template, behaviour and
   constants; shared layout lives in js/shared/, helpers in js/core/.
   ======================================================== */

import { $ } from "./core/utils.js";
import { SELECTORS } from "./core/constants.js";
import { initDimensions } from "./core/dimensions.js";

// Shared (layout / cross-page behaviour)
import { renderLoader, initLoader } from "./shared/loader/index.js";
import { renderNavbar, initNavbar } from "./shared/navbar/index.js";
import { renderFooter, renderBackToTop } from "./shared/footer/index.js";
import { initThemeToggle } from "./shared/theme/index.js";
import { initSmoothScroll, initBackToTop } from "./shared/scroll/index.js";
import { initRevealAnimations } from "./shared/reveal/index.js";

// Pages (one folder per section: template + behaviour + constants)
import { renderHero, initTypewriter, initParticles } from "./pages/hero/index.js";
import { renderAbout } from "./pages/about/index.js";
import { renderSkills } from "./pages/skills/index.js";
import { renderProjects, initProjectsFilter, initImageFallbacks } from "./pages/projects/index.js";
import { renderExperience } from "./pages/experience/index.js";
import { renderContact, initContactForm } from "./pages/contact/index.js";

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
].join("\n");

// ======================== INIT ========================

// Window size / orientation → <html data-device data-orientation> + --vw/--vh
initDimensions();

// Theme (apply ASAP to prevent flash)
initThemeToggle();

// Loader — triggers reveal animations when done
initLoader(initRevealAnimations);

// Navigation
initNavbar();

// Hero effects
initTypewriter();
initParticles();

// Interactive features
initProjectsFilter();
initImageFallbacks();
initContactForm();
initSmoothScroll();
initBackToTop();
