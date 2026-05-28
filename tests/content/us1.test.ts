/**
 * Content lint for the landing copy (FR-002, FR-031, SC-007).
 * The whole-page copy carries no exclamation points and none of the banned
 * phrases — including the specifically-forbidden "no percentage of any refund"
 * claim (FR-031) — and every required disclosure slot is present.
 */
import { describe, it, expect } from 'vitest';
import { lintToneRecord } from './lib/tone';
import { collectAllCopy } from './lib/allCopy';
import { validateDisclosures } from './lib/disclosureValidation';
import { disclosures } from '../../src/content/ro/disclosures';

const allCopy = collectAllCopy();

describe('landing copy tone (FR-002, FR-031, SC-007)', () => {
  it('has no exclamation points or banned phrases', () => {
    expect(lintToneRecord(allCopy)).toEqual([]);
  });

  it('does not contain the banned no-percentage claim phrasing', () => {
    const joined = Object.values(allCopy).join(' ').toLowerCase();
    expect(joined).not.toContain('niciun procent');
  });
});

describe('disclosure slots (FR-024–FR-037)', () => {
  it('has every required disclosure slot present', () => {
    expect(validateDisclosures(disclosures)).toEqual([]);
  });
});
