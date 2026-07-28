/* ========================================================
   CONSTANTS — Portfolio Configuration
   All magic numbers, data arrays, and config values
   ======================================================== */

// ======================== SELECTORS ========================
export const SELECTORS = {
  loader: '#loader',
  navbar: '#navbar',
  navToggle: '#nav-toggle',
  navMenu: '#nav-menu',
  navLinks: '.navbar__link',
  typewriter: '#typewriter',
  heroCanvas: '#hero-canvas',
  heroSection: '#hero',
  backToTop: '#back-to-top',
  contactForm: '#contact-form',
  formName: '#form-name',
  formEmail: '#form-email',
  formSubject: '#form-subject',
  formMessage: '#form-message',
  filterBtns: '.projects__filter',
  projectCards: '.projects__card',
  sections: '.section, .hero',
  revealElements: '.reveal-up, .reveal-left, .reveal-right',
  anchorLinks: 'a[href^="#"]',
  app: '#app',
};

// ======================== TYPEWRITER ========================
export const TYPEWRITER_PHRASES = [
  'Frontend Developer',
  'React Specialist',
  'UI/UX Enthusiast',
  'TypeScript Developer',
  'Performance Optimizer',
];

export const TYPEWRITER_CONFIG = {
  typeSpeed: 80,
  deleteSpeed: 40,
  pauseAtEnd: 2000,
  pauseBeforeType: 300,
  initialDelay: 1200,
};

