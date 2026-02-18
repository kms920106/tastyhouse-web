import { eventRepository } from './event.repository'
import { EventStatus } from './event.type'

export const eventService = {
  async getRankEventDuration() {
    return eventRepository.getEventRankDuration()
  },
  async getRankEventPrizes() {
    return eventRepository.getEventRankPrizes()
  },
  async getEventList(status: EventStatus) {
    return eventRepository.getEventList(status)
  },
  async getEventDetail(eventId: number) {
    return eventRepository.getEventDetail(eventId)
  },
}
