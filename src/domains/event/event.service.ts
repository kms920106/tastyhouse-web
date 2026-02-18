import { eventRepository } from './event.repository'
import { EventAnnouncementListQuery, EventListQuery } from './event.type'

export const eventService = {
  async getRankEventDuration() {
    return eventRepository.getEventRankDuration()
  },
  async getRankEventPrizes() {
    return eventRepository.getEventRankPrizes()
  },
  async getEventList(params: EventListQuery) {
    return eventRepository.getEventList(params)
  },
  async getEventDetail(eventId: number) {
    return eventRepository.getEventDetail(eventId)
  },
  async getEventAnnouncementList(params: EventAnnouncementListQuery) {
    return eventRepository.getEventAnnouncementList(params)
  },
}
