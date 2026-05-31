export interface ReservationSlot {
  time: string // HH:mm (24시간제)
  remaining: number
  available: boolean
}
