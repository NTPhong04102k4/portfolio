const { test, expect } = require('@playwright/test');

test.describe('HTML (cơ bản + nâng cao)', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/learn/');
  });

  test('cơ bản: lang, title, viewport, 1 h1, id duy nhất', async ({ page }) => {
    await expect(page.locator('html')).toHaveAttribute('lang', 'vi');
    await expect(page).toHaveTitle(/Học HTML, CSS3, JavaScript, jQuery/);
    await expect(page.locator('meta[name="viewport"]')).toHaveCount(1);
    await expect(page.locator('h1')).toHaveCount(1);
    const dupes = await page.evaluate(() => {
      const ids = [...document.querySelectorAll('[id]')].map((e) => e.id);
      return ids.filter((id, i) => ids.indexOf(id) !== i);
    });
    expect(dupes).toEqual([]);
  });

  test('cơ bản: thẻ ngữ nghĩa nav/main/section/footer', async ({ page }) => {
    await expect(page.locator('nav#topbar')).toHaveCount(1);
    await expect(page.locator('main#page')).toHaveCount(1);
    expect(await page.locator('main > section').count()).toBeGreaterThanOrEqual(10);
    await expect(page.locator('footer')).toHaveCount(1);
  });

  test('cơ bản: mọi link mục lục trỏ tới id tồn tại', async ({ page }) => {
    const hrefs = await page.$$eval('#topbar a', (as) => as.map((a) => a.getAttribute('href')));
    expect(hrefs.length).toBeGreaterThan(5);
    for (const h of hrefs) await expect(page.locator(h)).toHaveCount(1);
  });

  test('nâng cao: <dialog> mở/đóng bằng showModal/close', async ({ page }) => {
    const dlg = page.locator('#demo-dialog');
    await expect(dlg).toHaveJSProperty('open', false);
    await page.locator('#open-dialog').click();
    await expect(dlg).toHaveJSProperty('open', true);
    await page.locator('#close-dialog').click();
    await expect(dlg).toHaveJSProperty('open', false);
  });

  test('nâng cao: <details> bật/tắt không cần JS', async ({ page }) => {
    const d = page.locator('#html details').first();
    await d.locator('summary').click();
    await expect(d).toHaveJSProperty('open', true);
  });

  test('nâng cao: form có novalidate, input có autocomplete', async ({ page }) => {
    await expect(page.locator('#demo-form')).toHaveAttribute('novalidate', '');
    await expect(page.locator('#f-email')).toHaveAttribute('autocomplete', 'email');
  });
});

test('asset không 404 dù mở /learn (không có dấu / cuối) hay /learn/', async ({ page }) => {
  for (const url of ['/learn', '/learn/']) {
    const bad = [];
    page.on('response', (r) => r.status() >= 400 && bad.push(`${r.status()} ${r.url()}`));
    await page.goto(url);
    await expect(page.locator('h1')).toHaveCount(1);
    // CSS và JS của trang phải thực sự được áp dụng
    expect(await page.$eval('#topbar', (e) => getComputedStyle(e).position)).toBe('sticky');
    await expect(page.locator('#dim-out')).not.toHaveText('...');
    expect(bad, url).toEqual([]);
    page.removeAllListeners('response');
  }
});
