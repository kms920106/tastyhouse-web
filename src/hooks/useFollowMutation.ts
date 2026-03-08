'use client'

import { followMember, unfollowMember } from '@/services/follow'
import { InfiniteData, useMutation, useQueryClient } from '@tanstack/react-query'

interface FollowableMember {
  memberId: number
  following: boolean
}

interface PageData<T> {
  data?: T[]
  pagination?: {
    page: number
    size: number
    totalElements: number
    totalPages: number
  }
}

function updateFollowingStateInCache<T extends FollowableMember>(
  cache: InfiniteData<PageData<T>> | undefined,
  targetMemberId: number,
  following: boolean,
): InfiniteData<PageData<T>> | undefined {
  if (!cache) return cache
  return {
    ...cache,
    pages: cache.pages.map((page) => ({
      ...page,
      data: page.data?.map((m) =>
        m.memberId === targetMemberId ? { ...m, following } : m,
      ),
    })),
  }
}

export function useFollowMutation() {
  const queryClient = useQueryClient()

  const syncFollowState = (targetMemberId: number, following: boolean) => {
    // ['following', memberId] 형태의 모든 캐시 업데이트
    queryClient.setQueriesData<InfiniteData<PageData<FollowableMember>>>(
      { queryKey: ['following'], exact: false },
      (old) => updateFollowingStateInCache(old, targetMemberId, following),
    )

    // ['followers', memberId] 형태의 모든 캐시 업데이트
    queryClient.setQueriesData<InfiniteData<PageData<FollowableMember>>>(
      { queryKey: ['followers'], exact: false },
      (old) => updateFollowingStateInCache(old, targetMemberId, following),
    )

    // ['memberSearch', searchQuery] 형태의 모든 캐시 업데이트
    queryClient.setQueriesData<InfiniteData<PageData<FollowableMember>>>(
      { queryKey: ['memberSearch'], exact: false },
      (old) => updateFollowingStateInCache(old, targetMemberId, following),
    )
  }

  const followMutation = useMutation({
    mutationFn: (targetMemberId: number) => followMember(targetMemberId),
    onSuccess: (_, targetMemberId) => {
      syncFollowState(targetMemberId, true)
    },
  })

  const unfollowMutation = useMutation({
    mutationFn: (targetMemberId: number) => unfollowMember(targetMemberId),
    onSuccess: (_, targetMemberId) => {
      syncFollowState(targetMemberId, false)
    },
  })

  const handleFollowToggle = (member: FollowableMember) => {
    if (member.following) {
      unfollowMutation.mutate(member.memberId)
    } else {
      followMutation.mutate(member.memberId)
    }
  }

  return { handleFollowToggle }
}
