# UI design

The UI is inherited from [lingdojo/kana-dojo](https://github.com/lingdojo/kana-dojo). FiveByFive changes the content, not the look and feel. This document covers how styling is set up so changes fit in instead of fighting it.

## Stack

- Tailwind CSS 4 with `@tailwindcss/postcss`
- CSS custom properties for theme colours
- shadcn-style primitives configured in `components.json` (New York style, CSS variables on)
- Radix UI primitives underneath dialogs, popovers, selects and tooltips
- `lucide-react` as the configured icon library, plus FontAwesome icons in some inherited components
- Framer Motion for animation, canvas-confetti for celebration effects

## Where UI code lives

| Path | Use |
| --- | --- |
| `shared/ui/components/` | shadcn-style primitives |
| `shared/ui-composite/` | assembled UI: menus, game pieces, layout, SEO, error boundaries |
| `features/<Feature>/components/` | UI owned by one feature |
| `widgets/` | page-level composition across features |
| `app/globals.css` | global styles and theme variables |
| `public/` | images, sounds, wallpapers and static data |

Put a component in `shared/` only when more than one feature uses it. Otherwise keep it inside the feature.

## Theming

Theme colours are CSS variables referenced through Tailwind arbitrary values, for example `bg-(--main-color)`, `text-(--background-color)` and `border-(--secondary-color-accent)`. You will see this pattern in `features/MainMenu/index.tsx`. Read the variables from `app/globals.css` before adding a new colour, and use an existing variable when one fits.

Preferences for themes, wallpapers and visual effects live in `features/Preferences/`. The relevant persisted stores are `usePreferencesStore`, `useCustomThemeStore`, `useCustomWallpaperStore` and `useGoalTimersStore`. Their localStorage keys still carry the `kanadojo` prefix from upstream.

When adding a themed surface, follow these rules:

- Use CSS variables, not hardcoded hex values, for anything that should follow the theme
- Check both light and dark themes
- Check glass mode, since some components are skipped or swapped in that mode
- Keep corners mostly sharp or subtly rounded. Pills are for things that actually read as pills, not every button

## Conditional classes

Use `cn()` from `@/shared/utils/utils`. It combines `clsx` and `tailwind-merge`, so later classes override earlier ones instead of producing conflicting CSS.

```tsx
import { cn } from '@/shared/utils/utils';

<button
  className={cn(
    'border-b-8 transition-all',
    isActive ? 'border-(--main-color-accent)' : 'border-(--secondary-color-accent)',
  )}
>
  {label}
</button>
```

## Responsive layout

Tailwind breakpoints are the default tool. Some components also use `react-responsive` through `useMediaQuery`, as in the main menu. Use CSS first. Reach for JS only when the layout genuinely changes component behaviour.

Meanings change between screen sizes in this app. A tile grid on desktop becomes a compressed row on mobile. Check the training screens at narrow widths before calling a UI change done.

## Training screens

The three trainings share the inherited game components: pick, reverse pick, input and reverse input. Reuse those components instead of building a new answer surface for new content. Answer checking has its own helpers in `features/Kana/lib/`, including input normalisation so accepted spellings such as `alpha` and `alfa` both pass.

Audio feedback uses the hooks under `shared/hooks/generic/useAudio`. Sounds are served from `/sounds/` with long-lived cache headers set in `vercel.json`.

## Accessibility basics

- Keep keyboard interaction working. Tile selection and shortcuts are part of the existing flow.
- Do not remove focus styles.
- Give icon-only buttons a readable label.
- Text should have enough contrast in every theme, including glass mode.
- Do not use emojis as the only indicator of state. The repo owner's writing rules apply to UI copy too.

## Content copy

User-facing strings belong in namespace JSON files under `core/i18n/locales/`. Code words and radio phrases are content data and stay in the data files. Do not run ICAO code words through the translation system.

Some locale files still contain upstream copy about Hiragana, Katakana and Japanese learning. That text is being replaced. If you touch a screen and see it, fix the string in the matching namespace rather than hardcoding a replacement in the component.
