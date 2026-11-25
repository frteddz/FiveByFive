/**
 * Content type detection for the three trainings.
 *
 * The ContentType union keeps its upstream names because progress stores and
 * stats panels persist them. Here 'kana' means a letter, 'kanji' means a
 * digit or code word, and 'vocabulary' means a spelled phrase.
 */

import type { ContentType } from '../types/stats';

/** ASCII uppercase A */
export const HIRAGANA_START = 0x41;
/** ASCII uppercase Z */
export const HIRAGANA_END = 0x5a;

/** ASCII 0 */
export const KATAKANA_START = 0x30;
/** ASCII 9 */
export const KATAKANA_END = 0x39;

/** ASCII a */
export const KANJI_START = 0x61;
/** ASCII z */
export const KANJI_END = 0x7a;

/** True for a single letter A to Z. */
export function isHiragana(code: number): boolean {
  return code >= HIRAGANA_START && code <= HIRAGANA_END;
}

/** True for a single digit 0 to 9. */
export function isKatakana(code: number): boolean {
  return code >= KATAKANA_START && code <= KATAKANA_END;
}

/** True for a lowercase letter, which only appears inside code words. */
export function isKanji(code: number): boolean {
  return code >= KANJI_START && code <= KANJI_END;
}

/** True for a letter or digit. */
export function isKana(code: number): boolean {
  return isHiragana(code) || isKatakana(code);
}

/**
 * Classify a prompt for the stats panel.
 *
 * A single uppercase letter is a letter drill, a digit or lowercase letter is
 * a code drill, and anything longer is a spelling drill. Empty input counts
 * as spelling.
 */
export function detectContentType(character: string): ContentType {
  if (!character || character.length > 1) {
    return 'vocabulary';
  }

  const code = character.charCodeAt(0);

  if (isHiragana(code)) {
    return 'kana';
  }

  return 'kanji';
}

/** Filter a list of prompts down to one content type. */
export function filterByContentType(
  characters: string[],
  contentType: ContentType,
): string[] {
  return characters.filter(char => detectContentType(char) === contentType);
}
