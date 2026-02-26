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

export type Place = {
  id: number
  imageUrl: string
  name: string
  title: string
  content: string
  products: Product[]
}

export type PlaceMenu = {
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

export type PlaceBusinessHour = {
  dayType: string
  dayTypeDescription: string
  openTime: string
  closeTime: string
  isClosed: boolean
}

export type PlaceBreakTimes = {
  dayType: string
  dayTypeDescription: string
  startTime: string
  endTime: string
}

export type PlaceClosedDay = {
  closedDayType: string
  description: string
}

export type PlaceFilterParams = {
  stationId: number | null
  foodTypes: PlaceFoodType[] | null
  amenities: PlaceAmenityCode[] | null
}

export type PlaceStation = {
  id: number
  name: string
}

export type PlaceAmenity = {
  code: PlaceAmenityCode
  name: string
  imageUrlOn: string
  imageUrlOff: string
}

export type ProductTodayDiscountQuery = PaginationParams

export type PlaceBestQuery = PaginationParams

export type PlaceChoiceQuery = PaginationParams

export type PlaceLatestQuery = PaginationParams & {
  stationId: number | null
  foodTypes: PlaceFoodType[] | null
  amenities: PlaceAmenityCode[] | null
}

export type PlaceReviewsByRatingQuery = PaginationParams

export type PlaceMapQuery = PaginationParams

export type PlaceFoodTypeListItemResponse = {
  code: PlaceFoodType
  name: string
  imageUrl: string
}

export type PlaceStationListItemResponse = {
  id: number
  name: string
}

export type ProductChoiceListItemResponse = {
  id: number
  name: string
  placeName: string
  imageUrl: string
  originalPrice: number
  discountPrice: number
  discountRate: number
}

export type MenuCategory = {
  categoryName: string
  menus: PlaceMenu[]
}

export type PlacePhotoCategoryResponse = {
  name: string
  imageUrls: string[]
}

export type PlaceNameResponse = {
  id: number
  name: string
}

export type PlaceSummaryResponse = {
  id: number
  name: string
  roadAddress: string
  lotAddress: string
  rating: number
}

export type PlaceBookmarkResponse = {
  bookmarked: boolean
}

export type PlaceInfoResponse = {
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

export type PlaceBannerListItemResponse = {
  id: number
  imageUrl: string
}

export type PlaceReviewListItemResponse = {
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

export type PlaceReviewStatisticsResponse = {
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

export type PlaceReviewsByRatingResponse = {
  reviewsByRating: Record<string, PlaceReviewListItemResponse[]>
  allReviews: PlaceReviewListItemResponse[]
  totalReviewCount: number
}

export type PlaceBestListItemResponse = {
  id: number
  name: string
  imageUrl: string
  stationName: string
  rating: number
  foodTypes: PlaceFoodType[]
}

export type PlaceChoiceListItemResponse = {
  id: number
  name: string
  imageUrl: string
  title: string
  content: string
  products: ProductChoiceListItemResponse[]
}

export type PlaceLatestListItemResponse = {
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

export type PlaceMapListItemResponse = {
  id: number
  name: string
  latitude: number
  longitude: number
}

export type PlaceOrderMethodResponse = {
  placeId: number
  orderMethods: OrderMethodItem[]
}

export type PlaceMapMarkerResponse = {
  id: number
  latitude: number
  longitude: number
  name: string
}

export type ProductTodayDiscountListItemResponse = {
  id: number
  name: string
  placeName: string
  imageUrl: string
  originalPrice: number
  discountPrice: number
  discountRate: number
}
