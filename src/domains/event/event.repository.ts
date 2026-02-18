import { api } from '@/lib/api'
import { ApiResponse } from '@/types/common'
import { EventListItem, EventPrizeResponse, EventRankDurationResponse, EventStatus } from './event.type'

const ENDPOINT = '/api/event'

export const eventRepository = {
  async getEventRankDuration() {
    return api.get<ApiResponse<EventRankDurationResponse>>(`${ENDPOINT}/v1/rank/duration`)
  },
  async getEventRankPrizes() {
    return api.get<ApiResponse<EventPrizeResponse[]>>(`${ENDPOINT}/v1/rank/prizes`)
  },
  async getEventList(status: EventStatus) {
    return api.get<ApiResponse<EventListItem[]>>(`${ENDPOINT}/v1/list`, { params: { status } })
  },
}
