'use client'

import { getPlaceReviews } from '@/actions/place'
import ReviewPanel from '@/components/reviews/ReviewPanel'
import { PAGE_PATHS } from '@/lib/paths'

interface ReviewListProps {
  placeId: number
}

export default function ReviewList({ placeId }: ReviewListProps) {
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
