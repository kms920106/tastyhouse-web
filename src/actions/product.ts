'use server'

import { productRepository } from '@/domains/product/product.repository'

export async function getProductById(productId: number) {
  return productRepository.getProductById(productId)
}

export async function getProductReviewStatistics(productId: number) {
  return productRepository.getProductReviewStatistics(productId)
}

export async function getProductReviews(productId: number, query: { page: number; size: number }) {
  return productRepository.getProductReviews(productId, query)
}
