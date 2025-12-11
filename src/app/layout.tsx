import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Providers } from '@/components/Providers'
import { Navigation } from '@/components/Navigation'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Upepo Bookclub - Books that move with the wind',
  description: 'Ideas that expand the mind. A reading ecosystem for personal growth, community, and transformation.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <Navigation />
          <main className="min-h-screen">
            {children}
          </main>
          <footer className="bg-gray-900 text-white py-12 mt-20">
            <div className="container mx-auto px-4 text-center">
              <p className="text-xl mb-2">Upepo Bookclub</p>
              <p className="text-gray-400">Books that move with the wind, ideas that expand the mind</p>
              <p className="text-sm text-gray-500 mt-4">© {new Date().getFullYear()} Upepo Ecosystem. All rights reserved.</p>
            </div>
          </footer>
        </Providers>
      </body>
    </html>
  )
}
