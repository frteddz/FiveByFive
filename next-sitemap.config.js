/** @type {import('next-sitemap').IConfig} */
const sitemapConfig = {
  siteUrl: process.env.SITE_URL || 'https://fivebyfive.vercel.app',
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  changefreq: 'weekly',
  priority: 0.7,
  sitemapSize: 5000,
  additionalPaths: async config => {
    const corePaths = [
      '/',
      '/kana',
      '/kanji',
      '/vocabulary',
      '/faq',
      '/how-to-use',
      '/about',
      '/credits',
      '/resources',
      '/anki-converter',
      '/progress',
      '/preferences',
      '/privacy',
      '/terms',
      '/security',
      '/patch-notes',
    ];

    return [...new Set(corePaths)].map(loc => ({
      loc,
      changefreq: config.changefreq,
      priority: loc === '/' ? 1 : loc === '/kana' ? 0.9 : config.priority,
      lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
    }));
  },
  exclude: [
    '/api/*',
    '/_next/*',
    '/en',
    '/es',
    '/en/*',
    '/es/*',
    '/tools/*',
    '/*/train/*',
  ],
  robotsTxtOptions: {
    policies: [
      { userAgent: '*', allow: '/' },
      { userAgent: 'GPTBot', allow: '/' },
      { userAgent: 'ChatGPT-User', allow: '/' },
      { userAgent: 'Claude-Web', allow: '/' },
      { userAgent: 'anthropic-ai', allow: '/' },
      { userAgent: 'PerplexityBot', allow: '/' },
      { userAgent: 'Google-Extended', allow: '/' },
      { userAgent: 'CCBot', allow: '/' },
      { userAgent: 'Applebot', allow: '/' },
      { userAgent: 'Amazonbot', allow: '/' },
    ],
    additionalSitemaps: [],
  },
  transform: async (config, path) => {
    const priorities = {
      '/': 1.0,
      kana: 0.9,
      kanji: 0.9,
      vocabulary: 0.9,
      faq: 0.85,
      resources: 0.85,
    };

    const changefreqs = {
      '/': 'daily',
      kana: 'daily',
      kanji: 'daily',
      vocabulary: 'daily',
    };

    return {
      loc: path,
      changefreq: changefreqs[path] || config.changefreq,
      priority: priorities[path] || config.priority,
      lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
    };
  },
};

export default sitemapConfig;
