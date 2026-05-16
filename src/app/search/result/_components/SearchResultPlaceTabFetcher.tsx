'use client'

import FetchErrorState from '@/components/ui/FetchErrorState'
import { COMMON_ERROR_MESSAGES } from '@/constants/errors'
import { useSearchPlacesInfinite } from '@/domains/search/search.hook'
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver'
import { useEffect } from 'react'
import SearchResultEmptyState from './SearchResultEmptyState'
import SearchResultPlaceListItem from './SearchResultPlaceListItem'
import { SearchResultPlaceListSkeleton } from './SearchResultPlaceListSkeleton'

interface Props {
  query: string
}

export default function SearchResultPlaceTabFetcher({ query }: Props) {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, isError } =
    useSearchPlacesInfinite(query)

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

  if (isLoading) return <SearchResultPlaceListSkeleton />
  if (isError) return <FetchErrorState message={COMMON_ERROR_MESSAGES.API_FETCH_ERROR} />

  const totalElements = data?.pages[0]?.pagination?.totalElements ?? 0
  if (totalElements === 0) return <SearchResultEmptyState query={query} label="플레이스" />

  const items = data?.pages.flatMap((page) => page.data ?? []) ?? []

  return (
    <div className="px-[15px] py-[20px] pb-[90px]">
      <ul className="flex flex-col gap-[10px]">
        {items.map((item) => (
          <SearchResultPlaceListItem key={item.id} item={item} />
        ))}
        {isFetchingNextPage && <SearchResultPlaceListSkeleton count={2} />}
      </ul>
      <div ref={targetRef} className="h-1" aria-hidden="true" />
    </div>
  )
}
