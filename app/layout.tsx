import { Inter } from 'next/font/google'

import ToasterContext from './context/ToasterContext'

import type { Metadata } from 'next'

import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Chat App',
  description: 'Chat aplication',
}

export default function RootLayout ({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={ inter.className }>
        <ToasterContext />
        { children }
      </body>
    </html>
  )
}
