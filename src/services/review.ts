'use server'

import type {
  CommentCreateRequest,
  ReplyCreateRequest,
  ReviewCreateRequest,
  ReviewLatestQuery,
} from '@/domains/review'
import { reviewService } from '@/domains/review'
import { revalidatePath } from 'next/cache'

export async function getLatestReviews(params: ReviewLatestQuery) {
  return await reviewService.getLatestReviews(params)
}

export async function toggleReviewLike(reviewId: number) {
  return await reviewService.toggleReviewLike(reviewId)
}

export async function createComment(reviewId: number, request: CommentCreateRequest) {
  const result = await reviewService.createReviewComment(reviewId, request)

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
  const result = await reviewService.createReviewReply(reviewId, commentId, request)
  if (!result.error && result.data) {
    revalidatePath(`/reviews/${reviewId}`)
  }

  return result
}

export async function getReviewWriteInfo(orderItemId: number) {
  return await reviewService.getReviewWriteInfo(orderItemId)
}

export async function createOrderReview(request: ReviewCreateRequest) {
  const result = await reviewService.createReview(request)

  if (!result.error && result.data) {
    revalidatePath('/orders')
  }

  return result
}
