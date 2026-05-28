/**
 * Gather every user-visible Romanian string on the page (i18n catalogs +
 * structured content modules) into one keyed record. Used by the whole-page
 * tone audit (T063), reading-level check (T061), and the claims register lint.
 */
import { flattenCatalogs } from './flatten';

import common from '../../../src/i18n/locales/ro/common.json';
import hero from '../../../src/i18n/locales/ro/hero.json';
import howItWorks from '../../../src/i18n/locales/ro/howItWorks.json';
import who from '../../../src/i18n/locales/ro/who.json';
import contract from '../../../src/i18n/locales/ro/contract.json';
import footer from '../../../src/i18n/locales/ro/footer.json';
import why from '../../../src/i18n/locales/ro/why.json';
import report from '../../../src/i18n/locales/ro/report.json';
import faq from '../../../src/i18n/locales/ro/faq.json';
import offramp from '../../../src/i18n/locales/ro/offramp.json';
import upload from '../../../src/i18n/locales/ro/upload.json';

import { abusePatterns, patternsClosingLine } from '../../../src/content/ro/patterns';
import { afterReportPaths, reportStructure } from '../../../src/content/ro/report';
import { faqItems } from '../../../src/content/ro/faq';

export function collectAllCopy(): Record<string, string> {
  const out: Record<string, string> = flattenCatalogs({
    common,
    hero,
    howItWorks,
    who,
    contract,
    footer,
    why,
    report,
    faq,
    offramp,
    upload,
  });

  abusePatterns.forEach((p) => {
    out[`patterns.${p.id}.title`] = p.title;
    out[`patterns.${p.id}.explanation`] = p.explanation;
  });
  out['patterns.closingLine'] = patternsClosingLine;

  out['report.timingNote'] = reportStructure.timingNote;
  out['report.recommendedNextStep'] = reportStructure.recommendedNextStep;
  afterReportPaths.forEach((path) => {
    out[`report.${path.outcome}.description`] = path.description;
    if (path.cost) out[`report.${path.outcome}.cost`] = path.cost;
    if (path.payee) out[`report.${path.outcome}.payee`] = path.payee;
    if (path.humanReviewPath) out[`report.${path.outcome}.humanReview`] = path.humanReviewPath;
  });

  faqItems.forEach((item) => {
    out[`faq.${item.order}.q`] = item.question;
    out[`faq.${item.order}.a`] = item.answer;
  });

  return out;
}

/** Just the prose blocks (multi-sentence) used by the reading-level audit. */
export function collectProseBlocks(): Record<string, string> {
  const all = collectAllCopy();
  const out: Record<string, string> = {};
  for (const [k, v] of Object.entries(all)) {
    // Reading-level matters for prose; skip short labels/buttons/single-line UI bits.
    if (v.length >= 60) out[k] = v;
  }
  return out;
}
