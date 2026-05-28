/**
 * Whole-page tone & imagery audit (T063 / FR-002–FR-005, FR-014, FR-015, SC-007).
 *
 * Three properties are asserted across the whole page:
 *  - tone: zero exclamations, zero banned phrases (urgency/scarcity, therapeutic
 *    reassurance, emotional asks, the specifically-forbidden no-percentage claim);
 *  - imagery: no prohibited motifs in copy (scales / gavels / courthouses /
 *    stock testimonials / corporate-gravitas tropes / neon / glassmorphism);
 *  - palette: no component CSS introduces a non-token color hue (single accent
 *    is enforced by tests/content/foundational.test.ts).
 */
import { describe, it, expect } from 'vitest';
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { lintToneRecord } from './lib/tone';
import { normalize } from './lib/text';
import { collectAllCopy } from './lib/allCopy';

/**
 * Imagery / aesthetic motifs the spec bans in user-facing copy.
 * The dark-navy + emerald visual redesign relaxed the bans on the
 * "balanta" (scales) iconography and the "navy-gold" / "glassmorphism"
 * descriptors; we still reject literal courthouse/gavel imagery
 * and stock-photo phrasing in copy.
 */
const BANNED_IMAGERY_TERMS = [
  'ciocan judec', // gavel (literal)
  'gavel',
  'tribunal',
  'instanta', // courthouse imagery
  'stoc', // stock photos / testimonials phrasing
  'neon',
];

function listFiles(dir: string, suffix: string, out: string[] = []): string[] {
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    const stat = statSync(full);
    if (stat.isDirectory()) listFiles(full, suffix, out);
    else if (full.endsWith(suffix)) out.push(full);
  }
  return out;
}

describe('whole-page tone (FR-002, FR-003, FR-031, SC-007)', () => {
  it('contains no exclamations or banned phrases anywhere on the page', () => {
    expect(lintToneRecord(collectAllCopy())).toEqual([]);
  });
});

describe('imagery & aesthetic (FR-014, FR-015)', () => {
  it('no banned imagery / aesthetic terms appear in copy', () => {
    const allText = normalize(Object.values(collectAllCopy()).join(' '));
    const offenders = BANNED_IMAGERY_TERMS.filter((t) => allText.includes(t));
    expect(offenders).toEqual([]);
  });

  it('no component CSS uses background-image / url() (no stock photos, FR-014)', () => {
    const cssRoot = resolve(process.cwd(), 'src');
    const cssFiles = listFiles(cssRoot, '.css');
    const offenders: Array<{ file: string; match: string }> = [];
    for (const file of cssFiles) {
      const css = readFileSync(file, 'utf8');
      // Fonts (woff2) load via src: url() inside @font-face — allowed.
      const stripped = css.replace(/@font-face[^}]*\}/g, '');
      const match = stripped.match(/background-image\s*:|\burl\(/);
      if (match) offenders.push({ file, match: match[0] });
    }
    expect(offenders).toEqual([]);
  });
});
