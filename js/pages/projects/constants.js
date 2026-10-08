/* ========================================================
   PROJECTS — constants
   Selectors, filter config and project data
   ======================================================== */


export const SELECTORS = {
  filterBtns: ".projects__filter",
  projectCards: ".projects__card",
  projectImages: ".projects__card-image img",
};

export const FILTER_ANIMATION = 'fade-in-up 0.45s var(--ease-out) both';

export const FILTER_BUTTONS = [
  { filter: "all", label: "Tất cả", active: true },
  { filter: "internal", label: "Dự án Nội bộ" },
  { filter: "cms", label: "Hệ thống CMS" },
];

export const PROJECTS_DATA = [
  {
    title: "CMS Quản Lý Thực Phẩm & Tiêu Dùng",
    period: "08/2023 – 12/2025",
    description:
      "Hệ thống Website & App CMS quản lý thực phẩm, danh mục sản phẩm, quản lý User và phân quyền chi tiết với CASL/Ability. Tối ưu rendering danh sách quy mô lớn bằng TanStack Virtual và caching với TanStack Query.",
    image: "assets/images/project-cms.webp",
    alt: "CMS Quản Lý Thực Phẩm",
    category: "internal cms",
    tags: [
      "React",
      "TypeScript",
      "TanStack Query",
      "Virtual Scroll",
      "CASL",
      "CMS Thực phẩm",
    ],
    isInternal: true,
  },
  {
    title: "Web CMS Quản Trị Nhân Sự Doanh Nghiệp",
    period: "01/2026 – 04/2026",
    description:
      "Hệ thống Web CMS quản trị nhân sự nội bộ. Quản lý chi tiết hồ sơ nhân sự, sơ đồ phòng ban, phân quyền truy cập, theo dõi hoạt động và tích hợp chuẩn hóa với hệ thống HR REST API.",
    image: "assets/images/project-internal.webp",
    alt: "CMS Quản Trị Nhân Sự",
    category: "internal cms",
    tags: [
      "React",
      "TypeScript",
      "TailwindCSS",
      "TanStack Table",
      "HR CMS",
      "Swagger API",
    ],
    isInternal: true,
    swaggerUrl: "https://dev.hrapi.ttmedic.vn/swagger/index.html",
  },
  {
    title: "Hệ Thống Quản Lý Phòng Khám & Vật Tư Tiêu Hao",
    period: "05/2026 – Hiện tại",
    description:
      "Hệ thống quản lý phòng khám và vật tư tiêu hao. Phát triển tính năng Form động kéo thả với dnd-kit & @ark-ui/react, xây dựng hệ thống Report Data với DevExpress Report Designer, tích hợp xuất báo cáo định dạng Excel và PDF.",
    image: "assets/images/project-ecommerce.webp",
    alt: "Quản Lý Phòng Khám & Vật Tư",
    category: "internal web",
    tags: [
      "React",
      "dnd-kit (Form động)",
      "Ark UI",
      "DevExpress Reports",
      "Xuất Excel/PDF",
      "Phòng khám",
    ],
    isInternal: true,
    swaggerUrl: "https://dev.khambenhaipdf.ttmedic.vn/swagger/index.html",
  },
];
