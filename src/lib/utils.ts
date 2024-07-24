import { type ClassValue, clsx } from 'clsx'
import { Metadata } from 'next'
import { twMerge } from 'tailwind-merge'
import { number } from 'zod'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatPrice(
  price: number | string,
  options: {
    currency?: 'IDR' | 'EUR' | 'GBP' | 'USD'
    notation?: Intl.NumberFormatOptions['notation']
  } = {}
) {
  const { currency = 'IDR', notation = 'standard' } = options

  const numericPrice =
    typeof price === 'string' ? parseFloat(price) : price

  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency,
    notation,
    maximumFractionDigits: 0,
  }).format(numericPrice)
}

export function constructMetadata({
  title = 'RumahJualDesign - Indonesia',
  description = 'RumahJualDesign adalah Platform Digital Assets Berkualitas Tinggi',
  image = '/thumbnail.png',
  icons = '/favicon.ico',
  noIndex = false,
}: {
  title?: string
  description?: string
  image?: string
  icons?: string
  noIndex?: boolean
} = {}): Metadata {
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [
        {
          url: image,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
      creator: '@rumahjualdesign',
    },
    icons,
    metadataBase: new URL('https://digitalhippo.up.railway.app'),
    ...(noIndex && {
      robots: {
        index: false,
        follow: false,
      },
    }),
  }
}
