export interface Event {
  id: number
  title: string
  imageUrl: string
  startDate: string
  endDate: string
  status: 'ongoing' | 'ended' | 'upcoming'
  type: 'ongoing' | 'ended' | 'winner'
  announcementDate?: string
  content?: string
  winners?: EventWinner[]
}

export type EventStatus = 'ACTIVE' | 'ENDED'

export interface EventListQuery {
  status: EventStatus
  page: number
  size: number
}

export interface EventAnnouncementListQuery {
  page: number
  size: number
}

export interface EventListItem {
  id: number
  name: string
  thumbnailImageUrl: string
  startAt: string
  endAt: string
}

export interface EventWinner {
  name: string
  phoneNumber: string
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

export interface WinnerEventListItem {
  id: number
  name: string
  announcedAt: string
  content: string
}
