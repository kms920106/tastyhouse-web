import { getPlaceReviewStatistics } from '@/actions/place'
import ReviewRatingDetail from '@/components/reviews/ReviewRatingDetail'
import ReviewRatingScore from '@/components/reviews/ReviewRatingScore'
import FetchErrorState from '@/components/ui/FetchErrorState'
import { COMMON_ERROR_MESSAGES } from '@/lib/constants'
import { useQuery } from '@tanstack/react-query'
import RatingDistributionChart from './RatingDistributionChart'
import ReviewStatisticSkeleton from './ReviewStatisticSkeleton'

interface Props {
  placeId: number
}

export default function ReviewStatistic({ placeId }: Props) {
  const { data, isLoading, error } = useQuery({
    queryKey: ['place', placeId, 'place-review-statistics'],
    queryFn: () => getPlaceReviewStatistics(placeId),
  })

  if (isLoading) {
    return <ReviewStatisticSkeleton />
  }

  if (error) {
    return (
      <FetchErrorState message={COMMON_ERROR_MESSAGES.API_FETCH_ERROR} className="py-10 bg-white" />
    )
  }

  if (!data?.data) {
    return (
      <FetchErrorState
        message={COMMON_ERROR_MESSAGES.FETCH_ERROR('리뷰 통계')}
        className="py-10 bg-white"
      />
    )
  }

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
  } = data.data

  return (
    <>
      <div className="flex items-center justify-center gap-[30px] pt-[30px] pb-[21px] border-b border-[#eeeeee] box-border">
        <ReviewRatingScore rating={totalRating} reviewCount={totalReviewCount} />
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
