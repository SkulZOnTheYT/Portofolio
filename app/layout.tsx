import './globals.css' 
import type { Metadata } from 'next'
import Navbar from './component/Navbar'
import favicon from './favicon.ico'
import Footer from './component/Footer'
import React from 'react'

export const metadata : Metadata = {
  title: { 
    template: '%s | SkulZ Portofolio Web', 
    default: 'Home | SkulZ Portofolio Web'
  },

  verification: {
    google: 'PRtu8BiY2B1RbWng9bn1BzbxtfEUkV7GAcoOHmQL4U0',
  },

  description: 'Website portofolio SkulZ',
  metadataBase: new URL('https://skulz.vercel.app'),
  keywords: ['skulz portofolio', 'web skulz', 'skulz', 'SkulZOnTheYT', 'sekulzeet'],
  
  robots: {
    index: false,
    follow: true,
    noarchive: true,
    googleBot: {
      index: true,
      follow: false,
      noimageindex: true,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <link rel="shortcut icon" href={favicon.src} />
      <body>
          <Navbar />
            {children}
          <Footer />
      </body>
    </html>
  )
}
