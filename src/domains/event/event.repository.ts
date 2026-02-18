import { api } from '@/lib/api'
import { ApiResponse } from '@/types/common'
import { EventAnnouncementListQuery, EventDetailResponse, EventListItem, EventListQuery, EventPrizeResponse, EventRankDurationResponse, WinnerEventListItem } from './event.type'

const ENDPOINT = '/api/event'

export const eventRepository = {
  async getEventRankDuration() {
    return api.get<ApiResponse<EventRankDurationResponse>>(`${ENDPOINT}/v1/rank/duration`)
  },
  async getEventRankPrizes() {
    return api.get<ApiResponse<EventPrizeResponse[]>>(`${ENDPOINT}/v1/rank/prizes`)
  },
  async getEventList(params: EventListQuery) {
    return api.get<ApiResponse<EventListItem[]>>(`${ENDPOINT}/v1/list`, { params })
  },
  async getEventDetail(eventId: number) {
    return api.get<ApiResponse<EventDetailResponse>>(`${ENDPOINT}/v1/${eventId}`)
  },
  async getEventAnnouncementList(params: EventAnnouncementListQuery) {
    return api.get<ApiResponse<WinnerEventListItem[]>>(`${ENDPOINT}/v1/announcements`, { params })
  },
}
