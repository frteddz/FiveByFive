import { KanjiGame } from '@/features/Kanji';
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
  return await generatePageMetadata('kanjiTrain', {
    locale,
    pathname: '/kanji/train',
  });
}

export default function Train() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: 'https://fivebyfive.vercel.app' },
          { name: 'Codes', url: 'https://fivebyfive.vercel.app/kanji' },
          { name: 'Training', url: 'https://fivebyfive.vercel.app/kanji/train' },
        ]}
      />
      <CourseSchema
        name='Codes Training - Radio Phrases'
        description='Practice radio phrase recognition and meaning across five tiers with interactive drills.'
        url='https://fivebyfive.vercel.app/kanji/train'
        skillLevel='All Levels'
        learningResourceType='Interactive Training'
      />
      <KanjiGame />
    </>
  );
}

