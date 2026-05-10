'use client'

import { getFollowingList, getPublicFollowingList } from '@/actions/follow'
import { SocialMember } from '@/domains/member'
import { useFollowMutation } from '@/domains/follow/follow.hook'
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver'
import { useInfiniteQuery } from '@tanstack/react-query'
import Image from 'next/image'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import FollowListItem from './FollowListItem'
import { FollowerListSkeleton } from './FollowListItemSkeleton'

interface Props {
  memberId: number
  searchQuery: string
  isLoggedIn: boolean
}

const PAGE_SIZE = 10

export default function FollowingList({ memberId, searchQuery, isLoggedIn }: Props) {
  const router = useRouter()

  const { handleFollowToggle } = useFollowMutation()

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } = useInfiniteQuery({
    queryKey: ['following', memberId, isLoggedIn],
    queryFn: async ({ pageParam }) => {
      const response = isLoggedIn
        ? await getFollowingList(memberId, { page: pageParam as number, size: PAGE_SIZE })
        : await getPublicFollowingList(memberId, { page: pageParam as number, size: PAGE_SIZE })
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
            {searchQuery ? '검색 결과가 없습니다.' : '팔로잉이 없습니다.'}
          </p>
        </div>
      </div>
    )
  }

  return (
    <>
      <div className="flex flex-col gap-[30px] py-[30px]">
        {filtered.map((member: SocialMember) => (
          <FollowListItem
            key={member.memberId}
            member={member}
            isOwner={false}
            onFollowToggle={isLoggedIn ? handleFollowToggle : () => router.push('/auth/login')}
            onRemoveFollower={() => {}}
          />
        ))}
      </div>
      {isFetchingNextPage && <FollowerListSkeleton />}
      <div ref={targetRef} className="h-1" aria-hidden="true" />
    </>
  )
}
