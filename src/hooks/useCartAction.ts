'use client'

import { toast } from '@/components/ui/AppToaster'
import type { ProductOptionGroup } from '@/domains/product'
import type { CartSelectedOption } from '@/lib/cart'
import { addToCart, getCartPlaceId, replaceCartAndAdd } from '@/lib/cart'
import { useRouter } from 'next/navigation'
import { useCallback, useState } from 'react'

interface UseCartActionParams {
  productId: number
  placeId: number
  optionGroups: ProductOptionGroup[]
  selectedOptions: Record<number, number | number[]>
  getSelectedOptionsData: () => CartSelectedOption[]
}

export function useCartAction({
  productId,
  placeId,
  optionGroups,
  selectedOptions,
  getSelectedOptionsData,
}: UseCartActionParams) {
  const router = useRouter()
  const [showPlaceChangeModal, setShowPlaceChangeModal] = useState(false)

  const validateRequiredOptions = useCallback((): boolean => {
    const missingRequired = optionGroups.filter((group) => {
      if (!group.isRequired) return false
      const selected = selectedOptions[group.id]
      if (group.isMultipleSelect) return (selected as number[]).length < group.minSelect
      return selected === -1
    })
    if (missingRequired.length > 0) {
      alert(`필수 옵션을 선택해 주세요: ${missingRequired.map((g) => g.name).join(', ')}`)
      return false
    }
    return true
  }, [optionGroups, selectedOptions])

  const executeAddToCart = useCallback(
    (replace = false) => {
      const cartItem = { productId, selectedOptions: getSelectedOptionsData() }
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

  const handleAddToCart = useCallback(() => {
    if (!validateRequiredOptions()) return
    const currentCartPlaceId = getCartPlaceId()
    if (currentCartPlaceId === null || currentCartPlaceId === placeId) {
      executeAddToCart()
      return
    }
    setShowPlaceChangeModal(true)
  }, [placeId, validateRequiredOptions, executeAddToCart])

  const handleConfirmPlaceChange = useCallback(() => {
    setShowPlaceChangeModal(false)
    executeAddToCart(true)
  }, [executeAddToCart])

  return {
    showPlaceChangeModal,
    handleAddToCart,
    handleConfirmPlaceChange,
    onCancelPlaceChange: () => setShowPlaceChangeModal(false),
  }
}
