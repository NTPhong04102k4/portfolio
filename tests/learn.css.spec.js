const { test, expect } = require('@playwright/test');

const css = (page, sel, prop, pseudo) =>
  page.$eval(sel, (el, [p, ps]) => getComputedStyle(el, ps || null).getPropertyValue(p), [prop, pseudo]);

test.describe('CSS3 (cơ bản + nâng cao)', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/learn/');
  });

  test('cơ bản: biến CSS, box-sizing, border-radius', async ({ page }) => {
    expect((await css(page, 'html', '--primary')).trim()).toBe('#6c63ff');
    expect(await css(page, '.card', 'box-sizing')).toBe('border-box');
    expect(await css(page, '.card', 'border-top-left-radius')).toBe('14px');
  });

  test('transform: translate khi :hover', async ({ page, isMobile }) => {
    test.skip(isMobile, 'hover chỉ có với chuột');
    await page.locator('#t-translate').scrollIntoViewIfNeeded();
    await page.locator('#t-translate').hover();
    // poll: the transition (0.6s) may still be running when we first read
    await expect.poll(() => css(page, '#t-translate', 'transform')).toBe('matrix(1, 0, 0, 1, 40, -10)');
  });

  test('transform: scale và opacity (fade) khi :hover', async ({ page, isMobile }) => {
    test.skip(isMobile, 'hover chỉ có với chuột');
    await page.locator('#t-scale').scrollIntoViewIfNeeded();
    await page.locator('#t-scale').hover();
    await expect.poll(() => css(page, '#t-scale', 'transform')).toBe('matrix(1.5, 0, 0, 1.5, 0, 0)');
    await page.locator('#t-fade').hover();
    await expect.poll(async () => Number(await css(page, '#t-fade', 'opacity'))).toBeCloseTo(0.15, 2);
  });

  test('::before / ::after sinh nội dung', async ({ page }) => {
    expect(await css(page, '.badge-new', 'content', '::before')).toContain('★');
    expect(await css(page, '.link-fx', 'content', '::after')).toBe('""');
  });

  test('transition dùng cubic-bezier', async ({ page }) => {
    expect(await css(page, '.e-out', 'transition-timing-function')).toBe('cubic-bezier(0.22, 1, 0.36, 1)');
    expect(await css(page, '.e-spring', 'transition-timing-function')).toBe('cubic-bezier(0.34, 1.56, 0.64, 1)');
  });

  test('@keyframes 2D: animation-name và infinite', async ({ page }) => {
    expect(await css(page, '.a-pulse', 'animation-name')).toBe('pulse');
    expect(await css(page, '.a-spin', 'animation-iteration-count')).toBe('infinite');
  });

  test('3D: perspective, preserve-3d, backface-visibility', async ({ page }) => {
    expect(await css(page, '.scene3d', 'perspective')).toBe('700px');
    expect(await css(page, '.cube', 'transform-style')).toBe('preserve-3d');
    expect(await css(page, '.flip__side', 'backface-visibility')).toBe('hidden');
  });

  test('3D: bấm thẻ lật → mặt trước quay 180 độ', async ({ page }) => {
    await page.locator('#flip-card').scrollIntoViewIfNeeded();
    await page.locator('#flip-card').click();
    // rotateY(180deg) → ma trận 3D có phần tử đầu = -1
    await expect.poll(() => css(page, '.flip__inner', 'transform')).toMatch(/^matrix3d\(-1,/);
  });

  test('flex / grid', async ({ page }) => {
    expect(await css(page, '.flex-demo', 'display')).toBe('flex');
    expect(await css(page, '.grid-demo', 'display')).toBe('grid');
    expect(await css(page, '.areas-demo', 'grid-template-areas')).toContain('head head');
  });

  test('nâng cao: clamp() co giãn trong khoảng min–max', async ({ page }) => {
    await page.setViewportSize({ width: 360, height: 700 });
    const small = parseFloat(await css(page, 'h1', 'font-size'));
    await page.setViewportSize({ width: 1600, height: 900 });
    const big = parseFloat(await css(page, 'h1', 'font-size'));
    expect(big).toBeGreaterThan(small);
    expect(big).toBeLessThanOrEqual(48); // max = 3rem
    expect(small).toBeGreaterThanOrEqual(28.7); // min = 1.8rem
  });

  test('nâng cao: aspect-ratio 16/9', async ({ page }) => {
    const ratio = await page.$eval('.aspect', (e) => {
      const r = e.getBoundingClientRect();
      return r.width / r.height;
    });
    expect(ratio).toBeCloseTo(16 / 9, 1);
  });

  test('responsive: không cuộn ngang', async ({ page }) => {
    const over = await page.evaluate(
      () => document.documentElement.scrollWidth > document.documentElement.clientWidth
    );
    expect(over).toBe(false);
  });
});
