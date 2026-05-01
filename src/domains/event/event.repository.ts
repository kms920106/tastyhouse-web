import 'server-only'
import { api } from '@/lib/api'
import { PaginationParams } from '@/types/common'
import {
  EventDetailResponse,
  EventListItemResponse,
  EventListQuery,
  EventPrizeResponse,
  EventRankDurationResponse,
  WinnerEventListItemResponse,
} from './event.dto'

const ENDPOINT = '/api/event'

export const eventRepository = {
  async getEventRankDuration() {
    return api.get<EventRankDurationResponse>(`${ENDPOINT}/v1/rank/duration`)
  },
  async getEventRankPrizes() {
    return api.get<EventPrizeResponse[]>(`${ENDPOINT}/v1/rank/prizes`)
  },
  async getEventList(params: EventListQuery) {
    return api.get<EventListItemResponse[]>(`${ENDPOINT}/v1/list`, { params })
  },
  async getEventDetail(eventId: number) {
    return api.get<EventDetailResponse>(`${ENDPOINT}/v1/${eventId}`)
  },
  async getEventAnnouncementList(params: PaginationParams) {
    return api.get<WinnerEventListItemResponse[]>(`${ENDPOINT}/v1/announcements`, { params })
  },
}
