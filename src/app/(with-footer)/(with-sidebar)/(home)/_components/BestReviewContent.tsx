import FetchErrorState from '@/components/ui/FetchErrorState'
import { reviewRepository } from '@/domains/review'
import { COMMON_ERROR_MESSAGES } from '@/lib/constants'
import BestReviewSwiper from './BestReviewSwiper'

export default async function BestReviewContent() {
  const { error, status, data } = await reviewRepository.getBestReviews({
    page: 0,
    size: 5,
  })

  if ((error && status === 404) || !data) {
    return <FetchErrorState message={COMMON_ERROR_MESSAGES.FETCH_ERROR('리뷰')} />
  }

  if (error) {
    return <FetchErrorState message={COMMON_ERROR_MESSAGES.API_FETCH_ERROR} />
  }

  return <BestReviewSwiper reviews={data} />
}
