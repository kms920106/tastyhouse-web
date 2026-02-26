import ErrorMessage from '@/components/ui/ErrorMessage'
import { reviewService } from '@/domains/review'
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
  const { error, data } = await reviewService.getReviewDetail(reviewId)

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
      memberProfileImageUrl={data.data.memberProfileImageUrl}
      memberNickname={data.data.memberNickname}
      createdAt={data.data.createdAt}
      imageUrls={data.data.imageUrls}
      content={data.data.content}
      tagNames={data.data.tagNames}
      id={data.data.id}
      reviewLike={reviewLike}
      reviewOption={reviewOption}
    />
  )
}
