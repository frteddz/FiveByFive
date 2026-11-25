import Link from 'next/link';
import { routing } from '@/core/i18n/routing';
import { BreadcrumbSchema } from '@/shared/ui-composite/SEO/BreadcrumbSchema';
import { HowToSchema } from '@/shared/ui-composite/SEO/HowToSchema';

export function generateStaticParams() {
  return routing.locales.map(locale => ({ locale }));
}

export const revalidate = 3600;

export async function generateMetadata() {
  return {
    title: 'How to Use FiveByFive - Training Guide',
    description:
      'A short guide to the Letters, Codes and Spelling trainings, the four game modes, and the progress saved in your browser.',
    keywords:
      'FiveByFive guide, NATO alphabet training, ICAO code words, radio phrases, spelling drills',
  };
}

export default async function HowToUsePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: `https://fivebyfive.vercel.app/${locale}` },
          {
            name: 'How to Use',
            url: `https://fivebyfive.vercel.app/${locale}/how-to-use`,
          },
        ]}
      />
      <HowToSchema
        name='How to Train with FiveByFive'
        description='A short guide to the three trainings and the four game modes.'
        totalTime='PT10M'
        estimatedCost='0'
        steps={[
          {
            name: 'Choose a training',
            text: 'Open Letters, Codes or Spelling from the main menu.',
          },
          {
            name: 'Pick a set',
            text: 'Choose a letter group, a radio code tier or a spelling set.',
          },
          {
            name: 'Choose a game mode',
            text: 'Train with Pick, Reverse Pick, Input or Reverse Input.',
          },
          {
            name: 'Review your results',
            text: 'Check accuracy and speed in Progress. Results stay in your browser.',
          },
        ]}
      />
      <div className='mx-auto max-w-4xl px-4 py-8'>
        <h1 className='mb-4 text-center text-4xl font-bold text-(--main-color)'>
          How to Use FiveByFive
        </h1>
        <p className='mb-8 text-center text-lg text-(--secondary-color)'>
          A short guide to the three trainings and four game modes
        </p>

        <div className='space-y-8 text-(--secondary-color)'>
          <section>
            <h2 className='mb-4 text-3xl font-semibold text-(--main-color)'>
              Getting Started
            </h2>
            <p className='mb-4'>
              FiveByFive runs in your browser. No account is needed. Choose a
              training, pick a set and start a drill.
            </p>
            <div className='rounded-lg border-2 border-(--border-color) bg-(--card-color) p-6'>
              <h3 className='mb-3 text-xl font-semibold text-(--main-color)'>
                Quick Start
              </h3>
              <ol className='list-decimal space-y-2 pl-6'>
                <li>
                  Choose your training: <strong>Letters</strong>,{' '}
                  <strong>Codes</strong> or <strong>Spelling</strong>
                </li>
                <li>Select a letter group, radio code tier or spelling set</li>
                <li>Pick a game mode and start training</li>
              </ol>
            </div>
          </section>

          <section>
            <h2 className='mb-4 text-3xl font-semibold text-(--main-color)'>
              Trainings
            </h2>

            <div className='space-y-4'>
              <div className='rounded-lg border-2 border-(--border-color) p-4'>
                <h3 className='mb-2 text-xl font-semibold text-(--main-color)'>
                  Letters
                </h3>
                <p className='mb-2'>
                  Match each letter from A to Z with its ICAO code word.
                </p>
                <ul className='list-disc space-y-1 pl-6'>
                  <li>Full alphabet and letter groups</li>
                  <li>Digits and radio phrase sets</li>
                  <li>Dictionaries for each set</li>
                </ul>
                <p className='mt-2'>
                  <strong>Best for:</strong> learning the code words
                </p>
              </div>

              <div className='rounded-lg border-2 border-(--border-color) p-4'>
                <h3 className='mb-2 text-xl font-semibold text-(--main-color)'>
                  Codes
                </h3>
                <p className='mb-2'>
                  Practice radio phrases across five tiers.
                </p>
                <ul className='list-disc space-y-1 pl-6'>
                  <li>Five tiers of radio codes and phrases</li>
                  <li>Phrase meaning drills</li>
                  <li>Set dictionaries</li>
                </ul>
                <p className='mt-2'>
                  <strong>Best for:</strong> voice procedure practice
                </p>
              </div>

              <div className='rounded-lg border-2 border-(--border-color) p-4'>
                <h3 className='mb-2 text-xl font-semibold text-(--main-color)'>
                  Spelling
                </h3>
                <p className='mb-2'>Spell words using ICAO code words.</p>
                <ul className='list-disc space-y-1 pl-6'>
                  <li>Five tiers of word sets</li>
                  <li>Short and long words</li>
                  <li>Callsign style practice</li>
                </ul>
                <p className='mt-2'>
                  <strong>Best for:</strong> letter by letter recall
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className='mb-4 text-3xl font-semibold text-(--main-color)'>
              Game Modes
            </h2>
            <p className='mb-4'>
              All three trainings share four game modes. Each training also has
              Blitz and Gauntlet pages for timed and progressive sessions.
            </p>

            <div className='space-y-3'>
              <div className='rounded-lg border-2 border-(--border-color) bg-(--card-color) p-4'>
                <h4 className='mb-2 font-semibold text-(--main-color)'>
                  1. Pick
                </h4>
                <p>
                  See a letter, phrase or word and choose the right answer from
                  several options.
                </p>
              </div>

              <div className='rounded-lg border-2 border-(--border-color) bg-(--card-color) p-4'>
                <h4 className='mb-2 font-semibold text-(--main-color)'>
                  2. Reverse Pick
                </h4>
                <p>
                  See the answer first and choose the matching letter, phrase or
                  word.
                </p>
              </div>

              <div className='rounded-lg border-2 border-(--border-color) bg-(--card-color) p-4'>
                <h4 className='mb-2 font-semibold text-(--main-color)'>
                  3. Input
                </h4>
                <p>Type the answer for the item shown on screen.</p>
              </div>

              <div className='rounded-lg border-2 border-(--border-color) bg-(--card-color) p-4'>
                <h4 className='mb-2 font-semibold text-(--main-color)'>
                  4. Reverse Input
                </h4>
                <p>Type the letter, phrase or word for the answer shown.</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className='mb-4 text-3xl font-semibold text-(--main-color)'>
              Progress
            </h2>
            <p className='mb-4'>
              FiveByFive saves results in your browser as you train.
            </p>
            <ul className='list-disc space-y-2 pl-6'>
              <li>
                <strong>Accuracy</strong> by letter, phrase or word
              </li>
              <li>
                <strong>Speed</strong> across sessions
              </li>
              <li>
                <strong>Streaks</strong> and milestones
              </li>
            </ul>
            <p className='mt-4'>
              Open Progress to review the items you miss most. No account is
              needed.
            </p>
          </section>

          <section>
            <h2 className='mb-4 text-3xl font-semibold text-(--main-color)'>
              Preferences
            </h2>
            <p className='mb-4'>
              Preferences lets you change themes, fonts and display settings.
            </p>
            <p className='mt-4'>
              Open Preferences from the menu to adjust your training screen.
            </p>
          </section>

          <section>
            <h2 className='mb-4 text-3xl font-semibold text-(--main-color)'>
              Tips
            </h2>
            <div className='space-y-3'>
              <div className='rounded-lg border-l-4 border-(--main-color) bg-(--card-color) p-4'>
                <p className='font-semibold text-(--main-color)'>
                  Practice often
                </p>
                <p>Short sessions are easier to repeat than long ones.</p>
              </div>
              <div className='rounded-lg border-l-4 border-(--main-color) bg-(--card-color) p-4'>
                <p className='font-semibold text-(--main-color)'>
                  Mix the modes
                </p>
                <p>
                  Use Pick and Input for recognition, then Reverse Pick and
                  Reverse Input for recall.
                </p>
              </div>
              <div className='rounded-lg border-l-4 border-(--main-color) bg-(--card-color) p-4'>
                <p className='font-semibold text-(--main-color)'>
                  Review weak items
                </p>
                <p>
                  Check Progress and focus on the items with lower accuracy.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className='mb-4 text-3xl font-semibold text-(--main-color)'>
              Where to Start
            </h2>
            <div className='space-y-4'>
              <div className='flex items-start gap-4'>
                <div className='flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-(--main-color) text-xl font-bold text-(--background-color)'>
                  1
                </div>
                <div>
                  <h4 className='mb-1 font-semibold text-(--main-color)'>
                    Learning the alphabet
                  </h4>
                  <p>Start with Letters and Pick mode, then move to Input.</p>
                </div>
              </div>
              <div className='flex items-start gap-4'>
                <div className='flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-(--main-color) text-xl font-bold text-(--background-color)'>
                  2
                </div>
                <div>
                  <h4 className='mb-1 font-semibold text-(--main-color)'>
                    Practising radio phrases
                  </h4>
                  <p>Work through the five tiers in Codes.</p>
                </div>
              </div>
              <div className='flex items-start gap-4'>
                <div className='flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-(--main-color) text-xl font-bold text-(--background-color)'>
                  3
                </div>
                <div>
                  <h4 className='mb-1 font-semibold text-(--main-color)'>
                    Spelling full words
                  </h4>
                  <p>Use Spelling once code words feel familiar.</p>
                </div>
              </div>
            </div>
          </section>

          <section>
            <h2 className='mb-4 text-3xl font-semibold text-(--main-color)'>
              Common Questions
            </h2>
            <div className='space-y-4'>
              <div>
                <h4 className='mb-2 font-semibold text-(--main-color)'>
                  Do I need to create an account?
                </h4>
                <p>No. Progress stays in your browser on the device you use.</p>
              </div>
              <div>
                <h4 className='mb-2 font-semibold text-(--main-color)'>
                  Where can I look up a code word or phrase?
                </h4>
                <p>
                  Each training includes set dictionaries. The Resources page
                  groups reference material by category.
                </p>
              </div>
            </div>
          </section>

          <section className='rounded-lg bg-(--main-color) p-8 text-center text-(--background-color)'>
            <h2 className='mb-4 text-3xl font-bold'>Ready to Train?</h2>
            <p className='mb-6 text-lg'>
              Pick a training and start with a short set.
            </p>
            <div className='flex flex-col gap-4 sm:flex-row sm:justify-center'>
              <Link
                href='/kana'
                className='rounded-lg border-2 border-(--background-color) bg-(--background-color) px-6 py-3 font-semibold text-(--main-color) transition-all hover:opacity-90'
              >
                Letters
              </Link>
              <Link
                href='/kanji'
                className='rounded-lg border-2 border-(--background-color) px-6 py-3 font-semibold transition-all hover:bg-(--background-color) hover:text-(--main-color)'
              >
                Codes
              </Link>
              <Link
                href='/vocabulary'
                className='rounded-lg border-2 border-(--background-color) px-6 py-3 font-semibold transition-all hover:bg-(--background-color) hover:text-(--main-color)'
              >
                Spelling
              </Link>
              <Link
                href='/faq'
                className='rounded-lg border-2 border-(--background-color) px-6 py-3 font-semibold transition-all hover:bg-(--background-color) hover:text-(--main-color)'
              >
                View FAQ
              </Link>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
