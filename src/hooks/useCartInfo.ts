'use client'

import type { ProductDetailResponse } from '@/domains/product'
import type { OrderItem, OrderItemOption } from '@/domains/order'
import type { CartSelectedOption } from '@/lib/cart'
import { getCartData, getCartProductTypeCount } from '@/lib/cart'
import {
  calculateTotalProductAmount,
  calculateTotalProductDiscount,
  calculateTotalProductPaymentAmount,
} from '@/lib/paymentCalculation'
import { toast } from '@/components/ui/AppToaster'
import { getProductById } from '@/services/product'
import { useCallback, useEffect, useState } from 'react'

export interface CartInfo {
  items: OrderItem[]
  placeName: string
  firstProductName: string
  totalItemCount: number
  totalProductAmount: number
  totalProductDiscount: number
  totalProductPaymentAmount: number
  isLoading: boolean
}

/**
 * 상품 가격을 계산합니다.
 *
 * @param detail - 상품 상세 정보
 * @param selectedOptions - 선택된 옵션
 * @returns 상품 가격과 원래 가격
 */
function calculateItemPrice(
  detail: ProductDetailResponse,
  selectedOptions: CartSelectedOption[],
): { salePrice: number; originalPrice: number; discountPrice: number } {
  const basePrice = detail.discountPrice ?? detail.originalPrice
  const originalPrice = detail.originalPrice
  const discountPrice = originalPrice - basePrice

  const optionAdditionalPrice = selectedOptions.reduce((sum, so) => {
    const group = detail.optionGroups.find((g) => g.id === so.groupId)
    const option = group?.options.find((o) => o.id === so.optionId)
    return sum + (option?.additionalPrice ?? 0)
  }, 0)

  return {
    salePrice: basePrice + optionAdditionalPrice,
    originalPrice: originalPrice + optionAdditionalPrice,
    discountPrice,
  }
}

/**
 * 선택된 옵션의 상세 정보를 조회합니다.
 */
function resolveOptionDetails(
  detail: ProductDetailResponse,
  selectedOptions: CartSelectedOption[],
): OrderItemOption[] {
  return selectedOptions.map((so) => {
    const group = detail.optionGroups.find((g) => g.id === so.groupId)
    const option = group?.options.find((o) => o.id === so.optionId)
    return {
      groupId: so.groupId,
      groupName: group?.name ?? '',
      optionId: so.optionId,
      optionName: option?.name ?? '',
      additionalPrice: option?.additionalPrice ?? 0,
    }
  })
}

/**
 * 상품 상세 정보를 조회합니다.
 *
 * @param productIds - 상품 ID 목록
 * @returns 상품 상세 정보 맵
 */
async function fetchProductDetails(
  productIds: number[],
): Promise<Map<number, ProductDetailResponse>> {
  const results = await Promise.allSettled(productIds.map((id) => getProductById(id)))
  const detailMap = new Map<number, ProductDetailResponse>()

  let failedCount = 0

  results.forEach((result, index) => {
    if (result.status === 'fulfilled' && result.value.data) {
      detailMap.set(productIds[index], result.value.data)
    } else {
      failedCount++
    }
  })

  if (failedCount > 0) {
    toast(`${failedCount}개 상품 정보를 불러오지 못했습니다.`)
  }

  return detailMap
}

interface CartState {
  items: OrderItem[]
  placeName: string
  firstProductName: string
  totalItemCount: number
  isLoading: boolean
}

const initialCartState: CartState = {
  items: [],
  placeName: '',
  firstProductName: '',
  totalItemCount: 0,
  isLoading: true,
}

export function useCartInfo(): CartInfo {
  const [state, setState] = useState<CartState>(initialCartState)

  const loadCartInfo = useCallback(async () => {
    const cart = getCartData()
    if (!cart || cart.products.length === 0) {
      setState({ ...initialCartState, isLoading: false })
      return
    }

    const uniqueProductIds = [...new Set(cart.products.map((p) => p.productId))]
    const productDetailMap = await fetchProductDetails(uniqueProductIds)

    const firstDetail = productDetailMap.values().next().value

    const orderItems: OrderItem[] = cart.products
      .map((cartProduct) => {
        const productDetail = productDetailMap.get(cartProduct.productId)
        if (!productDetail) return null

        const { salePrice, originalPrice, discountPrice } = calculateItemPrice(
          productDetail,
          cartProduct.selectedOptions,
        )

        const selectedOptions = resolveOptionDetails(productDetail, cartProduct.selectedOptions)

        return {
          productId: cartProduct.productId,
          optionKey: cartProduct.optionKey,
          name: productDetail.name,
          imageUrl: productDetail.imageUrls[0] ?? '',
          salePrice,
          originalPrice,
          discountPrice,
          quantity: cartProduct.quantity,
          selectedOptions,
        }
      })
      .filter((item): item is OrderItem => item !== null)

    setState({
      items: orderItems,
      placeName: firstDetail?.placeName ?? '',
      firstProductName: orderItems[0]?.name ?? '',
      totalItemCount: getCartProductTypeCount(),
      isLoading: false,
    })
  }, [])

  useEffect(() => {
    loadCartInfo()
  }, [loadCartInfo])

  const totalProductAmount = calculateTotalProductAmount(state.items)
  const totalProductDiscount = calculateTotalProductDiscount(state.items)
  const totalProductPaymentAmount = calculateTotalProductPaymentAmount(state.items)

  return {
    ...state,
    totalProductAmount,
    totalProductDiscount,
    totalProductPaymentAmount,
  }
}
