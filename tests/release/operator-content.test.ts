/**
 * Operator-content completeness gate (T065 — release-blocking).
 *
 * The page must NOT ship while any required disclosure slot still holds an
 * operator placeholder, and the claims register must NOT ship while any
 * source is still a TODO. Run via `npm run lint:release` before going live.
 * Every flagged item is intentionally listed so the operator can replace it.
 */
import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { collectOperatorTodos } from '../../src/content/operatorTodo';
import { disclosures } from '../../src/content/ro/disclosures';
import { parseClaimsRegister, findRowsWithoutSource } from '../content/lib/claimsRegister';

describe('release-blocking — disclosures hold real, verifiable values', () => {
  it('has no operator placeholders left in disclosures', () => {
    const remaining = collectOperatorTodos(disclosures);
    expect(remaining, remaining.join('\n')).toEqual([]);
  });
});

describe('release-blocking — claims register sources are real citations', () => {
  const md = readFileSync(resolve(process.cwd(), 'docs/claims-register.md'), 'utf8');
  const rows = parseClaimsRegister(md);

  it('every claim row has a non-placeholder source', () => {
    const missing = findRowsWithoutSource(rows);
    const todos = rows.filter((r) => r.source.toUpperCase().includes('TODO'));
    const offenders = [...missing.map((m) => m.id), ...todos.map((r) => r.id)];
    expect(offenders, offenders.join(', ')).toEqual([]);
  });
});
