import BorderedSection from '@/components/ui/BorderedSection'
import { ImageGallerySkeleton } from '@/components/ui/ImageGallerySkeleton'
import SectionStack from '@/components/ui/SectionStack'
import { Suspense } from 'react'
import PlaceOrderMenuDetailHeader from './PlaceOrderMenuDetailHeader'
import PlaceOrderMenuDetailBannerContent from './PlaceOrderMenuDetailBannerContent'
import { ProductInfoSkeleton } from '@/components/products/ProductInfoSkeleton'
import ProductInfoContent from '@/components/products/ProductInfoContent'
import { PlaceOrderMenuDetailOptionSelectorSkeleton } from './PlaceOrderMenuDetailOptionSelectorSkeleton'
import PlaceOrderMenuDetailOptionSelectorServer from './PlaceOrderMenuDetailOptionSelectorServer'
import type { ProductOrderMenuDetailTab } from './PlaceOrderMenuDetailProductOptionTabs'

interface Props {
  placeId: number
  productId: number
  tab: ProductOrderMenuDetailTab
}

export default function PlaceOrderMenuDetailPage({ placeId, productId, tab }: Props) {
  return (
    <>
      <PlaceOrderMenuDetailHeader placeId={placeId} productId={productId} />
      <SectionStack>
        <BorderedSection>
          <Suspense fallback={<ImageGallerySkeleton />}>
            <PlaceOrderMenuDetailBannerContent productId={productId} />
          </Suspense>
          <Suspense fallback={<ProductInfoSkeleton />}>
            <ProductInfoContent productId={productId} />
          </Suspense>
        </BorderedSection>
        <BorderedSection>
          <Suspense fallback={<PlaceOrderMenuDetailOptionSelectorSkeleton />}>
            <PlaceOrderMenuDetailOptionSelectorServer
              productId={productId}
              placeId={placeId}
              tab={tab}
            />
          </Suspense>
        </BorderedSection>
      </SectionStack>
    </>
  )
}
