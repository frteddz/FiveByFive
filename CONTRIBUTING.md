# Contributing to FiveByFive

FiveByFive is a fork of [lingdojo/kana-dojo](https://github.com/lingdojo/kana-dojo). The training engine and UI came from upstream. The content is ours: the NATO/ICAO alphabet, radio phrases and spelling words. That mix shapes what is useful to contribute.

If Git and GitHub are new to you, start with [docs/CONTRIBUTING-BEGINNERS.md](./docs/CONTRIBUTING-BEGINNERS.md). It goes from account creation to a first pull request.

## What helps

- Fixing wrong or missing code words and accepted spellings
- Adding radio phrases and filling out the five Codes levels
- Adding or correcting spelling words
- Translation fixes
- UI and accessibility fixes
- Docs, especially inherited docs that still describe the Japanese app
- Bug reports with a clear reproduction

There are three trainings (Letters, Codes, Spelling) and four modes (pick, reverse pick, input, reverse input). Most changes land in one of those.

## Setup

Node 24 LTS is a safe choice. npm comes with it.

```bash
git clone https://github.com/<your-username>/FiveByFive.git
cd FiveByFive
git remote add upstream https://github.com/frteddz/FiveByFive.git
npm install
npm run dev
```

Open http://localhost:3000.

## Before you open a pull request

```bash
npm run check          # TypeScript and ESLint
npm run test           # Vitest
npm run format:check   # Prettier
```

If you changed translations, also run `npm run i18n:check`. Do not use `npm run build` as a quick check. It is slow and does not tell you anything the commands above do not.

## Making changes

Create a branch for your work:

```bash
git checkout -b fix/phrase-typo
```

Keep commits focused. Use [Conventional Commits](https://www.conventionalcommits.org/):

```
fix(codes): correct the spelling of juliett
docs(readme): clarify the three trainings
feat(spelling): add more words to level four
```

Husky and lint-staged are configured in this repo. A commit will run ESLint and Prettier over staged files and block the commit if they fail.

Some naming is inherited from upstream: `kana`, `kanji`, `vocabulary`, and localStorage keys beginning with `kanadojo`. Do not rename those in a content fix. Renaming them can break saved progress and is a separate piece of work.

## Pull requests

For external contributors the normal flow applies: push your branch to your fork and open a pull request against `main` on [frteddz/FiveByFive](https://github.com/frteddz/FiveByFive). Say what changed and how you checked it. Small, focused PRs get reviewed faster.

The repo owner commits requested changes directly to `main`. That is the standing workflow for owner-requested work, not a shortcut for outside contributors.

## Where code lives

[docs/ARCHITECTURE.md](./docs/ARCHITECTURE.md) covers the folder layout. In short: routes in `app/`, training modules in `features/`, reusable domain helpers in `entities/`, shared code in `shared/`, infrastructure and i18n in `core/`. Match the surrounding style, import through `@/...` aliases, and keep feature internals private to the feature.
