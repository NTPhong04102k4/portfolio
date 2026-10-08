// Single source of truth for SEO. Change siteUrl here (or set SITE_URL) and run
// `npm run seo` to regenerate meta tags, JSON-LD, sitemap.xml and robots.txt.

export const siteUrl = (process.env.SITE_URL ?? 'https://portfolio-lazynerd.vercel.app').replace(/\/$/, '');

export const site = {
  name: 'Nguyễn Thế Phong | Portfolio',
  locale: 'vi_VN',
  lang: 'vi',
  author: 'Nguyễn Thế Phong',
  themeColor: { dark: '#0a0a1a', light: '#f0f0f8' },
  ogImage: {
    path: '/assets/images/og-image.jpg',
    width: 1200,
    height: 630,
    type: 'image/jpeg',
    alt: 'Nguyễn Thế Phong - Frontend Developer',
  },
  person: {
    name: 'Nguyễn Thế Phong',
    jobTitle: 'Frontend Developer',
    email: 'phongnguyenphong267@gmail.com',
    city: 'Hà Nội',
    country: 'VN',
    school: 'Đại học Giao thông Vận tải',
    knowsAbout: ['React', 'TypeScript', 'JavaScript', 'Next.js', 'TanStack Query', 'Frontend Development'],
    sameAs: ['https://github.com/NTPhong04102k4', 'https://t.me/PhongNguyen2004'],
    description:
      'Frontend Developer chuyên React, TypeScript, TanStack, CI/CD. Tối ưu hiệu suất UI và kiến trúc Frontend mở rộng.',
  },
};

// One entry per indexable page (like a generateMetadata per route).
export const pages = [
  {
    path: '/',
    file: 'index.html',
    title: 'Nguyễn Thế Phong | Frontend Developer',
    description:
      'Portfolio của Nguyễn Thế Phong – Frontend Developer chuyên React, TypeScript, TanStack, CI/CD. Tối ưu hiệu suất UI & kiến trúc Frontend mở rộng.',
    keywords: 'Nguyễn Thế Phong, Frontend Developer, React, TypeScript, Portfolio, Hà Nội',
    ogTitle: 'Nguyễn Thế Phong | Frontend Developer',
    ogDescription: 'Chuyên gia phát triển ứng dụng Web – React, TypeScript, TanStack, CI/CD.',
    ogType: 'website',
    jsonLd: 'home',
    changefreq: 'monthly',
    priority: '1.0',
    sitemapImage: true,
  },
  {
    path: '/learn/',
    file: 'learn/index.html',
    title: 'Học HTML, CSS3, JavaScript, jQuery có demo | Nguyễn Thế Phong',
    description:
      'Tài liệu tự học HTML, CSS3 (flex, grid, animation 2D/3D, cubic-bezier, clamp), JavaScript, jQuery và fetch, kèm demo chạy được.',
    ogTitle: 'Học HTML, CSS3, JavaScript, jQuery có demo',
    ogDescription: 'Demo chạy được cho HTML, CSS3 2D/3D, flex, grid, JavaScript, jQuery và fetch.',
    ogType: 'article',
    jsonLd: 'article',
    changefreq: 'monthly',
    priority: '0.6',
  },
];
