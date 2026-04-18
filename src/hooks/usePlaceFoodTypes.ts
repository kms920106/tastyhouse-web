'use client'

import { getPlaceFoodTypes } from '@/actions/place'
import { useQuery } from '@tanstack/react-query'

export const PLACE_FOOD_TYPES_QUERY_KEY = ['place', 'food-types']

export function usePlaceFoodTypes() {
  const { data, isLoading } = useQuery({
    queryKey: PLACE_FOOD_TYPES_QUERY_KEY,
    queryFn: () => getPlaceFoodTypes(),
    staleTime: Infinity,
  })

  return {
    foodTypes: data?.data ?? [],
    isLoading,
  }
}
