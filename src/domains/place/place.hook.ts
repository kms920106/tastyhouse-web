'use client'

import { getPlaceDetail, getPlaceInfo, getPlaceMenus, getPlacePhotos, getPlaceReviewStatistics, getPlaceFoodTypes, togglePlaceBookmark } from '@/actions/place'
import { toast } from '@/components/ui/AppToaster'
import { COMMON_ERROR_MESSAGES } from '@/constants/errors'
import { useState, useTransition } from 'react'
import { useQuery } from '@tanstack/react-query'

export const placeQueryKeys = {
  foodTypes: ['place', 'food-types'] as const,
  infoDetail: (placeId: number) => ['place', placeId, 'place-detail-info'] as const,
  menus: (placeId: number) => ['place', placeId, 'place-detail-menus'] as const,
  photos: (placeId: number) => ['place', placeId, 'place-detail-photos'] as const,
  reviewStatistics: (placeId: number) => ['place', placeId, 'place-review-statistics'] as const,
}

export function usePlaceInfoDetail(placeId: number) {
  return useQuery({
    queryKey: placeQueryKeys.infoDetail(placeId),
    queryFn: async () => {
      const [infoRes, detailRes] = await Promise.all([
        getPlaceInfo(placeId),
        getPlaceDetail(placeId),
      ])
      return { infoRes, detailRes }
    },
  })
}

export function usePlaceMenus(placeId: number) {
  return useQuery({
    queryKey: placeQueryKeys.menus(placeId),
    queryFn: () => getPlaceMenus(placeId),
  })
}

export function usePlacePhotos(placeId: number) {
  return useQuery({
    queryKey: placeQueryKeys.photos(placeId),
    queryFn: () => getPlacePhotos(placeId),
  })
}

export function usePlaceReviewStatistics(placeId: number) {
  return useQuery({
    queryKey: placeQueryKeys.reviewStatistics(placeId),
    queryFn: () => getPlaceReviewStatistics(placeId),
  })
}

export function usePlaceFoodTypes() {
  const { data, isLoading } = useQuery({
    queryKey: placeQueryKeys.foodTypes,
    queryFn: () => getPlaceFoodTypes(),
    staleTime: Infinity,
  })

  return {
    foodTypes: data?.data ?? [],
    isLoading,
  }
}

interface UsePlaceBookmarkProps {
  placeId: number
  initialIsBookmarked: boolean
}

export function usePlaceBookmark({ placeId, initialIsBookmarked }: UsePlaceBookmarkProps) {
  const [isBookmarked, setIsBookmarked] = useState(initialIsBookmarked)
  const [isPending, startTransition] = useTransition()

  const toggleBookmark = () => {
    if (isPending) return

    startTransition(async () => {
      const { error, data } = await togglePlaceBookmark(placeId)

      if (error || !data) {
        toast(error || COMMON_ERROR_MESSAGES.MUTATION_ERROR)
        return
      }

      setIsBookmarked(data.bookmarked)
    })
  }

  return { isBookmarked, isPending, toggleBookmark }
}
