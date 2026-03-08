'use client'

import ErrorMessage from '@/components/ui/ErrorMessage'
import { Skeleton } from '@/components/ui/shadcn/skeleton'
import { COMMON_ERROR_MESSAGES } from '@/lib/constants'
import ReviewList from '@/app/(with-footer)/mypage/_components/ReviewList'
import { getMemberReviews } from '@/services/review'
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
    return (
      <ErrorMessage
        message={COMMON_ERROR_MESSAGES.FETCH_ERROR('리뷰')}
        className="py-10 bg-white"
      />
    )
  }

  return <ReviewList reviews={data.reviews} hasMoreReviews={data.hasMore} />
}
