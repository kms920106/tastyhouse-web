'use client'

import CheckboxWithCount from '@/components/reviews/CheckboxWithCount'
import { ReviewImageGallerySkeleton } from '@/components/reviews/ReviewImageGallery'
import ErrorMessage from '@/components/ui/ErrorMessage'
import ViewMoreButton from '@/components/ui/ViewMoreButton'
import { Skeleton } from '@/components/ui/shadcn/skeleton'
import type { ReviewSortType } from '@/domains/review'
import { COMMON_ERROR_MESSAGES } from '@/lib/constants'
import { PAGE_PATHS } from '@/lib/paths'
import { getPlaceReviews } from '@/services/place'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { FiChevronDown } from 'react-icons/fi'
import PlaceReviewListItem from './PlaceReviewItem'

function ReviewListSkeleton() {
  return (
    <section className="flex flex-col gap-[3px] px-[15px] py-5">
      <div className="flex flex-col gap-[30px] pb-2.5 border-b border-[#eeeeee] box-border">
        <div className="flex gap-2.5">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Skeleton key={i} className="h-[42px] w-[70px] rounded-[1px]" />
          ))}
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Skeleton className="w-[25px] h-[25px] rounded-full" />
            <Skeleton className="w-24 h-[14px]" />
          </div>
          <div className="flex items-center gap-1.5">
            <Skeleton className="w-12 h-5" />
            <Skeleton className="w-5 h-5" />
          </div>
        </div>
      </div>
      <div className="flex flex-col divide-y divide-[#eeeeee]">
        {[1, 2, 3].map((i) => (
          <ReviewListItemSkeleton key={i} />
        ))}
      </div>
    </section>
  )
}

function ReviewListItemSkeleton() {
  return (
    <div className="py-5">
      <div className="flex justify-between">
        <div className="flex items-center gap-2.5">
          <Skeleton className="w-10 h-10 rounded-full flex-shrink-0" />
          <div className="flex flex-col gap-2">
            <Skeleton className="w-20 h-3.5" />
            <Skeleton className="w-16 h-3" />
          </div>
        </div>
        <Skeleton className="w-4 h-[19px]" />
      </div>
      <div className="mt-[25px]">
        <Skeleton className="w-32 h-[14px]" />
      </div>
      <div className="mt-[15px] space-y-2">
        <Skeleton className="w-full h-3.5" />
        <Skeleton className="w-full h-3.5" />
        <Skeleton className="w-3/4 h-3.5" />
      </div>
      <div className="mt-5">
        <ReviewImageGallerySkeleton />
      </div>
    </div>
  )
}

interface ReviewFilterProps {
  totalReviewCount: number
  photoOnly: boolean
  onPhotoOnlyChange: (value: boolean) => void
  selectedRating: number | null
  onRatingChange: (rating: number | null) => void
  sortType: ReviewSortType
  onSortTypeChange: (sortType: ReviewSortType) => void
}

function ReviewFilter({
  totalReviewCount,
  photoOnly,
  onPhotoOnlyChange,
  selectedRating,
  onRatingChange,
  sortType,
  onSortTypeChange,
}: ReviewFilterProps) {
  return (
    <div className="flex flex-col gap-[30px] pb-2.5 border-b border-[#eeeeee] box-border">
      <div className="flex gap-2.5">
        <button
          onClick={() => onRatingChange(null)}
          className={`px-[21px] py-[14px] bg-white text-sm leading-[14px] border-1 box-border rounded-[1px] cursor-pointer ${
            selectedRating === null
              ? 'text-[#a11420] font-bold border-main'
              : 'text-[#aaaaaa] border-[#eeeeee]'
          }`}
        >
          전체
        </button>
        {[1, 2, 3, 4, 5].map((rating) => (
          <button
            key={rating}
            onClick={() => onRatingChange(rating)}
            className={`px-[21px] py-[14px] bg-white text-sm leading-[14px] border-1 box-border rounded-[1px] cursor-pointer ${
              selectedRating === rating
                ? 'text-[#a11420] font-bold border-main'
                : 'text-[#aaaaaa] border-[#eeeeee]'
            }`}
          >
            {rating}점
          </button>
        ))}
      </div>
      <div className="flex items-center justify-between">
        <CheckboxWithCount
          label="포토리뷰"
          count={totalReviewCount}
          checked={photoOnly}
          onChange={onPhotoOnlyChange}
        />
        <div className="flex items-center gap-1.5">
          <select
            name="review-sort"
            value={sortType}
            onChange={(e) => onSortTypeChange(e.target.value as ReviewSortType)}
            className="w-fit min-w-[30px] text-xs leading-[12px] text-right appearance-none cursor-pointer focus:outline-none"
          >
            <option value="recommended">추천순</option>
            <option value="latest">최신순</option>
            <option value="oldest">오래된순</option>
          </select>
          <FiChevronDown size={20} className="pointer-events-none" />
        </div>
      </div>
    </div>
  )
}

