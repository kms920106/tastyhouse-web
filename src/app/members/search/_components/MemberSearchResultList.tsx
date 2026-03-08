'use client'

import { MemberSearchResponse } from '@/domains/follow'
import { useFollowMutation } from '@/hooks/useFollowMutation'
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver'
import { searchMembersByNickname } from '@/services/follow'
import { useInfiniteQuery } from '@tanstack/react-query'
import Image from 'next/image'
import { useEffect } from 'react'
import MemberSearchResultItem, { MemberSearchResultItemSkeleton } from './MemberSearchResultItem'

interface MemberSearchResultListProps {
  searchQuery: string
}

const PAGE_SIZE = 20

function MemberSearchResultListSkeleton() {
  return (
    <div className="flex flex-col gap-[30px] py-[30px]">
      {[...Array(5)].map((_, i) => (
        <MemberSearchResultItemSkeleton key={i} />
      ))}
    </div>
  )
}

export default function MemberSearchResultList({ searchQuery }: MemberSearchResultListProps) {
  const { handleFollowToggle } = useFollowMutation()

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } = useInfiniteQuery({
    queryKey: ['memberSearch', searchQuery],
    queryFn: async ({ pageParam }) => {
      return searchMembersByNickname(searchQuery, pageParam as number, PAGE_SIZE)
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      if (!lastPage.pagination) return undefined
      const { page, totalPages } = lastPage.pagination
      return page + 1 < totalPages ? page + 1 : undefined
    },
    enabled: searchQuery.trim().length > 0,
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

  if (!searchQuery.trim()) {
    return null
  }

  if (isLoading) {
    return <MemberSearchResultListSkeleton />
  }

  const allMembers = data?.pages.flatMap((page) => page.data ?? []) ?? []

  if (allMembers.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center flex-1 pb-[70px]">
        <div className="relative w-[35px] h-[40px]">
          <Image src="/images/mypage/logo-gray.png" alt="로고" width={35} height={40} />
        </div>
        <div className="mt-[15px]">
          <p className="text-sm leading-[14px] text-[#aaaaaa]">검색 결과가 없습니다.</p>
        </div>
      </div>
    )
  }

  return (
    <>
      <div className="flex flex-col gap-[30px] py-[30px]">
        {allMembers.map((member) => (
          <MemberSearchResultItem
            key={member.memberId}
            member={member as MemberSearchResponse}
            onFollowToggle={handleFollowToggle}
          />
        ))}
      </div>
      {isFetchingNextPage && <MemberSearchResultListSkeleton />}
      <div ref={targetRef} className="h-1" aria-hidden="true" />
    </>
  )
}
