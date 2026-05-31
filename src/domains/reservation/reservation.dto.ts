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

// 생성/조회/취소 API 공통 응답 객체 (API 가이드 §3).
// 이번 화면은 생성 성공 시 토스트만 띄우고 응답 데이터를 사용하지 않음.
// → api.post<ReservationResponse> 반환 타입으로만 쓰이며, 필드 소비는 후속 목록/상세 작업에서.
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
