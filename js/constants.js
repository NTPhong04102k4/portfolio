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
  { href: '#footer', label: 'Cuối trang', section: 'footer' },
];

/** Personal info */
export const PERSONAL_INFO = {
  name: 'Nguyễn Thế Phong',
  firstName: 'Phong',
  role: 'Frontend Developer',
  greeting: 'Xin chào, mình là',
  titlePrefix: 'Mình là',
  description:
    'Chuyên gia phát triển ứng dụng Web/Mobile với kinh nghiệm xây dựng Form động (dnd-kit, Ark UI), Report Data (DevExpress), xuất báo cáo Excel/PDF, phân quyền CASL và thiết kế kiến trúc Frontend mở rộng.',
  aboutText: [
    'Sinh viên năm cuối ngành Công nghệ Thông tin tại <strong>Đại học Giao thông Vận tải (UTC)</strong>, Hà Nội. Với kinh nghiệm thực chiến từ tháng 08/2023 qua nhiều hệ thống CMS doanh nghiệp quy mô lớn.',
    'Sở trường của mình là làm chủ các công nghệ mới như <strong>Form động (dnd-kit, Ark UI)</strong>, thiết kế <strong>Report Data (DevExpress)</strong>, tối ưu luồng dữ liệu (TanStack Query/Table/Virtual), xuất file Excel/PDF và tích hợp chặt chẽ với hệ thống REST API / Swagger.',
  ],
  details: [
    { icon: 'fas fa-calendar-alt', label: 'Ngày sinh', value: '04/10/2004' },
    { icon: 'fas fa-map-marker-alt', label: 'Địa chỉ', value: 'Hà Nội, Việt Nam' },
    { icon: 'fas fa-envelope', label: 'Email', value: 'phongnguyenphong267@gmail.com' },
    { icon: 'fas fa-graduation-cap', label: 'Học vấn', value: 'ĐH GTVT (2022–2026)' },
  ],
  avatarSrc: 'assets/images/avatar.webp',
  cvHref: 'assets/personal/React_Nguyen_The_phong.pdf',
};

/** Social links */
export const SOCIAL_LINKS = [
  { href: 'https://github.com/NTPhong04102k4', icon: 'fab fa-github', label: 'GitHub', target: '_blank' },
  { href: 'https://t.me/PhongNguyen2004', icon: 'fab fa-telegram', label: 'Telegram', target: '_blank' },
  { href: 'mailto:phongnguyenphong267@gmail.com', icon: 'fas fa-envelope', label: 'Email' },
];

/** Skill categories */
export const SKILLS_DATA = [
  {
    icon: 'fas fa-code',
    title: 'Frontend Core',
    tags: ['React', 'TypeScript', 'JavaScript (ES6+)', 'HTML5', 'CSS3', 'Next.js'],
  },
  {
    icon: 'fas fa-cubes',
    title: 'Dynamic Form & UI',
    tags: ['dnd-kit (Drag&Drop)', 'Ark UI', 'TailwindCSS v3/v4', 'Responsive Design', 'Glassmorphism'],
  },
  {
    icon: 'fas fa-chart-bar',
    title: 'Report & Export',
    tags: ['DevExpress Report', 'Xuất File Excel', 'Xuất File PDF', 'Data Visualization', 'Dashboard'],
  },
  {
    icon: 'fas fa-database',
    title: 'State & Ecosystem',
    tags: ['TanStack Query', 'TanStack Table', 'TanStack Virtual', 'CASL/Ability', 'Swagger API'],
  },
  {
    icon: 'fas fa-tools',
    title: 'Tools & Workflow',
    tags: ['Git & GitHub', 'CI/CD GitHub Actions', 'Vite', 'pnpm / npm', 'Cursor / Claude AI'],
  },
  {
    icon: 'fas fa-project-diagram',
    title: 'Kiến trúc & Hệ thống',
    tags: ['Internal CMS', 'Enterprise System', 'Dynamic Forms', 'Scalable Architecture'],
  },
];

/** Filter buttons */
export const FILTER_BUTTONS = [
  { filter: 'all', label: 'Tất cả', active: true },
  { filter: 'internal', label: 'Dự án Nội bộ' },
  { filter: 'cms', label: 'Hệ thống CMS' },
];

