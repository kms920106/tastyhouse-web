import type { ReservationSlot } from './reservation.model'
import type { ReservationStatus } from './reservation.types'

export interface ReservationAvailabilityResponse {
  date: string
  slots: ReservationSlot[]
}

export interface ReservationCreateRequest {
  shopId: number
  reservationDate: string // YYYY-MM-DD
  reservationTime: string // HH:mm
  partySize: number // 1~50
  request?: string
  agreedRequiredTerms: boolean
}

export interface ReservationResponse {
  id: number
  shopId: number
  shopName: string
  memberId: number
  reservationDate: string
  reservationTime: string
  partySize: number
  status: ReservationStatus
  request: string | null
  createdAt: string
}

export interface ReservationCompleteResponse {
  id: number
  shopName: string
  shopImageUrl: string
  reservationAt: string
  partySize: number
}

// 예약 상세 조회 응답 (GET /api/reservations/v1/{reservationId})
export interface ReservationDetailResponse {
  id: number
  shopId: number
  shopName: string
  memberId: number
  reservationAt: string // YYYY-MM-DDTHH:mm:ss (LocalDateTime, 예약 일시)
  partySize: number
  status: ReservationStatus
  request: string | null
  createdAt: string // YYYY-MM-DDTHH:mm:ss (LocalDateTime, 예약 생성 일시)
}
