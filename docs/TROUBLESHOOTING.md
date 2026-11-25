# Troubleshooting

Common problems when running FiveByFive locally. The app is a fork, so a few errors mention `kanadojo` or Japanese content. That is usually leftover naming, not a broken install.

## Setup

### Node version

Use a recent Node LTS release. Node 24 is known to work. Check what you have:

```bash
node --version
npm --version
```

If you are several major versions behind, install an LTS release and retry. Native dependencies in the tree are picky about old Node versions.

### `npm install` fails

Remove the install and try again:

```bash
rm -rf node_modules
npm install
```

On Windows PowerShell that is `Remove-Item -Recurse -Force node_modules`, then `npm install`.

If it fails on a network error, check the registry setting in `.npmrc` and try again. Do not delete `package-lock.json` unless you intend to update every pinned version.

### Port 3000 is taken

Next.js will offer another port in the terminal. Use that, or stop the other process. On Linux and macOS:

```bash
lsof -i :3000
```

On Windows, `netstat -ano | findstr :3000` gives you a PID to check in Task Manager.

### Dev server will not start

Clear the build cache:

```bash
npm run clean
npm run dev
```

If that does not help, remove `.next` by hand and restart. The `predev` script runs `scripts/generate-commit-info.mjs`, so a missing git directory in a copied source archive can also cause trouble. Clone the repo instead of downloading a zip.

## Type and lint errors

Run what CI would run:

```bash
npm run check
```

That runs `tsc --noEmit` and ESLint. If Prettier is the only complaint, run `npm run format`. If an error points at a file you did not touch, check whether it is an inherited file with an existing problem before "fixing" it by changing types loosely.

Do not use `npm run build` as a verification step. It runs the same checks plus a full production build, and takes much longer.

## Tests

```bash
npm run test
npm run test:watch
```

A failing test after a content change often means a data shape changed. The answer-checking tests in `features/Kana/` cover input normalisation and accepted variants. If you add an alternate spelling, add or update the matching test.

## Translations

```bash
npm run i18n:check
```

The usual causes are a key added to only one language, a missing namespace file, or a `{{placeholder}}` that was renamed in one locale. `core/i18n/routing.ts` and `core/i18n/config.ts` currently declare different active locale lists. If a route returns the default language unexpectedly, that mismatch is the first place to look.

If a screen shows text about Hiragana or Japanese learning, it is inherited locale copy. Fix it in the relevant namespace under `core/i18n/locales/<locale>/`.

## Progress or settings disappear

Progress is saved in localStorage by Zustand. Several keys still use the `kanadojo` prefix from upstream, for example `kanadojo`, `kanadojo-stats` and `theme-storage`. If settings reset, check that you are in the same browser and on the same host and port. Different ports count as different origins for localStorage.

Clearing site data will remove saved progress. Renaming one of those keys in code will also orphan existing saves, which is why those names are left alone.

## Deployment

`vercel.json` sets the build command to `npm run clean:all && npm run build` and the region to `iad1`. If a deploy fails on Vercel but `npm run build` works locally, compare environment variables and the Node version first. [VERCEL_PERSONAL_DEPLOYMENT.md](./VERCEL_PERSONAL_DEPLOYMENT.md) covers a personal fork setup.

The sitemap config uses `SITE_URL` and defaults to `https://kanadojo.com`. On a fork, a sitemap pointing at the wrong host usually means `SITE_URL` was never set.

IndexNow submissions are rejected for hosts other than `kanadojo.com` because the route hardcodes that hostname. See [../TODO_INDEXNOW_SETUP.md](../TODO_INDEXNOW_SETUP.md).

## Still stuck

Open an issue on [github.com/frteddz/FiveByFive](https://github.com/frteddz/FiveByFive). Include the Node version, the command you ran, the full error, and what you changed just before it broke. That is much more useful than "it does not work".
