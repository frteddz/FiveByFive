import { KanjiBlitz } from '@/features/Kanji';
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
  return await generatePageMetadata('kanjiBlitz', {
    locale,
    pathname: '/kanji/blitz',
  });
}

export default function BlitzPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: 'https://fivebyfive.vercel.app' },
          { name: 'Codes', url: 'https://fivebyfive.vercel.app/kanji' },
          { name: 'Blitz', url: 'https://fivebyfive.vercel.app/kanji/blitz' },
        ]}
      />
      <LearningResourceSchema
        name='Codes Blitz Mode'
        description='Race through radio phrase drills against the clock. Build faster recall of common radiotelephony phrases.'
        url='https://fivebyfive.vercel.app/kanji/blitz'
        learningResourceType='Game'
        educationalLevel={['Beginner', 'Intermediate', 'Advanced']}
        teaches='Radio phrases and their meanings'
        assesses='Phrase recall speed and accuracy'
        timeRequired='PT5M'
        isAccessibleForFree={true}
        provider={{ name: 'FiveByFive', url: 'https://fivebyfive.vercel.app' }}
      />
      <KanjiBlitz />
    </>
  );
}

