import { VocabMenu } from '@/widgets';
import type { Metadata } from 'next';
import { generatePageMetadata } from '@/core/i18n/metadata-helpers';
import { CourseSchema } from '@/shared/ui-composite/SEO/CourseSchema';
import { BreadcrumbSchema } from '@/shared/ui-composite/SEO/BreadcrumbSchema';
import {
  FAQSchema,
  commonKanaDOJOFAQs,
} from '@/shared/ui-composite/SEO/FAQSchema';
import { LearningResourceSchema } from '@/shared/ui-composite/SEO/LearningResourceSchema';
import { routing } from '@/core/i18n/routing';

export function generateStaticParams() {
  return routing.locales.map(locale => ({ locale }));
}

export const revalidate = 3600;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return await generatePageMetadata('vocabularyJlptN2', {
    locale,
    pathname: '/vocabulary/jlpt-n2',
  });
}

export default async function VocabularyJlptN2Page({
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
            name: 'Spelling',
            url: `https://fivebyfive.vercel.app/${locale}/vocabulary`,
          },
          {
            name: 'Tier 4',
            url: `https://fivebyfive.vercel.app/${locale}/vocabulary/jlpt-n2`,
          },
        ]}
      />
      <CourseSchema
        name='Tier 4 Spelling - Callsigns'
        description='Spell callsign style words with code words in the fourth tier. Build speed on multi letter sequences.'
        url={`https://fivebyfive.vercel.app/${locale}/vocabulary/jlpt-n2`}
        educationalLevel='Upper Intermediate'
        skillLevel='Tier 4'
        learningResourceType='Interactive Course'
      />
      <LearningResourceSchema
        name='Tier 4 Spelling Practice'
        description='Spell words with ICAO code words in tier 4. Use short drills and set review to build accurate recall.'
        url={`https://fivebyfive.vercel.app/${locale}/vocabulary/jlpt-n2`}
        learningResourceType={['Quiz', 'Interactive', 'Game']}
        educationalLevel={['Upper Intermediate']}
        teaches='Spelling words with ICAO code words'
        assesses='Spelling accuracy and speed'
        timeRequired='PT35M'
        isAccessibleForFree={true}
        provider={{ name: 'FiveByFive', url: 'https://fivebyfive.vercel.app' }}
        educationalAlignment={{
          alignmentType: 'educationalLevel',
          educationalFramework: 'JLPT',
          targetName: 'N2',
        }}
      />
      <FAQSchema faqs={commonKanaDOJOFAQs} />
      <VocabMenu fixedCollection='n2' hideUnitSelector />
    </>
  );
}

