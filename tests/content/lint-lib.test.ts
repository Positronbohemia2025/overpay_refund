/** Sanity checks for the content-lint library itself (T008). */
import { describe, it, expect } from 'vitest';
import { lintTone } from './lib/tone';
import { lintFaq, type FaqEntry } from './lib/faqFormat';
import { isWithinB1 } from './lib/readingLevel';
import { parseClaimsRegister, findRowsWithoutSource } from './lib/claimsRegister';

describe('tone lint', () => {
  it('flags exclamation points', () => {
    expect(lintTone('Verifică-ți contractul!')).toHaveLength(1);
  });

  it('flags the banned no-percentage claim regardless of diacritics', () => {
    const v = lintTone('Nu luăm niciun procent din nicio rambursare.');
    expect(v.some((x) => x.kind === 'banned_phrase')).toBe(true);
  });

  it('passes clean declarative copy', () => {
    expect(lintTone('Analiza este realizată de un sistem software, nu de oameni.')).toHaveLength(0);
  });
});

describe('faq format lint', () => {
  const ok: FaqEntry[] = Array.from({ length: 10 }, (_, i) => ({
    order: i + 1,
    question: `Întrebarea ${i + 1}?`,
    answer: 'Aceasta este o propoziție. Aceasta este a doua propoziție.',
  }));

  it('passes 10 well-formed items', () => {
    expect(lintFaq(ok)).toHaveLength(0);
  });

  it('flags a short answer and a missing item', () => {
    const bad = ok.slice(0, 9).concat({ order: 10, question: 'Q?', answer: 'Una.' });
    expect(lintFaq(bad).length).toBeGreaterThan(0);
  });
});

describe('reading-level heuristic', () => {
  it('passes short declarative sentences', () => {
    expect(isWithinB1('Verificarea este gratuită. Rezultatul îți aparține.')).toBe(true);
  });
});

describe('claims register parser', () => {
  it('parses rows and detects missing sources', () => {
    const md = `| ID | Claim | Source |\n|----|----|----|\n| C001 | x | y |\n| C002 | z | TODO |`;
    const rows = parseClaimsRegister(md);
    expect(rows).toHaveLength(2);
    expect(findRowsWithoutSource(rows)).toHaveLength(1);
  });
});
