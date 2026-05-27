/**
 * US1 content lint (T039 / FR-002, FR-031, SC-007).
 * The US1 copy carries no exclamation points and none of the banned phrases —
 * including the specifically-forbidden "no percentage of any refund" claim
 * (FR-031) — and every required disclosure slot is present.
 */
import { describe, it, expect } from 'vitest';
import { lintToneRecord } from './lib/tone';
import { flattenCatalogs } from './lib/flatten';
import { validateDisclosures } from './lib/disclosureValidation';
import { disclosures } from '../../src/content/ro/disclosures';

import common from '../../src/i18n/locales/ro/common.json';
import hero from '../../src/i18n/locales/ro/hero.json';
import howItWorks from '../../src/i18n/locales/ro/howItWorks.json';
import who from '../../src/i18n/locales/ro/who.json';
import contract from '../../src/i18n/locales/ro/contract.json';
import footer from '../../src/i18n/locales/ro/footer.json';
import upload from '../../src/i18n/locales/ro/upload.json';

const us1Copy = flattenCatalogs({ common, hero, howItWorks, who, contract, footer, upload });

describe('US1 copy tone (FR-002, FR-031, SC-007)', () => {
  it('has no exclamation points or banned phrases', () => {
    expect(lintToneRecord(us1Copy)).toEqual([]);
  });

  it('does not contain the banned no-percentage claim phrasing', () => {
    const joined = Object.values(us1Copy).join(' ').toLowerCase();
    expect(joined).not.toContain('niciun procent');
  });
});

describe('US1 disclosure slots (FR-024–FR-037)', () => {
  it('has every required disclosure slot present', () => {
    expect(validateDisclosures(disclosures)).toEqual([]);
  });
});
