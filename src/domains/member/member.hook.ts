'use client'

import { getMemberProfile, getMemberStats, getMyBookmarks, getMyProfile, getMyReviewCount, getMyReviews } from '@/actions/member'
import { getMemberReviews } from '@/actions/review'
import type { Member } from '@/domains/member'
import { useQuery } from '@tanstack/react-query'

const BOOKMARK_PAGE_SIZE = 10

export const memberQueryKeys = {
  myProfile: ['member', 'profile'] as const,
  myReviewCount: ['member', 'review-count'] as const,
  myReviews: ['mypage', 'reviews'] as const,
  myBookmarks: ['mypage', 'bookmarks'] as const,
  stats: (memberId: number) => ['member', memberId, 'stats'] as const,
  profile: (memberId: number) => ['member', memberId, 'profile', 'basic'] as const,
  reviews: (memberId: number) => ['member', memberId, 'reviews'] as const,
}

interface EnabledOptions {
  enabled?: boolean
}

export function useMemberProfile({ enabled = true }: EnabledOptions = {}) {
  const { data, isLoading } = useQuery({
    queryKey: memberQueryKeys.myProfile,
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

export function useMemberStats(memberId: number | undefined) {
  return useQuery({
    queryKey: memberQueryKeys.stats(memberId!),
    queryFn: async () => {
      const response = await getMemberStats(memberId!)
      return response.data ?? null
    },
    enabled: !!memberId,
  })
}

export function useOtherMemberProfile(memberId: number) {
  return useQuery({
    queryKey: memberQueryKeys.profile(memberId),
    queryFn: async () => {
      const response = await getMemberProfile(memberId)
      return response.data ?? null
    },
    enabled: !!memberId,
  })
}

export function useMyReviewCount({ enabled = true }: EnabledOptions = {}) {
  const { data, isLoading } = useQuery({
    queryKey: memberQueryKeys.myReviewCount,
    queryFn: () => getMyReviewCount(),
    enabled,
  })

  return {
    reviewCount: data?.data?.reviewCount ?? 0,
    isLoading,
  }
}

export function useMemberReviews(memberId: number, page = 0, size = 9) {
  return useQuery({
    queryKey: memberQueryKeys.reviews(memberId),
    queryFn: async () => {
      const response = await getMemberReviews(memberId, page, size)
      return {
        reviews: response.data || [],
        hasMore: (response.pagination?.totalElements ?? 0) > size,
      }
    },
  })
}

export function useMyReviews(page = 0, size = 9) {
  return useQuery({
    queryKey: memberQueryKeys.myReviews,
    queryFn: async () => {
      const response = await getMyReviews(page, size)
      return {
        reviews: response.data || [],
        hasMore: (response.pagination?.totalElements ?? 0) > size,
      }
    },
  })
}

export function useMyBookmarks() {
  return useQuery({
    queryKey: memberQueryKeys.myBookmarks,
    queryFn: async () => {
      const response = await getMyBookmarks(0, BOOKMARK_PAGE_SIZE)
      return {
        bookmarks: response.data || [],
        hasMoreBookmarks: (response.pagination?.totalElements ?? 0) > BOOKMARK_PAGE_SIZE,
      }
    },
  })
}
