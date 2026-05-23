'use client'

import AppPrimaryButton from '@/components/ui/AppPrimaryButton'
import ConfirmModal from '@/components/ui/ConfirmModal'
import FetchErrorState from '@/components/ui/FetchErrorState'
import SectionStack from '@/components/ui/SectionStack'
import StickyFooter from '@/components/ui/StickyFooter'
import { COMMON_ERROR_MESSAGES } from '@/constants/errors'
import type { ProductOptionGroup } from '@/domains/product'
import { useProductOptions } from '@/domains/product/product.hook'
import { useCartAction } from '@/hooks/useCartAction'
import { useProductOptionSelection } from '@/hooks/useProductOptionSelection'
import { useSearchParams } from 'next/navigation'
import { PlaceOrderMenuDetailOptionSelectorSkeleton } from './PlaceOrderMenuDetailOptionSelectorSkeleton'
import PlaceOrderMenuDetailOptionList from './PlaceOrderMenuDetailOptionList'

interface OptionFormProps {
  productId: number
  placeId: number
  optionGroups: ProductOptionGroup[]
}

function PlaceOrderMenuDetailOptionForm({ productId, placeId, optionGroups }: OptionFormProps) {
  const searchParams = useSearchParams()
  const isOptionsTab = (searchParams.get('tab') ?? 'options') === 'options'

  const { selectedOptions, handleRadioSelect, handleCheckboxToggle, getSelectedOptionsData } =
    useProductOptionSelection(optionGroups)

  const { showPlaceChangeModal, handleAddToCart, handleConfirmPlaceChange, onCancelPlaceChange } =
    useCartAction({ productId, placeId, optionGroups, selectedOptions, getSelectedOptionsData })

  return (
    <>
      <SectionStack>
        <PlaceOrderMenuDetailOptionList
          optionGroups={optionGroups}
          selectedOptions={selectedOptions}
          onRadioSelect={handleRadioSelect}
          onCheckboxToggle={handleCheckboxToggle}
        />
      </SectionStack>
      {isOptionsTab && (
        <StickyFooter>
          <div className="px-[15px] py-2.5 bg-[#f9f9f9]">
            <AppPrimaryButton onClick={handleAddToCart}>장바구니 담기</AppPrimaryButton>
          </div>
        </StickyFooter>
      )}
      <ConfirmModal
        open={showPlaceChangeModal}
        description="가게를 변경하실 경우 장바구니에 담은 메뉴가 삭제됩니다."
        onConfirm={handleConfirmPlaceChange}
        onCancel={onCancelPlaceChange}
      />
    </>
  )
}

interface Props {
  productId: number
  placeId: number
}

export default function PlaceOrderMenuDetailOptionTabClient({ productId, placeId }: Props) {
  const { data, isLoading, error } = useProductOptions(productId)

  if (isLoading) return <PlaceOrderMenuDetailOptionSelectorSkeleton />
  if (error) return <FetchErrorState message={COMMON_ERROR_MESSAGES.API_FETCH_ERROR} />
  if (!data?.data) return <FetchErrorState message={COMMON_ERROR_MESSAGES.FETCH_ERROR('옵션 정보')} />

  return (
    <PlaceOrderMenuDetailOptionForm
      productId={productId}
      placeId={placeId}
      optionGroups={data.data.optionGroups}
    />
  )
}
