import { KanaMenu } from '@/widgets';
import type { Metadata } from 'next';
import { generatePageMetadata } from '@/core/i18n/metadata-helpers';
import { CourseSchema } from '@/shared/ui-composite/SEO/CourseSchema';
import { BreadcrumbSchema } from '@/shared/ui-composite/SEO/BreadcrumbSchema';
import { LearningResourceSchema } from '@/shared/ui-composite/SEO/LearningResourceSchema';
import {
  FAQSchema,
  commonKanaDOJOFAQs,
} from '@/shared/ui-composite/SEO/FAQSchema';
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
  return await generatePageMetadata('learnKatakana', {
    locale,
    pathname: '/kana/learn-katakana',
  });
}

export default async function LearnKatakanaPage({
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
            name: 'Learn Radio Codes',
            url: `https://fivebyfive.vercel.app/${locale}/kana/learn-katakana`,
          },
        ]}
      />
      <CourseSchema
        name='Learn Radio Codes and Phrases'
        description='Learn digits, radio phrases and common radiotelephony codes with short drills and instant feedback. Review the items you miss most.'
        url={`https://fivebyfive.vercel.app/${locale}/kana/learn-katakana`}
        educationalLevel='Beginner'
        skillLevel='Beginner'
        learningResourceType='Interactive Course'
      />
      <LearningResourceSchema
        name='Radio Codes Practice Playground'
        description='A practice hub for radio codes and phrases with selectable sets, drills and training modes. Build confident recall of common voice procedures.'
        url={`https://fivebyfive.vercel.app/${locale}/kana/learn-katakana`}
        learningResourceType={['Interactive', 'Quiz', 'Game']}
        educationalLevel={['Beginner', 'Intermediate']}
        teaches='ICAO digits and radio phrases'
        assesses='Phrase recognition speed and accuracy'
        timeRequired='PT20M'
        isAccessibleForFree={true}
        provider={{ name: 'FiveByFive', url: 'https://fivebyfive.vercel.app' }}
      />
      <FAQSchema faqs={commonKanaDOJOFAQs} />
      <KanaMenu filter='katakana' />
    </>
  );
}

