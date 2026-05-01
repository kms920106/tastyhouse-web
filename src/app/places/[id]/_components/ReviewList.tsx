'use client'

import { getPlaceReviews } from '@/actions/place'
import ReviewPanel from '@/components/reviews/ReviewPanel'
import { PAGE_PATHS } from '@/lib/paths'

interface Props {
  placeId: number
}

export default function ReviewList({ placeId }: Props) {
  return (
    <ReviewPanel
      queryOptions={{
        queryKey: ['place', placeId, 'place-detail-reviews'],
        queryFn: () => getPlaceReviews(placeId, { page: 0, size: 5 }),
      }}
      viewMoreHref={PAGE_PATHS.PLACE_REVIEWS(placeId)}
    />
  )
}
