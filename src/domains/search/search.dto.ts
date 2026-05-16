import type { PlaceFoodType } from '@/domains/place/place.types'
import type { PaginationParams } from '@/types/common'

export type SearchTab = 'all' | 'menu' | 'review' | 'place'

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
  reviewId: number
  imageUrl: string
  placeId: number
}

export interface SearchQuery extends PaginationParams {
  query: string
}
