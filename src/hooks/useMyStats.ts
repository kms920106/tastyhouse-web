'use client'

import type { MemberStatsResponse } from '@/domains/member'
import { getMyStats } from '@/services/member'
import { useQuery } from '@tanstack/react-query'

export const MY_STATS_QUERY_KEY = ['member', 'stats']

export function useMyStats() {
  const { data, isLoading } = useQuery({
    queryKey: MY_STATS_QUERY_KEY,
    queryFn: () => getMyStats(),
    staleTime: 1000 * 60 * 5, // 5분
  })

  const stats: MemberStatsResponse | null = data?.data ?? null

  return {
    stats,
    reviewCount: stats?.reviewCount ?? 0,
    followingCount: stats?.followingCount ?? 0,
    followerCount: stats?.followerCount ?? 0,
    isLoading,
  }
}
