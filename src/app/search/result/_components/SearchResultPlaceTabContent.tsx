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
  isLoggedIn: boolean
}

export default function SearchResultPlaceTabContent({ query, isLoggedIn }: Props) {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, isError } =
    useSearchPlacesInfinite(query, isLoggedIn)

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

  const bookmarks = data?.pages.flatMap((page) => page.data ?? []) ?? []

  return (
    <div className="px-[15px] py-[20px] pb-[90px]">
      <div className="flex flex-col gap-[10px]">
        {bookmarks.map((bookmark) => (
          <BookmarkListItem
            key={bookmark.placeId}
            placeId={bookmark.placeId}
            placeImage={bookmark.imageUrl}
            region={bookmark.stationName}
            placeName={bookmark.placeName}
            rating={bookmark.rating}
            isBookmarked={bookmark.bookmarked}
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
