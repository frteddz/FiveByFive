<div align="center">
  
# FiveByFive



[![License: AGPL-3.0](https://img.shields.io/badge/License-AGPL--3.0-blue.svg)](./LICENSE.md)
[![GitHub stars](https://img.shields.io/github/stars/frteddz/FiveByFive?style=flat)](https://github.com/frteddz/FiveByFive/stargazers)
[![GitHub issues](https://img.shields.io/github/issues/frteddz/FiveByFive)](https://github.com/frteddz/FiveByFive/issues)
[![GitHub pull requests](https://img.shields.io/github/issues-pr/frteddz/FiveByFive)](https://github.com/frteddz/FiveByFive/pulls)
[![GitHub last commit](https://img.shields.io/github/last-commit/frteddz/FiveByFive)](https://github.com/frteddz/FiveByFive/commits/main)

[![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-Strict-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Vitest](https://img.shields.io/badge/Tested_with-Vitest-6E9F18?logo=vitest&logoColor=white)](https://vitest.dev/)



A trainer for the NATO/ICAO phonetic alphabet. Learn the code words (Alpha, Bravo, Charlie and the rest), the radio phrases that go with them, and how to spell a word out loud so the other person gets it right the first time.

FiveByFive is a fork of [lingdojo/kana-dojo](https://github.com/lingdojo/kana-dojo). The training engine and the UI are the upstream work, largely intact. What changed is the content: the Japanese learning material has been replaced with aviation and radio alphabet material. Credit for the original app goes to the lingdojo team and the kana-dojo contributors.

Maintained by [@frteddz](https://github.com/frteddz). Source: [github.com/frteddz/FiveByFive](https://github.com/frteddz/FiveByFive).

## What you train on

There are three trainings.

**Letters** drills the 26 code words. You see a letter and recall its code word, or you see a code word and recall the letter. The data uses ICAO spellings, so `alfa` has one `l` and `juliett` has two `t`. The common spellings (`alpha`, `juliet`) are accepted as correct answers too.

**Codes** covers radio phrases. Think `roger`, `wilco`, `mayday`, `say again`, `hold`, `clearance`. The phrases are split across five levels so you can work through them in steps instead of all at once.

**Spelling** gives you a word and asks you to spell it with code words. `WHEAT` becomes `whiskey hotel echo alfa tango`. The word lists keep their upstream filenames and field names, but the entries now carry code-word spellings.

## Game modes

All three trainings use the same four modes inherited from the upstream engine.

| Mode | What you do |
| --- | --- |
| Pick | See a prompt, choose the right answer from options |
| Reverse pick | See an answer, choose the matching prompt |
| Input | See a prompt, type the answer |
| Reverse input | See an answer, type the prompt |

The mode is a per-training preference, so you can switch between recognition and recall without leaving the app.

## Tech stack

- Next.js 16 with App Router and Turbopack
- React 19
- TypeScript in strict mode
- Tailwind CSS 4
- Zustand 5 for state, with localStorage persistence
- next-intl for translations
- Vitest for tests

The folder layout is feature based: `app/` for routes, `features/` for training modules, `entities/` for domain helpers, `shared/` for reusable code, `core/` for i18n and infrastructure, `widgets/` for cross-feature composition. See [docs/ARCHITECTURE.md](./docs/ARCHITECTURE.md) for the details.

## Run it locally

Use a recent Node LTS release. Node 24 works.

```bash
git clone https://github.com/frteddz/FiveByFive.git
cd FiveByFive
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Useful commands:

```bash
npm run check          # TypeScript + ESLint
npm run test           # Vitest, single run
npm run test:watch     # Vitest, watch mode
npm run lint           # ESLint only
npm run format         # Prettier, writes files
npm run format:check   # Prettier, no writes
npm run i18n:check     # translation config, keys, generated types
```

Avoid `npm run build` for a quick sanity check. It is slow and it does not validate anything that `npm run check` and `npm run test` do not already cover.

If something breaks during setup, start with [docs/TROUBLESHOOTING.md](./docs/TROUBLESHOOTING.md).

## Contributing

If GitHub itself is new to you, [docs/CONTRIBUTING-BEGINNERS.md](./docs/CONTRIBUTING-BEGINNERS.md) walks through fork, clone, commit and pull request. Otherwise [CONTRIBUTING.md](./CONTRIBUTING.md) covers the normal workflow.

Content changes are welcome: better phrase coverage, extra accepted spellings, more spelling words, translation fixes. The code is still marked up with some upstream names (`kana`, `kanji`, `vocabulary`) because the engine was inherited. Do not rename those paths as part of a content change. That is a separate job.

## Docs

| Doc | What is in it |
| --- | --- |
| [Architecture](./docs/ARCHITECTURE.md) | Folder layout, boundaries, where to put new code |
| [UI design](./docs/UI_DESIGN.md) | Styling, theming and component conventions |
| [State management](./docs/STATE_MANAGEMENT.md) | Stores, persistence, what belongs where |
| [Translation guide](./docs/TRANSLATION_GUIDE.md) | i18n files, namespaces, scripts |
| [Troubleshooting](./docs/TROUBLESHOOTING.md) | Common setup and dev problems |
| [Deploy a fork on Vercel](./docs/VERCEL_PERSONAL_DEPLOYMENT.md) | Personal deployment walkthrough |
| [Beginner contributing](./docs/CONTRIBUTING-BEGINNERS.md) | First pull request, step by step |

Some inherited docs in `docs/` still describe the original Japanese app. They are being updated. When in doubt, read the source.

## License

AGPL-3.0. See [LICENSE.md](./LICENSE.md). The upstream project keeps its own license and attribution.

## Disclosure 

I used AI for parts that i do not have experience with. the rest of the code comes from [lingdojo/kana-dojo](https://github.com/lingdojo/kana-dojo)
</div>
