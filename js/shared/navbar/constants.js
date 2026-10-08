/* ========================================================
   NAVBAR — constants
   Selectors, observer options and links for shared/navbar
   ======================================================== */


export const SELECTORS = {
  navbar: "#navbar",
  navToggle: "#nav-toggle",
  navMenu: "#nav-menu",
  navLinks: ".navbar__link",
  sections: ".section, .hero",
};

// Must match the hamburger breakpoint in css/shared/navbar.css
export const NAV_COLLAPSE_QUERY = "(max-width: 900px)";

export const NAV_OBSERVER_OPTIONS = {
  threshold: 0.3,
  rootMargin: "-80px 0px 0px 0px",
};

/** Navigation links */
export const NAV_LINKS = [
  { href: "#hero", label: "Trang chủ", section: "hero", active: true },
  { href: "#about", label: "Giới thiệu", section: "about" },
  { href: "#skills", label: "Kỹ năng", section: "skills" },
  { href: "#projects", label: "Dự án", section: "projects" },
  { href: "#experience", label: "Kinh nghiệm", section: "experience" },
  { href: "#contact", label: "Liên hệ", section: "contact" },
];
