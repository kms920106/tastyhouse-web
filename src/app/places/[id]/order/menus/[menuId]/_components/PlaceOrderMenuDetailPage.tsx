import BorderedSection from '@/components/ui/BorderedSection'
import { ImageGallerySkeleton } from '@/components/ui/ImageGallerySkeleton'
import SectionStack from '@/components/ui/SectionStack'
import { Suspense } from 'react'
import PlaceOrderMenuDetailHeader from './PlaceOrderMenuDetailHeader'
import PlaceOrderMenuDetailBannerContent from './PlaceOrderMenuDetailBannerContent'
import { PlaceOrderMenuDetailInfoSkeleton } from './PlaceOrderMenuDetailInfoSkeleton'
import PlaceOrderMenuDetailInfoServer from './PlaceOrderMenuDetailInfoServer'
import { PlaceOrderMenuDetailOptionSelectorSkeleton } from './PlaceOrderMenuDetailOptionSelectorSkeleton'
import PlaceOrderMenuDetailOptionSelectorServer from './PlaceOrderMenuDetailOptionSelectorServer'
import type { ProductOrderMenuDetailTab } from './PlaceOrderMenuDetailProductOptionTabs'

interface Props {
  placeId: number
  productId: number
  initialTab: ProductOrderMenuDetailTab
}

export default function PlaceOrderMenuDetailPage({ placeId, productId, initialTab }: Props) {
  return (
    <>
      <PlaceOrderMenuDetailHeader placeId={placeId} productId={productId} />
      <SectionStack>
        <BorderedSection>
          <Suspense fallback={<ImageGallerySkeleton />}>
            <PlaceOrderMenuDetailBannerContent productId={productId} />
          </Suspense>
          <Suspense fallback={<PlaceOrderMenuDetailInfoSkeleton />}>
            <PlaceOrderMenuDetailInfoServer productId={productId} />
          </Suspense>
        </BorderedSection>
        <BorderedSection>
          <Suspense fallback={<PlaceOrderMenuDetailOptionSelectorSkeleton />}>
            <PlaceOrderMenuDetailOptionSelectorServer
              productId={productId}
              placeId={placeId}
              initialTab={initialTab}
            />
          </Suspense>
        </BorderedSection>
      </SectionStack>
    </>
  )
}
