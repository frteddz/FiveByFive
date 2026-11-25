import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import './globals.css';
import '@fortawesome/fontawesome-svg-core/styles.css';
import GoogleAnalytics from '@/core/analytics/GoogleAnalytics';
// Performance rescue: Microsoft Clarity is intentionally disabled for now.
// import MSClarity from '@/core/analytics/MSClarity';
import {
  StructuredData,
  fiveByFiveSchema,
} from '@/shared/ui-composite/SEO/StructuredData';
import { Metadata, Viewport } from 'next';
import Script from 'next/script';
import SessionPrefetch from '@/shared/ui-composite/Performance/SessionPrefetch';

const googleVerificationToken = process.env.GOOGLE_VERIFICATION_TOKEN || '';
const msVerificationToken = process.env.MS_VERIFICATION_TOKEN || '';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1.0,
  maximumScale: 5.0,
  userScalable: true,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#000000' },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL('https://fivebyfive.vercel.app'),
  manifest: '/manifest.json',
  title: {
    default: 'FiveByFive - Learn the NATO Phonetic Alphabet',
    template: '%s | FiveByFive',
  },
  description:
    'Learn Alpha, Bravo, Charlie and every ICAO code word with typing drills. Practice letters, radio phrases and callsign spelling with instant feedback.',
  icons: {
    icon: [
      { url: '/favicon.ico?v=2' },
      { url: '/favicon.ico?v=2', sizes: '16x16', type: 'image/x-icon' },
      { url: '/favicon.ico?v=2', sizes: '32x32', type: 'image/x-icon' },
    ],
    shortcut: '/favicon.ico?v=2',
    apple: '/favicon.ico?v=2',
  },
  verification: {
    google: googleVerificationToken,
    other: {
      'msvalidate.01': msVerificationToken,
      'msapplication-TileColor': '#667eea',
      'msapplication-config': '/browserconfig.xml',
    },
  },
  keywords: [
    'NATO phonetic alphabet',
    'ICAO code words',
    'radio phrase training',
    'callsign spelling',
    'learn Alpha Bravo Charlie',
    'phonetic alphabet practice',
    'radiotelephony phrases',
    'letter code word drills',
    'spelling with code words',
    'typing drills for code words',
  ],
  authors: [{ name: 'frteddz', url: 'https://fivebyfive.vercel.app' }],
  creator: 'frteddz',
  publisher: 'frteddz',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: 'FiveByFive - Learn the NATO Phonetic Alphabet',
    description:
      'Learn Alpha, Bravo, Charlie and every ICAO code word with typing drills, radio phrase practice and callsign spelling.',
    url: 'https://fivebyfive.vercel.app',
    siteName: 'FiveByFive',
    type: 'website',
    locale: 'en_US',
    alternateLocale: ['es_ES'],
  },
  twitter: {
    card: 'summary',
    title: 'FiveByFive - Learn the NATO Phonetic Alphabet',
    description:
      'Practice ICAO code words, radio phrases and callsign spelling with typing drills.',
  },
  alternates: {
    canonical: 'https://fivebyfive.vercel.app',
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  category: 'education',
};

// Move analytics condition to a constant to avoid repeated evaluation
const isAnalyticsEnabled =
  process.env.NODE_ENV === 'production' &&
  process.env.ANALYTICS_DISABLED !== 'true';

const isAdSenseEnabled =
  process.env.NODE_ENV === 'production' &&
  process.env.NEXT_PUBLIC_VERCEL_ENV === 'production';

interface RootLayoutProps {
  readonly children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  const locale = 'en';

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <StructuredData data={fiveByFiveSchema} />
        {/* DNS prefetch for external domains - resolve DNS early */}
        {isAnalyticsEnabled && (
          <>
            <link rel='dns-prefetch' href='https://www.googletagmanager.com' />
            <link rel='dns-prefetch' href='https://www.clarity.ms' />
            <link rel='dns-prefetch' href='https://vercel-analytics.com' />
            <link
              rel='dns-prefetch'
              href='https://vitals.vercel-insights.com'
            />
          </>
        )}
        <link rel='dns-prefetch' href='https://translation.googleapis.com' />
        {/* Preconnect to critical domains - establish early connections */}
        {isAnalyticsEnabled && (
          <>
            <link
              rel='preconnect'
              href='https://www.googletagmanager.com'
              crossOrigin='anonymous'
            />
            <link
              rel='preconnect'
              href='https://vercel-analytics.com'
              crossOrigin='anonymous'
            />
          </>
        )}
        <link
          rel='preconnect'
          href='https://translation.googleapis.com'
          crossOrigin='anonymous'
        />
        {isAdSenseEnabled && (
          <Script
            async
            src='https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5494430364707020'
            crossOrigin='anonymous'
            strategy='afterInteractive'
          />
        )}
      </head>
      <body>
        <SessionPrefetch />
        {isAnalyticsEnabled && (
          <>
            <GoogleAnalytics />
            {/* <MSClarity /> */}
            <Analytics />
            <SpeedInsights />
          </>
        )}
        {children}
      </body>
    </html>
  );
}
