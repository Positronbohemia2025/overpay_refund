/**
 * Common Moldovan lenders shown in the upload form's optional dropdown.
 * The list is illustrative; users can pick "Altul" if their lender is not
 * listed. No claim is made that this list is exhaustive.
 */
export type LenderType = 'ifn' | 'bank' | 'p2p';

export interface Lender {
  id: string;
  label: string;
  type: LenderType;
}

export const LENDERS: readonly Lender[] = [
  { id: 'iute-credit', label: 'IuteCredit', type: 'ifn' },
  { id: 'easycredit', label: 'EasyCredit', type: 'ifn' },
  { id: 'creditprime', label: 'CreditPrime', type: 'ifn' },
  { id: 'expresscredit', label: 'ExpressCredit', type: 'ifn' },
  { id: 'sebo', label: 'Sebo Credit', type: 'ifn' },
  { id: 'microinvest', label: 'Microinvest', type: 'ifn' },
  { id: 'moldindconbank', label: 'Moldindconbank', type: 'bank' },
  { id: 'maib', label: 'MAIB', type: 'bank' },
  { id: 'other', label: 'Altul', type: 'ifn' },
];
