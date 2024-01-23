import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({style:['normal'], subsets: ['latin'] })

export const metadata = {
  title: 'ReGIS 3.0 - Walsh Perú',
  description: 'ReGIS-Walsh Perú',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
