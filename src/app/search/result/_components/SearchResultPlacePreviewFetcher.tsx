'use client'

import BorderedSection from '@/components/ui/BorderedSection'
import FetchErrorState from '@/components/ui/FetchErrorState'
import { COMMON_ERROR_MESSAGES } from '@/constants/errors'
import { useSearchPlacesPreview } from '@/domains/search/search.hook'
import SearchResultEmptyState from './SearchResultEmptyState'
import SearchResultPlaceListItem from './SearchResultPlaceListItem'
import { SearchResultPlaceListSkeleton } from './SearchResultPlaceListSkeleton'
import SearchResultSectionHeader from './SearchResultSectionHeader'

interface Props {
  query: string
}

export default function SearchResultPlacePreviewFetcher({ query }: Props) {
  const { data, isLoading, isError } = useSearchPlacesPreview(query)

  return (
    <BorderedSection>
      <div className="px-[15px] py-[30px]">
        <SearchResultSectionHeader title="플레이스" />
        {isLoading && <SearchResultPlaceListSkeleton count={3} />}
        {isError && <FetchErrorState message={COMMON_ERROR_MESSAGES.FETCH_ERROR('플레이스')} />}
        {!isLoading && !isError && (data?.data?.length ?? 0) === 0 && (
          <SearchResultEmptyState query={query} label="플레이스" />
        )}
        {!isLoading && !isError && (data?.data?.length ?? 0) > 0 && (
          <ul className="flex flex-col gap-[10px] px-[15px] py-[15px]">
            {(data?.data ?? []).map((item) => (
              <SearchResultPlaceListItem key={item.id} item={item} />
            ))}
          </ul>
        )}
      </div>
    </BorderedSection>
  )
}
