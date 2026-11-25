import type { Metadata } from 'next';
import { routing } from '@/core/i18n/routing';
import { DemoPage } from '@/features/Demo';

export function generateStaticParams() {
  return routing.locales.map(locale => ({ locale }));
}

export const revalidate = 3600;

export const metadata: Metadata = {
  title: 'Demo - Try Code Word Drills',
  description:
    'Try a short demo game. Match each NATO code word with its letter and get instant feedback.',
};

export default DemoPage;
