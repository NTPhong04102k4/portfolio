const { test, expect } = require('@playwright/test');

const API = 'https://jsonplaceholder.typicode.com';

test.describe('jQuery (cơ bản + gọi API)', () => {
  test.beforeEach(async ({ page }) => {
    await page.route(`${API}/posts/1`, (r) =>
      r.fulfill({ json: { userId: 1, id: 1, title: 'sunt aut facere', body: 'quia et' } })
    );
    await page.route(`${API}/posts/999999`, (r) => r.fulfill({ status: 404, json: {} }));
    await page.goto('/learn/');
  });

  test('jQuery được nạp', async ({ page }) => {
    expect(await page.evaluate(() => typeof window.jQuery)).toBe('function');
    expect(await page.evaluate(() => window.jQuery.fn.jquery)).toMatch(/^3\./);
  });

  test('selector #id và .class + toggleClass', async ({ page }) => {
    const box = page.locator('.jq-box');
    await page.locator('#jq-toggle').click();
    await expect(box).toHaveClass(/a-spin/);
    await page.locator('#jq-toggle').click();
    await expect(box).not.toHaveClass(/a-spin/);
  });

  test('hiệu ứng: fadeToggle ẩn rồi hiện panel', async ({ page }) => {
    const panel = page.locator('#jq-panel');
    await expect(panel).toBeVisible();
    await page.locator('#jq-fade').click();
    await expect(panel).toBeHidden();
    await page.locator('#jq-fade').click();
    await expect(panel).toBeVisible();
  });

  test('DOM: .val() + .append() thêm <li>, bỏ qua ô trống, escape HTML', async ({ page }) => {
    await page.locator('#jq-add').click();
    await expect(page.locator('#jq-list li')).toHaveCount(0);

    await page.fill('#jq-input', '<b>x</b>');
    await page.locator('#jq-add').click();
    await expect(page.locator('#jq-list li')).toHaveCount(1);
    await expect(page.locator('#jq-list li')).toHaveText('<b>x</b>'); // .text() chống XSS
    await expect(page.locator('#jq-list li b')).toHaveCount(0);
    await expect(page.locator('#jq-input')).toHaveValue('');
  });

  test('phím Enter kích hoạt nút Thêm', async ({ page }) => {
    await page.fill('#jq-input', 'một');
    await page.press('#jq-input', 'Enter');
    await expect(page.locator('#jq-list li')).toHaveText('một');
  });

  test('API: $.getJSON hiển thị JSON đã format (thụt 2 dấu cách)', async ({ page }) => {
    await page.locator('#jq-api-btn').click();
    const out = page.locator('#jq-api-out');
    await expect(out).toContainText('"title": "sunt aut facere"');
    const text = await out.textContent();
    expect(text).toBe(JSON.stringify(JSON.parse(text), null, 2));
  });

  test('API: lỗi 404 được báo bằng .fail()', async ({ page }) => {
    await page.locator('#jq-api-fail').click();
    await expect(page.locator('#jq-api-out')).toHaveText('Lỗi 404');
  });
});
