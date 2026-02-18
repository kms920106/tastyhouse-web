'use client'

import { useIntersectionObserver } from '@/hooks/useIntersectionObserver'
import { getEventAnnouncementList } from '@/services/event'
import * as AccordionPrimitive from '@radix-ui/react-accordion'
import { useInfiniteQuery } from '@tanstack/react-query'
import { useEffect } from 'react'

const PAGE_SIZE = 10

function AnnouncementListSkeleton() {
  return (
    <div className="flex flex-col">
      {Array.from({ length: PAGE_SIZE }).map((_, i) => (
        <div
          key={i}
          className={`px-[16px] py-[18px] animate-pulse border-b border-[#eeeeee] last:border-b-0 ${i === 0 ? 'pt-0' : ''}`}
        >
          <div className="h-3.5 bg-gray-200 rounded w-3/4" />
          <div className="mt-3 h-3 bg-gray-200 rounded w-1/4" />
        </div>
      ))}
    </div>
  )
}

export default function WinnerEventList() {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } = useInfiniteQuery({
    queryKey: ['events', 'announcements'],
    queryFn: async ({ pageParam }) => {
      const response = await getEventAnnouncementList({ page: pageParam, size: PAGE_SIZE })
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
    return <AnnouncementListSkeleton />
  }

  const events = data?.pages.flatMap((page) => page.data ?? []) ?? []

  return (
    <>
      <AccordionPrimitive.Root type="multiple">
        {events.map((event, index) => (
          <AccordionPrimitive.Item
            key={event.id}
            value={String(event.id)}
            className="border-b border-[#eeeeee] last:border-b-0"
          >
            <AccordionPrimitive.Header>
              <AccordionPrimitive.Trigger
                className={`w-full flex items-start justify-between px-[16px] py-[18px] ${index === 0 ? 'pt-0' : ''} [&[data-state=open]>img]:rotate-180 group`}
              >
                <div className="flex flex-col items-start gap-3">
                  <span className="text-sm leading-[14px]">{event.name}</span>
                  <span className="text-[13px] leading-[13px] text-[#999999]">
                    {event.announcedAt.slice(0, 10)}
                  </span>
                </div>
              </AccordionPrimitive.Trigger>
            </AccordionPrimitive.Header>
            <AccordionPrimitive.Content className="data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down overflow-hidden">
              <p className="text-[13px] leading-[22px] p-[25px] whitespace-pre-line bg-[#f9f9f9]">
                {event.content}
              </p>
            </AccordionPrimitive.Content>
          </AccordionPrimitive.Item>
        ))}
        {isFetchingNextPage && <AnnouncementListSkeleton />}
      </AccordionPrimitive.Root>
      <div ref={targetRef} className="h-1" aria-hidden="true" />
    </>
  )
}
