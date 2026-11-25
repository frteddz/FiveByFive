import { KanaMenu } from '@/widgets';
import type { Metadata } from 'next';
import { generatePageMetadata } from '@/core/i18n/metadata-helpers';
import { CourseSchema } from '@/shared/ui-composite/SEO/CourseSchema';
import { BreadcrumbSchema } from '@/shared/ui-composite/SEO/BreadcrumbSchema';
import { LearningResourceSchema } from '@/shared/ui-composite/SEO/LearningResourceSchema';
import { FAQSchema, hiraganaFAQs } from '@/shared/ui-composite/SEO/FAQSchema';
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
  return await generatePageMetadata('learnHiragana', {
    locale,
    pathname: '/kana/learn-hiragana',
  });
}

export default async function LearnHiraganaPage({
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
          { name: 'Kana', url: `https://fivebyfive.vercel.app/${locale}/kana` },
          {
            name: 'Learn Letters',
            url: `https://fivebyfive.vercel.app/${locale}/kana/learn-hiragana`,
          },
        ]}
      />
      <CourseSchema
        name='Learn Letters A to Z with Code Words'
        description='Learn every letter with its NATO code word using selectable cards, typing drills and instant feedback. Practice the full alphabet or focus on A to M and N to Z.'
        url={`https://fivebyfive.vercel.app/${locale}/kana/learn-hiragana`}
        educationalLevel='Beginner'
        skillLevel='Beginner'
        learningResourceType='Interactive Course'
      />
      <LearningResourceSchema
        name='Letters Practice Playground'
        description='A practice hub with selectable letter sets, drills and training modes. Build fast recall of code words from Alfa to Zulu.'
        url={`https://fivebyfive.vercel.app/${locale}/kana/learn-hiragana`}
        learningResourceType={['Interactive', 'Quiz', 'Game']}
        educationalLevel={['Beginner', 'Intermediate']}
        teaches='The 26 NATO code words and letter recognition'
        assesses='Letter recall speed, accuracy and spelling'
        timeRequired='PT20M'
        isAccessibleForFree={true}
        provider={{ name: 'FiveByFive', url: 'https://fivebyfive.vercel.app' }}
      />
      <FAQSchema faqs={hiraganaFAQs} />
      <KanaMenu filter='hiragana' />
    </>
  );
}

