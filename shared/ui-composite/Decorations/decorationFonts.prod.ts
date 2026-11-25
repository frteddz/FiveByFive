import {
  Inter,
  Roboto,
  Lora,
  JetBrains_Mono,
  Nunito,
  Space_Grotesk,
  DM_Sans,
  Work_Sans,
} from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  weight: ['400'],
  display: 'swap',
  preload: false,
  fallback: ['system-ui', 'sans-serif'],
});

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400'],
  display: 'swap',
  preload: false,
  fallback: ['system-ui', 'sans-serif'],
});

const lora = Lora({
  subsets: ['latin'],
  weight: ['400'],
  display: 'swap',
  preload: false,
  fallback: ['system-ui', 'sans-serif'],
});

const jetBrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400'],
  display: 'swap',
  preload: false,
  fallback: ['system-ui', 'sans-serif'],
});

const nunito = Nunito({
  subsets: ['latin'],
  weight: ['400'],
  display: 'swap',
  preload: false,
  fallback: ['system-ui', 'sans-serif'],
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['400'],
  display: 'swap',
  preload: false,
  fallback: ['system-ui', 'sans-serif'],
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['400'],
  display: 'swap',
  preload: false,
  fallback: ['system-ui', 'sans-serif'],
});

const workSans = Work_Sans({
  subsets: ['latin'],
  weight: ['400'],
  display: 'swap',
  preload: false,
  fallback: ['system-ui', 'sans-serif'],
});

export const decorationFonts = [
  {
    name: 'Inter',
    font: inter,
  },
  {
    name: 'Roboto',
    font: roboto,
  },
  {
    name: 'Lora',
    font: lora,
  },
  {
    name: 'JetBrains Mono',
    font: jetBrainsMono,
  },
  {
    name: 'Nunito',
    font: nunito,
  },
  {
    name: 'Space Grotesk',
    font: spaceGrotesk,
  },
  {
    name: 'DM Sans',
    font: dmSans,
  },
  {
    name: 'Work Sans',
    font: workSans,
  },
];
