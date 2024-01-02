import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Navbar from './ui/Navbar'
import { ReduxProvider } from './redux/provider'
import { AuthProvider } from './context/AuthProvider'
import NextThemeProvider from './ThemeProvider/provider'
import AppSessionProvider from './SessionProvider/provider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    template: "%s - Post ur stuff",
    default: "Post ur stuff",
  },
  description: "For no reason",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className='light' style={{ colorScheme: 'light' }}>
      <body className={`${inter.className}`}>
        <NextThemeProvider>
          <AuthProvider>
            <ReduxProvider>
              <AppSessionProvider>
                <Navbar />
                {children}
              </AppSessionProvider>
            </ReduxProvider>
          </AuthProvider>
        </NextThemeProvider>
      </body>
    </html>
  )
}
