'use client'

import { getMemberBasicProfile } from '@/actions/member'
import { useQuery } from '@tanstack/react-query'

export const otherMemberProfileQueryKey = (memberId: number) => ['member', memberId, 'profile', 'basic']

export function useOtherMemberProfile(memberId: number | undefined) {
  return useQuery({
    queryKey: otherMemberProfileQueryKey(memberId!),
    queryFn: async () => {
      const response = await getMemberBasicProfile(memberId!)
      return response.data ?? null
    },
    enabled: !!memberId,
  })
}
