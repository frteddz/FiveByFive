import { VocabBlitz } from '@/features/Vocabulary';
import type { Metadata } from 'next';
import { generatePageMetadata } from '@/core/i18n/metadata-helpers';
import { routing } from '@/core/i18n/routing';
import { LearningResourceSchema } from '@/shared/ui-composite/SEO/LearningResourceSchema';
import { BreadcrumbSchema } from '@/shared/ui-composite/SEO/BreadcrumbSchema';

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
  return await generatePageMetadata('vocabularyBlitz', {
    locale,
    pathname: '/vocabulary/blitz',
  });
}

export default function BlitzPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: 'https://fivebyfive.vercel.app' },
          { name: 'Spelling', url: 'https://fivebyfive.vercel.app/vocabulary' },
          { name: 'Blitz', url: 'https://fivebyfive.vercel.app/vocabulary/blitz' },
        ]}
      />
      <LearningResourceSchema
        name='Spelling Blitz Mode'
        description='Race through spelling drills against the clock. Build fast and accurate code word spelling.'
        url='https://fivebyfive.vercel.app/vocabulary/blitz'
        learningResourceType='Game'
        educationalLevel={['Beginner', 'Intermediate', 'Advanced']}
        teaches='Spelling words with ICAO code words'
        assesses='Spelling speed and accuracy'
        timeRequired='PT5M'
        isAccessibleForFree={true}
        provider={{ name: 'FiveByFive', url: 'https://fivebyfive.vercel.app' }}
      />
      <VocabBlitz />
    </>
  );
}

