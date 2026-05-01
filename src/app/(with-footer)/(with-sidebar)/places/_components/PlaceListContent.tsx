'use client'

import { getLatestPlaces } from '@/actions/place'
import { PlaceCardSkeleton } from '@/components/places/PlaceCardSkeleton'
import FetchErrorState from '@/components/ui/FetchErrorState'
import type { PlaceAmenityCode, PlaceFoodType } from '@/domains/place/place.types'
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver'
import { COMMON_ERROR_MESSAGES } from '@/lib/constants'
import { useInfiniteQuery } from '@tanstack/react-query'
import { useEffect } from 'react'
import PlaceFilterBar from './PlaceFilterBar'
import PlaceListItem from './PlaceListItem'
import { PlaceListContentSkeleton } from './PlaceListContentSkeleton'

const PAGE_SIZE = 6

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

export default function PlaceListContent({
  stationId,
  foodTypes,
  amenities,
}: Props) {
  const filterParams = {
    stationId,
    foodTypes,
    amenities,
  }

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, isError } =
    useInfiniteQuery({
      queryKey: ['places', 'latest', filterParams],
      queryFn: async ({ pageParam }) => {
        const response = await getLatestPlaces({
          page: pageParam,
          size: PAGE_SIZE,
          ...filterParams,
        })

        // API 에러 처리
        if (response.error) {
          throw new Error(response.error)
        }

        // 응답 데이터 검증
        if (!response.data) {
          throw new Error('응답 데이터가 없습니다.')
        }

        return response
      },
      initialPageParam: 0,
      getNextPageParam: (lastPage) => {
        if (!lastPage.pagination) {
          return undefined
        }
        const { page, totalPages } = lastPage.pagination

        // 다음 페이지가 있으면 페이지 번호 반환, 없으면 undefined
        return page + 1 < totalPages ? page + 1 : undefined
      },
    })

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
    return <PlaceListContentSkeleton />
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
    <>
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
    </>
  )
}
