import type { PlaceFoodType } from '@/domains/place/place.types'

export interface PopularKeyword {
  rank: number
  keyword: string
  isNew: boolean
}

export interface RecommendedKeyword {
  keyword: string
}

export interface SearchPlaceItem {
  id: number
  name: string
  stationName: string
  rating: number
  imageUrl: string | null
  foodTypes: PlaceFoodType[]
  isBookmarked: boolean | null
}

export interface SearchMenuItem {
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

export interface SearchReviewItem {
  reviewId: number
  imageUrl: string
  placeId: number
}
