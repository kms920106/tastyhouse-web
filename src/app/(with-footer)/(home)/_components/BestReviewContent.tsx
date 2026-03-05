import ErrorMessage from '@/components/ui/ErrorMessage'
import { reviewRepository } from "@/domains/review"
import { COMMON_ERROR_MESSAGES } from '@/lib/constants'
import BestReviewSwiper from './BestReviewSwiper'

export default async function BestReviewContent() {
  // API 호출
  const query = {
    page: 0,
    size: 5,
  }
  const { data, error } = await reviewRepository.getBestReviews(query)

  // Expected Error: API 호출 실패 (네트워크 오류, timeout 등)
  if (error) {
    return <ErrorMessage message={COMMON_ERROR_MESSAGES.API_FETCH_ERROR} />
  }

  // Expected Error: API 응답은 받았지만 데이터가 없거나 실패 응답
  if (!data) {
    return <ErrorMessage message={COMMON_ERROR_MESSAGES.FETCH_ERROR('리뷰')} />
  }

  return <BestReviewSwiper reviews={data} />
}
