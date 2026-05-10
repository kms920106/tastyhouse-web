'use client'

import { PlaceCardSkeleton } from '@/components/places/PlaceCardSkeleton'
import FetchErrorState from '@/components/ui/FetchErrorState'
import type { PlaceAmenityCode, PlaceFoodType } from '@/domains/place'
import { useLatestPlaces } from '@/domains/place/place.hook'
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver'
import { COMMON_ERROR_MESSAGES } from '@/constants/errors'
import { useEffect } from 'react'
import PlaceFilterBar from './PlaceFilterBar'
import { PlaceContentSkeleton } from './PlaceContentSkeleton'
import PlaceListItem from './PlaceListItem'

function LoadingIndicator() {
  return (
    <>
      {[...Array(2)].map((_, i) => (
        <li key={`loading-${i}`}>
          <PlaceCardSkeleton />
        </li>
      ))}
    </>
  )
}

interface Props {
  stationId?: number
  foodTypes?: PlaceFoodType[]
  amenities?: PlaceAmenityCode[]
}

export default function PlaceContent({ stationId, foodTypes, amenities }: Props) {
  const filterParams = { stationId, foodTypes, amenities }

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, isError } =
    useLatestPlaces(filterParams)

  const { targetRef, isIntersecting, resetIntersecting } = useIntersectionObserver({
    threshold: 0.1,
    rootMargin: '100px',
    enabled: hasNextPage && !isFetchingNextPage,
  })

  useEffect(() => {
    if (isIntersecting && hasNextPage && !isFetchingNextPage) {
      resetIntersecting()
      fetchNextPage()
    }
  }, [isIntersecting, hasNextPage, isFetchingNextPage, fetchNextPage, resetIntersecting])

  if (isLoading) {
    return <PlaceContentSkeleton />
  }

  if (isError) {
    return <FetchErrorState message={COMMON_ERROR_MESSAGES.API_FETCH_ERROR} />
  }

  if (!data?.pages || data.pages.length === 0) {
    return <FetchErrorState message={COMMON_ERROR_MESSAGES.FETCH_ERROR('플레이스')} />
  }

  const places = data.pages.flatMap((page) => page.data ?? [])
  const totalCount = data.pages[0]?.pagination?.totalElements ?? 0

  return (
    <div className="min-h-screen px-[15px] py-[30px] pb-[90px]">
      <PlaceFilterBar
        totalCount={totalCount}
        stationId={stationId}
        foodTypes={foodTypes}
        amenities={amenities}
      />
      <ul className="grid grid-cols-2 gap-x-[15px] gap-y-10">
        {places.map((place) => (
          <PlaceListItem
            key={place.id}
            id={place.id}
            name={place.name}
            imageUrl={place.imageUrl}
            stationName={place.stationName}
            rating={place.rating}
            reviewCount={place.reviewCount}
            bookmarkCount={place.bookmarkCount}
            foodTypes={place.foodTypes}
          />
        ))}
        {isFetchingNextPage && <LoadingIndicator />}
      </ul>
      <div ref={targetRef} className="h-1" aria-hidden="true" />
    </div>
  )
}
