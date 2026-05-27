/**
 * FAQ format lint (FR-052, SC-013): exactly 10 questions in the required order,
 * each answer 2–4 sentences ending in a period, never a call to action.
 */
import { splitSentences, normalize } from './text';

export interface FaqEntry {
  order: number;
  question: string;
  answer: string;
}

/** Imperative CTA openers that an answer must not end on (it must inform, not sell). */
const CTA_MARKERS = [
  'incarca',
  'verifica acum',
  'apasa',
  'click',
  'inscrie-te',
  'aboneaza-te',
  'upload',
  'check now',
  'sign up',
  'get started',
];

export interface FaqViolation {
  order: number;
  problem:
    | 'wrong_count'
    | 'wrong_order'
    | 'sentence_count'
    | 'no_terminal_period'
    | 'ends_with_cta';
  detail: string;
}

export function lintFaq(entries: FaqEntry[]): FaqViolation[] {
  const violations: FaqViolation[] = [];

  if (entries.length !== 10) {
    violations.push({
      order: 0,
      problem: 'wrong_count',
      detail: `expected exactly 10 FAQ items, got ${entries.length}`,
    });
  }

  const sorted = [...entries].sort((a, b) => a.order - b.order);
  sorted.forEach((entry, i) => {
    if (entry.order !== i + 1) {
      violations.push({
        order: entry.order,
        problem: 'wrong_order',
        detail: `item at position ${i + 1} has order ${entry.order}`,
      });
    }

    const sentences = splitSentences(entry.answer);
    if (sentences.length < 2 || sentences.length > 4) {
      violations.push({
        order: entry.order,
        problem: 'sentence_count',
        detail: `answer has ${sentences.length} sentences (need 2–4)`,
      });
    }

    if (!entry.answer.trim().endsWith('.')) {
      violations.push({
        order: entry.order,
        problem: 'no_terminal_period',
        detail: 'answer must end with a period',
      });
    }

    const last = normalize(sentences[sentences.length - 1] ?? '');
    if (CTA_MARKERS.some((m) => last.includes(m))) {
      violations.push({
        order: entry.order,
        problem: 'ends_with_cta',
        detail: 'answer ends in a call to action',
      });
    }
  });

  return violations;
}

/** The 10 questions, in order, that the FAQ must contain (FR-052). */
export const REQUIRED_FAQ_QUESTIONS: readonly string[] = [
  'Is this free? What is the catch?',
  'Who actually reads my contract?',
  'What happens to my contract after analysis?',
  'Will my lender find out I checked?',
  'I do not have the original contract anymore. Can I still check?',
  'Is it too late if I took out the loan years ago?',
  'I am still paying this loan. Does that matter?',
  'What happens if the analysis finds nothing?',
  'How is this different from asking a lawyer?',
  'Do I need to take any action after I get the report?',
];
