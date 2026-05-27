/** US2 accessibility gates (T046 / SC-008): axe over §2 and §6. */
import { describe, it, expect } from 'vitest';
import { axe } from 'vitest-axe';
import { renderWithProviders } from './render';
import { WhyThisExists } from '../../src/sections/WhyThisExists/WhyThisExists';
import { ReportAndAfter } from '../../src/sections/ReportAndAfter/ReportAndAfter';

const AXE_OPTIONS = { rules: { 'color-contrast': { enabled: false } } } as const;

describe('US2 sections have no axe violations', () => {
  it('WhyThisExists', async () => {
    const { container } = renderWithProviders(<WhyThisExists />);
    expect(await axe(container, AXE_OPTIONS)).toHaveNoViolations();
  });

  it('ReportAndAfter', async () => {
    const { container } = renderWithProviders(<ReportAndAfter />);
    expect(await axe(container, AXE_OPTIONS)).toHaveNoViolations();
  });
});
