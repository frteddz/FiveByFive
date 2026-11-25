import { VocabGauntlet } from '@/features/Vocabulary';
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
  return await generatePageMetadata('vocabularyGauntlet', {
    locale,
    pathname: '/vocabulary/gauntlet',
  });
}

export default function GauntletPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: 'https://fivebyfive.vercel.app' },
          { name: 'Spelling', url: 'https://fivebyfive.vercel.app/vocabulary' },
          { name: 'Gauntlet', url: 'https://fivebyfive.vercel.app/vocabulary/gauntlet' },
        ]}
      />
      <LearningResourceSchema
        name='Spelling Gauntlet Mode'
        description='Spell every word in the trainer with code words. Check coverage across all five tiers.'
        url='https://fivebyfive.vercel.app/vocabulary/gauntlet'
        learningResourceType='Assessment'
        educationalLevel={['Beginner', 'Intermediate', 'Advanced']}
        teaches='Word spelling with NATO code words'
        assesses='Spelling recall across five tiers'
        timeRequired='PT20M'
        isAccessibleForFree={true}
        provider={{ name: 'FiveByFive', url: 'https://fivebyfive.vercel.app' }}
      />
      <VocabGauntlet />
    </>
  );
}

