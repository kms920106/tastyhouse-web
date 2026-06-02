import 'server-only'

import { api } from '@/lib/api'
import type {
  ReservationAvailabilityResponse,
  ReservationCreateRequest,
  ReservationResponse,
} from './reservation.dto'

const SHOP_ENDPOINT = '/api/shops'
const RESERVATION_ENDPOINT = '/api/reservations'

export const reservationRepository = {
  async getAvailability(shopId: number, date: string) {
    return api.get<ReservationAvailabilityResponse, { date: string }>(
      `${SHOP_ENDPOINT}/${shopId}/reservations/availability`,
      { params: { date } },
    )
  },

  async createReservation(request: ReservationCreateRequest) {
    return api.post<ReservationResponse>(`${RESERVATION_ENDPOINT}/v1`, request)
  },
}
