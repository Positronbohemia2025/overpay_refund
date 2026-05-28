/**
 * Recovery estimator (illustrative).
 *
 * Computes a rough "amount potentially recoverable" given:
 *   - loan: principal borrowed (MDL)
 *   - paid: total amount actually paid back (MDL)
 *   - lender: lender type, which sets a ceiling on total cost of credit
 *
 * The caps below are illustrative ceilings on the total cost of credit relative
 * to the principal across a typical microloan term. They are NOT official legal
 * caps; the operator must review them before launch and update if needed. The
 * estimator's role is to give visitors a sense of scale — the actual recoverable
 * amount depends on the contract's specific clauses, which only the partner
 * legal review can determine.
 */

export type LenderType = 'bank' | 'ifn' | 'p2p';

const COST_CAP_MULTIPLIER: Record<LenderType, number> = {
  bank: 0.5, // banks: total cost ≤ 50% of principal
  ifn: 1.2, // microfinance (OCN): total cost ≤ 120% of principal
  p2p: 1.5, // p2p / individual: total cost ≤ 150% of principal
};

export interface EstimateInput {
  loan: number;
  paid: number;
  lender: LenderType;
}

export interface EstimateResult {
  lawfulMax: number;
  recovery: number;
}

export function estimateRecovery({ loan, paid, lender }: EstimateInput): EstimateResult {
  const safeLoan = Math.max(0, loan);
  const safePaid = Math.max(0, paid);
  const lawfulMax = safeLoan * (1 + COST_CAP_MULTIPLIER[lender]);
  const recovery = Math.max(0, safePaid - lawfulMax);
  return { lawfulMax, recovery };
}

const MDL_FORMATTER = new Intl.NumberFormat('ro-MD', { maximumFractionDigits: 0 });

export function formatMDL(value: number): string {
  return MDL_FORMATTER.format(Math.round(value));
}
