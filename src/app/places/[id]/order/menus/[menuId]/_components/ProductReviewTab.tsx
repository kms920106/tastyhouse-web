'use client'

import CheckboxWithCount from '@/components/reviews/CheckboxWithCount'
import ReviewAuthorInfo from '@/components/reviews/ReviewAuthorInfo'
import ReviewImageGallery from '@/components/reviews/ReviewImageGallery'
import ClampedText from '@/components/ui/ClampedText'
import ErrorMessage from '@/components/ui/ErrorMessage'
import Rating from '@/components/ui/Rating'
import RatingStar from '@/components/ui/RatingStar'
import ViewMoreButton from '@/components/ui/ViewMoreButton'
import { Skeleton } from '@/components/ui/shadcn/skeleton'
import type { ReviewSortType } from '@/domains/review'
import { COMMON_ERROR_MESSAGES } from '@/lib/constants'
import { formatDecimal, formatNumber } from '@/lib/number'
import { PAGE_PATHS } from '@/lib/paths'
import { getProductReviewStatistics, getProductReviews } from '@/services/product'
import { useQuery } from '@tanstack/react-query'
import Link from 'next/link'
import { useState } from 'react'
import { FiChevronDown } from 'react-icons/fi'

function ReviewStatisticSkeleton() {
  return (
    <div className="flex items-center justify-center gap-[30px] pt-[30px] pb-[21px] border-b border-[#eeeeee] box-border">
      <div className="flex flex-col items-center">
        <div className="flex items-baseline gap-1 mb-[15px]">
          <Skeleton className="w-10 h-9" />
          <Skeleton className="w-[8px] h-[16px]" />
          <Skeleton className="w-[12px] h-[16px]" />
        </div>
        <div className="flex items-center gap-0 mb-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <Skeleton key={star} className="w-[14px] h-[14px]" />
          ))}
        </div>
        <Skeleton className="w-16 h-[10px]" />
      </div>
      <div className="flex flex-col gap-2.5">
        <Skeleton className="w-20 h-3" />
        <Skeleton className="w-20 h-3" />
        <Skeleton className="w-20 h-3" />
      </div>
    </div>
  )
}

interface ReviewStatisticProps {
  productId: number
}

function ReviewStatistic({ productId }: ReviewStatisticProps) {
  const { data, isLoading, error } = useQuery({
    queryKey: ['product', productId, 'review-statistics'],
    queryFn: () => getProductReviewStatistics(productId),
  })

  if (isLoading) {
    return <ReviewStatisticSkeleton />
  }

  if (error) {
    return (
      <ErrorMessage message={COMMON_ERROR_MESSAGES.API_FETCH_ERROR} className="py-10 bg-white" />
    )
  }

  if (!data?.data) {
    return (
      <ErrorMessage
        message={COMMON_ERROR_MESSAGES.FETCH_ERROR('리뷰 통계')}
        className="py-10 bg-white"
      />
    )
  }

  const statistics = data.data
  const {
    totalRating,
    totalReviewCount,
    averageTasteRating,
    averageAmountRating,
    averagePriceRating,
  } = statistics

  // totalRating이 null인 경우 평균 계산
  const calculatedTotalRating =
    totalRating !== null
      ? totalRating
      : (averageTasteRating + averageAmountRating + averagePriceRating) / 3

  return (
    <div className="flex items-center justify-center gap-[50px] pt-[30px] pb-[21px] border-b border-[#eeeeee] box-border">
      <div className="flex flex-col items-center">
        <div className="flex items-baseline gap-1 mb-[15px]">
          <span className="text-[32px] leading-[32px] tracking-[-1.6px]">
            {formatDecimal(calculatedTotalRating, 1)}
          </span>
          <span className="text-base leading-[16px] text-[#999999] tracking-[-1.6px]">/</span>
          <span className="text-base leading-[16px] text-[#999999] tracking-[-1.6px]">5</span>
        </div>
        <div className="flex items-center gap-0 mb-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <RatingStar key={star} starIndex={star} rating={calculatedTotalRating} />
          ))}
        </div>
        <p className="text-[10px] leading-[10px] text-[#aaaaaa] tracking-[-0.5px]">
          {formatNumber(totalReviewCount)} 개의 리뷰
        </p>
      </div>
      <div className="flex flex-col gap-2.5">
        <div className="flex items-center gap-[7px]">
          <span className="w-8 text-xs leading-[12px] text-[#666666]">맛</span>
          <div className="flex items-center gap-[7px]">
            <div className="flex items-center">
              {[1, 2, 3, 4, 5].map((star) => (
                <RatingStar key={star} starIndex={star} rating={averageTasteRating} />
              ))}
            </div>
            <span className="text-xs leading-[12px] text-main">
              {formatDecimal(averageTasteRating, 1)}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-[7px]">
          <span className="w-8 text-xs leading-[12px] text-[#666666]">양</span>
          <div className="flex items-center gap-[7px]">
            <div className="flex items-center">
              {[1, 2, 3, 4, 5].map((star) => (
                <RatingStar key={star} starIndex={star} rating={averageAmountRating} />
              ))}
            </div>
            <span className="text-xs leading-[12px] text-main">
              {formatDecimal(averageAmountRating, 1)}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-[7px]">
          <span className="w-8 text-xs leading-[12px] text-[#666666]">가격</span>
          <div className="flex items-center gap-[7px]">
            <div className="flex items-center">
              {[1, 2, 3, 4, 5].map((star) => (
                <RatingStar key={star} starIndex={star} rating={averagePriceRating} />
              ))}
            </div>
            <span className="text-xs leading-[12px] text-main">
              {formatDecimal(averagePriceRating, 1)}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

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
        <Skeleton className="aspect-[345/190] w-full rounded-none" />
      </div>
    </div>
  )
}

