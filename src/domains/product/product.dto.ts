import type { ProductOptionGroup } from './product.model'

export interface ProductListItemResponse {
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

export interface ProductDetailResponse {
  id: number
  name: string
  description: string
  originalPrice: number
  discountPrice: number | null
  discountRate: number | null
  reviewCount: number
  isSoldOut: boolean
}

export interface ProductImagesResponse {
  imageUrls: string[]
}

export interface ProductOptionsResponse {
  optionGroups: ProductOptionGroup[]
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
