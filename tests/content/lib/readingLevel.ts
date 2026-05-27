/**
 * Reading-level heuristic (FR-007, SC-011): copy should sit around B1 / grade-8.
 * Full Flesch is English-calibrated and unreliable for Romanian, so we use two
 * language-agnostic proxies that correlate with difficulty: words per sentence
 * and a long-word ratio. Sentences far over the threshold get flagged for a
 * human to simplify — the check informs review, it does not replace it.
 */
import { splitSentences, countWords } from './text';

export interface ReadingLevelReport {
  avgWordsPerSentence: number;
  longWordRatio: number;
  longSentences: string[];
}

const MAX_WORDS_PER_SENTENCE = 22; // B1 prose stays well under this on average
const LONG_WORD_CHARS = 13; // syllable-dense words for grade-8 Romanian

export function analyzeReadingLevel(text: string): ReadingLevelReport {
  const sentences = splitSentences(text);
  const totalWords = sentences.reduce((sum, s) => sum + countWords(s), 0);
  const avgWordsPerSentence = sentences.length ? totalWords / sentences.length : 0;

  const words = text.match(/[\p{L}’'-]+/gu) ?? [];
  const longWords = words.filter((w) => w.length >= LONG_WORD_CHARS);
  const longWordRatio = words.length ? longWords.length / words.length : 0;

  const longSentences = sentences.filter((s) => countWords(s) > MAX_WORDS_PER_SENTENCE + 6);

  return { avgWordsPerSentence, longWordRatio, longSentences };
}

/** True when copy is within the heuristic B1 band. */
export function isWithinB1(text: string): boolean {
  const { avgWordsPerSentence, longWordRatio, longSentences } = analyzeReadingLevel(text);
  return avgWordsPerSentence <= MAX_WORDS_PER_SENTENCE && longWordRatio <= 0.2 && longSentences.length === 0;
}
