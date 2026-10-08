const { test, expect } = require('@playwright/test');

const API = 'https://jsonplaceholder.typicode.com';

// Chặn mạng thật: test ổn định, không phụ thuộc jsonplaceholder
async function mockApi(page) {
  await page.route(`${API}/todos/1`, (r) =>
    r.fulfill({ json: { userId: 1, id: 1, title: 'delectus aut autem', completed: false } })
  );
  await page.route(`${API}/posts/1`, (r) =>
    r.fulfill({ json: { userId: 1, id: 1, title: 'sunt aut facere', body: 'quia et suscipit' } })
  );
  await page.route(`${API}/posts/999999`, (r) => r.fulfill({ status: 404, json: {} }));
}

test.describe('JavaScript (cơ bản + nâng cao)', () => {
  test.beforeEach(async ({ page }) => {
    await mockApi(page);
    await page.goto('/learn/');
  });

  test('cơ bản: addEventListener + classList.toggle', async ({ page }) => {
    const target = page.locator('#js-target');
    await expect(target).not.toHaveClass(/a-pulse/);
    await page.locator('#js-toggle').click();
    await expect(target).toHaveClass(/a-pulse/);
    await page.locator('#js-toggle').click();
    await expect(target).not.toHaveClass(/a-pulse/);
  });

  test('cơ bản: event delegation đọc dataset.id', async ({ page }) => {
    await page.locator('#delegate-list li[data-id="3"]').click();
    await expect(page.locator('#delegate-out')).toHaveText('Đã chọn id = 3');
  });

  test('nâng cao: debounce chỉ cập nhật sau khi dừng gõ', async ({ page }) => {
    const out = page.locator('#search-out');
    await page.locator('#search-input').pressSequentially('abc', { delay: 50 });
    await expect(out).toHaveText('Chưa gõ'); // chưa quá 400ms
    await expect(out).toHaveText('Tìm: "abc"', { timeout: 2000 });
  });

  test('nâng cao: localStorage lưu bộ đếm qua lần tải lại', async ({ page }) => {
    await page.evaluate(() => localStorage.clear());
    await page.reload();
    await page.locator('#count-btn').click();
    await page.locator('#count-btn').click();
    await expect(page.locator('#count-btn')).toHaveText('Đếm: 2');
    await page.reload();
    await expect(page.locator('#count-btn')).toHaveText('Đếm: 2');
  });

  test('nâng cao: IntersectionObserver gắn .is-in khi cuộn tới', async ({ page }) => {
    const sec = page.locator('#cssadv');
    await sec.scrollIntoViewIfNeeded();
    await expect(sec).toHaveClass(/is-in/);
  });

  test('nâng cao: fetch wrapper trả JSON', async ({ page }) => {
    await page.locator('#fetch-btn').click();
    await expect(page.locator('#fetch-out')).toHaveText('OK: delectus aut autem');
  });

  test('check info: báo lỗi đúng từng ô rồi hợp lệ', async ({ page }) => {
    await page.locator('#demo-form button[type=submit]').click();
    await expect(page.locator('#demo-form .field.has-error')).toHaveCount(3);
    await expect(page.locator('#form-result')).toHaveText('Còn 3 ô chưa hợp lệ.');
    await expect(page.locator('#f-email')).toHaveAttribute('aria-invalid', 'true');

    await page.fill('#f-name', 'Nguyễn Thế Phong');
    await page.fill('#f-email', 'abc');
    await page.fill('#f-phone', '0365022794');
    await page.locator('#demo-form button[type=submit]').click();
    await expect(page.locator('[data-field=email] .msg')).toHaveText('Email không hợp lệ.');

    await page.fill('#f-email', 'phong@example.com');
    await page.locator('#demo-form button[type=submit]').click();
    await expect(page.locator('#form-result')).toHaveText('Thông tin hợp lệ.');
  });

  test('xoay màn: kích thước, hướng và loại thiết bị đổi theo viewport', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await expect(page.locator('#dim-out')).toHaveText('390 x 844 px | mobile | portrait');
    await page.setViewportSize({ width: 844, height: 390 });
    await expect(page.locator('#dim-out')).toHaveText('844 x 390 px | tablet | landscape');
    await page.setViewportSize({ width: 1440, height: 900 });
    await expect(page.locator('#dim-out')).toHaveText('1440 x 900 px | desktop | landscape');
    await expect(page.locator('html')).toHaveAttribute('data-orientation', 'landscape');
  });
});
