/**
 * Internal Linking Utilities
 * Helps create consistent internal links for better SEO
 * Good internal linking improves crawlability and page authority distribution
 */

const SITE_URL = 'https://fivebyfive.vercel.app';

export interface InternalLink {
  href: string;
  text: string;
  title?: string;
}

/**
 * Main navigation links
 */
export const mainLinks = {
  home: {
    href: '/',
    text: 'FiveByFive',
    title: 'FiveByFive - Learn the NATO Phonetic Alphabet',
  },
  kana: {
    href: '/kana',
    text: 'Letters',
    title: 'Learn ICAO Code Words A to Z',
  },
  kanaHiragana: {
    href: '/kana/learn-hiragana',
    text: 'Learn Letters',
    title: 'Learn Letters with Interactive Practice',
  },
  kanaKatakana: {
    href: '/kana/learn-katakana',
    text: 'Learn Radio Codes',
    title: 'Learn Radio Codes with Interactive Practice',
  },
  kanji: {
    href: '/kanji',
    text: 'Codes',
    title: 'Learn Radio Phrases by Tier',
  },
  kanjiN5: {
    href: '/kanji/jlpt-n5',
    text: 'Tier 1 Codes',
    title: 'Practice Tier 1 Radio Codes',
  },
  kanjiN4: {
    href: '/kanji/jlpt-n4',
    text: 'Tier 2 Codes',
    title: 'Practice Tier 2 Radio Codes',
  },
  kanjiN3: {
    href: '/kanji/jlpt-n3',
    text: 'Tier 3 Codes',
    title: 'Practice Tier 3 Radio Codes',
  },
  kanjiN2: {
    href: '/kanji/jlpt-n2',
    text: 'Tier 4 Codes',
    title: 'Practice Tier 4 Radio Codes',
  },
  kanjiN1: {
    href: '/kanji/jlpt-n1',
    text: 'Tier 5 Codes',
    title: 'Practice Tier 5 Radio Codes',
  },
  vocabulary: {
    href: '/vocabulary',
    text: 'Spelling',
    title: 'Spell Words with Code Words',
  },
  vocabularyN5: {
    href: '/vocabulary/jlpt-n5',
    text: 'Tier 1 Spelling',
    title: 'Practice Tier 1 Spelling',
  },
  vocabularyN4: {
    href: '/vocabulary/jlpt-n4',
    text: 'Tier 2 Spelling',
    title: 'Practice Tier 2 Spelling',
  },
  vocabularyN3: {
    href: '/vocabulary/jlpt-n3',
    text: 'Tier 3 Spelling',
    title: 'Practice Tier 3 Spelling',
  },
  vocabularyN2: {
    href: '/vocabulary/jlpt-n2',
    text: 'Tier 4 Spelling',
    title: 'Practice Tier 4 Spelling',
  },
  vocabularyN1: {
    href: '/vocabulary/jlpt-n1',
    text: 'Tier 5 Spelling',
    title: 'Practice Tier 5 Spelling',
  },
  translate: {
    href: '/translate',
    text: 'Code Word Reference',
    title: 'NATO Code Word Reference',
  },
  academy: {
    href: '/academy',
    text: 'Academy',
    title: 'Phonetic Alphabet Guides and Articles',
  },
} as const;

/**
 * Learning links (practice pages)
 */
export const learningLinks = {
  hiraganaPractice: {
    href: '/hiragana-practice',
    text: 'Letters Practice',
    title: 'Practice Letters Online',
  },
  katakanaPractice: {
    href: '/katakana-practice',
    text: 'Codes Practice',
    title: 'Practice Radio Codes Online',
  },
  kanjiPractice: {
    href: '/kanji-practice',
    text: 'Radio Code Practice',
    title: 'Practice Radio Phrases',
  },
  kanaBlitz: {
    href: '/kana/blitz',
    text: 'Letters Blitz',
    title: 'Test Your Letter Speed',
  },
  kanjiBlitz: {
    href: '/kanji/blitz',
    text: 'Codes Blitz',
    title: 'Test Your Radio Code Speed',
  },
  vocabularyBlitz: {
    href: '/vocabulary/blitz',
    text: 'Spelling Blitz',
    title: 'Test Your Spelling Speed',
  },
} as const;

