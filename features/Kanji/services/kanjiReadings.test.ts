import { describe, expect, it } from 'vitest';
import n1Kanji from '@/public/data-kanji/N1.json';
import n2Kanji from '@/public/data-kanji/N2.json';
import n3Kanji from '@/public/data-kanji/N3.json';
import n4Kanji from '@/public/data-kanji/N4.json';
import n5Kanji from '@/public/data-kanji/N5.json';
import type { IKanjiObj } from '@/entities/kanji';

const kanjiByLevel = {
  n1: n1Kanji,
  n2: n2Kanji,
  n3: n3Kanji,
  n4: n4Kanji,
  n5: n5Kanji,
} satisfies Record<string, IKanjiObj[]>;

describe('kanji readings data', () => {
  it('includes the short answer and definition of the roger phrase', () => {
    const roger = n5Kanji.find(card => card.kanjiChar === 'roger');

    expect(roger?.onyomi).toContain('roger');
    expect(roger?.kunyomi).toContain('message received');
    expect(roger?.meanings[0]).toBe('I have received your last message');
  });

  it('includes the short answer and definition of the mayday phrase', () => {
    const mayday = n3Kanji.find(
      card => card.kanjiChar === 'mayday mayday mayday',
    );

    expect(mayday?.kunyomi).toContain('distress call');
    expect(mayday?.meanings[0]).toBe(
      'Repeated distress call for a life threatening emergency',
    );
  });

  it('keeps alternate readings as separate array entries', () => {
    const combinedReadings = Object.entries(kanjiByLevel).flatMap(
      ([level, cards]) =>
        cards.flatMap(card =>
          [...card.onyomi, ...card.kunyomi]
            .filter(reading => reading.includes(','))
            .map(reading => `${level} ${card.kanjiChar}: ${reading}`),
        ),
    );

    expect(combinedReadings).toEqual([]);
  });
});
