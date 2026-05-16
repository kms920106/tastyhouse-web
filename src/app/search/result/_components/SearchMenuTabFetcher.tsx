'use client'

import FetchErrorState from '@/components/ui/FetchErrorState'
import { COMMON_ERROR_MESSAGES } from '@/constants/errors'
import { useSearchMenusInfinite } from '@/domains/search/search.hook'
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver'
import { useEffect } from 'react'
import SearchMenuListItem from './SearchMenuListItem'
import { SearchMenuListSkeleton } from './SearchMenuListItemSkeleton'
import SearchEmptyState from './SearchEmptyState'

interface Props {
  query: string
}

export default function SearchMenuTabFetcher({ query }: Props) {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, isError } =
    useSearchMenusInfinite(query)

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

  if (isLoading) return <SearchMenuListSkeleton />
  if (isError) return <FetchErrorState message={COMMON_ERROR_MESSAGES.API_FETCH_ERROR} />

  const totalElements = data?.pages[0]?.pagination?.totalElements ?? 0
  if (totalElements === 0) return <SearchEmptyState query={query} label="메뉴" />

  const items = data?.pages.flatMap((page) => page.data ?? []) ?? []

  return (
    <div className="pb-[90px]">
      <ul>
        {items.map((item) => (
          <SearchMenuListItem key={item.id} item={item} />
        ))}
        {isFetchingNextPage && <SearchMenuListSkeleton count={2} />}
      </ul>
      <div ref={targetRef} className="h-1" aria-hidden="true" />
    </div>
  )
}
