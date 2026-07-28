/* ========================================================
   COMPONENT — Typewriter
   ======================================================== */
import { $ } from '../utils.js';
import { SELECTORS, TYPEWRITER_PHRASES, TYPEWRITER_CONFIG } from '../constants.js';

/**
 * Initialise the typewriter text animation in the hero section.
 */
export function initTypewriter() {
  const el = $(SELECTORS.typewriter);
  if (!el) return;

  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function tick() {
    const current = TYPEWRITER_PHRASES[phraseIndex];
    let speed;

    if (isDeleting) {
      el.textContent = current.substring(0, charIndex - 1);
      charIndex--;
      speed = TYPEWRITER_CONFIG.deleteSpeed;
    } else {
      el.textContent = current.substring(0, charIndex + 1);
      charIndex++;
      speed = TYPEWRITER_CONFIG.typeSpeed;
    }

    if (!isDeleting && charIndex === current.length) {
      speed = TYPEWRITER_CONFIG.pauseAtEnd;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % TYPEWRITER_PHRASES.length;
      speed = TYPEWRITER_CONFIG.pauseBeforeType;
    }

    setTimeout(tick, speed);
  }

  setTimeout(tick, TYPEWRITER_CONFIG.initialDelay);
}
