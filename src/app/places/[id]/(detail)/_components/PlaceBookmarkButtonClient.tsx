'use client'

import { usePlaceBookmark } from '@/domains/place/place.hook'
import PlaceBookmarkButton from './PlaceBookmarkButton'

interface Props {
  initialIsBookmarked: boolean
  placeId: number
}

export default function PlaceBookmarkButtonClient({
  initialIsBookmarked,
  placeId,
}: Props) {
  const { isBookmarked, isPending, toggleBookmark } = usePlaceBookmark({
    placeId,
    initialIsBookmarked,
  })

  return (
    <PlaceBookmarkButton
      onClick={toggleBookmark}
      isBookmarked={isBookmarked}
      disabled={isPending}
    />
  )
}
