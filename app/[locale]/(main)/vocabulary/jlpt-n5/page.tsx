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
  return await generatePageMetadata('vocabularyJlptN5', {
    locale,
    pathname: '/vocabulary/jlpt-n5',
  });
}

export default async function VocabularyJlptN5Page({
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
            name: 'Tier 1',
            url: `https://fivebyfive.vercel.app/${locale}/vocabulary/jlpt-n5`,
          },
        ]}
      />
      <CourseSchema
        name='Tier 1 Spelling - Short Words'
        description='Spell short words with NATO code words in the first tier. Quick drills build accurate letter by letter recall.'
        url={`https://fivebyfive.vercel.app/${locale}/vocabulary/jlpt-n5`}
        educationalLevel='Beginner'
        skillLevel='Tier 1'
        learningResourceType='Interactive Course'
      />
      <LearningResourceSchema
        name='Tier 1 Spelling Practice'
        description='Spell words with ICAO code words in tier 1. Use short drills and set review to build accurate recall.'
        url={`https://fivebyfive.vercel.app/${locale}/vocabulary/jlpt-n5`}
        learningResourceType={['Quiz', 'Interactive', 'Game']}
        educationalLevel={['Beginner']}
        teaches='Spelling words with ICAO code words'
        assesses='Spelling accuracy and speed'
        timeRequired='PT20M'
        isAccessibleForFree={true}
        provider={{ name: 'FiveByFive', url: 'https://fivebyfive.vercel.app' }}
        educationalAlignment={{
          alignmentType: 'educationalLevel',
          educationalFramework: 'JLPT',
          targetName: 'N5',
        }}
      />
      <FAQSchema faqs={commonKanaDOJOFAQs} />
      <VocabMenu fixedCollection='n5' hideUnitSelector />
    </>
  );
}

