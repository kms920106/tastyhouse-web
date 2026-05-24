import Header, { HeaderLeft, HeaderRight } from '@/components/layouts/Header'
import { BackButton } from '@/components/layouts/header-parts'
import { ProductHeaderSkeleton } from '@/components/products/ProductHeaderSkeleton'
import { Suspense } from 'react'
import PlaceProductDetailHeaderServer from './PlaceProductDetailHeaderServer'

interface Props {
  productId: number
}

export default function PlaceProductDetailHeader({ productId }: Props) {
  return (
    <Header variant="white" height={55}>
      <HeaderLeft>
        <BackButton />
      </HeaderLeft>
      <HeaderRight>
        <Suspense fallback={<ProductHeaderSkeleton />}>
          <PlaceProductDetailHeaderServer productId={productId} />
        </Suspense>
      </HeaderRight>
    </Header>
  )
}
