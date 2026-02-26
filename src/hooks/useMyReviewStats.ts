'use client'

import type { MyReviewStatsResponse } from '@/domains/member'
import { getMyReviewStats } from '@/services/member'
import { useQuery } from '@tanstack/react-query'

export const MY_REVIEW_STATS_QUERY_KEY = ['member', 'reviewStats']

export function useMyReviewStats() {
  const { data, isLoading } = useQuery({
    queryKey: MY_REVIEW_STATS_QUERY_KEY,
    queryFn: () => getMyReviewStats(),
    staleTime: 1000 * 60 * 5, // 5분
  })

  const reviewStats: MyReviewStatsResponse | null = data?.data ?? null

  return {
    reviewStats,
    totalReviewCount: reviewStats?.totalReviewCount ?? 0,
    isLoading,
  }
}
