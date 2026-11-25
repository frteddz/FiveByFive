# IndexNow setup

IndexNow lets a site tell Bing, Yandex and other search engines when a page is published or updated. The code is already in the repo. The key and a few hardcoded values are what is left.

Relevant files:

- `app/api/indexnow/route.ts`
- `shared/utils/indexnow.ts`
- `public/browserconfig.xml`
- `next-sitemap.config.js`

## 1. Make a key

Generate a UUID:

```bash
node -e "console.log(crypto.randomUUID())"
```

Keep the output somewhere. It is both the key name, the key value and the environment variable value.

## 2. Publish the key file

Create `public/<your-uuid>.txt` containing only that same UUID. No extra text, no trailing newline if you can help it.

```bash
echo -n "your-uuid-here" > public/your-uuid-here.txt
```

Commit the file. Vercel serves everything in `public/` at the site root.

## 3. Set the environment variable

Locally, add to `.env.local`:

```
INDEXNOW_KEY=your-uuid-here
```

On Vercel, add `INDEXNOW_KEY` under Settings, Environment Variables, for Production and Preview if you want both. Redeploy after adding it.

## 4. Fix the hardcoded host on a fork

This step matters if you are deploying [frteddz/FiveByFive](https://github.com/frteddz/FiveByFive) or your own fork rather than the upstream site.

Both `app/api/indexnow/route.ts` and `shared/utils/indexnow.ts` define `SITE_URL` as `https://kanadojo.com`. The route also rejects any submitted URL whose hostname is not `kanadojo.com`. Change those to your domain, or make them read from `SITE_URL`, before testing. Without this, every submission from your domain is filtered out even when the key is correct.

## 5. Verify

After deploy, the key file should return the UUID as plain text:

```
https://your-domain.com/your-uuid-here.txt
```

Check that the endpoint reports the key as configured:

```
GET https://your-domain.com/api/indexnow
```

Submit a URL:

```bash
curl -X POST https://your-domain.com/api/indexnow \
  -H "Content-Type: application/json" \
  -d '{"url": "https://your-domain.com/"}'
```

A rejection usually means one of three things: `INDEXNOW_KEY` is missing in that environment, the key file is not reachable at the root, or step 4 was skipped and the host check failed.

## 6. Bing Webmaster Tools

Register your site at [bing.com/webmasters](https://www.bing.com/webmasters), verify ownership, then enter the UUID under the IndexNow section. This is separate from the app code. Search engines need to know the key belongs to your domain.

## 7. Use it

For app code, call the helpers in `shared/utils/indexnow.ts` after publishing or updating a page. For manual submissions, post to `/api/indexnow` with a single `url` or an array of `urls`. The route forwards them to `https://api.indexnow.org/indexnow`.

There is no need to submit on every change. Submit when a page is new or its content actually changed.
