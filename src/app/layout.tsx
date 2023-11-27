import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Navbar from './ui/Navbar'
import { ReduxProvider } from './redux/provider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    template: "%s - Post ur shits",
    default: "Post ur shits",
  },
  description: "For no reason",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`bg-gray-50 ${inter.className}`}>
        <Navbar />
        <div className="mt-20">
          <ReduxProvider>
            {children}
          </ReduxProvider>
        </div>
      </body>
    </html>
  )
}
