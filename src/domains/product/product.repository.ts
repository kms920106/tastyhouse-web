import 'server-only'

import { publicApi } from '@/lib/api'
import { PaginationParams } from '@/types/common'
import {
  ProductDetailResponse,
  ProductReviewStatisticsResponse,
  ProductReviewsByRatingResponse,
  ProductTodayDiscountListItemResponse,
} from './product.dto'

const ENDPOINT = '/api/products'

const CACHE_OPTIONS = { cache: 'force-cache' as const, next: { revalidate: 3600 } }

export const productRepository = {
  async getTodayDiscountProducts(params: PaginationParams) {
    return publicApi.get<ProductTodayDiscountListItemResponse[]>(`${ENDPOINT}/v1/today-discounts`, {
      ...CACHE_OPTIONS,
      params,
    })
  },
  async getProductById(productId: number) {
    return publicApi.get<ProductDetailResponse>(`${ENDPOINT}/v1/${productId}`, CACHE_OPTIONS)
  },
  async getProductReviewStatistics(productId: number) {
    return publicApi.get<ProductReviewStatisticsResponse>(
      `${ENDPOINT}/v1/${productId}/reviews/statistics`,
      CACHE_OPTIONS,
    )
  },
  async getProductReviews(productId: number, params: PaginationParams) {
    return publicApi.get<ProductReviewsByRatingResponse>(`${ENDPOINT}/v1/${productId}/reviews`, {
      ...CACHE_OPTIONS,
      params,
    })
  },
}
