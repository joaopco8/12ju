import type { Metadata } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import '@/styles/globals.css'
import SplashScreen from '@/components/SplashScreen'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  style: ['normal', 'italic'],
})

export const metadata: Metadata = {
  title: 'NossoFlix',
  description: 'Nossa história, nossos momentos.',
  themeColor: '#0A0A0A',
  viewport: 'width=device-width, initial-scale=1, viewport-fit=cover',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className={`${inter.variable} ${playfair.variable} font-sans bg-background text-white antialiased`}>
        <SplashScreen />
        <main className="min-h-screen max-w-2xl mx-auto">
          {children}
        </main>
      </body>
    </html>
  )
}
