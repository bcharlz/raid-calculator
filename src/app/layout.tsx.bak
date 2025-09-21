import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '@/styles/globals.css';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'RAID Calculator | Synology, QNAP, ZFS — Capacity & IOPS',
  description: 'Instant RAID 0/1/5/6/10 capacity, efficiency, and IOPS. Synology, QNAP, ZFS profiles. Generate shareable links and an embeddable widget.',
  keywords: [
    'RAID calculator',
    'storage calculator',
    'RAID capacity',
    'RAID performance',
    'IOPS calculator',
    'Synology',
    'QNAP',
    'ZFS',
    'NAS calculator',
    'disk array calculator'
  ],
  authors: [{ name: 'RAID Calculator Team' }],
  creator: 'RAID Calculator',
  publisher: 'RAID Calculator',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://raidcalculator.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'RAID Calculator | Synology, QNAP, ZFS — Capacity & IOPS',
    description: 'Instant RAID 0/1/5/6/10 capacity, efficiency, and IOPS. Synology, QNAP, ZFS profiles. Generate shareable links and an embeddable widget.',
    url: 'https://raidcalculator.com',
    siteName: 'RAID Calculator',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'RAID Calculator - Capacity & Performance Tool',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'RAID Calculator | Synology, QNAP, ZFS — Capacity & IOPS',
    description: 'Instant RAID 0/1/5/6/10 capacity, efficiency, and IOPS. Synology, QNAP, ZFS profiles. Generate shareable links and an embeddable widget.',
    images: ['/og-image.png'],
    creator: '@raidcalculator',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        {/* Preload critical fonts */}
        <link
          rel="preload"
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap"
          as="style"
        />
        
        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        
        {/* Theme color */}
        <meta name="theme-color" content="#3b82f6" />
        <meta name="msapplication-TileColor" content="#3b82f6" />
        
        {/* Google AdSense */}
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1234567890123456"
          crossOrigin="anonymous"
        />
        
        {/* Structured data for organization */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebApplication',
              name: 'RAID Calculator',
              description: 'Free RAID capacity and performance calculator for storage arrays',
              url: 'https://raidcalculator.com',
              applicationCategory: 'UtilityApplication',
              operatingSystem: 'Web Browser',
              offers: {
                '@type': 'Offer',
                price: '0',
                priceCurrency: 'USD',
              },
              creator: {
                '@type': 'Organization',
                name: 'RAID Calculator Team',
              },
              featureList: [
                'RAID 0/1/5/6/10 calculations',
                'Capacity and efficiency estimation',
                'IOPS performance modeling',
                'Vendor presets (Synology, QNAP, ZFS)',
                'Shareable configuration links',
                'Embeddable widget',
              ],
            }),
          }}
        />
      </head>
      <body className="min-h-screen bg-gradient-diagonal">
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-1 pt-16 lg:pt-20">
            {children}
          </main>
          <Footer />
        </div>
        
        {/* Analytics placeholder */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // Analytics code would go here
              console.log('RAID Calculator loaded');
            `,
          }}
        />
      </body>
    </html>
  );
}

