import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Lovebird - Meet Your Flock',
  description: 'Premium dating experience with iOS 26 liquid glass design. Connect, chat, and find meaningful relationships.',
  generator: 'Lovebird',
  keywords: 'dating, relationships, chat, connect, premium, iOS, glassmorphism',
  authors: [{ name: 'Lovebird Team' }],
  creator: 'Lovebird',
  publisher: 'Lovebird',
  robots: 'index, follow',
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
    viewportFit: 'cover',
  },
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#f5f5f7' },
  ],
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Lovebird',
  },
  formatDetection: {
    telephone: false,
  },
  other: {
    'mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'default',
    'apple-touch-fullscreen': 'yes',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="overflow-x-hidden">

      <body className="antialiased font-sans overflow-x-hidden">
        <div className="min-h-screen bg-gradient-to-b from-white via-titanium-light to-titanium-mid">
          {children}
        </div>
      </body>
    </html>
  )
}
