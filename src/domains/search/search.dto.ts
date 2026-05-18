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
  isBookmarked: boolean | null
}

export interface SearchMenuListItemResponse {
  id: number
  placeName: string
  name: string
  imageUrl: string | null
  originalPrice: number
  discountPrice: number
  discountRate: number
  rating: number
  reviewCount: number
  isRepresentative: boolean
  spiciness: number
}

export interface SearchReviewListItemResponse {
  id: number
  imageUrl: string
}

export interface SearchQuery extends PaginationParams {
  query: string
}
