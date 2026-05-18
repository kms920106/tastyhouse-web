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
