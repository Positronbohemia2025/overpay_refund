/**
 * Responsive verification (T059 / FR-017, SC-010).
 *
 * All sections and disclosures stay legible at a 360 px-wide mobile viewport
 * on current browsers. The Playwright config defines a `mobile-360` project;
 * this suite runs there and asserts no horizontal overflow plus that the key
 * landmarks remain visible on every route.
 */
import { test, expect } from '@playwright/test';
import { ROUTES } from './routes';

// Only meaningful in the mobile-360 project; the desktop project skips this file.
test.beforeEach(() => {
  if (test.info().project.name !== 'mobile-360') {
    test.skip();
  }
});

for (const route of ROUTES) {
  test(`${route.name}: no horizontal overflow and content is legible at 360px`, async ({ page }) => {
    await page.goto(route.path);

    // No horizontal scroll: the document never exceeds the viewport width.
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - window.innerWidth,
    );
    expect(overflow).toBeLessThanOrEqual(1);

    // Main landmark and an h1 are present and visible.
    await expect(page.getByRole('main')).toBeVisible();
    await expect(page.getByRole('heading', { level: 1 }).first()).toBeVisible();

    // Body copy is set at a legible size (>= 14px effective) on this viewport.
    const fontSize = await page.evaluate(() =>
      parseFloat(getComputedStyle(document.body).fontSize),
    );
    expect(fontSize).toBeGreaterThanOrEqual(14);
  });
}

test('home: hero CTAs are reachable and the upload widget opens in one tap (SC-006)', async ({
  page,
}) => {
  await page.goto('/');
  await page.getByRole('button', { name: /Verifică-mi contractul/i }).click();
  await expect(page.getByRole('heading', { name: /Încarcă-ți contractul/i })).toBeVisible();
});
