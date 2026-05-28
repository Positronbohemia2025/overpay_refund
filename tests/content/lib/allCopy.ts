/**
 * Gather every user-visible Romanian string on the page (i18n catalogs +
 * structured content modules) into one keyed record. Used by the whole-page
 * tone audit, reading-level check, and the claims register lint.
 */
import { flattenCatalogs } from './flatten';

import common from '../../../src/i18n/locales/ro/common.json';
import nav from '../../../src/i18n/locales/ro/nav.json';
import hero from '../../../src/i18n/locales/ro/hero.json';
import features from '../../../src/i18n/locales/ro/features.json';
import estimator from '../../../src/i18n/locales/ro/estimator.json';
import upload from '../../../src/i18n/locales/ro/upload.json';
import footer from '../../../src/i18n/locales/ro/footer.json';

import { LENDERS } from '../../../src/content/ro/lenders';

export function collectAllCopy(): Record<string, string> {
  const out: Record<string, string> = flattenCatalogs({
    common,
    nav,
    hero,
    features,
    estimator,
    upload,
    footer,
  });

  LENDERS.forEach((l) => {
    out[`lender.${l.id}`] = l.label;
  });

  return out;
}

/** Just the prose blocks (multi-sentence) used by the reading-level audit. */
export function collectProseBlocks(): Record<string, string> {
  const all = collectAllCopy();
  const out: Record<string, string> = {};
  for (const [k, v] of Object.entries(all)) {
    if (v.length >= 60) out[k] = v;
  }
  return out;
}
