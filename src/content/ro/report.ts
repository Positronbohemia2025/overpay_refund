/**
 * §6 report deliverable + after-report paths (T041 / FR-048–FR-051).
 * The report is described as a concrete deliverable (clause statuses, an
 * overpayment estimate with the calculation shown, a calm timing note, a
 * recommended next step). The three outcome paths each state what comes next;
 * the likely-unlawful path names the options, states cost + payee, and discloses
 * the optional contingency-fee recovery agreement (FR-049).
 */
import type { AfterReportPath, ReportStructure } from '../../types';

export const reportStructure: ReportStructure = {
  clauseStatuses: ['compliant', 'questionable', 'likely_unlawful'],
  regulationCitedWhenApplicable: true,
  overpaymentEstimate: { shown: true, calculationShown: true },
  timingNote:
    'Termenele depind de tipul cererii. Raportul îți spune calm dacă timpul îți afectează opțiunile, fără să te grăbească.',
  recommendedNextStep:
    'Raportul se încheie cu un pas recomandat, potrivit situației tale concrete.',
};

export const afterReportPaths: AfterReportPath[] = [
  {
    outcome: 'likely_unlawful',
    description:
      'Dacă raportul găsește taxe probabil nelegale sau clauze abuzive, primești un pas clar: o trimitere către un profesionist verificat, o plângere-model către organismul de reglementare sau o scrisoare de somație pe care o poți trimite chiar tu. Dacă alegi serviciul opțional de recuperare, acesta percepe un comision de succes — un procent din sumele recuperate — prin scrisori către organismele de reglementare sau printr-un proces legal, în numele tău, sub licența unor juriști.',
    cost: 'Scrisorile pe care le trimiți singur nu costă nimic; serviciul de recuperare percepe un comision doar din sumele recuperate efectiv.',
    payee: 'Comisionul de succes merge către serviciul de recuperare; restul sumei recuperate îți rămâne ție.',
    humanReviewPath: null,
  },
  {
    outcome: 'ambiguous',
    description:
      'Dacă rezultatele nu sunt clare, raportul îți spune exact ce informație suplimentară ar lămuri situația, de exemplu un grafic de plăți sau un act adițional. După ce o obții, poți cere o verificare făcută de un om.',
    cost: null,
    payee: null,
    humanReviewPath: 'Poți cere o verificare umană direct din raport.',
  },
  {
    outcome: 'nothing_found',
    description:
      'Dacă nu se găsește nimic clar nelegal, primești un rezumat de o pagină cu ce a fost verificat și la ce să fii atent în viitor. Nu este un punct mort: rămâi cu o imagine clară a contractului tău.',
    cost: null,
    payee: null,
    humanReviewPath: null,
  },
];
