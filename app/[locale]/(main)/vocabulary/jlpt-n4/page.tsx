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
  return await generatePageMetadata('vocabularyJlptN4', {
    locale,
    pathname: '/vocabulary/jlpt-n4',
  });
}

export default async function VocabularyJlptN4Page({
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
            name: 'Tier 2',
            url: `https://fivebyfive.vercel.app/${locale}/vocabulary/jlpt-n4`,
          },
        ]}
      />
      <CourseSchema
        name='Tier 2 Spelling - Common Words'
        description='Spell common words with code words in the second tier. Improve spelling speed and recognition with short sessions.'
        url={`https://fivebyfive.vercel.app/${locale}/vocabulary/jlpt-n4`}
        educationalLevel='Beginner to Intermediate'
        skillLevel='Tier 2'
        learningResourceType='Interactive Course'
      />
      <LearningResourceSchema
        name='Tier 2 Spelling Practice'
        description='Spell words with ICAO code words in tier 2. Use short drills and set review to build accurate recall.'
        url={`https://fivebyfive.vercel.app/${locale}/vocabulary/jlpt-n4`}
        learningResourceType={['Quiz', 'Interactive', 'Game']}
        educationalLevel={['Beginner to Intermediate']}
        teaches='Spelling words with ICAO code words'
        assesses='Spelling accuracy and speed'
        timeRequired='PT25M'
        isAccessibleForFree={true}
        provider={{ name: 'FiveByFive', url: 'https://fivebyfive.vercel.app' }}
        educationalAlignment={{
          alignmentType: 'educationalLevel',
          educationalFramework: 'JLPT',
          targetName: 'N4',
        }}
      />
      <FAQSchema faqs={commonKanaDOJOFAQs} />
      <VocabMenu fixedCollection='n4' hideUnitSelector />
    </>
  );
}

