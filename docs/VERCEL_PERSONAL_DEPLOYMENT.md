# Deploy a personal fork on Vercel

This walks through putting your own copy of FiveByFive on Vercel. Nothing here is required to run the app locally.

## 1. Fork and import

Fork [frteddz/FiveByFive](https://github.com/frteddz/FiveByFive) to your GitHub account. In Vercel, choose Add New, Project, then import your fork. Vercel detects Next.js on its own.

`vercel.json` in the repo sets a few things for you:

- Framework: Next.js
- Region: `iad1`
- Build command: `npm run clean:all && npm run build`
- An ignore command that skips some deploys
- A cron hitting `/api/process-bug-reports`
- Security headers and long-lived cache headers for sounds, wallpapers and JSON data

The cron and several API functions are inherited from upstream. If your fork does not use the bug-report pipeline, remove that cron and those function entries from your copy of `vercel.json` rather than letting them run.

## 2. Environment variables

A basic deployment does not need secrets. Add these if you use the related features:

| Variable | Why |
| --- | --- |
| `SITE_URL` | Base URL for the generated sitemap and robots file. Defaults to `https://kanadojo.com`, which is wrong for a fork. |
| `INDEXNOW_KEY` | Key for `app/api/indexnow/route.ts`. See [../TODO_INDEXNOW_SETUP.md](../TODO_INDEXNOW_SETUP.md). |

Set them for Production and Preview as needed, then redeploy after changing them.

Watch out for the IndexNow route. It currently hardcodes `kanadojo.com` as the allowed host and as its site URL, so a fork needs a code change before submissions for its own domain will pass validation.

## 3. Deploy

Trigger the first deploy from the Vercel import screen. After that, pushes to your connected branch deploy automatically. The `postbuild` script runs `next-sitemap`, which writes the sitemap and `robots.txt`.

Check the build log. A common source of failure is an environment variable that was set after the first build. Redeploy once after adding one.

## 4. Custom domain

Add your domain in Vercel project settings and point DNS at the records Vercel gives you. Then set `SITE_URL` to that exact domain, including the scheme, and redeploy. Otherwise generated URLs still point at the upstream site.

## 5. Sanity checks after deploy

- Load the home page and one training screen
- Check `/sitemap.xml` and `/robots.txt` for the right host
- Check that the four game modes work on at least one training
- If you configured IndexNow, request `/api/indexnow` and confirm it reports the key as configured
- Check the browser console for missing static assets under `/data-vocab/` or `/data-kanji/`

## Notes on inherited code

The app still contains upstream names and endpoints, including community and bug-report routes backed by external services. A personal fork does not need them to train the alphabet. They are left in place because removing them is a bigger change than deploying. If one of them fails on your deployment, remove the corresponding route or cron entry instead of treating it as a blocker.
