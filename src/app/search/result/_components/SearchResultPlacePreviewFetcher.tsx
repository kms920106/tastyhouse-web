'use client'

import FetchErrorState from '@/components/ui/FetchErrorState'
import { COMMON_ERROR_MESSAGES } from '@/constants/errors'
import { useSearchPlacesPreview } from '@/domains/search/search.hook'
import SearchResultEmptyState from './SearchResultEmptyState'
import SearchResultPlaceListItem from './SearchResultPlaceListItem'
import { SearchResultPlaceListSkeleton } from './SearchResultPlaceListSkeleton'

interface Props {
  query: string
}

export default function SearchResultPlacePreviewFetcher({ query }: Props) {
  const { data, isLoading, isError } = useSearchPlacesPreview(query)

  if (isLoading) return <SearchResultPlaceListSkeleton count={3} />
  if (isError) return <FetchErrorState message={COMMON_ERROR_MESSAGES.FETCH_ERROR('플레이스')} />
  if (!data?.data || data.data.length === 0)
    return <SearchResultEmptyState query={query} label="플레이스" />

  return (
    <ul className="flex flex-col gap-[10px] px-[15px] py-[15px]">
      {data.data!.map((item) => (
        <SearchResultPlaceListItem key={item.id} item={item} />
      ))}
    </ul>
  )
}
