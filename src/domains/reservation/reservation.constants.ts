import type { ReservationStatus } from './reservation.types'

const RESERVATION_STATUS_NAMES: Record<ReservationStatus, string> = {
  PENDING: '예약 대기',
  CONFIRMED: '예약 확정',
  REJECTED: '예약 거절',
  CANCELED: '예약 취소',
  COMPLETED: '방문 완료',
}

const RESERVATION_STATUS_COLORS: Record<ReservationStatus, string> = {
  PENDING: '#999999',
  CONFIRMED: '#4f9857',
  REJECTED: '#bc4040',
  CANCELED: '#bc4040',
  COMPLETED: '#4f9857',
}

export const getReservationStatusName = (status: ReservationStatus): string => {
  return RESERVATION_STATUS_NAMES[status] || status
}

export const getReservationStatusColor = (status: ReservationStatus): string => {
  return RESERVATION_STATUS_COLORS[status] || '#999999'
}
