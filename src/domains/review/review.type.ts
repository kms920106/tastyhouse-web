import type { PaginationParams } from '@/types/common'

export type ReviewType = 'ALL' | 'FOLLOWING'

export type ReviewSortType = 'recommended' | 'latest' | 'oldest'

export interface ReviewComment {
  id: number
  reviewId: number
  memberId: number
  memberNickname: string
  memberProfileImageUrl: string | null
  content: string
  createdAt: string
  replies?: ReviewReply[]
}

export interface ReviewReply {
  id: number
  commentId: number
  memberId: number
  memberNickname: string
  memberProfileImageUrl: string | null
  replyToMemberId: number
  replyToMemberNickname: string
  content: string
  createdAt: string
}

export type ReviewBestQuery = PaginationParams & {}

export type ReviewLatestQuery = PaginationParams & {
  type: ReviewType
}

export interface ReviewBestListItemResponse {
  id: number
  content: string
  imageUrl: string
  stationName: string
  title: string
  totalRating: number
}

export interface ReviewLatestListItemResponse {
  id: number
  imageUrls: string[]
  stationName: string
  totalRating: number
  content: string
  memberId: number
  memberNickname: string
  memberProfileImageUrl: string | null
  likeCount: number
  commentCount: number
  createdAt: string
}

export interface ReviewDetailResponse {
  id: number
  placeId: number
  placeName: string
  stationName: string
  content: string
  totalRating: number
  tasteRating: number
  amountRating: number
  priceRating: number
  atmosphereRating: number
  kindnessRating: number
  hygieneRating: number
  willRevisit: boolean
  memberId: number
  memberNickname: string
  memberProfileImageUrl: string | null
  createdAt: string
  imageUrls: string[]
  tagNames: string[]
}

export interface ReviewProductDetailResponse {
  productId: number
  productName: string
  productImageUrl: string
  productPrice: number
  content: string
  totalRating: number
  tasteRating: number
  amountRating: number
  priceRating: number
  atmosphereRating: number
  kindnessRating: number
  hygieneRating: number
  willRevisit: boolean
  memberNickname: string
  memberProfileImageUrl: string | null
  createdAt: string
  imageUrls: string[]
  tagNames: string[]
}

export interface ReviewLikeResponse {
  liked: boolean
}

export interface CommentCreateRequest {
  content: string
}

export interface CommentCreateResponse {
  id: number
  reviewId: number
  memberId: number
  memberNickname: string
  memberProfileImageUrl: string | null
  content: string
  createdAt: string
  replies: ReviewReply[]
}

export interface CommentListResponse {
  comments: ReviewComment[]
  totalCount: number
}

export interface ReplyCreateRequest {
  content: string
  replyToMemberId: number
}

export interface ReplyCreateResponse {
  id: number
  commentId: number
  memberId: number
  memberNickname: string
  memberProfileImageUrl: string | null
  content: string
  createdAt: string
}

export interface ReviewWriteInfoResponse {
  productId: number
  productName: string
  productImageUrl: string
  productPrice: number
  orderId: number
  isReviewed: boolean
}

export interface ReviewCreateRequest {
  orderItemId: number | null
  productId: number
  tasteRating: number
  amountRating: number
  priceRating: number
  content: string
  uploadedFileIds: number[]
  tags: string[]
}

export interface ReviewCreateResponse {
  reviewId: number
  productId: number
  tasteRating: number
  amountRating: number
  priceRating: number
  totalRating: number
  content: string
  imageUrls: string[]
  tags: string[]
  createdAt: string
}
