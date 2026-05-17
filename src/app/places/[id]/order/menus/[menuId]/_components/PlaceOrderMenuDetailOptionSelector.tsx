'use client'

import AppPrimaryButton from '@/components/ui/AppPrimaryButton'
import { toast } from '@/components/ui/AppToaster'
import BorderedSection from '@/components/ui/BorderedSection'
import ConfirmModal from '@/components/ui/ConfirmModal'
import StickyFooter from '@/components/ui/StickyFooter'
import type { ProductMenuOptionGroup } from '@/domains/product'
import { CartSelectedOption, addToCart, getCartPlaceId, replaceCartAndAdd } from '@/lib/cart'
import { useRouter } from 'next/navigation'
import { useCallback, useState } from 'react'
import PlaceOrderMenuDetailProductOptionTabs, {
  type ProductMenuDetailTab,
} from './PlaceOrderMenuDetailProductOptionTabs'

interface Props {
  productId: number
  placeId: number
  optionGroups: ProductMenuOptionGroup[]
  reviewCount: number
  initialTab: ProductMenuDetailTab
}

export default function PlaceOrderMenuDetailOptionSelector({
  productId,
  placeId,
  optionGroups,
  reviewCount,
  initialTab,
}: Props) {
  const router = useRouter()

  const [showPlaceChangeModal, setShowPlaceChangeModal] = useState(false)

  // 각 옵션 그룹별 선택 상태 관리
  // isMultipleSelect가 false면 단일 선택(number), true면 다중 선택(number[])
  const [selectedOptions, setSelectedOptions] = useState<Record<number, number | number[]>>(() => {
    const initial: Record<number, number | number[]> = {}
    optionGroups.forEach((group) => {
      if (group.isMultipleSelect) {
        initial[group.id] = []
      } else {
        // 기본값으로 첫 번째 옵션 선택
        const firstOption = group.options.find((opt) => !opt.isSoldOut)
        initial[group.id] = firstOption?.id ?? -1
      }
    })
    return initial
  })

  // 단일 선택 (라디오)
  const handleRadioSelect = useCallback((groupId: number, optionId: number) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [groupId]: optionId,
    }))
  }, [])

  // 다중 선택 (체크박스)
  const handleCheckboxToggle = useCallback(
    (groupId: number, optionId: number, maxSelect: number) => {
      setSelectedOptions((prev) => {
        const current = prev[groupId] as number[]
        if (current.includes(optionId)) {
          // 이미 선택된 경우 해제
          return {
            ...prev,
            [groupId]: current.filter((id) => id !== optionId),
          }
        } else {
          // 최대 선택 개수 체크
          if (current.length >= maxSelect) {
            return prev
          }
          return {
            ...prev,
            [groupId]: [...current, optionId],
          }
        }
      })
    },
    [],
  )

  // 선택된 옵션 정보 추출 (ID만)
  const getSelectedOptionsData = useCallback((): CartSelectedOption[] => {
    const result: CartSelectedOption[] = []

    optionGroups.forEach((group) => {
      const selected = selectedOptions[group.id]

      if (group.isMultipleSelect) {
        const selectedIds = selected as number[]
        selectedIds.forEach((optionId) => {
          result.push({ groupId: group.id, optionId })
        })
      } else {
        const optionId = selected as number
        if (optionId !== -1) {
          result.push({ groupId: group.id, optionId })
        }
      }
    })

    return result
  }, [optionGroups, selectedOptions])

  // 필수 옵션 검증
  const validateRequiredOptions = useCallback((): boolean => {
    const missingRequired = optionGroups.filter((group) => {
      if (!group.isRequired) return false
      const selected = selectedOptions[group.id]
      if (group.isMultipleSelect) {
        return (selected as number[]).length < group.minSelect
      }
      return selected === -1
    })

    if (missingRequired.length > 0) {
      alert(`필수 옵션을 선택해 주세요: ${missingRequired.map((g) => g.name).join(', ')}`)
      return false
    }
    return true
  }, [optionGroups, selectedOptions])

  // 실제 장바구니 추가 실행
  const executeAddToCart = useCallback(
    (replace: boolean = false) => {
      const selectedOptionsData = getSelectedOptionsData()
      const cartItem = { productId, selectedOptions: selectedOptionsData }

      if (replace) {
        replaceCartAndAdd(placeId, cartItem)
      } else {
        addToCart(placeId, cartItem)
      }

      window.dispatchEvent(new Event('cartUpdated'))
      toast('메뉴를 장바구니에 담았습니다.')
      router.back()
    },
    [productId, placeId, getSelectedOptionsData, router],
  )

  // 장바구니에 담기
  const handleAddToCart = useCallback(() => {
    if (!validateRequiredOptions()) return

    const currentCartPlaceId = getCartPlaceId()

    // 장바구니가 비어있거나 같은 가게면 바로 추가
    if (currentCartPlaceId === null || currentCartPlaceId === placeId) {
      executeAddToCart()
      return
    }

    // 다른 가게면 확인 팝업 표시
    setShowPlaceChangeModal(true)
  }, [placeId, validateRequiredOptions, executeAddToCart])

  // 가게 변경 확인
  const handleConfirmPlaceChange = useCallback(() => {
    setShowPlaceChangeModal(false)
    executeAddToCart(true)
  }, [executeAddToCart])

  return (
    <>
      <BorderedSection>
        <PlaceOrderMenuDetailProductOptionTabs
          productId={productId}
          optionGroups={optionGroups}
          reviewCount={reviewCount}
          initialTab={initialTab}
          selectedOptions={selectedOptions}
          onRadioSelect={handleRadioSelect}
          onCheckboxToggle={handleCheckboxToggle}
        />
      </BorderedSection>
      <StickyFooter>
        <div className="px-[15px] py-2.5 bg-[#f9f9f9]">
          <AppPrimaryButton onClick={handleAddToCart}>장바구니 담기</AppPrimaryButton>
        </div>
      </StickyFooter>
      <ConfirmModal
        open={showPlaceChangeModal}
        description="가게를 변경하실 경우 장바구니에 담은 메뉴가 삭제됩니다."
        onConfirm={handleConfirmPlaceChange}
        onCancel={() => setShowPlaceChangeModal(false)}
      />
    </>
  )
}
