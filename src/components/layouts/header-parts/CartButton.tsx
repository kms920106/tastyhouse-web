'use client'

import { getCartItemCount } from '@/lib/cart'
import { PAGE_PATHS } from '@/lib/paths'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import HeaderIconLink from './HeaderIconLink'

interface Props {
  placeId: number
  variant?: 'white' | 'black'
}

export default function CartButton({ placeId, variant = 'black' }: Props) {
  const [cartItemCount, setCartItemCount] = useState(0)

  useEffect(() => {
    setCartItemCount(getCartItemCount())
  }, [placeId])

  return (
    <HeaderIconLink href={PAGE_PATHS.ORDER_CART(placeId)}>
      <div className="relative w-[22px] h-[22px] flex items-center justify-center">
        <Image
          src={
            variant === 'black'
              ? '/images/order/icon-cart-black.png'
              : '/images/order/icon-cart-white.png'
          }
          alt="장바구니"
          width={22}
          height={22}
          className="z-1"
        />
        <span className="absolute top-1.5 flex items-center justify-center w-4 h-4 text-[10px]">
          {cartItemCount > 99 ? '99+' : cartItemCount}
        </span>
      </div>
    </HeaderIconLink>
  )
}