// ======================== PARTICLES ========================
export const PARTICLE_CONFIG = {
  maxCount: 100,
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

// ======================== SCROLL ========================
export const SCROLL_CONFIG = {
  scrolledThreshold: 50,
  backToTopThreshold: 500,
};

// ======================== OBSERVER OPTIONS ========================
export const NAV_OBSERVER_OPTIONS = {
  threshold: 0.3,
  rootMargin: '-80px 0px 0px 0px',
};

export const REVEAL_OBSERVER_OPTIONS = {
  threshold: 0.15,
  rootMargin: '0px 0px -50px 0px',
};

export const HERO_OBSERVER_OPTIONS = {
  threshold: 0.1,
};

// ======================== LOADER ========================
export const LOADER_DELAY = 800;

// ======================== REVEAL ========================
export const REVEAL_STAGGER_STEP = 0.1;
export const REVEAL_STAGGER_GROUP = 4;

// ======================== CONTACT ========================
export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const FORM_MESSAGES = {
  emptyFields: 'Vui lòng điền đầy đủ thông tin.',
  invalidEmail: 'Email không hợp lệ.',
};

export const CONTACT_EMAIL = 'phongnguyenphong267@gmail.com';

// ======================== ANIMATION ========================
export const FADE_IN_UP_KEYFRAMES = `
  @keyframes fadeInUp {
    from { opacity: 0; transform: translateY(20px); }
    to   { opacity: 1; transform: translateY(0); }
  }
`;

// ======================== THEME ========================
export const THEME_STORAGE_KEY = 'portfolio-theme';
export const THEME_DARK = 'dark';
export const THEME_LIGHT = 'light';

// ======================== CONTENT DATA ========================

/** Navigation links */
export const NAV_LINKS = [
  { href: '#hero', label: 'Trang chủ', section: 'hero', active: true },
  { href: '#about', label: 'Giới thiệu', section: 'about' },
  { href: '#skills', label: 'Kỹ năng', section: 'skills' },
  { href: '#projects', label: 'Dự án', section: 'projects' },
  { href: '#experience', label: 'Kinh nghiệm', section: 'experience' },
  { href: '#contact', label: 'Liên hệ', section: 'contact' },
];

/** Personal info */
export const PERSONAL_INFO = {
  name: 'Nguyễn Thế Phong',
  firstName: 'Phong',
  role: 'Frontend Developer',
  greeting: 'Xin chào, mình là',
  titlePrefix: 'Mình là',
  description:
    'Chuyên gia phát triển ứng dụng Web/Mobile với trọng tâm vào tối ưu hóa hiệu suất UI, quản lý state phức tạp và thiết kế kiến trúc Frontend có khả năng mở rộng cao.',
  aboutText: [
    'Sinh viên năm cuối ngành Công nghệ Thông tin tại <strong>Đại học Giao thông Vận tải (UTC)</strong>, Hà Nội. Với đam mê mãnh liệt trong lĩnh vực phát triển Web, mình luôn không ngừng học hỏi và áp dụng các công nghệ mới nhất vào thực tế.',
    'Mục tiêu của mình là nắm bắt nhanh kiến trúc các dự án quy mô lớn, giải quyết các bài toán khó về rendering, tối ưu luồng dữ liệu và triển khai quy trình phát triển tinh gọn. Luôn tích hợp các AI workflow (Claude, Cursor) để đảm bảo tiến độ và chất lượng mã nguồn.',
  ],
  details: [
    { icon: 'fas fa-calendar-alt', label: 'Ngày sinh', value: '04/10/2004' },
    { icon: 'fas fa-map-marker-alt', label: 'Địa chỉ', value: 'Hà Nội, Việt Nam' },
    { icon: 'fas fa-envelope', label: 'Email', value: 'phongnguyenphong267@gmail.com' },
    { icon: 'fas fa-graduation-cap', label: 'Học vấn', value: 'ĐH GTVT (2022–2026)' },
  ],
  avatarSrc: 'assets/images/avatar.webp',
  cvHref: 'assets/NguyenThePhong_CV.pdf',
};

/** Social links */
export const SOCIAL_LINKS = [
  { href: 'https://github.com/NTPhong04102k4', icon: 'fab fa-github', label: 'GitHub', target: '_blank' },
  { href: 'mailto:phongnguyenphong267@gmail.com', icon: 'fas fa-envelope', label: 'Email' },
  { href: 'tel:0365022794', icon: 'fas fa-phone', label: 'Phone' },
];

/** Skill categories */
export const SKILLS_DATA = [
  {
    icon: 'fas fa-code',
    title: 'Frontend Core',
    tags: ['React', 'TypeScript', 'JavaScript', 'HTML5', 'CSS3', 'Next.js'],
  },
  {
    icon: 'fas fa-palette',
    title: 'UI & Styling',
    tags: ['TailwindCSS v3/v4', 'Ark/UI', 'Responsive Design', 'Theme System', 'Glassmorphism'],
  },
  {
    icon: 'fas fa-database',
    title: 'State & Data',
    tags: ['TanStack Query', 'TanStack Table', 'TanStack Virtual', 'CASL/Ability', 'REST API', 'WebSocket'],
  },
  {
    icon: 'fas fa-tools',
    title: 'Tools & DevOps',
    tags: ['Git & GitHub', 'CI/CD GitHub Actions', 'Vite', 'npm/pnpm', 'AI Workflow', 'Cursor / Claude'],
  },
  {
    icon: 'fas fa-tachometer-alt',
    title: 'Tối ưu hiệu suất',
    tags: ['Lifecycle Optimization', 'Virtual Scroll', 'Code Splitting', 'Lazy Loading', 'Memoization'],
  },
  {
    icon: 'fas fa-project-diagram',
    title: 'Kiến trúc & Patterns',
    tags: ['Component Architecture', 'Internal Libraries', 'CMS Integration', 'Scalable Frontend'],
  },
];

/** Filter buttons */
export const FILTER_BUTTONS = [
  { filter: 'all', label: 'Tất cả', active: true },
  { filter: 'web', label: 'Web App' },
  { filter: 'internal', label: 'Nội bộ' },
  { filter: 'ecommerce', label: 'E-Commerce' },
];

/** Projects */
export const PROJECTS_DATA = [
  {
    title: 'Web Nội Bộ Công Ty',
    description:
      'Hệ thống quản lý nội bộ với TailwindCSS v3/v4, theme nhúng HTML, CASL/Ability phân quyền, TanStack Table với virtual scroll và phân trang tối ưu. Đóng gói thư viện nội bộ, Ark/UI components.',
    image: 'assets/images/project-internal.webp',
    alt: 'Internal Web Application',
    category: 'internal web',
    tags: ['React', 'TypeScript', 'TailwindCSS', 'TanStack', 'CASL'],
    github: 'https://github.com/NTPhong04102k4',
  },
  {
    title: 'Thương Mại Điện Tử',
    description:
      'Nền tảng e-commerce hoàn chỉnh với REST API, WebSocket chat realtime, responsive mobile/desktop, CMS quản lý sản phẩm. CI/CD GitHub Actions tự động deploy.',
    image: 'assets/images/project-ecommerce.webp',
    alt: 'E-Commerce Platform',
    category: 'ecommerce web',
    tags: ['React', 'WebSocket', 'REST API', 'CI/CD'],
    github: 'https://github.com/NTPhong04102k4',
  },
  {
    title: 'CMS Management',
    description:
      'Hệ thống quản trị nội dung với TanStack Query tối ưu caching, TanStack Virtual xử lý danh sách lớn, phân trang default pagination. Tối ưu vòng đời component React.',
    image: 'assets/images/project-cms.webp',
    alt: 'CMS Platform',
    category: 'internal web',
    tags: ['React', 'TanStack Query', 'Virtual Scroll', 'CMS'],
    github: 'https://github.com/NTPhong04102k4',
  },
  {
    title: 'Chat Realtime',
    description:
      'Ứng dụng nhắn tin thời gian thực sử dụng WebSocket, responsive trên cả mobile và desktop. Tối ưu hiệu suất rendering tin nhắn với virtual scroll.',
    image: 'assets/images/project-chat.webp',
    alt: 'Realtime Chat Application',
    category: 'web',
    tags: ['WebSocket', 'React', 'Responsive', 'Virtual Scroll'],
    github: 'https://github.com/NTPhong04102k4',
  },
];

/** Experience timeline */
export const EXPERIENCE_DATA = [
  {
    date: '2022 – 2026',
    title: 'Đại học Giao thông Vận tải (UTC)',
    subtitle: 'Cử nhân Công nghệ Thông tin',
    text: 'Nghiên cứu và thực hành chuyên sâu về lập trình web, cơ sở dữ liệu, cấu trúc dữ liệu & giải thuật, mạng máy tính.',
    reveal: 'reveal-left',
  },
  {
    date: '2024',
    title: 'Frontend Developer Intern',
    subtitle: 'Dự án Web nội bộ công ty',
    text: 'Xây dựng hệ thống web nội bộ với React + TypeScript. Triển khai TailwindCSS theme system, CASL/Ability phân quyền, TanStack ecosystem, đóng gói thư viện nội bộ.',
    reveal: 'reveal-right',
  },
  {
    date: '2024 – 2025',
    title: 'Frontend Developer',
    subtitle: 'E-Commerce & CMS Projects',
    text: 'Phát triển nền tảng thương mại điện tử với REST API, WebSocket chat realtime. Xây dựng CMS quản trị nội dung. CI/CD GitHub Actions. Tích hợp AI workflow.',
    reveal: 'reveal-left',
  },
  {
    date: '2025 – Hiện tại',
    title: 'Tìm kiếm cơ hội mới',
    subtitle: 'Frontend Developer',
    text: 'Sẵn sàng đồng hành cùng team giải quyết các bài toán khó về rendering, tối ưu luồng dữ liệu và kiến trúc Frontend quy mô lớn.',
    reveal: 'reveal-right',
  },
];

/** Contact info items */
export const CONTACT_INFO = [
  { icon: 'fas fa-envelope', title: 'Email', value: 'phongnguyenphong267@gmail.com', href: 'mailto:phongnguyenphong267@gmail.com' },
  { icon: 'fas fa-phone', title: 'Điện thoại', value: '036 502 2794', href: 'tel:0365022794' },
  { icon: 'fas fa-map-marker-alt', title: 'Địa chỉ', value: 'Hà Nội, Việt Nam' },
  { icon: 'fab fa-github', title: 'GitHub', value: 'NTPhong04102k4', href: 'https://github.com/NTPhong04102k4', target: '_blank' },
];

/** Formspree action URL */
export const FORM_ACTION = 'https://formspree.io/f/your-form-id';
