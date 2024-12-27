import './globals.css' 
import type { Metadata } from 'next'
import Navbar from './components/Navbar'
import favicon from './favicon.ico'
import Footer from './components/Footer'
import React from 'react'

export const metadata : Metadata = {
  title: 'SkulZ - Home',
  description: 'Website portofolio SkulZ',
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
