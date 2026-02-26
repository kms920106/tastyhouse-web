'use client'

import type { MemberInfo } from '@/domains/member'
import { getMemberMe } from '@/services/member'
import { useQuery } from '@tanstack/react-query'

export const MEMBER_PROFILE_QUERY_KEY = ['member', 'profile']

export function useMemberProfile() {
  const { data, isLoading } = useQuery({
    queryKey: MEMBER_PROFILE_QUERY_KEY,
    queryFn: () => getMemberMe(),
    staleTime: Infinity,
  })

  const memberProfile: MemberInfo | null = data?.data ?? null

  return {
    memberProfile,
    isLoading,
    isLoggedIn: memberProfile !== null,
  }
}
