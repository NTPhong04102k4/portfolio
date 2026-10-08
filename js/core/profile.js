/* ========================================================
   CORE — Profile
   Personal info + social links shared by hero, about and footer
   ======================================================== */


/** Personal info */
export const PERSONAL_INFO = {
  name: "Nguyễn Thế Phong",
  firstName: "Phong",
  role: "Frontend Developer",
  greeting: "Xin chào, mình là",
  titlePrefix: "Mình là",
  description:
    "Chuyên gia phát triển ứng dụng Web/Mobile với kinh nghiệm xây dựng Form động (dnd-kit, Ark UI), Report Data (DevExpress), xuất báo cáo Excel/PDF, phân quyền CASL và thiết kế kiến trúc Frontend mở rộng.",
  aboutText: [
    "Sinh viên năm cuối ngành Công nghệ Thông tin tại <strong>Đại học Giao thông Vận tải (UTC)</strong>, Hà Nội. Với kinh nghiệm thực chiến từ tháng 08/2023 qua nhiều hệ thống CMS doanh nghiệp quy mô lớn.",
    "Sở trường của mình là làm chủ các công nghệ mới như <strong>Form động (dnd-kit, Ark UI)</strong>, thiết kế <strong>Report Data (DevExpress)</strong>, tối ưu luồng dữ liệu (TanStack Query/Table/Virtual), xuất file Excel/PDF và tích hợp chặt chẽ với hệ thống REST API / Swagger.",
  ],
  details: [
    { icon: "fas fa-calendar-alt", label: "Ngày sinh", value: "04/10/2004" },
    {
      icon: "fas fa-map-marker-alt",
      label: "Địa chỉ",
      value: "Hà Nội, Việt Nam",
    },
    {
      icon: "fas fa-envelope",
      label: "Email",
      value: "phongnguyenphong267@gmail.com",
    },
    {
      icon: "fas fa-graduation-cap",
      label: "Học vấn",
      value: "ĐH GTVT (2022–2026)",
    },
  ],
  avatarSrc: "assets/images/a.png",
  cvHref: "assets/personal/React_Nguyen_The_phong.pdf",
};

/** Social links */
export const SOCIAL_LINKS = [
  {
    href: "https://github.com/NTPhong04102k4",
    icon: "fab fa-github",
    label: "GitHub",
    target: "_blank",
  },
  {
    href: "https://t.me/PhongNguyen2004",
    icon: "fab fa-telegram",
    label: "Telegram",
    target: "_blank",
  },
  {
    href: "mailto:phongnguyenphong267@gmail.com",
    icon: "fas fa-envelope",
    label: "Email",
  },
];
