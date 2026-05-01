'use client'

import { getMyBookmarks } from '@/actions/member'
import FetchErrorState from '@/components/ui/FetchErrorState'
import { COMMON_ERROR_MESSAGES } from '@/lib/constants'
import { useQuery } from '@tanstack/react-query'
import BookmarkList from './BookmarkList'
import { BookmarkListSkeleton } from './BookmarkListSkeleton'

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

  if (error || !data) {
    return <FetchErrorState message={COMMON_ERROR_MESSAGES.FETCH_ERROR('즐겨찾기')} />
  }

  return <BookmarkList bookmarks={data.bookmarks} hasMoreBookmarks={data.hasMoreBookmarks} />
}
