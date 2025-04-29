import React from 'react'
import type { Metadata } from 'next'
import './globals.css'
import { ThemeProvider } from 'next-themes'
import ThemeSwitch from '@/components/theme-switch'

export const metadata: Metadata = {
  title: 'v0 App',
  description: 'Created with v0',
  generator: 'v0.dev',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <ThemeProvider attribute="class">
        <body className="flex flex-col min-h-screen">
          <header className="p-4 flex items-center">
            <h1 className="text-xl font-bold">Medical Dashboard</h1>
            <ThemeSwitch />
          </header>
          <main className="flex-1">{children}</main>
        </body>
      </ThemeProvider>
    </html>
  )
}
