'use client'

import ErrorMessage from '@/components/ui/ErrorMessage'
import { Skeleton } from '@/components/ui/shadcn/skeleton'
import { ReviewType } from '@/domains/review'
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver'
import { COMMON_ERROR_MESSAGES } from '@/lib/constants'
import { getLatestReviews } from '@/services/review'
import { useInfiniteQuery } from '@tanstack/react-query'
import { useEffect } from 'react'
import LatestReviewListItem from './LatestReviewListItem'

const PAGE_SIZE = 10

export function LatestReviewListSkeleton() {
  return (
    <>
      {[...Array(10)].map((_, i) => (
        <LatestReviewListItemSkeleton key={i} />
      ))}
    </>
  )
}

function LatestReviewListItemSkeleton() {
  return (
    <div className="flex flex-col px-[15px] pt-3 pb-[30px] bg-white">
      <div className="flex justify-between mb-[15px]">
        <div className="flex items-center gap-2.5">
          <Skeleton className="w-10 h-10 rounded-full" />
          <div className="flex flex-col gap-2">
            <Skeleton className="w-20 h-3.5" />
            <Skeleton className="w-16 h-3" />
          </div>
        </div>
        <Skeleton className="w-1 h-[18px] mr-2" />
      </div>
      <div className="mb-6">
        <Skeleton className="aspect-[345/190] w-full rounded-none" />
      </div>
      <div className="space-y-2">
        <Skeleton className="h-[14px] w-full" />
        <Skeleton className="h-[14px] w-full" />
        <Skeleton className="h-[14px] w-3/4" />
      </div>
      <div className="flex gap-4 mt-3.5">
        <Skeleton className="w-15 h-3" />
        <Skeleton className="w-15 h-3" />
      </div>
    </div>
  )
}

interface LatestReviewListProps {
  reviewType: ReviewType
}

export default function LatestReviewList({ reviewType }: LatestReviewListProps) {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, isError, error } =
    useInfiniteQuery({
      queryKey: ['reviews', 'latest', reviewType],
      queryFn: async ({ pageParam }) => {
        const response = await getLatestReviews({
          page: pageParam as number,
          size: PAGE_SIZE,
          type: reviewType,
        })

        // API 에러 처리
        if (response.error) {
          throw new Error(response.error)
        }

        // 응답 데이터 검증
        if (!response.data) {
          throw new Error('응답 데이터가 없습니다.')
        }

        return response
      },
      initialPageParam: 0,
      getNextPageParam: (lastPage) => {
        if (!lastPage.pagination) {
          return undefined
        }

        const { page, totalPages } = lastPage.pagination

        // 다음 페이지가 있으면 페이지 번호 반환, 없으면 undefined
        return page + 1 < totalPages ? page + 1 : undefined
      },
      retry: 1,
      staleTime: 1000 * 60 * 5, // 5분
      gcTime: 1000 * 60 * 10, // 10분
    })

  const { targetRef, isIntersecting, resetIntersecting } = useIntersectionObserver({
    threshold: 0.1,
    rootMargin: '100px',
    enabled: hasNextPage && !isFetchingNextPage,
  })

  useEffect(() => {
    if (isIntersecting && hasNextPage && !isFetchingNextPage) {
      resetIntersecting()
      fetchNextPage()
    }
  }, [isIntersecting, hasNextPage, isFetchingNextPage, fetchNextPage, resetIntersecting])

  if (isLoading) {
    return <LatestReviewListSkeleton />
  }

  if (isError) {
    return (
      <ErrorMessage
        message={error?.message || COMMON_ERROR_MESSAGES.API_FETCH_ERROR}
        className="py-10 bg-white"
      />
    )
  }

  if (!data?.pages || data.pages.length === 0) {
    return (
      <ErrorMessage
        message={COMMON_ERROR_MESSAGES.FETCH_ERROR('리뷰')}
        className="py-10 bg-white"
      />
    )
  }

  // 모든 페이지의 리뷰를 평탄화
  const reviews = data.pages.flatMap((page) => {
    if (!page.data || !Array.isArray(page.data)) {
      return []
    }
    return page.data
  })

  // 리뷰가 없는 경우
  if (reviews.length === 0) {
    return <div className="py-10 bg-white text-center text-sm text-[#aaaaaa]">리뷰가 없습니다.</div>
  }

  return (
    <>
      {reviews.map((review) => (
        <LatestReviewListItem key={review.id} review={review} currentMemberId={null} />
      ))}
      {isFetchingNextPage && <LatestReviewListSkeleton />}
      <div ref={targetRef} className="h-1" aria-hidden="true" />
    </>
  )
}
