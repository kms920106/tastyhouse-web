'use client'

import { getSearchPlaces } from '@/actions/search'
import { useInfiniteQuery } from '@tanstack/react-query'

const SEARCH_PAGE_SIZE = 10

export const searchQueryKeys = {
  results: (query: string) => ['search', 'results', query] as const,
}

export function useSearchResults(query: string) {
  return useInfiniteQuery({
    queryKey: searchQueryKeys.results(query),
    queryFn: async ({ pageParam }) => {
      const response = await getSearchPlaces({ query, page: pageParam, size: SEARCH_PAGE_SIZE })
      if (response.error) throw new Error(response.error)
      if (!response.data) throw new Error('검색 결과를 불러올 수 없습니다.')
      return response
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      if (!lastPage.pagination) return undefined
      const { page, totalPages } = lastPage.pagination
      return page + 1 < totalPages ? page + 1 : undefined
    },
    enabled: query.trim().length > 0,
  })
}
