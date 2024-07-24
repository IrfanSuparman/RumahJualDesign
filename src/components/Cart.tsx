"use client"

import { formatPrice } from "@/lib/utils"
import { ShoppingCart } from "lucide-react"
import Link from 'next/link'
import { buttonVariants } from "./ui/button"
import { Separator } from "./ui/separator"
import { Sheet, SheetContent, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet"
import Image from 'next/image'
import { useCart } from "@/hooks/use-cart"
import { ScrollArea } from './ui/scroll-area'
import CartItem from "./CartItem"
import { useEffect, useState } from "react"



const Cart = () => {

    const {items} = useCart()
    const itemCount = items.length

    const  [isMounted, setIsMounted] = useState<boolean>(false)

    useEffect(() => {
      setIsMounted(true)
    }, [])

    const carTotal = items.reduce((total, {product}) => total + product.price, 0)
    const fee = 100
    return ( <Sheet>
        <SheetTrigger className="group -m-2 flex item-center p-2"><ShoppingCart aria-hidden="true" className="h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500"/>
        <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800"> {isMounted ? itemCount : 0}</span>
        </SheetTrigger>
        <SheetContent className="flex w-full flex-col pr-0 sm:max-w-lg">
            <SheetHeader className="space-y-2.5 pr-6">
                <SheetTitle>Keranjang({itemCount})</SheetTitle>
            </SheetHeader>

            {itemCount > 0 ? (
                <>
                <div className="flex w-full flex-col pr-6">
                  <ScrollArea>
                    {items.map(({product}) => (
                      <CartItem product = {product} key={product.id} />
                    ))}
                    </ScrollArea>
                </div>
                <div className="space-y-4 pr-6">
                    <Separator />
                    <div className="space-y-1.5 text-sm">
                        <div className="flex">
                            <span className="flex-1">Pengiriman</span>
                            <span>Gratis</span>
                        </div>
                        <div className="flex">
                            <span className="flex-1">Transaction Fee</span>
                            <span>{formatPrice(fee)}</span>
                        </div>
                        <div className="flex">
                            <span className="flex-1">Total</span>
                            <span>{formatPrice(carTotal + fee)}</span>
                        </div>
                    </div>

                    <SheetFooter>
                <SheetTrigger asChild>
                  <Link
                    href='/cart'
                    className={buttonVariants({
                      className: 'w-full',
                    })}>
                    Lanjutkan untuk Checkout
                  </Link>
                </SheetTrigger>
              </SheetFooter>
                </div>
                </>

            ) : (
                <div className='flex h-full flex-col items-center justify-center space-y-1'>
                <div
                aria-hidden='true'
                className='relative mb-4 h-60 w-60 text-muted-foreground'>
                <Image
                    src='/hippo-empty-cart.png'
                    fill
                    alt='empty shopping cart hippo'
                />
            </div>
            <div className='text-xl font-semibold'>
              Keranjang kamu Kosong
            </div>
            <SheetTrigger asChild>
              <Link
                href='/products'
                className={buttonVariants({
                  variant: 'link',
                  size: 'sm',
                  className:
                    'text-sm text-muted-foreground',
                })}>
                Tambahkan item ke keranjang untuk Checkout
              </Link>
            </SheetTrigger>
            </div>
            )}
        </SheetContent>
    </Sheet>
    )
}

export default Cart