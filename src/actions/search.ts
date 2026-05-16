'use server'

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
  return searchRepository.searchMenus({ query, page, size })
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
