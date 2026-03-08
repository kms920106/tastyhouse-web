import type { PaginationParams } from '@/types/common'
import type { Product } from '@/domains/product'
import type { OrderMethodItem } from '../order/order.type'

export type PlaceFoodType =
  | 'KOREAN'
  | 'JAPANESE'
  | 'WESTERN'
  | 'CHINESE'
  | 'WORLD'
  | 'SNACK'
  | 'BAR'
  | 'CAFE'

export type PlaceAmenityCode =
  | 'PARKING'
  | 'RESTROOM'
  | 'RESERVATION'
  | 'BABY_CHAIR'
  | 'PET_FRIENDLY'
  | 'OUTLET'
  | 'TAKEOUT'
  | 'DELIVERY'

export type PlaceImageCategoryCode = 'EXTERIOR' | 'INTERIOR' | 'FOOD' | 'OTHER'

export interface Place {
  id: number
  imageUrl: string
  name: string
  title: string
  content: string
  products: Product[]
}

export interface PlaceMenu {
  id: number
  imageUrl: string
  spiciness: number | null
  name: string
  originalPrice: number
  discountPrice: number
  discountRate: number | null
  rating: number | null
  reviewCount: number | null
  isRepresentative: boolean | null
}

export interface PlaceBusinessHour {
  dayType: string
  dayTypeDescription: string
  openTime: string
  closeTime: string
  isClosed: boolean
}

export interface PlaceBreakTimes {
  dayType: string
  dayTypeDescription: string
  startTime: string
  endTime: string
}

export interface PlaceClosedDay {
  closedDayType: string
  description: string
}

export interface PlaceFilterParams {
  stationId?: number
  foodTypes?: PlaceFoodType[]
  amenities?: PlaceAmenityCode[]
}

export interface PlaceStation {
  id: number
  name: string
}

export interface PlaceAmenity {
  code: PlaceAmenityCode
  name: string
  imageUrlOn: string
  imageUrlOff: string
}

export type ProductTodayDiscountQuery = PaginationParams

export type PlaceBestQuery = PaginationParams

export type PlaceChoiceQuery = PaginationParams

export type PlaceLatestQuery = PaginationParams & {
  stationId?: number
  foodTypes?: PlaceFoodType[]
  amenities?: PlaceAmenityCode[]
}

export type PlaceReviewsByRatingQuery = PaginationParams

export type PlaceMapQuery = PaginationParams

export interface PlaceFoodTypeListItemResponse {
  code: PlaceFoodType
  name: string
  imageUrl: string
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

export interface MenuCategory {
  categoryName: string
  menus: PlaceMenu[]
}

export interface PlacePhotoCategoryResponse {
  name: string
  imageUrls: string[]
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
  breakTimes: PlaceBreakTimes[]
  closedDays: PlaceClosedDay[]
  amenities: PlaceAmenity[]
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
  placeId: number
  orderMethods: OrderMethodItem[]
}

export interface PlaceMapMarkerResponse {
  id: number
  latitude: number
  longitude: number
  name: string
}

export interface ProductTodayDiscountListItemResponse {
  id: number
  name: string
  placeName: string
  imageUrl: string
  originalPrice: number
  discountPrice: number
  discountRate: number
}
