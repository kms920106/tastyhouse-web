import FetchErrorState from '@/components/ui/FetchErrorState'
import { COMMON_ERROR_MESSAGES } from '@/constants/errors'
import { productRepository } from '@/domains/product/product.repository'
import PlaceOrderMenuDetailProductOptionTabs from './PlaceOrderMenuDetailProductOptionTabs'
import type { ProductOrderMenuDetailTab } from './PlaceOrderMenuDetailProductOptionTabs'

interface Props {
  productId: number
  placeId: number
  tab: ProductOrderMenuDetailTab
}

export default async function PlaceOrderMenuDetailOptionSelectorServer({
  productId,
  placeId,
  tab,
}: Props) {
  const reviewCountResult = await productRepository.getProductReviewCount(productId)

  if (reviewCountResult.error) {
    return <FetchErrorState message={COMMON_ERROR_MESSAGES.API_FETCH_ERROR} />
  }

  const reviewCount = reviewCountResult.data?.reviewCount ?? 0

  return (
    <PlaceOrderMenuDetailProductOptionTabs
      productId={productId}
      placeId={placeId}
      reviewCount={reviewCount}
      tab={tab}
    />
  )
}
