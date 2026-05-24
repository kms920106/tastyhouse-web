import BorderedSection from '@/components/ui/BorderedSection'
import { ImageGallerySkeleton } from '@/components/ui/ImageGallerySkeleton'
import SectionStack from '@/components/ui/SectionStack'
import { Suspense } from 'react'
import ProductDetailBannerContent from './ProductDetailBannerContent'
import ProductDetailHeader from './ProductDetailHeader'
import { ProductDetailInfoSkeleton } from './ProductDetailInfoSkeleton'
import ProductDetailInfoContent from './ProductDetailInfoContent'
import { ProductDetailReviewCountSkeleton } from './ProductDetailReviewCountSkeleton'
import ProductDetailReviewCountServer from './ProductDetailReviewCountServer'
import ProductDetailPlaceFooter from './ProductDetailPlaceFooter'

interface Props {
  productId: number
}

export default function ProductDetailPage({ productId }: Props) {
  return (
    <>
      <ProductDetailHeader productId={productId} />
      <SectionStack>
        <BorderedSection>
          <Suspense fallback={<ImageGallerySkeleton />}>
            <ProductDetailBannerContent productId={productId} />
          </Suspense>
          <Suspense fallback={<ProductDetailInfoSkeleton />}>
            <ProductDetailInfoContent productId={productId} />
          </Suspense>
        </BorderedSection>
        <BorderedSection>
          <Suspense fallback={<ProductDetailReviewCountSkeleton />}>
            <ProductDetailReviewCountServer productId={productId} />
          </Suspense>
        </BorderedSection>
      </SectionStack>
      <Suspense fallback={null}>
        <ProductDetailPlaceFooter productId={productId} />
      </Suspense>
    </>
  )
}
