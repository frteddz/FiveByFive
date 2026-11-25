import type { Metadata } from 'next';
import { CircleHelp } from 'lucide-react';
import { routing } from '@/core/i18n/routing';
import LegalLayout from '@/shared/ui-composite/layout/LegalLayout';

export function generateStaticParams() {
  return routing.locales.map(locale => ({ locale }));
}

export const revalidate = 3600;

export async function generateMetadata(): Promise<Metadata> {
  const title = 'About FiveByFive | NATO Phonetic Alphabet Trainer';
  const description =
    'FiveByFive is a free trainer for the NATO and ICAO phonetic alphabet. Learn code words, radio phrases and spelling with typing drills.';

  return {
    title,
    description,
    keywords: [
      'NATO phonetic alphabet',
      'ICAO code words',
      'radio phrase trainer',
      'callsign spelling practice',
    ],
    alternates: {
      canonical: 'https://fivebyfive.vercel.app/about',
    },
    openGraph: {
      title,
      description,
      url: 'https://fivebyfive.vercel.app/about',
      type: 'website',
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default function AboutPage() {
  return (
    <LegalLayout
      icon={<CircleHelp className='size-6' />}
      title='About FiveByFive'
      lastUpdated='November 25, 2026'
    >
      <p className='mb-8 text-xl text-(--secondary-color)'>
        A free trainer for the alphabet pilots, controllers and radio operators use.
      </p>

      <h2 className='mb-4 text-2xl font-semibold text-(--main-color)'>
        Why it exists
      </h2>
      <p className='mb-8 text-lg leading-relaxed text-(--secondary-color)'>
        Saying B over a bad radio link is a gamble. Saying Bravo is not. FiveByFive
        drills the code words until they stick, using short sessions and instant
        feedback instead of a chart you have to memorise by staring at it.
      </p>

      <h2 className='mb-6 text-2xl font-semibold text-(--main-color)'>
        Three trainings
      </h2>
      <div className='mb-12 space-y-4'>
        <div>
          <h3 className='mb-2 text-xl font-semibold text-(--main-color)'>
            Letters
          </h3>
          <p className='text-(--secondary-color)'>
            Match every letter A to Z with its code word, in both directions.
          </p>
          <hr className='mt-4 border-(--border-color) opacity-50' />
        </div>
        <div>
          <h3 className='mb-2 text-xl font-semibold text-(--main-color)'>
            Codes
          </h3>
          <p className='text-(--secondary-color)'>
            Radio phrases such as roger, wilco, over and mayday, split across five
            levels from everyday calls to advanced phraseology.
          </p>
          <hr className='mt-4 border-(--border-color) opacity-50' />
        </div>
        <div>
          <h3 className='mb-2 text-xl font-semibold text-(--main-color)'>
            Spelling
          </h3>
          <p className='text-(--secondary-color)'>
            Spell whole words with code words, from short words to the ones that
            always trip people up.
          </p>
          <hr className='mt-4 border-(--border-color) opacity-50' />
        </div>
      </div>

      <h2 className='mb-4 text-2xl font-semibold text-(--main-color)'>
        Where it came from
      </h2>
      <p className='mb-8 text-lg leading-relaxed text-(--secondary-color)'>
        FiveByFive is a fork of lingdojo/kana-dojo. The training engine, themes
        and progress tracking are upstream work. The content is new. The source
        is AGPL 3.0 and available on GitHub.
      </p>
    </LegalLayout>
  );
}
