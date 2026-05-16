'use client'

import FetchErrorState from '@/components/ui/FetchErrorState'
import { COMMON_ERROR_MESSAGES } from '@/constants/errors'
import { useSearchPlacesInfinite } from '@/domains/search/search.hook'
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver'
import { useEffect } from 'react'
import SearchEmptyState from './SearchEmptyState'
import SearchPlaceListItem from './SearchPlaceListItem'
import { SearchPlaceListSkeleton } from './SearchPlaceListSkeleton'

interface Props {
  query: string
}

export default function SearchPlaceTabFetcher({ query }: Props) {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, isError } =
    useSearchPlacesInfinite(query)

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

  if (isLoading) return <SearchPlaceListSkeleton />
  if (isError) return <FetchErrorState message={COMMON_ERROR_MESSAGES.API_FETCH_ERROR} />

  const totalElements = data?.pages[0]?.pagination?.totalElements ?? 0
  if (totalElements === 0) return <SearchEmptyState query={query} label="플레이스" />

  const items = data?.pages.flatMap((page) => page.data ?? []) ?? []

  return (
    <div className="px-[15px] py-[20px] pb-[90px]">
      <ul className="flex flex-col gap-[10px]">
        {items.map((item) => (
          <SearchPlaceListItem key={item.id} item={item} />
        ))}
        {isFetchingNextPage && <SearchPlaceListSkeleton count={2} />}
      </ul>
      <div ref={targetRef} className="h-1" aria-hidden="true" />
    </div>
  )
}
