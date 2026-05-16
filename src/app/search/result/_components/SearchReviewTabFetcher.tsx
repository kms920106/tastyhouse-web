'use client'

import FetchErrorState from '@/components/ui/FetchErrorState'
import { COMMON_ERROR_MESSAGES } from '@/constants/errors'
import { useSearchReviewsInfinite } from '@/domains/search/search.hook'
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver'
import { useEffect } from 'react'
import SearchEmptyState from './SearchEmptyState'
import SearchReviewGridItem from './SearchReviewGridItem'
import SearchReviewGridSkeleton from './SearchReviewGridSkeleton'

interface Props {
  query: string
}

export default function SearchReviewTabFetcher({ query }: Props) {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, isError } =
    useSearchReviewsInfinite(query)

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

  if (isLoading) return <SearchReviewGridSkeleton />
  if (isError) return <FetchErrorState message={COMMON_ERROR_MESSAGES.API_FETCH_ERROR} />

  const totalElements = data?.pages[0]?.pagination?.totalElements ?? 0
  if (totalElements === 0) return <SearchEmptyState query={query} label="리뷰" />

  const items = data?.pages.flatMap((page) => page.data ?? []) ?? []

  return (
    <div className="pb-[90px]">
      <div className="grid grid-cols-3">
        {items.map((item) => (
          <SearchReviewGridItem key={item.reviewId} item={item} />
        ))}
      </div>
      {isFetchingNextPage && <SearchReviewGridSkeleton count={3} />}
      <div ref={targetRef} className="h-1" aria-hidden="true" />
    </div>
  )
}
