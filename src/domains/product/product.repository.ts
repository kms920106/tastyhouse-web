import 'server-only'

import { api } from '@/lib/api'
import { PaginationParams } from '@/types/common'
import {
  ProductDetailResponse,
  ProductReviewStatisticsResponse,
  ProductReviewsByRatingResponse,
  ProductTodayDiscountListItemResponse,
} from './product.dto'

const ENDPOINT = '/api/products'

export const productRepository = {
  async getTodayDiscountProducts(params: PaginationParams) {
    return api.get<ProductTodayDiscountListItemResponse[]>(`${ENDPOINT}/v1/today-discounts`, {
      params,
    })
  },
  async getProductById(productId: number) {
    return api.get<ProductDetailResponse>(`${ENDPOINT}/v1/${productId}`)
  },
  async getProductReviewStatistics(productId: number) {
    return api.get<ProductReviewStatisticsResponse>(
      `${ENDPOINT}/v1/${productId}/reviews/statistics`,
    )
  },
  async getProductReviews(productId: number, params: PaginationParams) {
    return api.get<ProductReviewsByRatingResponse>(`${ENDPOINT}/v1/${productId}/reviews`, {
      params,
    })
  },
}
