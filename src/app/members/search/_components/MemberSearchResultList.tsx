'use client'

import { MemberSearchResponse } from '@/domains/follow'
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver'
import { followMember, searchMembersByNickname, unfollowMember } from '@/services/follow'
import { useInfiniteQuery, useMutation, useQueryClient } from '@tanstack/react-query'
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
  const queryClient = useQueryClient()

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

  console.log(data)

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

  const updateFollowingState = (targetMemberId: number, isFollowing: boolean) => {
    queryClient.setQueryData(['memberSearch', searchQuery], (old: typeof data) => {
      if (!old) return old
      return {
        ...old,
        pages: old.pages.map((page) => ({
          ...page,
          data: page.data?.map((m) =>
            m.memberId === targetMemberId ? { ...m, following: isFollowing } : m,
          ),
        })),
      }
    })
  }

  const followMutation = useMutation({
    mutationFn: (targetMemberId: number) => followMember(targetMemberId),
    onSuccess: (_, targetMemberId) => {
      updateFollowingState(targetMemberId, true)
    },
  })

  const unfollowMutation = useMutation({
    mutationFn: (targetMemberId: number) => unfollowMember(targetMemberId),
    onSuccess: (_, targetMemberId) => {
      updateFollowingState(targetMemberId, false)
    },
  })

  const handleFollowToggle = (member: MemberSearchResponse) => {
    if (member.following) {
      unfollowMutation.mutate(member.memberId)
    } else {
      followMutation.mutate(member.memberId)
    }
  }

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
            member={member}
            onFollowToggle={handleFollowToggle}
          />
        ))}
      </div>
      {isFetchingNextPage && <MemberSearchResultListSkeleton />}
      <div ref={targetRef} className="h-1" aria-hidden="true" />
    </>
  )
}
