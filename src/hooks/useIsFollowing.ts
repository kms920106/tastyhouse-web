'use client'

import { getIsFollowing } from '@/actions/follow'
import { useQuery } from '@tanstack/react-query'

export const isFollowingQueryKey = (memberId: number) => ['member', memberId, 'is-following']

export function useIsFollowing(memberId: number | undefined, enabled = true) {
  return useQuery({
    queryKey: isFollowingQueryKey(memberId!),
    queryFn: async () => {
      const response = await getIsFollowing(memberId!)
      return response.data ?? null
    },
    enabled: !!memberId && enabled,
  })
}
