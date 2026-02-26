import { reviewService } from '@/domains/review'
import ReviewDetailHeader from './ReviewDetailHeader'

interface ReviewDetailHeaderServerProps {
  reviewId: number
}

export default async function ReviewDetailHeaderServer({
  reviewId,
}: ReviewDetailHeaderServerProps) {
  // API 호출
  const { error, data } = await reviewService.getReviewDetail(reviewId)

  // Expected Error: API 호출 실패 (네트워크 오류, timeout 등)
  if (error) {
    return <div>-</div>
  }

  // Expected Error: API 응답은 받았지만 데이터가 없거나 실패 응답
  if (!data) {
    return <div>-</div>
  }

  const { memberNickname } = data

  return <ReviewDetailHeader memberNickname={memberNickname} />
}
