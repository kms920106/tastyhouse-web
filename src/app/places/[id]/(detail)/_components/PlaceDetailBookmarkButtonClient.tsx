'use client'

import { usePlaceBookmark } from '@/domains/place/place.hook'
import PlaceDetailBookmarkButton from './PlaceDetailBookmarkButton'

interface Props {
  initialIsBookmarked: boolean
  placeId: number
}

export default function PlaceDetailBookmarkButtonClient({ initialIsBookmarked, placeId }: Props) {
  const { isBookmarked, isPending, toggleBookmark } = usePlaceBookmark({
    placeId,
    initialIsBookmarked,
  })

  return (
    <PlaceDetailBookmarkButton
      onClick={toggleBookmark}
      isBookmarked={isBookmarked}
      disabled={isPending}
    />
  )
}
