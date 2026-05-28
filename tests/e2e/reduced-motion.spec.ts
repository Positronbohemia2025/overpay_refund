/**
 * Reduced-motion audit (T058 / FR-013, SC-009).
 *
 * With `prefers-reduced-motion: reduce`, no non-essential motion plays — every
 * animation and transition collapses to ~0ms and content stays understandable.
 * The page-wide rule lives in [src/styles/global.css]; this spec verifies it
 * actually takes effect at the DOM level on every route.
 */
import { test, expect } from '@playwright/test';
import { ROUTES } from './routes';

test.use({ colorScheme: 'light', contextOptions: { reducedMotion: 'reduce' } });

for (const route of ROUTES) {
  test(`${route.name}: no non-essential motion plays`, async ({ page }) => {
    await page.goto(route.path);
    await expect(page).toHaveTitle(/.+/); // sanity: page rendered

    // Sample several elements that normally carry transitions/animations and
    // assert their computed transition + animation durations are effectively zero.
    const stillness = await page.evaluate(() => {
      const offenders: Array<{ tag: string; transition: string; animation: string }> = [];
      const samples = document.querySelectorAll('a, button, [class*="trigger"], [class*="card"]');
      samples.forEach((el) => {
        const cs = getComputedStyle(el as Element);
        const t = parseFloat(cs.transitionDuration || '0');
        const a = parseFloat(cs.animationDuration || '0');
        if (t > 0.05 || a > 0.05) {
          offenders.push({
            tag: (el as Element).tagName,
            transition: cs.transitionDuration,
            animation: cs.animationDuration,
          });
        }
      });
      return offenders;
    });

    expect(stillness, JSON.stringify(stillness, null, 2)).toEqual([]);

    // Content must remain understandable — the main landmark and a heading exist.
    await expect(page.getByRole('main')).toBeVisible();
    await expect(page.getByRole('heading', { level: 1 }).first()).toBeVisible();
  });
}
