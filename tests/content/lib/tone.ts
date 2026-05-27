/**
 * Tone lint (FR-002, FR-003, FR-004, FR-005, FR-031; SC-007).
 * Fails on exclamation points, urgency/scarcity, therapeutic/reassurance,
 * emotional asks, and the specifically-banned "no percentage of any refund"
 * claim. Phrases are listed in both Romanian (the launch copy) and English so
 * the lint stays useful as languages are added.
 */
import { normalize } from './text';

export interface ToneViolation {
  kind: 'exclamation' | 'banned_phrase';
  phrase?: string;
  excerpt: string;
}

/** Normalized substrings that must never appear in user-facing copy. */
export const BANNED_PHRASES: readonly string[] = [
  // Therapeutic / reassurance / emotional ask (FR-003, FR-004)
  'nu este vina ta',
  'nu e vina ta',
  'multi oameni nu',
  'putini stiu',
  'putini isi dau seama',
  'nu esti singur',
  'te intelegem',
  'credem ca',
  'simte-te',
  'that is not your fault',
  "it's not your fault",
  'many people do not realize',
  "many people don't realize",
  'we believe',
  'feel seen',
  'you are not alone',
  // Urgency / scarcity (FR-002)
  'grabeste-te',
  'oferta limitata',
  'ultima sansa',
  'doar astazi',
  'nu rata',
  'actioneaza acum',
  'limited time',
  'last chance',
  'act now',
  'hurry',
  "don't miss",
  // The reframed claim that must NOT be made (FR-031)
  'nu luam niciun procent',
  'niciun procent din nicio rambursare',
  'no percentage of any refund',
];

export function lintTone(
  text: string,
  extraBanned: readonly string[] = [],
): ToneViolation[] {
  const violations: ToneViolation[] = [];

  if (text.includes('!')) {
    const idx = text.indexOf('!');
    violations.push({
      kind: 'exclamation',
      excerpt: text.slice(Math.max(0, idx - 30), idx + 1),
    });
  }

  const haystack = normalize(text);
  for (const phrase of [...BANNED_PHRASES, ...extraBanned]) {
    const needle = normalize(phrase);
    const at = haystack.indexOf(needle);
    if (at !== -1) {
      violations.push({ kind: 'banned_phrase', phrase, excerpt: phrase });
    }
  }

  return violations;
}

/** Lint many strings; returns a flat list of violations with their source key. */
export function lintToneRecord(
  record: Record<string, string>,
  extraBanned: readonly string[] = [],
): Array<ToneViolation & { key: string }> {
  return Object.entries(record).flatMap(([key, value]) =>
    lintTone(value, extraBanned).map((v) => ({ ...v, key })),
  );
}
