'use client'

import { useIntersectionObserver } from '@/hooks/useIntersectionObserver'
import { getFollowerList, removeFollower } from '@/services/follow'
import { useInfiniteQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import Image from 'next/image'
import { useEffect } from 'react'
import FollowListItem, { FollowListItemSkeleton } from './FollowListItem'

interface FollowerListProps {
  memberId: number
  searchQuery: string
}

const PAGE_SIZE = 10

function FollowerListSkeleton() {
  return (
    <div className="flex flex-col gap-[30px] py-[30px]">
      {[...Array(10)].map((_, i) => (
        <FollowListItemSkeleton key={i} />
      ))}
    </div>
  )
}

export default function FollowerList({ memberId, searchQuery }: FollowerListProps) {
  const queryClient = useQueryClient()

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } = useInfiniteQuery({
    queryKey: ['followers', memberId],
    queryFn: async ({ pageParam }) => {
      const response = await getFollowerList(memberId, {
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

  const removeFollowerMutation = useMutation({
    mutationFn: (targetMemberId: number) => removeFollower(targetMemberId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['followers', memberId] })
    },
  })

  const handleRemoveFollower = (targetMemberId: number) => {
    removeFollowerMutation.mutate(targetMemberId)
  }

  if (isLoading) {
    return <FollowerListSkeleton />
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
            {searchQuery ? '검색 결과가 없습니다.' : '팔로워가 없습니다.'}
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
            tab="follower"
            onFollowToggle={() => {}}
            onRemoveFollower={handleRemoveFollower}
          />
        ))}
      </div>
      {isFetchingNextPage && <FollowerListSkeleton />}
      <div ref={targetRef} className="h-1" aria-hidden="true" />
    </>
  )
}
