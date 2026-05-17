import ReviewRatingDetail from '@/components/reviews/ReviewRatingDetail'
import ReviewRatingScore from '@/components/reviews/ReviewRatingScore'
import FetchErrorState from '@/components/ui/FetchErrorState'
import { COMMON_ERROR_MESSAGES } from '@/constants/errors'
import { usePlaceReviewStatistics } from '@/domains/place/place.hook'
import PlaceDetailRatingDistributionChart from './PlaceDetailRatingDistributionChart'
import PlaceDetailReviewStatisticSkeleton from './PlaceDetailReviewStatisticSkeleton'

interface Props {
  placeId: number
}

export default function PlaceDetailReviewStatistic({ placeId }: Props) {
  const { data, isLoading, error } = usePlaceReviewStatistics(placeId)

  if (isLoading) {
    return <PlaceDetailReviewStatisticSkeleton />
  }

  if (error) {
    return <FetchErrorState message={COMMON_ERROR_MESSAGES.API_FETCH_ERROR} />
  }

  if (!data?.data) {
    return <FetchErrorState message={COMMON_ERROR_MESSAGES.FETCH_ERROR('리뷰 통계')} />
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
        <PlaceDetailRatingDistributionChart ratingCounts={ratingCounts} />
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
