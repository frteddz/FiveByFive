import { KanaBlitz } from '@/features/Kana';
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
  return await generatePageMetadata('kanaBlitz', {
    locale,
    pathname: '/kana/blitz',
  });
}

export default function BlitzPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: 'https://fivebyfive.vercel.app' },
          { name: 'Letters', url: 'https://fivebyfive.vercel.app/kana' },
          { name: 'Blitz', url: 'https://fivebyfive.vercel.app/kana/blitz' },
        ]}
      />
      <LearningResourceSchema
        name='Letters Blitz Mode'
        description='Race through letter to code word drills against the clock. Build fast recall for the NATO alphabet.'
        url='https://fivebyfive.vercel.app/kana/blitz'
        learningResourceType='Game'
        educationalLevel={['Beginner', 'Intermediate']}
        teaches='NATO letters and their code words'
        assesses='Letter to code word speed and accuracy'
        timeRequired='PT5M'
        isAccessibleForFree={true}
        provider={{ name: 'FiveByFive', url: 'https://fivebyfive.vercel.app' }}
      />
      <KanaBlitz />
    </>
  );
}

