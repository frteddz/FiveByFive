import Script from 'next/script';

interface StructuredDataProps {
  // Accept schema-dts types and other JSON-LD shapes without forcing index signatures.
  data: unknown;
}

export function StructuredData({ data }: StructuredDataProps) {
  return (
    <Script
      id='structured-data'
      type='application/ld+json'
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

// Comprehensive Schema Graph for FiveByFive
export const fiveByFiveSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': 'https://fivebyfive.vercel.app/#organization',
      name: 'FiveByFive',
      url: 'https://fivebyfive.vercel.app',
      logo: 'https://fivebyfive.vercel.app/favicon.ico',
      description:
        'A free trainer for the NATO and ICAO phonetic alphabet',
      sameAs: ['https://github.com/frteddz/FiveByFive'],
      contactPoint: {
        '@type': 'ContactPoint',
        url: 'https://github.com/frteddz/FiveByFive/issues',
        contactType: 'Bug reports',
      },
    },
    {
      '@type': 'WebSite',
      '@id': 'https://fivebyfive.vercel.app/#website',
      url: 'https://fivebyfive.vercel.app',
      name: 'FiveByFive',
      description:
        'Learn the NATO phonetic alphabet with FiveByFive - letter drills, radio phrases and callsign spelling',
      publisher: { '@id': 'https://fivebyfive.vercel.app/#organization' },
      inLanguage: ['en', 'es'],
      potentialAction: {
        '@type': 'SearchAction',
        target: {
          '@type': 'EntryPoint',
          urlTemplate: 'https://fivebyfive.vercel.app/?q={search_term_string}',
        },
        'query-input': 'required name=search_term_string',
      },
    },
    {
      '@type': 'WebApplication',
      '@id': 'https://fivebyfive.vercel.app/#webapp',
      name: 'FiveByFive',
      alternateName: 'Five by five',
      url: 'https://fivebyfive.vercel.app',
      applicationCategory: 'EducationalApplication',
      applicationSubCategory: 'Radio phrase training',
      operatingSystem: 'Any',
      browserRequirements:
        'Requires JavaScript. Works with Chrome, Firefox, Safari, Edge.',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD',
        availability: 'https://schema.org/InStock',
      },
      description:
        'Interactive NATO phonetic alphabet trainer with letter drills, radio phrases and callsign spelling practice',
      featureList: [
        'Learn the ICAO code word for every letter from A to Z',
        'Practice digits and radio phrases across five tiers',
        'Spell words using code words',
        'Pick, reverse pick, input and reverse input modes',
        'Blitz and Gauntlet challenges',
        'Instant feedback and progress tracking',
        'Customizable themes',
        'No account required',
        'Progress saved locally in the browser',
      ],
      author: {
        '@type': 'Organization',
        name: 'frteddz',
      },
      creator: {
        '@type': 'Organization',
        name: 'frteddz',
      },
      inLanguage: ['en', 'es'],
      availableLanguage: ['English', 'Spanish'],
      isAccessibleForFree: true,
      audience: {
        '@type': 'EducationalAudience',
        educationalRole: 'Student',
      },
    },
    {
      '@type': 'EducationalOrganization',
      '@id': 'https://fivebyfive.vercel.app/#educational',
      name: 'FiveByFive',
      url: 'https://fivebyfive.vercel.app',
      description: 'Interactive NATO phonetic alphabet training platform',
      educationalCredentialAwarded: 'Letters, codes and spelling practice',
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Phonetic alphabet training',
        itemListElement: [
          {
            '@type': 'Course',
            name: 'Letters A to Z',
            description: 'Match every letter with its ICAO code word',
            provider: {
              '@type': 'Organization',
              name: 'FiveByFive',
            },
          },
          {
            '@type': 'Course',
            name: 'Radio codes and phrases',
            description: 'Practice radiotelephony phrases across five tiers',
            provider: {
              '@type': 'Organization',
              name: 'FiveByFive',
            },
          },
          {
            '@type': 'Course',
            name: 'Callsign spelling',
            description: 'Spell whole words using NATO code words',
            provider: {
              '@type': 'Organization',
              name: 'FiveByFive',
            },
          },
        ],
      },
    },
    {
      '@type': 'FAQPage',
      '@id': 'https://fivebyfive.vercel.app/#faq',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'What is FiveByFive?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'FiveByFive is a free trainer for the NATO phonetic alphabet. It teaches the ICAO code word for every letter, radio phrases used in voice communication, and spelling words with code words.',
          },
        },
        {
          '@type': 'Question',
          name: 'Is FiveByFive completely free?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes. FiveByFive is free to use with no account required. All training modes and content are available at no charge.',
          },
        },
        {
          '@type': 'Question',
          name: 'What can I practice on FiveByFive?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'You can practice letters A to Z, digits and radio phrases in the Letters and Codes trainings, and spell full words in the Spelling training. Each training shares the same four modes.',
          },
        },
        {
          '@type': 'Question',
          name: 'Do I need to create an account?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'No account is required. Your progress and preferences are saved locally in your browser as you train.',
          },
        },
        {
          '@type': 'Question',
          name: 'What are the training modes?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'FiveByFive offers pick mode (choose the code word), reverse pick (choose the letter or word), input mode (type the code word) and reverse input (type the letter or word). Blitz and Gauntlet add timed and full-set challenges.',
          },
        },
        {
          '@type': 'Question',
          name: 'How does progress tracking work?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'FiveByFive records correct answers, speed, accuracy and mastery by item. The statistics pages show that progress in charts. Data stays in your browser.',
          },
        },
        {
          '@type': 'Question',
          name: 'Can I use FiveByFive on mobile devices?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes. The interface adapts to phones, tablets and desktop screens.',
          },
        },
        {
          '@type': 'Question',
          name: 'Who maintains FiveByFive?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'FiveByFive is maintained by frteddz as a fork of the kana-dojo engine. The source is available on GitHub at github.com/frteddz/FiveByFive.',
          },
        },
      ],
    },
  ],
};

// Kept so the existing SEO barrel export continues to resolve.
export const kanaDojoSchema = fiveByFiveSchema;
