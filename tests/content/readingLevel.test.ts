/**
 * Reading-level audit (T061 / FR-007, SC-011).
 * Romanian prose targets ~B1 / grade-8. Two language-agnostic proxies:
 * words-per-sentence and long-word ratio. The heuristic informs review, it
 * doesn't replace it — a flagged block is a candidate for simplification.
 */
import { describe, it, expect } from 'vitest';
import { analyzeReadingLevel } from './lib/readingLevel';
import { collectProseBlocks } from './lib/allCopy';

describe('reading level (~B1)', () => {
  const blocks = collectProseBlocks();

  it('keeps average sentence length under ~22 words', () => {
    const offenders: Array<[string, number]> = [];
    for (const [key, text] of Object.entries(blocks)) {
      const { avgWordsPerSentence } = analyzeReadingLevel(text);
      if (avgWordsPerSentence > 22) offenders.push([key, avgWordsPerSentence]);
    }
    expect(offenders, JSON.stringify(offenders)).toEqual([]);
  });

  it('flags no overly long single sentences (>28 words)', () => {
    const offenders: Array<{ key: string; sentence: string }> = [];
    for (const [key, text] of Object.entries(blocks)) {
      const { longSentences } = analyzeReadingLevel(text);
      for (const s of longSentences) offenders.push({ key, sentence: s });
    }
    expect(offenders, JSON.stringify(offenders, null, 2)).toEqual([]);
  });

  it('keeps the long-word ratio reasonable (≤ 0.22)', () => {
    const offenders: Array<[string, number]> = [];
    for (const [key, text] of Object.entries(blocks)) {
      const { longWordRatio } = analyzeReadingLevel(text);
      if (longWordRatio > 0.22) offenders.push([key, longWordRatio]);
    }
    expect(offenders, JSON.stringify(offenders)).toEqual([]);
  });
});
