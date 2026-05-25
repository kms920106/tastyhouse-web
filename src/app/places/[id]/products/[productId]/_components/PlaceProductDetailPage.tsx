import { ProductHeaderSkeleton } from '@/components/products/ProductHeaderSkeleton'
import ProductInfoContent from '@/components/products/ProductInfoContent'
import { ProductInfoSkeleton } from '@/components/products/ProductInfoSkeleton'
import BorderedSection from '@/components/ui/BorderedSection'
import { ImageGallerySkeleton } from '@/components/ui/ImageGallerySkeleton'
import SectionStack from '@/components/ui/SectionStack'
import { Suspense } from 'react'
import PlaceProductDetailBannerContent from './PlaceProductDetailBannerContent'
import PlaceProductDetailHeader from './PlaceProductDetailHeader'
import PlaceProductDetailOrderFooter from './PlaceProductDetailOrderFooter'
import PlaceProductDetailReviewCountServer from './PlaceProductDetailReviewCountServer'
import { PlaceProductDetailReviewCountSkeleton } from './PlaceProductDetailReviewCountSkeleton'

interface Props {
  placeId: number
  productId: number
}

export default function PlaceProductDetailPage({ placeId, productId }: Props) {
  return (
    <>
      <Suspense fallback={<ProductHeaderSkeleton />}>
        <PlaceProductDetailHeader productId={productId} />
      </Suspense>
      <SectionStack>
        <BorderedSection>
          <Suspense fallback={<ImageGallerySkeleton />}>
            <PlaceProductDetailBannerContent productId={productId} />
          </Suspense>
          <Suspense fallback={<ProductInfoSkeleton />}>
            <ProductInfoContent productId={productId} />
          </Suspense>
        </BorderedSection>
        <BorderedSection>
          <Suspense fallback={<PlaceProductDetailReviewCountSkeleton />}>
            <PlaceProductDetailReviewCountServer productId={productId} />
          </Suspense>
        </BorderedSection>
      </SectionStack>
      <PlaceProductDetailOrderFooter placeId={placeId} />
    </>
  )
}
