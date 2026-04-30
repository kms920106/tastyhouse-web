'use client'

import { getMemberReviews } from '@/actions/review'
import ReviewList from '@/components/reviews/ReviewList'
import ReviewListSkeleton from '@/components/reviews/ReviewListSkeleton'
import FetchErrorState from '@/components/ui/FetchErrorState'
import { COMMON_ERROR_MESSAGES } from '@/lib/constants'
import { useQuery } from '@tanstack/react-query'

interface MemberReviewListFetcherProps {
  memberId: number
}

export default function MemberReviewListFetcher({ memberId }: MemberReviewListFetcherProps) {
  const { data, isLoading, error } = useQuery({
    queryKey: ['member', memberId, 'reviews'],
    queryFn: async () => {
      const response = await getMemberReviews(memberId, 0, 9)
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
