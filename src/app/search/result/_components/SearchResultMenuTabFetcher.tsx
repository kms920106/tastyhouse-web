'use client'

import FetchErrorState from '@/components/ui/FetchErrorState'
import { COMMON_ERROR_MESSAGES } from '@/constants/errors'
import { useSearchMenusInfinite } from '@/domains/search/search.hook'
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver'
import React, { useEffect } from 'react'
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
      <div>
        {items.map((item, i, arr) => (
          <React.Fragment key={item.id}>
            <SearchResultMenuListItem product={item} />
            {i < arr.length - 1 && <div className="border-t border-[#eeeeee] my-[15px]" />}
          </React.Fragment>
        ))}
        {isFetchingNextPage && (
          <>
            <div className="border-t border-[#eeeeee] my-[15px]" />
            <SearchResultMenuListSkeleton count={2} />
          </>
        )}
      </div>
      <div ref={targetRef} className="h-1" aria-hidden="true" />
    </div>
  )
}
