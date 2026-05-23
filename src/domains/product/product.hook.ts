'use client'

import { getProductOptions, getProductReviewStatistics, getProductReviews } from '@/actions/product'
import { useQuery } from '@tanstack/react-query'

const REVIEWS_PAGE_SIZE = 5

export const productQueryKeys = {
  options: (productId: number) => ['product', productId, 'product-options'] as const,
  reviewStatistics: (productId: number) => ['product', productId, 'product-review-statistics'] as const,
  reviews: (productId: number) => ['product', productId, 'product-detail-reviews'] as const,
}

export function useProductOptions(productId: number) {
  return useQuery({
    queryKey: productQueryKeys.options(productId),
    queryFn: () => getProductOptions(productId),
  })
}

export function useProductReviewStatistics(productId: number) {
  return useQuery({
    queryKey: productQueryKeys.reviewStatistics(productId),
    queryFn: () => getProductReviewStatistics(productId),
  })
}

export function useProductReviews(productId: number) {
  return useQuery({
    queryKey: productQueryKeys.reviews(productId),
    queryFn: () => getProductReviews(productId, { page: 0, size: REVIEWS_PAGE_SIZE }),
  })
}
