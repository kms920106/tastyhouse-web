'use client'

import { getFollowerList, getPublicFollowerList, removeFollower } from '@/actions/follow'
import { useFollowMutation } from '@/hooks/useFollowMutation'
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver'
import { useInfiniteQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import FollowListItem from './FollowListItem'
import { FollowerListSkeleton } from './FollowListItemSkeleton'

interface Props {
  memberId: number
  searchQuery: string
  isLoggedIn: boolean
  isOwner: boolean
}

const PAGE_SIZE = 10

export default function FollowerList({ memberId, searchQuery, isLoggedIn, isOwner }: Props) {
  const router = useRouter()

  const queryClient = useQueryClient()
  const { handleFollowToggle } = useFollowMutation()

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } = useInfiniteQuery({
    queryKey: ['followers', memberId, isLoggedIn],
    queryFn: async ({ pageParam }) => {
      const response = isLoggedIn
        ? await getFollowerList(memberId, { page: pageParam as number, size: PAGE_SIZE })
        : await getPublicFollowerList(memberId, { page: pageParam as number, size: PAGE_SIZE })
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
            isOwner={isOwner}
            onFollowToggle={isLoggedIn ? handleFollowToggle : () => router.push('/auth/login')}
            onRemoveFollower={isLoggedIn ? handleRemoveFollower : () => router.push('/auth/login')}
          />
        ))}
      </div>
      {isFetchingNextPage && <FollowerListSkeleton />}
      <div ref={targetRef} className="h-1" aria-hidden="true" />
    </>
  )
}