type ReviewListItem = {
  id: number
  memberProfileImageUrl: string | null
  memberNickname: string
  createdAt: string
  totalRating: number
  productId: number | null
  productName: string | null
  content: string
  imageUrls: string[]
}

const sortReviews = (reviews: ReviewListItem[], sortType: ReviewSortType) => {
  const sorted = [...reviews]
  switch (sortType) {
    case 'recommended':
      // 추천순은 서버에서 정렬된 상태로 받아오므로 그대로 반환
      return sorted
    case 'latest':
      return sorted.sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      )
    case 'oldest':
      return sorted.sort(
        (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
      )
    default:
      return sorted
  }
}

interface ReviewListProps {
  placeId: number
}

export default function ReviewList({ placeId }: ReviewListProps) {
  const [photoOnly, setPhotoOnly] = useState(false)
  const [selectedRating, setSelectedRating] = useState<number | null>(null)
  const [sortType, setSortType] = useState<ReviewSortType>('latest')

  const query = {
    page: 0,
    size: 5,
  }

  const { data, isLoading, error } = useQuery({
    queryKey: ['place', placeId, 'place-detail-reviews'],
    queryFn: () => getPlaceReviews(placeId, query),
  })

  if (isLoading) {
    return <ReviewListSkeleton />
  }

  if (error) {
    return (
      <ErrorMessage message={COMMON_ERROR_MESSAGES.API_FETCH_ERROR} className="py-10 bg-white" />
    )
  }

  if (!data?.data) {
    return (
      <ErrorMessage
        message={COMMON_ERROR_MESSAGES.FETCH_ERROR('리뷰')}
        className="py-10 bg-white"
      />
    )
  }

  const { reviewsByRating, allReviews, totalReviewCount } = data

  // 선택된 평점에 따라 리뷰 필터링
  let filteredReviews = []
  if (selectedRating !== null) {
    filteredReviews = reviewsByRating[String(selectedRating)] || []
  } else {
    filteredReviews = allReviews
  }

  // 포토리뷰만 보기 필터 적용
  if (photoOnly) {
    filteredReviews = filteredReviews.filter(
      (review: ReviewListItem) => review.imageUrls.length > 0,
    )
  }

  // 정렬 적용
  const sortedReviews = sortReviews(filteredReviews, sortType)

  return (
    <div className="flex flex-col gap-[3px] px-[15px] py-5">
      <ReviewFilter
        totalReviewCount={totalReviewCount}
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
          sortedReviews.map((review) => (
            <PlaceReviewListItem
              key={review.id}
              memberProfileImageUrl={review.memberProfileImageUrl}
              memberNickname={review.memberNickname}
              createdAt={review.createdAt}
              totalRating={review.totalRating}
              productId={review.productId}
              productName={review.productName}
              content={review.content}
              id={review.id}
              imageUrls={review.imageUrls}
            />
          ))
        )}
      </div>
      {selectedRating == null && totalReviewCount > 5 && (
        <div className="flex justify-center">
          <ViewMoreButton href={PAGE_PATHS.PLACE_REVIEWS(placeId)} />
        </div>
      )}
    </div>
  )
}
