/**
 * §2 abuse patterns (T040 / FR-046, FR-047).
 * Three to four named patterns, each one declarative sentence, drawn from the
 * approved set. No blame-absolving or "many people don't realize" phrasing —
 * recognition comes from accuracy, not reassurance (FR-003). The section ends
 * with the fixed closing line (FR-047).
 */
import type { AbusePattern } from '../../types';

export const abusePatterns: AbusePattern[] = [
  {
    id: 'hidden-apr',
    title: 'Dobândă reală ascunsă în comisioane',
    explanation:
      'Dobânda anuală efectivă ajunge la 200–600% atunci când comisioanele de serviciu, de procesare și de asigurare sunt listate separat și nu intră în rata afișată.',
  },
  {
    id: 'penalty-on-penalty',
    title: 'Penalitate peste penalitate',
    explanation:
      'Dobânda penalizatoare se aplică peste o altă dobândă penalizatoare, astfel încât suma datorată crește mult mai repede decât pare la prima vedere.',
  },
  {
    id: 'early-repayment',
    title: 'Comision la rambursarea anticipată',
    explanation:
      'Un comision aplicat la rambursarea anticipată anulează economia pe care ai face-o plătind creditul mai devreme.',
  },
  {
    id: 'optional-insurance',
    title: 'Asigurare „opțională” impusă',
    explanation:
      'O asigurare prezentată drept opțională este atașată creditului fără un acord clar și informat al împrumutatului.',
  },
];

/** FR-047 — the fixed declarative line that closes §2. */
export const patternsClosingLine =
  'Un împrumutat care a plătit la timp, de fiecare dată, poate totuși plăti substanțial mai mult decât trebuie, fără niciun semn vizibil că ceva este în neregulă.';
