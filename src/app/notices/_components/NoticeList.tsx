'use client'

import { useIntersectionObserver } from '@/hooks/useIntersectionObserver'
import { getNoticeList } from '@/actions/notice'
import { Accordion } from '@/components/ui/shadcn/accordion'
import { useInfiniteQuery } from '@tanstack/react-query'
import { useEffect } from 'react'
import { NoticeListSkeleton } from './NoticeListSkeleton'
import { NoticeListItem } from './NoticeListItem'

const PAGE_SIZE = 10

export default function NoticeList() {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } = useInfiniteQuery({
    queryKey: ['notices'],
    queryFn: async ({ pageParam }) => {
      const response = await getNoticeList({ page: pageParam, size: PAGE_SIZE })
      if (!response.data) throw new Error('응답 데이터가 없습니다.')
      return response
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
          <NoticeListItem key={notice.id} notice={notice} isFirst={index === 0} />
        ))}
        {isFetchingNextPage && <NoticeListSkeleton />}
      </Accordion>
      <div ref={targetRef} className="h-1" aria-hidden="true" />
    </>
  )
}
