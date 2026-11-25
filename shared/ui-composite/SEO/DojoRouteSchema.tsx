import { StructuredData } from '@/shared/ui-composite/SEO/StructuredData';

interface DojoRouteSchemaProps {
  routeKey: 'kana' | 'kanji' | 'vocabulary';
  locale: string;
  title: string;
  description: string;
  canonicalPath: '/kana' | '/kanji' | '/vocabulary';
  teaches: string;
  assesses: string;
  educationalAlignment?: {
    alignmentType: string;
    educationalFramework: string;
    targetName: string;
  };
}

const BASE_URL = 'https://fivebyfive.vercel.app';

function withLocalePath(locale: string, path: string) {
  return `${BASE_URL}/${locale}${path}`;
}

function getRouteName(routeKey: DojoRouteSchemaProps['routeKey']) {
  if (routeKey === 'kana') return 'Letters';
  if (routeKey === 'kanji') return 'Codes';
  return 'Spelling';
}

function getRouteAliases(routeKey: DojoRouteSchemaProps['routeKey']) {
  if (routeKey === 'kana') {
    return ['NATO phonetic alphabet', 'letter code words', 'ICAO letters'];
  }
  if (routeKey === 'kanji') {
    return ['radio phrases', 'radiotelephony codes', 'radio code practice'];
  }
  return ['callsign spelling', 'spell with code words', 'word spelling practice'];
}

export function DojoRouteSchema({
  routeKey,
  locale,
  title,
  description,
  canonicalPath,
  teaches,
  assesses,
  educationalAlignment,
}: DojoRouteSchemaProps) {
  const pageUrl = `${BASE_URL}${canonicalPath}`;
  const routeName = getRouteName(routeKey);
  const appRouteUrl = withLocalePath(locale, canonicalPath);

  const graph: Array<Record<string, unknown>> = [
    {
      '@type': 'WebPage',
      '@id': `${pageUrl}#webpage`,
      url: pageUrl,
      name: title,
      description,
      inLanguage: locale,
      isPartOf: { '@id': `${BASE_URL}/#website` },
      about: [
        {
          '@type': 'Thing',
          name: routeName,
        },
        ...getRouteAliases(routeKey).map(alias => ({
          '@type': 'Thing',
          name: alias,
        })),
      ],
    },
    {
      '@type': 'SoftwareApplication',
      '@id': `${pageUrl}#software`,
      name: `FiveByFive ${routeName} Practice`,
      applicationCategory: 'EducationalApplication',
      operatingSystem: 'Web',
      url: appRouteUrl,
      isAccessibleForFree: true,
      inLanguage: locale,
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD',
      },
      featureList: [
        `Interactive ${routeName.toLowerCase()} training`,
        'Instant feedback and progress tracking',
        'Blitz and gauntlet practice modes',
        'No signup required',
      ],
    },
    {
      '@type': 'LearningResource',
      '@id': `${pageUrl}#learning-resource`,
      name: `${routeName} Training Resource`,
      description,
      url: appRouteUrl,
      learningResourceType: ['Interactive', 'Quiz', 'Game'],
      isAccessibleForFree: true,
      inLanguage: locale,
      teaches,
      assesses,
      provider: {
        '@type': 'Organization',
        '@id': `${BASE_URL}/#organization`,
        name: 'FiveByFive',
        url: BASE_URL,
      },
      ...(educationalAlignment
        ? {
            educationalAlignment: {
              '@type': 'AlignmentObject',
              ...educationalAlignment,
            },
          }
        : {}),
    },
  ];

  return <StructuredData data={{ '@context': 'https://schema.org', '@graph': graph }} />;
}


