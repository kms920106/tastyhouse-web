'use client'

import AppPrimaryButton from '@/components/ui/AppPrimaryButton'
import ConfirmModal from '@/components/ui/ConfirmModal'
import SectionStack from '@/components/ui/SectionStack'
import StickyFooter from '@/components/ui/StickyFooter'
import type { ProductOptionGroup } from '@/domains/product'
import { useCartAction } from '@/hooks/useCartAction'
import { useProductOptionSelection } from '@/hooks/useProductOptionSelection'
import { useSearchParams } from 'next/navigation'
import PlaceOrderMenuDetailOptionList from './PlaceOrderMenuDetailOptionList'

interface Props {
  productId: number
  placeId: number
  optionGroups: ProductOptionGroup[]
}

export default function PlaceOrderMenuDetailOptionForm({
  productId,
  placeId,
  optionGroups,
}: Props) {
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
