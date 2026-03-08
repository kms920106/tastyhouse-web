'use client'

import ReviewList from '@/components/reviews/ReviewList'
import ReviewListSkeleton from '@/components/reviews/ReviewListSkeleton'
import ErrorMessage from '@/components/ui/ErrorMessage'
import { COMMON_ERROR_MESSAGES } from '@/lib/constants'
import { getMyReviews } from '@/services/member'
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
    return (
      <ErrorMessage
        message={COMMON_ERROR_MESSAGES.FETCH_ERROR('리뷰')}
        className="py-10 bg-white"
      />
    )
  }

  return <ReviewList reviews={data.reviews} hasMoreReviews={data.hasMore} />
}
