import type { Metadata } from 'next';
import { ExternalLink, Sparkle } from 'lucide-react';
import { routing } from '@/core/i18n/routing';
import LegalLayout from '@/shared/ui-composite/layout/LegalLayout';

export function generateStaticParams() {
  return routing.locales.map(locale => ({ locale }));
}

export const revalidate = 3600;

export async function generateMetadata(): Promise<Metadata> {
  const title = 'Credits & Sources | FiveByFive';
  const description =
    'FiveByFive is built on the ICAO spelling alphabet and the open-source kana-dojo engine.';

  return {
    title,
    description,
    keywords: [
      'ICAO spelling alphabet',
      'NATO alphabet source',
      'open source radio trainer',
    ],
    alternates: {
      canonical: 'https://fivebyfive.vercel.app/credits',
    },
    openGraph: {
      title,
      description,
      url: 'https://fivebyfive.vercel.app/credits',
      type: 'website',
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

const sources = [
  {
    name: 'ICAO spelling alphabet',
    description:
      'The international standard for spelling letters over radiotelephony. The code words and pronunciation in this app follow it.',
    url: 'https://www.icao.int/',
    license: 'International standard',
  },
  {
    name: 'lingdojo/kana-dojo',
    description:
      'The upstream project. The training engine, game modes, themes and progress tracking all came from here.',
    url: 'https://github.com/lingdojo/kana-dojo',
    license: 'AGPL-3.0',
  },
  {
    name: 'SQL.js',
    description:
      'SQLite compiled to JavaScript, used by the Anki deck converter in the browser.',
    url: 'https://github.com/sql-js/sql.js',
    license: 'MIT',
  },
];

const technologies = [
  {
    name: 'Next.js',
    description: 'React framework',
    url: 'https://nextjs.org',
  },
  {
    name: 'TypeScript',
    description: 'Typed JavaScript',
    url: 'https://www.typescriptlang.org',
  },
  {
    name: 'Tailwind CSS',
    description: 'Utility-first CSS',
    url: 'https://tailwindcss.com',
  },
  {
    name: 'Zustand',
    description: 'State management',
    url: 'https://github.com/pmndrs/zustand',
  },
  {
    name: 'Vercel',
    description: 'Hosting',
    url: 'https://vercel.com',
  },
];

export default function CreditsPage() {
  return (
    <LegalLayout
      icon={<Sparkle className='size-6' />}
      title='Credits & Sources'
      lastUpdated='November 25, 2026'
    >
      <p className='mb-8 text-lg text-(--secondary-color)'>
        This app stands on an international standard and a lot of upstream work.
      </p>

      <h2 className='mb-6 text-2xl font-semibold text-(--main-color)'>
        Sources
      </h2>
      <div className='mb-12 space-y-6'>
        {sources.map(source => (
          <div key={source.name}>
            <div className='mb-2 flex items-start justify-between'>
              <h3 className='text-xl font-semibold text-(--main-color)'>
                {source.name}
              </h3>
              <a
                href={source.url}
                target='_blank'
                rel='noopener noreferrer'
                className='inline-flex items-center gap-1 text-sm text-(--main-color) hover:underline'
                aria-label={`Visit ${source.name} website`}
              >
                Visit <ExternalLink className='h-4 w-4' />
              </a>
            </div>
            <p className='mb-3 text-(--secondary-color)'>{source.description}</p>
            <div className='text-sm text-(--secondary-color)/80'>
              <strong>License:</strong> {source.license}
            </div>
            <hr className='mt-6 border-(--border-color) opacity-50' />
          </div>
        ))}
      </div>

      <h2 className='mb-6 text-2xl font-semibold text-(--main-color)'>
        Technologies
      </h2>
      <div className='mb-12 space-y-4'>
        {technologies.map(tech => (
          <div key={tech.name}>
            <h3 className='mb-2 font-semibold text-(--main-color)'>
              {tech.name}
            </h3>
            <p className='mb-2 text-sm text-(--secondary-color)'>
              {tech.description}
            </p>
            <a
              href={tech.url}
              target='_blank'
              rel='noopener noreferrer'
              className='inline-flex items-center gap-1 text-sm text-(--main-color) hover:underline'
            >
              Learn more <ExternalLink className='h-3 w-3' />
            </a>
            <hr className='mt-4 border-(--border-color) opacity-50' />
          </div>
        ))}
      </div>

      <h2 className='mb-4 text-2xl font-semibold text-(--main-color)'>
        Thanks
      </h2>
      <div className='mb-12 space-y-4 text-(--secondary-color)'>
        <p>
          Thanks to the maintainers of kana-dojo for building a trainer worth
          reusing, and to everyone who has ever tried to spell a callsign over a
          noisy radio.
        </p>
      </div>
    </LegalLayout>
  );
}
