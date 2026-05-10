'use client'

import { getProductReviewStatistics } from '@/actions/product'
import { useQuery } from '@tanstack/react-query'

export const productQueryKeys = {
  reviewStatistics: (productId: number) => ['product', productId, 'product-review-statistics'] as const,
}

export function useProductReviewStatistics(productId: number) {
  return useQuery({
    queryKey: productQueryKeys.reviewStatistics(productId),
    queryFn: () => getProductReviewStatistics(productId),
  })
}
