import BorderedSection from '@/components/ui/BorderedSection'
import { ImageGallerySkeleton } from '@/components/ui/ImageGallerySkeleton'
import SectionStack from '@/components/ui/SectionStack'
import { Suspense } from 'react'
import ProductDetailBannerContent from './ProductDetailBannerContent'
import ProductDetailHeader from './ProductDetailHeader'
import { ProductInfoSkeleton } from '@/components/products/ProductInfoSkeleton'
import ProductInfoContent from '@/components/products/ProductInfoContent'
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
          <Suspense fallback={<ProductInfoSkeleton />}>
            <ProductInfoContent productId={productId} />
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
