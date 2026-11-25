import { KanaGauntlet } from '@/features/Kana';
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
  return await generatePageMetadata('kanaGauntlet', {
    locale,
    pathname: '/kana/gauntlet',
  });
}

export default function GauntletPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: 'https://fivebyfive.vercel.app' },
          { name: 'Letters', url: 'https://fivebyfive.vercel.app/kana' },
          { name: 'Gauntlet', url: 'https://fivebyfive.vercel.app/kana/gauntlet' },
        ]}
      />
      <LearningResourceSchema
        name='Letters Gauntlet Mode'
        description='Work through the full A to Z letter set in one session. Check recall for every NATO code word.'
        url='https://fivebyfive.vercel.app/kana/gauntlet'
        learningResourceType='Assessment'
        educationalLevel={['Beginner', 'Intermediate']}
        teaches='All 26 NATO code words'
        assesses='Letter recall across the full alphabet'
        timeRequired='PT15M'
        isAccessibleForFree={true}
        provider={{ name: 'FiveByFive', url: 'https://fivebyfive.vercel.app' }}
      />
      <KanaGauntlet />
    </>
  );
}

