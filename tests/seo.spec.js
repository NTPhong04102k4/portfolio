const { test, expect } = require('@playwright/test');

const ORIGIN = 'https://portfolio-lazynerd.vercel.app';

for (const [name, path, canonical] of [
  ['trang chủ', '/', `${ORIGIN}/`],
  ['trang learn', '/learn/', `${ORIGIN}/learn/`],
]) {
  test.describe(`SEO: ${name}`, () => {
    test.beforeEach(async ({ page }) => {
      await page.goto(path);
    });

    test('title 15–65 ký tự, description 70–170 ký tự', async ({ page }) => {
      const title = await page.title();
      expect(title.length).toBeGreaterThanOrEqual(15);
      expect(title.length).toBeLessThanOrEqual(65);
      const desc = await page.locator('meta[name="description"]').getAttribute('content');
      expect(desc.length).toBeGreaterThanOrEqual(70);
      expect(desc.length).toBeLessThanOrEqual(170);
    });

    test('canonical, robots, og:title, og:url, og:image, twitter:card', async ({ page }) => {
      await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', canonical);
      await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', /index, follow/);
      await expect(page.locator('meta[property="og:title"]')).toHaveCount(1);
      await expect(page.locator('meta[property="og:url"]')).toHaveAttribute('content', canonical);
      await expect(page.locator('meta[property="og:image"]')).toHaveAttribute('content', /^https:\/\//);
      await expect(page.locator('meta[name="twitter:card"]')).toHaveAttribute('content', 'summary_large_image');
    });

    test('đúng một <h1>, lang="vi", JSON-LD hợp lệ', async ({ page }) => {
      // trang chủ render bằng JS → chờ lâu hơn mặc định
      await expect(page.locator('h1')).toHaveCount(1, { timeout: 15000 });
      await expect(page.locator('html')).toHaveAttribute('lang', 'vi');
      const json = await page.locator('script[type="application/ld+json"]').first().textContent();
      expect(() => JSON.parse(json)).not.toThrow();
      expect(JSON.parse(json)['@context']).toBe('https://schema.org');
    });
  });
}

test.describe('SEO: sitemap và robots', () => {
  test('sitemap.xml liệt kê trang chủ và /learn/, mỗi URL có lastmod', async ({ request }) => {
    const res = await request.get('/sitemap.xml');
    expect(res.ok()).toBe(true);
    const xml = await res.text();
    expect(xml).toContain(`<loc>${ORIGIN}/</loc>`);
    expect(xml).toContain(`<loc>${ORIGIN}/learn/</loc>`);
    expect((xml.match(/<lastmod>/g) || []).length).toBe(2);
  });

  test('mọi URL trong sitemap tồn tại trên server local', async ({ request }) => {
    const xml = await (await request.get('/sitemap.xml')).text();
    const paths = [...xml.matchAll(/<loc>https:\/\/[^/]+(\/[^<]*)<\/loc>/g)].map((m) => m[1]);
    expect(paths.length).toBeGreaterThanOrEqual(2);
    for (const p of paths) expect((await request.get(p)).ok(), p).toBe(true);
  });

  test('robots.txt cho phép crawl và trỏ tới sitemap', async ({ request }) => {
    const txt = await (await request.get('/robots.txt')).text();
    expect(txt).toMatch(/User-agent: \*/);
    expect(txt).toMatch(/Allow: \//);
    expect(txt).toContain(`Sitemap: ${ORIGIN}/sitemap.xml`);
  });
});

test.describe('SEO: generator', () => {
  test('file sinh ra khớp seo/site.config.mjs (npm run seo:check)', () => {
    const { execFileSync } = require('node:child_process');
    expect(() => execFileSync('node', ['seo/generate-seo.mjs', '--check'], { stdio: 'pipe' })).not.toThrow();
  });

  test('đổi SITE_URL thì mọi URL đổi theo', () => {
    const { execFileSync } = require('node:child_process');
    // --check với siteUrl khác phải báo "out of date" (exit 1), chứng tỏ URL lấy từ config
    let failed = false;
    try {
      execFileSync('node', ['seo/generate-seo.mjs', '--check'], {
        stdio: 'pipe',
        env: { ...process.env, SITE_URL: 'https://learn.example.com' },
      });
    } catch {
      failed = true;
    }
    expect(failed).toBe(true);
  });
});
