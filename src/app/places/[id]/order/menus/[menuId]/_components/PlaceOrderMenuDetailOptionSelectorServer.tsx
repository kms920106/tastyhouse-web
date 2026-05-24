import FetchErrorState from '@/components/ui/FetchErrorState'
import { COMMON_ERROR_MESSAGES } from '@/constants/errors'
import { productRepository } from '@/domains/product/product.repository'
import type { ProductOrderMenuDetailTab } from './PlaceOrderMenuDetailProductOptionTabs'
import PlaceOrderMenuDetailProductOptionTabs from './PlaceOrderMenuDetailProductOptionTabs'

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
  const { error, data } = await productRepository.getProductReviewCount(productId)

  if (error || !data) {
    return <FetchErrorState message={COMMON_ERROR_MESSAGES.API_FETCH_ERROR} />
  }

  const { reviewCount } = data

  return (
    <PlaceOrderMenuDetailProductOptionTabs
      productId={productId}
      placeId={placeId}
      reviewCount={reviewCount}
      tab={tab}
    />
  )
}
