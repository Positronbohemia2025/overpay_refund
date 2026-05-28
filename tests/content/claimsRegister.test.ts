/**
 * Claims register structural lint (T062 / FR-006, SC-012).
 *
 * Verifies docs/claims-register.md parses and every row has a non-empty source.
 * The stricter check that no source is still an operator placeholder lives in
 * tests/release/ (release-blocking — T065).
 */
import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { parseClaimsRegister } from './lib/claimsRegister';

const REGISTER_PATH = resolve(process.cwd(), 'docs/claims-register.md');

describe('claims register', () => {
  const md = readFileSync(REGISTER_PATH, 'utf8');
  const rows = parseClaimsRegister(md);

  it('parses and contains rows', () => {
    expect(rows.length).toBeGreaterThan(0);
  });

  it('every row has a non-empty source (TODOs allowed here — caught at release)', () => {
    const empty = rows.filter((r) => r.source.trim().length === 0 || r.source === '—');
    expect(empty).toEqual([]);
  });

  it('claim IDs are unique', () => {
    const ids = rows.map((r) => r.id);
    expect(new Set(ids).size).toBe(ids.length);
  });
});
