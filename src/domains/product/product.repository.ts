import { api } from '@/lib/api'
import {
  ProductDetailResponse,
  ProductReviewStatisticsResponse,
  ProductReviewsByRatingQuery,
  ProductReviewsByRatingResponse,
} from './product.type'

const ENDPOINT = '/api/products'

export const productRepository = {
  async getProductById(productId: number) {
    return api.get<ProductDetailResponse>(`${ENDPOINT}/v1/${productId}`)
  },
  async getProductReviewStatistics(productId: number) {
    return api.get<ProductReviewStatisticsResponse>(
      `${ENDPOINT}/v1/${productId}/reviews/statistics`,
    )
  },
  async getProductReviews(productId: number, params: ProductReviewsByRatingQuery) {
    return api.get<ProductReviewsByRatingResponse>(
      `${ENDPOINT}/v1/${productId}/reviews`,
      {
        params,
      },
    )
  },
}
