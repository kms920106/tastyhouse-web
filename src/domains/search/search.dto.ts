import type { PlaceFoodType } from '@/domains/place/place.types'
import type { PaginationParams } from '@/types/common'

export interface PopularKeywordResponse {
  rank: number
  keyword: string
  isNew: boolean
}

export interface RecommendedKeywordResponse {
  keyword: string
}

export interface SearchPlaceListItemResponse {
  id: number
  name: string
  stationName: string
  rating: number
  imageUrl: string | null
  foodTypes: PlaceFoodType[]
}

export interface SearchQuery extends PaginationParams {
  query: string
}
