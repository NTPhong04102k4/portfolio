/* ========================================================
   COMPONENT — Particle Network (Hero Canvas)
   ======================================================== */
import { $ } from '../utils.js';
import { SELECTORS, PARTICLE_CONFIG, HERO_OBSERVER_OPTIONS } from '../constants.js';

/**
 * Initialise the interactive particle network on the hero canvas.
 */
export function initParticles() {
  const canvas = $(SELECTORS.heroCanvas);
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  const cfg = PARTICLE_CONFIG;
  let particles = [];
  let mouse = { x: null, y: null };
  let animationId = null;

  // ---- Canvas sizing ----
  function resizeCanvas() {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
  }

  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  // ---- Mouse tracking ----
  canvas.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
  });

  canvas.addEventListener('mouseleave', () => {
    mouse.x = null;
    mouse.y = null;
  });

  // ---- Particle class ----
  class Particle {
    constructor() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.size = Math.random() * cfg.particleSizeRange + cfg.particleMinSize;
      this.speedX = (Math.random() - 0.5) * cfg.speedRange;
      this.speedY = (Math.random() - 0.5) * cfg.speedRange;
      this.opacity = Math.random() * cfg.opacityRange + cfg.minOpacity;
    }

    update() {
      this.x += this.speedX;
      this.y += this.speedY;

      // Bounce off walls
      if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
      if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;

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
      Math.floor((canvas.width * canvas.height) / cfg.densityFactor),
      cfg.maxCount,
    );
    particles = [];
    for (let i = 0; i < count; i++) {
      particles.push(new Particle());
    }
  }

  // ---- Draw connections ----
  function connectParticles() {
    const { r, g, b } = cfg.color;
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < cfg.connectionDistance) {
          const opacity = (1 - dist / cfg.connectionDistance) * cfg.maxLineOpacity;
          ctx.beginPath();
          ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${opacity})`;
          ctx.lineWidth = cfg.lineWidth;
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }
    }
  }

  // ---- Animation loop ----
  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
      p.update();
      p.draw();
    });
    connectParticles();
    animationId = requestAnimationFrame(animate);
  }

  createParticles();
  animate();

  // Reinit on resize
  window.addEventListener('resize', createParticles);

  // Pause when hero is not visible
  const heroSection = $(SELECTORS.heroSection);
  if (heroSection) {
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
