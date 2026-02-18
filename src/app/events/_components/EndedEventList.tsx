'use client'

import { useIntersectionObserver } from '@/hooks/useIntersectionObserver'
import { formatDate } from '@/lib/date'
import { resolveImageUrl } from '@/lib/image'
import { getEventList } from '@/services/event'
import { useInfiniteQuery } from '@tanstack/react-query'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect } from 'react'

const PAGE_SIZE = 10

function EventListSkeleton() {
  return (
    <div className="flex flex-col gap-2.5">
      {Array.from({ length: PAGE_SIZE }).map((_, i) => (
        <div key={i} className="animate-pulse">
          <div className="w-full aspect-[2/1] bg-gray-200" />
          <div className="px-[15px] py-5">
            <div className="h-4 bg-gray-200 rounded w-3/4" />
            <div className="mt-3 h-3 bg-gray-200 rounded w-1/2" />
          </div>
        </div>
      ))}
    </div>
  )
}

export default function EndedEventList() {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } = useInfiniteQuery({
    queryKey: ['events', 'ENDED'],
    queryFn: async ({ pageParam }) => {
      const response = await getEventList({ status: 'ENDED', page: pageParam, size: PAGE_SIZE })
      if (!response.data) throw new Error('응답 데이터가 없습니다.')
      return response.data
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      if (!lastPage.pagination) return undefined
      const { page, totalPages } = lastPage.pagination
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
    return <EventListSkeleton />
  }

  const events = data?.pages.flatMap((page) => page.data ?? []) ?? []

  return (
    <>
      <div className="flex flex-col gap-2.5">
        {events.map((event) => (
          <Link key={event.id} href={`/events/${event.id}`} className="cursor-pointer">
            <div className="relative w-full aspect-[2/1]">
              <Image
                src={resolveImageUrl(event.thumbnailImageUrl)}
                alt={event.name}
                fill
                className="object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement
                  target.style.display = 'none'
                }}
              />
            </div>
            <div className="px-[15px] py-5">
              <h3 className="text-base leading-[16px]">{event.name}</h3>
              <p className="mt-3 text-[13px] leading-[13px] font-light text-[#999999]">
                {formatDate(event.startAt, 'YYYY-MM-DD')} ~ {formatDate(event.endAt, 'YYYY-MM-DD')}
              </p>
            </div>
          </Link>
        ))}
        {isFetchingNextPage && <EventListSkeleton />}
      </div>
      <div ref={targetRef} className="h-1" aria-hidden="true" />
    </>
  )
}
