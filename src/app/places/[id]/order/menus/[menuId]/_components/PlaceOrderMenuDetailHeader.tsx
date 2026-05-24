import Header, { HeaderLeft, HeaderRight } from '@/components/layouts/Header'
import { BackButton, CartButton } from '@/components/layouts/header-parts'
import { ProductHeaderSkeleton } from '@/components/products/ProductHeaderSkeleton'
import { Suspense } from 'react'
import PlaceOrderMenuDetailHeaderServer from './PlaceOrderMenuDetailHeaderServer'

interface Props {
  placeId: number
  productId: number
}

export default function PlaceOrderMenuDetailHeader({ placeId, productId }: Props) {
  return (
    <Header variant="white" height={55}>
      <HeaderLeft>
        <BackButton />
      </HeaderLeft>
      <HeaderRight>
        <Suspense fallback={<ProductHeaderSkeleton />}>
          <PlaceOrderMenuDetailHeaderServer placeId={placeId} productId={productId} />
        </Suspense>
        <CartButton placeId={placeId} />
      </HeaderRight>
    </Header>
  )
}
