import ReviewRatingDetail, {
  ReviewRatingDetailSkeleton,
} from '@/components/reviews/ReviewRatingDetail'
import ErrorMessage from '@/components/ui/ErrorMessage'
import RatingStar from '@/components/ui/RatingStar'
import { Skeleton } from '@/components/ui/shadcn/skeleton'
import { COMMON_ERROR_MESSAGES } from '@/lib/constants'
import { formatDecimal, formatNumber } from '@/lib/number'
import { getPlaceReviewStatistics } from '@/services/place'
import { useQuery } from '@tanstack/react-query'
import RatingDistributionChart from './RatingDistributionChart'

function ReviewStatisticSkeleton() {
  return (
    <>
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
        <div className="flex items-end justify-center gap-[13px]">
          {[5, 4, 3, 2, 1].map((rating) => (
            <div key={rating} className="flex flex-col items-center gap-[13px]">
              <Skeleton className="w-[5px] h-[50px] rounded-full" />
              <Skeleton className="w-[18px] h-[12px]" />
            </div>
          ))}
        </div>
      </div>
      <div className="px-[15px] pt-[19px] pb-[30px]">
        <ReviewRatingDetailSkeleton />
      </div>
    </>
  )
}

interface ReviewStatisticProps {
  placeId: number
}

export default function ReviewStatistic({ placeId }: ReviewStatisticProps) {
  const { data, isLoading, error } = useQuery({
    queryKey: ['place', placeId, 'place-detail-review-statistics'],
    queryFn: () => getPlaceReviewStatistics(placeId),
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
    averageAtmosphereRating,
    averageKindnessRating,
    averageHygieneRating,
    willRevisitPercentage,
    ratingCounts,
  } = statistics

  return (
    <>
      <div className="flex items-center justify-center gap-[30px] pt-[30px] pb-[21px] border-b border-[#eeeeee] box-border">
        <div className="flex flex-col items-center">
          <div className="flex items-baseline gap-1 mb-[15px]">
            <span className="text-[32px] leading-[32px] tracking-[-1.6px]">
              {formatDecimal(totalRating, 1)}
            </span>
            <span className="text-base leading-[16px] text-[#999999] tracking-[-1.6px]">/</span>
            <span className="text-base leading-[16px] text-[#999999] tracking-[-1.6px]">5</span>
          </div>
          <div className="flex items-center gap-0 mb-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <RatingStar key={star} starIndex={star} rating={totalRating} />
            ))}
          </div>
          <p className="text-[10px] leading-[10px] text-[#aaaaaa] tracking-[-0.5px]">
            {formatNumber(totalReviewCount)} 개의 리뷰
          </p>
        </div>
        <RatingDistributionChart ratingCounts={ratingCounts} />
      </div>
      <div className="px-[15px] pt-[19px] pb-[30px]">
        <ReviewRatingDetail
          averageAtmosphereRating={averageAtmosphereRating}
          averageKindnessRating={averageKindnessRating}
          averageTasteRating={averageTasteRating}
          averageAmountRating={averageAmountRating}
          averageHygieneRating={averageHygieneRating}
          averagePriceRating={averagePriceRating}
          willRevisitPercentage={willRevisitPercentage}
        />
      </div>
    </>
  )
}
