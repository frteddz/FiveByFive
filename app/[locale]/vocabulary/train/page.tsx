import { VocabularyGame } from '@/features/Vocabulary';
import type { Metadata } from 'next';
import { generatePageMetadata } from '@/core/i18n/metadata-helpers';
import { CourseSchema } from '@/shared/ui-composite/SEO/CourseSchema';
import { BreadcrumbSchema } from '@/shared/ui-composite/SEO/BreadcrumbSchema';
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
  return await generatePageMetadata('vocabularyTrain', {
    locale,
    pathname: '/vocabulary/train',
  });
}

export default function Train() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: 'https://fivebyfive.vercel.app' },
          { name: 'Spelling', url: 'https://fivebyfive.vercel.app/vocabulary' },
          { name: 'Training', url: 'https://fivebyfive.vercel.app/vocabulary/train' },
        ]}
      />
      <CourseSchema
        name='Spelling Training - Code Word Drills'
        description='Spell words with ICAO code words. Short sessions build accurate letter by letter recall.'
        url='https://fivebyfive.vercel.app/vocabulary/train'
        skillLevel='All Levels'
        learningResourceType='Interactive Training'
      />
      <VocabularyGame />
    </>
  );
}

