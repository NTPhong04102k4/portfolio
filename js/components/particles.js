/* ========================================================
   COMPONENT — Particle Network (Hero Canvas)
   ======================================================== */
import { $, debounce, prefersReducedMotion } from '../utils.js';
import { SELECTORS, PARTICLE_CONFIG, HERO_OBSERVER_OPTIONS } from '../constants.js';

/**
 * Initialise the interactive particle network on the hero canvas.
 * Skipped entirely for users who prefer reduced motion.
 */
export function initParticles() {
  const canvas = $(SELECTORS.heroCanvas);
  if (!canvas || prefersReducedMotion()) return;

  const ctx = canvas.getContext('2d');
  const cfg = PARTICLE_CONFIG;
  // Halve the density budget on narrow (mobile) viewports to keep the
  // animation cheap on lower-power devices.
  const maxCount = window.innerWidth < 768 ? Math.round(cfg.maxCount / 2) : cfg.maxCount;
  let particles = [];
  // Logical (CSS px) size — all particle maths happens in this space.
  let width = 0;
  let height = 0;
  let mouse = { x: null, y: null };
  let animationId = null;

  // ---- Canvas sizing ----
  // Render at device resolution (capped at 2× — beyond that the cost
  // outweighs any visible sharpness) so sub-pixel dots aren't blurry.
  function resizeCanvas() {
    const dpr = Math.min(window.devicePixelRatio || 1, cfg.maxDpr);
    width = canvas.offsetWidth;
    height = canvas.offsetHeight;
    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  // ---- Mouse tracking ----
  // Listen on the whole hero, not the canvas: the canvas sits *under*
  // .hero__content, so it would only receive pointer events in the margins.
  const heroSection = $(SELECTORS.heroSection) || canvas;

  heroSection.addEventListener('pointermove', (e) => {
    if (e.pointerType !== 'mouse') return; // no hover on touch — skip
    const rect = canvas.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
  }, { passive: true });

  heroSection.addEventListener('pointerleave', () => {
    mouse.x = null;
    mouse.y = null;
  });

  // ---- Particle class ----
  class Particle {
    constructor() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.size = Math.random() * cfg.particleSizeRange + cfg.particleMinSize;
      this.speedX = (Math.random() - 0.5) * cfg.speedRange;
      this.speedY = (Math.random() - 0.5) * cfg.speedRange;
      this.opacity = Math.random() * cfg.opacityRange + cfg.minOpacity;
    }

    update() {
      this.x += this.speedX;
      this.y += this.speedY;

      // Bounce off walls
      if (this.x < 0 || this.x > width) this.speedX *= -1;
      if (this.y < 0 || this.y > height) this.speedY *= -1;

      // Mouse interaction
      if (mouse.x !== null) {
        const dx = this.x - mouse.x;
        const dy = this.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < cfg.mouseRadius) {
          const force = (cfg.mouseRadius - dist) / cfg.mouseRadius;
          this.x += dx * force * cfg.mouseForce;
          this.y += dy * force * cfg.mouseForce;
        }
      }
    }

    draw() {
      const { r, g, b } = cfg.color;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${this.opacity})`;
      ctx.fill();
    }
  }

  // ---- Create particles ----
  function createParticles() {
    const count = Math.min(
      Math.floor((width * height) / cfg.densityFactor),
      maxCount,
    );
    particles = [];
    for (let i = 0; i < count; i++) {
      particles.push(new Particle());
    }
  }

  // ---- Draw connections ----
  // Lines are bucketed by opacity so each bucket is one stroke() call
  // instead of one per pair (~5k pairs at 100 particles).
  const OPACITY_BUCKETS = 8;

  function connectParticles() {
    const { r, g, b } = cfg.color;
    const buckets = Array.from({ length: OPACITY_BUCKETS }, () => new Path2D());
    const maxDistSq = cfg.connectionDistance * cfg.connectionDistance;

    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const distSq = dx * dx + dy * dy;
        if (distSq >= maxDistSq) continue;

        const t = 1 - Math.sqrt(distSq) / cfg.connectionDistance; // 0..1
        const bucket = Math.min(OPACITY_BUCKETS - 1, Math.floor(t * OPACITY_BUCKETS));
        buckets[bucket].moveTo(particles[i].x, particles[i].y);
        buckets[bucket].lineTo(particles[j].x, particles[j].y);
      }
    }

    ctx.lineWidth = cfg.lineWidth;
    buckets.forEach((path, k) => {
      const opacity = ((k + 0.5) / OPACITY_BUCKETS) * cfg.maxLineOpacity;
      ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${opacity})`;
      ctx.stroke(path);
    });
  }

  // ---- Animation loop ----
  function animate() {
    ctx.clearRect(0, 0, width, height);
    particles.forEach(p => {
      p.update();
      p.draw();
    });
    connectParticles();
    animationId = requestAnimationFrame(animate);
  }

  resizeCanvas();
  createParticles();
  animate();

  // Observe the canvas box itself rather than window resize: it also catches
  // the scrollbar appearing once the loader releases body overflow (which
  // shrinks the hero by ~15px without any window event). Only re-seed
  // particles when the width changes — mobile browsers resize when the
  // address bar shows/hides (height only), and re-seeding there makes every
  // dot jump.
  let lastWidth = width;
  const onResize = debounce(() => {
    resizeCanvas();
    if (width !== lastWidth) {
      lastWidth = width;
      createParticles();
    }
  }, 150);
  new ResizeObserver(onResize).observe(canvas);

  // Pause when hero is not visible
  if (heroSection !== canvas) {
    const heroObserver = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          if (!animationId) animate();
        } else {
          cancelAnimationFrame(animationId);
          animationId = null;
        }
      },
      HERO_OBSERVER_OPTIONS,
    );
    heroObserver.observe(heroSection);
  }
}
