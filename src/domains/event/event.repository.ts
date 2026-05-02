import 'server-only'

import { api } from '@/lib/api'
import { PaginationParams } from '@/types/common'
import {
  EventAnnouncementListItemResponse,
  EventDetailResponse,
  EventListItemResponse,
  EventListQuery,
} from './event.dto'

const ENDPOINT = '/api/event'

export const eventRepository = {
  async getEventList(params: EventListQuery) {
    return api.get<EventListItemResponse[]>(`${ENDPOINT}/v1/list`, { params })
  },
  async getEventDetail(eventId: number) {
    return api.get<EventDetailResponse>(`${ENDPOINT}/v1/${eventId}`)
  },
  async getEventAnnouncementList(params: PaginationParams) {
    return api.get<EventAnnouncementListItemResponse[]>(`${ENDPOINT}/v1/announcements`, { params })
  },
}
