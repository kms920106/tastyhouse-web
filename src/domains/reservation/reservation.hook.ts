'use client'

import { createReservation, getReservationAvailability } from '@/actions/reservation'
import { toast } from '@/components/ui/AppToaster'
import { COMMON_ERROR_MESSAGES } from '@/constants/errors'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

export const reservationQueryKeys = {
  availability: (shopId: number, date: string) =>
    ['reservation', shopId, 'availability', date] as const,
  availabilityByShop: (shopId: number) => ['reservation', shopId, 'availability'] as const,
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
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (input: CreateReservationInput) => createReservation(input),
    onSuccess: ({ data, error }, variables) => {
      if (error || !data) {
        // 백엔드 message(409/400 등)는 사용자에게 그대로 노출 (API 가이드 1-1)
        toast(error || COMMON_ERROR_MESSAGES.MUTATION_ERROR)
        return
      }
      // 예약 성공으로 가용 슬롯이 변경됨 — 해당 매장의 availability 캐시 무효화
      // (뒤로가기로 예약 페이지에 복귀해도 방금 예약한 시간이 disabled로 반영되도록)
      queryClient.invalidateQueries({
        queryKey: reservationQueryKeys.availabilityByShop(variables.shopId),
      })
      // 성공 toast 없이 예약 완료 페이지로 이동 (onSuccess 콜백이 router.push 담당)
      onSuccess?.(data.id)
    },
    onError: () => toast(COMMON_ERROR_MESSAGES.MUTATION_ERROR),
  })
}
