/**
 * Claims register lint (FR-006, SC-012): every factual claim on the page maps to
 * a verifiable source. The register lives in docs/claims-register.md as a table;
 * each claim has a stable id, the claim text, and a source. This module parses it
 * and lets a test assert that every claim id referenced in content is registered
 * and that no register row is missing a source.
 */

export interface ClaimRow {
  id: string;
  claim: string;
  source: string;
}

/**
 * Parse a markdown table of the form:
 * | ID | Claim | Source |
 * |----|-------|--------|
 * | C001 | ... | ... |
 */
export function parseClaimsRegister(markdown: string): ClaimRow[] {
  const rows: ClaimRow[] = [];
  for (const line of markdown.split('\n')) {
    const trimmed = line.trim();
    if (!trimmed.startsWith('|')) continue;
    const cells = trimmed
      .split('|')
      .slice(1, -1)
      .map((c) => c.trim());
    if (cells.length < 3) continue;
    const [id, claim, source] = cells;
    // Skip the header and the divider rows.
    if (/^c\d+$/i.test(id)) {
      rows.push({ id, claim, source });
    }
  }
  return rows;
}

export interface ClaimsRegisterIssue {
  id: string;
  problem: 'missing_source' | 'unregistered';
}

/** Every register row must have a non-empty source. */
export function findRowsWithoutSource(rows: ClaimRow[]): ClaimsRegisterIssue[] {
  return rows
    .filter((r) => r.source.length === 0 || /^todo/i.test(r.source) || r.source === '—')
    .map((r) => ({ id: r.id, problem: 'missing_source' as const }));
}

/** Claim ids used in content that are absent from the register. */
export function findUnregisteredClaims(
  usedClaimIds: readonly string[],
  rows: ClaimRow[],
): ClaimsRegisterIssue[] {
  const registered = new Set(rows.map((r) => r.id));
  return usedClaimIds
    .filter((id) => !registered.has(id))
    .map((id) => ({ id, problem: 'unregistered' as const }));
}
