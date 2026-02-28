import { reviewRepository } from './review.repository'
import {
  CommentCreateRequest,
  ReplyCreateRequest,
  ReviewBestQuery,
  ReviewCreateRequest,
  ReviewLatestQuery,
} from './review.type'

export const reviewService = {
  async getBestReviews(params: ReviewBestQuery) {
    return reviewRepository.getBestReviews(params)
  },
  async getLatestReviews(params: ReviewLatestQuery) {
    return reviewRepository.getLatestReviews(params)
  },
  async getReviewDetail(reviewId: number) {
    return reviewRepository.getReviewDetail(reviewId)
  },
  async getReviewProductDetail(reviewId: number) {
    return reviewRepository.getReviewProductDetail(reviewId)
  },
  async toggleReviewLike(reviewId: number) {
    return reviewRepository.toggleReviewLike(reviewId)
  },
  async getReviewLike(reviewId: number) {
    return reviewRepository.getReviewLike(reviewId)
  },
  async createReviewComment(reviewId: number, request: CommentCreateRequest) {
    return reviewRepository.createReviewComment(reviewId, request)
  },
  async getReviewComments(reviewId: number) {
    return reviewRepository.getReviewComments(reviewId)
  },
  async createReviewReply(reviewId: number, commentId: number, request: ReplyCreateRequest) {
    return reviewRepository.createReviewReply(reviewId, commentId, request)
  },
  async getReviewWriteInfo(orderItemId: number) {
    return reviewRepository.getReviewWriteInfo(orderItemId)
  },
  async createReview(request: ReviewCreateRequest) {
    return reviewRepository.createReview(request)
  },
}
