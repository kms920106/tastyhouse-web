'use client'

import { getOtherMemberProfile } from '@/services/member'
import { useQuery } from '@tanstack/react-query'

export const otherMemberProfileQueryKey = (memberId: number) => ['member', memberId, 'profile']

export function useOtherMemberProfile(memberId: number | undefined) {
  return useQuery({
    queryKey: otherMemberProfileQueryKey(memberId!),
    queryFn: async () => {
      const response = await getOtherMemberProfile(memberId!)
      return response.data ?? null
    },
    enabled: !!memberId,
  })
}
