/**
 * Shared text utilities for the content-lint suite.
 * Romanian copy uses ș/ț (comma-below) diacritics; matching is diacritic- and
 * case-insensitive so banned phrases cannot slip through via accents or casing.
 */

/** Lowercase and strip diacritics for robust phrase matching. */
export function normalize(text: string): string {
  return text
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '') // combining marks (incl. comma-below)
    .replace(/[ăâ]/giu, 'a')
    .replace(/[î]/giu, 'i')
    .replace(/[șş]/giu, 's')
    .replace(/[țţ]/giu, 't')
    .toLowerCase();
}

/**
 * Split prose into sentences. Treats . ! ? as terminators. Abbreviations are
 * rare in this copy (B1 reading level, idioms removed), so a simple splitter is
 * adequate for the FAQ 2–4-sentence rule.
 */
export function splitSentences(text: string): string[] {
  return text
    .trim()
    .split(/(?<=[.!?])\s+/u)
    .map((s) => s.trim())
    .filter((s) => s.length > 0);
}

export function countWords(text: string): number {
  const matched = text.trim().match(/[\p{L}\p{N}’'-]+/gu);
  return matched ? matched.length : 0;
}
