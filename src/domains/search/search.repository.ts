import 'server-only'

import { publicApi } from '@/lib/api'

import type {
  PopularKeywordResponse,
  RecommendedKeywordResponse,
  SearchPlaceListItemResponse,
  SearchQuery,
} from './search.dto'

const ENDPOINT = '/api/search'

export const searchRepository = {
  async getPopularKeywords() {
    return publicApi.get<PopularKeywordResponse[]>(`${ENDPOINT}/v1/popular-keywords`)
  },
  async getRecommendedKeywords() {
    return publicApi.get<RecommendedKeywordResponse[]>(`${ENDPOINT}/v1/recommended-keywords`)
  },
  async searchPlaces(params: SearchQuery) {
    return publicApi.get<SearchPlaceListItemResponse[], SearchQuery>(`${ENDPOINT}/v1`, { params })
  },
}
