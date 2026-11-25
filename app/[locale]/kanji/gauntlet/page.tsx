import { KanjiGauntlet } from '@/features/Kanji';
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
  return await generatePageMetadata('kanjiGauntlet', {
    locale,
    pathname: '/kanji/gauntlet',
  });
}

export default function GauntletPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: 'https://fivebyfive.vercel.app' },
          { name: 'Codes', url: 'https://fivebyfive.vercel.app/kanji' },
          { name: 'Gauntlet', url: 'https://fivebyfive.vercel.app/kanji/gauntlet' },
        ]}
      />
      <LearningResourceSchema
        name='Codes Gauntlet Mode'
        description='Work through every radio phrase in the trainer. Check recall across all five tiers.'
        url='https://fivebyfive.vercel.app/kanji/gauntlet'
        learningResourceType='Assessment'
        educationalLevel={['Beginner', 'Intermediate', 'Advanced']}
        teaches='All radio phrases in the trainer'
        assesses='Phrase recall across five tiers'
        timeRequired='PT20M'
        isAccessibleForFree={true}
        provider={{ name: 'FiveByFive', url: 'https://fivebyfive.vercel.app' }}
      />
      <KanjiGauntlet />
    </>
  );
}

