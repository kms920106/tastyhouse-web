'use server'

import { searchRepository } from '@/domains/search/search.repository'
import type { SearchQuery } from '@/domains/search/search.dto'

export async function getPopularKeywords() {
  return searchRepository.getPopularKeywords()
}

export async function getRecommendedKeywords() {
  return searchRepository.getRecommendedKeywords()
}

export async function getSearchPlaces(params: SearchQuery) {
  return searchRepository.searchPlaces(params)
}
