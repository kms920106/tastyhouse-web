'use client'

import { getMyReviewCount } from '@/actions/member'
import { useQuery } from '@tanstack/react-query'

export const MY_REVIEW_COUNT_QUERY_KEY = ['member', 'review-count']

export function useMyReviewCount() {
  const { data, isLoading } = useQuery({
    queryKey: MY_REVIEW_COUNT_QUERY_KEY,
    queryFn: () => getMyReviewCount(),
  })

  return {
    reviewCount: data?.data?.reviewCount ?? 0,
    isLoading,
  }
}
