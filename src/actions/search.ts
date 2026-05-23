'use server'

import type { Product } from '@/domains/product/product.model'
import { searchRepository } from '@/domains/search/search.repository'

export async function getPopularKeywords() {
  return searchRepository.getPopularKeywords()
}

export async function getRecommendedKeywords() {
  return searchRepository.getRecommendedKeywords()
}

export async function getSearchMenus({
  query,
  page,
  size,
}: {
  query: string
  page: number
  size: number
}) {
  const result = await searchRepository.searchMenus({ query, page, size })
  return {
    ...result,
    data: result.data?.map<Product>((item) => ({
      id: item.id,
      name: item.name,
      imageUrl: item.imageUrl ?? '',
      originalPrice: item.originalPrice,
      discountPrice: item.discountPrice,
      discountRate: item.discountRate,
      rating: item.rating,
      reviewCount: item.reviewCount,
      isRepresentative: item.isRepresentative,
      spiciness: item.spiciness,
    })),
  }
}

export async function getSearchReviews({
  query,
  page,
  size,
}: {
  query: string
  page: number
  size: number
}) {
  return searchRepository.searchReviews({ query, page, size })
}

export async function getSearchPlaces({
  query,
  page,
  size,
}: {
  query: string
  page: number
  size: number
}) {
  return searchRepository.searchPlaces({ query, page, size })
}

export async function getSearchPublicPlaces({
  query,
  page,
  size,
}: {
  query: string
  page: number
  size: number
}) {
  return searchRepository.searchPublicPlaces({ query, page, size })
}
