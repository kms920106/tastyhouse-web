'use client'

import FetchErrorState from '@/components/ui/FetchErrorState'
import { COMMON_ERROR_MESSAGES } from '@/constants/errors'
import { useSearchReviewsPreview } from '@/domains/search/search.hook'
import SearchResultEmptyState from './SearchResultEmptyState'
import SearchResultReviewGridItem from './SearchResultReviewGridItem'
import SearchResultReviewGridSkeleton from './SearchResultReviewGridSkeleton'

interface Props {
  query: string
}

export default function SearchResultReviewPreviewFetcher({ query }: Props) {
  const { data, isLoading, isError } = useSearchReviewsPreview(query)

  if (isLoading) return <SearchResultReviewGridSkeleton count={9} />
  if (isError) return <FetchErrorState message={COMMON_ERROR_MESSAGES.FETCH_ERROR('리뷰')} />
  if (!data?.data || data.data.length === 0)
    return <SearchResultEmptyState query={query} label="리뷰" />

  return (
    <div className="grid grid-cols-3">
      {data.data!.map((item) => (
        <SearchResultReviewGridItem key={item.reviewId} item={item} />
      ))}
    </div>
  )
}
