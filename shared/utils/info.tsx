// import { Link } from '@/i18n/routing';

// Updated to receive translations as a parameter instead of using hook
export default function translationGen(t: (key: string) => string) {
  const info = {
    '/': {
      header: (
        <p className='flex flex-1 items-center gap-2 overflow-hidden'>
          {/* render localized content */}
          <span>{t('greeting')}</span>
          <i className='mt-1.5 text-xs text-(--secondary-color) max-md:hidden'>
            {/* v0.1.5 (alpha) */}
          </i>
        </p>
      ),
      content: (
        <>
          <p className='text-lg text-(--secondary-color)'>{t('description')}</p>
          <p className='text-lg text-(--secondary-color)'>
            {t('instructions')}
          </p>
        </>
      ),
    },
    '/kana': {
      header: <span>Welcome to the Letters training!</span>,
      content: (
        <>
          <p className='text-lg text-(--secondary-color)'>
            Here you can match every letter from A to Z with its ICAO code
            word, and practice digits and radio phrases.
          </p>
          <p className='text-lg text-(--secondary-color)'>
            To begin, select at least 1 group, choose a training mode, then hit{' '}
            <b>Go!</b> below and start drilling now!
          </p>
        </>
      ),
    },
    '/kanji': {
      header: <span>Welcome to the Codes training!</span>,
      content: (
        <>
          <p className='text-lg text-(--secondary-color)'>
            Here you can practice radio phrases and call signs across five
            tiers, from common replies to procedure words.
          </p>
          <p className='text-lg text-(--secondary-color)'>
            To begin, select at least 1 tier, choose a training mode, then hit{' '}
            <b>Go!</b> below and start drilling!
          </p>
        </>
      ),
    },
    '/vocabulary': {
      header: <span>Welcome to the Spelling training!</span>,
      content: (
        <>
          <p className='text-lg text-(--secondary-color)'>
            Here you can spell words with ICAO code words, one letter at a
            time.
          </p>
          <p className='text-lg text-(--secondary-color)'>
            To begin, select at least 1 tier, choose a training mode, then hit{' '}
            <b>Go!</b> below and start drilling!
          </p>
        </>
      ),
    },

    jlptMenu: {
      header: <span>About the training tiers</span>,
      content: (
        <p className='text-lg text-(--secondary-color)'>
          Codes and Spelling are split into five tiers. Tier 1 holds the most
          common items and Tier 5 holds the most demanding ones. Each tier is a
          set you can finish in a short session, so you can work on one group
          without seeing everything at once.
        </p>
      ),
    },
    groupMenu: {
      header: <span>About the NATO phonetic alphabet</span>,
      content: (
        <p className='text-lg text-(--secondary-color)'>
          The NATO phonetic alphabet gives every letter a fixed code word.
          Alfa stands for A, Bravo for B, Charlie for C, and so on through
          Zulu for Z. Digits have their own words too, such as Niner for nine.
          <br />
          The purpose is clarity over voice links. Letters such as B and D, or
          M and N, sound alike in noisy conditions. Saying Bravo or Mike removes
          the guesswork. FiveByFive uses these code words in letter drills,
          radio phrase practice and spelling exercises.
        </p>
      ),
    },
    wordClassMenu: {
      header: <span>About word groups</span>,
      content: (
        <p className='text-lg text-(--secondary-color)'>
          Spelling sets group words by length and use. Short words build
          confidence with the code word for each letter. Longer words and
          callsigns train you to keep the sequence in order. Radio phrases are
          grouped separately because you learn their meaning rather than spell
          them letter by letter.
        </p>
      ),
    },
  };

  return info;
}

