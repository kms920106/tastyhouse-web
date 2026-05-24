import Header, { HeaderLeft, HeaderRight } from '@/components/layouts/Header'
import { BackButton } from '@/components/layouts/header-parts'
import { Suspense } from 'react'
import { ProductDetailHeaderSkeleton } from './ProductDetailHeaderSkeleton'
import ProductDetailHeaderServer from './ProductDetailHeaderServer'

interface Props {
  productId: number
}

export default function ProductDetailHeader({ productId }: Props) {
  return (
    <Header variant="white" height={55}>
      <HeaderLeft>
        <BackButton />
      </HeaderLeft>
      <HeaderRight>
        <Suspense fallback={<ProductDetailHeaderSkeleton />}>
          <ProductDetailHeaderServer productId={productId} />
        </Suspense>
      </HeaderRight>
    </Header>
  )
}
