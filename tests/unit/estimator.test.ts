import { describe, it, expect } from 'vitest';
import { estimateRecovery, formatMDL } from '../../src/lib/estimator';

describe('estimateRecovery', () => {
  it('returns zero when paid is at or below the lawful ceiling', () => {
    expect(estimateRecovery({ loan: 10000, paid: 10000, lender: 'ifn' }).recovery).toBe(0);
    expect(estimateRecovery({ loan: 10000, paid: 22000, lender: 'ifn' }).recovery).toBe(0);
    expect(estimateRecovery({ loan: 10000, paid: 15000, lender: 'bank' }).recovery).toBe(0);
  });

  it('returns the difference above the lawful ceiling', () => {
    expect(estimateRecovery({ loan: 10000, paid: 30000, lender: 'ifn' })).toEqual({
      lawfulMax: 22000,
      recovery: 8000,
    });
  });

  it('uses a different cap per lender type', () => {
    const paid = 25000;
    const bank = estimateRecovery({ loan: 10000, paid, lender: 'bank' }).recovery;
    const ifn = estimateRecovery({ loan: 10000, paid, lender: 'ifn' }).recovery;
    const p2p = estimateRecovery({ loan: 10000, paid, lender: 'p2p' }).recovery;
    expect(bank).toBeGreaterThan(ifn);
    expect(ifn).toBeGreaterThan(p2p);
  });

  it('clamps negative inputs to zero', () => {
    expect(estimateRecovery({ loan: -100, paid: -50, lender: 'ifn' }).recovery).toBe(0);
  });
});

describe('formatMDL', () => {
  it('formats integers with the ro-MD locale grouping', () => {
    expect(formatMDL(8200)).toMatch(/8.200/);
    expect(formatMDL(14500.5)).toMatch(/14.501|14.500/);
  });
});