/** Projects */
export const PROJECTS_DATA = [
  {
    title: 'CMS Quản Lý Thực Phẩm & Tiêu Dùng',
    period: '08/2023 – 12/2025',
    description:
      'Hệ thống Website & App CMS quản lý thực phẩm, danh mục sản phẩm, quản lý User và phân quyền chi tiết với CASL/Ability. Tối ưu rendering danh sách quy mô lớn bằng TanStack Virtual và caching với TanStack Query.',
    image: 'assets/images/project-cms.webp',
    alt: 'CMS Quản Lý Thực Phẩm',
    category: 'internal cms',
    tags: ['React', 'TypeScript', 'TanStack Query', 'Virtual Scroll', 'CASL', 'CMS Thực phẩm'],
    isInternal: true,
  },
  {
    title: 'Web CMS Quản Trị Nhân Sự Doanh Nghiệp',
    period: '01/2026 – 04/2026',
    description:
      'Hệ thống Web CMS quản trị nhân sự nội bộ. Quản lý chi tiết hồ sơ nhân sự, sơ đồ phòng ban, phân quyền truy cập, theo dõi hoạt động và tích hợp chuẩn hóa với hệ thống HR REST API.',
    image: 'assets/images/project-internal.webp',
    alt: 'CMS Quản Trị Nhân Sự',
    category: 'internal cms',
    tags: ['React', 'TypeScript', 'TailwindCSS', 'TanStack Table', 'HR CMS', 'Swagger API'],
    isInternal: true,
    swaggerUrl: 'https://dev.hrapi.ttmedic.vn/swagger/index.html',
  },
  {
    title: 'Hệ Thống Quản Lý Phòng Khám & Vật Tư Tiêu Hao',
    period: '05/2026 – Hiện tại',
    description:
      'Hệ thống quản lý phòng khám và vật tư tiêu hao. Phát triển tính năng Form động kéo thả với dnd-kit & @ark-ui/react, xây dựng hệ thống Report Data với DevExpress Report Designer, tích hợp xuất báo cáo định dạng Excel và PDF.',
    image: 'assets/images/project-ecommerce.webp',
    alt: 'Quản Lý Phòng Khám & Vật Tư',
    category: 'internal web',
    tags: ['React', 'dnd-kit (Form động)', 'Ark UI', 'DevExpress Reports', 'Xuất Excel/PDF', 'Phòng khám'],
    isInternal: true,
    swaggerUrl: 'https://dev.khambenhaipdf.ttmedic.vn/swagger/index.html',
  },
];

/** Experience timeline */
export const EXPERIENCE_DATA = [
  {
    date: '2022 – 2026',
    title: 'Đại học Giao thông Vận tải (UTC)',
    subtitle: 'Cử nhân Công nghệ Thông tin',
    text: 'Nghiên cứu chuyên sâu về lập trình Web, Cấu trúc dữ liệu & Giải thuật, Cơ sở dữ liệu và Kiến trúc phần mềm.',
    reveal: 'reveal-left',
  },
  {
    date: '08/2023 – 12/2025',
    title: 'Frontend Developer – CMS Quản lý Thực phẩm',
    subtitle: 'Dự án Website & App CMS Doanh nghiệp',
    text: 'Xây dựng hệ thống quản lý thực phẩm, quản lý người dùng & phân quyền CASL. Tối ưu hiệu năng rendering danh sách lớn với TanStack Virtual và quản lý cache với TanStack Query.',
    reveal: 'reveal-right',
  },
  {
    date: '01/2026 – 04/2026',
    title: 'Frontend Developer – Web CMS Quản trị Nhân sự',
    subtitle: 'Dự án Hệ thống Quản trị Nhân sự Nội bộ',
    text: 'Phát triển Web CMS quản lý nhân sự, phòng ban. Xây dựng bảng dữ liệu động với TanStack Table, tích hợp và giao tiếp hệ thống qua Swagger HR API.',
    reveal: 'reveal-left',
  },
  {
    date: '05/2026 – Hiện tại',
    title: 'Frontend Developer – Quản lý Phòng khám & Vật tư tiêu hao',
    subtitle: 'Dự án Quản lý Phòng khám & Report Data',
    text: 'Phát triển kiến trúc Form động kéo thả nâng cao với dnd-kit và Ark UI. Xây dựng hệ thống báo cáo Report Data trực quan với DevExpress Report Designer và xử lý xuất file Excel, PDF.',
    reveal: 'reveal-right',
  },
];

/** Contact info items */
export const CONTACT_INFO = [
  { icon: 'fas fa-envelope', title: 'Email', value: 'phongnguyenphong267@gmail.com', href: 'mailto:phongnguyenphong267@gmail.com' },
  { icon: 'fas fa-phone', title: 'Điện thoại', value: '036 502 2794' }, // NO href -> plain text!
  { icon: 'fab fa-telegram', title: 'Telegram', value: '@PhongNguyen2004', href: 'https://t.me/PhongNguyen2004', target: '_blank' },
  { icon: 'fas fa-map-marker-alt', title: 'Địa chỉ', value: 'Hà Nội, Việt Nam' },
  { icon: 'fab fa-github', title: 'GitHub', value: 'NTPhong04102k4', href: 'https://github.com/NTPhong04102k4', target: '_blank' },
];

/** Formspree action URL */
export const FORM_ACTION = 'https://formspree.io/f/your-form-id';
