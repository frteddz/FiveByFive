# Architecture

FiveByFive is a Next.js App Router app organised by feature. The structure comes from [lingdojo/kana-dojo](https://github.com/lingdojo/kana-dojo) and is mostly unchanged. The engine and UI are upstream. The training content is new.

This document describes the layout as it is in the repo. Where upstream names are still present, they are called out so nobody mistakes them for a mistake.

## Layers

```
app/          routes, layouts, metadata
widgets/      page-level composition across features
features/     training modules and their own logic
entities/     reusable domain helpers and selectors
shared/       reusable UI, hooks, stores and utilities
core/         i18n, analytics and infrastructure
public/       static data and assets
docs/         documentation
```

Dependencies point downward. A route in `app/` can use widgets, features, entities, shared and core. A feature can use entities, shared and core. A shared module should not reach into a feature. This is the rule to protect, because breaking it is how a feature-based layout turns into a pile.

## `app/`

App Router pages and layouts under `app/[locale]/`. Route folders still use upstream names: `kana/`, `kanji/` and `vocabulary/` are the Letters, Codes and Spelling trainings at the code level. They were left alone because URLs, saved state and internal links depend on them.

Also here:

- `app/api/` for server routes, including `indexnow`, `healthcheck`, `translate` and inherited community and bug-report endpoints
- `app/llms.txt/route.ts` and `app/security.txt/route.ts` for those static text responses
- `app/layout.tsx`, `app/ClientLayout.tsx`, `app/global-error.tsx` and `app/globals.css`

Pages should orchestrate. Question building, answer checking and progress updates belong in features.

## `features/`

Each feature owns its components, store, data and pure logic. A typical feature looks like this:

```
features/Kana/
  components/       UI for this training
  data/             static content
  lib/              question generation and answer checking
  store/            Zustand store
  facade/           small hooks for common read/write paths
  index.ts          public entrypoint
```

`features/Kana/data/kana.ts` is where the letters, digits, phrases and confusable pairs live. It keeps the upstream `KanaGroup` shape. Group names such as `h.letter.a`, `k.phrase.roger` and `challenge.b-d` are keys that menus and progress stores rely on, so changing them is a migration, not a cleanup.

The spelling word lists are JSON files under `public/data-vocab/` and `public/data-kanji/`. They also keep upstream filenames and field names, but the entries now contain code-word spellings. For example, `WHEAT` appears with `whiskey hotel echo alfa tango` in the `kana` field.

Other features include `MainMenu`, `Preferences`, `Progress`, `Achievements`, `Translator`, `Conjugator`, `Blog`, `CrazyMode`, `Demo`, `Experiments`, `Resources` and `Legal`. Some are upstream leftovers. They still build and are still routed.

## `entities/`

Domain modules split by subject: `entities/kana`, `entities/kanji`, `entities/vocabulary`. Put reusable pure helpers and selectors here when more than one feature needs them. If only one feature uses it, keep it in that feature's `lib/`.

## `shared/`

Code used across features:

- `shared/ui/` for shadcn-style primitives
- `shared/ui-composite/` for assembled UI, including menus, game pieces, SEO helpers and error boundaries
- `shared/hooks/` for generic and game hooks
- `shared/store/` for stores that span features, such as session, decorations, gauntlet settings and onboarding
- `shared/utils/` for helpers, including `cn()` in `shared/utils/utils.ts`
- `shared/lib/` and `shared/infra/` for client and server-side infrastructure

## `core/`

`core/i18n/` holds translation files and next-intl setup. `core/analytics/` holds analytics helpers. Infrastructure that has no feature owner goes here.

## `widgets/`

Larger UI sections that compose public APIs from several modules. A widget should not own domain logic or reach into a feature's private folders. If it starts to, the logic belongs back in a feature.

## Conventions

- Import through `@/...` aliases and feature entrypoints. Avoid cross-feature relative imports.
- Keep feature internals private. Export only what other modules need from `index.ts`.
- Use TypeScript strict mode. Fix errors rather than casting around them.
- Components are functional with explicit props. Hooks and stores start with `use`.
- Use Tailwind and `cn()` for conditional classes. Theme values come from CSS variables.
- User-facing strings live in namespace JSON files under `core/i18n/locales/`.
- Code words and radio phrases are content data. Do not translate them through i18n.

See [STATE_MANAGEMENT.md](./STATE_MANAGEMENT.md) for store conventions and [UI_DESIGN.md](./UI_DESIGN.md) for styling rules.

## Tests

Vitest is configured in `vitest.config.ts` with jsdom. Tests sit next to the code (`*.test.ts`) or under a feature's `__tests__/` folder. Run them with `npm run test` or `npm run test:watch`.

## Commands

| Command | Purpose |
| --- | --- |
| `npm run dev` | Dev server with Turbopack |
| `npm run check` | TypeScript plus ESLint |
| `npm run test` | Single Vitest run |
| `npm run test:watch` | Watch mode |
| `npm run lint` | ESLint only |
| `npm run format` | Prettier, writes files |
| `npm run i18n:check` | Translation config, keys and types |

Avoid `npm run build` for routine verification. It is slow and duplicates checks already covered above.

## Adding things

**New content in an existing training.** Edit the relevant data file or JSON dataset. Keep the shape and the group keys. Add accepted variants where spelling differences would otherwise mark a correct answer wrong.

**New game mode.** The four modes live in the training components and are selected through the feature stores. Add the UI in `features/<Training>/components/Game/`, wire the store, and add strings to the matching locale namespaces.

**New page.** Put the route in `app/[locale]/`, keep the page thin, and compose from existing features or widgets. If the page needs its own logic, create a feature first.

**New translation.** Add the key to every locale file in the same namespace and run `npm run i18n:check`. See [TRANSLATION_GUIDE.md](./TRANSLATION_GUIDE.md).
