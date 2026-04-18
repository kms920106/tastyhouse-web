'use client'

import { getSidebarBanners } from '@/actions/banner'
import { useQuery } from '@tanstack/react-query'

export const SIDEBAR_BANNERS_QUERY_KEY = ['banners', 'sidebar']

export function useSidebarBanners() {
  const { data, isLoading } = useQuery({
    queryKey: SIDEBAR_BANNERS_QUERY_KEY,
    queryFn: () => getSidebarBanners({ page: 0, size: 10 }),
    staleTime: Infinity,
  })

  return {
    banners: data?.data ?? [],
    isLoading,
  }
}
