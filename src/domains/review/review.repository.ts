import { api } from '@/lib/api'
import {
  CommentCreateRequest,
  CommentCreateResponse,
  CommentListResponse,
  ReplyCreateRequest,
  ReplyCreateResponse,
  ReviewBestListItemResponse,
  ReviewBestQuery,
  ReviewDetailResponse,
  ReviewLatestListItemResponse,
  ReviewLatestQuery,
  ReviewLikeResponse,
  ReviewProductDetailResponse,
} from './review.type'

const ENDPOINT = '/api/reviews'

export const reviewRepository = {
  async getBestReviews(params: ReviewBestQuery) {
    return api.get<ReviewBestListItemResponse[]>(`${ENDPOINT}/v1/best`, { params })
  },
  async getLatestReviews(params: ReviewLatestQuery) {
    return api.get<ReviewLatestListItemResponse[]>(`${ENDPOINT}/v1/latest`, { params })
  },
  async getReviewDetail(reviewId: number) {
    return api.get<ReviewDetailResponse>(`${ENDPOINT}/v1/${reviewId}`)
  },
  async getReviewProductDetail(reviewId: number) {
    return api.get<ReviewProductDetailResponse>(`${ENDPOINT}/v1/${reviewId}/product`)
  },
  async toggleReviewLike(reviewId: number) {
    return api.post<ReviewLikeResponse>(`${ENDPOINT}/v1/${reviewId}/like`)
  },
  async getReviewLike(reviewId: number) {
    return api.get<ReviewLikeResponse>(`${ENDPOINT}/v1/${reviewId}/like`)
  },
  async createReviewComment(reviewId: number, request: CommentCreateRequest) {
    return api.post<CommentCreateResponse>(
      `${ENDPOINT}/v1/${reviewId}/comments`,
      request,
    )
  },
  async getReviewComments(reviewId: number) {
    return api.get<CommentListResponse>(`${ENDPOINT}/v1/${reviewId}/comments`)
  },
  async createReviewReply(reviewId: number, commentId: number, request: ReplyCreateRequest) {
    return api.post<ReplyCreateResponse>(
      `${ENDPOINT}/v1/comments/${commentId}/replies`,
      request,
    )
  },
}
