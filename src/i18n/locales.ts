/**
 * Locale registry (T013 / FR-054).
 *
 * Romanian ships at launch, reviewed by a native speaker. The architecture is
 * multilingual-ready: add a locale here, but a locale with
 * reviewedByNativeSpeaker === false MUST NOT be published — getPublishedLocales()
 * is the single gate the router, footer, and language picker read from, so an
 * unreviewed (e.g. machine-translated) locale can never reach users.
 */
import type { Locale, LocaleCode } from '../types';

export const LOCALES: readonly Locale[] = [
  {
    code: 'ro',
    label: 'Română',
    dir: 'ltr',
    isDefault: true,
    reviewedByNativeSpeaker: true,
  },
];

export const DEFAULT_LOCALE: LocaleCode =
  LOCALES.find((l) => l.isDefault)?.code ?? 'ro';

/** Only native-speaker-reviewed locales are exposed anywhere in the UI (FR-054). */
export function getPublishedLocales(): Locale[] {
  return LOCALES.filter((l) => l.reviewedByNativeSpeaker);
}

export const PUBLISHED_LOCALE_CODES: readonly LocaleCode[] = getPublishedLocales().map(
  (l) => l.code,
);

const STORAGE_KEY = 'overpay.locale';

/** Read the stored language preference; never used for tracking. */
export function readStoredLocale(): LocaleCode | null {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored && PUBLISHED_LOCALE_CODES.includes(stored) ? stored : null;
  } catch {
    return null;
  }
}

export function storeLocale(code: LocaleCode): void {
  try {
    localStorage.setItem(STORAGE_KEY, code);
  } catch {
    /* storage unavailable — fall back to the default each load */
  }
}
