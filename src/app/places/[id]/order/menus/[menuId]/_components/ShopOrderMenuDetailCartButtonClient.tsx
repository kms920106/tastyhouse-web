'use client'

import { getCartItemCount } from '@/lib/cart'
import { useEffect, useState } from 'react'
import ShopOrderMenuDetailCartButton from './ShopOrderMenuDetailCartButton'

interface Props {
  shopId: number
}

export default function ShopOrderMenuDetailCartButtonClient({ shopId }: Props) {
  const [cartItemCount, setCartItemCount] = useState(0)

  useEffect(() => {
    setCartItemCount(getCartItemCount())
  }, [shopId])

  return <ShopOrderMenuDetailCartButton shopId={shopId} count={cartItemCount} />
}
