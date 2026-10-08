/* ========================================================
   CONTACT — constants
   Selectors, validation, form fields and contact info
   ======================================================== */


export const SELECTORS = {
  contactForm: "#contact-form",
  formName: "#form-name",
  formEmail: "#form-email",
  formSubject: "#form-subject",
  formMessage: "#form-message",
};

// WHATWG HTML "valid email address" pattern, tightened to require a TLD (a@b → invalid)
export const EMAIL_REGEX =
  /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;

export const FORM_MESSAGES = {
  required: "Vui lòng nhập thông tin này.",
  invalidEmail: "Email không hợp lệ.",
};

/** Contact form fields — rendered as Material 3 outlined text fields */
export const FORM_FIELDS = [
  { id: "form-name",    name: "name",    label: "Họ tên",   autocomplete: "name" },
  { id: "form-email",   name: "email",   label: "Email",    type: "email", autocomplete: "email" },
  { id: "form-subject", name: "subject", label: "Tiêu đề" },
  { id: "form-message", name: "message", label: "Nội dung", textarea: true, rows: 5 },
];

export const CONTACT_EMAIL = "phongnguyenphong267@gmail.com";

export const CONTACT_INFO = [
  {
    icon: "fas fa-envelope",
    title: "Email",
    value: "phongnguyenphong267@gmail.com",
    href: "mailto:phongnguyenphong267@gmail.com",
  },
  { icon: "fas fa-phone", title: "Điện thoại", value: "036 502 2794" }, // NO href -> plain text!
  {
    icon: "fab fa-telegram",
    title: "Telegram",
    value: "@PhongNguyen2004",
    href: "https://t.me/PhongNguyen2004",
    target: "_blank",
  },
  {
    icon: "fas fa-map-marker-alt",
    title: "Địa chỉ",
    value: "Hà Nội, Việt Nam",
  },
  {
    icon: "fab fa-github",
    title: "GitHub",
    value: "NTPhong04102k4",
    href: "https://github.com/NTPhong04102k4",
    target: "_blank",
  },
];

/** Formspree action URL */
export const FORM_ACTION = "https://formspree.io/f/your-form-id";
