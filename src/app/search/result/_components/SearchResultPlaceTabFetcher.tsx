'use client'

import BookmarkListItem from '@/components/places/BookmarkListItem'
import { BookmarkListItemSkeleton } from '@/components/places/BookmarkListItemSkeleton'
import FetchErrorState from '@/components/ui/FetchErrorState'
import { COMMON_ERROR_MESSAGES } from '@/constants/errors'
import { useSearchPlacesInfinite } from '@/domains/search/search.hook'
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver'
import { useEffect } from 'react'
import SearchResultEmptyState from './SearchResultEmptyState'

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

  if (isLoading)
    return (
      <div className="flex flex-col gap-[10px] px-[15px] py-[20px]">
        {Array.from({ length: 5 }).map((_, i) => (
          <BookmarkListItemSkeleton key={i} />
        ))}
      </div>
    )
  if (isError) return <FetchErrorState message={COMMON_ERROR_MESSAGES.API_FETCH_ERROR} />

  const totalElements = data?.pages[0]?.pagination?.totalElements ?? 0
  if (totalElements === 0) return <SearchResultEmptyState query={query} label="플레이스" />

  const items = data?.pages.flatMap((page) => page.data ?? []) ?? []

  return (
    <div className="px-[15px] py-[20px] pb-[90px]">
      <div className="flex flex-col gap-[10px]">
        {items.map((item) => (
          <BookmarkListItem
            key={item.id}
            placeId={item.id}
            placeImage={item.imageUrl ?? ''}
            region={item.stationName}
            placeName={item.name}
            rating={item.rating}
            isBookmarked={item.isBookmarked ?? false}
          />
        ))}
        {isFetchingNextPage && (
          <>
            <BookmarkListItemSkeleton />
            <BookmarkListItemSkeleton />
          </>
        )}
      </div>
      <div ref={targetRef} className="h-1" aria-hidden="true" />
    </div>
  )
}
