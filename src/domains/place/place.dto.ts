import { PaginationParams } from '@/types/common'
import type { PlaceAmenityCode, PlaceFoodType } from '.'
import { PlaceAmenity, PlaceBreakTime, PlaceBusinessHour, PlaceClosedDay } from '.'
import type { OrderMethod } from '../order'
import { ProductListItemResponse } from '../product'

export interface PlaceLatestQuery extends PaginationParams {
  stationId?: number
  foodTypes?: PlaceFoodType[]
  amenities?: PlaceAmenityCode[]
}

export interface PlaceFoodTypeListItemResponse {
  code: PlaceFoodType
  name: string
  activeImageUrl: string
  inactiveImageUrl: string
}

export interface PlaceStationListItemResponse {
  id: number
  name: string
}

export interface ProductChoiceListItemResponse {
  id: number
  name: string
  placeName: string
  imageUrl: string
  originalPrice: number
  discountPrice: number
  discountRate: number
}

export interface PlacePhotoCategoryResponse {
  name: string
  imageUrls: string[]
}

export interface PlaceAmenityResponse {
  code: PlaceAmenityCode
  name: string
  activeImageUrl: string
  inactiveImageUrl: string
}

export interface PlaceBookmarkResponse {
  bookmarked: boolean
}

export interface PlaceInfoResponse {
  closedDays: PlaceClosedDay[]
  businessHours: PlaceBusinessHour[]
  breakTimes: PlaceBreakTime[]
  amenities: PlaceAmenity[]
  ownerMessage: string | null
  ownerMessageCreatedAt: string | null
}

export interface PlaceProductCategoryResponse {
  categoryName: string
  products: ProductListItemResponse[]
}

export interface PlaceBannerListItemResponse {
  id: number
  imageUrl: string
}

export interface PlaceReviewListItemResponse {
  id: number
  imageUrls: string[]
  totalRating: number
  content: string
  memberNickname: string
  memberProfileImageUrl: string | null
  createdAt: string
  productId: number | null
  productName: string | null
}

export interface PlaceReviewStatisticsResponse {
  totalRating: number
  totalReviewCount: number
  averageTasteRating: number
  averageAmountRating: number
  averagePriceRating: number
  averageAtmosphereRating: number
  averageKindnessRating: number
  averageHygieneRating: number
  willRevisitPercentage: number
  monthlyReviewCounts: Record<string, number>
  ratingCounts: Record<string, number>
}

export interface PlaceReviewsByRatingResponse {
  reviewsByRating: Record<string, PlaceReviewListItemResponse[]>
  allReviews: PlaceReviewListItemResponse[]
  totalReviewCount: number
}

export interface PlaceBestListItemResponse {
  id: number
  name: string
  imageUrl: string
  stationName: string
  rating: number
  foodTypes: PlaceFoodType[]
}

export interface PlaceChoiceListItemResponse {
  id: number
  name: string
  imageUrl: string
  title: string
  content: string
  products: ProductChoiceListItemResponse[]
}

export interface PlaceLatestListItemResponse {
  id: number
  name: string
  imageUrl: string
  stationName: string
  rating: number
  reviewCount: number
  bookmarkCount: number
  createdAt: string
  foodTypes: PlaceFoodType[]
}

export interface PlaceMapListItemResponse {
  id: number
  name: string
  latitude: number
  longitude: number
}

export interface PlaceOrderMethodResponse {
  orderMethods: OrderMethod[]
}

export interface PlaceDetailResponse {
  id: number
  name: string
  latitude: number
  longitude: number
  rating: number
  roadAddress: string
  lotAddress: string
  phoneNumber: string
}
