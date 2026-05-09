'use client'

import type { Member } from '@/domains/member'
import { getMyProfile } from '@/actions/member'
import { useQuery } from '@tanstack/react-query'

export const MEMBER_PROFILE_QUERY_KEY = ['member', 'profile']

interface Options {
  enabled?: boolean
}

export function useMemberProfile({ enabled = true }: Options = {}) {
  const { data, isLoading } = useQuery({
    queryKey: MEMBER_PROFILE_QUERY_KEY,
    queryFn: () => getMyProfile(),
    staleTime: Infinity,
    enabled,
  })

  const memberProfile: Member | null = data?.data ?? null

  return {
    memberProfile,
    isLoading,
    isLoggedIn: memberProfile !== null,
  }
}
