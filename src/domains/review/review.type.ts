import type { PaginationParams } from '@/types/common'

export type ReviewType = 'ALL' | 'FOLLOWING'

export type ReviewSortType = 'recommended' | 'latest' | 'oldest'

export type ReviewComment = {
  id: number
  reviewId: number
  memberId: number
  memberNickname: string
  memberProfileImageUrl: string | null
  content: string
  createdAt: string
  replies?: ReviewReply[]
}

export type ReviewReply = {
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

export type ReviewBestListItemResponse = {
  id: number
  content: string
  imageUrl: string
  stationName: string
  title: string
  totalRating: number
}

export type ReviewLatestListItemResponse = {
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

export type ReviewDetailResponse = {
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

export type ReviewProductDetailResponse = {
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

export type ReviewLikeResponse = {
  liked: boolean
}

export type CommentCreateRequest = {
  content: string
}

export type CommentCreateResponse = {
  id: number
  reviewId: number
  memberId: number
  memberNickname: string
  memberProfileImageUrl: string | null
  content: string
  createdAt: string
  replies: ReviewReply[]
}

export type CommentListResponse = {
  comments: ReviewComment[]
  totalCount: number
}

export type ReplyCreateRequest = {
  content: string
  replyToMemberId: number
}

export type ReplyCreateResponse = {
  id: number
  commentId: number
  memberId: number
  memberNickname: string
  memberProfileImageUrl: string | null
  content: string
  createdAt: string
}

export type ReviewWriteInfoResponse = {
  productId: number
  productName: string
  productImageUrl: string
  productPrice: number
  orderId: number
  isReviewed: boolean
}

export type ReviewCreateRequest = {
  orderItemId: number | null
  productId: number
  tasteRating: number
  amountRating: number
  priceRating: number
  content: string
  uploadedFileIds: number[]
  tags: string[]
}

export type ReviewCreateResponse = {
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
