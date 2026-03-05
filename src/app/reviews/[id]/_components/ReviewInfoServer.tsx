import ErrorMessage from '@/components/ui/ErrorMessage'
import { reviewRepository } from "@/domains/review"
import { COMMON_ERROR_MESSAGES } from '@/lib/constants'
import { ReactNode } from 'react'
import ReviewInfo from './ReviewInfo'

interface ReviewInfoServerProps {
  reviewId: number
  reviewLike: ReactNode
  reviewOption: ReactNode
}

export default async function ReviewInfoServer({
  reviewId,
  reviewLike,
  reviewOption,
}: ReviewInfoServerProps) {
  // API 호출
  const { error, data } = await reviewRepository.getReviewDetail(reviewId)

  // Expected Error: API 호출 실패 (네트워크 오류, timeout 등)
  if (error) {
    return <ErrorMessage message={COMMON_ERROR_MESSAGES.API_FETCH_ERROR} />
  }

  // Expected Error: API 응답은 받았지만 데이터가 없거나 실패 응답
  if (!data) {
    return <ErrorMessage message={COMMON_ERROR_MESSAGES.FETCH_ERROR('리뷰')} />
  }

  return (
    <ReviewInfo
      memberProfileImageUrl={data.memberProfileImageUrl}
      memberNickname={data.memberNickname}
      createdAt={data.createdAt}
      imageUrls={data.imageUrls}
      content={data.content}
      tagNames={data.tagNames}
      id={data.id}
      reviewLike={reviewLike}
      reviewOption={reviewOption}
    />
  )
}
