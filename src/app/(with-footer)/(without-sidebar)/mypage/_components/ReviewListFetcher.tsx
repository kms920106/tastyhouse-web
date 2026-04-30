'use client'

import { getMyReviews } from '@/actions/member'
import ReviewList from '@/components/reviews/ReviewList'
import ReviewListSkeleton from '@/components/reviews/ReviewListSkeleton'
import FetchErrorState from '@/components/ui/FetchErrorState'
import { COMMON_ERROR_MESSAGES } from '@/lib/constants'
import { useQuery } from '@tanstack/react-query'

export default function ReviewListFetcher() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['mypage', 'reviews'],
    queryFn: async () => {
      const response = await getMyReviews(0, 9)
      return {
        reviews: response.data || [],
        hasMore: (response.pagination?.totalElements ?? 0) > 9,
      }
    },
  })

  if (isLoading) {
    return <ReviewListSkeleton />
  }

  if (error || !data) {
    return <FetchErrorState message={COMMON_ERROR_MESSAGES.FETCH_ERROR('리뷰')} />
  }

  return <ReviewList reviews={data.reviews} hasMoreReviews={data.hasMore} />
}
