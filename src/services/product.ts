'use server'

import { ProductReviewsByRatingQuery, productRepository } from '@/domains/product'

export async function getProductById(productId: number) {
  return productRepository.getProductById(productId)
}

export async function getProductReviewStatistics(productId: number) {
  return productRepository.getProductReviewStatistics(productId)
}

export async function getProductReviews(productId: number, query: ProductReviewsByRatingQuery) {
  return productRepository.getProductReviews(productId, query)
}
