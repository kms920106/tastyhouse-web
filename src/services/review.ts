'use server'

import type {
  CommentCreateRequest,
  ReplyCreateRequest,
  ReviewCreateRequest,
  ReviewLatestQuery,
} from '@/domains/review'
import { reviewRepository } from '@/domains/review'
import { revalidatePath } from 'next/cache'

export async function getLatestReviews(params: ReviewLatestQuery) {
  return reviewRepository.getLatestReviews(params)
}

export async function toggleReviewLike(reviewId: number) {
  return reviewRepository.toggleReviewLike(reviewId)
}

export async function createComment(reviewId: number, request: CommentCreateRequest) {
  const result = await reviewRepository.createReviewComment(reviewId, request)

  if (!result.error && result.data) {
    revalidatePath(`/reviews/${reviewId}`)
  }

  return result
}

export async function createReply(
  reviewId: number,
  commentId: number,
  request: ReplyCreateRequest,
) {
  const result = await reviewRepository.createReviewReply(reviewId, commentId, request)
  if (!result.error && result.data) {
    revalidatePath(`/reviews/${reviewId}`)
  }

  return result
}

export async function getReviewWriteInfo(orderItemId: number) {
  return reviewRepository.getReviewWriteInfo(orderItemId)
}

export async function createOrderReview(request: ReviewCreateRequest) {
  const result = await reviewRepository.createReview(request)

  if (!result.error && result.data) {
    revalidatePath('/orders')
  }

  return result
}

export async function getMemberReviews(memberId: number | string, page: number = 0, size: number = 9) {
  return reviewRepository.getMemberReviews(memberId, { page, size })
}
