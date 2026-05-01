'use client'

import { getLatestReviews } from '@/actions/review'
import FetchErrorState from '@/components/ui/FetchErrorState'
import { ReviewType } from '@/domains/review'
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver'
import { COMMON_ERROR_MESSAGES } from '@/lib/constants'
import { useInfiniteQuery } from '@tanstack/react-query'
import { useEffect } from 'react'
import LatestReviewListItem from './LatestReviewListItem'
import { LatestReviewListSkeleton } from './LatestReviewListSkeleton'

const PAGE_SIZE = 10

interface Props {
  reviewType: ReviewType
}

export default function LatestReviewList({ reviewType }: Props) {
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
    return <FetchErrorState message={error?.message || COMMON_ERROR_MESSAGES.API_FETCH_ERROR} />
  }

  if (!data?.pages || data.pages.length === 0) {
    return <FetchErrorState message={COMMON_ERROR_MESSAGES.FETCH_ERROR('리뷰')} />
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
        <LatestReviewListItem key={review.id} review={review} />
      ))}
      {isFetchingNextPage && <LatestReviewListSkeleton />}
      <div ref={targetRef} className="h-1" aria-hidden="true" />
    </>
  )
}
