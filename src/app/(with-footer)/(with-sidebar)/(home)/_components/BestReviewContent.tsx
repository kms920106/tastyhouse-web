import FetchErrorState from '@/components/ui/FetchErrorState'
import { reviewRepository } from '@/domains/review'
import { COMMON_ERROR_MESSAGES } from '@/lib/constants'
import BestReviewSwiper from './BestReviewSwiper'

export default async function BestReviewContent() {
  // API 호출
  const query = {
    page: 0,
    size: 5,
  }
  const { data, error } = await reviewRepository.getBestReviews(query)

  if (error) {
    return <FetchErrorState message={COMMON_ERROR_MESSAGES.API_FETCH_ERROR} />
  }

  if (!data) {
    return <FetchErrorState message={COMMON_ERROR_MESSAGES.FETCH_ERROR('리뷰')} />
  }

  return <BestReviewSwiper reviews={data} />
}
