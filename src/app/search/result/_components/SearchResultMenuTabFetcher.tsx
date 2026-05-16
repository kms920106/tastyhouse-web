'use client'

import FetchErrorState from '@/components/ui/FetchErrorState'
import { COMMON_ERROR_MESSAGES } from '@/constants/errors'
import { useSearchMenusInfinite } from '@/domains/search/search.hook'
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver'
import { useEffect } from 'react'
import SearchResultEmptyState from './SearchResultEmptyState'
import SearchResultMenuListItem from './SearchResultMenuListItem'
import { SearchResultMenuListSkeleton } from './SearchResultMenuListSkeleton'

interface Props {
  query: string
}

export default function SearchResultMenuTabFetcher({ query }: Props) {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, isError } =
    useSearchMenusInfinite(query)

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

  if (isLoading) return <SearchResultMenuListSkeleton />
  if (isError) return <FetchErrorState message={COMMON_ERROR_MESSAGES.API_FETCH_ERROR} />

  const totalElements = data?.pages[0]?.pagination?.totalElements ?? 0
  if (totalElements === 0) return <SearchResultEmptyState query={query} label="메뉴" />

  const items = data?.pages.flatMap((page) => page.data ?? []) ?? []

  return (
    <div className="pb-[90px]">
      <ul>
        {items.map((item) => (
          <SearchResultMenuListItem key={item.id} item={item} />
        ))}
        {isFetchingNextPage && <SearchResultMenuListSkeleton count={2} />}
      </ul>
      <div ref={targetRef} className="h-1" aria-hidden="true" />
    </div>
  )
}
