/**
 * US3 content lint (T056 / FR-052, FR-053, SC-013, SC-007).
 * The FAQ has exactly the ten required questions in order, with 2–4 sentence
 * period-terminated answers that never end in a CTA. The off-ramp offers the
 * three alternative artifacts (sample report, guide, newsletter). All copy is
 * tone-clean.
 */
import { describe, it, expect } from 'vitest';
import { lintFaq } from './lib/faqFormat';
import { lintToneRecord } from './lib/tone';
import { flattenCatalogs } from './lib/flatten';
import { faqItems } from '../../src/content/ro/faq';
import faq from '../../src/i18n/locales/ro/faq.json';
import offramp from '../../src/i18n/locales/ro/offramp.json';

describe('§7 FAQ format (FR-052, SC-013)', () => {
  it('passes the FAQ format lint (10 items, ordered, 2–4 sentences, no CTA)', () => {
    expect(lintFaq(faqItems)).toEqual([]);
  });

  it('has exactly 10 questions in order 1..10', () => {
    expect(faqItems).toHaveLength(10);
    expect(faqItems.map((i) => i.order)).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
  });

  it('every answer ends in a period (SC-013)', () => {
    for (const item of faqItems) {
      expect(item.answer.trim().endsWith('.')).toBe(true);
    }
  });
});

describe('§7 + off-ramp tone (FR-002, FR-003, SC-007)', () => {
  it('has no exclamation points or banned phrases', () => {
    const record: Record<string, string> = { ...flattenCatalogs({ faq, offramp }) };
    faqItems.forEach((item) => {
      record[`faq.${item.order}.q`] = item.question;
      record[`faq.${item.order}.a`] = item.answer;
    });
    expect(lintToneRecord(record)).toEqual([]);
  });
});

describe('off-ramp artifacts (FR-053)', () => {
  it('offers the sample report, the guide, and the newsletter', () => {
    expect(offramp).toHaveProperty('sampleReport');
    expect(offramp).toHaveProperty('guide');
    expect(offramp).toHaveProperty('newsletter');
  });
});