/**
 * Tier links
 */
export const jlptLinks = {
  n5: {
    href: '/jlpt/n5',
    text: 'Tier 1',
    title: 'Tier 1 Practice Materials',
  },
  n4: {
    href: '/jlpt/n4',
    text: 'Tier 2',
    title: 'Tier 2 Practice Materials',
  },
  n3: {
    href: '/jlpt/n3',
    text: 'Tier 3',
    title: 'Tier 3 Practice Materials',
  },
  n2: {
    href: '/jlpt/n2',
    text: 'Tier 4',
    title: 'Tier 4 Practice Materials',
  },
  n1: {
    href: '/jlpt/n1',
    text: 'Tier 5',
    title: 'Tier 5 Practice Materials',
  },
} as const;

/**
 * Utility links
 */
export const utilityLinks = {
  progress: {
    href: '/progress',
    text: 'Progress',
    title: 'View Your Training Progress',
  },
  preferences: {
    href: '/preferences',
    text: 'Preferences',
    title: 'Customize Your Training Experience',
  },
  achievements: {
    href: '/achievements',
    text: 'Achievements',
    title: 'View Your Achievements',
  },
  faq: {
    href: '/faq',
    text: 'FAQ',
    title: 'Frequently Asked Questions',
  },
} as const;

/**
 * Get all internal links for sitemap or navigation
 */
export function getAllInternalLinks(): InternalLink[] {
  return [
    ...Object.values(mainLinks),
    ...Object.values(learningLinks),
    ...Object.values(jlptLinks),
    ...Object.values(utilityLinks),
  ];
}

/**
 * Generate contextual internal links based on keywords
 * Useful for automatically linking keywords in content to relevant pages
 */
export function getContextualLink(keyword: string): InternalLink | null {
  const keywordLower = keyword.toLowerCase();

  // Letter variations
  if (
    ['letters', 'letter code words', 'letter chart'].includes(
      keywordLower,
    )
  ) {
    return learningLinks.hiraganaPractice;
  }

  // Code variations
  if (
    ['codes', 'radio codes', 'code word chart'].includes(
      keywordLower,
    )
  ) {
    return learningLinks.katakanaPractice;
  }

  // Radio code variations
  if (
    [
      'radio codes',
      'code phrases',
      'phrase practice',
      'radiotelephony',
    ].includes(keywordLower)
  ) {
    return mainLinks.kanji;
  }

  // Spelling
  if (
    ['spelling', 'word spelling', 'callsign spelling'].includes(
      keywordLower,
    )
  ) {
    return mainLinks.vocabulary;
  }

  // Code reference
  if (
    [
      'reference',
      'lookup',
      'code word reference',
      'code word lookup',
    ].includes(keywordLower)
  ) {
    return mainLinks.translate;
  }

  // Tiers
  if (['tier 1', 'n5'].includes(keywordLower)) return jlptLinks.n5;
  if (['tier 2', 'n4'].includes(keywordLower)) return jlptLinks.n4;
  if (['tier 3', 'n3'].includes(keywordLower)) return jlptLinks.n3;
  if (['tier 4', 'n2'].includes(keywordLower)) return jlptLinks.n2;
  if (['tier 5', 'n1'].includes(keywordLower)) return jlptLinks.n1;

  return null;
}

/**
 * Generate related links based on current page
 * Useful for "Related Articles" or "You might also like" sections
 */
