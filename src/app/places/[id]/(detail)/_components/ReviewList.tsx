'use client'

import { ReviewPanelWrapper } from '@/components/reviews/ReviewPanel'
import { usePlaceReviews } from '@/domains/place/place.hook'
import { PAGE_PATHS } from '@/lib/paths'

interface Props {
  placeId: number
}

export default function ReviewList({ placeId }: Props) {
  const { data, isLoading, isError } = usePlaceReviews(placeId)

  return (
    <ReviewPanelWrapper
      data={data?.data}
      isLoading={isLoading}
      isError={isError}
      viewMoreHref={PAGE_PATHS.PLACE_REVIEWS(placeId)}
    />
  )
}
