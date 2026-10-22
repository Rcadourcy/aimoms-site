import type { Metadata } from 'next';
import Script from 'next/script';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Analytics from '@/components/Analytics';

export const metadata: Metadata = {
  metadataBase: new URL('https://aimoms.ai'),
  title: 'ai.moms™ — Your Entry Into AI. For Moms.',
  description:
    'ai.moms™ is the #1 destination for moms to learn AI so she can get her time back and learn to build her dreams. Start with the Foundations course.',
  icons: { icon: '/favicon.svg' },
  openGraph: {
    title: 'ai.moms™ — Your Entry Into AI. For Moms.',
    description:
      'The #1 destination for moms to learn AI so she can get her time back and learn to build her dreams.',
    type: 'website',
    url: 'https://aimoms.ai',
    images: ['/og-share.jpg'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ai.moms™ — Your Entry Into AI. For Moms.',
    description:
      'The #1 destination for moms to learn AI so she can get her time back and learn to build her dreams.',
    images: ['/og-share.jpg'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Outfit:wght@300..900&family=Be+Vietnam+Pro:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@1,500;1,700;1,900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        {/* Pixel queue stub: captures fbq() calls before consent; Analytics replays them. */}
        <Script id="fbq-queue" strategy="beforeInteractive">
          {`window._fbqQueue=window._fbqQueue||[];window.fbq=window.fbq||function(){window._fbqQueue.push(arguments);};window._fbq=window.fbq;`}
        </Script>
        <Header />
        {children}
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
