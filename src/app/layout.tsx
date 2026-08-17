import type { Metadata, Viewport } from 'next'
import { Inter, Plus_Jakarta_Sans } from 'next/font/google'
import './globals.css'
import { Providers } from './providers'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
})

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-heading',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'IONITIX - Department of Computer Science & Engineering',
    template: '%s | IONITIX',
  },
  description: 'Official website of IONITIX - Department of Computer Science & Engineering. Events, announcements, faculty, academics, and more.',
  keywords: ['IONITIX', 'Computer Science', 'Engineering', 'Department', 'Events', 'Academics', 'Faculty'],
  authors: [{ name: 'IONITIX Department' }],
  creator: 'IONITIX',
  publisher: 'IONITIX',
  robots: 'index, follow',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://ionitix.edu',
    siteName: 'IONITIX',
    title: 'IONITIX - Department of Computer Science & Engineering',
    description: 'Official website of IONITIX - Department of Computer Science & Engineering',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'IONITIX Department',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'IONITIX - Department of Computer Science & Engineering',
    description: 'Official website of IONITIX - Department of Computer Science & Engineering',
    images: ['/og-image.png'],
  },
  verification: {
    google: 'google-site-verification-code',
  },
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0f172a' },
  ],
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${plusJakartaSans.variable}`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://fonts.gstatic.com" />
      </head>
      <body className="min-h-screen bg-background font-sans antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}