/**
 * US2 content lint (T047 / FR-003, FR-046, FR-049, SC-007).
 * Patterns are single declarative sentences with no blame-absolving phrasing,
 * and the after-report copy discloses the optional contingency-fee agreement.
 */
import { describe, it, expect } from 'vitest';
import { lintToneRecord } from './lib/tone';
import { splitSentences } from './lib/text';
import { flattenCatalogs } from './lib/flatten';
import { abusePatterns, patternsClosingLine } from '../../src/content/ro/patterns';
import { afterReportPaths, reportStructure } from '../../src/content/ro/report';
import why from '../../src/i18n/locales/ro/why.json';
import report from '../../src/i18n/locales/ro/report.json';

describe('§2 abuse patterns (FR-046, FR-003)', () => {
  it('has three to four patterns', () => {
    expect(abusePatterns.length).toBeGreaterThanOrEqual(3);
    expect(abusePatterns.length).toBeLessThanOrEqual(4);
  });

  it('each explanation is a single sentence', () => {
    for (const p of abusePatterns) {
      expect(splitSentences(p.explanation)).toHaveLength(1);
    }
  });

  it('contains no exclamation or blame-absolving / reassurance phrasing', () => {
    const record: Record<string, string> = { closing: patternsClosingLine, ...why };
    abusePatterns.forEach((p) => {
      record[`${p.id}.title`] = p.title;
      record[`${p.id}.explanation`] = p.explanation;
    });
    expect(lintToneRecord(record)).toEqual([]);
  });
});

describe('§6 report + after (FR-049, SC-007)', () => {
  it('after-report copy and labels carry no banned phrasing', () => {
    const record: Record<string, string> = { ...flattenCatalogs({ report }) };
    afterReportPaths.forEach((path) => {
      record[`${path.outcome}.description`] = path.description;
      if (path.cost) record[`${path.outcome}.cost`] = path.cost;
      if (path.payee) record[`${path.outcome}.payee`] = path.payee;
      if (path.humanReviewPath) record[`${path.outcome}.human`] = path.humanReviewPath;
    });
    record['timingNote'] = reportStructure.timingNote;
    record['nextStep'] = reportStructure.recommendedNextStep;
    expect(lintToneRecord(record)).toEqual([]);
  });

  it('the likely-unlawful path discloses the contingency-fee agreement', () => {
    const path = afterReportPaths.find((p) => p.outcome === 'likely_unlawful');
    expect(path).toBeDefined();
    const text = `${path!.description} ${path!.cost ?? ''} ${path!.payee ?? ''}`.toLowerCase();
    expect(text).toContain('comision de succes');
    expect(text).toContain('procent');
  });

  it('covers all three outcomes', () => {
    const outcomes = afterReportPaths.map((p) => p.outcome).sort();
    expect(outcomes).toEqual(['ambiguous', 'likely_unlawful', 'nothing_found']);
  });

  it('the ambiguous path names a human-review route (FR-050)', () => {
    const path = afterReportPaths.find((p) => p.outcome === 'ambiguous');
    expect(path?.humanReviewPath).toBeTruthy();
  });
});
