import type { ReactElement, ReactNode } from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { I18nextProvider } from 'react-i18next';
import i18n from '../../src/i18n';
import { LiveRegionProvider } from '../../src/components/LiveRegion/LiveRegion';
import { LiveRegionContext } from '../../src/components/LiveRegion/useAnnounce';

/** Render a component inside the app's i18n + router + live-region providers. */
export function renderWithProviders(ui: ReactElement, { route = '/' } = {}) {
  return render(
    <I18nextProvider i18n={i18n}>
      <MemoryRouter initialEntries={[route]}>
        <LiveRegionProvider>{ui}</LiveRegionProvider>
      </MemoryRouter>
    </I18nextProvider>,
  );
}

/** Render with a spy announce() so tests can assert what was announced (SC-008). */
export function renderWithAnnounceSpy(ui: ReactElement, announce: (m: string) => void) {
  const Wrapper = ({ children }: { children: ReactNode }) => (
    <I18nextProvider i18n={i18n}>
      <MemoryRouter>
        <LiveRegionContext.Provider value={{ announce }}>{children}</LiveRegionContext.Provider>
      </MemoryRouter>
    </I18nextProvider>
  );
  return render(ui, { wrapper: Wrapper });
}
