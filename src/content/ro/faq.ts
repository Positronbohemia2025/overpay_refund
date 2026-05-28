/**
 * FAQ content (T048 / FR-052, SC-013). Exactly the 10 questions from FR-052, in
 * that order. Each answer is 2–4 plain sentences ending in a period — never a
 * call to action. Tone follows FR-002/FR-003: declarative, no exclamations, no
 * reassurance/blame phrasing.
 *
 * The English titles in REQUIRED_FAQ_QUESTIONS (tests/content/lib/faqFormat.ts)
 * are the canonical anchor; each `order` here corresponds 1:1.
 */
import type { FaqItem } from '../../types';

export const faqItems: FaqItem[] = [
  {
    order: 1,
    question: 'Este gratuit? Care este captura?',
    answer:
      'Da, verificarea contractului este gratuită. Nu este nevoie de cont și nu se cere plată în avans. Serviciul opțional de recuperare percepe un comision de succes — un procent din sumele recuperate — printr-un acord separat pe care îl accepți doar dacă vrei.',
  },
  {
    order: 2,
    question: 'Cine citește efectiv contractul meu?',
    answer:
      'Contractul este citit de un sistem software, nu de oameni. Înainte de analiză, datele care te identifică sunt eliminate pe server. Echipa care construiește serviciul include juriști licențiați, iar acreditările lor sunt publice.',
  },
  {
    order: 3,
    question: 'Ce se întâmplă cu contractul meu după analiză?',
    answer:
      'Contractul este păstrat pentru o perioadă scurtă, după care este șters. Datele tale nu sunt folosite pentru a antrena modele și nu sunt vândute, partajate sau agregate. Detaliile complete sunt în secțiunea despre tratarea contractului.',
  },
  {
    order: 4,
    question: 'Va afla creditorul că am verificat?',
    answer:
      'Nu. Platforma nu contactează niciodată creditorul, iar nicio acțiune nu este întreprinsă în numele tău fără acordul tău explicit.',
  },
  {
    order: 5,
    question: 'Nu mai am contractul original. Pot totuși să verific?',
    answer:
      'Da, ai mai multe opțiuni. Poți cere o copie a contractului de la creditor, fiind, de obicei, un drept legal. Dacă nu o poți obține, raportul indică ce alte documente pot fi folosite în loc, de exemplu extrasele de cont sau graficul de plăți.',
  },
  {
    order: 6,
    question: 'Este prea târziu dacă am luat creditul acum câțiva ani?',
    answer:
      'Termenele depind de tipul cererii. Faptul că împrumutul a fost luat acum câțiva ani nu închide neapărat opțiunile, iar raportul îți spune calm cum se aplică termenele în cazul tău.',
  },
  {
    order: 7,
    question: 'Încă plătesc acest credit. Contează acest lucru?',
    answer:
      'Da, este relevant chiar dacă încă plătești. Raportul arată dacă plătești în prezent mai mult decât trebuie și ce poți face pentru perioada rămasă din credit.',
  },
  {
    order: 8,
    question: 'Ce se întâmplă dacă analiza nu găsește nimic?',
    answer:
      'Primești un rezumat de o pagină cu ce a fost verificat și la ce să fii atent în viitor. Nu este un punct mort; rămâi cu o imagine clară a contractului tău.',
  },
  {
    order: 9,
    question: 'Cum se deosebește acest serviciu de a întreba un avocat?',
    answer:
      'Acest serviciu face o primă verificare clară, gratuită și anonimă, pe care un avocat ar factura-o ca timp de citire. Pentru a acționa pe baza raportului, poate fi nevoie de un profesionist calificat, iar raportul îți spune când și de ce.',
  },
  {
    order: 10,
    question: 'Trebuie să fac vreo acțiune după ce primesc raportul?',
    answer:
      'Nu este obligatoriu să faci nimic. Raportul îți aparține, iar tu decizi dacă acționezi singur, dacă alegi serviciul opțional de recuperare sau dacă păstrezi raportul pentru momentul potrivit.',
  },
];
