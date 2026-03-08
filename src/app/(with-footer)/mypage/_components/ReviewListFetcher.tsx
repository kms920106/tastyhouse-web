'use client'

import ReviewList from '@/components/reviews/ReviewList'
import ErrorMessage from '@/components/ui/ErrorMessage'
import { Skeleton } from '@/components/ui/shadcn/skeleton'
import { COMMON_ERROR_MESSAGES } from '@/lib/constants'
import { getMyReviews } from '@/services/member'
import { useQuery } from '@tanstack/react-query'

function ReviewListSkeleton() {
  return (
    <>
      <div className="py-[1px]">
        <div className="grid grid-cols-3 gap-[1.5px]">
          {Array.from({ length: 9 }).map((_, index) => (
            <Skeleton key={index} className="relative aspect-square" />
          ))}
        </div>
      </div>
      <div className="h-[70px]"></div>
    </>
  )
}

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

  if (error) {
    return (
      <ErrorMessage
        message={COMMON_ERROR_MESSAGES.FETCH_ERROR('리뷰')}
        className="py-10 bg-white"
      />
    )
  }

  if (!data) {
    return (
      <ErrorMessage
        message={COMMON_ERROR_MESSAGES.FETCH_ERROR('리뷰')}
        className="py-10 bg-white"
      />
    )
  }

  return <ReviewList reviews={data.reviews} hasMoreReviews={data.hasMore} />
}
