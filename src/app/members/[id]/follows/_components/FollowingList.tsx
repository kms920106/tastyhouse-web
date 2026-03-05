'use client'

import { FollowMemberResponse } from '@/domains/follow'
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver'
import { followMember, getFollowingList, unfollowMember } from '@/services/follow'
import { useInfiniteQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import Image from 'next/image'
import { useEffect } from 'react'
import FollowListItem, { FollowListItemSkeleton } from './FollowListItem'

interface FollowingListProps {
  memberId: number
  searchQuery: string
}

const PAGE_SIZE = 10

function FollowingListSkeleton() {
  return (
    <div className="flex flex-col gap-[30px] py-[30px]">
      {[...Array(10)].map((_, i) => (
        <FollowListItemSkeleton key={i} />
      ))}
    </div>
  )
}

export default function FollowingList({ memberId, searchQuery }: FollowingListProps) {
  const queryClient = useQueryClient()

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } = useInfiniteQuery({
    queryKey: ['following', memberId],
    queryFn: async ({ pageParam }) => {
      const response = await getFollowingList(memberId, {
        page: pageParam as number,
        size: PAGE_SIZE,
      })
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

  const updateFollowingState = (targetMemberId: number, following: boolean) => {
    queryClient.setQueryData(['following', memberId], (old: typeof data) => {
      if (!old) return old
      return {
        ...old,
        pages: old.pages.map((page) => ({
          ...page,
          data: page.data?.map((m) =>
            m.memberId === targetMemberId ? { ...m, following } : m,
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

  const handleFollowToggle = (member: FollowMemberResponse) => {
    if (member.following) {
      unfollowMutation.mutate(member.memberId)
    } else {
      followMutation.mutate(member.memberId)
    }
  }

  if (isLoading) {
    return <FollowingListSkeleton />
  }

  const allMembers = data?.pages.flatMap((page) => page.data ?? []) ?? []
  const filtered = allMembers.filter((member) =>
    member.nickname.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  if (filtered.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center flex-1 pb-[70px]">
        <div className="relative w-[35px] h-[40px]">
          <Image src="/images/mypage/logo-gray.png" alt="로고" width={35} height={40} />
        </div>
        <div className="mt-[15px]">
          <p className="text-sm leading-[14px] text-[#aaaaaa]">
            {searchQuery ? '검색 결과가 없습니다.' : '팔로잉이 없습니다.'}
          </p>
        </div>
      </div>
    )
  }

  return (
    <>
      <div className="flex flex-col gap-[30px] py-[30px]">
        {filtered.map((member) => (
          <FollowListItem
            key={member.memberId}
            member={member}
            tab="following"
            onFollowToggle={handleFollowToggle}
            onRemoveFollower={() => {}}
          />
        ))}
      </div>
      {isFetchingNextPage && <FollowingListSkeleton />}
      <div ref={targetRef} className="h-1" aria-hidden="true" />
    </>
  )
}
