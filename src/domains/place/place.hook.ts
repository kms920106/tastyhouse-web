'use client'

import { getLatestPlaces, getPlaceDetail, getPlaceInfo, getPlaceMenus, getPlacePhotos, getPlaceReviewStatistics, getPlaceFoodTypes, getPlaceReviews, togglePlaceBookmark } from '@/actions/place'
import { toast } from '@/components/ui/AppToaster'
import { COMMON_ERROR_MESSAGES } from '@/constants/errors'
import type { PlaceAmenityCode, PlaceFoodType } from '@/domains/place/place.types'
import { useState, useTransition } from 'react'
import { useInfiniteQuery, useQuery } from '@tanstack/react-query'

const LATEST_PAGE_SIZE = 6
const REVIEWS_PAGE_SIZE = 5

interface LatestPlacesFilter {
  stationId?: number
  foodTypes?: PlaceFoodType[]
  amenities?: PlaceAmenityCode[]
}

export const placeQueryKeys = {
  latest: (filter: LatestPlacesFilter) => ['places', 'latest', filter] as const,
  foodTypes: ['place', 'food-types'] as const,
  infoDetail: (placeId: number) => ['place', placeId, 'place-detail-info'] as const,
  menus: (placeId: number) => ['place', placeId, 'place-detail-menus'] as const,
  photos: (placeId: number) => ['place', placeId, 'place-detail-photos'] as const,
  reviewStatistics: (placeId: number) => ['place', placeId, 'place-review-statistics'] as const,
  reviews: (placeId: number) => ['place', placeId, 'place-detail-reviews'] as const,
}

export function useLatestPlaces(filter: LatestPlacesFilter) {
  return useInfiniteQuery({
    queryKey: placeQueryKeys.latest(filter),
    queryFn: async ({ pageParam }) => {
      const response = await getLatestPlaces({
        page: pageParam,
        size: LATEST_PAGE_SIZE,
        ...filter,
      })

      if (response.error) {
        throw new Error(response.error)
      }

      if (!response.data) {
        throw new Error('응답 데이터가 없습니다.')
      }

      return response
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      if (!lastPage.pagination) return undefined
      const { page, totalPages } = lastPage.pagination
      return page + 1 < totalPages ? page + 1 : undefined
    },
  })
}

export function usePlaceReviews(placeId: number) {
  return useQuery({
    queryKey: placeQueryKeys.reviews(placeId),
    queryFn: () => getPlaceReviews(placeId, { page: 0, size: REVIEWS_PAGE_SIZE }),
  })
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
