import 'server-only'

import { api, publicApi } from '@/lib/api'
import type { MyReviewListItemResponse } from '@/domains/member'
import { PaginationParams } from '@/types/common'
import {
  CommentCreateRequest,
  CommentCreateResponse,
  CommentListResponse,
  ReplyCreateRequest,
  ReplyCreateResponse,
  ReviewBestListItemResponse,
  ReviewCreateRequest,
  ReviewCreateResponse,
  ReviewDetailResponse,
  ReviewLatestListItemResponse,
  ReviewLatestQuery,
  ReviewLikeResponse,
  ReviewProductDetailResponse,
  ReviewWriteInfoResponse,
} from './review.dto'

const ENDPOINT = '/api/reviews'

const CACHE_OPTIONS = { cache: 'force-cache' as const, next: { revalidate: 3600 } }

export const reviewRepository = {
  async getBestReviews(params: PaginationParams) {
    return publicApi.get<ReviewBestListItemResponse[]>(`${ENDPOINT}/v1/best`, { ...CACHE_OPTIONS, params })
  },
  async getLatestReviews(params: ReviewLatestQuery) {
    return publicApi.get<ReviewLatestListItemResponse[]>(`${ENDPOINT}/v1/latest`, { ...CACHE_OPTIONS, params })
  },
  async getReviewDetail(reviewId: number) {
    return publicApi.get<ReviewDetailResponse>(`${ENDPOINT}/v1/${reviewId}`, CACHE_OPTIONS)
  },
  async getReviewProductDetail(reviewId: number) {
    return publicApi.get<ReviewProductDetailResponse>(`${ENDPOINT}/v1/${reviewId}/product`, CACHE_OPTIONS)
  },
  async toggleReviewLike(reviewId: number) {
    return api.post<ReviewLikeResponse>(`${ENDPOINT}/v1/${reviewId}/like`)
  },
  async getReviewLike(reviewId: number) {
    return api.get<ReviewLikeResponse>(`${ENDPOINT}/v1/${reviewId}/like`)
  },
  async createReviewComment(reviewId: number, request: CommentCreateRequest) {
    return api.post<CommentCreateResponse>(`${ENDPOINT}/v1/${reviewId}/comments`, request)
  },
  async getReviewComments(reviewId: number) {
    return publicApi.get<CommentListResponse>(`${ENDPOINT}/v1/${reviewId}/comments`, CACHE_OPTIONS)
  },
  async createReviewReply(reviewId: number, commentId: number, request: ReplyCreateRequest) {
    return api.post<ReplyCreateResponse>(`${ENDPOINT}/v1/comments/${commentId}/replies`, request)
  },
  async getReviewWriteInfo(orderItemId: number) {
    return api.get<ReviewWriteInfoResponse>(`${ENDPOINT}/v1/write/order-items/${orderItemId}`)
  },
  async createReview(request: ReviewCreateRequest) {
    return api.post<ReviewCreateResponse>(`${ENDPOINT}/v1`, request)
  },
  async getMemberReviews(memberId: number | string, params: PaginationParams) {
    return publicApi.get<MyReviewListItemResponse[]>(`${ENDPOINT}/v1/members/${memberId}`, { ...CACHE_OPTIONS, params })
  },
}
