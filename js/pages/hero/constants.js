/* ========================================================
   HERO — constants
   Selectors, typewriter, particle config and observer options
   ======================================================== */


export const SELECTORS = {
  typewriter: "#typewriter",
  heroCanvas: "#hero-canvas",
  heroSection: "#hero",
};

export const TYPEWRITER_PHRASES = [
  "Frontend Developer",
  "React Specialist",
  "UI/UX Enthusiast",
  "TypeScript Developer",
  "Performance Optimizer",
];

export const TYPEWRITER_CONFIG = {
  typeSpeed: 80,
  deleteSpeed: 40,
  pauseAtEnd: 2000,
  pauseBeforeType: 300,
  initialDelay: 1200,
};

export const PARTICLE_CONFIG = {
  maxCount: 100,
  maxDpr: 2, // cap devicePixelRatio for the canvas backing store
  densityFactor: 12000,
  connectionDistance: 150,
  mouseRadius: 120,
  mouseForce: 0.02,
  particleMinSize: 0.5,
  particleSizeRange: 2,
  speedRange: 0.5,
  minOpacity: 0.1,
  opacityRange: 0.5,
  lineWidth: 0.5,
  maxLineOpacity: 0.15,
  color: { r: 108, g: 99, b: 255 },
};

export const HERO_OBSERVER_OPTIONS = {
  threshold: 0.1,
};
