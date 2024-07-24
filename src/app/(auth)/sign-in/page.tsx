'use client'

import { Icons } from '@/components/Icons'
import {
  Button,
  buttonVariants,
} from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'
import { zodResolver } from '@hookform/resolvers/zod'
import { ArrowRight, Loader2 } from 'lucide-react'
import Link from 'next/link'
import { useForm } from 'react-hook-form'

import {
  AuthCredentialsValidator,
  TAuthCredentialsValidator,
} from '@/lib/validators/account-credentials-validator'
import { trpc } from '@/trpc/client'
import { toast } from 'sonner'
import { ZodError } from 'zod'
import { useRouter, useSearchParams } from 'next/navigation'

const Page = () => {
  const searchParams = useSearchParams() // Menggunakan useSearchParams untuk mendapatkan parameter dari URL
  const router = useRouter() // Menggunakan useRouter untuk manajemen routing di Next.js
  const isSeller = searchParams.get('as') === 'seller' // Mendapatkan informasi apakah pengguna adalah penjual
  const origin = searchParams.get('origin') // Mendapatkan informasi origin dari parameter URL

  // Fungsi untuk melanjutkan sebagai penjual
  const continueAsSeller = () => {
    router.push('?as=seller') // Mengarahkan ke halaman dengan parameter '?as=seller'
  }

  // Fungsi untuk melanjutkan sebagai pembeli
  const continueAsBuyer = () => {
    router.replace('/sign-in', undefined) // Mengarahkan ke halaman '/sign-in'
  }

  // Menggunakan useForm untuk manajemen formulir dengan resolusi Zod
  const {
    register, // Mendaftarkan input formulir
    handleSubmit, // Menangani submit formulir
    formState: { errors }, // Mendapatkan kesalahan formulir
  } = useForm<TAuthCredentialsValidator>({
    resolver: zodResolver(AuthCredentialsValidator), // Menggunakan zodResolver untuk validasi dengan skema Zod
  })

  // Menggunakan trpc untuk memanggil mutasi signIn dari API autentikasi
  const { mutate: signIn, isLoading } =
    trpc.auth.signIn.useMutation({
      // Definisi aksi ketika mutasi berhasil
      onSuccess: async () => {
        toast.success('Berhasil Masuk Ke Akun Anda') // Menampilkan notifikasi sukses

        router.refresh() // Me-refresh halaman

        // Redirect ke halaman origin jika ada
        if (origin) {
          router.push(`/${origin}`)
          return
        }

        // Redirect ke halaman 'sell' jika pengguna adalah penjual
        if (isSeller) {
          router.push('/sell')
          return
        }

        // Redirect ke halaman utama jika tidak ada origin atau pengguna bukan penjual
        router.push('/')
      },
      // Definisi aksi ketika mutasi gagal
      onError: (err) => {
        // Menampilkan pesan kesalahan jika kode status adalah 'UNAUTHORIZED'
        if (err.data?.code === 'UNAUTHORIZED') {
          toast.error('Email atau Password Salah')
        }
      },
    })

  // Fungsi yang dijalankan ketika formulir disubmit
  const onSubmit = ({
    email,
    password,
  }: TAuthCredentialsValidator) => {
    signIn({ email, password }) // Memanggil mutasi signIn dengan kredensial yang dimasukkan
  }

  return (
    <>
      <div className='container relative flex pt-20 flex-col items-center justify-center lg:px-0'>
        <div className='mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]'>
          <div className='flex flex-col items-center space-y-2 text-center'>
            <Icons.logo className='h-20 w-20' />
            <h1 className='text-2xl font-semibold tracking-tight'>
              Masuk ke Akun {isSeller ? 'seller' : ''}{' '} 
              Kamu
            </h1>

            <Link
              className={buttonVariants({
                variant: 'link',
                className: 'gap-1.5',
              })}
              href='/sign-up'>
              Belum punya Akun? Daftar sekarang {/* Tombol untuk mendaftar */}
              <ArrowRight className='h-4 w-4' />
            </Link>
          </div>

          <div className='grid gap-6'>
            <form onSubmit={handleSubmit(onSubmit)}> {/* Formulir untuk masuk */}
              <div className='grid gap-2'>
                <div className='grid gap-1 py-2'>
                  <Label htmlFor='email'>Email</Label>
                  <Input
                    {...register('email')}
                    className={cn({
                      'focus-visible:ring-red-500':
                        errors.email,
                    })}
                    placeholder='Silahkan isi email kamu'
                  />
                  {/* Menampilkan pesan kesalahan jika ada kesalahan validasi pada email */}
                  {errors?.email && ( 
                    <p className='text-sm text-red-500'>
                      {errors.email.message}
                    </p>
                  )}
                </div>

                <div className='grid gap-1 py-2'>
                  <Label htmlFor='password'>Password</Label> {/* Label input password */}
                  <Input
                    {...register('password')} // Menghubungkan input dengan useForm
                    type='password'
                    className={cn({
                      'focus-visible:ring-red-500':
                        errors.password, 
                    })}
                    placeholder='Masukan Password'
                  />
                  {/* Menampilkan pesan kesalahan jika ada kesalahan validasi pada password */}
                  {errors?.password && ( 
                    <p className='text-sm text-red-500'>
                      {errors.password.message}
                    </p>
                  )}
                </div>

                <Button disabled={isLoading}>
                {/* Menampilkan ikon loading jika sedang memuat */}
                  {isLoading && ( 
                    <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                  )}
                  Masuk
                </Button>
              </div>
            </form>

            <div className='relative'>
              <div
                aria-hidden='true'
                className='absolute inset-0 flex items-center'>
                <span className='w-full border-t' />
              </div>
              <div className='relative flex justify-center text-xs uppercase'>
                <span className='bg-background px-2 text-muted-foreground'>
                  ATAU
                </span>
              </div>
            </div>
                    {/* Tombol untuk melanjutkan sebagai pembeli atau penjual */}
            {isSeller ? ( 
              <Button
                onClick={continueAsBuyer}
                variant='secondary'
                disabled={isLoading}>
                Lanjutkan Sebagai Pembeli
              </Button>
            ) : (
              <Button
                onClick={continueAsSeller}
                variant='secondary'
                disabled={isLoading}>
                Lanjutkan Sebagai Penjual
              </Button>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default Page
