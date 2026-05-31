'use client'

import { createReservation, getReservationAvailability } from '@/actions/reservation'
import { toast } from '@/components/ui/AppToaster'
import { COMMON_ERROR_MESSAGES } from '@/constants/errors'
import { useMutation, useQuery } from '@tanstack/react-query'

export const reservationQueryKeys = {
  availability: (shopId: number, date: string) =>
    ['reservation', shopId, 'availability', date] as const,
}

export function useReservationAvailability(shopId: number, date: string | null) {
  return useQuery({
    queryKey: reservationQueryKeys.availability(shopId, date ?? ''),
    queryFn: () => getReservationAvailability(shopId, date!),
    enabled: !!date,
  })
}

interface CreateReservationInput {
  shopId: number
  reservationDate: string
  reservationTime: string
  partySize: number
  request?: string
  agreedRequiredTerms: boolean
}

export function useCreateReservation(onSuccess?: () => void) {
  return useMutation({
    mutationFn: (input: CreateReservationInput) => createReservation(input),
    onSuccess: ({ data, error }) => {
      if (error || !data) {
        // 백엔드 message(409/400 등)는 사용자에게 그대로 노출 (API 가이드 1-1)
        toast(error || COMMON_ERROR_MESSAGES.MUTATION_ERROR)
        return
      }
      toast('예약이 신청되었습니다. 점주 승인을 기다려 주세요.')
      onSuccess?.()
    },
    onError: () => toast(COMMON_ERROR_MESSAGES.MUTATION_ERROR),
  })
}
