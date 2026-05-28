/**
 * Gather every user-visible Romanian string on the landing into one keyed
 * record. Used by the whole-page tone audit and reading-level check.
 */
import { flattenCatalogs } from './flatten';

import common from '../../../src/i18n/locales/ro/common.json';
import nav from '../../../src/i18n/locales/ro/nav.json';
import hero from '../../../src/i18n/locales/ro/hero.json';
import features from '../../../src/i18n/locales/ro/features.json';
import estimator from '../../../src/i18n/locales/ro/estimator.json';
import footer from '../../../src/i18n/locales/ro/footer.json';

export function collectAllCopy(): Record<string, string> {
  return flattenCatalogs({ common, nav, hero, features, estimator, footer });
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
