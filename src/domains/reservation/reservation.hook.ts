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

export function useCreateReservation(onSuccess?: (reservationId: number) => void) {
  return useMutation({
    mutationFn: (input: CreateReservationInput) => createReservation(input),
    onSuccess: ({ data, error }) => {
      if (error || !data) {
        // 백엔드 message(409/400 등)는 사용자에게 그대로 노출 (API 가이드 1-1)
        toast(error || COMMON_ERROR_MESSAGES.MUTATION_ERROR)
        return
      }
      // 성공 toast 없이 예약 완료 페이지로 이동 (onSuccess 콜백이 router.push 담당)
      onSuccess?.(data.id)
    },
    onError: () => toast(COMMON_ERROR_MESSAGES.MUTATION_ERROR),
  })
}
