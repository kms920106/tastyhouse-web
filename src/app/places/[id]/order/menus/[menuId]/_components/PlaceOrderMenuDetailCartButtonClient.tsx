'use client'

import { getCartItemCount } from '@/lib/cart'
import { useEffect, useState } from 'react'
import PlaceOrderMenuDetailCartButton from './PlaceOrderMenuDetailCartButton'

interface Props {
  placeId: number
}

export default function PlaceOrderMenuDetailCartButtonClient({ placeId }: Props) {
  const [cartItemCount, setCartItemCount] = useState(0)

  useEffect(() => {
    setCartItemCount(getCartItemCount())
  }, [placeId])

  return <PlaceOrderMenuDetailCartButton placeId={placeId} count={cartItemCount} />
}
