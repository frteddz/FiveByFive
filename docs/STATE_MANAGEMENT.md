# State management

FiveByFive uses Zustand 5. The setup is inherited from [lingdojo/kana-dojo](https://github.com/lingdojo/kana-dojo), including several localStorage keys that still say `kanadojo`. Those keys hold real user progress, so they are kept.

## Where stores live

- `features/<Feature>/store/use<Feature>Store.ts` for state owned by one feature
- `shared/store/` for state used across features

If exactly one feature needs the state, keep it in that feature. Promote it to `shared/` only when a second feature needs it.

## Pattern

Stores are created with `create` and usually wrapped in `persist` from `zustand/middleware` when the state must survive a reload.

```ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface ExampleState {
  selectedMode: string;
  setSelectedMode: (mode: string) => void;
}

const useExampleStore = create<ExampleState>()(
  persist(
    set => ({
      selectedMode: 'Pick',
      setSelectedMode: selectedMode => set({ selectedMode }),
    }),
    { name: 'example-storage' },
  ),
);

export default useExampleStore;
```

In components, subscribe to the smallest slice you need:

```ts
const selectedMode = useExampleStore(state => state.selectedMode);
const setSelectedMode = useExampleStore(state => state.setSelectedMode);
```

Selecting the whole store causes needless re-renders. Pick fields individually.

## Store inventory

These are the stores in the repo today, grouped by what they do.

Training content and settings:

- `features/Kana/store/useKanaStore.ts`
- `features/Kanji/store/useKanjiStore.ts`
- `features/Vocabulary/store/useVocabStore.ts`

Preferences and appearance:

- `features/Preferences/store/usePreferencesStore.ts`
- `features/Preferences/store/useCustomThemeStore.ts`
- `features/Preferences/store/useCustomWallpaperStore.ts`
- `features/Preferences/store/useGoalTimersStore.ts`

Progress and stats:

- `features/Progress/store/useSetProgressStore.ts`
- `features/Progress/store/useStatsStore.ts`
- `features/Progress/store/useAutoLearningStore.ts`
- `features/Progress/store/useVisitStore.ts`

Caches:

- `features/Kanji/store/useKanjiCacheStore.ts`
- `features/Vocabulary/store/useVocabCacheStore.ts`

Other feature stores:

- `features/Achievements/store/useAchievementStore.ts`
- `features/Conjugator/store/useConjugatorStore.ts`
- `features/CrazyMode/store/useCrazyModeStore.ts`
- `features/Translator/store/useTranslatorStore.ts`

Cross-feature stores in `shared/store/`:

- `useClassicSessionStore`, `useDecorationsStore`, `useGauntletSettingsStore`, `useOnboardingStore`
- `shared/ui-composite/Menu/store/useMenuSelectorStore.ts`

The names `Kana`, `Kanji` and `Vocabulary` map to the Letters, Codes and Spelling trainings. They were not renamed in the fork.

## Persistence keys

Persisted stores write to localStorage under these names, among others:

| Key | Store |
| --- | --- |
| `kanadojo` | set progress |
| `kanadojo-stats` | statistics |
| `kanadojo-achievements` | achievements |
| `kanadojo-custom-themes` | custom themes |
| `kanadojo-custom-wallpapers-meta` | wallpaper metadata |
| `kanadojo-goal-timers` | goal timers |
| `kanadojo-auto-learning` | auto learning settings |
| `theme-storage` | preferences |
| `vocabulary-storage` | vocabulary settings |
| `kanji-cache`, `vocab-cache` | dataset caches |
| `welcome-storage` | onboarding |

Changing one of these keys or the shape of the stored data will make existing users lose saved progress. Treat a migration as a deliberate change with a fallback for old data.

## Rules

- Do not import another feature's store directly. Export what you need from that feature's `index.ts` or move the state to `shared/store/` if it is genuinely shared.
- Persist only state that should survive a reload. Transient UI state such as a loading flag usually belongs in component state.
- Keep mutations in store actions so the logic is testable without rendering a component.
- Be careful with localStorage during server rendering. Persisted values are only available on the client, so avoid reading them in a Server Component. Components in this repo handle that with a mount check in places.
- Tests for stores live beside them or under `__tests__/`. Run them with `npm run test`.
