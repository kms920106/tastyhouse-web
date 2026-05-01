'use client'

import ReviewFilter from '@/components/reviews/ReviewFilter'
import ReviewListItem from '@/components/reviews/ReviewListItem'
import ReviewPanelSkeleton from '@/components/reviews/ReviewPanelSkeleton'
import FetchErrorState from '@/components/ui/FetchErrorState'
import ViewMoreButton from '@/components/ui/ViewMoreButton'
import type { ReviewPanelData } from '@/hooks/useReviewPanel'
import { useReviewPanel } from '@/hooks/useReviewPanel'
import type { ApiResponse } from '@/lib/api'
import { COMMON_ERROR_MESSAGES } from '@/lib/constants'
import type { UseQueryOptions } from '@tanstack/react-query'
import { useQuery } from '@tanstack/react-query'

interface Props {
  queryOptions: UseQueryOptions<ApiResponse<ReviewPanelData>>
  viewMoreHref?: string
}

export default function ReviewPanel({ queryOptions, viewMoreHref }: Props) {
  const {
    photoOnly,
    setPhotoOnly,
    selectedRating,
    setSelectedRating,
    sortType,
    setSortType,
    deriveReviews,
  } = useReviewPanel()

  const { data, isLoading, error } = useQuery(queryOptions)

  if (isLoading) return <ReviewPanelSkeleton />

  if (error) return <FetchErrorState message={COMMON_ERROR_MESSAGES.API_FETCH_ERROR} />

  if (!data?.data) return <FetchErrorState message={COMMON_ERROR_MESSAGES.FETCH_ERROR('리뷰')} />

  const { sortedReviews, photoReviewCount } = deriveReviews(data.data)

  return (
    <div className="flex flex-col gap-[3px] px-[15px] py-5">
      <ReviewFilter
        count={photoReviewCount}
        photoOnly={photoOnly}
        onPhotoOnlyChange={setPhotoOnly}
        selectedRating={selectedRating}
        onRatingChange={setSelectedRating}
        sortType={sortType}
        onSortTypeChange={setSortType}
      />
      <div className="flex flex-col divide-y divide-[#eeeeee]">
        {sortedReviews.length === 0 ? (
          <div className="w-full py-4 text-sm leading-relaxed text-[#999999] text-center whitespace-pre-line">
            {selectedRating !== null
              ? `${selectedRating}점 리뷰가 없습니다.`
              : '아직 등록된 리뷰가 없습니다.\n첫 번째 리뷰를 남겨보세요!'}
          </div>
        ) : (
          sortedReviews.map((review) => <ReviewListItem key={review.id} review={review} />)
        )}
      </div>
      {selectedRating == null && data.data.totalReviewCount > 5 && viewMoreHref && (
        <div className="flex justify-center">
          <ViewMoreButton href={viewMoreHref} />
        </div>
      )}
    </div>
  )
}
