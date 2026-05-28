/**
 * Landing-page accessibility gates (SC-008).
 * axe across each section + a verification that UploadWidget announces every
 * client-controlled state change to the live region.
 */
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { axe } from 'vitest-axe';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProviders, renderWithAnnounceSpy } from './render';
// color-contrast needs a canvas (unavailable in jsdom); it is verified for real
// in the Playwright/Lighthouse e2e pass. Here we check structure.
const AXE_OPTIONS = { rules: { 'color-contrast': { enabled: false } } } as const;
import { Header } from '../../src/sections/Header/Header';
import { Hero } from '../../src/sections/Hero/Hero';
import { FeatureCards } from '../../src/sections/FeatureCards/FeatureCards';
import { Estimator } from '../../src/sections/Estimator/Estimator';
import { UploadSection } from '../../src/sections/UploadSection/UploadSection';
import { SiteFooter } from '../../src/sections/SiteFooter/SiteFooter';
import UploadWidget from '../../src/components/UploadWidget/UploadWidget';

describe('landing sections have no axe violations', () => {
  const cases: Array<[string, () => React.ReactElement]> = [
    ['Header', () => <Header />],
    ['Hero', () => <Hero />],
    ['FeatureCards', () => <FeatureCards />],
    ['Estimator', () => <Estimator />],
    ['UploadSection', () => <UploadSection />],
    ['SiteFooter', () => <SiteFooter />],
  ];

  for (const [name, render] of cases) {
    it(name, async () => {
      const { container } = renderWithProviders(render());
      expect(await axe(container, AXE_OPTIONS)).toHaveNoViolations();
    });
  }
});

describe('UploadWidget announces each state change (SC-008)', () => {
  beforeEach(() => {
    vi.stubGlobal(
      'fetch',
      vi.fn(async () => new Response(JSON.stringify({ submissionId: 'abc', status: 'queued' }), { status: 202 })),
    );
  });
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('announces selected → validating → uploading → accepted', async () => {
    const announce = vi.fn();
    renderWithAnnounceSpy(<UploadWidget locale="ro" />, announce);
    const user = userEvent.setup();

    const file = new File(['%PDF-1.4 sample'], 'contract.pdf', { type: 'application/pdf' });
    await user.upload(screen.getByLabelText(/Alege contractul/i), file);
    expect(announce).toHaveBeenCalledWith(expect.stringContaining('Fișier selectat'));

    await user.click(screen.getByLabelText(/anonimizat/i));
    await user.click(screen.getByLabelText(/termenii/i));
    await user.click(screen.getByRole('button', { name: /Trimite/i }));

    await waitFor(() => {
      expect(announce).toHaveBeenCalledWith(expect.stringContaining('Se verifică'));
      expect(announce).toHaveBeenCalledWith(expect.stringContaining('Se încarcă'));
      expect(announce).toHaveBeenCalledWith(expect.stringContaining('pus în coada'));
    });
  });

  it('announces a plain-language reason when consent is missing', async () => {
    const announce = vi.fn();
    renderWithAnnounceSpy(<UploadWidget locale="ro" />, announce);
    const user = userEvent.setup();

    const file = new File(['%PDF-1.4 sample'], 'contract.pdf', { type: 'application/pdf' });
    await user.upload(screen.getByLabelText(/Alege contractul/i), file);
    await user.click(screen.getByRole('button', { name: /Trimite/i }));

    expect(announce).toHaveBeenCalledWith(expect.stringContaining('Bifează ambele căsuțe'));
  });
});
