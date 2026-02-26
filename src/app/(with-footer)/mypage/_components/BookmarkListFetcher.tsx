'use client'

import ErrorMessage from '@/components/ui/ErrorMessage'
import { Skeleton } from '@/components/ui/shadcn/skeleton'
import { COMMON_ERROR_MESSAGES } from '@/lib/constants'
import { getMyBookmarks } from '@/services/member'
import { useQuery } from '@tanstack/react-query'
import BookmarkList from './BookmarkList'

function BookmarkListSkeleton() {
  return (
    <div className="flex flex-col gap-2.5 px-[15px] py-[20px]">
      {Array.from({ length: 3 }).map((_, index) => (
        <BookmarkListItemSkeleton key={index} />
      ))}
    </div>
  )
}

function BookmarkListItemSkeleton() {
  return (
    <div className="relative p-2.5 bg-white border border-[#eeeeee] box-border shadow-2xs rounded-[2.5px]">
      <div className="flex items-center gap-4">
        <Skeleton className="w-[75px] h-[75px] rounded-[2.5px]" />
        <div className="flex-1 flex flex-col justify-between py-1">
          <Skeleton className="h-[12px] w-16" />
          <Skeleton className="h-[18px] w-28 mt-2" />
          <Skeleton className="h-[19px] w-10 mt-[15px]" />
        </div>
      </div>
    </div>
  )
}

export default function BookmarkListFetcher() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['mypage', 'bookmarks'],
    queryFn: async () => {
      const response = await getMyBookmarks(0, 10)
      return {
        bookmarks: response.data || [],
        hasMoreBookmarks: (response.pagination?.totalElements ?? 0) > 10,
      }
    },
  })

  if (isLoading) {
    return <BookmarkListSkeleton />
  }

  if (error) {
    return (
      <ErrorMessage
        message={COMMON_ERROR_MESSAGES.FETCH_ERROR('즐겨찾기')}
        className="py-10 bg-white"
      />
    )
  }

  if (!data) {
    return (
      <ErrorMessage
        message={COMMON_ERROR_MESSAGES.FETCH_ERROR('즐겨찾기')}
        className="py-10 bg-white"
      />
    )
  }

  return <BookmarkList bookmarks={data.bookmarks} hasMoreBookmarks={data.hasMoreBookmarks} />
}
