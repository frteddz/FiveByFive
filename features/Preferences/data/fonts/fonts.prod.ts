import {
  Inter,
  Roboto,
  Lora,
  JetBrains_Mono,
  Nunito,
  Space_Grotesk,
  DM_Sans,
  Outfit,
  Work_Sans,
} from 'next/font/google';

const inter = Inter({
  weight: ['400'],
  subsets: ['latin'],
  display: 'swap',
  preload: true,
  fallback: ['system-ui', 'sans-serif'],
});

const roboto = Roboto({
  weight: ['400'],
  subsets: ['latin'],
  display: 'swap',
  preload: false,
  fallback: ['system-ui', 'sans-serif'],
});

const lora = Lora({
  weight: ['400'],
  subsets: ['latin'],
  display: 'swap',
  preload: false,
  fallback: ['system-ui', 'sans-serif'],
});

const jetBrainsMono = JetBrains_Mono({
  weight: ['400'],
  subsets: ['latin'],
  display: 'swap',
  preload: false,
  fallback: ['system-ui', 'sans-serif'],
});

const nunito = Nunito({
  weight: ['400'],
  subsets: ['latin'],
  display: 'swap',
  preload: false,
  fallback: ['system-ui', 'sans-serif'],
});

const spaceGrotesk = Space_Grotesk({
  weight: ['400'],
  subsets: ['latin'],
  display: 'swap',
  preload: false,
  fallback: ['system-ui', 'sans-serif'],
});

const dmSans = DM_Sans({
  weight: ['400'],
  subsets: ['latin'],
  display: 'swap',
  preload: false,
  fallback: ['system-ui', 'sans-serif'],
});

const outfit = Outfit({
  weight: ['400'],
  subsets: ['latin'],
  display: 'swap',
  preload: false,
  fallback: ['system-ui', 'sans-serif'],
});

const workSans = Work_Sans({
  weight: ['400'],
  subsets: ['latin'],
  display: 'swap',
  preload: false,
  fallback: ['system-ui', 'sans-serif'],
});

const fonts = [
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
    name: 'Outfit',
    font: outfit,
  },
  {
    name: 'Work Sans',
    font: workSans,
  },
];

export default fonts;
