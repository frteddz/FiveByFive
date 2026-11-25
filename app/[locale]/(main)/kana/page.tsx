import { KanaMenu } from '@/widgets';
import type { Metadata } from 'next';
import { generatePageMetadata } from '@/core/i18n/metadata-helpers';
import { CourseSchema } from '@/shared/ui-composite/SEO/CourseSchema';
import { Breadcrumbs } from '@/shared/ui-composite/Breadcrumbs';
import { getTranslations } from 'next-intl/server';
import { FAQSchema, hiraganaFAQs } from '@/shared/ui-composite/SEO/FAQSchema';
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
  return await generatePageMetadata('kana', { locale, pathname: '/kana' });
}

export default async function KanaPage({
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
          { name: t('menu.kana'), url: '/kana' },
        ]}
      />
      <CourseSchema
        name='Letters Course - Learn A to Z with ICAO Code Words'
        description='Learn the code word for every letter from A to Z with pick, reverse pick, input and reverse input drills. Track accuracy and review the letters you miss.'
        url={`https://fivebyfive.vercel.app/${locale}/kana`}
        educationalLevel='Beginner'
        skillLevel='Beginner'
        learningResourceType='Interactive Course, Exercise and Games'
      />
      <LearningResourceSchema
        name='Interactive Letters Practice Games and Quizzes'
        description='Practice letter to code word recall with quizzes, drills and speed games. Build accurate recall of the NATO phonetic alphabet.'
        url={`https://fivebyfive.vercel.app/${locale}/kana`}
        learningResourceType={['Game', 'Quiz', 'Interactive']}
        educationalLevel={['Beginner', 'Intermediate']}
        teaches='NATO letters A to Z and their code words'
        assesses='Letter recall accuracy and speed'
        timeRequired='PT30M'
        isAccessibleForFree={true}
        provider={{ name: 'FiveByFive', url: 'https://fivebyfive.vercel.app' }}
      />
      <DojoRouteSchema
        routeKey='kana'
        locale={locale}
        title='Letters Dojo - Learn the NATO Alphabet by Level'
        description='Practice letter to code word recall with interactive games, quizzes and drills. Get instant feedback, track progress and focus on the sets you need.'
        canonicalPath='/kana'
        teaches='NATO letters A to Z and their code words'
        assesses='Letter recall accuracy and speed'
      />
      <FAQSchema faqs={hiraganaFAQs} />
      <KanaMenu />
    </>
  );
}
