'use client'

import { getProductById, getProductOptions } from '@/actions/product'
import { toast } from '@/components/ui/AppToaster'
import type { OrderProduct, OrderProductOption } from '@/domains/order'
import type { ProductDetailResponse, ProductOptionGroup } from '@/domains/product'
import type { CartSelectedOption } from '@/lib/cart'
import { getCartData, getCartProductTypeCount } from '@/lib/cart'
import {
  calculateTotalProductAmount,
  calculateTotalProductDiscount,
  calculateTotalProductPaymentAmount,
} from '@/lib/paymentCalculation'
import { useCallback, useEffect, useState } from 'react'

export interface CartInfo {
  items: OrderProduct[]
  placeName: string
  firstProductName: string
  totalItemCount: number
  totalProductAmount: number
  totalProductDiscount: number
  totalProductPaymentAmount: number
  isLoading: boolean
}

function calculateItemPrice(
  detail: ProductDetailResponse,
  optionGroups: ProductOptionGroup[],
  selectedOptions: CartSelectedOption[],
): { salePrice: number; originalPrice: number; discountPrice: number } {
  const basePrice = detail.discountPrice ?? detail.originalPrice
  const originalPrice = detail.originalPrice
  const discountPrice = originalPrice - basePrice

  const optionAdditionalPrice = selectedOptions.reduce((sum, so) => {
    const group = optionGroups.find((g) => g.id === so.groupId)
    const option = group?.options.find((o) => o.id === so.optionId)
    return sum + (option?.additionalPrice ?? 0)
  }, 0)

  return {
    salePrice: basePrice + optionAdditionalPrice,
    originalPrice: originalPrice + optionAdditionalPrice,
    discountPrice,
  }
}

function resolveOptionDetails(
  optionGroups: ProductOptionGroup[],
  selectedOptions: CartSelectedOption[],
): OrderProductOption[] {
  return selectedOptions.map((so) => {
    const group = optionGroups.find((g) => g.id === so.groupId)
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

type ProductDetailEntry = {
  detail: ProductDetailResponse
  optionGroups: ProductOptionGroup[]
}

async function fetchProductDetails(
  productIds: number[],
): Promise<Map<number, ProductDetailEntry>> {
  const results = await Promise.allSettled(
    productIds.map((id) => Promise.all([getProductById(id), getProductOptions(id)])),
  )
  const detailMap = new Map<number, ProductDetailEntry>()

  let failedCount = 0

  results.forEach((result, index) => {
    if (
      result.status === 'fulfilled' &&
      result.value[0].data &&
      result.value[1].data
    ) {
      detailMap.set(productIds[index], {
        detail: result.value[0].data,
        optionGroups: result.value[1].data.optionGroups,
      })
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
  items: OrderProduct[]
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

    const orderItems: OrderProduct[] = cart.products
      .map((cartProduct) => {
        const entry = productDetailMap.get(cartProduct.productId)
        if (!entry) return null

        const { salePrice, originalPrice, discountPrice } = calculateItemPrice(
          entry.detail,
          entry.optionGroups,
          cartProduct.selectedOptions,
        )

        const selectedOptions = resolveOptionDetails(entry.optionGroups, cartProduct.selectedOptions)

        return {
          productId: cartProduct.productId,
          optionKey: cartProduct.optionKey,
          name: entry.detail.name,
          imageUrl: '',
          salePrice,
          originalPrice,
          discountPrice,
          quantity: cartProduct.quantity,
          selectedOptions,
        }
      })
      .filter((item): item is OrderProduct => item !== null)

    setState({
      items: orderItems,
      placeName: '',
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
