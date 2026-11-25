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
  return await generatePageMetadata('vocabularyJlptN3', {
    locale,
    pathname: '/vocabulary/jlpt-n3',
  });
}

export default async function VocabularyJlptN3Page({
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
            name: 'Tier 3',
            url: `https://fivebyfive.vercel.app/${locale}/vocabulary/jlpt-n3`,
          },
        ]}
      />
      <CourseSchema
        name='Tier 3 Spelling - Longer Words'
        description='Spell longer words with code words in the third tier. Focused sets help you keep letters in the right order.'
        url={`https://fivebyfive.vercel.app/${locale}/vocabulary/jlpt-n3`}
        educationalLevel='Intermediate'
        skillLevel='Tier 3'
        learningResourceType='Interactive Course'
      />
      <LearningResourceSchema
        name='Tier 3 Spelling Practice'
        description='Spell words with ICAO code words in tier 3. Use short drills and set review to build accurate recall.'
        url={`https://fivebyfive.vercel.app/${locale}/vocabulary/jlpt-n3`}
        learningResourceType={['Quiz', 'Interactive', 'Game']}
        educationalLevel={['Intermediate']}
        teaches='Spelling words with ICAO code words'
        assesses='Spelling accuracy and speed'
        timeRequired='PT30M'
        isAccessibleForFree={true}
        provider={{ name: 'FiveByFive', url: 'https://fivebyfive.vercel.app' }}
        educationalAlignment={{
          alignmentType: 'educationalLevel',
          educationalFramework: 'JLPT',
          targetName: 'N3',
        }}
      />
      <FAQSchema faqs={commonKanaDOJOFAQs} />
      <VocabMenu fixedCollection='n3' hideUnitSelector />
    </>
  );
}

