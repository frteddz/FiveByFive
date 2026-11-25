import { KanjiMenu } from '@/widgets';
import type { Metadata } from 'next';
import { generatePageMetadata } from '@/core/i18n/metadata-helpers';
import { CourseSchema } from '@/shared/ui-composite/SEO/CourseSchema';
import { Breadcrumbs } from '@/shared/ui-composite/Breadcrumbs';
import { getTranslations } from 'next-intl/server';
import { FAQSchema, kanjiFAQs } from '@/shared/ui-composite/SEO/FAQSchema';
import { LearningResourceSchema } from '@/shared/ui-composite/SEO/LearningResourceSchema';
import { DojoRouteSchema } from '@/shared/ui-composite/SEO/DojoRouteSchema';
import { routing } from '@/core/i18n/routing';

// Generate static pages for all locales at build time
export function generateStaticParams() {
  return routing.locales.map(locale => ({ locale }));
}

// ISR: Revalidate every hour
export const revalidate = 3600;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return await generatePageMetadata('kanji', { locale, pathname: '/kanji' });
}

export default async function KanjiPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'navigation' });

  return (
    <>
      <Breadcrumbs
        className='hidden'
        items={[
          { name: t('menu.home'), url: '/' },
          { name: t('menu.kanji'), url: '/kanji' },
        ]}
      />
      <CourseSchema
        name='Codes Course - Radio Phrases by Tier'
        description='Practice radio phrases across five tiers with quick set selection, typing drills and progress tracking. Learn what each phrase means in voice communication.'
        url={`https://fivebyfive.vercel.app/${locale}/kanji`}
        educationalLevel='Beginner to Advanced'
        skillLevel='All Levels'
        learningResourceType='Interactive Course, Exercise and Games'
      />
      <LearningResourceSchema
        name='Interactive Codes Practice and Radio Phrase Quiz'
        description='Practice radiotelephony phrases across five tiers with quick set selection and interactive drills. Learn the meaning and use of each phrase.'
        url={`https://fivebyfive.vercel.app/${locale}/kanji`}
        learningResourceType={['Quiz', 'Interactive', 'Game']}
        educationalLevel={['Beginner', 'Intermediate', 'Advanced']}
        teaches='Radio phrases, digits and radiotelephony codes'
        assesses='Phrase meaning recall and recognition speed'
        timeRequired='PT1H'
        isAccessibleForFree={true}
        provider={{ name: 'FiveByFive', url: 'https://fivebyfive.vercel.app' }}
        educationalAlignment={{
          alignmentType: 'educationalLevel',
          educationalFramework: 'JLPT',
          targetName: 'N5-N1',
        }}
      />
      <DojoRouteSchema
        routeKey='kanji'
        locale={locale}
        title='Codes Dojo - Practice Radio Phrases by Tier'
        description='Practice radio phrases across five tiers with interactive exercises, quick set selection and progress tracking.'
        canonicalPath='/kanji'
        teaches='Radio phrases, digits and radiotelephony codes'
        assesses='Phrase meaning recall and recognition speed'
        educationalAlignment={{
          alignmentType: 'educationalLevel',
          educationalFramework: 'JLPT',
          targetName: 'N5-N1',
        }}
      />
      <FAQSchema faqs={kanjiFAQs} />
      <KanjiMenu />
    </>
  );
}
