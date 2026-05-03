import type { ProductMenuOptionGroup } from './product.model'

export interface ProductDetailResponse {
  id: number
  placeId: number
  placeName: string
  name: string
  description: string
  imageUrls: string[]
  originalPrice: number
  discountPrice: number | null
  discountRate: number | null
  rating: number | null
  reviewCount: number
  isRepresentative: boolean
  isSoldOut: boolean
  categoryName: string
  optionGroups: ProductMenuOptionGroup[]
}

export interface ProductReviewListItemResponse {
  id: number
  imageUrls: string[]
  totalRating: number
  content: string
  memberNickname: string
  memberProfileImageUrl: string | null
  createdAt: string
  productId: number
  productName: string
}

export interface ProductReviewStatisticsResponse {
  totalRating: number | null
  totalReviewCount: number
  averageTasteRating: number
  averageAmountRating: number
  averagePriceRating: number
}

export interface ProductReviewsByRatingResponse {
  reviewsByRating: Record<string, ProductReviewListItemResponse[]>
  allReviews: ProductReviewListItemResponse[]
  totalReviewCount: number
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
