import { PlaceAmenityCode, PlaceFoodType } from '.'

export interface PlaceBusinessHour {
  dayType: string
  dayTypeDescription: string
  openTime: string
  closeTime: string
  isClosed: boolean
}

export interface PlaceBreakTime {
  dayType: string
  dayTypeDescription: string
  startTime: string
  endTime: string
}

export interface PlaceClosedDay {
  closedDayType: string
  description: string
}

export interface PlaceFood {
  code: PlaceFoodType
  name: string
  activeImageUrl: string
  inactiveImageUrl: string
}

export interface PlaceStation {
  id: number
  name: string
}

export interface PlaceAmenity {
  code: PlaceAmenityCode
  name: string
  activeImageUrl: string
  inactiveImageUrl: string
}

export interface PlaceMapMarker {
  id: number
  latitude: number
  longitude: number
  name: string
}
