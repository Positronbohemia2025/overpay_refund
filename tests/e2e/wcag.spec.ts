/**
 * Full WCAG 2.2 AA sweep (T060 / FR-016, SC-008).
 *
 * axe-core via @axe-core/playwright runs against every route on a real browser
 * (color-contrast can finally be checked — it can't be in jsdom). The unit-test
 * axe runs verify structural a11y for fast iteration; this is the production gate.
 */
import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { ROUTES } from './routes';

for (const route of ROUTES) {
  test(`${route.name}: passes WCAG 2.2 A + AA (axe)`, async ({ page }) => {
    await page.goto(route.path);
    // Ensure layout has stabilized.
    await page.waitForLoadState('networkidle');

    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'])
      .analyze();

    expect(results.violations, JSON.stringify(results.violations, null, 2)).toEqual([]);
  });
}

test('home: keyboard skip link works (FR-016)', async ({ page }) => {
  await page.goto('/');
  await page.keyboard.press('Tab');
  // The first focusable element is the SkipLink.
  const focused = await page.evaluate(() => document.activeElement?.textContent ?? '');
  expect(focused).toMatch(/Sari la conținut/i);
});
