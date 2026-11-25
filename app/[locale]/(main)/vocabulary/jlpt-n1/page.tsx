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
  return await generatePageMetadata('vocabularyJlptN1', {
    locale,
    pathname: '/vocabulary/jlpt-n1',
  });
}

export default async function VocabularyJlptN1Page({
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
            name: 'Tier 5',
            url: `https://fivebyfive.vercel.app/${locale}/vocabulary/jlpt-n1`,
          },
        ]}
      />
      <CourseSchema
        name='Tier 5 Spelling - Full Word Mastery'
        description='Master the most demanding spelling sets in the fifth tier. Practice complete words with code words and review weak items.'
        url={`https://fivebyfive.vercel.app/${locale}/vocabulary/jlpt-n1`}
        educationalLevel='Advanced'
        skillLevel='Tier 5'
        learningResourceType='Interactive Course'
      />
      <LearningResourceSchema
        name='Tier 5 Spelling Practice'
        description='Spell words with ICAO code words in tier 5. Use short drills and set review to build accurate recall.'
        url={`https://fivebyfive.vercel.app/${locale}/vocabulary/jlpt-n1`}
        learningResourceType={['Quiz', 'Interactive', 'Game']}
        educationalLevel={['Advanced']}
        teaches='Spelling words with ICAO code words'
        assesses='Spelling accuracy and speed'
        timeRequired='PT40M'
        isAccessibleForFree={true}
        provider={{ name: 'FiveByFive', url: 'https://fivebyfive.vercel.app' }}
        educationalAlignment={{
          alignmentType: 'educationalLevel',
          educationalFramework: 'JLPT',
          targetName: 'N1',
        }}
      />
      <FAQSchema faqs={commonKanaDOJOFAQs} />
      <VocabMenu fixedCollection='n1' hideUnitSelector />
    </>
  );
}

