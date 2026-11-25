import { KanjiMenu } from '@/widgets';
import type { Metadata } from 'next';
import { generatePageMetadata } from '@/core/i18n/metadata-helpers';
import { CourseSchema } from '@/shared/ui-composite/SEO/CourseSchema';
import { BreadcrumbSchema } from '@/shared/ui-composite/SEO/BreadcrumbSchema';
import { FAQSchema, kanjiFAQs } from '@/shared/ui-composite/SEO/FAQSchema';
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
  return await generatePageMetadata('kanjiJlptN1', {
    locale,
    pathname: '/kanji/jlpt-n1',
  });
}

export default async function KanjiJlptN1Page({
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
          { name: 'Codes', url: `https://fivebyfive.vercel.app/${locale}/kanji` },
          {
            name: 'Tier 5',
            url: `https://fivebyfive.vercel.app/${locale}/kanji/jlpt-n1`,
          },
        ]}
      />
      <CourseSchema
        name='Tier 5 Radio Codes - Practice and Meaning'
        description='Study tier 5 radio codes with interactive drills and set-based practice. Improve phrase recognition and meaning recall with immediate feedback.'
        url={`https://fivebyfive.vercel.app/${locale}/kanji/jlpt-n1`}
        educationalLevel='Advanced'
        skillLevel='Tier 5'
        learningResourceType='Interactive Course'
      />
      <LearningResourceSchema
        name='Tier 5 Radio Codes Practice'
        description='Practice tier 5 radio codes with selectable sets, quick selection tools and instant feedback.'
        url={`https://fivebyfive.vercel.app/${locale}/kanji/jlpt-n1`}
        learningResourceType={['Quiz', 'Interactive', 'Game']}
        educationalLevel={['Advanced']}
        teaches='Tier 5 radio phrases and their meanings'
        assesses='Tier 5 phrase recall speed and accuracy'
        timeRequired='PT40M'
        isAccessibleForFree={true}
        provider={{ name: 'FiveByFive', url: 'https://fivebyfive.vercel.app' }}
        educationalAlignment={{
          alignmentType: 'educationalLevel',
          educationalFramework: 'JLPT',
          targetName: 'N1',
        }}
      />
      <FAQSchema faqs={kanjiFAQs} />
      <KanjiMenu fixedCollection='n1' hideUnitSelector />
    </>
  );
}

