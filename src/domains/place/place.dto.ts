import { PaginationParams } from '@/types/common'
import type { PlaceAmenityCode, PlaceFoodType } from '.'
import { PlaceAmenity, PlaceBreakTime, PlaceBusinessHour, PlaceClosedDay } from '.'
import type { OrderMethod } from '../order'
import { ProductMenu } from '../product'

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

export interface PlaceNameResponse {
  id: number
  name: string
}

export interface PlaceSummaryResponse {
  id: number
  name: string
  roadAddress: string
  lotAddress: string
  rating: number
}

export interface PlaceBookmarkResponse {
  bookmarked: boolean
}

export interface PlaceInfoResponse {
  id: number
  name: string
  rating: number
  roadAddress: string | null
  lotAddress: string | null
  latitude: number
  longitude: number
  stationName: string
  phoneNumber: string | null
  ownerMessage: string | null
  ownerMessageCreatedAt: string | null
  businessHours: PlaceBusinessHour[]
  breakTimes: PlaceBreakTime[]
  closedDays: PlaceClosedDay[]
  amenities: PlaceAmenity[]
}

export interface MenuCategoryResponse {
  categoryName: string
  menus: ProductMenu[]
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
