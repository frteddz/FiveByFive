import type { Metadata } from 'next';
import { routing } from '@/core/i18n/routing';
import { BreadcrumbSchema } from '@/shared/ui-composite/SEO/BreadcrumbSchema';
import { LearningResourceSchema } from '@/shared/ui-composite/SEO/LearningResourceSchema';
import Script from 'next/script';
import { ResourcesPageClient } from './ResourcesPageClient';
import {
  getAllResources,
  getAllCategories,
  enrichCategoriesWithCounts,
  getFilterOptions,
} from '@/features/Resources';

// Generate static pages for all locales at build time
export function generateStaticParams() {
  return routing.locales.map(locale => ({ locale }));
}

// ISR: Revalidate daily
export const revalidate = 86400;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  await params;
  const resources = getAllResources();
  const totalCount = resources.length;

  const title =
    'Resource Library - Apps, Dictionaries and Study Tools | FiveByFive';
  const description = `Browse ${totalCount}+ curated learning resources. Find apps, textbooks, dictionaries and reference tools grouped by category.`;

  return {
    title,
    description,
    keywords: [
      'learning resources',
      'study tools',
      'code word reference',
      'phonetic alphabet practice',
      'language apps',
      'dictionaries',
      'textbooks',
    ],
    openGraph: {
      title: 'Resource Library | FiveByFive',
      description,
      url: 'https://fivebyfive.vercel.app/resources',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Resource Library | FiveByFive',
      description,
    },
    alternates: {
      canonical: 'https://fivebyfive.vercel.app/resources',
    },
  };
}

// Generate ItemList structured data for SEO
function generateItemListSchema(
  resources: ReturnType<typeof getAllResources>,
  locale: string,
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Curated Learning Resources',
    description: 'A categorized index of study tools and reference material',
    numberOfItems: resources.length,
    itemListOrder: 'https://schema.org/ItemListUnordered',
    itemListElement: resources.slice(0, 25).map((resource, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'LearningResource',
        name: resource.name,
        url: resource.url,
        educationalLevel:
          resource.difficulty === 'all-levels' ? 'All Levels' : undefined,
        inLanguage: locale === 'es' ? 'es' : 'en',
      },
    })),
  };
}

export default async function ResourcesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // Get all resources and categories with counts
  const resources = getAllResources();
  const categories = getAllCategories();
  const categoriesWithCounts = enrichCategoriesWithCounts(
    categories,
    resources,
  );
  const availableFilters = getFilterOptions(resources);

  const breadcrumbItems = [
    { name: 'Home', url: 'https://fivebyfive.vercel.app' },
    { name: 'Resources', url: 'https://fivebyfive.vercel.app/resources' },
  ];

  const itemListSchema = generateItemListSchema(resources, locale);

  return (
    <>
      {/* Structured Data */}
      <BreadcrumbSchema items={breadcrumbItems} />
      <Script
        id='resources-itemlist-schema'
        type='application/ld+json'
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />
      <LearningResourceSchema
        name='Learning Resource Library'
        description={`Curated collection of ${resources.length}+ learning resources, including apps, dictionaries, textbooks and reference tools.`}
        url='https://fivebyfive.vercel.app/resources'
        learningResourceType='Course'
        educationalLevel={['Beginner', 'Intermediate', 'Advanced']}
        teaches='Study tools and reference material'
        isAccessibleForFree={true}
        inLanguage={['en']}
        provider={{ name: 'FiveByFive', url: 'https://fivebyfive.vercel.app' }}
      />

      {/* Page Content */}
      <ResourcesPageClient
        locale={locale}
        initialResources={resources}
        categoriesWithCounts={categoriesWithCounts}
        availableFilters={availableFilters}
      />
    </>
  );
}

