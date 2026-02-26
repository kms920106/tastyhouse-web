'use client'

import {
  PlaceCard,
  PlaceCardContent,
  PlaceCardHeader,
  PlaceCardImage,
  PlaceCardName,
  PlaceCardRating,
  PlaceCardSkeleton,
  PlaceCardStation,
  PlaceCardStats,
  PlaceCardTags,
} from '@/components/places/PlaceCard'
import ErrorMessage from '@/components/ui/ErrorMessage'
import { getPlaceFoodTypeCodeName } from '@/constants/place'
import { PlaceAmenityCode, PlaceFoodType } from '@/domains/place'
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver'
import { COMMON_ERROR_MESSAGES } from '@/lib/constants'
import { getLatestPlaces } from '@/services/place'
import { useInfiniteQuery } from '@tanstack/react-query'
import { useEffect } from 'react'
import PlaceFilterBar from './PlaceFilterBar'

const PAGE_SIZE = 6

export function PlaceListContentSkeleton() {
  return (
    <div>
      <PlaceFilterBar totalCount={0} isLoading />
      <ul className="mt-5 grid grid-cols-2 gap-x-[15px] gap-y-10">
        {[...Array(4)].map((_, i) => (
          <li key={i}>
            <PlaceCardSkeleton />
          </li>
        ))}
      </ul>
    </div>
  )
}

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

interface PlaceListItemProps {
  id: number
  name: string
  imageUrl: string
  stationName: string
  rating: number
  reviewCount: number
  bookmarkCount: number
  foodTypes: PlaceFoodType[]
}

function PlaceListItem({
  id,
  name,
  imageUrl,
  stationName,
  rating,
  reviewCount,
  bookmarkCount,
  foodTypes,
}: PlaceListItemProps) {
  const foodNames = foodTypes.map((foodType) => getPlaceFoodTypeCodeName(foodType))

  return (
    <li key={id}>
      <PlaceCard placeId={id}>
        <PlaceCardImage src={imageUrl} alt={name} />
        <PlaceCardContent>
          <PlaceCardHeader>
            <PlaceCardStation>{stationName}</PlaceCardStation>
            <PlaceCardRating value={rating} />
          </PlaceCardHeader>
          <PlaceCardName>{name}</PlaceCardName>
          <PlaceCardStats reviewCount={reviewCount} bookmarkCount={bookmarkCount} />
          <PlaceCardTags tags={foodNames} variant="secondary" />
        </PlaceCardContent>
      </PlaceCard>
    </li>
  )
}

interface PlaceListContentProps {
  stationId: number | null
  foodTypes: PlaceFoodType[] | null
  amenities: PlaceAmenityCode[] | null
}

export default function PlaceListContent({
  stationId,
  foodTypes,
  amenities,
}: PlaceListContentProps) {
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
    return <ErrorMessage message={COMMON_ERROR_MESSAGES.API_FETCH_ERROR} />
  }

  if (!data?.pages || data.pages.length === 0) {
    return <ErrorMessage message={COMMON_ERROR_MESSAGES.FETCH_ERROR('플레이스')} />
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
