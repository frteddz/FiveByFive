# Gemini guide

FiveByFive is a NATO/ICAO phonetic alphabet trainer forked from [lingdojo/kana-dojo](https://github.com/lingdojo/kana-dojo). The engine and UI are upstream. The content is new. Maintained at [github.com/frteddz/FiveByFive](https://github.com/frteddz/FiveByFive).

Read [AGENTS.md](./AGENTS.md) for the full rules. They apply here unchanged.

Short version:

- Next.js 16, React 19, TypeScript strict, Tailwind 4, Zustand 5, next-intl, Vitest.
- Three trainings: Letters, Codes, Spelling. Four modes: pick, reverse pick, input, reverse input.
- Verify with `npm run check` and `npm run test`. Do not use `npm run build` for verification.
- Keep logic inside `features/`. Import via `@/...` aliases and feature entrypoints. No cross-feature internals.
- Do not rename inherited `kana`, `kanji`, `vocabulary` or `kanadojo` identifiers as part of unrelated work. Existing saved progress depends on some of them.
- Conventional commits. Owner requested changes go straight to `main` unless a PR is asked for.
- Docs: no em dashes, no emojis, no invented facts.
