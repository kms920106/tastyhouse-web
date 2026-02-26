import { api } from '@/lib/api'
import { EventAnnouncementListQuery, EventDetailResponse, EventListItem, EventListQuery, EventPrizeResponse, EventRankDurationResponse, WinnerEventListItem } from './event.type'

const ENDPOINT = '/api/event'

export const eventRepository = {
  async getEventRankDuration() {
    return api.get<EventRankDurationResponse>(`${ENDPOINT}/v1/rank/duration`)
  },
  async getEventRankPrizes() {
    return api.get<EventPrizeResponse[]>(`${ENDPOINT}/v1/rank/prizes`)
  },
  async getEventList(params: EventListQuery) {
    return api.get<EventListItem[]>(`${ENDPOINT}/v1/list`, { params })
  },
  async getEventDetail(eventId: number) {
    return api.get<EventDetailResponse>(`${ENDPOINT}/v1/${eventId}`)
  },
  async getEventAnnouncementList(params: EventAnnouncementListQuery) {
    return api.get<WinnerEventListItem[]>(`${ENDPOINT}/v1/announcements`, { params })
  },
}
