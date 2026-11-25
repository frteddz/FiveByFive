# Agent guide

Instructions for coding agents working in this repository. The canonical guide is this file. `CLAUDE.md` and `GEMINI.md` point back here.

## Project overview

FiveByFive is a trainer for the NATO/ICAO phonetic alphabet. It is a fork of [lingdojo/kana-dojo](https://github.com/lingdojo/kana-dojo). The upstream engine and UI are intact. The content is new. Maintain the fork at [github.com/frteddz/FiveByFive](https://github.com/frteddz/FiveByFive).

Three trainings, all sharing the same engine:

- Letters: letter to code word
- Codes: radio phrases across five levels
- Spelling: spell a word using code words

Four game modes: pick, reverse pick, input, reverse input.

| Concern | Choice |
| --- | --- |
| Framework | Next.js 16, App Router, Turbopack |
| Language | TypeScript, strict mode |
| Styling | Tailwind CSS 4, CSS variables, shadcn-style primitives |
| State | Zustand 5 with localStorage persistence |
| i18n | next-intl, namespace JSON files |
| Tests | Vitest with jsdom |

## Verification

Never use `npm run build` to verify a change. It takes a couple of minutes and adds no validation beyond these:

```bash
npm run check   # tsc --noEmit plus eslint
npm run test    # vitest run
```

Use `npm run format:check` if you touched formatting. Use `npm run i18n:check` when translation files change.

## Shell

PowerShell on Windows uses `;`. Linux, macOS and WSL use `&&`.

## Code layout and boundaries

The repo is feature based: `app/`, `widgets/`, `features/`, `entities/`, `shared/`, `core/`, `public/`.

- Keep training logic inside its feature folder. Do not import another feature's private files.
- Import through path aliases (`@/...`) and public entrypoints (`index.ts` of a feature). Avoid long relative paths.
- A feature typically has `components/`, `store/`, `data/`, `lib/` and an `index.ts`.
- Pure helpers and question builders belong in `lib/`. State belongs in `store/`. Static content belongs in `data/`.
- `app/` owns routing, layouts and metadata. Do not put business logic in pages.
- `widgets/` composes public APIs from other layers. It is not a second `shared/`.
- `shared/` is for genuinely reusable code. `core/` holds i18n and infrastructure.
- Avoid circular dependencies.

## Style rules

- TypeScript strict mode. Fix type errors instead of casting around them.
- Prefer `interface` for public shapes. Hook and store names start with `use`.
- Functional components with explicit props.
- Tailwind for styling. Use `cn()` from `@/shared/utils/utils` for conditional classes.
- Zustand stores are persisted when the state must survive a reload. Keep transient state local.
- i18n strings go in `core/i18n/locales/<locale>/<namespace>.json`. Never hardcode user-facing copy in components.
- Code-word content is data, not UI copy. Do not translate ICAO code words.

## Upstream names you will see

The fork inherited directory names, store keys, config constants and metadata strings from kana-dojo. You will find `kana`, `kanji`, `vocabulary`, `kanadojo` and `SITE_URL` defaults still in the code. Some persisted localStorage keys still start with `kanadojo`. Do not rename them casually because existing progress is stored under those keys. Rebranding is a deliberate, separate change.

## Git workflow

- Conventional commits: `type(scope): description`, for example `docs(readme): update setup steps`.
- For changes requested by the repo owner, commit straight to `main`. Do not open a branch or pull request unless one is explicitly asked for.
- External contributors still use the normal fork and pull request flow.

## Writing docs

The repo owner's writing rules apply to documentation and comments. No em dashes. No emojis. Plain, direct prose. No invented facts, sources or history. Do not write from an AI perspective. Keep it useful and skip the filler.
