'use client'

import { getMyReviewCount } from '@/actions/member'
import { useQuery } from '@tanstack/react-query'

export const MY_REVIEW_COUNT_QUERY_KEY = ['member', 'review-count']

interface Options {
  enabled?: boolean
}

export function useMyReviewCount({ enabled = true }: Options = {}) {
  const { data, isLoading } = useQuery({
    queryKey: MY_REVIEW_COUNT_QUERY_KEY,
    queryFn: () => getMyReviewCount(),
    enabled,
  })

  return {
    reviewCount: data?.data?.reviewCount ?? 0,
    isLoading,
  }
}
