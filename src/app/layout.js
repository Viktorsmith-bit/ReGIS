import { Poppins } from 'next/font/google'
import './globals.css'

const poppins = Poppins({weight: ['400','500'], subsets: ['latin'] })

export const metadata = {
  title: 'ReGIS 3.0 - Walsh Perú',
  description: 'ReGIS-Walsh Perú',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={poppins.className}>{children}</body>
    </html>
  )
}
