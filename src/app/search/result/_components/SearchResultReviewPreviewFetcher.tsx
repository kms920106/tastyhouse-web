'use client'

import BorderedSection from '@/components/ui/BorderedSection'
import FetchErrorState from '@/components/ui/FetchErrorState'
import { COMMON_ERROR_MESSAGES } from '@/constants/errors'
import { useSearchReviewsPreview } from '@/domains/search/search.hook'
import SearchResultEmptyState from './SearchResultEmptyState'
import SearchResultReviewGridItem from './SearchResultReviewGridItem'
import SearchResultReviewGridSkeleton from './SearchResultReviewGridSkeleton'
import SearchResultSectionHeader from './SearchResultSectionHeader'

interface Props {
  query: string
}

export default function SearchResultReviewPreviewFetcher({ query }: Props) {
  const { data, isLoading, isError } = useSearchReviewsPreview(query)

  return (
    <BorderedSection>
      <div className="px-[15px] py-[30px]">
        <SearchResultSectionHeader title="리뷰" />
        {isLoading && <SearchResultReviewGridSkeleton count={9} />}
        {isError && <FetchErrorState message={COMMON_ERROR_MESSAGES.FETCH_ERROR('리뷰')} />}
        {!isLoading && !isError && (data?.data?.length ?? 0) === 0 && (
          <SearchResultEmptyState query={query} label="리뷰" />
        )}
        {!isLoading && !isError && (data?.data?.length ?? 0) > 0 && (
          <div className="grid grid-cols-3">
            {(data?.data ?? []).map((item) => (
              <SearchResultReviewGridItem key={item.reviewId} item={item} />
            ))}
          </div>
        )}
      </div>
    </BorderedSection>
  )
}