export function getRelatedLinks(currentPath: string): InternalLink[] {
  const related: InternalLink[] = [];

  // Letter-related pages
  if (currentPath.includes('kana') || currentPath.includes('hiragana')) {
    related.push(
      mainLinks.kanaHiragana,
      mainLinks.kanaKatakana,
      learningLinks.hiraganaPractice,
      learningLinks.katakanaPractice,
      learningLinks.kanaBlitz,
    );
  }

  // Code-related pages
  if (currentPath.includes('kanji')) {
    related.push(
      learningLinks.kanjiPractice,
      learningLinks.kanjiBlitz,
      mainLinks.kanjiN5,
      mainLinks.kanjiN4,
      mainLinks.kanjiN3,
      jlptLinks.n5,
      jlptLinks.n4,
    );
  }

  // Spelling-related pages
  if (currentPath.includes('vocabulary') || currentPath.includes('vocab')) {
    related.push(
      learningLinks.vocabularyBlitz,
      mainLinks.vocabularyN5,
      mainLinks.vocabularyN4,
      mainLinks.vocabularyN3,
      jlptLinks.n5,
      mainLinks.kanji,
    );
  }

  // Tier-related pages
  if (currentPath.includes('jlpt')) {
    related.push(
      mainLinks.kanji,
      mainLinks.vocabulary,
      learningLinks.kanjiPractice,
    );
  }

  // Remove duplicates and current page
  return related.filter(
    (link, index, self) =>
      self.findIndex(l => l.href === link.href) === index &&
      !currentPath.includes(link.href),
  );
}

/**
 * Create anchor link for smooth scrolling
 */
export function createAnchorLink(id: string, text: string): InternalLink {
  return {
    href: `#${id}`,
    text,
    title: `Jump to ${text}`,
  };
}

/**
 * Generate breadcrumb links from path
 */
export function generateBreadcrumbLinks(
  pathname: string,
  locale: string = 'en',
): Array<{ name: string; url: string }> {
  const breadcrumbs = [{ name: 'Home', url: `/${locale}` }];

  // Remove locale prefix and split path
  const pathWithoutLocale = pathname.replace(/^\/(en|es)/, '');
  const segments = pathWithoutLocale.split('/').filter(Boolean);

  let currentPath = `/${locale}`;

  segments.forEach(segment => {
    currentPath += `/${segment}`;

    // Convert segment to readable name
    let name = segment
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');

    // Special cases
    if (segment === 'kana') name = 'Letters';
    if (segment === 'kanji') name = 'Codes';
    if (segment === 'vocabulary') name = 'Spelling';
    if (segment === 'academy') name = 'Academy';
    if (segment === 'translate') name = 'Translator';
    if (segment === 'faq') name = 'FAQ';
    if (segment === 'jlpt') name = 'Tiers';

    breadcrumbs.push({
      name,
      url: currentPath,
    });
  });

  return breadcrumbs;
}

/**
 * Get absolute URL for a path
 */
export function getAbsoluteUrl(path: string, locale: string = 'en'): string {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return `${SITE_URL}/${locale}${normalizedPath}`;
}

/**
 * Create a link to an Academy article
 */
export function createAcademyLink(slug: string, title: string): InternalLink {
  return {
    href: `/academy/${slug}`,
    text: title,
    title: `Read: ${title}`,
  };
}

/**
 * Generate "Continue Learning" links based on user's current activity
 */
export function getContinueLearningLinks(
  lastVisited: string[],
): InternalLink[] {
  const suggestions: InternalLink[] = [];

  // If user visited Letters, suggest Codes
  if (lastVisited.some(path => path.includes('hiragana'))) {
    suggestions.push(learningLinks.katakanaPractice);
  }

  // If user visited Codes, suggest Spelling
  if (
    lastVisited.some(path => path.includes('kana') || path.includes('katakana'))
  ) {
    suggestions.push(mainLinks.kanji);
  }

  // If user visited Spelling, suggest more practice
  if (lastVisited.some(path => path.includes('kanji'))) {
    suggestions.push(mainLinks.vocabulary);
  }

  // Always suggest practice games
  if (!lastVisited.some(path => path.includes('blitz'))) {
    suggestions.push(learningLinks.kanaBlitz);
  }

  return suggestions.slice(0, 3); // Return max 3 suggestions
}
