import VerifyEmail from '@/components/VerifyEmail'
import Image from 'next/image'


// Tipe data untuk parameter pencarian
interface PageProps {
  searchParams: {
    [key: string]: string | string[] | undefined
  }
}

const VerifyEmailPage = ({ searchParams }: PageProps) => {
  const token = searchParams.token // Mendapatkan token dari parameter pencarian
  const toEmail = searchParams.to  // Mendapatkan email tujuan dari parameter pencarian

  return (
    <div className='container relative flex pt-20 flex-col items-center justify-center lg:px-0'>
      <div className='mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]'>
        {/* Jika token tersedia dan merupakan string */}
        {token && typeof token === 'string' ? (
          <div className='grid gap-6'>
            {/* @ts-expect-error */}
            <VerifyEmail token={token} />
          </div>
        ) : (
          <div className='flex h-full flex-col items-center justify-center space-y-1'>
            <div className='relative mb-4 h-60 w-60 text-muted-foreground'>
              <Image
                src='/hippo-email-sent.png'
                fill
                alt='hippo email sent image'
              />
            </div>

            <h3 className='font-semibold text-2xl'>
              Check Email Kamu
            </h3>

            {toEmail ? (
              <p className='text-muted-foreground text-center'>
                Kami mengirimkan link verifikasi ke{' '}
                <span className='font-semibold'>
                  {toEmail}
                </span>
                .
              </p>
            ) : (
              <p className='text-muted-foreground text-center'>
                Kami mengirimkan link verifikasi ke
                email.
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default VerifyEmailPage
