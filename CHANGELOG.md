# Changelog

Notable changes to FiveByFive, a fork of [lingdojo/kana-dojo](https://github.com/lingdojo/kana-dojo). This changelog starts with the fork. For upstream history, see the original repository.

Format follows [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

## [Unreleased]

Content and branding work is still in progress. Some inherited docs, metadata strings and internal identifiers still describe the Japanese app.

## [0.1.0]

First FiveByFive release.

### Added

- Letters training for the 26 NATO/ICAO code words
- Codes training for radio phrases, split across five levels
- Spelling training that asks for a word to be spelled with code words
- Accepted common spelling variants alongside ICAO spellings, such as `alpha` for `alfa` and `juliet` for `juliett`
- English documentation for the fork, including architecture, state management, translation and deployment guides

### Changed

- Training content replaced: the Japanese kana, kanji and vocabulary material is now phonetic alphabet and radio material
- Project renamed and attributed to [frteddz/FiveByFive](https://github.com/frteddz/FiveByFive), with credit retained for [lingdojo/kana-dojo](https://github.com/lingdojo/kana-dojo)
- The four original game modes (pick, reverse pick, input, reverse input) continue to run on the inherited engine

### Notes

The upstream engine and UI are intact. Route folders, store keys and config constants still carry upstream names such as `kana`, `kanji`, `vocabulary` and `kanadojo`. Those names are kept on purpose because saved progress and existing links depend on them. Renaming them is a separate migration.