interface ReviewFilterProps {
  photoReviewCount: number
  photoOnly: boolean
  onPhotoOnlyChange: (value: boolean) => void
  selectedRating: number | null
  onRatingChange: (rating: number | null) => void
  sortType: ReviewSortType
  onSortTypeChange: (sortType: ReviewSortType) => void
}

function ReviewFilter({
  photoReviewCount,
  photoOnly,
  onPhotoOnlyChange,
  selectedRating,
  onRatingChange,
  sortType,
  onSortTypeChange,
}: ReviewFilterProps) {
  return (
    <div className="flex flex-col gap-[30px] pb-2.5 border-b border-[#eeeeee] box-border">
      <div className="flex gap-2.5 overflow-x-auto">
        <button
          onClick={() => onRatingChange(null)}
          className={`px-[21px] py-[14px] bg-white text-sm leading-[14px] border-1 box-border rounded-[1px] cursor-pointer flex-shrink-0 ${
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
            className={`px-[21px] py-[14px] bg-white text-sm leading-[14px] border-1 box-border rounded-[1px] cursor-pointer flex-shrink-0 ${
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
          count={photoReviewCount}
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
  productId: number
  productName: string
  content: string
  imageUrls: string[]
}

const sortReviews = (reviews: ReviewListItem[], sortType: ReviewSortType) => {
  const sorted = [...reviews]
  switch (sortType) {
    case 'recommended':
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

interface ProductReviewItemProps {
  review: ReviewListItem
}

function ProductReviewItem({ review }: ProductReviewItemProps) {
  return (
    <div className="py-5">
      <div className="flex justify-between">
        <ReviewAuthorInfo
          profileImageUrl={review.memberProfileImageUrl}
          nickname={review.memberNickname}
          createdAt={review.createdAt}
        />
        <Rating as="p" value={review.totalRating} />
      </div>
      <div className="mt-[25px]">
        <Link
          href={PAGE_PATHS.PRODUCT_DETAIL(review.productId)}
          className="block text-sm leading-[14px] text-[#999999]"
        >
          [선택] {review.productName}
        </Link>
      </div>
      <div className="mt-[15px]">
        <ClampedText text={review.content} href={PAGE_PATHS.REVIEW_PRODUCT_DETAIL(review.id)} />
      </div>
      {review.imageUrls.length > 0 && (
        <div className="mt-5">
          <ReviewImageGallery imageUrls={review.imageUrls} />
        </div>
      )}
    </div>
  )
}

interface ProductReviewTabProps {
  productId: number
}

export default function ProductReviewTab({ productId }: ProductReviewTabProps) {
  const [photoOnly, setPhotoOnly] = useState(false)
  const [selectedRating, setSelectedRating] = useState<number | null>(null)
  const [sortType, setSortType] = useState<ReviewSortType>('latest')

  const query = {
    page: 0,
    size: 5,
  }

  const { data, isLoading, error } = useQuery({
    queryKey: ['product', productId, 'reviews'],
    queryFn: () => getProductReviews(productId, query),
  })

  if (isLoading) {
    return (
      <div>
        <ReviewStatisticSkeleton />
        <ReviewListSkeleton />
      </div>
    )
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

  const { reviewsByRating, allReviews, totalReviewCount } = data.data

  // 선택된 평점에 따라 리뷰 필터링
  let filteredReviews: ReviewListItem[] = []
  if (selectedRating !== null) {
    filteredReviews = reviewsByRating[String(selectedRating)] || []
  } else {
    filteredReviews = allReviews
  }

  // 포토리뷰만 보기 필터 적용
  if (photoOnly) {
    filteredReviews = filteredReviews.filter((review) => review.imageUrls.length > 0)
  }

  // 정렬 적용
  const sortedReviews = sortReviews(filteredReviews, sortType)

  // 포토리뷰 개수 계산
  const photoReviewCount = allReviews.filter((review) => review.imageUrls.length > 0).length

  return (
    <div>
      <ReviewStatistic productId={productId} />
      <div className="flex flex-col gap-[3px] px-[15px] py-5">
        <ReviewFilter
          photoReviewCount={photoReviewCount}
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
            sortedReviews.map((review) => <ProductReviewItem key={review.id} review={review} />)
          )}
        </div>
        {selectedRating == null && totalReviewCount > 5 && (
          <div className="flex justify-center">
            <ViewMoreButton href={PAGE_PATHS.PRODUCT_REVIEWS(productId)} />
          </div>
        )}
      </div>
    </div>
  )
}
