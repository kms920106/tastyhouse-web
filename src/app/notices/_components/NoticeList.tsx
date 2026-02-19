'use client'

import { useIntersectionObserver } from '@/hooks/useIntersectionObserver'
import { formatDate } from '@/lib/date'
import { getNoticeList } from '@/services/notice'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/shadcn/accordion'
import { useInfiniteQuery } from '@tanstack/react-query'
import { useEffect } from 'react'

const PAGE_SIZE = 10

function NoticeListSkeleton() {
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

export default function NoticeList() {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } = useInfiniteQuery({
    queryKey: ['notices'],
    queryFn: async ({ pageParam }) => {
      const response = await getNoticeList({ page: pageParam, size: PAGE_SIZE })
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
    return <NoticeListSkeleton />
  }

  const notices = data?.pages.flatMap((page) => page.data ?? []) ?? []

  return (
    <>
      <Accordion type="multiple" className="w-full">
        {notices.map((notice, index) => (
          <AccordionItem
            key={notice.id}
            value={String(notice.id)}
            className="border-[#eeeeee]"
          >
            <AccordionTrigger
              className={`w-full px-[16px] py-[18px] hover:no-underline ${index === 0 ? 'pt-0' : ''}`}
              showIcon={false}
            >
              <div className="flex flex-col items-start gap-3">
                <span className="text-sm leading-[14px]">{notice.title}</span>
                <span className="text-[13px] leading-[13px] text-[#999999] font-thin">
                  {formatDate(notice.createdAt, 'YYYY-MM-DD')}
                </span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-[25px] py-[25px] text-[13px] leading-[22px] bg-[#f9f9f9] whitespace-pre-line">
              {notice.content}
            </AccordionContent>
          </AccordionItem>
        ))}
        {isFetchingNextPage && <NoticeListSkeleton />}
      </Accordion>
      <div ref={targetRef} className="h-1" aria-hidden="true" />
    </>
  )
}
