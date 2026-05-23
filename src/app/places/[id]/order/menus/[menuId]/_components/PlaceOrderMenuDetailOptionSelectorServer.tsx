import FetchErrorState from '@/components/ui/FetchErrorState'
import { COMMON_ERROR_MESSAGES } from '@/constants/errors'
import { productRepository } from '@/domains/product/product.repository'
import PlaceOrderMenuDetailOptionSelector from './PlaceOrderMenuDetailOptionSelector'
import type { ProductOrderMenuDetailTab } from './PlaceOrderMenuDetailProductOptionTabs'

interface Props {
  productId: number
  placeId: number
  initialTab: ProductOrderMenuDetailTab
}

export default async function PlaceOrderMenuDetailOptionSelectorServer({
  productId,
  placeId,
  initialTab,
}: Props) {
  const [optionsResult, reviewCountResult] = await Promise.all([
    productRepository.getProductOptions(productId),
    productRepository.getProductReviewCount(productId),
  ])

  if (optionsResult.error || !optionsResult.data) {
    return <FetchErrorState message={COMMON_ERROR_MESSAGES.FETCH_ERROR('옵션 정보')} />
  }

  const optionGroups = optionsResult.data.optionGroups
  const reviewCount = reviewCountResult.data?.reviewCount ?? 0

  return (
    <PlaceOrderMenuDetailOptionSelector
      productId={productId}
      placeId={placeId}
      optionGroups={optionGroups}
      reviewCount={reviewCount}
      initialTab={initialTab}
    />
  )
}
