import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import ProductReel from '@/components/ProductReel'
import {
  Button,
  buttonVariants,
} from '@/components/ui/button'
import {
  ArrowDownToLine,
  CheckCircle,
  Leaf,
} from 'lucide-react'
import Link from 'next/link'


// Daftar keuntungan
const perks = [
  {
    name: 'Kemudahan',
    Icon: ArrowDownToLine,
    description:
      'Dapatkan aset Anda langsung dikirimkan ke email Anda dalam hitungan detik dan unduh langsung.',
  },
  {
    name: 'Kualitas Tinggi',
    Icon: CheckCircle,
    description:
      'Setiap aset di platform kami diverifikasi oleh tim kami untuk memastikan standar kualitas tertinggi kami. Tidak puas? Kami menawarkan jaminan pengembalian dana selama 30 hari.',
  },
  {
    name: 'Untuk Planet Bumi',
    Icon: Leaf,
    description:
      "Kami telah berkomitmen untuk menyumbangkan 1% dari penjualan kami untuk pelestarian dan restorasi lingkungan alam.",
  },
]


// Komponen halaman utama
export default function Home() {
  return (
    <>
    {/* Wrapper untuk konten halaman dengan lebar maksimum */}
      <MaxWidthWrapper>
        <div className='py-20 mx-auto text-center flex flex-col items-center max-w-3xl'>
          <h1 className='text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl'>
            Platform terbaik untuk aset digital,{' '}
            <span className='text-blue-600'>
            Berkualitas
            </span>
            .
          </h1>
          <p className='mt-6 text-lg max-w-prose text-muted-foreground'>
            Selamat datang di RumahJualDesign. Platform terbaik untuk aset digital berkualitas.
          </p>
          <div className='flex flex-col sm:flex-row gap-4 mt-6'>
            <Link
              href='/products'
              className={buttonVariants()}>
              Sedang Trending
            </Link>
            <Button variant='ghost'>
              Janji Kualitas &rarr;
            </Button>
          </div>
        </div>

        <ProductReel
          query={{ sort: 'desc', limit: 4 }}
          href='/products?sort=recent'
          title='Terbaru di Upload'
        />

        <ProductReel
          query={{ sort: 'desc', limit: 4, category:'icons' }}
          href='/products?category=icons&sort=desc'
          title='Kumpulan Icon'
        />

        <ProductReel
          query={{ sort: 'desc', limit: 4, category:'ui_kits' }}
          href='/products?category=ui_kits&sort=desc'
          title='Kumpulan UI Kits'
        />
      </MaxWidthWrapper>

      <section className='border-t border-gray-200 bg-gray-50'>
        <MaxWidthWrapper className='py-20'>
          <div className='grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-3 lg:gap-x-8 lg:gap-y-0'>
            {/* Looping untuk menampilkan setiap keuntungan */}
            {perks.map((perk) => (
              <div
                key={perk.name}
                className='text-center md:flex md:items-start md:text-left lg:block lg:text-center'>
                <div className='md:flex-shrink-0 flex justify-center'>
                  <div className='h-16 w-16 flex items-center justify-center rounded-full bg-blue-100 text-blue-900'>
                    {<perk.Icon className='w-1/3 h-1/3' />}
                  </div>
                </div>

                <div className='mt-6 md:ml-4 md:mt-0 lg:ml-0 lg:mt-6'>
                  <h3 className='text-base font-medium text-gray-900'>
                    {perk.name}
                  </h3>
                  <p className='mt-3 text-sm text-muted-foreground'>
                    {perk.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </MaxWidthWrapper>
      </section>
    </>
  )
}
