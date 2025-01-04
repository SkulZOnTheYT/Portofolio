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
  description: 'Website portofolio SkulZ',
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
    <html lang="en" suppressHydrationWarning>
      <link rel="shortcut icon" href={favicon.src} />
      <body>
          <Navbar />
            {children}
          <Footer />
      </body>
    </html>
  )
}
