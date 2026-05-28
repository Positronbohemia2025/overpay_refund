/** US3 accessibility gates (T057 / SC-008): axe over the FAQ and the off-ramp. */
import { describe, it, expect } from 'vitest';
import { axe } from 'vitest-axe';
import { renderWithProviders } from './render';
import { Faq } from '../../src/sections/Faq/Faq';
import { OffRamp } from '../../src/sections/OffRamp/OffRamp';

const AXE_OPTIONS = { rules: { 'color-contrast': { enabled: false } } } as const;

describe('US3 sections have no axe violations', () => {
  it('Faq', async () => {
    const { container } = renderWithProviders(<Faq />);
    expect(await axe(container, AXE_OPTIONS)).toHaveNoViolations();
  });

  it('OffRamp', async () => {
    const { container } = renderWithProviders(<OffRamp />);
    expect(await axe(container, AXE_OPTIONS)).toHaveNoViolations();
  });
});
