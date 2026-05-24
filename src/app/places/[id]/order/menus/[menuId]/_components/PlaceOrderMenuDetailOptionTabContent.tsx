'use client'

import FetchErrorState from '@/components/ui/FetchErrorState'
import { COMMON_ERROR_MESSAGES } from '@/constants/errors'
import { useProductOptions } from '@/domains/product/product.hook'
import PlaceOrderMenuDetailOptionForm from './PlaceOrderMenuDetailOptionForm'
import { PlaceOrderMenuDetailOptionSelectorSkeleton } from './PlaceOrderMenuDetailOptionSelectorSkeleton'

interface Props {
  productId: number
  placeId: number
}

export default function PlaceOrderMenuDetailOptionTabContent({ productId, placeId }: Props) {
  const { data, isLoading, error } = useProductOptions(productId)

  if (isLoading) return <PlaceOrderMenuDetailOptionSelectorSkeleton />
  if (error) return <FetchErrorState message={COMMON_ERROR_MESSAGES.API_FETCH_ERROR} />
  if (!data?.data)
    return <FetchErrorState message={COMMON_ERROR_MESSAGES.FETCH_ERROR('옵션 정보')} />

  return (
    <PlaceOrderMenuDetailOptionForm
      productId={productId}
      placeId={placeId}
      optionGroups={data.data.optionGroups}
    />
  )
}
