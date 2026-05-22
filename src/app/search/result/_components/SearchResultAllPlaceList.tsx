'use client'

import BookmarkListItem from '@/components/places/BookmarkListItem'
import { BookmarkListItemSkeleton } from '@/components/places/BookmarkListItemSkeleton'
import FetchErrorState from '@/components/ui/FetchErrorState'
import { COMMON_ERROR_MESSAGES } from '@/constants/errors'
import { useSearchPlacesPreview } from '@/domains/search/search.hook'
import SearchResultEmptyState from './SearchResultEmptyState'

interface Props {
  query: string
}

export default function SearchResultAllPlaceList({ query }: Props) {
  const { data, isLoading, isError } = useSearchPlacesPreview(query)

  if (isLoading)
    return (
      <div className="flex flex-col gap-2.5">
        {Array.from({ length: 3 }).map((_, i) => (
          <BookmarkListItemSkeleton key={i} />
        ))}
      </div>
    )
  if (isError) return <FetchErrorState message={COMMON_ERROR_MESSAGES.FETCH_ERROR('플레이스')} />
  if (!data?.data || data.data.length === 0)
    return <SearchResultEmptyState query={query} label="플레이스" />

  return (
    <div className="flex flex-col gap-2.5">
      {data.data.map((bookmark) => (
        <BookmarkListItem
          key={bookmark.bookmarkId}
          placeId={bookmark.placeId}
          placeImage={bookmark.imageUrl}
          region={bookmark.stationName}
          placeName={bookmark.placeName}
          rating={bookmark.rating}
          isBookmarked={bookmark.isBookmarked}
        />
      ))}
    </div>
  )
}
