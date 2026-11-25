import { VocabMenu } from '@/widgets';
import type { Metadata } from 'next';
import { generatePageMetadata } from '@/core/i18n/metadata-helpers';
import { CourseSchema } from '@/shared/ui-composite/SEO/CourseSchema';
import { Breadcrumbs } from '@/shared/ui-composite/Breadcrumbs';
import { getTranslations } from 'next-intl/server';
import {
  FAQSchema,
  commonKanaDOJOFAQs,
} from '@/shared/ui-composite/SEO/FAQSchema';
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
  return await generatePageMetadata('vocabulary', {
    locale,
    pathname: '/vocabulary',
  });
}

export default async function VocabularyPage({
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
          { name: t('menu.vocabulary'), url: '/vocabulary' },
        ]}
      />
      <CourseSchema
        name='Spelling Course - Spell Words with Code Words'
        description='Spell full words using ICAO code words. Practice sets by tier, check your spelling with instant feedback and track the words you miss.'
        url={`https://fivebyfive.vercel.app/${locale}/vocabulary`}
        educationalLevel='Beginner to Advanced'
        skillLevel='All Levels'
        learningResourceType='Interactive Course, Exercise and Games'
      />
      <LearningResourceSchema
        name='Spelling Quiz and Code Word Practice'
        description='Spell words across five tiers with ICAO code words. Use quick set selection and short drills to build letter by letter recall.'
        url={`https://fivebyfive.vercel.app/${locale}/vocabulary`}
        learningResourceType={['Quiz', 'Interactive', 'Game']}
        educationalLevel={['Beginner', 'Intermediate', 'Advanced']}
        teaches='Spelling words with NATO code words'
        assesses='Spelling accuracy and speed'
        timeRequired='PT45M'
        isAccessibleForFree={true}
        provider={{ name: 'FiveByFive', url: 'https://fivebyfive.vercel.app' }}
        educationalAlignment={{
          alignmentType: 'educationalLevel',
          educationalFramework: 'JLPT',
          targetName: 'N5-N1',
        }}
      />
      <DojoRouteSchema
        routeKey='vocabulary'
        locale={locale}
        title='Spelling Dojo - Spell Words with ICAO Code Words'
        description='Spell words by tier with interactive drills and fast review. Check your spelling and track the words you miss.'
        canonicalPath='/vocabulary'
        teaches='Spelling words with NATO code words'
        assesses='Spelling accuracy and speed'
        educationalAlignment={{
          alignmentType: 'educationalLevel',
          educationalFramework: 'JLPT',
          targetName: 'N5-N1',
        }}
      />
      <FAQSchema faqs={commonKanaDOJOFAQs} />
      <VocabMenu />
    </>
  );
}
