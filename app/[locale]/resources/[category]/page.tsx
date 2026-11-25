import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { routing } from '@/core/i18n/routing';
import { BreadcrumbSchema } from '@/shared/ui-composite/SEO/BreadcrumbSchema';
import Script from 'next/script';
import { CategoryPageClient } from './CategoryPageClient';
import {
  getAllResources,
  getAllCategories,
  getCategoryById,
  getResourcesByCategory,
  enrichCategoriesWithCounts,
  getFilterOptions,
} from '@/features/Resources';

// Generate static pages for all locales and categories at build time
export function generateStaticParams() {
  const categories = getAllCategories();
  const params: { locale: string; category: string }[] = [];

  for (const locale of routing.locales) {
    for (const category of categories) {
      params.push({ locale, category: category.id });
    }
  }

  return params;
}

// ISR: Revalidate daily
export const revalidate = 86400;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; category: string }>;
}): Promise<Metadata> {
  const { category: categoryId } = await params;
  const category = getCategoryById(categoryId);

  if (!category) {
    return { title: 'Category Not Found' };
  }

  const resources = getResourcesByCategory(categoryId);
  const resourceCount = resources.length;

  const title = `Best ${category.name} for Study - ${resourceCount}+ Resources | FiveByFive`;
  const description = `Browse ${resourceCount}+ curated ${category.name.toLowerCase()}. Filter by difficulty, price and platform to find a resource that fits your study.`;

  return {
    title,
    description,
    keywords: [
      `study ${category.name.toLowerCase()}`,
      `best ${category.name.toLowerCase()}`,
      category.name.toLowerCase(),
      'learning resources',
      'reference material',
      'study tools',
    ],
    openGraph: {
      title: `Best ${category.name} for Study | FiveByFive`,
      description,
      url: `https://fivebyfive.vercel.app/resources/${categoryId}`,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `Best ${category.name} for Study | FiveByFive`,
      description,
    },
    alternates: {
      canonical: `https://fivebyfive.vercel.app/resources/${categoryId}`,
    },
  };
}

// Generate ItemList structured data for category
function generateItemListSchema(
  categoryName: string,
  categoryDescription: string,
  resources: ReturnType<typeof getResourcesByCategory>,
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: `Curated ${categoryName}`,
    description: categoryDescription,
    numberOfItems: resources.length,
    itemListOrder: 'https://schema.org/ItemListUnordered',
    itemListElement: resources.slice(0, 25).map((resource, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'LearningResource',
        name: resource.name,
        url: resource.url,
      },
    })),
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ locale: string; category: string }>;
}) {
  const { locale, category: categoryId } = await params;

  const category = getCategoryById(categoryId);

  if (!category) {
    notFound();
  }

  // Get resources for this category
  const categoryResources = getResourcesByCategory(categoryId);
  const allResources = getAllResources();
  const categories = getAllCategories();
  const categoriesWithCounts = enrichCategoriesWithCounts(
    categories,
    allResources,
  );
  const availableFilters = getFilterOptions(categoryResources);

  const breadcrumbItems = [
    { name: 'Home', url: 'https://fivebyfive.vercel.app' },
    { name: 'Resources', url: 'https://fivebyfive.vercel.app/resources' },
    {
      name: category.name,
      url: `https://fivebyfive.vercel.app/resources/${categoryId}`,
    },
  ];

  const itemListSchema = generateItemListSchema(
    category.name,
    category.description,
    categoryResources,
  );

  return (
    <>
      {/* Structured Data */}
      <BreadcrumbSchema items={breadcrumbItems} />
      <Script
        id='category-itemlist-schema'
        type='application/ld+json'
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />

      {/* Page Content */}
      <CategoryPageClient
        locale={locale}
        category={category}
        initialResources={categoryResources}
        categoriesWithCounts={categoriesWithCounts}
        availableFilters={availableFilters}
      />
    </>
  );
}

