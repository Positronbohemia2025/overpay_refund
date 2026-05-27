/**
 * Foundational content gates (T023). Asserts the data-model build-time rules
 * that every later phase relies on:
 *   - all required disclosure slots are present,
 *   - the design system uses exactly one accent color (single-source),
 *   - every published locale was reviewed by a native speaker (FR-054).
 */
import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { disclosures } from '../../src/content/ro/disclosures';
import { validateDisclosures } from './lib/disclosureValidation';
import { LOCALES, getPublishedLocales } from '../../src/i18n/locales';

describe('disclosure slots present (data-model)', () => {
  it('has every required disclosure slot', () => {
    expect(validateDisclosures(disclosures)).toEqual([]);
  });
});

describe('single accent token (FR-009)', () => {
  // vitest runs from the repo root; read the tokens file from cwd.
  const tokensCss = readFileSync(resolve(process.cwd(), 'src/styles/tokens.css'), 'utf8');

  it('defines exactly one canonical --accent color', () => {
    const canonical = tokensCss.match(/--accent:\s*#[0-9a-fA-F]{3,8}\b/g) ?? [];
    expect(canonical).toHaveLength(1);
  });

  it('derives every other accent token from var(--accent) (no second hue)', () => {
    // Each --accent-* declaration must reference var(--accent), or be the
    // white text-contrast token; no independent accent hue may be introduced.
    const decls = tokensCss.match(/--accent-[a-z]+:[^;]+;/g) ?? [];
    for (const decl of decls) {
      const referencesAccent = decl.includes('var(--accent)');
      const isContrastWhite = /#fff(fff)?\b/i.test(decl);
      expect(referencesAccent || isContrastWhite).toBe(true);
    }
  });
});

describe('published locales (FR-054)', () => {
  it('publishes only native-speaker-reviewed locales', () => {
    expect(getPublishedLocales().every((l) => l.reviewedByNativeSpeaker)).toBe(true);
  });

  it('has exactly one default locale', () => {
    expect(LOCALES.filter((l) => l.isDefault)).toHaveLength(1);
  });
});
