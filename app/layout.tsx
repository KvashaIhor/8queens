import type { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

export const metadata: Metadata = {
  title: '8Queens',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <link
          rel="preload"
          href="/balatro.otf"
          as="font"
          type="font/otf"
          crossOrigin="anonymous"
        />
        <link rel="icon" href="/queen.png" type="image/png" />
        <link rel="apple-touch-icon" href="/queen.png" />
      </head>
      <body className="font-sans">
        {children}
        <Analytics />
      </body>
    </html>
  )
}
