// Generates SEO output from seo/site.config.mjs. No dependencies.
//   node seo/generate-seo.mjs          write files
//   node seo/generate-seo.mjs --check  exit 1 if files are out of date (CI / tests)
import { readFileSync, writeFileSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { siteUrl, site, pages } from './site.config.mjs';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const check = process.argv.includes('--check');
const abs = (path) => `${siteUrl}${path}`;
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
const meta = (attr, key, value) => `<meta ${attr}="${key}" content="${esc(value)}" />`;

// ---------- generateMetadata(page): the <head> block, like Next.js generateMetadata ----------
export function generateMetadata(page) {
  const url = abs(page.path);
  const img = abs(site.ogImage.path);
  const lines = [
    `<title>${esc(page.title)}</title>`,
    meta('name', 'description', page.description),
    page.keywords && meta('name', 'keywords', page.keywords),
    meta('name', 'author', site.author),
    meta('name', 'robots', 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'),
    `<link rel="canonical" href="${url}" />`,
    page.path === '/' && `<link rel="alternate" hreflang="${site.lang}" href="${url}" />`,
    page.path === '/' && `<link rel="alternate" hreflang="x-default" href="${url}" />`,
    meta('name', 'color-scheme', 'dark light'),
    `<meta name="theme-color" content="${site.themeColor.dark}" media="(prefers-color-scheme: dark)" />`,
    `<meta name="theme-color" content="${site.themeColor.light}" media="(prefers-color-scheme: light)" />`,
    meta('property', 'og:title', page.ogTitle),
    meta('property', 'og:description', page.ogDescription),
    meta('property', 'og:type', page.ogType),
    meta('property', 'og:url', url),
    meta('property', 'og:site_name', site.name),
    meta('property', 'og:locale', site.locale),
    meta('property', 'og:image', img),
    meta('property', 'og:image:width', site.ogImage.width),
    meta('property', 'og:image:height', site.ogImage.height),
    meta('property', 'og:image:type', site.ogImage.type),
    meta('property', 'og:image:alt', site.ogImage.alt),
    meta('name', 'twitter:card', 'summary_large_image'),
    meta('name', 'twitter:title', page.ogTitle),
    meta('name', 'twitter:description', page.ogDescription),
    meta('name', 'twitter:image', img),
    meta('name', 'twitter:image:alt', site.ogImage.alt),
  ];
  return lines.filter(Boolean).join('\n  ');
}

export function generateJsonLd(page) {
  const p = site.person;
  const personId = `${abs('/')}#person`;
  const data =
    page.jsonLd === 'home'
      ? {
          '@context': 'https://schema.org',
          '@graph': [
            {
              '@type': 'WebSite',
              '@id': `${abs('/')}#website`,
              url: abs('/'),
              name: site.name,
              inLanguage: 'vi-VN',
              publisher: { '@id': personId },
            },
            {
              '@type': 'Person',
              '@id': personId,
              name: p.name,
              url: abs('/'),
              image: abs(site.ogImage.path),
              description: p.description,
              jobTitle: p.jobTitle,
              email: `mailto:${p.email}`,
              address: { '@type': 'PostalAddress', addressLocality: p.city, addressCountry: p.country },
              alumniOf: { '@type': 'CollegeOrUniversity', name: p.school },
              knowsAbout: p.knowsAbout,
              sameAs: p.sameAs,
            },
          ],
        }
      : {
          '@context': 'https://schema.org',
          '@type': 'TechArticle',
          headline: page.ogTitle,
          inLanguage: 'vi-VN',
          url: abs(page.path),
          author: { '@type': 'Person', name: p.name, url: abs('/') },
          dateModified: lastmod(page),
        };
  return `<script type="application/ld+json">\n  ${JSON.stringify(data, null, 2).replace(/\n/g, '\n  ')}\n  </script>`;
}

// lastmod = date of the last commit touching the page (falls back to today)
function lastmod(page) {
  try {
    const d = execFileSync('git', ['log', '-1', '--format=%cs', '--', page.file], { cwd: root }).toString().trim();
    if (d) return d;
  } catch {}
  return new Date().toISOString().slice(0, 10);
}

export function generateSitemap() {
  const urls = pages.map((page) => {
    const image = page.sitemapImage
      ? `\n    <image:image>\n      <image:loc>${abs(site.ogImage.path)}</image:loc>\n      <image:title>${esc(site.ogImage.alt)}</image:title>\n    </image:image>`
      : '';
    return `  <url>\n    <loc>${abs(page.path)}</loc>\n    <lastmod>${lastmod(page)}</lastmod>\n    <changefreq>${page.changefreq}</changefreq>\n    <priority>${page.priority}</priority>${image}\n  </url>`;
  });
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"\n        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n${urls.join('\n')}\n</urlset>\n`;
}

export const generateRobots = () => `User-agent: *\nAllow: /\n\nSitemap: ${abs('/sitemap.xml')}\n`;

// ---------- write / check ----------
const blocks = (name, body) => `<!-- seo:${name}:start (generated by npm run seo, do not edit) -->\n  ${body}\n  <!-- seo:${name}:end -->`;
const re = (name) => new RegExp(`<!-- seo:${name}:start[^>]*-->[\\s\\S]*?<!-- seo:${name}:end -->`);
const norm = (s) => s.replace(/\r\n/g, '\n');
// lastmod / dateModified come from git history, so they must not fail --check
const stable = (s) => norm(s).replace(/<lastmod>[^<]*<\/lastmod>/g, '').replace(/"dateModified": "[^"]*"/g, '');

const outputs = [];
for (const page of pages) {
  let html = norm(readFileSync(resolve(root, page.file), 'utf8'));
  for (const [name, body] of [['meta', generateMetadata(page)], ['jsonld', generateJsonLd(page)]]) {
    if (!re(name).test(html)) throw new Error(`${page.file}: missing <!-- seo:${name}:start --> marker`);
    html = html.replace(re(name), () => blocks(name, body));
  }
  outputs.push([page.file, html]);
}
outputs.push(['sitemap.xml', generateSitemap()], ['robots.txt', generateRobots()]);

let stale = 0;
for (const [file, next] of outputs) {
  const path = resolve(root, file);
  const prev = norm(readFileSync(path, 'utf8'));
  if ((check ? stable(prev) === stable(next) : prev === next)) continue;
  stale += 1;
  if (check) console.error(`out of date: ${file}`);
  else {
    writeFileSync(path, next);
    console.log(`updated ${file}`);
  }
}
if (check && stale) {
  console.error('Run `npm run seo` and commit the result.');
  process.exit(1);
}
if (!stale) console.log(check ? 'seo: up to date' : 'seo: nothing to change');
