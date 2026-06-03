'use server'

import { reservationRepository } from '@/domains/reservation/reservation.repository'

export async function getReservationAvailability(shopId: number, date: string) {
  return reservationRepository.getAvailability(shopId, date)
}

export async function getReservationComplete(reservationId: number) {
  return reservationRepository.getReservationComplete(reservationId)
}

export async function createReservation({
  shopId,
  reservationDate,
  reservationTime,
  partySize,
  request,
  agreedRequiredTerms,
}: {
  shopId: number
  reservationDate: string
  reservationTime: string
  partySize: number
  request?: string
  agreedRequiredTerms: boolean
}) {
  return reservationRepository.createReservation({
    shopId,
    reservationDate,
    reservationTime,
    partySize,
    request,
    agreedRequiredTerms,
  })
}
