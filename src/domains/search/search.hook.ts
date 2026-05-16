'use client'

import { getSearchMenus, getSearchPlaces, getSearchReviews } from '@/actions/search'
import { useInfiniteQuery, useQuery } from '@tanstack/react-query'

const SEARCH_MENU_PREVIEW_SIZE = 3
const SEARCH_REVIEW_PREVIEW_SIZE = 9
const SEARCH_PLACE_PREVIEW_SIZE = 3
const SEARCH_MENU_PAGE_SIZE = 10
const SEARCH_REVIEW_PAGE_SIZE = 9
const SEARCH_PLACE_PAGE_SIZE = 10

export const searchQueryKeys = {
  menusPreview: (query: string) => ['search', 'menus', 'preview', query] as const,
  reviewsPreview: (query: string) => ['search', 'reviews', 'preview', query] as const,
  placesPreview: (query: string) => ['search', 'places', 'preview', query] as const,
  menusInfinite: (query: string) => ['search', 'menus', 'infinite', query] as const,
  reviewsInfinite: (query: string) => ['search', 'reviews', 'infinite', query] as const,
  placesInfinite: (query: string) => ['search', 'places', 'infinite', query] as const,
}

export function useSearchMenusPreview(query: string) {
  return useQuery({
    queryKey: searchQueryKeys.menusPreview(query),
    queryFn: () => getSearchMenus({ query, page: 0, size: SEARCH_MENU_PREVIEW_SIZE }),
    enabled: query.trim().length > 0,
  })
}

export function useSearchReviewsPreview(query: string) {
  return useQuery({
    queryKey: searchQueryKeys.reviewsPreview(query),
    queryFn: () => getSearchReviews({ query, page: 0, size: SEARCH_REVIEW_PREVIEW_SIZE }),
    enabled: query.trim().length > 0,
  })
}

export function useSearchPlacesPreview(query: string) {
  return useQuery({
    queryKey: searchQueryKeys.placesPreview(query),
    queryFn: () => getSearchPlaces({ query, page: 0, size: SEARCH_PLACE_PREVIEW_SIZE }),
    enabled: query.trim().length > 0,
  })
}

export function useSearchMenusInfinite(query: string) {
  return useInfiniteQuery({
    queryKey: searchQueryKeys.menusInfinite(query),
    queryFn: ({ pageParam }) =>
      getSearchMenus({ query, page: pageParam, size: SEARCH_MENU_PAGE_SIZE }),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      if (!lastPage.pagination) return undefined
      const { page, totalPages } = lastPage.pagination
      return page + 1 < totalPages ? page + 1 : undefined
    },
    enabled: query.trim().length > 0,
  })
}

export function useSearchReviewsInfinite(query: string) {
  return useInfiniteQuery({
    queryKey: searchQueryKeys.reviewsInfinite(query),
    queryFn: ({ pageParam }) =>
      getSearchReviews({ query, page: pageParam, size: SEARCH_REVIEW_PAGE_SIZE }),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      if (!lastPage.pagination) return undefined
      const { page, totalPages } = lastPage.pagination
      return page + 1 < totalPages ? page + 1 : undefined
    },
    enabled: query.trim().length > 0,
  })
}

export function useSearchPlacesInfinite(query: string) {
  return useInfiniteQuery({
    queryKey: searchQueryKeys.placesInfinite(query),
    queryFn: ({ pageParam }) =>
      getSearchPlaces({ query, page: pageParam, size: SEARCH_PLACE_PAGE_SIZE }),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      if (!lastPage.pagination) return undefined
      const { page, totalPages } = lastPage.pagination
      return page + 1 < totalPages ? page + 1 : undefined
    },
    enabled: query.trim().length > 0,
  })
}
