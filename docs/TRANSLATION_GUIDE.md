# Translation guide

FiveByFive uses next-intl with namespace JSON files. This is upstream machinery from [lingdojo/kana-dojo](https://github.com/lingdojo/kana-dojo). The structure is unchanged, so the existing tooling still works.

## Where files live

```
core/i18n/locales/
  en/
    common.json
    navigation.json
    settings.json
    ...
  es/
  fr/
  zh/
  de/
```

There are also flat files such as `en.json`, `es.json` and `zh.json` at the locale root. They are inherited from upstream. The namespace folders under `core/i18n/locales/<locale>/` are what `core/i18n/request.ts` loads.

Which locales are active is declared in `core/i18n/routing.ts` and `core/i18n/config.ts`. Those two files disagree at the moment, so check both before assuming a language is live. `routing.ts` is the one next-intl uses at runtime.

## Namespaces

`core/i18n/request.ts` keeps the list of namespaces it loads. At the time of writing it includes:

```
common, navigation, kana, kanji, vocabulary, achievements,
statistics, settings, errors, menuInfo, blog, translator,
metadata, faq, practiceLanding, welcome, experiments,
legal, kanaChart, conjugator, resources
```

The names `kana`, `kanji` and `vocabulary` are upstream leftovers. They back the Letters, Codes and Spelling screens respectively. Do not rename a namespace without updating `request.ts`, every locale folder and every caller.

## Workflow

1. Pick a namespace. `common.json` and `navigation.json` are good small starts.
2. Open the same file in your language folder and in `en/`. English is the reference.
3. Translate the values. Leave every key, nesting level and `{{placeholder}}` untouched.
4. Run the checks:

```bash
npm run i18n:validate        # key parity across languages
npm run i18n:config:check    # config sanity
npm run i18n:generate-types  # regenerate types
```

Or run all three with `npm run i18n:check`.

5. Commit the JSON files.

## Interpolation

Placeholders use double braces. A value like `"score": "Score: {{points}}"` is called with a `points` argument. If you drop the placeholder or rename it in one language, that language breaks at runtime. Keep the exact spelling of every variable.

## Adding a key

Add it to every locale file for that namespace, not just English. The validator compares key sets, so a partial addition will fail the check. If a string exists only for one language on purpose, that is a sign it should not be in the shared namespace.

## Adding a namespace

Create `<namespace>.json` in every locale folder, then add the namespace to `NAMESPACES` in `core/i18n/request.ts` and run `npm run i18n:check`.

## Content versus copy

Do not translate code words or radio phrases. `alfa`, `juliett`, `roger` and `mayday` are the material being trained and live in data files such as `features/Kana/data/kana.ts` and the JSON datasets under `public/`. Translating them would change the answers.

What does need translating is the surrounding UI: instructions, mode names, result screens, settings and metadata. Be aware that several locale files still contain upstream text about Japanese learning. Updating that text is part of the fork work.

## Style

Write short, direct strings. Match the voice of the existing English file rather than the polished tone of a marketing page. No emojis, and no em dashes. Those are repo rules for all written content, including UI copy.
