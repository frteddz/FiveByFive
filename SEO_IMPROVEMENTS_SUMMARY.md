# SEO setup summary

A summary of the search and metadata setup in this repo. Most of it is inherited from [lingdojo/kana-dojo](https://github.com/lingdojo/kana-dojo) and still works. The fork work is mostly a content and branding problem, not an SEO infrastructure problem.

This is a state-of-the-repo document, not a record of past phases or claimed ranking results.

## What is in place

### IndexNow

- `app/api/indexnow/route.ts` accepts `POST` with either `{ "url": "..." }` or `{ "urls": ["..."] }`
- `shared/utils/indexnow.ts` has helpers for single and batch submissions
- `public/browserconfig.xml` is present for Bing and Windows integration
- Setup steps are in [TODO_INDEXNOW_SETUP.md](./TODO_INDEXNOW_SETUP.md)

Two things need attention on a fork. Both the route and the utility hardcode `https://kanadojo.com`, and the route only accepts URLs whose hostname is `kanadojo.com`. A fork has to change those constants before IndexNow will accept its own URLs. The key itself is read from `INDEXNOW_KEY`.

### Sitemaps and robots

- `next-sitemap.config.js` builds the sitemap, with `SITE_URL` as the base and `https://kanadojo.com` as the default
- `postbuild` in `package.json` runs `next-sitemap`
- Academy MDX posts under `features/Blog/content/posts/en/` are picked up by the sitemap config

Set `SITE_URL` for any deployment that is not the upstream site. Otherwise the sitemap advertises the wrong host.

### Security and cache headers

Headers are declared in two places:

- `next.config.ts` sets `X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy` and `Permissions-Policy`, and turns off `X-Powered-By`
- `vercel.json` sets the same base security headers plus long cache lifetimes for `/sounds/`, `/wallpapers/`, `/data-kanji/*.json` and `/data-vocab/*.json`

If you edit headers, edit both files or they will disagree between local dev and Vercel.

### Structured data

Structured data components live in `shared/ui-composite/SEO/`. They cover author, breadcrumb, course, dojo route, FAQ, how-to, item list, learning resource and video schemas, assembled through `StructuredData.tsx`. Breadcrumb UI is in `shared/ui-composite/Breadcrumbs/`.

Some of this schema text describes a Japanese learning resource. It should be reviewed for FiveByFive so the structured data matches the new content.

### Metadata

Per-route metadata lives in `core/i18n/locales/<locale>/metadata.json`. `core/i18n/metadata-helpers.ts` and `app/layout.tsx` use it. The current keys still map to upstream pages such as `hiraganaBase`, `learnKatakana`, `kanjiPractice` and `jlpt` pages. The keys are safe, but the titles, descriptions and keywords still need to be rewritten for the phonetic alphabet trainings.

`app/llms.txt/route.ts` and `app/security.txt/route.ts` serve those text files.

## Checks

```bash
npm run seo:check       # local SEO health check
npm run seo:check:live  # same check against a live URL
npm run bundle:check    # bundle size regression check
```

## What still needs doing

- Update metadata titles, descriptions and keywords for Letters, Codes and Spelling
- Review structured data for upstream Japanese-learning claims
- Replace hardcoded `kanadojo.com` hosts in the IndexNow route and utility if deploying a fork
- Set `SITE_URL` on every deployment
- Finish replacing inherited locale copy that mentions Hiragana, Katakana and JLPT
