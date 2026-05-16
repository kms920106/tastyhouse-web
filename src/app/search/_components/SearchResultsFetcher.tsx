'use client'

import { PlaceCardSkeleton } from '@/components/places/PlaceCardSkeleton'
import FetchErrorState from '@/components/ui/FetchErrorState'
import { COMMON_ERROR_MESSAGES } from '@/constants/errors'
import { useSearchResults } from '@/domains/search/search.hook'
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver'
import { useEffect } from 'react'
import SearchPlaceListItem from './SearchPlaceListItem'
import SearchResultsSkeleton from './SearchResultsSkeleton'

interface Props {
  query: string
}

function LoadingIndicator() {
  return (
    <>
      {Array.from({ length: 2 }).map((_, i) => (
        <li key={`loading-${i}`}>
          <PlaceCardSkeleton />
        </li>
      ))}
    </>
  )
}

export default function SearchResultsFetcher({ query }: Props) {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, isError } =
    useSearchResults(query)

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

  if (isLoading) return <SearchResultsSkeleton />

  if (isError) return <FetchErrorState message={COMMON_ERROR_MESSAGES.API_FETCH_ERROR} />

  const totalElements = data?.pages[0]?.pagination?.totalElements ?? 0

  if (totalElements === 0) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <p className="text-sm text-[#aaaaaa]">&apos;{query}&apos;에 대한 검색 결과가 없습니다.</p>
      </div>
    )
  }

  const items = data?.pages.flatMap((page) => page.data ?? []) ?? []

  return (
    <div className="min-h-screen px-[15px] py-[30px] pb-[90px]">
      <p className="text-sm text-[#999999] mb-5">총 {totalElements}개</p>
      <ul className="grid grid-cols-2 gap-x-[15px] gap-y-10">
        {items.map((item) => (
          <SearchPlaceListItem key={item.id} item={item} />
        ))}
        {isFetchingNextPage && <LoadingIndicator />}
      </ul>
      <div ref={targetRef} className="h-1" aria-hidden="true" />
    </div>
  )
}
