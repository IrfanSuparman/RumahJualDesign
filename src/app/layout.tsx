import Navbar from '@/components/Navbar'
import Providers from '@/components/Providers'
import { cn, constructMetadata } from '@/lib/utils'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Toaster } from 'sonner'
import './globals.css'
import Footer from '@/components/Footer'


// Mendefinisikan font Inter dengan subset Latin
const inter = Inter({ subsets: ['latin'] })

// Membangun metadata untuk halaman
export const metadata = constructMetadata()

// Komponen RootLayout
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en' className='h-full'>
      <body // Menambahkan kelas dinamis ke body
        className={cn(
          'relative h-full font-sans antialiased',
          inter.className
        )}>
        <main className='relative flex flex-col min-h-screen'>
          <Providers>
            {/*@ts-ignore*/}
            <Navbar />
            <div className='flex-grow flex-1'>
              {/* Menampilkan konten dari props children */}
              {children}
            </div>
            <Footer />
          </Providers>
        </main>
        {/* Menampilkan komponen Toaster untuk notifikasi */}
        <Toaster position='top-center' richColors />
      </body>
    </html>
  )
}
