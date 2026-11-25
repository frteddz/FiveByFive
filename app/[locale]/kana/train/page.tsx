import { KanaGame } from '@/features/Kana';
import type { Metadata } from 'next';
import { generatePageMetadata } from '@/core/i18n/metadata-helpers';
import { CourseSchema } from '@/shared/ui-composite/SEO/CourseSchema';
import { BreadcrumbSchema } from '@/shared/ui-composite/SEO/BreadcrumbSchema';
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
  return await generatePageMetadata('kanaTrain', {
    locale,
    pathname: '/kana/train',
  });
}

export default function Train() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: 'https://fivebyfive.vercel.app' },
          { name: 'Letters', url: 'https://fivebyfive.vercel.app/kana' },
          { name: 'Training', url: 'https://fivebyfive.vercel.app/kana/train' },
        ]}
      />
      <CourseSchema
        name='Letters Training - A to Z Code Words'
        description='Practice letter to code word recall with pick, reverse pick, input and reverse input drills.'
        url='https://fivebyfive.vercel.app/kana/train'
        skillLevel='Beginner to Intermediate'
        learningResourceType='Interactive Training'
      />
      <KanaGame />
    </>
  );
}

