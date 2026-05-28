/**
 * Landing-page accessibility gates (SC-008).
 * axe across each section rendered on the landing.
 */
import { describe, it, expect } from 'vitest';
import { axe } from 'vitest-axe';
import { renderWithProviders } from './render';
// color-contrast needs a canvas (unavailable in jsdom); verified in Playwright/Lighthouse.
const AXE_OPTIONS = { rules: { 'color-contrast': { enabled: false } } } as const;
import { Header } from '../../src/sections/Header/Header';
import { Hero } from '../../src/sections/Hero/Hero';
import { FeatureCards } from '../../src/sections/FeatureCards/FeatureCards';
import { Estimator } from '../../src/sections/Estimator/Estimator';
import { SiteFooter } from '../../src/sections/SiteFooter/SiteFooter';

describe('landing sections have no axe violations', () => {
  const cases: Array<[string, () => React.ReactElement]> = [
    ['Header', () => <Header />],
    ['Hero', () => <Hero />],
    ['FeatureCards', () => <FeatureCards />],
    ['Estimator', () => <Estimator />],
    ['SiteFooter', () => <SiteFooter />],
  ];

  for (const [name, render] of cases) {
    it(name, async () => {
      const { container } = renderWithProviders(render());
      expect(await axe(container, AXE_OPTIONS)).toHaveNoViolations();
    });
  }
});
