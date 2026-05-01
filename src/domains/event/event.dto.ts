import type { EventStatus } from './event.types'

export interface EventListQuery {
  status: EventStatus
  page: number
  size: number
}

export interface EventListItemResponse {
  id: number
  name: string
  thumbnailImageUrl: string
  startAt: string
  endAt: string
}

export interface EventPrizeResponse {
  id: number
  prizeRank: number
  name: string
  brand: string
  imageUrl: string
}

export interface EventRankDurationResponse {
  startAt: string
  endAt: string
}

export interface EventDetailResponse {
  bannerImageUrl: string
}

export interface WinnerEventListItemResponse {
  id: number
  name: string
  announcedAt: string
  content: string
}
